const fs = require("fs");
const path = require("path");
const { createRequire } = require("module");

const exampleRoot = path.resolve(__dirname, "..");
const localNodeModules = path.join(exampleRoot, "node_modules");
const localElectrobun = path.join(localNodeModules, "electrobun");
const linkType = process.platform === "win32" ? "junction" : "dir";
const hoistedElectrobun = path.resolve(
  exampleRoot,
  "..",
  "node_modules",
  "electrobun"
);
const requireFromExample = createRequire(path.join(exampleRoot, "package.json"));
const examplePackageJson = require(path.join(exampleRoot, "package.json"));
const desiredElectrobunVersion = examplePackageJson.dependencies.electrobun;

function readInstalledVersion(packageDir) {
  const packageJsonPath = path.join(packageDir, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(packageJsonPath, "utf8")).version ?? null;
}

function resolveElectrobunDir() {
  const candidates = [];

  try {
    const resolvedEntry = requireFromExample.resolve("electrobun");
    candidates.push(path.resolve(path.dirname(resolvedEntry), "..", "..", ".."));
  } catch {
    // Fall through to the explicit hoisted path fallback below.
  }

  candidates.push(path.resolve(exampleRoot, "..", "node_modules", "electrobun"));

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

const resolvedElectrobunDir = resolveElectrobunDir();

if (!resolvedElectrobunDir) {
  throw new Error(
    'Could not resolve the installed "electrobun" package. Run "bun install" from the repo root first.'
  );
}

fs.mkdirSync(localNodeModules, { recursive: true });

if (fs.existsSync(localElectrobun)) {
  const localVersion = readInstalledVersion(localElectrobun);
  const hoistedVersion = readInstalledVersion(hoistedElectrobun);

  if (
    localVersion !== desiredElectrobunVersion &&
    hoistedVersion === desiredElectrobunVersion
  ) {
    fs.rmSync(localElectrobun, { recursive: true, force: true });
    fs.symlinkSync(hoistedElectrobun, localElectrobun, linkType);
    process.exit(0);
  }

  const currentRealPath = fs.realpathSync.native(localElectrobun);
  const resolvedRealPath = fs.realpathSync.native(resolvedElectrobunDir);

  if (currentRealPath === resolvedRealPath) {
    process.exit(0);
  }

  fs.rmSync(localElectrobun, { recursive: true, force: true });
}

if (path.resolve(localElectrobun) === path.resolve(resolvedElectrobunDir)) {
  process.exit(0);
}

fs.symlinkSync(resolvedElectrobunDir, localElectrobun, linkType);
