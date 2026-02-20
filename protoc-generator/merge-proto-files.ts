/* eslint-disable */
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

async function mergeProtoFiles(mainFile: string, ...filesToMerge: string[]) {
  let mainContent = await readFile(mainFile, "utf8");

  for (const file of filesToMerge) {
    const content = await readFile(file, "utf8");
    const exportIndex = content.indexOf("export const");

    if (exportIndex === -1) {
      console.warn(`No export statement found in ${file}. Skipping this file.`);
      continue;
    }

    const relevantContent = content.slice(exportIndex).trim();
    if (relevantContent) {
      mainContent += `\n\n\n\n// Merged from ${basename(file)}\n${relevantContent}`;
    }
  }

  await writeFile(mainFile, mainContent, "utf8");
  console.log(`[protoc-generator] Merged ${filesToMerge.join(", ")} into ${mainFile}`);
}

if (import.meta.main) {
  await mergeProtoFiles(
    "build/proto/lightning_pb.ts",
    "build/proto/walletunlocker_pb.ts",
    "build/proto/stateservice_pb.ts"
  );
  await mergeProtoFiles(
    "build/proto/chainrpc/chainnotifier_pb.ts",
    "build/proto/chainrpc/chainkit_pb.ts"
  );
}
