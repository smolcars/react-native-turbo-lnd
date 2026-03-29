const fs = require("fs");
const path = require("path");
const os = require("os");

const isWindows = os.platform() === "win32";

// Only apply the patch for Windows environments
if (isWindows) {
  const repoRoot = process.cwd();
  const hooksDir = path.join(repoRoot, ".git", "hooks");
  const hookNames = ["pre-commit", "commit-msg", "prepare-commit-msg"];
  const marker = "# Lefthook Windows Bin Fix";

  const patchBlock = `${marker}
if [ -z "$LEFTHOOK_BIN" ]; then
  dir="$(git rev-parse --show-toplevel)"
  if test -f "$dir/node_modules/@evilmartians/lefthook/bin/lefthook-windows-x64/lefthook.exe"; then
    LEFTHOOK_BIN="$dir/node_modules/@evilmartians/lefthook/bin/lefthook-windows-x64/lefthook.exe"
  elif test -f "$dir/node_modules/@evilmartians/lefthook/bin/lefthook-windows-arm64/lefthook.exe"; then
    LEFTHOOK_BIN="$dir/node_modules/@evilmartians/lefthook/bin/lefthook-windows-arm64/lefthook.exe"
  fi
fi
`;

  for (const hookName of hookNames) {
    const hookPath = path.join(hooksDir, hookName);
    if (!fs.existsSync(hookPath)) {
      continue;
    }

    const original = fs.readFileSync(hookPath, "utf8");
    if (original.includes(marker)) {
      continue;
    }

    const needle = 'call_lefthook run "';
    if (!original.includes(needle)) {
      continue;
    }

    const updated = original.replace(needle, `${patchBlock}\n${needle}`);
    fs.writeFileSync(hookPath, updated, "utf8");
  }
}
