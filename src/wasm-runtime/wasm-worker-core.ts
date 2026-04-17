/// <reference lib="webworker" />

import type { RequestMessage, ResponseMessage } from "./worker-protocol";

type AssetSpec = string | string[];

type WorkerAssetSpecs = {
  fsOpfsBackend: AssetSpec;
  fsBackends: AssetSpec;
  wasmExec: AssetSpec;
  wasmBinary: AssetSpec;
};

type WasmRuntimeGlobals = typeof globalThis & {
  __lndWasmMirrorStdoutToConsole?: boolean;
  __lndWasmOnStdoutLine?: (line: string) => void;
  __lndWasmStdoutLines?: string[];
  __lndWasmPrepareFS?: (backend: string) => Promise<void>;
  Go?: new () => {
    importObject: WebAssembly.Imports;
    run(instance: WebAssembly.Instance): void;
  };
  lndWasmStart?: (
    extraArgs: string,
    onResponse: () => void,
    onError: (error: string) => void,
  ) => string | undefined;
  lndWasmInvokeRPC?: (
    method: string,
    requestBytes: Uint8Array,
    onResponse: (responseBytes: Uint8Array) => void,
    onError: (error: string) => void,
  ) => string | undefined;
  lndWasmOpenServerStream?: (
    method: string,
    requestBytes: Uint8Array,
    onResponse: (responseBytes: Uint8Array) => void,
    onError: (error: string) => void,
  ) =>
    | {
        stop(): string | undefined;
      }
    | string
    | undefined;
  lndWasmOpenBidiStream?: (
    method: string,
    onResponse: (responseBytes: Uint8Array) => void,
    onError: (error: string) => void,
  ) =>
    | {
        send(requestBytes: Uint8Array): string | undefined;
        stop(): string | undefined;
      }
    | string
    | undefined;
};

type ServerStreamHandle = {
  stop(): void;
};

type BidiStreamHandle = {
  send(requestBytes: Uint8Array): void;
  stop(): void;
};

type StreamHandle = ServerStreamHandle | BidiStreamHandle;

function toAssetCandidates(spec: AssetSpec) {
  return Array.isArray(spec) ? spec : [spec];
}

function responseTransferables(message: ResponseMessage): Transferable[] {
  switch (message.type) {
    case "streamData":
      return [message.responseBytes.buffer];
    case "response":
      return message.success && message.result instanceof Uint8Array
        ? [message.result.buffer]
        : [];
    default:
      return [];
  }
}

function looksLikeHtml(responseText: string) {
  return /^\s*</.test(responseText);
}

function getContentType(response: Response) {
  return response.headers.get("content-type")?.toLowerCase() ?? "";
}

function looksLikeNonWasmContentType(contentType: string) {
  return (
    contentType.includes("text/html") ||
    contentType.includes("javascript") ||
    contentType.includes("ecmascript") ||
    contentType.includes("json") ||
    contentType.startsWith("text/")
  );
}

