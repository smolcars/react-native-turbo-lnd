import { base64Encode, base64Decode } from "@bufbuild/protobuf/wire";

import { create, toBinary, fromBinary } from "@bufbuild/protobuf";

import {
  GetStateResponseSchema,
  UnlockWalletResponseSchema,
  WalletState,
  GetInfoResponseSchema,
  ListChannelsResponseSchema,
  ListPeersResponseSchema,
  WalletBalanceResponseSchema,
  SendCoinsResponseSchema,
  SendCoinsRequestSchema,
  ConnectPeerRequestSchema,
  ConnectPeerResponseSchema,
  NewAddressRequestSchema,
  NewAddressResponseSchema,
  ChannelBalanceResponseSchema,
  OpenChannelRequestSchema,
  ChannelPointSchema,
  CloseChannelRequestSchema,
  CloseStatusUpdateSchema,
  PendingUpdateSchema,
  ChannelCloseUpdateSchema,
  PendingChannelsResponseSchema,
  PendingChannelsRequestSchema,
  GetTransactionsRequestSchema,
  TransactionDetailsSchema,
  ChannelEventSubscriptionSchema,
  InvoiceSubscriptionSchema,
  SubscribeCustomMessagesRequestSchema,
  NodeInfoRequestSchema,
  NodeInfoSchema,
  GetRecoveryInfoRequestSchema,
  GetRecoveryInfoResponseSchema,
  GenSeedRequestSchema,
  GenSeedResponseSchema,
  DelCanceledInvoiceReqSchema,
  DelCanceledInvoiceRespSchema,
  PayReqStringSchema,
  PayReqSchema,
  InvoiceSchema,
  AddInvoiceResponseSchema,
  PaymentHashSchema,
  Invoice_InvoiceState,
  type Invoice,
} from "../proto/lightning_pb";
import {
  FindBaseAliasRequestSchema,
  FindBaseAliasResponseSchema,
} from "../proto/routerrpc/router_pb";
import {
  BumpForceCloseFeeRequestSchema,
  BumpForceCloseFeeResponseSchema,
} from "../proto/walletrpc/walletkit_pb";
import type {
  Spec,
  OnErrorCallback,
  OnResponseCallback,
  WriteableStream,
} from "../core/NativeTurboLnd.ts";
import { SubscribeStateResponseSchema } from "../proto/stateservice_pb";
import {
  mockPeers,
  mockChannels,
  mockWalletBalance,
  mockGetInfoResponse,
  generateMockAddress,
  mockChannelBalanceResponse,
  generateMockTxid,
  mockPendingChannelsResponse,
} from "./responses";
import { decodeBolt11 } from "./bolt11";

let currentState: WalletState = WalletState.LOCKED;
let subscribeStateOnResponseCallbacks: {
  onResponse: OnResponseCallback;
  onError: OnErrorCallback;
}[] = [];
let mockInvoices: Invoice[] = [];
let nextInvoiceAddIndex = 1n;
let subscribeInvoicesOnResponseCallbacks: {
  onResponse: OnResponseCallback;
  onError: OnErrorCallback;
}[] = [];

const hexToUint8Array = (hex: string): Uint8Array => {
  const normalizedHex = hex.trim();
  const safeHex =
    normalizedHex.length % 2 === 0 ? normalizedHex : `0${normalizedHex}`;
  const bytes = new Uint8Array(safeHex.length / 2);

  for (let i = 0; i < bytes.length; i += 1) {
    const value = Number.parseInt(safeHex.slice(i * 2, i * 2 + 2), 16);
    bytes[i] = Number.isNaN(value) ? 0 : value;
  }

  return bytes;
};

const uint8ArrayToHex = (bytes: Uint8Array): string =>
  Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

const createRandomBytes = (length: number): Uint8Array =>
  Uint8Array.from(
    Array.from({ length }, () => Math.floor(Math.random() * 256))
  );

const createFallbackInvoiceHash = (preimage: Uint8Array): Uint8Array => {
  const hash = new Uint8Array(32);

  for (let i = 0; i < hash.length; i += 1) {
    const left = preimage[i % preimage.length] ?? 0;
    const right = preimage[(i * 7 + 13) % preimage.length] ?? 0;
    hash[i] = (left + right + i * 17) % 256;
  }

  return hash;
};

const deriveInvoiceHash = async (preimage: Uint8Array): Promise<Uint8Array> => {
  const subtle = globalThis.crypto?.subtle;
  if (subtle) {
    const digestInput = Uint8Array.from(preimage);
    const digest = await subtle.digest("SHA-256", digestInput);
    return new Uint8Array(digest);
  }

  return createFallbackInvoiceHash(preimage);
};

const normalizeInvoiceAmounts = (
  invoice: Invoice
): { valueSat: bigint; valueMsat: bigint } => {
  if (invoice.valueMsat > 0n) {
    return {
      valueSat: invoice.valueMsat / 1000n,
      valueMsat: invoice.valueMsat,
    };
  }

  if (invoice.value > 0n) {
    return {
      valueSat: invoice.value,
      valueMsat: invoice.value * 1000n,
    };
  }

  return {
    valueSat: 0n,
    valueMsat: 0n,
  };
};

const createMockPaymentRequest = (
  addIndex: bigint,
  amountSat: bigint,
  rHash: Uint8Array
): string => {
  const hashPrefix = uint8ArrayToHex(rHash).slice(0, 24);

  return `lnbc${amountSat}mockinvoice${addIndex}${hashPrefix}`;
};

