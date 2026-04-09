const fs = require("fs");
const path = require("path");

const ADDON_FILENAME = "turbolnd_napi.node";

function getPlatformArchDir() {
  if (
    (process.platform !== "win32" &&
      process.platform !== "darwin" &&
      process.platform !== "linux") ||
    (process.arch !== "x64" && process.arch !== "arm64")
  ) {
    throw new Error(
      `Unsupported platform/arch for Electrobun N-API prebuild sync: ${process.platform}-${process.arch}`
    );
  }

  return `${process.platform}-${process.arch}`;
}

function main() {
  const projectRoot = path.resolve(__dirname, "..");
  const platformArchDir = getPlatformArchDir();
  const sourcePath = path.join(
    projectRoot,
    "electrobun-napi-addon",
    "build",
    "Release",
    ADDON_FILENAME
  );

  if (!fs.existsSync(sourcePath)) {
    throw new Error(
      `Built N-API addon not found: ${sourcePath}\nRun "bun run build-napi-addon" first.`
    );
  }

  const destinationDir = path.join(
    projectRoot,
    "native",
    "napi",
    platformArchDir
  );
  const destinationPath = path.join(destinationDir, ADDON_FILENAME);

  fs.mkdirSync(destinationDir, { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);

  console.log(
    `[sync-electrobun-napi-prebuild] copied ${sourcePath} -> ${destinationPath}`
  );
}

main();
