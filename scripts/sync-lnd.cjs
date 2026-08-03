const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { syncLndProtos } = require("./sync-lnd-protos.cjs");

const projectRoot = path.resolve(__dirname, "..");
const sourceConfigPath = path.join(projectRoot, "lnd-source.properties");
const managedCheckoutPath = path.join(projectRoot, ".cache", "lnd-sync");

function readSourceConfig() {
  const config = {};
  const contents = fs.readFileSync(sourceConfigPath, "utf8");

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separator = line.indexOf("=");
    if (separator === -1) {
      throw new Error(`Invalid line in ${sourceConfigPath}: ${rawLine}`);
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    config[key] = value;
  }

  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(config.repository ?? "")) {
    throw new Error(`Invalid lnd repository in ${sourceConfigPath}`);
  }

  if (!/^[0-9a-f]{40}$/.test(config.ref ?? "")) {
    throw new Error(`Invalid lnd commit in ${sourceConfigPath}`);
  }

  return config;
}

function run(command, args, cwd = projectRoot) {
  execFileSync(command, args, {
    cwd,
    stdio: "inherit",
    env: {
      ...process.env,
      // Prevent MSYS2 from rewriting protoc and generator arguments on Windows.
      MSYS_NO_PATHCONV: process.env.MSYS_NO_PATHCONV ?? "1",
      MSYS2_ARG_CONV_EXCL: process.env.MSYS2_ARG_CONV_EXCL ?? "*",
    },
  });
}

function output(command, args, cwd = projectRoot) {
  return execFileSync(command, args, {
    cwd,
    encoding: "utf8",
  }).trim();
}

function ensureManagedCheckout(source) {
  const gitDirectory = path.join(managedCheckoutPath, ".git");

  if (!fs.existsSync(gitDirectory)) {
    if (
      fs.existsSync(managedCheckoutPath) &&
      fs.readdirSync(managedCheckoutPath).length > 0
    ) {
      throw new Error(
        `${managedCheckoutPath} exists but is not a managed git checkout`
      );
    }

    fs.mkdirSync(path.dirname(managedCheckoutPath), { recursive: true });
    run("git", [
      "clone",
      "--filter=blob:none",
      "--no-checkout",
      `https://github.com/${source.repository}.git`,
      managedCheckoutPath,
    ]);
  }

  run("git", [
    "-C",
    managedCheckoutPath,
    "fetch",
    "--depth=1",
    "origin",
    source.ref,
  ]);
  run("git", ["-C", managedCheckoutPath, "checkout", "--detach", source.ref]);

  return managedCheckoutPath;
}

function verifyCheckout(lndRoot, source) {
  const actualRef = output("git", ["-C", lndRoot, "rev-parse", "HEAD"]);
  if (actualRef !== source.ref) {
    throw new Error(
      `Expected lnd checkout ${lndRoot} to be at ${source.ref}, found ${actualRef}`
    );
  }
}

function generateBindings() {
  if (process.platform !== "win32") {
    run("bun", ["run", "generate-bindings"]);
    return;
  }

  const msysShell = [
    process.env.MSYS2_SH,
    "C:\\msys64\\usr\\bin\\sh.exe",
    "C:\\tools\\msys64\\usr\\bin\\sh.exe",
  ].find((candidate) => candidate && fs.existsSync(candidate));

  if (!msysShell) {
    throw new Error(
      "MSYS2 sh was not found. Install MSYS2 or set MSYS2_SH to sh.exe."
    );
  }

  run(
    msysShell,
    ["gen_bindings.sh"],
    path.join(projectRoot, "protoc-generator")
  );
}

const args = process.argv.slice(2).filter((arg) => arg !== "--");
if (args.length > 1) {
  console.error("Usage: node scripts/sync-lnd.cjs [path-to-lnd-root]");
  process.exit(1);
}

const source = readSourceConfig();
const lndRoot = args[0]
  ? path.resolve(process.cwd(), args[0])
  : ensureManagedCheckout(source);

verifyCheckout(lndRoot, source);
syncLndProtos(lndRoot);
generateBindings();
run("bun", ["run", "generate-codegen-specs"]);

console.log(`Synced generated sources with ${source.repository}@${source.ref}`);
