import { createWasmRuntimeClient } from "./createWasmRuntimeClient";

const runtimeClient = createWasmRuntimeClient({
  createWorker: () =>
    new Worker(new URL("./wasm-worker.js", import.meta.url), {
      type: "module",
    }),
  buildLoadMessage: () => ({ type: "load" }),
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
