import { subscribeState } from "../src/";
import { WalletState } from "../src/proto/lightning_pb";

describe("TurboLnd mock", () => {
  beforeEach(() => {
    // Reset the module before each test
    jest.resetModules();
    jest.doMock("../src/", () => {
      return require("../src/").default;
    });
  });

  test("subscribeState should initially return LOCKED state", (done) => {
    const onResponse = jest.fn((state: any) => {
      expect(state.state).toBe(WalletState.LOCKED);
      done();
    });
    const onError = jest.fn();

    subscribeState("" as any, onResponse, onError);
  });
});
