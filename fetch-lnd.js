const https = require("https");
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const { execFile } = require("child_process");
const util = require("util");

const execFilePromise = util.promisify(execFile);

const { version: packageVersion } = require("./package.json");
const lndDownloadUrl = `https://github.com/hsjoberg/react-native-turbo-lnd/releases/download/v${packageVersion}`;
const defaultTargets = ["ios", "android"];
const supportedTargets = new Set(["android", "ios", "macos", "windows"]);
const targetSetups = {
  android: setupAndroidBinaries,
  ios: setupIOSBinaries,
  macos: setupMacOSBinaries,
  windows: setupWindowsBinaries,
};

function parseTargetsArg(argv) {
  const targetsArg = argv.find((arg) => arg.startsWith("--targets="));
  if (!targetsArg) {
    return [...defaultTargets];
  }

  const rawTargets = targetsArg
    .slice("--targets=".length)
    .split(",")
    .map((target) => target.trim().toLowerCase())
    .filter(Boolean);

  if (rawTargets.length === 0) {
    throw new Error(
      "--targets must include at least one target: android, ios, macos, windows"
    );
  }

  const invalidTargets = rawTargets.filter(
    (target) => !supportedTargets.has(target)
  );
  if (invalidTargets.length > 0) {
    throw new Error(
      `Unsupported targets: ${invalidTargets.join(
        ", "
      )}. Supported targets are: android, ios, macos, windows`
    );
  }

  return [...new Set(rawTargets)];
}

async function downloadFile(url, outputPath) {
  console.log(`Downloading file from ${url} to ${outputPath}`);
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 302) {
          downloadFile(response.headers.location, outputPath)
            .then(resolve)
            .catch(reject);
        } else if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(outputPath);
          response.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            resolve();
          });
        } else {
          reject(new Error(`Failed to download file: ${response.statusCode}`));
        }
      })
      .on("error", reject);
  });
}

async function unzip(zipPath, outputDir) {
  console.log(`Unzipping ${zipPath} to ${outputDir}`);
  try {
    if (process.platform === "win32") {
      await execFilePromise("powershell.exe", [
        "-NoProfile",
        "-NonInteractive",
        "-ExecutionPolicy",
        "Bypass",
        "-Command",
        "Expand-Archive",
        "-LiteralPath",
        zipPath,
        "-DestinationPath",
        outputDir,
        "-Force",
      ]);
    } else {
      await execFilePromise("unzip", ["-o", zipPath, "-d", outputDir]);
    }
    console.log("Unzip completed successfully");
  } catch (error) {
    console.error("Error during unzip:", error);
    throw error;
  }
}

async function removeFile(filePath) {
  try {
    await fsp.unlink(filePath);
    console.log(`Removed file: ${filePath}`);
  } catch (error) {
    console.error(`Error removing file ${filePath}:`, error);
  }
}

async function replaceFile(sourcePath, targetPath) {
  await fsp.copyFile(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

async function setupAndroidBinaries() {
  const jniLibsPath = path.join(
    process.cwd(),
    "android",
    "app",
    "src",
    "main",
    "jniLibs"
  );
  await fsp.mkdir(jniLibsPath, { recursive: true });

  const zipPath = path.join(process.cwd(), "liblnd-android.zip");
  await downloadFile(`${lndDownloadUrl}/liblnd-android.zip`, zipPath);

  await unzip(zipPath, jniLibsPath);
  await fsp.unlink(zipPath);

  const expectedArchitectures = ["arm64-v8a", "armeabi-v7a", "x86", "x86_64"];
  const missingArchitectures = [];

  for (const arch of expectedArchitectures) {
    const archPath = path.join(jniLibsPath, arch);
    const soPath = path.join(archPath, "liblnd.so");
    const hPath = path.join(archPath, "liblnd.h");

    try {
      await fsp.access(soPath);
      await removeFile(hPath);
    } catch {
      missingArchitectures.push(arch);
    }
  }

  if (missingArchitectures.length > 0) {
    console.warn(
      `Warning: Missing architectures: ${missingArchitectures.join(", ")}`
    );
  } else {
    console.log("All expected architectures found and .h files removed");
  }

  console.log("Android binaries setup completed.");
}

async function setupIOSBinaries() {
  await setupAppleBinaries("ios", "liblnd-ios.zip");
}

async function setupMacOSBinaries() {
  await setupAppleBinaries("macos", "liblnd-mac.zip");
}

async function setupAppleBinaries(targetDir, artifactName) {
  const platformPath = path.join(process.cwd(), targetDir);
  await fsp.mkdir(platformPath, { recursive: true });

  const zipPath = path.join(process.cwd(), artifactName);
  await downloadFile(`${lndDownloadUrl}/${artifactName}`, zipPath);

  const tempDir = path.join(process.cwd(), `temp-${targetDir}`);
  await fsp.mkdir(tempDir, { recursive: true });
  await unzip(zipPath, tempDir);

  const sourcePath = path.join(tempDir, "liblnd-fat.a");
  const targetPath = path.join(platformPath, "liblnd.a");

  try {
    await fsp.access(sourcePath);
    await replaceFile(sourcePath, targetPath);

    // Remove liblnd.h if it exists
    const hPath = path.join(tempDir, "liblnd.h");
    await removeFile(hPath);
  } catch {
    console.warn(`Warning: Expected file ${sourcePath} not found`);
  }

  await fsp.unlink(zipPath);
  await fsp.rm(tempDir, { recursive: true, force: true });

  console.log(`${targetDir} binary setup completed.`);
}

async function setupWindowsBinaries() {
  const windowsPath = path.join(process.cwd(), "windows");
  await fsp.mkdir(windowsPath, { recursive: true });

  const zipPath = path.join(process.cwd(), "liblnd-windows.zip");
  await downloadFile(`${lndDownloadUrl}/liblnd-windows.zip`, zipPath);

  const tempDir = path.join(process.cwd(), "temp-windows");
  await fsp.mkdir(tempDir, { recursive: true });
  await unzip(zipPath, tempDir);

  const sourcePath = path.join(tempDir, "liblnd.dll");
  const targetPath = path.join(windowsPath, "liblnd.dll");

  try {
    await fsp.access(sourcePath);
    await replaceFile(sourcePath, targetPath);

    const hPath = path.join(tempDir, "liblnd.h");
    await removeFile(hPath);
  } catch {
    console.warn(`Warning: Expected file ${sourcePath} not found`);
  }

  await fsp.unlink(zipPath);
  await fsp.rm(tempDir, { recursive: true, force: true });

  console.log("Windows binary setup completed.");
}

async function main() {
  try {
    const targets = parseTargetsArg(process.argv.slice(2));
    console.log(`Setting up LND binaries for targets: ${targets.join(", ")}`);

    for (const target of targets) {
      await targetSetups[target]();
    }

    console.log("LND binaries setup completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error setting up LND binaries:", error);
    process.exit(1);
  }
}

main();
