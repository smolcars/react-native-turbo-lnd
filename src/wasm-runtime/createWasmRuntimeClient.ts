import type { ResponseMessage } from "./worker-protocol";

type StreamCallbacks = {
  onResponse: (responseBytes: Uint8Array) => void;
  onError: (error: string) => void;
};

type BidiStreamHandle = {
  send(requestBytes: Uint8Array): void;
  stop(): void;
};

type StdoutListener = (line: string) => void;

type OutboundRequestMessage =
  | {
      type: "setConsoleMirroring";
      enabled: boolean;
    }
  | { type: "load"; assetBaseUrl?: string }
  | { type: "start"; extraArgs: string }
  | {
      type: "invokeRpc";
      method: string;
      requestBytes: Uint8Array;
    }
  | {
      type: "openServerStream";
      streamId: number;
      method: string;
      requestBytes: Uint8Array;
    }
  | {
      type: "openBidiStream";
      streamId: number;
      method: string;
    }
  | {
      type: "streamSend";
      streamId: number;
      requestBytes: Uint8Array;
    }
  | {
      type: "streamStop";
      streamId: number;
    };

type CreateWorker = () => Worker;
type BuildLoadMessage = () => Extract<OutboundRequestMessage, { type: "load" }>;

export type WasmRuntimeClient = {
  loadWasmRuntime(): Promise<void>;
  hasLoadedWasmRuntime(): boolean;
  attachWasmStdoutListener(onLine: StdoutListener): () => void;
  startWasm(extraArgs: string): Promise<void>;
  invokeRpc(method: string, requestBytes: Uint8Array): Promise<Uint8Array>;
  openServerStream(
    method: string,
    requestBytes: Uint8Array,
    onResponse: (responseBytes: Uint8Array) => void,
    onError: (error: string) => void,
  ): () => void;
  openBidiStream(
    method: string,
    onResponse: (responseBytes: Uint8Array) => void,
    onError: (error: string) => void,
  ): BidiStreamHandle;
};

function requestTransferables(
  message: OutboundRequestMessage,
): Transferable[] {
  switch (message.type) {
    case "invokeRpc":
    case "openServerStream":
    case "streamSend":
      return [message.requestBytes.buffer];
    default:
      return [];
  }
}

function shouldMirrorStdoutToConsole() {
  return Boolean(
    (
      globalThis as typeof globalThis & {
        __lndWasmMirrorStdoutToConsole?: boolean;
      }
    ).__lndWasmMirrorStdoutToConsole,
  );
}

function getNotLoadedError() {
  return new Error(
    "TurboLnd wasm runtime is not loaded. Import 'react-native-turbo-lnd/wasm-load' and call loadWasmRuntime() before using the web backend.",
  );
}

