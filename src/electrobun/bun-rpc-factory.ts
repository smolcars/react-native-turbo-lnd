import TurboLndElectrobunBackend from "./bun";
import type {
  OnErrorCallback,
  OnResponseCallback,
  WriteableStream,
} from "../core/NativeTurboLnd";
import type { TurboLndElectrobunRpcSchema } from "./rpc-schema";

type StreamEvent =
  TurboLndElectrobunRpcSchema["webview"]["messages"]["__TurboLndStreamEvent"];

type RpcWithSend = {
  send: unknown;
};

type RpcWithStreamSender = {
  send: {
    __TurboLndStreamEvent: (payload: StreamEvent) => void;
  };
};

type RequestHandlers = Record<string, (...args: any[]) => any>;
type MessageHandlers = Record<string, (...args: any[]) => any>;

export type AdditionalElectrobunHandlers = {
  requests?: RequestHandlers;
  messages?: MessageHandlers;
};

type DefineElectrobunRPCLike<Rpc> = (
  side: "bun" | "webview",
  config: {
    handlers: {
      requests: RequestHandlers;
      messages: MessageHandlers;
    };
  }
) => Rpc;

type UnaryMethod = (data: string) => Promise<string>;
type ServerStreamMethod = (
  data: string,
  onResponse: OnResponseCallback,
  onError: OnErrorCallback
) => () => void;
type BidiStreamMethod = (
  onResponse: OnResponseCallback,
  onError: OnErrorCallback
) => WriteableStream;

function isEofError(error: string): boolean {
  const normalized = error.trim();
  if (normalized === "EOF") {
    return true;
  }

  return normalized.includes("EOF");
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function resolveBackendMethod(method: string): unknown {
  return (TurboLndElectrobunBackend as Record<string, unknown>)[method];
}

function resolveUnaryMethod(method: string): UnaryMethod {
  const candidate = resolveBackendMethod(method);
  if (typeof candidate !== "function") {
    throw new Error(
      `TurboLnd method "${method}" is unavailable in Electrobun backend.`
    );
  }

  return candidate as UnaryMethod;
}

function resolveServerStreamMethod(method: string): ServerStreamMethod {
  const candidate = resolveBackendMethod(method);
  if (typeof candidate !== "function") {
    throw new Error(
      `TurboLnd stream method "${method}" is unavailable in Electrobun backend.`
    );
  }

  return candidate as ServerStreamMethod;
}

function resolveBidiStreamMethod(method: string): BidiStreamMethod {
  const candidate = resolveBackendMethod(method);
  if (typeof candidate !== "function") {
    throw new Error(
      `TurboLnd stream method "${method}" is unavailable in Electrobun backend.`
    );
  }

  return candidate as BidiStreamMethod;
}

function emitStreamEvent(rpc: RpcWithSend, payload: StreamEvent): void {
  (rpc as unknown as RpcWithStreamSender).send.__TurboLndStreamEvent(payload);
}

function assertNoHandlerCollisions(
  baseHandlers: Record<string, unknown>,
  additionalHandlers: Record<string, unknown>,
  kind: "request" | "message"
) {
  for (const key of Object.keys(additionalHandlers)) {
    if (!Object.prototype.hasOwnProperty.call(baseHandlers, key)) {
      continue;
    }

    throw new Error(
      `Electrobun ${kind} handler "${key}" conflicts with TurboLnd reserved handler.`
    );
  }
}

export function defineTurboLndElectrobunRPCWithFactory<Rpc extends RpcWithSend>(
  defineElectrobunRPC: DefineElectrobunRPCLike<Rpc>,
  additionalHandlers: AdditionalElectrobunHandlers = {}
): Rpc {
  const serverStreams = new Map<string, () => void>();
  const bidiStreams = new Map<string, WriteableStream>();
  let nextId = 1;

  const turboRequests: RequestHandlers = {
    __TurboLndStart: async (args: string) => {
      const startMethod = resolveBackendMethod("start");
      if (typeof startMethod !== "function") {
        throw new Error(
          'TurboLnd method "start" is unavailable in Electrobun backend.'
        );
      }

      return (startMethod as (args: string) => Promise<string>)(args);
    },
    __TurboLndUnary: async ({
      method,
      data,
    }: {
      method: string;
      data: string;
    }) => {
      const invoke = resolveUnaryMethod(method);
      return { data: await invoke(data) };
    },
    __TurboLndOpenServerStream: async ({
      method,
      data,
    }: {
      method: string;
      data: string;
    }) => {
      const subscriptionId = `server-${nextId++}`;
      const subscribe = resolveServerStreamMethod(method);
      const unsubscribe = subscribe(
        data,
        (payload) => {
          emitStreamEvent(rpc, {
            subscriptionId,
            type: "data",
            data: payload,
          });
        },
        (error) => {
          serverStreams.delete(subscriptionId);

          if (isEofError(error)) {
            emitStreamEvent(rpc, {
              subscriptionId,
              type: "end",
            });
            return;
          }

          emitStreamEvent(rpc, {
            subscriptionId,
            type: "error",
            error,
          });
        }
      );

      serverStreams.set(subscriptionId, unsubscribe);
      return { subscriptionId };
    },
    __TurboLndCloseServerStream: async ({
      subscriptionId,
    }: {
      subscriptionId: string;
    }) => {
      const unsubscribe = serverStreams.get(subscriptionId);
      if (!unsubscribe) {
        return { removed: false };
      }

      serverStreams.delete(subscriptionId);
      unsubscribe();
      return { removed: true };
    },
    __TurboLndOpenBidiStream: async ({ method }: { method: string }) => {
      const subscriptionId = `bidi-${nextId++}`;
      const openStream = resolveBidiStreamMethod(method);
      const stream = openStream(
        (payload) => {
          emitStreamEvent(rpc, {
            subscriptionId,
            type: "data",
            data: payload,
          });
        },
        (error) => {
          bidiStreams.delete(subscriptionId);

          if (isEofError(error)) {
            emitStreamEvent(rpc, {
              subscriptionId,
              type: "end",
            });
            return;
          }

          emitStreamEvent(rpc, {
            subscriptionId,
            type: "error",
            error,
          });
        }
      );

      bidiStreams.set(subscriptionId, stream);
      return { subscriptionId };
    },
    __TurboLndSendBidiStream: async ({
      subscriptionId,
      data,
    }: {
      subscriptionId: string;
      data: string;
    }) => {
      const stream = bidiStreams.get(subscriptionId);
      if (!stream) {
        return { sent: false };
      }

      try {
        return { sent: stream.send(data) };
      } catch (error) {
        throw new Error(toErrorMessage(error));
      }
    },
    __TurboLndStopBidiStream: async ({
      subscriptionId,
    }: {
      subscriptionId: string;
    }) => {
      const stream = bidiStreams.get(subscriptionId);
      if (!stream) {
        return { stopped: false };
      }

      bidiStreams.delete(subscriptionId);
      try {
        return { stopped: stream.stop() };
      } catch (error) {
        throw new Error(toErrorMessage(error));
      }
    },
  };
  const turboMessages: MessageHandlers = {};

  const extraRequests = additionalHandlers.requests ?? {};
  const extraMessages = additionalHandlers.messages ?? {};
  assertNoHandlerCollisions(turboRequests, extraRequests, "request");
  assertNoHandlerCollisions(turboMessages, extraMessages, "message");

  const rpc = defineElectrobunRPC("bun", {
    handlers: {
      requests: {
        ...turboRequests,
        ...extraRequests,
      },
      messages: {
        ...turboMessages,
        ...extraMessages,
      },
    },
  });

  return rpc;
}
