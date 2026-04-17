/// <reference lib="webworker" />

import { registerWasmWorkerRuntime } from "./wasm-worker-core.js";

let configuredAssetBaseUrl = "/vendor/lnd-wasm/";

function normalizeAssetBaseUrl(assetBaseUrl: string) {
  return assetBaseUrl.endsWith("/") ? assetBaseUrl : `${assetBaseUrl}/`;
}

function getAssetUrl(fileName: string) {
  return `${configuredAssetBaseUrl}${fileName}`;
}

registerWasmWorkerRuntime((assetBaseUrl) => {
  configuredAssetBaseUrl = normalizeAssetBaseUrl(
    assetBaseUrl ?? configuredAssetBaseUrl,
  );

  return {
    fsOpfsBackend: getAssetUrl("fs_opfs_backend.js"),
    fsBackends: getAssetUrl("fs_backends.js"),
    wasmExec: getAssetUrl("wasm_exec.js"),
    wasmBinary: getAssetUrl("lndmobile.wasm"),
  };
});
