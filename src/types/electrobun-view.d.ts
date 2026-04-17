import type {
  ElectrobunRPCConfig,
  ElectrobunRPCInstance,
  ElectrobunRPCSchema,
} from "./electrobun-rpc-shared";

export declare class Electroview {
  constructor(params: { rpc: ElectrobunRPCInstance<any, "webview"> });

  static defineRPC<Schema extends ElectrobunRPCSchema>(
    config: ElectrobunRPCConfig<Schema, "webview">
  ): ElectrobunRPCInstance<Schema, "webview">;
}
