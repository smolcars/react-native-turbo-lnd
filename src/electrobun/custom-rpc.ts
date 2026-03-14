import { ensureElectrobunRpc } from "./rpc-runtime";

type DynamicRpcRequestMethods = Record<
  string,
  (params?: unknown) => Promise<unknown>
>;
type DynamicRpcMessageMethods = Record<string, (payload?: unknown) => void>;

/**
 * Invoke a custom Electrobun RPC request on the shared RPC instance.
 * Use this for app-defined Electrobun request handlers.
 */
export async function invokeElectrobunRequest<Response = unknown>(
  requestName: string,
  params?: unknown
): Promise<Response> {
  const rpc = ensureElectrobunRpc();
  const requestMethod = (rpc.request as unknown as DynamicRpcRequestMethods)[
    requestName
  ];

  if (typeof requestMethod !== "function") {
    throw new Error(
      `Electrobun request "${requestName}" is not available on the active RPC instance.`
    );
  }

  return (await requestMethod(params)) as Response;
}

/**
 * Send a custom Electrobun one-way message on the shared RPC instance.
 * Use this for app-defined Electrobun message handlers.
 */
export function sendElectrobunMessage(
  messageName: string,
  payload?: unknown
): void {
  const rpc = ensureElectrobunRpc();
  const messageMethod = (rpc.send as unknown as DynamicRpcMessageMethods)[
    messageName
  ];

  if (typeof messageMethod !== "function") {
    throw new Error(
      `Electrobun message "${messageName}" is not available on the active RPC instance.`
    );
  }

  messageMethod(payload);
}
