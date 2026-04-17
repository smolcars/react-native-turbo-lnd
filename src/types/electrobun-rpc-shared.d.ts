export type ElectrobunSide = "bun" | "webview";

export interface ElectrobunRPCSchema {
  bun: {
    requests: Record<string, { params: unknown; response: unknown }>;
    messages: Record<string, unknown>;
  };
  webview: {
    requests: Record<string, { params: unknown; response: unknown }>;
    messages: Record<string, unknown>;
  };
}

type RemoteSide<Side extends ElectrobunSide> = Side extends "bun"
  ? "webview"
  : "bun";

type RequestMapForSide<
  Schema extends ElectrobunRPCSchema,
  Side extends ElectrobunSide,
> = Schema[Side]["requests"];

type MessageMapForSide<
  Schema extends ElectrobunRPCSchema,
  Side extends ElectrobunSide,
> = Schema[Side]["messages"];

type MaybePromise<Value> = Value | Promise<Value>;

export type ElectrobunRequestHandlers<
  Schema extends ElectrobunRPCSchema,
  Side extends ElectrobunSide,
> = {
  [Key in keyof RequestMapForSide<Schema, Side>]?: (
    params: RequestMapForSide<Schema, Side>[Key]["params"]
  ) => MaybePromise<RequestMapForSide<Schema, Side>[Key]["response"]>;
};

export type ElectrobunMessageHandlers<
  Schema extends ElectrobunRPCSchema,
  Side extends ElectrobunSide,
> = {
  [Key in keyof MessageMapForSide<Schema, Side>]?: (
    payload: MessageMapForSide<Schema, Side>[Key]
  ) => void;
};

export interface ElectrobunRPCConfig<
  Schema extends ElectrobunRPCSchema,
  Side extends ElectrobunSide,
> {
  maxRequestTime?: number;
  handlers: {
    requests?:
      | ElectrobunRequestHandlers<Schema, Side>
      | ((...args: any[]) => unknown);
    messages?: ElectrobunMessageHandlers<Schema, Side>;
  };
}

export type ElectrobunRequestMethods<
  Schema extends ElectrobunRPCSchema,
  Side extends ElectrobunSide,
> = {
  [Key in keyof RequestMapForSide<Schema, RemoteSide<Side>>]: (
    params: RequestMapForSide<Schema, RemoteSide<Side>>[Key]["params"]
  ) => Promise<RequestMapForSide<Schema, RemoteSide<Side>>[Key]["response"]>;
};

export type ElectrobunSendMethods<
  Schema extends ElectrobunRPCSchema,
  Side extends ElectrobunSide,
> = {
  [Key in keyof MessageMapForSide<Schema, RemoteSide<Side>>]: (
    payload: MessageMapForSide<Schema, RemoteSide<Side>>[Key]
  ) => void;
};

export interface ElectrobunRPCInstance<
  Schema extends ElectrobunRPCSchema,
  Side extends ElectrobunSide,
> {
  request: ElectrobunRequestMethods<Schema, Side>;
  send: ElectrobunSendMethods<Schema, Side>;
  addMessageListener<Key extends keyof MessageMapForSide<Schema, Side>>(
    name: Key,
    listener: (payload: MessageMapForSide<Schema, Side>[Key]) => void
  ): void;
  removeMessageListener<Key extends keyof MessageMapForSide<Schema, Side>>(
    name: Key,
    listener: (payload: MessageMapForSide<Schema, Side>[Key]) => void
  ): void;
}
