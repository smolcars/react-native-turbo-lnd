import { defineElectrobunRPC } from "electrobun/bun";
import {
  defineTurboLndElectrobunRPCWithFactory,
  type AdditionalElectrobunHandlers,
} from "./bun-rpc-factory";

export { defineTurboLndElectrobunRPCWithFactory } from "./bun-rpc-factory";

export function defineTurboLndElectrobunRPC(
  additionalHandlers?: AdditionalElectrobunHandlers
) {
  return defineTurboLndElectrobunRPCWithFactory(
    defineElectrobunRPC,
    additionalHandlers
  );
}
