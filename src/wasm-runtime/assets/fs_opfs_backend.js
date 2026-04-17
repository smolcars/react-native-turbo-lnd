"use strict";

// OPFS filesystem backend factory used by the shared browser FS shim.
(() => {
  if (globalThis.__lndWasmCreateOPFSBackend) {
    return;
  }

  const S_IFDIR = 0o040000;
  const S_IFREG = 0o100000;
  const O_CREAT = 0x40;
  const O_EXCL = 0x80;
  const O_TRUNC = 0x200;
  const O_APPEND = 0x400;
  const O_DIRECTORY = 0x10000;

  function shouldDisableOPFSSyncAccess() {
    return Boolean(globalThis.__lndWasmDisableOPFSSyncAccess);
  }

  function mkError(code, message) {
    const err = new Error(message || code);
    err.code = code;
    return err;
  }

  function normalizePath(cwd, path) {
    const raw = String(path || "");
    const input = raw.startsWith("/") ? raw : `${cwd}/${raw}`;
    const parts = [];

    for (const part of input.split("/")) {
      if (!part || part === ".") {
        continue;
      }
      if (part === "..") {
        parts.pop();
        continue;
      }
      parts.push(part);
    }

    return `/${parts.join("/")}`;
  }

  async function createOPFSBackend() {
    if (
      !navigator.storage ||
      typeof navigator.storage.getDirectory !== "function"
    ) {
      throw new Error("OPFS is not available in this browser/context");
    }

    const rootHandle = await navigator.storage.getDirectory();
    const state = {
      mode: "opfs",
      cwd: "/",
      nextFd: 100,
      nextIno: 2,
      fds: new Map(),
      inoByPath: new Map([["/", 1]]),
      syncAccessByPath: new Map(),
    };

    function assignIno(path) {
      const normalized = normalizePath(state.cwd, path);
      if (!state.inoByPath.has(normalized)) {
        state.inoByPath.set(normalized, state.nextIno++);
      }
      return state.inoByPath.get(normalized);
    }

    function clearInoPath(path) {
      const normalized = normalizePath(state.cwd, path);
      for (const key of Array.from(state.inoByPath.keys())) {
        if (key === normalized || key.startsWith(`${normalized}/`)) {
          state.inoByPath.delete(key);
        }
      }
    }

    function ensureFileCapacity(entry, size) {
      if (entry.data.length >= size) {
        return;
      }

      let nextCapacity = entry.data.length || 4096;
      while (nextCapacity < size) {
        nextCapacity *= 2;
      }

      const next = new Uint8Array(nextCapacity);
      next.set(entry.data.subarray(0, entry.size));
      entry.data = next;
    }

    function splitPath(path) {
      return normalizePath(state.cwd, path).split("/").filter(Boolean);
    }

    function mapOPFSError(err, fallback) {
      if (!err || typeof err !== "object") {
        return mkError(fallback || "EIO");
      }

      switch (err.name) {
        case "NotFoundError":
          return mkError("ENOENT");
        case "TypeMismatchError":
          return mkError("ENOTDIR");
        case "NoModificationAllowedError":
          return mkError("EPERM");
        case "InvalidModificationError":
          return mkError("ENOTEMPTY");
        case "NotAllowedError":
          return mkError("EPERM");
        default:
          return mkError(fallback || "EIO", String(err.message || err));
      }
    }

    async function getParentDirectory(path, create) {
      const normalized = normalizePath(state.cwd, path);
      if (normalized === "/") {
        throw mkError("EEXIST");
      }

      const parts = splitPath(normalized);
      parts.pop();

      let current = rootHandle;
      let currentPath = "";
      for (const part of parts) {
        currentPath += `/${part}`;
        try {
          current = await current.getDirectoryHandle(part, { create });
          assignIno(currentPath);
        } catch (err) {
          throw mapOPFSError(err, create ? "EIO" : "ENOENT");
        }
      }

      return current;
    }

    async function getDirectoryHandle(path, create) {
      const normalized = normalizePath(state.cwd, path);
      if (normalized === "/") {
        return rootHandle;
      }

      let current = rootHandle;
      let currentPath = "";
      for (const part of splitPath(normalized)) {
        currentPath += `/${part}`;
        try {
          current = await current.getDirectoryHandle(part, { create });
          assignIno(currentPath);
        } catch (err) {
          throw mapOPFSError(err, create ? "EIO" : "ENOENT");
        }
      }

      return current;
    }

    async function getEntry(path) {
      const normalized = normalizePath(state.cwd, path);
      if (normalized === "/") {
        return { kind: "dir", handle: rootHandle, path: "/" };
      }

      const parts = splitPath(normalized);
      const name = parts[parts.length - 1];
      const parent = await getParentDirectory(normalized, false);

      try {
        const fileHandle = await parent.getFileHandle(name);
        assignIno(normalized);
        return { kind: "file", handle: fileHandle, path: normalized };
      } catch (fileErr) {
        if (
          fileErr &&
          fileErr.name &&
          fileErr.name !== "NotFoundError" &&
          fileErr.name !== "TypeMismatchError"
        ) {
          throw mapOPFSError(fileErr);
        }
      }

      try {
        const dirHandle = await parent.getDirectoryHandle(name);
        assignIno(normalized);
        return { kind: "dir", handle: dirHandle, path: normalized };
      } catch (dirErr) {
        if (
          dirErr &&
          dirErr.name &&
          dirErr.name !== "NotFoundError" &&
          dirErr.name !== "TypeMismatchError"
        ) {
          throw mapOPFSError(dirErr, "ENOENT");
        }

        throw mkError("ENOENT");
      }
    }

    async function tryGetEntry(path) {
      try {
        return await getEntry(path);
      } catch (err) {
        if (err.code === "ENOENT") {
          return null;
        }
        throw err;
      }
    }

    async function readFileData(handle) {
      const file = await handle.getFile();
      const data = new Uint8Array(await file.arrayBuffer());
      return {
        data,
        size: data.length,
        mtimeMs: file.lastModified || Date.now(),
      };
    }

    async function countDirectoryEntries(handle) {
      let count = 0;
      for await (const _entry of handle.values()) {
        count++;
      }
      return count;
    }

    async function removeExistingDestination(path) {
      const existing = await tryGetEntry(path);
      if (!existing) {
        return;
      }

      if (existing.kind === "dir") {
        const count = await countDirectoryEntries(existing.handle);
        if (count !== 0) {
          throw mkError("ENOTEMPTY");
        }
      }

      const parent = await getParentDirectory(path, false);
      const parts = splitPath(path);
      await parent.removeEntry(parts[parts.length - 1], { recursive: false });
      clearInoPath(path);
    }

    // OPFS does not currently expose a true move/rename primitive for arbitrary
    // files/directories through this shim, so rename() is implemented below as
    // copy + delete. That is correct but can be expensive for large files.
    async function copyEntry(sourcePath, destPath) {
      const source = await getEntry(sourcePath);
      if (source.kind === "file") {
        const parent = await getParentDirectory(destPath, false);
        const parts = splitPath(destPath);
        const name = parts[parts.length - 1];
        const fileHandle = await parent.getFileHandle(name, { create: true });
        const writable = await fileHandle.createWritable();
        const file = await source.handle.getFile();
        await writable.write(await file.arrayBuffer());
        await writable.close();
        assignIno(destPath);
        return;
      }

      const parent = await getParentDirectory(destPath, false);
      const parts = splitPath(destPath);
      const name = parts[parts.length - 1];
      await parent.getDirectoryHandle(name, { create: true });
      assignIno(destPath);

      for await (const [childName] of source.handle.entries()) {
        const childSource = `${normalizePath(state.cwd, sourcePath)}/${childName}`;
        const childDest = `${normalizePath(state.cwd, destPath)}/${childName}`;
        await copyEntry(childSource, childDest);
      }
    }

    function updateOpenFileState(path, size, mtimeMs) {
      for (const entry of state.fds.values()) {
        if (entry && entry.kind === "file" && entry.path === path) {
          entry.size = size;
          entry.mtimeMs = mtimeMs;
          if (entry.position > size) {
            entry.position = size;
          }
        }
      }
    }

    function getOpenFileState(path) {
      const normalized = normalizePath(state.cwd, path);
      for (const entry of state.fds.values()) {
        if (entry && entry.kind === "file" && entry.path === normalized) {
          return entry;
        }
      }
      return null;
    }

    async function acquireSyncAccess(path, handle) {
      if (shouldDisableOPFSSyncAccess()) {
        return null;
      }

      const normalized = normalizePath(state.cwd, path);
      const existing = state.syncAccessByPath.get(normalized);
      if (existing) {
        existing.refs += 1;
        return existing;
      }

      if (typeof handle.createSyncAccessHandle !== "function") {
        return null;
      }

      try {
        const syncHandle = await handle.createSyncAccessHandle();
        const access = { handle: syncHandle, refs: 1 };
        state.syncAccessByPath.set(normalized, access);
        return access;
      } catch {
        return null;
      }
    }

    function releaseSyncAccess(path, access) {
      if (!access) {
        return;
      }

      const normalized = normalizePath(state.cwd, path);
      const current = state.syncAccessByPath.get(normalized);
      if (!current || current !== access) {
        return;
      }

      current.refs -= 1;
      if (current.refs <= 0) {
        current.handle.close();
        state.syncAccessByPath.delete(normalized);
      }
    }

    async function flushFD(entry) {
      if (!entry || entry.kind !== "file" || !entry.dirty) {
        return;
      }

      if (entry.syncAccess) {
        entry.syncAccess.handle.flush();
        entry.dirty = false;
        return;
      }

      const writable = await entry.handle.createWritable();
      await writable.write(entry.data.subarray(0, entry.size));
      await writable.close();
      entry.dirty = false;
    }

    function makeStatForDir(path, size) {
      return {
        dev: 1,
        ino: assignIno(path),
        mode: S_IFDIR | 0o755,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        size,
        blksize: 4096,
        blocks: Math.ceil(size / 512),
        atimeMs: Date.now(),
        mtimeMs: Date.now(),
        ctimeMs: Date.now(),
        isDirectory: () => true,
      };
    }

    function makeStatForFile(path, size, mtimeMs) {
      return {
        dev: 1,
        ino: assignIno(path),
        mode: S_IFREG | 0o644,
        nlink: 1,
        uid: 0,
        gid: 0,
        rdev: 0,
        size,
        blksize: 4096,
        blocks: Math.ceil(size / 512),
        atimeMs: mtimeMs,
        mtimeMs,
        ctimeMs: mtimeMs,
        isDirectory: () => false,
      };
    }

    return {
      mode: state.mode,
      normalizePath(path) {
        return normalizePath(state.cwd, path);
      },
      cwd() {
        return state.cwd;
      },
      chdir(path) {
        state.cwd = normalizePath(state.cwd, path);
      },
      async open(path, flags, mode) {
        const normalized = normalizePath(state.cwd, path);

        if (flags & O_DIRECTORY) {
          const dirHandle = await getDirectoryHandle(normalized, false);
          const fd = state.nextFd++;
          state.fds.set(fd, {
            kind: "dir",
            handle: dirHandle,
            path: normalized,
            position: 0,
          });
          return fd;
        }

        let entry = await tryGetEntry(normalized);
        if (entry && flags & O_EXCL && flags & O_CREAT) {
          throw mkError("EEXIST");
        }
        if (!entry) {
          if (!(flags & O_CREAT)) {
            throw mkError("ENOENT");
          }

          const parent = await getParentDirectory(normalized, false);
          const parts = splitPath(normalized);
          const name = parts[parts.length - 1];
          const handle = await parent.getFileHandle(name, { create: true });
          assignIno(normalized);
          entry = { kind: "file", handle, path: normalized };
        }

        if (entry.kind !== "file") {
          throw mkError("EISDIR");
        }

        const syncAccess = await acquireSyncAccess(normalized, entry.handle);
        if (syncAccess) {
          const size = syncAccess.handle.getSize();
          const fd = state.nextFd++;
          state.fds.set(fd, {
            kind: "file",
            handle: entry.handle,
            path: normalized,
            syncAccess,
            size,
            mtimeMs: Date.now(),
            dirty: Boolean(flags & O_TRUNC),
            position: flags & O_APPEND ? size : 0,
            writeThrough: Boolean(flags & O_APPEND),
            mode: S_IFREG | (mode || 0o644),
          });

          if (flags & O_TRUNC) {
            syncAccess.handle.truncate(0);
            syncAccess.handle.flush();
            updateOpenFileState(normalized, 0, Date.now());
            state.fds.get(fd).dirty = false;
          }

          return fd;
        }

        let data = new Uint8Array(0);
        let size = 0;
        let mtimeMs = Date.now();
        if (!(flags & O_TRUNC)) {
          const existing = await readFileData(entry.handle);
          data = existing.data;
          size = existing.size;
          mtimeMs = existing.mtimeMs;
        }

        const fd = state.nextFd++;
        state.fds.set(fd, {
          kind: "file",
          handle: entry.handle,
          path: normalized,
          data,
          size,
          mtimeMs,
          dirty: Boolean(flags & O_TRUNC),
          position: flags & O_APPEND ? size : 0,
          // Some append-only users, notably neutrino headerfs, keep files open
          // for the lifetime of the process and rely on append writes being
          // durably reflected on disk without an explicit close on shutdown.
          writeThrough: Boolean(flags & O_APPEND),
          mode: S_IFREG | (mode || 0o644),
        });
        return fd;
      },
      async close(fd) {
        const entry = state.fds.get(fd);
        if (!entry) {
          return;
        }

        await flushFD(entry);
        if (entry.kind === "file" && entry.syncAccess) {
          releaseSyncAccess(entry.path, entry.syncAccess);
        }
        state.fds.delete(fd);
      },
      read(fd, buffer, offset, length, position) {
        const entry = state.fds.get(fd);
        if (!entry) {
          throw mkError("EBADF");
        }
        if (entry.kind !== "file") {
          throw mkError("EISDIR");
        }

        const start = position == null ? entry.position : Number(position);
        if (entry.syncAccess) {
          const available = entry.size - start;
          if (available <= 0) {
            if (position == null) {
              entry.position = entry.size;
            }
            return 0;
          }

          const target = buffer.subarray(
            offset,
            offset + Math.min(length, available),
          );
          const bytesRead = entry.syncAccess.handle.read(target, { at: start });
          if (position == null) {
            entry.position = start + bytesRead;
          }
          return bytesRead;
        }

        const end = Math.min(start + length, entry.size);
        const slice = entry.data.subarray(start, end);
        buffer.set(slice, offset);
        if (position == null) {
          entry.position = end;
        }
        return slice.length;
      },
      async write(fd, buf, offset, length, position) {
        const entry = state.fds.get(fd);
        if (!entry) {
          throw mkError("EBADF");
        }
        if (entry.kind !== "file") {
          throw mkError("EISDIR");
        }

        const start = position == null ? entry.position : Number(position);
        const end = start + length;
        const now = Date.now();
        if (entry.syncAccess) {
          const written = entry.syncAccess.handle.write(
            buf.subarray(offset, offset + length),
            { at: start },
          );
          const nextSize = Math.max(entry.size, start + written);
          updateOpenFileState(entry.path, nextSize, now);
          entry.dirty = true;
          if (position == null) {
            entry.position = start + written;
          }

          if (entry.writeThrough) {
            await flushFD(entry);
          }

          return written;
        }

        ensureFileCapacity(entry, end);
        if (start > entry.size) {
          entry.data.fill(0, entry.size, start);
        }
        entry.data.set(buf.subarray(offset, offset + length), start);
        entry.size = Math.max(entry.size, end);
        entry.mtimeMs = now;
        entry.dirty = true;
        if (position == null) {
          entry.position = end;
        }

        if (entry.writeThrough) {
          await flushFD(entry);
        }

        return length;
      },
      async stat(path) {
        const entry = await getEntry(path);
        if (entry.kind === "dir") {
          return makeStatForDir(
            entry.path,
            await countDirectoryEntries(entry.handle),
          );
        }

        const openFile = getOpenFileState(entry.path);
        if (openFile) {
          return makeStatForFile(
            entry.path,
            openFile.size,
            openFile.mtimeMs || Date.now(),
          );
        }

        const file = await entry.handle.getFile();
        return makeStatForFile(
          entry.path,
          state.syncAccessByPath.get(entry.path)?.handle.getSize() ?? file.size,
          file.lastModified || Date.now(),
        );
      },
      async lstat(path) {
        return this.stat(path);
      },
      async fstat(fd) {
        const entry = state.fds.get(fd);
        if (!entry) {
          throw mkError("EBADF");
        }
        if (entry.kind === "dir") {
          return makeStatForDir(
            entry.path,
            await countDirectoryEntries(entry.handle),
          );
        }

        if (entry.syncAccess) {
          return makeStatForFile(
            entry.path,
            entry.size,
            entry.mtimeMs || Date.now(),
          );
        }

        return makeStatForFile(
          entry.path,
          entry.size,
          entry.mtimeMs || Date.now(),
        );
      },
      async mkdir(path) {
        const normalized = normalizePath(state.cwd, path);
        if (await tryGetEntry(normalized)) {
          throw mkError("EEXIST");
        }

        const parent = await getParentDirectory(normalized, false);
        const parts = splitPath(normalized);
        await parent.getDirectoryHandle(parts[parts.length - 1], {
          create: true,
        });
        assignIno(normalized);
      },
      async readdir(path) {
        const entry = await getEntry(path);
        if (entry.kind !== "dir") {
          throw mkError("ENOTDIR");
        }

        const names = [];
        for await (const [name] of entry.handle.entries()) {
          names.push(name);
        }
        names.sort();
        return names;
      },
      async unlink(path) {
        const normalized = normalizePath(state.cwd, path);
        const entry = await getEntry(normalized);
        if (entry.kind !== "file") {
          throw mkError("EISDIR");
        }

        const parent = await getParentDirectory(normalized, false);
        const parts = splitPath(normalized);
        await parent.removeEntry(parts[parts.length - 1], { recursive: false });
        clearInoPath(normalized);
      },
      async rmdir(path) {
        const normalized = normalizePath(state.cwd, path);
        const entry = await getEntry(normalized);
        if (entry.kind !== "dir") {
          throw mkError("ENOTDIR");
        }
        if (await countDirectoryEntries(entry.handle)) {
          throw mkError("ENOTEMPTY");
        }

        const parent = await getParentDirectory(normalized, false);
        const parts = splitPath(normalized);
        await parent.removeEntry(parts[parts.length - 1], { recursive: false });
        clearInoPath(normalized);
      },
      async rename(from, to) {
        const sourcePath = normalizePath(state.cwd, from);
        const destPath = normalizePath(state.cwd, to);
        if (sourcePath === destPath) {
          return;
        }

        // This is intentionally not metadata-only. In the OPFS backend we
        // currently emulate rename by copying the source tree to the
        // destination and then deleting the source, which means large-file
        // renames are proportional to file size rather than effectively free.
        await removeExistingDestination(destPath);
        await copyEntry(sourcePath, destPath);

        const source = await getEntry(sourcePath);
        const parent = await getParentDirectory(sourcePath, false);
        const parts = splitPath(sourcePath);
        await parent.removeEntry(parts[parts.length - 1], {
          recursive: source.kind === "dir",
        });
        clearInoPath(sourcePath);
      },
      async truncate(path, length) {
        const normalized = normalizePath(state.cwd, path);
        const entry = await getEntry(normalized);
        if (entry.kind !== "file") {
          throw mkError("EISDIR");
        }

        const syncAccess = state.syncAccessByPath.get(normalized);
        const size = Number(length);
        if (syncAccess) {
          syncAccess.handle.truncate(size);
          syncAccess.handle.flush();
          updateOpenFileState(normalized, size, Date.now());
          return;
        }

        const current = await readFileData(entry.handle);
        let next = current.data;
        if (size < next.length) {
          next = next.subarray(0, size);
        } else {
          const grown = new Uint8Array(size);
          grown.set(next);
          next = grown;
        }

        const writable = await entry.handle.createWritable();
        await writable.write(next);
        await writable.close();
      },
      async ftruncate(fd, length) {
        const entry = state.fds.get(fd);
        if (!entry) {
          throw mkError("EBADF");
        }
        if (entry.kind !== "file") {
          throw mkError("EISDIR");
        }

        const size = Number(length);
        if (entry.syncAccess) {
          entry.syncAccess.handle.truncate(size);
          updateOpenFileState(entry.path, size, Date.now());
          entry.dirty = true;
          return;
        }

        if (size < entry.size) {
          entry.size = size;
          if (entry.position > size) {
            entry.position = size;
          }
        } else {
          ensureFileCapacity(entry, size);
          if (size > entry.size) {
            entry.data.fill(0, entry.size, size);
          }
          entry.size = size;
        }
        entry.mtimeMs = Date.now();
        entry.dirty = true;
      },
      async fsync(fd) {
        const entry = state.fds.get(fd);
        if (!entry) {
          throw mkError("EBADF");
        }

        await flushFD(entry);
      },
      chmod() {},
      fchmod() {},
      chown() {},
      fchown() {},
      lchown() {},
      link() {
        throw mkError("ENOSYS");
      },
      readlink() {
        throw mkError("EINVAL");
      },
      symlink() {
        throw mkError("ENOSYS");
      },
      utimes() {},
    };
  }

  globalThis.__lndWasmCreateOPFSBackend = createOPFSBackend;
})();
