type WasmRuntimeGlobals = typeof globalThis & {
  __lndWasmMirrorStdoutToConsole?: boolean;
  __lndWasmAssetBaseUrl?: string;
  __lndWasmWorkerUrl?: string;
};
import { createWasmRuntimeClient } from "./createWasmRuntimeClient";

function normalizeAssetBaseUrl(assetBaseUrl: string) {
  return assetBaseUrl.endsWith("/") ? assetBaseUrl : `${assetBaseUrl}/`;
}

function getAssetBaseUrl() {
  const configured = (globalThis as WasmRuntimeGlobals).__lndWasmAssetBaseUrl;
  return normalizeAssetBaseUrl(configured ?? "/vendor/lnd-wasm/");
}

function getWorkerUrl() {
  const configured = (globalThis as WasmRuntimeGlobals).__lndWasmWorkerUrl;
  return configured ?? `${getAssetBaseUrl()}wasm-worker.web.js`;
}

const runtimeClient = createWasmRuntimeClient({
  createWorker: () =>
    new Worker(getWorkerUrl(), {
      type: "module",
    }),
  buildLoadMessage: () => ({
    type: "load",
    assetBaseUrl: getAssetBaseUrl(),
  }),
});

export const {
  attachWasmStdoutListener,
  hasLoadedWasmRuntime,
  invokeRpc,
  loadWasmRuntime,
  openBidiStream,
  openServerStream,
  startWasm,
} = runtimeClient;
