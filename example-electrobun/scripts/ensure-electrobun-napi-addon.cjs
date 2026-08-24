const fs = require("fs");
const path = require("path");
const { createRequire } = require("module");

const ADDON_FILENAME = "turbolnd_napi.node";
const NAPI_BACKEND_NAME = "napi";
const NAPI_ADDON_OVERRIDE_ENV_VAR = "TURBOLND_NAPI_ADDON_PATH";

function getPlatformArchDir() {
  if (
    (process.platform !== "win32" &&
      process.platform !== "darwin" &&
      process.platform !== "linux") ||
    (process.arch !== "x64" && process.arch !== "arm64")
  ) {
    throw new Error(
      `Unsupported platform/arch for Electrobun N-API addon: ${process.platform}-${process.arch}`
    );
  }

  return `${process.platform}-${process.arch}`;
}

function resolveTurboLndPackageRoot(exampleRoot) {
  const requireFromExample = createRequire(
    path.join(exampleRoot, "package.json")
  );
  const candidates = [];

  try {
    const packageJsonPath = requireFromExample.resolve(
      "react-native-turbo-lnd/package.json"
    );
    candidates.push(path.dirname(packageJsonPath));
  } catch {
    // Fall through to the workspace-root candidate below.
  }

  candidates.push(path.resolve(exampleRoot, ".."));

  for (const candidate of candidates) {
    const packageJsonPath = path.join(candidate, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
      continue;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    if (packageJson.name === "react-native-turbo-lnd") {
      return candidate;
    }
  }

  throw new Error(
    'Unable to locate the "react-native-turbo-lnd" package root.'
  );
}

function resolveAddonSourcePath(exampleRoot) {
  const overridePath = process.env[NAPI_ADDON_OVERRIDE_ENV_VAR];
  if (overridePath) {
    const resolvedOverridePath = path.resolve(overridePath);
    if (!fs.existsSync(resolvedOverridePath)) {
      throw new Error(
        `${NAPI_ADDON_OVERRIDE_ENV_VAR} does not exist: ${resolvedOverridePath}`
      );
    }
    return resolvedOverridePath;
  }

  const packageRoot = resolveTurboLndPackageRoot(exampleRoot);
  const platformArchDir = getPlatformArchDir();
  const candidatePaths = [
    path.join(packageRoot, "native", "napi", platformArchDir, ADDON_FILENAME),
    path.join(
      packageRoot,
      "electrobun-napi-addon",
      "build",
      "Release",
      ADDON_FILENAME
    ),
  ];

  for (const candidatePath of candidatePaths) {
    if (fs.existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  throw new Error(
    [
      "Unable to locate the Electrobun N-API addon.",
      "Checked paths:",
      ...candidatePaths.map((entry) => `  - ${entry}`),
      'Build the addon first with "bun run build-napi-addon" or sync a packaged prebuild with "bun run build-napi-prebuild".',
    ].join("\n")
  );
}

function main() {
  const configuredBackend =
    process.env.TURBOLND_ELECTROBUN_BACKEND?.trim().toLowerCase();
  if (configuredBackend && configuredBackend !== NAPI_BACKEND_NAME) {
    return;
  }

  const exampleRoot = path.resolve(__dirname, "..");
  const platformArchDir = getPlatformArchDir();
  const sourcePath = resolveAddonSourcePath(exampleRoot);
  const cacheDir = path.join(
    exampleRoot,
    "node_modules",
    ".electrobun-cache",
    "electrobun-napi-addon",
    platformArchDir
  );
  const destinationPath = path.join(cacheDir, ADDON_FILENAME);

  fs.mkdirSync(cacheDir, { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);

  console.log(
    `[ensure-electrobun-napi-addon] staged ${sourcePath} -> ${destinationPath}`
  );
}

main();
