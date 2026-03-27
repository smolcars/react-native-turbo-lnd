const https = require("https");
const fs = require("fs");
const fsp = fs.promises;
const os = require("os");
const path = require("path");
const { execFile } = require("child_process");
const util = require("util");

const execFilePromise = util.promisify(execFile);

const packageJson = require("./package.json");
const { version: packageVersion, repository } = packageJson;

function getGitHubRepoPath() {
  const repositoryUrl = repository?.url;
  const match = String(repositoryUrl).match(
    /github\.com[:/]([^/]+\/[^/#.]+)(?:\.git)?(?:#.*)?$/
  );

  if (match) {
    return match[1];
  }

  throw new Error(
    "Unable to resolve GitHub repository path from package.json repository.url"
  );
}

const lndDownloadUrl = `https://github.com/${getGitHubRepoPath()}/releases/download/v${packageVersion}`;
const packageRoot = __dirname;
const defaultTargets = ["ios", "android"];
const supportedTargets = new Set([
  "android",
  "ios",
  "macos",
  "macos-dylib",
  "linux",
  "windows",
]);
const supportedTargetsList = [...supportedTargets].join(", ");
const targetSetups = {
  "android": setupAndroidBinaries,
  "ios": setupIOSBinaries,
  "macos": setupMacOSBinaries,
  "macos-dylib": setupMacOSDylibBinaries,
  "linux": setupLinuxBinaries,
  "windows": setupWindowsBinaries,
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
      `--targets must include at least one target: ${supportedTargetsList}`
    );
  }

  const invalidTargets = rawTargets.filter(
    (target) => !supportedTargets.has(target)
  );
  if (invalidTargets.length > 0) {
    throw new Error(
      `Unsupported targets: ${invalidTargets.join(
        ", "
      )}. Supported targets are: ${supportedTargetsList}`
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

async function withTempDir(prefix, callback) {
  const tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), prefix));

  try {
    return await callback(tempDir);
  } finally {
    await fsp.rm(tempDir, { recursive: true, force: true });
  }
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
  const androidLibsPath = path.join(
    packageRoot,
    "android",
    "src",
    "main",
    "jniLibs"
  );
  await fsp.mkdir(androidLibsPath, { recursive: true });

  await withTempDir("react-native-turbo-lnd-android-", async (tempDir) => {
    const zipPath = path.join(tempDir, "liblnd-android.zip");
    await downloadFile(`${lndDownloadUrl}/liblnd-android.zip`, zipPath);
    await unzip(zipPath, tempDir);

    const expectedArchitectures = ["arm64-v8a", "armeabi-v7a", "x86", "x86_64"];
    for (const arch of expectedArchitectures) {
      const sourceDir = path.join(tempDir, arch);
      const soSource = path.join(sourceDir, "liblnd.so");
      const targetLibDir = path.join(androidLibsPath, arch);

      await fsp.mkdir(targetLibDir, { recursive: true });

      try {
        await fsp.access(soSource);
        await replaceFile(soSource, path.join(targetLibDir, "liblnd.so"));
      } catch {
        // validated below
      }
    }
  });

  const expectedArchitectures = ["arm64-v8a", "armeabi-v7a", "x86", "x86_64"];
  const missingArchitectures = [];

  for (const arch of expectedArchitectures) {
    const archPath = path.join(androidLibsPath, arch);
    const soPath = path.join(archPath, "liblnd.so");

    try {
      await fsp.access(soPath);
    } catch {
      missingArchitectures.push(arch);
    }
  }

  if (missingArchitectures.length > 0) {
    console.warn(
      `Warning: Missing architectures: ${missingArchitectures.join(", ")}`
    );
  } else {
    console.log("All expected Android architectures found");
  }

  console.log("Android binaries setup completed.");
}

async function setupIOSBinaries() {
  await setupAppleBinaries("ios", "liblnd-ios.zip");
}

async function setupMacOSBinaries() {
  await setupAppleBinaries("macos", "liblnd-macos.zip");
}

async function setupMacOSDylibBinaries() {
  await setupDesktopSharedLibraryBinaries(
    "liblnd-macos-dylib.zip",
    "liblnd.dylib"
  );
}

async function setupLinuxBinaries() {
  await setupDesktopSharedLibraryBinaries("liblnd-linux.zip", "liblnd.so");
}

async function setupAppleBinaries(targetDir, artifactName) {
  const platformPath = path.join(packageRoot, targetDir);
  await fsp.mkdir(platformPath, { recursive: true });

  await withTempDir(`react-native-turbo-lnd-${targetDir}-`, async (tempDir) => {
    const zipPath = path.join(tempDir, artifactName);
    await downloadFile(`${lndDownloadUrl}/${artifactName}`, zipPath);
    await unzip(zipPath, tempDir);

    const sourcePath = path.join(tempDir, "liblnd-fat.a");
    const targetPath = path.join(platformPath, "liblnd.a");

    try {
      await fsp.access(sourcePath);
      await replaceFile(sourcePath, targetPath);

      const hPath = path.join(tempDir, "liblnd.h");
      await removeFile(hPath);
    } catch {
      console.warn(`Warning: Expected file ${sourcePath} not found`);
    }
  });

  console.log(`${targetDir} binary setup completed.`);
}

async function setupDesktopSharedLibraryBinaries(
  artifactName,
  libraryFilename
) {
  const outputDir = process.cwd();
  await fsp.mkdir(outputDir, { recursive: true });

  await withTempDir(
    `react-native-turbo-lnd-${libraryFilename}-`,
    async (tempDir) => {
      const zipPath = path.join(tempDir, artifactName);
      await downloadFile(`${lndDownloadUrl}/${artifactName}`, zipPath);
      await unzip(zipPath, tempDir);

      const sourcePath = path.join(tempDir, libraryFilename);
      const targetPath = path.join(outputDir, libraryFilename);

      try {
        await fsp.access(sourcePath);
        await replaceFile(sourcePath, targetPath);

        const hPath = path.join(tempDir, "liblnd.h");
        await removeFile(hPath);
      } catch {
        console.warn(`Warning: Expected file ${sourcePath} not found`);
      }
    }
  );

  console.log(`${libraryFilename} setup completed.`);
}

async function setupWindowsBinaries() {
  const windowsPath = path.join(packageRoot, "windows");
  await fsp.mkdir(windowsPath, { recursive: true });

  await withTempDir("react-native-turbo-lnd-windows-", async (tempDir) => {
    const zipPath = path.join(tempDir, "liblnd-windows.zip");
    await downloadFile(`${lndDownloadUrl}/liblnd-windows.zip`, zipPath);
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
  });

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
