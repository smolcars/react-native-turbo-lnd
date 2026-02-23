import { beforeEach, describe, expect, test } from "bun:test";

import { WalletState } from "../src/proto/lightning_pb";

describe("TurboLnd mock", () => {
  beforeEach(() => {
    (globalThis as { fakelnd?: boolean }).fakelnd = true;
  });

  test("subscribeState should initially return LOCKED state", async () => {
    const { subscribeState } = await import("../src/");

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timed out waiting for subscribeState response"));
      }, 1000);

      subscribeState(
        "" as any,
        (state: any) => {
          clearTimeout(timeout);
          expect(state.state).toBe(WalletState.LOCKED);
          resolve();
        },
        (error: string) => {
          clearTimeout(timeout);
          reject(new Error(error));
        }
      );
    });
  });
});
