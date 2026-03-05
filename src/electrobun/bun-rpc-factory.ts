import type { ElectrobunRPCSchema } from "electrobun/bun";
import TurboLndElectrobunBackend from "./bun";
import type {
  OnErrorCallback,
  OnResponseCallback,
  WriteableStream,
} from "../core/NativeTurboLnd";
import type { TurboLndElectrobunRpcSchema } from "./rpc-schema";

type StreamEvent =
  TurboLndElectrobunRpcSchema["webview"]["messages"]["__TurboLndStreamEvent"];

type TurboLndElectrobunSchema = ElectrobunRPCSchema & {
  bun: {
    requests: TurboLndElectrobunRpcSchema["bun"]["requests"] &
      Record<string, { params: unknown; response: unknown }>;
    messages: TurboLndElectrobunRpcSchema["bun"]["messages"] &
      Record<string, unknown>;
  };
  webview: {
    requests: TurboLndElectrobunRpcSchema["webview"]["requests"] &
      Record<string, { params: unknown; response: unknown }>;
    messages: TurboLndElectrobunRpcSchema["webview"]["messages"] &
      Record<string, unknown>;
  };
};

type BunRpcConfig<Schema extends ElectrobunRPCSchema> = Parameters<
  typeof import("electrobun/bun").defineElectrobunRPC<Schema, "bun">
>[1];

type BunRpc<Schema extends ElectrobunRPCSchema> = ReturnType<
  typeof import("electrobun/bun").defineElectrobunRPC<Schema, "bun">
>;

type DefineElectrobunRPCForBun = <Schema extends ElectrobunRPCSchema>(
  side: "bun",
  config: BunRpcConfig<Schema>
) => BunRpc<Schema>;

type RequestHandlers<Schema extends ElectrobunRPCSchema> = Exclude<
  NonNullable<BunRpcConfig<Schema>["handlers"]["requests"]>,
  (...args: any[]) => any
>;

type MessageHandlers<Schema extends ElectrobunRPCSchema> = NonNullable<
  BunRpcConfig<Schema>["handlers"]["messages"]
>;

export type AdditionalElectrobunHandlers<
  Schema extends TurboLndElectrobunSchema = TurboLndElectrobunRpcSchema,
> = {
  maxRequestTime?: BunRpcConfig<Schema>["maxRequestTime"];
  requests?: RequestHandlers<Schema>;
  messages?: MessageHandlers<Schema>;
};

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

function emitStreamEvent<Schema extends TurboLndElectrobunSchema>(
  rpc: BunRpc<Schema>,
  payload: StreamEvent
): void {
  const sendStreamEvent = (
    rpc.send as unknown as {
      __TurboLndStreamEvent?: (value: StreamEvent) => void;
    }
  ).__TurboLndStreamEvent;
  if (!sendStreamEvent) {
    throw new Error(
      'Electrobun message sender "__TurboLndStreamEvent" is unavailable.'
    );
  }
  sendStreamEvent(payload);
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

export function defineTurboLndElectrobunRPCWithFactory<
  Schema extends TurboLndElectrobunSchema = TurboLndElectrobunRpcSchema,
>(
  defineElectrobunRPC: DefineElectrobunRPCForBun,
  additionalHandlers: AdditionalElectrobunHandlers<Schema> = {}
): BunRpc<Schema> {
  const serverStreams = new Map<string, () => void>();
  const bidiStreams = new Map<string, WriteableStream>();
  let nextId = 1;

  const turboRequests = {
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
  } as unknown as RequestHandlers<Schema>;

  const turboMessages = {} as MessageHandlers<Schema>;

  const extraRequests =
    additionalHandlers.requests ?? ({} as RequestHandlers<Schema>);
  const extraMessages =
    additionalHandlers.messages ?? ({} as MessageHandlers<Schema>);
  assertNoHandlerCollisions(
    turboRequests as Record<string, unknown>,
    extraRequests as Record<string, unknown>,
    "request"
  );
  assertNoHandlerCollisions(
    turboMessages as Record<string, unknown>,
    extraMessages as Record<string, unknown>,
    "message"
  );

  const rpc = defineElectrobunRPC("bun", {
    maxRequestTime: additionalHandlers.maxRequestTime ?? 10 * 1000,
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
