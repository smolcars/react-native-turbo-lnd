const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const targetRoot = path.join(repoRoot, "proto");
const lndRootArg = process.argv[2];

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

  return files;
}

if (!lndRootArg) {
  usage();
  process.exit(1);
}

const lndRoot = path.resolve(process.cwd(), lndRootArg);
const sourceRoot = path.join(lndRoot, "lnrpc");

if (!fs.existsSync(sourceRoot) || !fs.statSync(sourceRoot).isDirectory()) {
  console.error(`Could not find lnd proto directory at ${sourceRoot}`);
  process.exit(1);
}

const protoFiles = walkProtoFiles(sourceRoot);
if (protoFiles.length === 0) {
  console.error(`No .proto files found under ${sourceRoot}`);
  process.exit(1);
}

for (const sourcePath of protoFiles) {
  const relativePath = path.relative(sourceRoot, sourcePath);
  const destinationPath = path.join(targetRoot, relativePath);

  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
}

console.log(
  `Synced ${protoFiles.length} proto files from ${sourceRoot} to ${targetRoot}`
);
