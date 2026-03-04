type ElectrobunSide = "bun" | "webview";

type RequestDef = {
  params: unknown;
  response: unknown;
};

type RequestsMap = Record<string, RequestDef>;
type MessagesMap = Record<string, unknown>;

type SideSchema = {
  requests: RequestsMap;
  messages: MessagesMap;
};

type RpcSchemaLike = {
  bun: SideSchema;
  webview: SideSchema;
};

type SideOf<
  Schema extends RpcSchemaLike,
  Side extends ElectrobunSide,
> = Side extends "bun" ? Schema["bun"] : Schema["webview"];

type OppositeSideOf<
  Schema extends RpcSchemaLike,
  Side extends ElectrobunSide,
> = Side extends "bun" ? Schema["webview"] : Schema["bun"];

type RequestCaller<Def extends RequestDef> = [Def["params"]] extends [undefined]
  ? () => Promise<Def["response"]>
  : (params: Def["params"]) => Promise<Def["response"]>;

type RequestHandler<Def extends RequestDef> = [Def["params"]] extends [
  undefined,
]
  ? () => Def["response"] | Promise<Def["response"]>
  : (params: Def["params"]) => Def["response"] | Promise<Def["response"]>;

type RpcRequestCallers<Requests extends RequestsMap> = {
  [K in keyof Requests]: RequestCaller<Requests[K]>;
};

type RpcRequestHandlers<Requests extends RequestsMap> = {
  [K in keyof Requests]?: RequestHandler<Requests[K]>;
};

type RpcMessageSenders<Messages extends MessagesMap> = {
  [K in keyof Messages]: (payload: Messages[K]) => void;
};

type RpcMessageHandlers<Messages extends MessagesMap> = {
  [K in keyof Messages]?: (payload: Messages[K]) => void;
};

type RpcConnection<Local extends SideSchema, Remote extends SideSchema> = {
  request: RpcRequestCallers<Remote["requests"]>;
  send: RpcMessageSenders<Remote["messages"]>;
  addMessageListener<K extends keyof Local["messages"]>(
    name: K,
    handler: (payload: Local["messages"][K]) => void
  ): void;
  removeMessageListener<K extends keyof Local["messages"]>(
    name: K,
    handler: (payload: Local["messages"][K]) => void
  ): void;
};

type RpcHandlers<Local extends SideSchema> = {
  requests: RpcRequestHandlers<Local["requests"]>;
  messages: RpcMessageHandlers<Local["messages"]>;
};

declare module "electrobun/bun" {
  export function defineElectrobunRPC<
    Schema extends RpcSchemaLike,
    Side extends ElectrobunSide,
  >(
    side: Side,
    config: {
      handlers: RpcHandlers<SideOf<Schema, Side>>;
    }
  ): any;
}

declare module "electrobun/view" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export class Electroview<Schema extends RpcSchemaLike = RpcSchemaLike> {
    constructor(config: { rpc: unknown });

    static defineRPC<Schema extends RpcSchemaLike>(config: {
      handlers: RpcHandlers<Schema["webview"]>;
    }): RpcConnection<Schema["webview"], Schema["bun"]>;
  }
}
