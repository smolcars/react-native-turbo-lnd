const fs = require("fs");
const path = require("path");
const os = require("os");

const isWindows = os.platform() === "win32";

// Only apply the patch for Windows environments
if (isWindows) {
  const repoRoot = process.cwd();
  const hooksDir = path.join(repoRoot, ".git", "hooks");
  const hookNames = ["pre-commit", "commit-msg", "prepare-commit-msg"];
  const markerStart = "# Lefthook Windows Fixes Start";
  const markerEnd = "# Lefthook Windows Fixes End";

  for (const hookName of hookNames) {
    const hookPath = path.join(hooksDir, hookName);
    if (!fs.existsSync(hookPath)) {
      continue;
    }

    let original = fs.readFileSync(hookPath, "utf8");
    const hookCall = `call_lefthook run "${hookName}" "$@"`;
    if (!original.includes(hookCall)) {
      continue;
    }

    if (original.includes(markerStart) && original.includes(markerEnd)) {
      const startIndex = original.indexOf(markerStart);
      const endIndex = original.indexOf(markerEnd) + markerEnd.length;
      original = `${original.slice(0, startIndex)}${original.slice(endIndex)}`;
    } else if (original.includes("# Lefthook Windows Bin Fix")) {
      original = original.replace(
        /# Lefthook Windows Bin Fix[\s\S]*?\ncall_lefthook run "[^"]+" "\$@"/,
        hookCall
      );
    }

    const patchBlock = `${markerStart}
if [ -z "$LEFTHOOK_BIN" ]; then
  dir="$(git rev-parse --show-toplevel)"
  if test -f "$dir/node_modules/@evilmartians/lefthook/bin/lefthook-windows-x64/lefthook.exe"; then
    LEFTHOOK_BIN="$dir/node_modules/@evilmartians/lefthook/bin/lefthook-windows-x64/lefthook.exe"
  elif test -f "$dir/node_modules/@evilmartians/lefthook/bin/lefthook-windows-arm64/lefthook.exe"; then
    LEFTHOOK_BIN="$dir/node_modules/@evilmartians/lefthook/bin/lefthook-windows-arm64/lefthook.exe"
  fi
fi

pid_file="$(git rev-parse --git-path hooks)/lefthook-${hookName}.pid"
if test -f "$pid_file"; then
  stale_pid=$(tr -d '\\r\\n' < "$pid_file")
  if [ -n "$stale_pid" ]; then
    taskkill.exe //F //T //PID "$stale_pid" >/dev/null 2>&1 || true
  fi
  rm -f "$pid_file"
fi

call_lefthook run "${hookName}" "$@" &
lefthook_pid=$!
printf '%s' "$lefthook_pid" > "$pid_file"
wait "$lefthook_pid"
status=$?
rm -f "$pid_file"
exit "$status"
${markerEnd}`;

    const updated = original.replace(hookCall, patchBlock);
    fs.writeFileSync(hookPath, updated, "utf8");
  }
}
