import type {
  ElectrobunRPCConfig,
  ElectrobunRPCInstance,
  ElectrobunRPCSchema,
  ElectrobunSide,
} from "./electrobun-rpc-shared";

export type { ElectrobunRPCSchema } from "./electrobun-rpc-shared";

export declare function defineElectrobunRPC<
  Schema extends ElectrobunRPCSchema,
  Side extends ElectrobunSide,
>(
  side: Side,
  config: ElectrobunRPCConfig<Schema, Side>
): ElectrobunRPCInstance<Schema, Side>;