export function createWasmRuntimeClient({
  createWorker,
  buildLoadMessage,
}: {
  createWorker: CreateWorker;
  buildLoadMessage: BuildLoadMessage;
}): WasmRuntimeClient {
  let workerInstance: Worker | null = null;
  let nextRequestId = 1;
  let nextStreamId = 1;
  let loadPromise: Promise<void> | null = null;
  let runtimeLoaded = false;
  const stdoutLines: string[] = [];
  const stdoutListeners = new Set<StdoutListener>();
  const pending = new Map<
    number,
    {
      resolve: (value: unknown) => void;
      reject: (error: Error) => void;
    }
  >();
  const streamCallbacks = new Map<number, StreamCallbacks>();

  function pushStdoutLine(line: string) {
    stdoutLines.push(line);
    if (stdoutLines.length > 500) {
      stdoutLines.shift();
    }

    for (const listener of stdoutListeners) {
      listener(line);
    }
  }

  function getWorker() {
    if (!workerInstance) {
      workerInstance = createWorker();

      workerInstance.addEventListener(
        "message",
        (event: MessageEvent<ResponseMessage>) => {
          const message = event.data;

          switch (message.type) {
            case "response": {
              const entry = pending.get(message.requestId);
              if (!entry) {
                return;
              }

              pending.delete(message.requestId);
              if (message.success) {
                entry.resolve(message.result);
              } else {
                entry.reject(new Error(message.error));
              }
              return;
            }
            case "streamData":
              streamCallbacks.get(message.streamId)?.onResponse(
                message.responseBytes,
              );
              return;
            case "streamError":
              streamCallbacks.get(message.streamId)?.onError(message.error);
              streamCallbacks.delete(message.streamId);
              return;
            case "stdoutBatch":
              for (const line of message.lines) {
                pushStdoutLine(line);
              }
              return;
          }
        },
      );
    }

    return workerInstance;
  }

  function sendRequest<T>(message: OutboundRequestMessage): Promise<T> {
    const requestId = nextRequestId++;
    const worker = getWorker();

    return new Promise<T>((resolve, reject) => {
      pending.set(requestId, {
        resolve: (value) => resolve(value as T),
        reject,
      });

      worker.postMessage(
        { ...message, requestId },
        requestTransferables(message),
      );
    });
  }

  function syncWorkerConsoleMirroring() {
    return sendRequest<void>({
      type: "setConsoleMirroring",
      enabled: shouldMirrorStdoutToConsole(),
    });
  }

  function ensureLoaded() {
    if (!runtimeLoaded) {
      throw getNotLoadedError();
    }
  }

  return {
    async loadWasmRuntime() {
      if (!loadPromise) {
        loadPromise = syncWorkerConsoleMirroring()
          .then(() => sendRequest<void>(buildLoadMessage()))
          .then(() => {
            runtimeLoaded = true;
          })
          .catch((error) => {
            loadPromise = null;
            throw error;
          });
      }

      await loadPromise;
    },

    hasLoadedWasmRuntime() {
      return runtimeLoaded;
    },

    attachWasmStdoutListener(onLine: StdoutListener) {
      for (const line of stdoutLines) {
        onLine(line);
      }

      stdoutListeners.add(onLine);
      return () => {
        stdoutListeners.delete(onLine);
      };
    },

    async startWasm(extraArgs: string) {
      ensureLoaded();
      await syncWorkerConsoleMirroring();
      await sendRequest<void>({ type: "start", extraArgs });
    },

    async invokeRpc(method: string, requestBytes: Uint8Array) {
      ensureLoaded();
      return sendRequest<Uint8Array>({
        type: "invokeRpc",
        method,
        requestBytes,
      });
    },

    openServerStream(
      method: string,
      requestBytes: Uint8Array,
      onResponse: (responseBytes: Uint8Array) => void,
      onError: (error: string) => void,
    ) {
      ensureLoaded();

      const streamId = nextStreamId++;
      streamCallbacks.set(streamId, { onResponse, onError });

      void sendRequest<void>({
        type: "openServerStream",
        streamId,
        method,
        requestBytes,
      }).catch((error) => {
        streamCallbacks.delete(streamId);
        onError(error instanceof Error ? error.message : String(error));
      });

      return () => {
        streamCallbacks.delete(streamId);
        void sendRequest<void>({
          type: "streamStop",
          streamId,
        });
      };
    },

    openBidiStream(
      method: string,
      onResponse: (responseBytes: Uint8Array) => void,
      onError: (error: string) => void,
    ) {
      ensureLoaded();

      const streamId = nextStreamId++;
      streamCallbacks.set(streamId, { onResponse, onError });

      const ready = sendRequest<void>({
        type: "openBidiStream",
        streamId,
        method,
      }).catch((error) => {
        streamCallbacks.delete(streamId);
        onError(error instanceof Error ? error.message : String(error));
        throw error;
      });

      return {
        send(requestBytes: Uint8Array) {
          void ready
            .then(() =>
              sendRequest<void>({
                type: "streamSend",
                streamId,
                requestBytes,
              }),
            )
            .catch((error) => {
              onError(error instanceof Error ? error.message : String(error));
            });
        },

        stop() {
          streamCallbacks.delete(streamId);
          void ready
            .then(() =>
              sendRequest<void>({
                type: "streamStop",
                streamId,
              }),
            )
            .catch(() => undefined);
        },
      };
    },
  };
}
