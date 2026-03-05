/* eslint-disable */

export type BuildElectrobunViewCoreParams = {
  contributorNotice: string;
  unaryMethods: string[];
  serverStreamingMethods: string[];
  bidiStreamingMethods: string[];
};

function toMethodLines(
  methods: string[],
  formatter: (method: string) => string
): string {
  if (methods.length === 0) {
    return "";
  }

  return `${methods.map(formatter).join("\n")}\n`;
}

export function buildElectrobunViewCore({
  contributorNotice,
  unaryMethods,
  serverStreamingMethods,
  bidiStreamingMethods,
}: BuildElectrobunViewCoreParams): string {
  const unaryMethodLines = toMethodLines(
    unaryMethods,
    (method) =>
      `  async ${method}(data: ProtobufBase64) { return invokeUnary("${method}", data); },`
  );
  const serverStreamingMethodLines = toMethodLines(
    serverStreamingMethods,
    (method) =>
      `  ${method}(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback) { return openServerStream("${method}", data, onResponse, onError); },`
  );
  const bidiStreamingMethodLines = toMethodLines(
    bidiStreamingMethods,
    (method) =>
      `  ${method}(onResponse: OnResponseCallback, onError: OnErrorCallback) { return openBidiStream("${method}", onResponse, onError); },`
  );

  return `${contributorNotice}
/* eslint-disable */
import { Electroview } from "electrobun/view";
import type {
  OnErrorCallback,
  OnResponseCallback,
  ProtobufBase64,
  Spec,
  UnsubscribeFromStream,
  WriteableStream,
} from "../core/NativeTurboLnd";
import type { TurboLndElectrobunRpcSchema } from "./rpc-schema";

type StreamEvent =
  TurboLndElectrobunRpcSchema["webview"]["messages"]["__TurboLndStreamEvent"];
type UnaryMethod =
  TurboLndElectrobunRpcSchema["bun"]["requests"]["__TurboLndUnary"]["params"]["method"];
type ServerStreamMethod =
  TurboLndElectrobunRpcSchema["bun"]["requests"]["__TurboLndOpenServerStream"]["params"]["method"];
type BidiStreamMethod =
  TurboLndElectrobunRpcSchema["bun"]["requests"]["__TurboLndOpenBidiStream"]["params"]["method"];

type StreamSubscription = {
  remoteId: string | null;
  cancelled: boolean;
  onResponse: OnResponseCallback;
  onError: OnErrorCallback;
};

type ElectrobunRpc = ReturnType<
  typeof Electroview.defineRPC<TurboLndElectrobunRpcSchema>
>;

let rpcInstance: ElectrobunRpc | null = null;
let electroviewInitialized = false;
let streamListenerAttached = false;
let nextServerLocalId = 1;
let nextBidiLocalId = 1;

const serverSubscriptions = new Map<number, StreamSubscription>();
const bidiSubscriptions = new Map<number, StreamSubscription>();

function ensureRpc(): ElectrobunRpc {
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

type DynamicRpcRequestMethods = Record<
  string,
  (params?: unknown) => Promise<unknown>
>;
type DynamicRpcMessageMethods = Record<string, (payload?: unknown) => void>;

export async function invokeElectrobunRequest<Response = unknown>(
  requestName: string,
  params?: unknown
): Promise<Response> {
  const rpc = ensureRpc();
  const requestMethod = (rpc.request as unknown as DynamicRpcRequestMethods)[
    requestName
  ];
  if (typeof requestMethod !== "function") {
    throw new Error(
      \`Electrobun request "\${requestName}" is not available on the active RPC instance.\`
    );
  }

  return (await requestMethod(params)) as Response;
}

export function sendElectrobunMessage(
  messageName: string,
  payload?: unknown
): void {
  const rpc = ensureRpc();
  const messageMethod = (rpc.send as unknown as DynamicRpcMessageMethods)[
    messageName
  ];
  if (typeof messageMethod !== "function") {
    throw new Error(
      \`Electrobun message "\${messageName}" is not available on the active RPC instance.\`
    );
  }

  messageMethod(payload);
}

function hasSubscriptions(): boolean {
  return serverSubscriptions.size > 0 || bidiSubscriptions.size > 0;
}

function ensureStreamListener() {
  if (streamListenerAttached) {
    return;
  }

  const rpc = ensureRpc();
  rpc.addMessageListener("__TurboLndStreamEvent", onStreamEvent);
  streamListenerAttached = true;
}

function maybeDetachStreamListener() {
  if (!streamListenerAttached || hasSubscriptions()) {
    return;
  }

  const rpc = ensureRpc();
  rpc.removeMessageListener("__TurboLndStreamEvent", onStreamEvent);
  streamListenerAttached = false;
}

function handleStreamEventForMap(
  event: StreamEvent,
  subscriptions: Map<number, StreamSubscription>
) {
  for (const [id, subscription] of subscriptions) {
    if (subscription.remoteId !== event.subscriptionId) {
      continue;
    }

    if (event.type === "data") {
      subscription.onResponse(event.data ?? "");
      continue;
    }

    const error =
      event.type === "error"
        ? (event.error ?? "Unknown Electrobun stream error.")
        : "Electrobun stream ended.";

    subscription.onError(error);
    subscriptions.delete(id);
  }
}

function onStreamEvent(event: StreamEvent) {
  handleStreamEventForMap(event, serverSubscriptions);
  handleStreamEventForMap(event, bidiSubscriptions);
  maybeDetachStreamListener();
}

async function invokeUnary(method: UnaryMethod, data: ProtobufBase64) {
  const rpc = ensureRpc();
  const response = await rpc.request.__TurboLndUnary({ method, data });
  return response.data;
}

function openServerStream(
  method: ServerStreamMethod,
  data: ProtobufBase64,
  onResponse: OnResponseCallback,
  onError: OnErrorCallback
): UnsubscribeFromStream {
  const rpc = ensureRpc();
  const localId = nextServerLocalId++;

  serverSubscriptions.set(localId, {
    remoteId: null,
    cancelled: false,
    onResponse,
    onError,
  });
  ensureStreamListener();

  rpc.request
    .__TurboLndOpenServerStream({ method, data })
    .then(({ subscriptionId }: { subscriptionId: string }) => {
      const subscription = serverSubscriptions.get(localId);
      if (!subscription) {
        return;
      }

      subscription.remoteId = subscriptionId;
      if (!subscription.cancelled) {
        return;
      }

      serverSubscriptions.delete(localId);
      rpc.request.__TurboLndCloseServerStream({ subscriptionId });
      maybeDetachStreamListener();
    })
    .catch((error: unknown) => {
      const subscription = serverSubscriptions.get(localId);
      if (!subscription) {
        return;
      }

      serverSubscriptions.delete(localId);
      subscription.onError(error instanceof Error ? error.message : String(error));
      maybeDetachStreamListener();
    });

  return () => {
    const subscription = serverSubscriptions.get(localId);
    if (!subscription) {
      return;
    }

    subscription.cancelled = true;
    if (!subscription.remoteId) {
      return;
    }

    const remoteId = subscription.remoteId;
    serverSubscriptions.delete(localId);
    rpc.request.__TurboLndCloseServerStream({ subscriptionId: remoteId });
    maybeDetachStreamListener();
  };
}

function openBidiStream(
  method: BidiStreamMethod,
  onResponse: OnResponseCallback,
  onError: OnErrorCallback
): WriteableStream {
  const rpc = ensureRpc();
  const localId = nextBidiLocalId++;

  bidiSubscriptions.set(localId, {
    remoteId: null,
    cancelled: false,
    onResponse,
    onError,
  });
  ensureStreamListener();

  rpc.request
    .__TurboLndOpenBidiStream({ method })
    .then(({ subscriptionId }: { subscriptionId: string }) => {
      const subscription = bidiSubscriptions.get(localId);
      if (!subscription) {
        return;
      }

      subscription.remoteId = subscriptionId;
      if (!subscription.cancelled) {
        return;
      }

      bidiSubscriptions.delete(localId);
      rpc.request.__TurboLndStopBidiStream({ subscriptionId });
      maybeDetachStreamListener();
    })
    .catch((error: unknown) => {
      const subscription = bidiSubscriptions.get(localId);
      if (!subscription) {
        return;
      }

      bidiSubscriptions.delete(localId);
      subscription.onError(error instanceof Error ? error.message : String(error));
      maybeDetachStreamListener();
    });

  return {
    send(dataB64: ProtobufBase64): boolean {
      const subscription = bidiSubscriptions.get(localId);
      if (!subscription || subscription.cancelled || !subscription.remoteId) {
        return false;
      }

      rpc.request
        .__TurboLndSendBidiStream({
          subscriptionId: subscription.remoteId,
          data: dataB64,
        })
        .then(({ sent }: { sent: boolean }) => {
          if (!sent) {
            subscription.onError(\`\${method} send rejected by Electrobun backend.\`);
          }
        })
        .catch((error: unknown) => {
          subscription.onError(error instanceof Error ? error.message : String(error));
        });

      return true;
    },
    stop(): boolean {
      const subscription = bidiSubscriptions.get(localId);
      if (!subscription) {
        return false;
      }

      subscription.cancelled = true;
      if (!subscription.remoteId) {
        return true;
      }

      const remoteId = subscription.remoteId;
      bidiSubscriptions.delete(localId);
      rpc.request.__TurboLndStopBidiStream({ subscriptionId: remoteId });
      maybeDetachStreamListener();
      return true;
    },
  };
}

const TurboLndElectrobunView = {
  async start(args: string) {
    const rpc = ensureRpc();
    return rpc.request.__TurboLndStart(args);
  },
${unaryMethodLines}${serverStreamingMethodLines}${bidiStreamingMethodLines}} satisfies Spec;

export default TurboLndElectrobunView;
`;
}