const normalizeInvoiceHashString = (invoiceHash: string): string => {
  if (invoiceHash === "") {
    throw new Error("invoice hash must be provided");
  }

  if (invoiceHash.length !== 64) {
    throw new Error("invalid hash string length");
  }

  const invalidChar = Array.from(invoiceHash).find(
    (char) => !/[0-9a-fA-F]/.test(char)
  );

  if (invalidChar) {
    const codePoint = invalidChar.codePointAt(0) ?? 0;
    throw new Error(
      `encoding/hex: invalid byte: U+${codePoint
        .toString(16)
        .toUpperCase()
        .padStart(4, "0")} '${invalidChar}'`
    );
  }

  return invoiceHash.toLowerCase();
};

const BOLT11_FEATURE_NAMES = [
  "option_data_loss_protect",
  "option_data_loss_protect",
  "initial_routing_sync",
  "initial_routing_sync",
  "option_upfront_shutdown_script",
  "option_upfront_shutdown_script",
  "gossip_queries",
  "gossip_queries",
  "var_onion_optin",
  "var_onion_optin",
  "gossip_queries_ex",
  "gossip_queries_ex",
  "option_static_remotekey",
  "option_static_remotekey",
  "payment_secret",
  "payment_secret",
  "basic_mpp",
  "basic_mpp",
  "option_support_large_channel",
  "option_support_large_channel",
] as const;

const mapDecodedBolt11Features = (
  featureBits: Record<number, "required" | "supported">
) => {
  return Object.fromEntries(
    Object.entries(featureBits).map(([bitKey, status]) => {
      const bit = Number(bitKey);
      const knownName = BOLT11_FEATURE_NAMES[bit] ?? "";

      return [
        bit,
        {
          name: knownName,
          isRequired: status === "required",
          isKnown: knownName !== "",
        },
      ];
    })
  );
};

const mapDecodedBolt11RouteHints = (
  routeHints: Array<
    Array<{
      pubkey: string;
      shortChannelId: string;
      feeBaseMsat: number;
      feeProportionalMillionths: number;
      cltvExpiryDelta: number;
    }>
  >
) => {
  return routeHints.map((route) => ({
    hopHints: route.map((hop) => ({
      nodeId: hop.pubkey,
      chanId: BigInt(`0x${hop.shortChannelId}`).toString(),
      feeBaseMsat: hop.feeBaseMsat,
      feeProportionalMillionths: hop.feeProportionalMillionths,
      cltvExpiryDelta: hop.cltvExpiryDelta,
    })),
  }));
};

const emitInvoice = (
  onResponse: OnResponseCallback,
  invoice: Invoice
): void => {
  onResponse(base64Encode(toBinary(InvoiceSchema, invoice)));
};

const emitInvoiceToSubscribers = (invoice: Invoice): void => {
  setTimeout(() => {
    subscribeInvoicesOnResponseCallbacks.forEach((cb) => {
      emitInvoice(cb.onResponse, invoice);
    });
  }, 0);
};

const callSubscribeStateOnResponseCallbacks = () => {
  subscribeStateOnResponseCallbacks.forEach((cb) => {
    cb.onResponse(
      base64Encode(
        toBinary(
          GetStateResponseSchema,
          create(GetStateResponseSchema, {
            state: currentState,
          })
        )
      )
    );
  });
};

