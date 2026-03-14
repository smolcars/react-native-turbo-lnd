const https = require("https");
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const { exec } = require("child_process");
const util = require("util");

const execPromise = util.promisify(exec);

const { version: packageVersion } = require("./package.json");
const lndDownloadUrl = `https://github.com/hsjoberg/react-native-turbo-lnd/releases/download/v${packageVersion}`;

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
    await execPromise(`unzip -o "${zipPath}" -d "${outputDir}"`);
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
  const iosPath = path.join(process.cwd(), "ios");
  await fsp.mkdir(iosPath, { recursive: true });

  const zipPath = path.join(process.cwd(), "liblnd-ios.zip");
  await downloadFile(`${lndDownloadUrl}/liblnd-ios.zip`, zipPath);

  const tempDir = path.join(process.cwd(), "temp-ios");
  await fsp.mkdir(tempDir, { recursive: true });
  await unzip(zipPath, tempDir);

  const sourcePath = path.join(tempDir, "liblnd-fat.a");
  const targetPath = path.join(iosPath, "liblnd.a");

  try {
    await fsp.access(sourcePath);
    await fsp.rename(sourcePath, targetPath);
    console.log(`Moved ${sourcePath} to ${targetPath}`);

    // Remove liblnd.h if it exists
    const hPath = path.join(tempDir, "liblnd.h");
    await removeFile(hPath);
  } catch {
    console.warn(`Warning: Expected file ${sourcePath} not found`);
  }

  await fsp.unlink(zipPath);
  await fsp.rm(tempDir, { recursive: true, force: true });

  console.log("iOS binary setup completed.");
}

async function main() {
  try {
    await setupAndroidBinaries();
    await setupIOSBinaries();
    console.log("LND binaries setup completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error setting up LND binaries:", error);
    process.exit(1);
  }
}

main();
