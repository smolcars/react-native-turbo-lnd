import { defineElectrobunRPC } from "electrobun/bun";
import {
  defineTurboLndElectrobunRPCWithFactory,
  type AdditionalElectrobunHandlers,
} from "./bun-rpc-factory";

export { defineTurboLndElectrobunRPCWithFactory } from "./bun-rpc-factory";

export function defineTurboLndElectrobunRPC(
  additionalHandlers?: AdditionalElectrobunHandlers
): ReturnType<typeof defineTurboLndElectrobunRPCWithFactory> {
  return defineTurboLndElectrobunRPCWithFactory(
    defineElectrobunRPC,
    additionalHandlers
  );
}
