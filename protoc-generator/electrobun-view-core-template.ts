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
import type {
  OnErrorCallback,
  OnResponseCallback,
  ProtobufBase64,
  Spec,
  UnsubscribeFromStream,
  WriteableStream,
} from "../core/NativeTurboLnd";
import type { TurboLndElectrobunRpcSchema } from "./rpc-schema";
import { ensureElectrobunRpc } from "./rpc-runtime";

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

let streamListenerAttached = false;
let nextServerLocalId = 1;
let nextBidiLocalId = 1;

const serverSubscriptions = new Map<number, StreamSubscription>();
const bidiSubscriptions = new Map<number, StreamSubscription>();

function hasSubscriptions(): boolean {
  return serverSubscriptions.size > 0 || bidiSubscriptions.size > 0;
}

function ensureStreamListener() {
  if (streamListenerAttached) {
    return;
  }

  const rpc = ensureElectrobunRpc();
  rpc.addMessageListener("__TurboLndStreamEvent", onStreamEvent);
  streamListenerAttached = true;
}

function maybeDetachStreamListener() {
  if (!streamListenerAttached || hasSubscriptions()) {
    return;
  }

  const rpc = ensureElectrobunRpc();
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
  const rpc = ensureElectrobunRpc();
  const response = await rpc.request.__TurboLndUnary({ method, data });
  return response.data;
}

function openServerStream(
  method: ServerStreamMethod,
  data: ProtobufBase64,
  onResponse: OnResponseCallback,
  onError: OnErrorCallback
): UnsubscribeFromStream {
  const rpc = ensureElectrobunRpc();
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
  const rpc = ensureElectrobunRpc();
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
    const rpc = ensureElectrobunRpc();
    return rpc.request.__TurboLndStart(args);
  },
${unaryMethodLines}${serverStreamingMethodLines}${bidiStreamingMethodLines}} satisfies Spec;

export default TurboLndElectrobunView;
`;
}
