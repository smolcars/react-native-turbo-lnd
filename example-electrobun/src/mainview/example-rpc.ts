import {
  invokeElectrobunRequest,
  sendElectrobunMessage,
} from "../../../src/electrobun/custom-rpc";

type ExampleLogPayload =
  | Record<string, unknown>
  | string
  | number
  | boolean
  | null;

type ExampleRpcSchema = {
  bun: {
    requests: {
      __ExamplePing: {
        params: undefined;
        response: {
          ok: boolean;
          now: number;
          source: string;
        };
      };
    };
    messages: {
      __ExampleLog: ExampleLogPayload;
    };
  };
  webview: {
    requests: {};
    messages: {
      __ExampleLog: ExampleLogPayload;
    };
  };
};

export async function examplePing() {
  return invokeElectrobunRequest<
    ExampleRpcSchema["bun"]["requests"]["__ExamplePing"]["response"]
  >("__ExamplePing");
}

export function sendExampleLog(payload: ExampleLogPayload) {
  sendElectrobunMessage("__ExampleLog", payload);
}
