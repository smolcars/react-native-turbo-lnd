import type {
  ElectrobunRPC,
  ElectrobunRPCConfig,
  ElectrobunRPCSchema,
  RPCWithTransport,
} from "electrobun/bun";

export class Electroview<T extends RPCWithTransport = RPCWithTransport> {
  bunSocket?: WebSocket;
  rpc?: T;
  rpcHandler?: (msg: unknown) => void;

  constructor(config: { rpc: T });

  init(): void;
  initSocketToBun(): void;
  createTransport(): {
    send(message: unknown): void;
    registerHandler(handler: (msg: unknown) => void): void;
  };
  bunBridge(msg: string): Promise<void>;
  receiveMessageFromBun(msg: unknown): void;

  static defineRPC<Schema extends ElectrobunRPCSchema>(
    config: ElectrobunRPCConfig<Schema, "webview">
  ): ElectrobunRPC<Schema, "webview">;
}

declare const Electrobun: {
  Electroview: typeof Electroview;
};

export default Electrobun;
