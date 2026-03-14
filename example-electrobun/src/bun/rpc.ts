import { defineElectrobunRPC } from "electrobun/bun";
import { defineTurboLndElectrobunRPCWithFactory } from "react-native-turbo-lnd/electrobun/bun-rpc-factory";

export function defineTurboLndElectrobunRPCForExample() {
  return defineTurboLndElectrobunRPCWithFactory(
    defineElectrobunRPC,
    // You can still create your own requests and messages here:
    {
      maxRequestTime: 10 * 1000000,
      requests: {
        __ExamplePing: async () => {
          return {
            ok: true,
            now: Date.now(),
            source: "example-electrobun",
          };
        },
      },
      messages: {
        __ExampleLog: (payload: unknown) => {
          console.log("[example-electrobun] __ExampleLog", payload);
        },
      },
    }
  );
}
