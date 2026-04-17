function getUnsupportedError() {
  return new Error(
    "TurboLnd wasm loading is only available in browser builds."
  );
}

export async function loadWasmRuntime() {
  throw getUnsupportedError();
}

export function hasLoadedWasmRuntime() {
  return false;
}

export function attachWasmStdoutListener() {
  return () => undefined;
}
