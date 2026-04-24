export type RPCRequestsSchema<
  T extends Record<string, { params: unknown; response: unknown }> = Record<
    string,
    { params: unknown; response: unknown }
  >,
> = T;

export type RPCMessagesSchema<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T;

export type RPCSchema = {
  requests: RPCRequestsSchema;
  messages: RPCMessagesSchema;
};

export interface ElectrobunRPCSchema {
  bun: RPCSchema;
  webview: RPCSchema;
}

type RPCRequestParams<
  RS extends RPCRequestsSchema,
  M extends keyof RS = keyof RS,
> = "params" extends keyof RS[M] ? RS[M]["params"] : never;

type RPCRequestResponse<
  RS extends RPCRequestsSchema,
  M extends keyof RS = keyof RS,
> = "response" extends keyof RS[M] ? RS[M]["response"] : void;

export type RPCRequestHandlerFn<
  RS extends RPCRequestsSchema = RPCRequestsSchema,
> = <M extends keyof RS>(
  method: M,
  params: RPCRequestParams<RS, M>
) => unknown | Promise<unknown>;

export type RPCRequestHandlerObject<
  RS extends RPCRequestsSchema = RPCRequestsSchema,
> = {
  [M in keyof RS]?: (
    ...args: "params" extends keyof RS[M]
      ? undefined extends RS[M]["params"]
        ? [params?: RS[M]["params"]]
        : [params: RS[M]["params"]]
      : []
  ) =>
    | Awaited<RPCRequestResponse<RS, M>>
    | Promise<Awaited<RPCRequestResponse<RS, M>>>;
} & {
  _?: (method: keyof RS, params: RPCRequestParams<RS>) => unknown;
};

export type RPCRequestHandler<
  RS extends RPCRequestsSchema = RPCRequestsSchema,
> = RPCRequestHandlerFn<RS> | RPCRequestHandlerObject<RS>;

export type RPCMessageHandlerFn<
  MS extends RPCMessagesSchema,
  N extends keyof MS,
> = (payload: MS[N]) => void;

export type WildcardRPCMessageHandlerFn<MS extends RPCMessagesSchema> = (
  messageName: keyof MS,
  payload: MS[keyof MS]
) => void;

export type RPCTransport = {
  send?: (data: unknown) => void;
  registerHandler?: (handler: (data: unknown) => void) => void;
  unregisterHandler?: () => void;
};

export interface RPCWithTransport {
  setTransport: (transport: RPCTransport) => void;
}

export type ElectrobunRPCConfig<
  Schema extends ElectrobunRPCSchema,
  Side extends "bun" | "webview",
> = {
  maxRequestTime?: number;
  handlers: {
    requests?: RPCRequestHandler<Schema[Side]["requests"]>;
    messages?: {
      [K in keyof Schema[Side]["messages"]]?: RPCMessageHandlerFn<
        Schema[Side]["messages"],
        K
      >;
    } & {
      "*"?: WildcardRPCMessageHandlerFn<Schema[Side]["messages"]>;
    };
  };
};

type OtherSide<Side extends "bun" | "webview"> = Side extends "bun"
  ? "webview"
  : "bun";

type KnownKeys<T> = keyof {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: unknown;
};

type RPCRequestsProxy<RS extends RPCRequestsSchema> = {
  [K in KnownKeys<RS>]: (
    ...args: "params" extends keyof RS[K]
      ? undefined extends RS[K]["params"]
        ? [params?: RS[K]["params"]]
        : [params: RS[K]["params"]]
      : []
  ) => Promise<RPCRequestResponse<RS, K>>;
} & Record<string, (...args: any[]) => Promise<any>>;

type RPCMessagesProxy<MS extends RPCMessagesSchema> = {
  [K in KnownKeys<MS>]-?: (
    ...args: void extends MS[K]
      ? []
      : undefined extends MS[K]
        ? [payload?: MS[K]]
        : [payload: MS[K]]
  ) => void;
} & Record<string, (...args: any[]) => void>;

export type ElectrobunRPC<
  Schema extends ElectrobunRPCSchema,
  Side extends "bun" | "webview",
> = RPCWithTransport & {
  setRequestHandler: (
    handler: RPCRequestHandler<Schema[Side]["requests"]>
  ) => void;
  request: RPCRequestsProxy<Schema[OtherSide<Side>]["requests"]>;
  requestProxy: RPCRequestsProxy<Schema[OtherSide<Side>]["requests"]>;
  send: RPCMessagesProxy<Schema[OtherSide<Side>]["messages"]>;
  sendProxy: RPCMessagesProxy<Schema[OtherSide<Side>]["messages"]>;
  addMessageListener: {
    (
      message: "*",
      listener: WildcardRPCMessageHandlerFn<Schema[Side]["messages"]>
    ): void;
    <M extends keyof Schema[Side]["messages"]>(
      message: M,
      listener: RPCMessageHandlerFn<Schema[Side]["messages"], M>
    ): void;
  };
  removeMessageListener: {
    (
      message: "*",
      listener: WildcardRPCMessageHandlerFn<Schema[Side]["messages"]>
    ): void;
    <M extends keyof Schema[Side]["messages"]>(
      message: M,
      listener: RPCMessageHandlerFn<Schema[Side]["messages"], M>
    ): void;
  };
  proxy: {
    request: RPCRequestsProxy<Schema[OtherSide<Side>]["requests"]>;
    send: RPCMessagesProxy<Schema[OtherSide<Side>]["messages"]>;
  };
};

export function createRPC<
  Schema extends RPCSchema = RPCSchema,
  RemoteSchema extends RPCSchema = Schema,
>(options?: {
  transport?: RPCTransport;
  requestHandler?: RPCRequestHandler<Schema["requests"]>;
  maxRequestTime?: number;
}): RPCWithTransport & {
  setRequestHandler: (
    handler: RPCRequestHandler<Schema["requests"]>
  ) => void;
  request: RPCRequestsProxy<RemoteSchema["requests"]>;
  requestProxy: RPCRequestsProxy<RemoteSchema["requests"]>;
  send: RPCMessagesProxy<Schema["messages"]>;
  sendProxy: RPCMessagesProxy<Schema["messages"]>;
};

export function defineElectrobunRPC<
  Schema extends ElectrobunRPCSchema,
  Side extends "bun" | "webview" = "bun" | "webview",
>(
  side: Side,
  config: ElectrobunRPCConfig<Schema, Side> & {
    extraRequestHandlers?: Record<string, (...args: unknown[]) => unknown>;
  }
): ElectrobunRPC<Schema, Side>;
