import { Electroview } from "electrobun/view";

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

type ExampleRpc = ReturnType<typeof Electroview.defineRPC<ExampleRpcSchema>>;

let rpcInstance: ExampleRpc | null = null;
let electroviewInitialized = false;

function ensureRpc(): ExampleRpc {
  if (rpcInstance === null) {
    rpcInstance = Electroview.defineRPC<ExampleRpcSchema>({
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

export async function examplePing() {
  const rpc = ensureRpc();
  return rpc.request.__ExamplePing();
}

export function sendExampleLog(payload: ExampleLogPayload) {
  const rpc = ensureRpc();
  rpc.send.__ExampleLog(payload);
}
