const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const packageJson = require("../package.json");

const ARTIFACT_FILENAMES = [
  "liblnd-android.zip",
  "liblnd-ios.zip",
  "liblnd-macos.zip",
  "liblnd-macos-dylib.zip",
  "liblnd-linux.zip",
  "liblnd-windows.zip",
];

function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return `sha256:${hash.digest("hex")}`;
}

function main() {
  const assetDir = process.env.TURBOLND_RELEASE_ASSETS_DIR
    ? path.resolve(process.env.TURBOLND_RELEASE_ASSETS_DIR)
    : path.resolve(process.cwd(), "dist");

  const assets = {};

  for (const assetName of ARTIFACT_FILENAMES) {
    const assetPath = path.join(assetDir, assetName);
    if (!fs.existsSync(assetPath)) {
      throw new Error(`Missing release asset for manifest generation: ${assetPath}`);
    }

    assets[assetName] = sha256File(assetPath);
  }

  const manifest = {
    version: packageJson.version,
    assets,
  };

  fs.writeFileSync(
    path.resolve(__dirname, "..", "artifacts.json"),
    `${JSON.stringify(manifest, null, 2)}\n`
  );
}

main();
