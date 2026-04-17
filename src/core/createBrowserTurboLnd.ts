import type {
  OnErrorCallback,
  OnResponseCallback,
  ProtobufBase64,
  Spec,
  WriteableStream,
} from "./NativeTurboLnd";
import {
  bidiStreamingMethods,
  serverStreamingMethods,
  unaryMethods,
} from "./NativeTurboLnd.browser-manifest";

type BrowserWasmRuntime = {
  hasLoadedWasmRuntime(): boolean;
  startWasm(extraArgs: string): Promise<void>;
  invokeRpc(method: string, requestBytes: Uint8Array): Promise<Uint8Array>;
  openServerStream(
    method: string,
    requestBytes: Uint8Array,
    onResponse: (responseBytes: Uint8Array) => void,
    onError: (error: string) => void
  ): () => void;
  openBidiStream(
    method: string,
    onResponse: (responseBytes: Uint8Array) => void,
    onError: (error: string) => void
  ): {
    send(requestBytes: Uint8Array): void;
    stop(): void;
  };
};

const unaryMethodSet = new Set<string>(unaryMethods);
const serverStreamingMethodSet = new Set<string>(serverStreamingMethods);
const bidiStreamingMethodSet = new Set<string>(bidiStreamingMethods);

function getNotLoadedError() {
  return new Error(
    "TurboLnd wasm runtime is not loaded. Import 'react-native-turbo-lnd/wasm-load' and call loadWasmRuntime() before using the web backend."
  );
}

function getRawRpcMethodName(methodName: string) {
  return methodName.charAt(0).toUpperCase() + methodName.slice(1);
}

function decodeBase64(data: ProtobufBase64): Uint8Array {
  if (typeof globalThis.atob === "function") {
    const text = globalThis.atob(data);
    const bytes = new Uint8Array(text.length);
    for (let index = 0; index < text.length; index += 1) {
      bytes[index] = text.charCodeAt(index);
    }
    return bytes;
  }

  if (typeof Buffer !== "undefined") {
    return Uint8Array.from(Buffer.from(data, "base64"));
  }

  throw new Error("No base64 decoder is available in this environment");
}

function encodeBase64(bytes: Uint8Array): ProtobufBase64 {
  if (typeof globalThis.btoa === "function") {
    let text = "";
    for (const value of bytes) {
      text += String.fromCharCode(value);
    }
    return globalThis.btoa(text);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }

  throw new Error("No base64 encoder is available in this environment");
}

export function createBrowserTurboLnd(runtime: BrowserWasmRuntime) {
  function ensureLoaded() {
    if (!runtime.hasLoadedWasmRuntime()) {
      throw getNotLoadedError();
    }
  }

  const browserTurboLndTarget: Partial<Spec> = {
    async start(args: string) {
      ensureLoaded();
      await runtime.startWasm(args);
      return "";
    },
  };

  return new Proxy(browserTurboLndTarget, {
    get(target, property, receiver) {
      if (typeof property !== "string") {
        return Reflect.get(target, property, receiver);
      }

      if (Reflect.has(target, property)) {
        return Reflect.get(target, property, receiver);
      }

      if (unaryMethodSet.has(property)) {
        return async (data: ProtobufBase64) => {
          ensureLoaded();
          const response = await runtime.invokeRpc(
            getRawRpcMethodName(property),
            decodeBase64(data)
          );
          return encodeBase64(response);
        };
      }

      if (serverStreamingMethodSet.has(property)) {
        return (
          data: ProtobufBase64,
          onResponse: OnResponseCallback,
          onError: OnErrorCallback
        ) => {
          ensureLoaded();
          return runtime.openServerStream(
            getRawRpcMethodName(property),
            decodeBase64(data),
            (responseBytes) => onResponse(encodeBase64(responseBytes)),
            onError
          );
        };
      }

      if (bidiStreamingMethodSet.has(property)) {
        return (
          onResponse: OnResponseCallback,
          onError: OnErrorCallback
        ): WriteableStream => {
          ensureLoaded();
          const handle = runtime.openBidiStream(
            getRawRpcMethodName(property),
            (responseBytes) => onResponse(encodeBase64(responseBytes)),
            onError
          );

          return {
            send(data: ProtobufBase64) {
              handle.send(decodeBase64(data));
              return true;
            },
            stop() {
              handle.stop();
              return true;
            },
          };
        };
      }

      return undefined;
    },
  }) as unknown as Spec;
}
