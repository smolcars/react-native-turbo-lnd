const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const targetRoot = path.join(repoRoot, "proto");

function usage() {
  console.error("Usage: node scripts/sync-lnd-protos.cjs <path-to-lnd-root>");
}

function walkProtoFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkProtoFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".proto")) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function syncLndProtos(lndRoot) {
  const sourceRoot = path.join(lndRoot, "lnrpc");

  if (!fs.existsSync(sourceRoot) || !fs.statSync(sourceRoot).isDirectory()) {
    throw new Error(`Could not find lnd proto directory at ${sourceRoot}`);
  }

  const protoFiles = walkProtoFiles(sourceRoot);
  if (protoFiles.length === 0) {
    throw new Error(`No .proto files found under ${sourceRoot}`);
  }

  // `proto/` is a mirror of lnd's `lnrpc/` tree. Recreate it so files removed
  // upstream cannot linger in the generated bindings.
  fs.rmSync(targetRoot, { recursive: true, force: true });

  for (const sourcePath of protoFiles) {
    const relativePath = path.relative(sourceRoot, sourcePath);
    const destinationPath = path.join(targetRoot, relativePath);

    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
    fs.copyFileSync(sourcePath, destinationPath);
  }

  console.log(
    `Synced ${protoFiles.length} proto files from ${sourceRoot} to ${targetRoot}`
  );

  return protoFiles.length;
}

if (require.main === module) {
  const lndRootArg = process.argv[2];
  if (!lndRootArg) {
    usage();
    process.exit(1);
  }

  syncLndProtos(path.resolve(process.cwd(), lndRootArg));
}

module.exports = { syncLndProtos };
