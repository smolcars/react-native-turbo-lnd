"use strict";

// Shared browser filesystem shim for the Go js/wasm runtime. The concrete
// backends live in fs_mem_backend.js and fs_opfs_backend.js.
(() => {
  if (globalThis.__lndWasmPrepareFS) {
    return;
  }

  const O_WRONLY = 0x1;
  const O_RDWR = 0x2;
  const O_CREAT = 0x40;
  const O_EXCL = 0x80;
  const O_TRUNC = 0x200;
  const O_APPEND = 0x400;
  const O_DIRECTORY = 0x10000;

  const runtime = { backend: null };
  const output = { buf: "" };
  const textDecoder = new TextDecoder();

  globalThis.__lndWasmStdoutLines = globalThis.__lndWasmStdoutLines || [];
  globalThis.__lndWasmOnStdoutLine = globalThis.__lndWasmOnStdoutLine || null;

  function mkError(code, message) {
    const err = new Error(message || code);
    err.code = code;
    return err;
  }

  function shouldMirrorStdoutToConsole() {
    return Boolean(globalThis.__lndWasmMirrorStdoutToConsole);
  }

  function pushStdoutLine(line) {
    if (!line) {
      return;
    }

    globalThis.__lndWasmStdoutLines.push(line);
    if (globalThis.__lndWasmStdoutLines.length > 500) {
      globalThis.__lndWasmStdoutLines.shift();
    }

    if (typeof globalThis.__lndWasmOnStdoutLine === "function") {
      globalThis.__lndWasmOnStdoutLine(line);
    }
  }

  function writeStdout(buf) {
    output.buf += textDecoder.decode(buf);

    let nl = output.buf.indexOf("\n");
    while (nl !== -1) {
      const line = output.buf.slice(0, nl);
      if (shouldMirrorStdoutToConsole()) {
        console.log(line);
      }
      pushStdoutLine(line);
      output.buf = output.buf.slice(nl + 1);
      nl = output.buf.indexOf("\n");
    }

    return buf.length;
  }

  function getBackend() {
    if (!runtime.backend) {
      throw mkError("ENOSYS", "filesystem backend is not initialized");
    }

    return runtime.backend;
  }

  function callbackify(method, callback, ...args) {
    Promise.resolve()
      .then(() => method(...args))
      .then((result) => callback(null, result))
      .catch((err) => callback(err));
  }

  function callbackifyMaybeSync(method, callback, ...args) {
    try {
      const result = method(...args);
      if (result && typeof result.then === "function") {
        result.then((value) => callback(null, value)).catch((err) => callback(err));
        return;
      }

      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }

  globalThis.path = {
    resolve: (...parts) => getBackend().normalizePath(parts.join("/")),
  };

  globalThis.process = {
    getuid: () => 0,
    getgid: () => 0,
    geteuid: () => 0,
    getegid: () => 0,
    getgroups: () => [],
    pid: 1,
    ppid: 1,
    umask: () => 0,
    cwd: () => getBackend().cwd(),
    chdir: (path) => getBackend().chdir(path),
  };

  globalThis.fs = {
    constants: {
      O_WRONLY,
      O_RDWR,
      O_CREAT,
      O_TRUNC,
      O_APPEND,
      O_EXCL,
      O_DIRECTORY,
    },
    writeSync(fd, buf) {
      if (fd === 1 || fd === 2) {
        return writeStdout(buf);
      }

      throw mkError("ENOSYS");
    },
    write(fd, buf, offset, length, position, callback) {
      if (fd === 1 || fd === 2) {
        callback(null, writeStdout(buf.subarray(offset, offset + length)));
        return;
      }

      callbackify(
        (...args) => getBackend().write(...args),
        callback,
        fd,
        buf,
        offset,
        length,
        position,
      );
    },
    read(fd, buffer, offset, length, position, callback) {
      callbackifyMaybeSync(
        (...args) => getBackend().read(...args),
        callback,
        fd,
        buffer,
        offset,
        length,
        position,
      );
    },
    open(path, flags, mode, callback) {
      callbackify(
        (...args) => getBackend().open(...args),
        callback,
        path,
        flags,
        mode,
      );
    },
    close(fd, callback) {
      callbackify((fileFD) => getBackend().close(fileFD), callback, fd);
    },
    stat(path, callback) {
      callbackify((filePath) => getBackend().stat(filePath), callback, path);
    },
    lstat(path, callback) {
      callbackify((filePath) => getBackend().lstat(filePath), callback, path);
    },
    fstat(fd, callback) {
      callbackify((fileFD) => getBackend().fstat(fileFD), callback, fd);
    },
    mkdir(path, perm, callback) {
      callbackify(
        (dirPath, dirPerm) => getBackend().mkdir(dirPath, dirPerm),
        callback,
        path,
        perm,
      );
    },
    readdir(path, callback) {
      callbackify((dirPath) => getBackend().readdir(dirPath), callback, path);
    },
    unlink(path, callback) {
      callbackify((filePath) => getBackend().unlink(filePath), callback, path);
    },
    rmdir(path, callback) {
      callbackify((dirPath) => getBackend().rmdir(dirPath), callback, path);
    },
    rename(from, to, callback) {
      callbackify(
        (src, dst) => getBackend().rename(src, dst),
        callback,
        from,
        to,
      );
    },
    truncate(path, length, callback) {
      callbackify(
        (filePath, size) => getBackend().truncate(filePath, size),
        callback,
        path,
        length,
      );
    },
    ftruncate(fd, length, callback) {
      callbackify(
        (fileFD, size) => getBackend().ftruncate(fileFD, size),
        callback,
        fd,
        length,
      );
    },
    fsync(fd, callback) {
      callbackify((fileFD) => getBackend().fsync(fileFD), callback, fd);
    },
    chmod(path, mode, callback) {
      callbackify(
        (filePath, nextMode) => getBackend().chmod(filePath, nextMode),
        callback,
        path,
        mode,
      );
    },
    fchmod(fd, mode, callback) {
      callbackify(
        (fileFD, nextMode) => getBackend().fchmod(fileFD, nextMode),
        callback,
        fd,
        mode,
      );
    },
    chown(path, uid, gid, callback) {
      callbackify(
        (filePath, nextUID, nextGID) =>
          getBackend().chown(filePath, nextUID, nextGID),
        callback,
        path,
        uid,
        gid,
      );
    },
    fchown(fd, uid, gid, callback) {
      callbackify(
        (fileFD, nextUID, nextGID) =>
          getBackend().fchown(fileFD, nextUID, nextGID),
        callback,
        fd,
        uid,
        gid,
      );
    },
    lchown(path, uid, gid, callback) {
      callbackify(
        (filePath, nextUID, nextGID) =>
          getBackend().lchown(filePath, nextUID, nextGID),
        callback,
        path,
        uid,
        gid,
      );
    },
    link(path, link, callback) {
      callbackify(
        (src, dst) => getBackend().link(src, dst),
        callback,
        path,
        link,
      );
    },
    readlink(path, callback) {
      callbackify(
        (filePath) => getBackend().readlink(filePath),
        callback,
        path,
      );
    },
    symlink(path, link, callback) {
      callbackify(
        (src, dst) => getBackend().symlink(src, dst),
        callback,
        path,
        link,
      );
    },
    utimes(path, atime, mtime, callback) {
      callbackify(
        (filePath, nextATime, nextMTime) =>
          getBackend().utimes(filePath, nextATime, nextMTime),
        callback,
        path,
        atime,
        mtime,
      );
    },
  };

  globalThis.__lndWasmPrepareFS = async (mode) => {
    const nextMode = mode || "opfs";

    switch (nextMode) {
      case "memory":
        if (!globalThis.__lndWasmCreateMemFSBackend) {
          throw new Error("memory fs backend is unavailable");
        }
        runtime.backend = globalThis.__lndWasmCreateMemFSBackend({
          S_IFDIR: 0o040000,
          S_IFREG: 0o100000,
          O_WRONLY,
          O_RDWR,
          O_CREAT,
          O_EXCL,
          O_TRUNC,
          O_APPEND,
          O_DIRECTORY,
          normalizePath(cwd, path) {
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
          },
          mkError,
        });
        break;
      case "opfs":
        if (!globalThis.__lndWasmCreateOPFSBackend) {
          throw new Error("opfs backend is unavailable");
        }
        runtime.backend = await globalThis.__lndWasmCreateOPFSBackend();
        break;
      default:
        throw new Error(`unknown fs backend: ${nextMode}`);
    }

    return { mode: runtime.backend.mode };
  };
})();
