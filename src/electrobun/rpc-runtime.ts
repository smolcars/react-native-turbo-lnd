import { Electroview } from "electrobun/view";
import type { TurboLndElectrobunRpcSchema } from "./rpc-schema";

export type ElectrobunRpc = ReturnType<
  typeof Electroview.defineRPC<TurboLndElectrobunRpcSchema>
>;

let rpcInstance: ElectrobunRpc | null = null;
let electroviewInitialized = false;

export function ensureElectrobunRpc(): ElectrobunRpc {
  if (rpcInstance === null) {
    rpcInstance = Electroview.defineRPC<TurboLndElectrobunRpcSchema>({
      maxRequestTime: 60 * 1000,
      handlers: {
        requests: {},
        messages: {},
      },
    });
  }

  if (!electroviewInitialized) {
    // eslint-disable-next-line no-new
    new Electroview({ rpc: rpcInstance });
    electroviewInitialized = true;
  }

  return rpcInstance;
}