export function registerWasmWorkerRuntime(
  resolveAssetSpecs: (assetBaseUrl?: string) => WorkerAssetSpecs,
) {
  const runtime = globalThis as WasmRuntimeGlobals;
  const scriptLoads = new Map<string, Promise<void>>();
  const streams = new Map<number, StreamHandle>();
  let loadPromise: Promise<void> | null = null;
  let wasmLoaded = false;
  let stdoutFlushTimer: ReturnType<typeof setTimeout> | null = null;
  const pendingStdoutLines: string[] = [];

  function postMessageToMain(message: ResponseMessage) {
    self.postMessage(message, responseTransferables(message));
  }

  function flushStdoutLines() {
    if (stdoutFlushTimer) {
      clearTimeout(stdoutFlushTimer);
      stdoutFlushTimer = null;
    }

    if (pendingStdoutLines.length === 0) {
      return;
    }

    const lines = pendingStdoutLines.splice(0, pendingStdoutLines.length);
    postMessageToMain({ type: "stdoutBatch", lines });
  }

  function bindStdoutForwarding() {
    if (typeof runtime.__lndWasmOnStdoutLine !== "function") {
      runtime.__lndWasmOnStdoutLine = (line) => {
        pendingStdoutLines.push(line);
        if (!stdoutFlushTimer) {
          stdoutFlushTimer = setTimeout(flushStdoutLines, 50);
        }
      };
    }

    if (Array.isArray(runtime.__lndWasmStdoutLines)) {
      for (const line of runtime.__lndWasmStdoutLines) {
        pendingStdoutLines.push(line);
      }
      flushStdoutLines();
    }
  }

  function respondSuccess(requestId: number, result?: unknown) {
    postMessageToMain({ type: "response", requestId, success: true, result });
  }

  function respondError(requestId: number, error: unknown) {
    postMessageToMain({
      type: "response",
      requestId,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  function callbackToPromise<T>(
    invoker: (
      onResponse: (value: T) => void,
      onError: (error: unknown) => void,
    ) => string | undefined,
  ) {
    return new Promise<T>((resolve, reject) => {
      const immediate = invoker(
        (value) => resolve(value),
        (reason) =>
          reject(reason instanceof Error ? reason : new Error(String(reason))),
      );

      if (immediate) {
        reject(new Error(String(immediate)));
      }
    });
  }

  async function fetchFirstAvailable(spec: AssetSpec, kind: "script" | "wasm") {
    const failures: string[] = [];

    for (const url of toAssetCandidates(spec)) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          failures.push(`${url} (${response.status})`);
          continue;
        }

        if (kind === "script") {
          const source = await response.text();
          if (looksLikeHtml(source)) {
            failures.push(`${url} (received HTML)`);
            continue;
          }

          return { url, response, source };
        }

        const contentType = getContentType(response);
        if (looksLikeNonWasmContentType(contentType)) {
          failures.push(`${url} (received ${contentType || "text content"})`);
          continue;
        }

        return { url, response };
      } catch (error) {
        failures.push(
          `${url} (${error instanceof Error ? error.message : String(error)})`,
        );
      }
    }

    throw new Error(
      `TurboLnd web asset lookup failed for ${kind}: ${failures.join(", ")}`,
    );
  }

  function loadScriptOnce(spec: AssetSpec) {
    const cacheKey = toAssetCandidates(spec).join("|");
    const existing = scriptLoads.get(cacheKey);
    if (existing) {
      return existing;
    }

    const pending = (async () => {
      const { source, url } = await fetchFirstAvailable(spec, "script");
      const loader = new Function(`${source}\n//# sourceURL=${url}`);
      loader();
    })();

    scriptLoads.set(cacheKey, pending);
    return pending;
  }

  async function instantiateGoWasm(
    spec: AssetSpec,
    importObject: WebAssembly.Imports,
  ) {
    const { response, url } = await fetchFirstAvailable(spec, "wasm");
    const contentType = getContentType(response) || "unknown content-type";

    try {
      return await WebAssembly.instantiateStreaming(
        Promise.resolve(response.clone()),
        importObject,
      );
    } catch {
      try {
        return WebAssembly.instantiate(await response.arrayBuffer(), importObject);
      } catch (error) {
        throw new Error(
          `Failed to instantiate wasm from ${url} (${contentType}): ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }
  }

  function ensureWasmLoaded() {
    if (
      !wasmLoaded ||
      !runtime.lndWasmStart ||
      !runtime.lndWasmInvokeRPC ||
      !runtime.lndWasmOpenServerStream ||
      !runtime.lndWasmOpenBidiStream
    ) {
      throw new Error("TurboLnd wasm runtime is not loaded");
    }

    return runtime;
  }

  async function loadWasmRuntime(assetBaseUrl?: string) {
    if (!loadPromise) {
      loadPromise = (async () => {
        const assets = resolveAssetSpecs(assetBaseUrl);

        await loadScriptOnce(assets.fsOpfsBackend);
        await loadScriptOnce(assets.fsBackends);

        if (!runtime.__lndWasmPrepareFS) {
          throw new Error("TurboLnd wasm fs bridge is unavailable");
        }

        bindStdoutForwarding();

        await runtime.__lndWasmPrepareFS("opfs");

        await loadScriptOnce(assets.wasmExec);
        if (!runtime.Go) {
          throw new Error("Go wasm runtime is unavailable");
        }

        const go = new runtime.Go();
        const response = await instantiateGoWasm(
          assets.wasmBinary,
          go.importObject,
        );

        go.run(response.instance);
        wasmLoaded = true;
      })().catch((error) => {
        loadPromise = null;
        throw error;
      });
    }

    await loadPromise;
  }

  self.addEventListener("message", async (event: MessageEvent<RequestMessage>) => {
    const message = event.data;

    try {
      switch (message.type) {
        case "setConsoleMirroring":
          runtime.__lndWasmMirrorStdoutToConsole = message.enabled;
          respondSuccess(message.requestId);
          return;
        case "load":
          await loadWasmRuntime(message.assetBaseUrl);
          respondSuccess(message.requestId);
          return;
        case "start": {
          const loaded = ensureWasmLoaded();
          await callbackToPromise<void>((resolve, reject) =>
            loaded.lndWasmStart!(message.extraArgs, () => resolve(undefined), reject),
          );
          respondSuccess(message.requestId);
          return;
        }
        case "invokeRpc": {
          const loaded = ensureWasmLoaded();
          respondSuccess(
            message.requestId,
            await callbackToPromise<Uint8Array>((resolve, reject) =>
              loaded.lndWasmInvokeRPC!(
                message.method,
                message.requestBytes,
                resolve,
                reject,
              ),
            ),
          );
          return;
        }
        case "openServerStream": {
          const loaded = ensureWasmLoaded();
          const handle = loaded.lndWasmOpenServerStream!(
            message.method,
            message.requestBytes,
            (responseBytes) =>
              postMessageToMain({
                type: "streamData",
                streamId: message.streamId,
                responseBytes,
              }),
            (error) =>
              postMessageToMain({
                type: "streamError",
                streamId: message.streamId,
                error,
              }),
          );

          if (!handle || typeof handle === "string") {
            throw new Error(String(handle || "failed to open server stream"));
          }

          streams.set(message.streamId, {
            stop() {
              const immediate = handle.stop();
              if (immediate) {
                throw new Error(String(immediate));
              }
            },
          });
          respondSuccess(message.requestId);
          return;
        }
        case "openBidiStream": {
          const loaded = ensureWasmLoaded();
          const handle = loaded.lndWasmOpenBidiStream!(
            message.method,
            (responseBytes) =>
              postMessageToMain({
                type: "streamData",
                streamId: message.streamId,
                responseBytes,
              }),
            (error) =>
              postMessageToMain({
                type: "streamError",
                streamId: message.streamId,
                error,
              }),
          );

          if (!handle || typeof handle === "string") {
            throw new Error(String(handle || "failed to open bidi stream"));
          }

          streams.set(message.streamId, {
            send(requestBytes) {
              const immediate = handle.send(requestBytes);
              if (immediate) {
                throw new Error(String(immediate));
              }
            },
            stop() {
              const immediate = handle.stop();
              if (immediate) {
                throw new Error(String(immediate));
              }
            },
          });
          respondSuccess(message.requestId);
          return;
        }
        case "streamSend": {
          const handle = streams.get(message.streamId);
          if (!handle || !("send" in handle)) {
            throw new Error(`unknown bidi stream ${message.streamId}`);
          }

          handle.send(message.requestBytes);
          respondSuccess(message.requestId);
          return;
        }
        case "streamStop": {
          const handle = streams.get(message.streamId);
          if (handle) {
            handle.stop();
            streams.delete(message.streamId);
          }
          respondSuccess(message.requestId);
          return;
        }
      }
    } catch (error) {
      respondError(message.requestId, error);
    }
  });
}
