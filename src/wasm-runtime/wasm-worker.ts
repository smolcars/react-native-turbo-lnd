/// <reference lib="webworker" />

import { registerWasmWorkerRuntime } from "./wasm-worker-core.js";

function getFsOpfsBackendUrl() {
  return new URL("./assets/fs_opfs_backend.js", import.meta.url).href;
}

function getFsBackendsUrl() {
  return new URL("./assets/fs_backends.js", import.meta.url).href;
}

function getVendorAssetUrls(fileName: string) {
  return [
    new URL(
      /* @vite-ignore */ `../../vendor/lnd-wasm/${fileName}`,
      import.meta.url,
    ).href,
    new URL(
      /* @vite-ignore */ `../../../vendor/lnd-wasm/${fileName}`,
      import.meta.url,
    ).href,
  ];
}

registerWasmWorkerRuntime(() => ({
  fsOpfsBackend: getFsOpfsBackendUrl(),
  fsBackends: getFsBackendsUrl(),
  wasmExec: getVendorAssetUrls("wasm_exec.js"),
  wasmBinary: getVendorAssetUrls("lndmobile.wasm"),
}));
