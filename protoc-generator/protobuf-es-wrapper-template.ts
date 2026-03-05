/* eslint-disable */

type WrapperRootPrefix = "." | "..";

export type BuildProtobufEsWrapperParams = {
  contributorNotice: string;
  backendModulePath: string;
  rootPrefix: WrapperRootPrefix;
  methodsSource: string;
};

const withPrefix = (rootPrefix: WrapperRootPrefix, modulePath: string) =>
  `${rootPrefix}/${modulePath}`;

export function buildProtobufEsWrapper({
  contributorNotice,
  backendModulePath,
  rootPrefix,
  methodsSource,
}: BuildProtobufEsWrapperParams): string {
  const fromRoot = (modulePath: string) => withPrefix(rootPrefix, modulePath);

  return `${contributorNotice}
/* eslint-disable */
import "${fromRoot("setup-text-encoding")}";
import * as TurboLndBackendModule from "${backendModulePath}";
import TurboLnd from "${backendModulePath}";
import { type OnResponseCallback, type OnErrorCallback, type UnsubscribeFromStream } from "${fromRoot("core/NativeTurboLnd")}";

import { create, toBinary, fromBinary, type MessageInitShape } from "@bufbuild/protobuf";
import { base64Encode, base64Decode } from "@bufbuild/protobuf/wire";

import * as lnrpc from "${fromRoot("proto/lightning_pb")}";
// import * as walletunlocker from "${fromRoot("proto/walletunlocker_pb")}";
// import * as state from "${fromRoot("proto/stateservice_pb")}";
import * as autopilotrpc from "${fromRoot("proto/autopilotrpc/autopilot_pb")}";
// import * as chainrpc from "${fromRoot("proto/chainrpc/chainkit_pb")}";
import * as chainrpc from "${fromRoot("proto/chainrpc/chainnotifier_pb")}";
// import * as dev from "${fromRoot("proto/devrpc/dev_pb")}";
import * as invoicesrpc from "${fromRoot("proto/invoicesrpc/invoices_pb")}";
// import * as versionresponse from "${fromRoot("proto/lnclipb/lncli_pb")}";
import * as neutrinorpc from "${fromRoot("proto/neutrinorpc/neutrino_pb")}";
import * as peersrpc from "${fromRoot("proto/peersrpc/peers_pb")}";
import * as routerrpc from "${fromRoot("proto/routerrpc/router_pb")}";
import * as signrpc from "${fromRoot("proto/signrpc/signer_pb")}";
import * as verrpc from "${fromRoot("proto/verrpc/verrpc_pb")}";
import * as walletrpc from "${fromRoot("proto/walletrpc/walletkit_pb")}";
import * as watchtowerrpc from "${fromRoot("proto/watchtowerrpc/watchtower_pb")}";
import * as wtclientrpc from "${fromRoot("proto/wtclientrpc/wtclient_pb")}";

/**
 *
 * Starts up lnd.
 * You need to provide path to the app's local dir to lnd via \`--lnddir\` arg.
 * Use \`subscribeState\` to know when lnd is ready for wallet unlock/creation.
 *
 */
export const start = TurboLnd.start;
export async function invokeElectrobunRequest<Response = unknown>(
  requestName: string,
  params?: unknown
): Promise<Response> {
  const invoke = (
    TurboLndBackendModule as Record<string, unknown>
  ).invokeElectrobunRequest;
  if (typeof invoke !== "function") {
    throw new Error(
      "invokeElectrobunRequest is only available with the Electrobun view backend."
    );
  }

  return (
    invoke as (requestName: string, params?: unknown) => Promise<Response>
  )(requestName, params);
}

export function sendElectrobunMessage(
  messageName: string,
  payload?: unknown
): void {
  const send = (TurboLndBackendModule as Record<string, unknown>)
    .sendElectrobunMessage;
  if (typeof send !== "function") {
    throw new Error(
      "sendElectrobunMessage is only available with the Electrobun view backend."
    );
  }

  (send as (messageName: string, payload?: unknown) => void)(
    messageName,
    payload
  );
}

${methodsSource}
`;
}