const TurboLnd: Spec = {
  start: async (_: string) => {
    console.log("Hi from mock");
    return "";
  },

  subscribeState: (_, onResponse, onError) => {
    subscribeStateOnResponseCallbacks.push({ onResponse, onError });

    let subscribing = true;

    setTimeout(() => {
      if (!subscribing) {
        return;
      }

      const state = toBinary(
        SubscribeStateResponseSchema,
        create(SubscribeStateResponseSchema, {
          state: currentState,
        })
      );
      onResponse(base64Encode(state));
    }, 0);

    return () => {
      subscribing = false;
      console.log("unsubscribed");
    };
  },

  initWallet: async (_) => {
    // This mock has no persistent wallet state, so we model a fresh app boot
    // as LOCKED and allow one init/unlock transition from that state only.
    // CAUTION: In real lnd it would be state NON_EXISTING if no wallet exists.
    if (currentState !== WalletState.LOCKED) {
      throw new Error(`initWallet invalid state: ${currentState}`);
    }

    currentState = WalletState.UNLOCKED;
    callSubscribeStateOnResponseCallbacks();

    currentState = WalletState.RPC_ACTIVE;
    callSubscribeStateOnResponseCallbacks();

    return base64Encode(
      toBinary(
        UnlockWalletResponseSchema,
        create(UnlockWalletResponseSchema, {})
      )
    );
  },

  unlockWallet: async (_) => {
    // Prevent repeated unlock calls once the mock has transitioned.
    if (currentState !== WalletState.LOCKED) {
      throw new Error(`unlockWallet invalid state: ${currentState}`);
    }

    currentState = WalletState.UNLOCKED;
    callSubscribeStateOnResponseCallbacks();

    currentState = WalletState.RPC_ACTIVE;
    callSubscribeStateOnResponseCallbacks();

    return base64Encode(
      toBinary(
        UnlockWalletResponseSchema,
        create(UnlockWalletResponseSchema, {})
      )
    );
  },

  getInfo: async (_) => {
    return base64Encode(toBinary(GetInfoResponseSchema, mockGetInfoResponse));
  },

  listChannels: async (_) => {
    return base64Encode(
      toBinary(
        ListChannelsResponseSchema,
        create(ListChannelsResponseSchema, {
          channels: mockChannels,
        })
      )
    );
  },

  pendingChannels: async (request) => {
    fromBinary(PendingChannelsRequestSchema, base64Decode(request));

    return base64Encode(
      toBinary(PendingChannelsResponseSchema, mockPendingChannelsResponse)
    );
  },

  listPeers: async (_) => {
    return base64Encode(
      toBinary(
        ListPeersResponseSchema,
        create(ListPeersResponseSchema, {
          peers: mockPeers,
        })
      )
    );
  },

  walletBalance: async (_) => {
    return base64Encode(
      toBinary(WalletBalanceResponseSchema, mockWalletBalance)
    );
  },

  channelBalance: async (_) => {
    const response = create(
      ChannelBalanceResponseSchema,
      mockChannelBalanceResponse
    );

    return base64Encode(toBinary(ChannelBalanceResponseSchema, response));
  },

  newAddress: async (request) => {
    const decodedRequest = fromBinary(
      NewAddressRequestSchema,
      base64Decode(request)
    );

    const mockAddress = generateMockAddress(decodedRequest.type);

    const response = create(NewAddressResponseSchema, {
      address: mockAddress,
    });

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 100));

    return base64Encode(toBinary(NewAddressResponseSchema, response));
  },

  sendCoins: async (request) => {
    const decodedRequest = fromBinary(
      SendCoinsRequestSchema,
      base64Decode(request)
    );

    if (decodedRequest.amount <= BigInt(0) && !decodedRequest.sendAll) {
      throw new Error("Invalid amount");
    }

    if (!decodedRequest.addr) {
      throw new Error("Invalid address");
    }

    const mockTxid = Math.random().toString(36).substring(2, 15);

    const response = create(SendCoinsResponseSchema, {
      txid: mockTxid,
    });

    return base64Encode(toBinary(SendCoinsResponseSchema, response));
  },

  openChannelSync: async (request) => {
    const decodedRequest = fromBinary(
      OpenChannelRequestSchema,
      base64Decode(request)
    );

    // Simulate some basic validation
    if (decodedRequest.localFundingAmount <= BigInt(0)) {
      throw new Error("Invalid local funding amount");
    }

    if (decodedRequest.nodePubkey.length === 0) {
      throw new Error("Invalid node pubkey");
    }

    const mockChannelPoint = create(ChannelPointSchema, {
      fundingTxid: {
        case: "fundingTxidStr",
        value:
          "17625c43f15b77bfb61f8ff5cd95e56e3999378cdfc7d3851cd4d0b2a12c2a23",
      },
      outputIndex: 0,
    });

    return base64Encode(toBinary(ChannelPointSchema, mockChannelPoint));
  },

  closeChannel: (request, onResponse, onError) => {
    const decodedRequest = fromBinary(
      CloseChannelRequestSchema,
      base64Decode(request)
    );

    // Check if the channel point is provided
    if (!decodedRequest.channelPoint) {
      onError("Channel point is required");
      return () => {};
    }

    let isClosing = true;
    const closingTime = decodedRequest.force ? 2000 : 5000; // Force close is faster
    const intervalId = setInterval(() => {
      if (!isClosing) {
        clearInterval(intervalId);
        return;
      }

      // Simulate channel closing process
      const closeUpdate = create(CloseStatusUpdateSchema, {
        update: {
          case: "closePending",
          value: create(PendingUpdateSchema, {
            txid: hexToUint8Array(generateMockTxid()),
            outputIndex: decodedRequest?.channelPoint?.outputIndex,
          }),
        },
      });

      onResponse(base64Encode(toBinary(CloseStatusUpdateSchema, closeUpdate)));
    }, 1000);

    // Simulate channel close completion
    setTimeout(() => {
      isClosing = false;

      const finalUpdate = create(CloseStatusUpdateSchema, {
        update: {
          case: "chanClose",
          value: create(ChannelCloseUpdateSchema, {
            closingTxid: hexToUint8Array(generateMockTxid()),
            success: true,
          }),
        },
      });

      onResponse(base64Encode(toBinary(CloseStatusUpdateSchema, finalUpdate)));
    }, closingTime);

    // Return an unsubscribe function
    return () => {
      isClosing = false;
      clearInterval(intervalId);
    };
  },

  // Add placeholders for the remaining functions
  getTransactions: async (_data) => {
    fromBinary(GetTransactionsRequestSchema, base64Decode(_data));

    return base64Encode(
      toBinary(
        TransactionDetailsSchema,
        create(TransactionDetailsSchema, {
          transactions: [],
        })
      )
    );
  },

  listUnspent: async (_data) => {
    throw new Error("listUnspent Not Implemented");
  },

  estimateFee: async (_data) => {
    throw new Error("estimateFee Not Implemented");
  },

  subscribeTransactions: (_data, _onResponse, _onError) => {
    // Accept the request shape but intentionally emit no transactions.
    fromBinary(GetTransactionsRequestSchema, base64Decode(_data));

    return () => {};
  },

  sendMany: async (_data) => {
    throw new Error("sendMany Not Implemented");
  },

  signMessage: async (_data) => {
    throw new Error("signMessage Not Implemented");
  },

  verifyMessage: async (_data) => {
    throw new Error("verifyMessage Not Implemented");
  },

  connectPeer: async (_data) => {
    const request = fromBinary(ConnectPeerRequestSchema, base64Decode(_data));

    if (!request.addr?.pubkey || !request.addr?.host) {
      throw new Error("Invalid peer address");
    }

    return base64Encode(
      toBinary(ConnectPeerResponseSchema, create(ConnectPeerResponseSchema, {}))
    );
  },

  disconnectPeer: async (_data) => {
    throw new Error("disconnectPeer Not Implemented");
  },

  subscribePeerEvents: (_data, _onResponse, _onError) => {
    throw new Error("subscribePeerEvents Not Implemented");
  },

  getRecoveryInfo: async (_data) => {
    fromBinary(GetRecoveryInfoRequestSchema, base64Decode(_data));

    return base64Encode(
      toBinary(
        GetRecoveryInfoResponseSchema,
        create(GetRecoveryInfoResponseSchema, {
          recoveryMode: false,
          recoveryFinished: false,
          progress: 0,
        })
      )
    );
  },

  subscribeChannelEvents: (_data, _onResponse, _onError) => {
    fromBinary(ChannelEventSubscriptionSchema, base64Decode(_data));

    return () => {};
  },

  closedChannels: async (_data) => {
    throw new Error("closedChannels Not Implemented");
  },

  openChannel: (_data, _onResponse, _onError) => {
    throw new Error("openChannel Not Implemented");
  },

  batchOpenChannel: async (_data) => {
    throw new Error("batchOpenChannel Not Implemented");
  },

  fundingStateStep: async (_data) => {
    throw new Error("fundingStateStep Not Implemented");
  },

  channelAcceptor: (_onResponse, _onError) => {
    let isActive = true;

    return {
      // Demo web mock: no inbound channel requests are emitted.
      send: (_data) => isActive,
      stop: () => {
        const wasActive = isActive;
        isActive = false;
        return wasActive;
      },
    };
  },

  abandonChannel: async (_data) => {
    throw new Error("abandonChannel Not Implemented");
  },

  sendPayment: (_onResponse, _onError) => {
    throw new Error("sendPayment Not Implemented");
  },

  sendPaymentSync: async (_data) => {
    throw new Error("sendPaymentSync Not Implemented");
  },

  sendToRoute: (_onResponse, _onError) => {
    throw new Error("sendToRoute Not Implemented");
  },

  sendToRouteSync: async (_data) => {
    throw new Error("sendToRouteSync Not Implemented");
  },

  addInvoice: async (_data) => {
    const request = fromBinary(InvoiceSchema, base64Decode(_data));
    const addIndex = nextInvoiceAddIndex;
    const { valueSat, valueMsat } = normalizeInvoiceAmounts(request);
    const rPreimage =
      request.rPreimage.length === 32
        ? request.rPreimage
        : createRandomBytes(32);
    const rHash = await deriveInvoiceHash(rPreimage);
    const paymentAddr = createRandomBytes(32);
    const paymentRequest = createMockPaymentRequest(addIndex, valueSat, rHash);
    const invoice = create(InvoiceSchema, request);

    invoice.rPreimage = rPreimage;
    invoice.rHash = rHash;
    invoice.creationDate = BigInt(Math.floor(Date.now() / 1000));
    invoice.settleDate = 0n;
    invoice.value = valueSat;
    invoice.valueMsat = valueMsat;
    invoice.paymentRequest = paymentRequest;
    invoice.expiry = request.expiry > 0n ? request.expiry : 86400n;
    invoice.private = request.private || request.routeHints.length > 0;
    invoice.addIndex = addIndex;
    invoice.settleIndex = 0n;
    invoice.amtPaid = 0n;
    invoice.amtPaidSat = 0n;
    invoice.amtPaidMsat = 0n;
    invoice.state = Invoice_InvoiceState.OPEN;
    invoice.settled = false;
    invoice.htlcs = [];
    invoice.paymentAddr = paymentAddr;

    mockInvoices.push(invoice);
    nextInvoiceAddIndex += 1n;
    emitInvoiceToSubscribers(invoice);

    return base64Encode(
      toBinary(
        AddInvoiceResponseSchema,
        create(AddInvoiceResponseSchema, {
          rHash,
          paymentRequest,
          addIndex,
          paymentAddr,
        })
      )
    );
  },

  listInvoices: async (_data) => {
    throw new Error("listInvoices Not Implemented");
  },

  lookupInvoice: async (_data) => {
    const request = fromBinary(PaymentHashSchema, base64Decode(_data));
    const targetHashHex = request.rHash.length
      ? uint8ArrayToHex(request.rHash)
      : request.rHashStr.toLowerCase();
    const invoice = mockInvoices.find(
      (candidate) => uint8ArrayToHex(candidate.rHash) === targetHashHex
    );

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return base64Encode(toBinary(InvoiceSchema, invoice));
  },

  subscribeInvoices: (_data, _onResponse, _onError) => {
    const request = fromBinary(InvoiceSubscriptionSchema, base64Decode(_data));
    const subscription = {
      onResponse: _onResponse,
      onError: _onError,
    };

    subscribeInvoicesOnResponseCallbacks.push(subscription);

    if (request.addIndex > 0n) {
      const invoicesToReplay = mockInvoices.filter(
        (invoice) => invoice.addIndex > request.addIndex
      );

      setTimeout(() => {
        if (!subscribeInvoicesOnResponseCallbacks.includes(subscription)) {
          return;
        }

        invoicesToReplay.forEach((invoice) => {
          emitInvoice(subscription.onResponse, invoice);
        });
      }, 0);
    }

    return () => {
      subscribeInvoicesOnResponseCallbacks =
        subscribeInvoicesOnResponseCallbacks.filter(
          (cb) => cb !== subscription
        );
    };
  },

  deleteCanceledInvoice: async (_data) => {
    const request = fromBinary(
      DelCanceledInvoiceReqSchema,
      base64Decode(_data)
    );
    const normalizedHash = normalizeInvoiceHashString(request.invoiceHash);
    const invoiceIndex = mockInvoices.findIndex(
      (invoice) => uint8ArrayToHex(invoice.rHash) === normalizedHash
    );

    if (invoiceIndex === -1) {
      throw new Error("unable to locate invoice");
    }

    if (mockInvoices[invoiceIndex]?.state !== Invoice_InvoiceState.CANCELED) {
      throw new Error("invoice not canceled");
    }

    mockInvoices.splice(invoiceIndex, 1);

    return base64Encode(
      toBinary(
        DelCanceledInvoiceRespSchema,
        create(DelCanceledInvoiceRespSchema, {
          status: `canceled invoice deleted successfully: invoice hash ${normalizedHash}`,
        })
      )
    );
  },

  decodePayReq: async (_data) => {
    const request = fromBinary(PayReqStringSchema, base64Decode(_data));
    try {
      const decoded = decodeBolt11(request.payReq);
      const numMsat = decoded.millisatoshis
        ? BigInt(decoded.millisatoshis)
        : 0n;

      return base64Encode(
        toBinary(
          PayReqSchema,
          create(PayReqSchema, {
            destination: decoded.payee ?? "",
            paymentHash: decoded.paymentHash ?? "",
            numSatoshis: numMsat / 1000n,
            timestamp: BigInt(decoded.timestamp),
            expiry: BigInt(decoded.expiry ?? 3600),
            description: decoded.description ?? "",
            descriptionHash: decoded.descriptionHash ?? "",
            fallbackAddr: "",
            cltvExpiry: BigInt(decoded.minFinalCltvExpiry ?? 9),
            routeHints: mapDecodedBolt11RouteHints(decoded.routeHints),
            paymentAddr: decoded.paymentSecret
              ? hexToUint8Array(decoded.paymentSecret)
              : new Uint8Array(32),
            numMsat,
            features: mapDecodedBolt11Features(decoded.featureBits),
            blindedPaths: [],
          })
        )
      );
    } catch {
      const invoice = mockInvoices.find(
        (candidate) => candidate.paymentRequest === request.payReq
      );

      if (!invoice) {
        throw new Error("unable to decode payment request");
      }

      return base64Encode(
        toBinary(
          PayReqSchema,
          create(PayReqSchema, {
            destination: mockGetInfoResponse.identityPubkey,
            paymentHash: uint8ArrayToHex(invoice.rHash),
            numSatoshis: invoice.value,
            timestamp: invoice.creationDate,
            expiry: invoice.expiry,
            description: invoice.memo,
            descriptionHash: uint8ArrayToHex(invoice.descriptionHash),
            fallbackAddr: invoice.fallbackAddr,
            cltvExpiry: invoice.cltvExpiry,
            routeHints: invoice.routeHints,
            paymentAddr: invoice.paymentAddr,
            numMsat: invoice.valueMsat,
            features: invoice.features,
            blindedPaths: [],
          })
        )
      );
    }
  },

  listPayments: async (_data) => {
    throw new Error("listPayments Not Implemented");
  },

  deletePayment: async (_data) => {
    throw new Error("deletePayment Not Implemented");
  },

  deleteAllPayments: async (_data) => {
    throw new Error("deleteAllPayments Not Implemented");
  },

  describeGraph: async (_data) => {
    throw new Error("describeGraph Not Implemented");
  },

  getNodeMetrics: async (_data) => {
    throw new Error("getNodeMetrics Not Implemented");
  },

  getChanInfo: async (_data) => {
    throw new Error("getChanInfo Not Implemented");
  },

  getNodeInfo: async (_data) => {
    const request = fromBinary(NodeInfoRequestSchema, base64Decode(_data));

    return base64Encode(
      toBinary(
        NodeInfoSchema,
        create(NodeInfoSchema, {
          node: {
            addresses: [],
            alias: "Node alias",
            color: "#ff0000",
            features: {},
            pubKey: request.pubKey || "abcdef",
            lastUpdate: 0,
          },
          numChannels: 0,
          totalCapacity: BigInt(0),
          channels: [],
        })
      )
    );
  },

  queryRoutes: async (_data) => {
    throw new Error("queryRoutes Not Implemented");
  },

  getNetworkInfo: async (_data) => {
    throw new Error("getNetworkInfo Not Implemented");
  },

  stopDaemon: async (_data) => {
    throw new Error("stopDaemon Not Implemented");
  },

  subscribeChannelGraph: (_data, _onResponse, _onError) => {
    throw new Error("subscribeChannelGraph Not Implemented");
  },

  debugLevel: async (_data) => {
    throw new Error("debugLevel Not Implemented");
  },

  feeReport: async (_data) => {
    throw new Error("feeReport Not Implemented");
  },

  updateChannelPolicy: async (_data) => {
    throw new Error("updateChannelPolicy Not Implemented");
  },

  forwardingHistory: async (_data) => {
    throw new Error("forwardingHistory Not Implemented");
  },

  exportChannelBackup: async (_data) => {
    throw new Error("exportChannelBackup Not Implemented");
  },

  exportAllChannelBackups: async (_data) => {
    throw new Error("exportAllChannelBackups Not Implemented");
  },

  verifyChanBackup: async (_data) => {
    throw new Error("verifyChanBackup Not Implemented");
  },

  restoreChannelBackups: async (_data) => {
    throw new Error("restoreChannelBackups Not Implemented");
  },

  subscribeChannelBackups: (_data, _onResponse, _onError) => {
    throw new Error("subscribeChannelBackups Not Implemented");
  },

  bakeMacaroon: async (_data) => {
    throw new Error("bakeMacaroon Not Implemented");
  },

  listMacaroonIDs: async (_data) => {
    throw new Error("listMacaroonIDs Not Implemented");
  },

  deleteMacaroonID: async (_data) => {
    throw new Error("deleteMacaroonID Not Implemented");
  },

  listPermissions: async (_data) => {
    throw new Error("listPermissions Not Implemented");
  },

  checkMacaroonPermissions: async (_data) => {
    throw new Error("checkMacaroonPermissions Not Implemented");
  },

  registerRPCMiddleware: (_onResponse, _onError) => {
    throw new Error("registerRPCMiddleware Not Implemented");
  },

  sendCustomMessage: async (_data) => {
    throw new Error("sendCustomMessage Not Implemented");
  },

  subscribeCustomMessages: (_data, _onResponse, _onError) => {
    fromBinary(SubscribeCustomMessagesRequestSchema, base64Decode(_data));

    return () => {};
  },

  listAliases: async (_data) => {
    throw new Error("listAliases Not Implemented");
  },

  lookupHtlcResolution: async (_data) => {
    throw new Error("lookupHtlcResolution Not Implemented");
  },

  genSeed: async (_data) => {
    fromBinary(GenSeedRequestSchema, base64Decode(_data));

    return base64Encode(
      toBinary(
        GenSeedResponseSchema,
        create(GenSeedResponseSchema, {
          cipherSeedMnemonic: [
            "ability",
            "quote",
            "laugh",
            "pony",
            "fancy",
            "disease",
            "zoo",
            "angle",
            "autumn",
            "december",
            "absorb",
            "giraffe",
            "mandate",
            "inner",
            "alone",
            "flat",
            "dose",
            "acoustic",
            "slice",
            "major",
            "sample",
            "crane",
            "opinion",
            "jewel",
          ],
          encipheredSeed: new Uint8Array([
            0, 54, 1, 246, 83, 245, 46, 126, 63, 248, 70, 15, 167, 20, 3, 49,
            24, 112, 232, 193, 186, 196, 65, 128, 67, 45, 195, 59, 240, 100,
            166, 219, 191,
          ]),
        })
      )
    );
  },

  changePassword: async (_data) => {
    throw new Error("changePassword Not Implemented");
  },

  getState: async (_data) => {
    return base64Encode(
      toBinary(
        GetStateResponseSchema,
        create(GetStateResponseSchema, {
          state: currentState,
        })
      )
    );
  },

  autopilotStatus: async (_data) => {
    throw new Error("autopilotStatus Not Implemented");
  },

  autopilotModifyStatus: async (_data) => {
    throw new Error("autopilotModifyStatus Not Implemented");
  },

  autopilotQueryScores: async (_data) => {
    throw new Error("autopilotQueryScores Not Implemented");
  },

  autopilotSetScores: async (_data) => {
    throw new Error("autopilotSetScores Not Implemented");
  },

  chainNotifierRegisterConfirmationsNtfn: (_data, _onResponse, _onError) => {
    throw new Error("chainNotifierRegisterConfirmationsNtfn Not Implemented");
  },

  chainNotifierRegisterSpendNtfn: (_data, _onResponse, _onError) => {
    throw new Error("chainNotifierRegisterSpendNtfn Not Implemented");
  },

  chainNotifierRegisterBlockEpochNtfn: (_data, _onResponse, _onError) => {
    throw new Error("chainNotifierRegisterBlockEpochNtfn Not Implemented");
  },

  invoicesSubscribeSingleInvoice: (_data, _onResponse, _onError) => {
    throw new Error("invoicesSubscribeSingleInvoice Not Implemented");
  },

  invoicesCancelInvoice: async (_data) => {
    throw new Error("invoicesCancelInvoice Not Implemented");
  },

  invoicesAddHoldInvoice: async (_data) => {
    throw new Error("invoicesAddHoldInvoice Not Implemented");
  },

  invoicesSettleInvoice: async (_data) => {
    throw new Error("invoicesSettleInvoice Not Implemented");
  },

  invoicesLookupInvoiceV2: async (_data) => {
    throw new Error("invoicesLookupInvoiceV2 Not Implemented");
  },

  neutrinoKitStatus: async (_data) => {
    throw new Error("neutrinoKitStatus Not Implemented");
  },

  neutrinoKitAddPeer: async (_data) => {
    throw new Error("neutrinoKitAddPeer Not Implemented");
  },

  neutrinoKitDisconnectPeer: async (_data) => {
    throw new Error("neutrinoKitDisconnectPeer Not Implemented");
  },

  neutrinoKitIsBanned: async (_data) => {
    throw new Error("neutrinoKitIsBanned Not Implemented");
  },

  neutrinoKitGetBlockHeader: async (_data) => {
    throw new Error("neutrinoKitGetBlockHeader Not Implemented");
  },

  neutrinoKitGetBlock: async (_data) => {
    throw new Error("neutrinoKitGetBlock Not Implemented");
  },

  neutrinoKitGetCFilter: async (_data) => {
    throw new Error("neutrinoKitGetCFilter Not Implemented");
  },

  neutrinoKitGetBlockHash: async (_data) => {
    throw new Error("neutrinoKitGetBlockHash Not Implemented");
  },

  peersUpdateNodeAnnouncement: async (_data) => {
    throw new Error("peersUpdateNodeAnnouncement Not Implemented");
  },

  routerSendPaymentV2: (_data, _onResponse, _onError) => {
    throw new Error("routerSendPaymentV2 Not Implemented");
  },

  routerTrackPaymentV2: (_data, _onResponse, _onError) => {
    throw new Error("routerTrackPaymentV2 Not Implemented");
  },

  routerTrackPayments: (_data, _onResponse, _onError) => {
    throw new Error("routerTrackPayments Not Implemented");
  },

  routerEstimateRouteFee: async (_data) => {
    throw new Error("routerEstimateRouteFee Not Implemented");
  },

  routerSendToRoute: async (_data) => {
    throw new Error("routerSendToRoute Not Implemented");
  },

  routerSendToRouteV2: async (_data) => {
    throw new Error("routerSendToRouteV2 Not Implemented");
  },

  routerResetMissionControl: async (_data) => {
    throw new Error("routerResetMissionControl Not Implemented");
  },

  routerQueryMissionControl: async (_data) => {
    throw new Error("routerQueryMissionControl Not Implemented");
  },

  routerXImportMissionControl: async (_data) => {
    throw new Error("routerXImportMissionControl Not Implemented");
  },

  routerGetMissionControlConfig: async (_data) => {
    throw new Error("routerGetMissionControlConfig Not Implemented");
  },

  routerSetMissionControlConfig: async (_data) => {
    throw new Error("routerSetMissionControlConfig Not Implemented");
  },

  routerQueryProbability: async (_data) => {
    throw new Error("routerQueryProbability Not Implemented");
  },

  routerBuildRoute: async (_data) => {
    throw new Error("routerBuildRoute Not Implemented");
  },

  routerSubscribeHtlcEvents: (_data, _onResponse, _onError) => {
    throw new Error("routerSubscribeHtlcEvents Not Implemented");
  },

  routerSendPayment: (_data, _onResponse, _onError) => {
    throw new Error("routerSendPayment Not Implemented");
  },

  routerTrackPayment: (_data, _onResponse, _onError) => {
    throw new Error("routerTrackPayment Not Implemented");
  },

  routerHtlcInterceptor: (_onResponse, _onError) => {
    throw new Error("routerHtlcInterceptor Not Implemented");
  },

  routerUpdateChanStatus: async (_data) => {
    throw new Error("routerUpdateChanStatus Not Implemented");
  },

  signerSignOutputRaw: async (_data) => {
    throw new Error("signerSignOutputRaw Not Implemented");
  },

  signerComputeInputScript: async (_data) => {
    throw new Error("signerComputeInputScript Not Implemented");
  },

  signerSignMessage: async (_data) => {
    throw new Error("signerSignMessage Not Implemented");
  },

  signerVerifyMessage: async (_data) => {
    throw new Error("signerVerifyMessage Not Implemented");
  },

  signerDeriveSharedKey: async (_data) => {
    throw new Error("signerDeriveSharedKey Not Implemented");
  },

  signerMuSig2CombineKeys: async (_data) => {
    throw new Error("signerMuSig2CombineKeys Not Implemented");
  },

  signerMuSig2CreateSession: async (_data) => {
    throw new Error("signerMuSig2CreateSession Not Implemented");
  },

  signerMuSig2RegisterNonces: async (_data) => {
    throw new Error("signerMuSig2RegisterNonces Not Implemented");
  },

  signerMuSig2Sign: async (_data) => {
    throw new Error("signerMuSig2Sign Not Implemented");
  },

  signerMuSig2CombineSig: async (_data) => {
    throw new Error("signerMuSig2CombineSig Not Implemented");
  },

  signerMuSig2Cleanup: async (_data) => {
    throw new Error("signerMuSig2Cleanup Not Implemented");
  },

  versionerGetVersion: async (_data) => {
    throw new Error("versionerGetVersion Not Implemented");
  },

  walletKitListUnspent: async (_data) => {
    throw new Error("walletKitListUnspent Not Implemented");
  },

  walletKitLeaseOutput: async (_data) => {
    throw new Error("walletKitLeaseOutput Not Implemented");
  },

  walletKitReleaseOutput: async (_data) => {
    throw new Error("walletKitReleaseOutput Not Implemented");
  },

  walletKitListLeases: async (_data) => {
    throw new Error("walletKitListLeases Not Implemented");
  },

  walletKitDeriveNextKey: async (_data) => {
    throw new Error("walletKitDeriveNextKey Not Implemented");
  },

  walletKitDeriveKey: async (_data) => {
    throw new Error("walletKitDeriveKey Not Implemented");
  },

  walletKitNextAddr: async (_data) => {
    throw new Error("walletKitNextAddr Not Implemented");
  },

  walletKitListAccounts: async (_data) => {
    throw new Error("walletKitListAccounts Not Implemented");
  },

  walletKitRequiredReserve: async (_data) => {
    throw new Error("walletKitRequiredReserve Not Implemented");
  },

  walletKitListAddresses: async (_data) => {
    throw new Error("walletKitListAddresses Not Implemented");
  },

  walletKitSignMessageWithAddr: async (_data) => {
    throw new Error("walletKitSignMessageWithAddr Not Implemented");
  },

  walletKitVerifyMessageWithAddr: async (_data) => {
    throw new Error("walletKitVerifyMessageWithAddr Not Implemented");
  },

  walletKitImportAccount: async (_data) => {
    throw new Error("walletKitImportAccount Not Implemented");
  },

  walletKitImportPublicKey: async (_data) => {
    throw new Error("walletKitImportPublicKey Not Implemented");
  },

  walletKitImportTapscript: async (_data) => {
    throw new Error("walletKitImportTapscript Not Implemented");
  },

  walletKitPublishTransaction: async (_data) => {
    throw new Error("walletKitPublishTransaction Not Implemented");
  },

  walletKitSendOutputs: async (_data) => {
    throw new Error("walletKitSendOutputs Not Implemented");
  },

  walletKitEstimateFee: async (_data) => {
    throw new Error("walletKitEstimateFee Not Implemented");
  },

  walletKitPendingSweeps: async (_data) => {
    throw new Error("walletKitPendingSweeps Not Implemented");
  },

  walletKitBumpFee: async (_data) => {
    throw new Error("walletKitBumpFee Not Implemented");
  },

  walletKitListSweeps: async (_data) => {
    throw new Error("walletKitListSweeps Not Implemented");
  },

  walletKitLabelTransaction: async (_data) => {
    throw new Error("walletKitLabelTransaction Not Implemented");
  },

  walletKitFundPsbt: async (_data) => {
    throw new Error("walletKitFundPsbt Not Implemented");
  },

  walletKitSignPsbt: async (_data) => {
    throw new Error("walletKitSignPsbt Not Implemented");
  },

  walletKitFinalizePsbt: async (_data) => {
    throw new Error("walletKitFinalizePsbt Not Implemented");
  },

  watchtowerGetInfo: async (_data) => {
    throw new Error("watchtowerGetInfo Not Implemented");
  },

  watchtowerClientAddTower: async (_data) => {
    throw new Error("watchtowerClientAddTower Not Implemented");
  },

  watchtowerClientRemoveTower: async (_data) => {
    throw new Error("watchtowerClientRemoveTower Not Implemented");
  },

  watchtowerClientListTowers: async (_data) => {
    throw new Error("watchtowerClientListTowers Not Implemented");
  },

  watchtowerClientGetTowerInfo: async (_data) => {
    throw new Error("watchtowerClientGetTowerInfo Not Implemented");
  },

  watchtowerClientStats: async (_data) => {
    throw new Error("watchtowerClientStats Not Implemented");
  },

  watchtowerClientPolicy: async (_data) => {
    throw new Error("watchtowerClientPolicy Not Implemented");
  },

  getDebugInfo: async (_data: any) => {
    throw new Error("getDebugInfo Not Implemented");
  },

  invoicesHtlcModifier: (
    _: OnResponseCallback,
    _2: OnErrorCallback
  ): WriteableStream => {
    throw new Error("invoicesHtlcModifier Not Implemented");
  },

  routerXAddLocalChanAliases: async (_data: any) => {
    throw new Error("routerXAddLocalChanAliases Not Implemented");
  },

  routerXDeleteLocalChanAliases: async (_data: any) => {
    throw new Error("routerXDeleteLocalChanAliases Not Implemented");
  },

  routerXFindBaseLocalChanAlias: async (_data) => {
    const request = fromBinary(FindBaseAliasRequestSchema, base64Decode(_data));

    return base64Encode(
      toBinary(
        FindBaseAliasResponseSchema,
        create(FindBaseAliasResponseSchema, {
          base: request.alias,
        })
      )
    );
  },

  walletKitGetTransaction: async (_data) => {
    throw new Error("walletKitGetTransaction Not Implemented");
  },

  walletKitRemoveTransaction: async (_data) => {
    throw new Error("walletKitRemoveTransaction Not Implemented");
  },

  watchtowerClientDeactivateTower: async (_data) => {
    throw new Error("watchtowerClientDeactivateTower Not Implemented");
  },

  walletKitBumpForceCloseFee: async (_data) => {
    fromBinary(BumpForceCloseFeeRequestSchema, base64Decode(_data));

    return base64Encode(
      toBinary(
        BumpForceCloseFeeResponseSchema,
        create(BumpForceCloseFeeResponseSchema, {
          status: "queued",
        })
      )
    );
  },

  watchtowerClientTerminateSession: async (_data) => {
    throw new Error("watchtowerClientTerminateSession Not Implemented");
  },
};

export default TurboLnd;
