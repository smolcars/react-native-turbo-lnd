"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abandonChannel = abandonChannel;
exports.addInvoice = addInvoice;
exports.autopilotModifyStatus = autopilotModifyStatus;
exports.autopilotQueryScores = autopilotQueryScores;
exports.autopilotSetScores = autopilotSetScores;
exports.autopilotStatus = autopilotStatus;
exports.bakeMacaroon = bakeMacaroon;
exports.batchOpenChannel = batchOpenChannel;
exports.chainNotifierRegisterBlockEpochNtfn = chainNotifierRegisterBlockEpochNtfn;
exports.chainNotifierRegisterConfirmationsNtfn = chainNotifierRegisterConfirmationsNtfn;
exports.chainNotifierRegisterSpendNtfn = chainNotifierRegisterSpendNtfn;
exports.changePassword = changePassword;
exports.channelAcceptor = channelAcceptor;
exports.channelBalance = channelBalance;
exports.checkMacaroonPermissions = checkMacaroonPermissions;
exports.closeChannel = closeChannel;
exports.closedChannels = closedChannels;
exports.connectPeer = connectPeer;
exports.debugLevel = debugLevel;
exports.decodePayReq = decodePayReq;
exports.deleteAllPayments = deleteAllPayments;
exports.deleteMacaroonID = deleteMacaroonID;
exports.deletePayment = deletePayment;
exports.describeGraph = describeGraph;
exports.disconnectPeer = disconnectPeer;
exports.estimateFee = estimateFee;
exports.exportAllChannelBackups = exportAllChannelBackups;
exports.exportChannelBackup = exportChannelBackup;
exports.feeReport = feeReport;
exports.forwardingHistory = forwardingHistory;
exports.fundingStateStep = fundingStateStep;
exports.genSeed = genSeed;
exports.getChanInfo = getChanInfo;
exports.getInfo = getInfo;
exports.getNetworkInfo = getNetworkInfo;
exports.getNodeInfo = getNodeInfo;
exports.getNodeMetrics = getNodeMetrics;
exports.getRecoveryInfo = getRecoveryInfo;
exports.getState = getState;
exports.getTransactions = getTransactions;
exports.initWallet = initWallet;
exports.invoicesAddHoldInvoice = invoicesAddHoldInvoice;
exports.invoicesCancelInvoice = invoicesCancelInvoice;
exports.invoicesLookupInvoiceV2 = invoicesLookupInvoiceV2;
exports.invoicesSettleInvoice = invoicesSettleInvoice;
exports.invoicesSubscribeSingleInvoice = invoicesSubscribeSingleInvoice;
exports.listAliases = listAliases;
exports.listChannels = listChannels;
exports.listInvoices = listInvoices;
exports.listMacaroonIDs = listMacaroonIDs;
exports.listPayments = listPayments;
exports.listPeers = listPeers;
exports.listPermissions = listPermissions;
exports.listUnspent = listUnspent;
exports.lookupHtlcResolution = lookupHtlcResolution;
exports.lookupInvoice = lookupInvoice;
exports.neutrinoKitAddPeer = neutrinoKitAddPeer;
exports.neutrinoKitDisconnectPeer = neutrinoKitDisconnectPeer;
exports.neutrinoKitGetBlock = neutrinoKitGetBlock;
exports.neutrinoKitGetBlockHash = neutrinoKitGetBlockHash;
exports.neutrinoKitGetBlockHeader = neutrinoKitGetBlockHeader;
exports.neutrinoKitGetCFilter = neutrinoKitGetCFilter;
exports.neutrinoKitIsBanned = neutrinoKitIsBanned;
exports.neutrinoKitStatus = neutrinoKitStatus;
exports.newAddress = newAddress;
exports.openChannel = openChannel;
exports.openChannelSync = openChannelSync;
exports.peersUpdateNodeAnnouncement = peersUpdateNodeAnnouncement;
exports.pendingChannels = pendingChannels;
exports.queryRoutes = queryRoutes;
exports.registerRPCMiddleware = registerRPCMiddleware;
exports.restoreChannelBackups = restoreChannelBackups;
exports.routerBuildRoute = routerBuildRoute;
exports.routerEstimateRouteFee = routerEstimateRouteFee;
exports.routerGetMissionControlConfig = routerGetMissionControlConfig;
exports.routerHtlcInterceptor = routerHtlcInterceptor;
exports.routerQueryMissionControl = routerQueryMissionControl;
exports.routerQueryProbability = routerQueryProbability;
exports.routerResetMissionControl = routerResetMissionControl;
exports.routerSendPayment = routerSendPayment;
exports.routerSendPaymentV2 = routerSendPaymentV2;
exports.routerSendToRoute = routerSendToRoute;
exports.routerSendToRouteV2 = routerSendToRouteV2;
exports.routerSetMissionControlConfig = routerSetMissionControlConfig;
exports.routerSubscribeHtlcEvents = routerSubscribeHtlcEvents;
exports.routerTrackPayment = routerTrackPayment;
exports.routerTrackPaymentV2 = routerTrackPaymentV2;
exports.routerTrackPayments = routerTrackPayments;
exports.routerUpdateChanStatus = routerUpdateChanStatus;
exports.routerXImportMissionControl = routerXImportMissionControl;
exports.sendCoins = sendCoins;
exports.sendCustomMessage = sendCustomMessage;
exports.sendMany = sendMany;
exports.sendPayment = sendPayment;
exports.sendPaymentSync = sendPaymentSync;
exports.sendToRoute = sendToRoute;
exports.sendToRouteSync = sendToRouteSync;
exports.signMessage = signMessage;
exports.signerComputeInputScript = signerComputeInputScript;
exports.signerDeriveSharedKey = signerDeriveSharedKey;
exports.signerMuSig2Cleanup = signerMuSig2Cleanup;
exports.signerMuSig2CombineKeys = signerMuSig2CombineKeys;
exports.signerMuSig2CombineSig = signerMuSig2CombineSig;
exports.signerMuSig2CreateSession = signerMuSig2CreateSession;
exports.signerMuSig2RegisterNonces = signerMuSig2RegisterNonces;
exports.signerMuSig2Sign = signerMuSig2Sign;
exports.signerSignMessage = signerSignMessage;
exports.signerSignOutputRaw = signerSignOutputRaw;
exports.signerVerifyMessage = signerVerifyMessage;
exports.start = void 0;
exports.stopDaemon = stopDaemon;
exports.subscribeChannelBackups = subscribeChannelBackups;
exports.subscribeChannelEvents = subscribeChannelEvents;
exports.subscribeChannelGraph = subscribeChannelGraph;
exports.subscribeCustomMessages = subscribeCustomMessages;
exports.subscribeInvoices = subscribeInvoices;
exports.subscribePeerEvents = subscribePeerEvents;
exports.subscribeState = subscribeState;
exports.subscribeTransactions = subscribeTransactions;
exports.unlockWallet = unlockWallet;
exports.updateChannelPolicy = updateChannelPolicy;
exports.verifyChanBackup = verifyChanBackup;
exports.verifyMessage = verifyMessage;
exports.versionerGetVersion = versionerGetVersion;
exports.walletBalance = walletBalance;
exports.walletKitBumpFee = walletKitBumpFee;
exports.walletKitDeriveKey = walletKitDeriveKey;
exports.walletKitDeriveNextKey = walletKitDeriveNextKey;
exports.walletKitEstimateFee = walletKitEstimateFee;
exports.walletKitFinalizePsbt = walletKitFinalizePsbt;
exports.walletKitFundPsbt = walletKitFundPsbt;
exports.walletKitImportAccount = walletKitImportAccount;
exports.walletKitImportPublicKey = walletKitImportPublicKey;
exports.walletKitImportTapscript = walletKitImportTapscript;
exports.walletKitLabelTransaction = walletKitLabelTransaction;
exports.walletKitLeaseOutput = walletKitLeaseOutput;
exports.walletKitListAccounts = walletKitListAccounts;
exports.walletKitListAddresses = walletKitListAddresses;
exports.walletKitListLeases = walletKitListLeases;
exports.walletKitListSweeps = walletKitListSweeps;
exports.walletKitListUnspent = walletKitListUnspent;
exports.walletKitNextAddr = walletKitNextAddr;
exports.walletKitPendingSweeps = walletKitPendingSweeps;
exports.walletKitPublishTransaction = walletKitPublishTransaction;
exports.walletKitReleaseOutput = walletKitReleaseOutput;
exports.walletKitRequiredReserve = walletKitRequiredReserve;
exports.walletKitSendOutputs = walletKitSendOutputs;
exports.walletKitSignMessageWithAddr = walletKitSignMessageWithAddr;
exports.walletKitSignPsbt = walletKitSignPsbt;
exports.walletKitVerifyMessageWithAddr = walletKitVerifyMessageWithAddr;
exports.watchtowerClientAddTower = watchtowerClientAddTower;
exports.watchtowerClientGetTowerInfo = watchtowerClientGetTowerInfo;
exports.watchtowerClientListTowers = watchtowerClientListTowers;
exports.watchtowerClientPolicy = watchtowerClientPolicy;
exports.watchtowerClientRemoveTower = watchtowerClientRemoveTower;
exports.watchtowerClientStats = watchtowerClientStats;
exports.watchtowerGetInfo = watchtowerGetInfo;
require("./setup-text-encoding.js");
var _protobuf = require("@bufbuild/protobuf");
var _wire = require("@bufbuild/protobuf/wire");
var lnrpc = _interopRequireWildcard(require("./proto/lightning_pb.js"));
var autopilotrpc = _interopRequireWildcard(require("./proto/autopilotrpc/autopilot_pb.js"));
var chainrpc = _interopRequireWildcard(require("./proto/chainrpc/chainnotifier_pb.js"));
var invoicesrpc = _interopRequireWildcard(require("./proto/invoicesrpc/invoices_pb.js"));
var neutrinorpc = _interopRequireWildcard(require("./proto/neutrinorpc/neutrino_pb.js"));
var peersrpc = _interopRequireWildcard(require("./proto/peersrpc/peers_pb.js"));
var routerrpc = _interopRequireWildcard(require("./proto/routerrpc/router_pb.js"));
var signrpc = _interopRequireWildcard(require("./proto/signrpc/signer_pb.js"));
var verrpc = _interopRequireWildcard(require("./proto/verrpc/verrpc_pb.js"));
var walletrpc = _interopRequireWildcard(require("./proto/walletrpc/walletkit_pb.js"));
var watchtowerrpc = _interopRequireWildcard(require("./proto/watchtowerrpc/watchtower_pb.js"));
var wtclientrpc = _interopRequireWildcard(require("./proto/wtclientrpc/wtclient_pb.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
// Note to react-native-turbo-lnd contributors:
// This file is automatically generated by the protoc plugin inside the
// protoc-generator folder.
// Any changes to this file should be made there instead.
/* eslint-disable */

let TurboLnd;
if (globalThis["fakelnd"] || typeof jest !== 'undefined') {
  TurboLnd = require('./mocks/index').default;
} else {
  TurboLnd = require('./core/NativeTurboLnd').default;
}

// import * as walletunlocker from "./proto/walletunlocker_pb";
// import * as state from "./proto/stateservice_pb";

// import * as chainrpc from "./proto/chainrpc/chainkit_pb";

// import * as dev from "./proto/devrpc/dev_pb";

// import * as versionresponse from "./proto/lnclipb/lncli_pb";

/**
 *
 * Starts up lnd.
 * You need to provide path to the app's local dir to lnd via `--lnddir` arg.
 * Use `subscribeState` to know when lnd is ready for wallet unlock/creation.
 *
 */
const start = exports.start = TurboLnd.start;

/**
   *
   * WalletBalance returns total unspent outputs(confirmed and unconfirmed), all
   * confirmed unspent outputs and all unconfirmed unspent outputs under control
   * of the wallet.
   *
   * @param [WalletBalanceRequest]
   * @returns [WalletBalanceResponse]
   *
   */
async function walletBalance(request) {
  const message = (0, _protobuf.create)(lnrpc.WalletBalanceRequestSchema, request);
  const b64 = await TurboLnd.walletBalance((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.WalletBalanceRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.WalletBalanceResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ChannelBalance returns a report on the total funds across all open channels,
   * categorized in local/remote, pending local/remote and unsettled local/remote
   * balances.
   *
   * @param [ChannelBalanceRequest]
   * @returns [ChannelBalanceResponse]
   *
   */
async function channelBalance(request) {
  const message = (0, _protobuf.create)(lnrpc.ChannelBalanceRequestSchema, request);
  const b64 = await TurboLnd.channelBalance((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ChannelBalanceRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ChannelBalanceResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetTransactions returns a list describing all the known transactions
   * relevant to the wallet.
   *
   * @param [GetTransactionsRequest]
   * @returns [TransactionDetails]
   *
   */
async function getTransactions(request) {
  const message = (0, _protobuf.create)(lnrpc.GetTransactionsRequestSchema, request);
  const b64 = await TurboLnd.getTransactions((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.GetTransactionsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.TransactionDetailsSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * EstimateFee attempts to query the internal fee estimator of the wallet to
   * determine the fee (in sat/kw) to attach to a transaction in order to
   * achieve the confirmation target.
   *
   * @param [EstimateFeeRequest]
   * @returns [EstimateFeeResponse]
   *
   */
async function estimateFee(request) {
  const message = (0, _protobuf.create)(lnrpc.EstimateFeeRequestSchema, request);
  const b64 = await TurboLnd.estimateFee((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.EstimateFeeRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.EstimateFeeResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SendCoins executes a request to send coins to a particular address. Unlike
   * SendMany, this RPC call only allows creating a single output at a time. If
   * neither target_conf, or sat_per_vbyte are set, then the internal wallet will
   * consult its fee model to determine a fee for the default confirmation
   * target.
   *
   * @param [SendCoinsRequest]
   * @returns [SendCoinsResponse]
   *
   */
async function sendCoins(request) {
  const message = (0, _protobuf.create)(lnrpc.SendCoinsRequestSchema, request);
  const b64 = await TurboLnd.sendCoins((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.SendCoinsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.SendCoinsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListUnspent returns a list of all utxos spendable by the wallet with a
   * number of confirmations between the specified minimum and maximum. By
   * default, all utxos are listed. To list only the unconfirmed utxos, set
   * the unconfirmed_only to true.
   *
   * @param [ListUnspentRequest]
   * @returns [ListUnspentResponse]
   *
   */
async function listUnspent(request) {
  const message = (0, _protobuf.create)(lnrpc.ListUnspentRequestSchema, request);
  const b64 = await TurboLnd.listUnspent((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ListUnspentRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ListUnspentResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SubscribeTransactions creates a uni-directional stream from the server to
   * the client in which any newly discovered transactions relevant to the
   * wallet are sent over.
   *
   * @param [GetTransactionsRequest]
   * @returns [Transaction]
   *
   */
function subscribeTransactions(request, onResponse, onError) {
  const message = (0, _protobuf.create)(lnrpc.GetTransactionsRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.GetTransactionsRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.TransactionSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.subscribeTransactions(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * SendMany handles a request for a transaction that creates multiple specified
   * outputs in parallel. If neither target_conf, or sat_per_vbyte are set, then
   * the internal wallet will consult its fee model to determine a fee for the
   * default confirmation target.
   *
   * @param [SendManyRequest]
   * @returns [SendManyResponse]
   *
   */
async function sendMany(request) {
  const message = (0, _protobuf.create)(lnrpc.SendManyRequestSchema, request);
  const b64 = await TurboLnd.sendMany((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.SendManyRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.SendManyResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * NewAddress creates a new address under control of the local wallet.
   *
   * @param [NewAddressRequest]
   * @returns [NewAddressResponse]
   *
   */
async function newAddress(request) {
  const message = (0, _protobuf.create)(lnrpc.NewAddressRequestSchema, request);
  const b64 = await TurboLnd.newAddress((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.NewAddressRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.NewAddressResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SignMessage signs a message with the key specified in the key locator. The
   * returned signature is fixed-size LN wire format encoded.
   *
   * The main difference to SignMessage in the main RPC is that a specific key is
   * used to sign the message instead of the node identity private key.
   *
   * @param [SignMessageRequest]
   * @returns [SignMessageResponse]
   *
   */
async function signMessage(request) {
  const message = (0, _protobuf.create)(lnrpc.SignMessageRequestSchema, request);
  const b64 = await TurboLnd.signMessage((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.SignMessageRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.SignMessageResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * VerifyMessage verifies a signature over a message using the public key
   * provided. The signature must be fixed-size LN wire format encoded.
   *
   * The main difference to VerifyMessage in the main RPC is that the public key
   * used to sign the message does not have to be a node known to the network.
   *
   * @param [VerifyMessageRequest]
   * @returns [VerifyMessageResponse]
   *
   */
async function verifyMessage(request) {
  const message = (0, _protobuf.create)(lnrpc.VerifyMessageRequestSchema, request);
  const b64 = await TurboLnd.verifyMessage((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.VerifyMessageRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.VerifyMessageResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ConnectPeer attempts to establish a connection to a remote peer. This is at
   * the networking level, and is used for communication between nodes. This is
   * distinct from establishing a channel with a peer.
   *
   * @param [ConnectPeerRequest]
   * @returns [ConnectPeerResponse]
   *
   */
async function connectPeer(request) {
  const message = (0, _protobuf.create)(lnrpc.ConnectPeerRequestSchema, request);
  const b64 = await TurboLnd.connectPeer((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ConnectPeerRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ConnectPeerResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * DisconnectPeer disconnects a peer by target address. Both outbound and
   * inbound nodes will be searched for the target node. An error message will
   * be returned if the peer was not found.
   *
   * @param [DisconnectPeerRequest]
   * @returns [DisconnectPeerResponse]
   *
   */
async function disconnectPeer(request) {
  const message = (0, _protobuf.create)(lnrpc.DisconnectPeerRequestSchema, request);
  const b64 = await TurboLnd.disconnectPeer((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.DisconnectPeerRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.DisconnectPeerResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListPeers returns a verbose listing of all currently active peers.
   *
   * @param [ListPeersRequest]
   * @returns [ListPeersResponse]
   *
   */
async function listPeers(request) {
  const message = (0, _protobuf.create)(lnrpc.ListPeersRequestSchema, request);
  const b64 = await TurboLnd.listPeers((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ListPeersRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ListPeersResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SubscribePeerEvents creates a uni-directional stream from the server to
   * the client in which any events relevant to the state of peers are sent
   * over. Events include peers going online and offline.
   *
   * @param [PeerEventSubscription]
   * @returns [PeerEvent]
   *
   */
function subscribePeerEvents(request, onResponse, onError) {
  const message = (0, _protobuf.create)(lnrpc.PeerEventSubscriptionSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.PeerEventSubscriptionSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.PeerEventSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.subscribePeerEvents(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * GetInfo returns general information concerning the companion watchtower
   * including its public key and URIs where the server is currently
   * listening for clients.
   *
   * @param [GetInfoRequest]
   * @returns [GetInfoResponse]
   *
   */
async function getInfo(request) {
  const message = (0, _protobuf.create)(lnrpc.GetInfoRequestSchema, request);
  const b64 = await TurboLnd.getInfo((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.GetInfoRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.GetInfoResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetRecoveryInfo returns information concerning the recovery mode including
   * whether it's in a recovery mode, whether the recovery is finished, and the
   * progress made so far.
   *
   * @param [GetRecoveryInfoRequest]
   * @returns [GetRecoveryInfoResponse]
   *
   */
async function getRecoveryInfo(request) {
  const message = (0, _protobuf.create)(lnrpc.GetRecoveryInfoRequestSchema, request);
  const b64 = await TurboLnd.getRecoveryInfo((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.GetRecoveryInfoRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.GetRecoveryInfoResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * PendingChannels returns a list of all the channels that are currently
   * considered "pending". A channel is pending if it has finished the funding
   * workflow and is waiting for confirmations for the funding txn, or is in the
   * process of closure, either initiated cooperatively or non-cooperatively.
   *
   * @param [PendingChannelsRequest]
   * @returns [PendingChannelsResponse]
   *
   */
async function pendingChannels(request) {
  const message = (0, _protobuf.create)(lnrpc.PendingChannelsRequestSchema, request);
  const b64 = await TurboLnd.pendingChannels((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.PendingChannelsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.PendingChannelsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListChannels returns a description of all the open channels that this node
   * is a participant in.
   *
   * @param [ListChannelsRequest]
   * @returns [ListChannelsResponse]
   *
   */
async function listChannels(request) {
  const message = (0, _protobuf.create)(lnrpc.ListChannelsRequestSchema, request);
  const b64 = await TurboLnd.listChannels((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ListChannelsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ListChannelsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SubscribeChannelEvents creates a uni-directional stream from the server to
   * the client in which any updates relevant to the state of the channels are
   * sent over. Events include new active channels, inactive channels, and closed
   * channels.
   *
   * @param [ChannelEventSubscription]
   * @returns [ChannelEventUpdate]
   *
   */
function subscribeChannelEvents(request, onResponse, onError) {
  const message = (0, _protobuf.create)(lnrpc.ChannelEventSubscriptionSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ChannelEventSubscriptionSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.ChannelEventUpdateSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.subscribeChannelEvents(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * ClosedChannels returns a description of all the closed channels that
   * this node was a participant in.
   *
   * @param [ClosedChannelsRequest]
   * @returns [ClosedChannelsResponse]
   *
   */
async function closedChannels(request) {
  const message = (0, _protobuf.create)(lnrpc.ClosedChannelsRequestSchema, request);
  const b64 = await TurboLnd.closedChannels((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ClosedChannelsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ClosedChannelsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * OpenChannelSync is a synchronous version of the OpenChannel RPC call. This
   * call is meant to be consumed by clients to the REST proxy. As with all
   * other sync calls, all byte slices are intended to be populated as hex
   * encoded strings.
   *
   * @param [OpenChannelRequest]
   * @returns [ChannelPoint]
   *
   */
async function openChannelSync(request) {
  const message = (0, _protobuf.create)(lnrpc.OpenChannelRequestSchema, request);
  const b64 = await TurboLnd.openChannelSync((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.OpenChannelRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ChannelPointSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * OpenChannel attempts to open a singly funded channel specified in the
   * request to a remote peer. Users are able to specify a target number of
   * blocks that the funding transaction should be confirmed in, or a manual fee
   * rate to us for the funding transaction. If neither are specified, then a
   * lax block confirmation target is used. Each OpenStatusUpdate will return
   * the pending channel ID of the in-progress channel. Depending on the
   * arguments specified in the OpenChannelRequest, this pending channel ID can
   * then be used to manually progress the channel funding flow.
   *
   * @param [OpenChannelRequest]
   * @returns [OpenStatusUpdate]
   *
   */
function openChannel(request, onResponse, onError) {
  const message = (0, _protobuf.create)(lnrpc.OpenChannelRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.OpenChannelRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.OpenStatusUpdateSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.openChannel(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * BatchOpenChannel attempts to open multiple single-funded channels in a
   * single transaction in an atomic way. This means either all channel open
   * requests succeed at once or all attempts are aborted if any of them fail.
   * This is the safer variant of using PSBTs to manually fund a batch of
   * channels through the OpenChannel RPC.
   *
   * @param [BatchOpenChannelRequest]
   * @returns [BatchOpenChannelResponse]
   *
   */
async function batchOpenChannel(request) {
  const message = (0, _protobuf.create)(lnrpc.BatchOpenChannelRequestSchema, request);
  const b64 = await TurboLnd.batchOpenChannel((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.BatchOpenChannelRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.BatchOpenChannelResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * FundingStateStep is an advanced funding related call that allows the caller
   * to either execute some preparatory steps for a funding workflow, or
   * manually progress a funding workflow. The primary way a funding flow is
   * identified is via its pending channel ID. As an example, this method can be
   * used to specify that we're expecting a funding flow for a particular
   * pending channel ID, for which we need to use specific parameters.
   * Alternatively, this can be used to interactively drive PSBT signing for
   * funding for partially complete funding transactions.
   *
   * @param [FundingTransitionMsg]
   * @returns [FundingStateStepResp]
   *
   */
async function fundingStateStep(request) {
  const message = (0, _protobuf.create)(lnrpc.FundingTransitionMsgSchema, request);
  const b64 = await TurboLnd.fundingStateStep((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.FundingTransitionMsgSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.FundingStateStepRespSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ChannelAcceptor dispatches a bi-directional streaming RPC in which
   * OpenChannel requests are sent to the client and the client responds with
   * a boolean that tells LND whether or not to accept the channel. This allows
   * node operators to specify their own criteria for accepting inbound channels
   * through a single persistent connection.
   *
   * @param [ChannelAcceptResponse]
   * @returns [ChannelAcceptRequest]
   *
   */
function channelAcceptor(onResponse, onError) {
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.ChannelAcceptRequestSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  const writeableStream = TurboLnd.channelAcceptor(onResponseWrapper, onErrorWrapper);
  return {
    send: response => {
      const message = (0, _protobuf.create)(lnrpc.ChannelAcceptResponseSchema, response);
      const responseB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ChannelAcceptResponseSchema, message));
      writeableStream.send(responseB64);
    },
    close: () => {
      writeableStream.stop();
    }
  };
}

/**
   *
   * CloseChannel attempts to close an active channel identified by its channel
   * outpoint (ChannelPoint). The actions of this method can additionally be
   * augmented to attempt a force close after a timeout period in the case of an
   * inactive peer. If a non-force close (cooperative closure) is requested,
   * then the user can specify either a target number of blocks until the
   * closure transaction is confirmed, or a manual fee rate. If neither are
   * specified, then a default lax, block confirmation target is used.
   *
   * @param [CloseChannelRequest]
   * @returns [CloseStatusUpdate]
   *
   */
function closeChannel(request, onResponse, onError) {
  const message = (0, _protobuf.create)(lnrpc.CloseChannelRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.CloseChannelRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.CloseStatusUpdateSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.closeChannel(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * AbandonChannel removes all channel state from the database except for a
   * close summary. This method can be used to get rid of permanently unusable
   * channels due to bugs fixed in newer versions of lnd. This method can also be
   * used to remove externally funded channels where the funding transaction was
   * never broadcast. Only available for non-externally funded channels in dev
   * build.
   *
   * @param [AbandonChannelRequest]
   * @returns [AbandonChannelResponse]
   *
   */
async function abandonChannel(request) {
  const message = (0, _protobuf.create)(lnrpc.AbandonChannelRequestSchema, request);
  const b64 = await TurboLnd.abandonChannel((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.AbandonChannelRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.AbandonChannelResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * Deprecated, use SendPaymentV2. SendPayment attempts to route a payment
   * described by the passed PaymentRequest to the final destination. The call
   * returns a stream of payment status updates.
   *
   * @param [SendRequest]
   * @returns [SendResponse]
   *
   */
function sendPayment(onResponse, onError) {
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.SendResponseSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  const writeableStream = TurboLnd.sendPayment(onResponseWrapper, onErrorWrapper);
  return {
    send: response => {
      const message = (0, _protobuf.create)(lnrpc.SendRequestSchema, response);
      const responseB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.SendRequestSchema, message));
      writeableStream.send(responseB64);
    },
    close: () => {
      writeableStream.stop();
    }
  };
}

/**
   *
   * SendPaymentSync is the synchronous non-streaming version of SendPayment.
   * This RPC is intended to be consumed by clients of the REST proxy.
   * Additionally, this RPC expects the destination's public key and the payment
   * hash (if any) to be encoded as hex strings.
   *
   * @param [SendRequest]
   * @returns [SendResponse]
   *
   */
async function sendPaymentSync(request) {
  const message = (0, _protobuf.create)(lnrpc.SendRequestSchema, request);
  const b64 = await TurboLnd.sendPaymentSync((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.SendRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.SendResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * Deprecated, use SendToRouteV2. SendToRoute attempts to make a payment via
   * the specified route. This method differs from SendPayment in that it
   * allows users to specify a full route manually. This can be used for
   * things like rebalancing, and atomic swaps. It differs from the newer
   * SendToRouteV2 in that it doesn't return the full HTLC information.
   *
   * @param [SendToRouteRequest]
   * @returns [SendResponse]
   *
   */
function sendToRoute(onResponse, onError) {
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.SendResponseSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  const writeableStream = TurboLnd.sendToRoute(onResponseWrapper, onErrorWrapper);
  return {
    send: response => {
      const message = (0, _protobuf.create)(lnrpc.SendToRouteRequestSchema, response);
      const responseB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.SendToRouteRequestSchema, message));
      writeableStream.send(responseB64);
    },
    close: () => {
      writeableStream.stop();
    }
  };
}

/**
   *
   * SendToRouteSync is a synchronous version of SendToRoute. It Will block
   * until the payment either fails or succeeds.
   *
   * @param [SendToRouteRequest]
   * @returns [SendResponse]
   *
   */
async function sendToRouteSync(request) {
  const message = (0, _protobuf.create)(lnrpc.SendToRouteRequestSchema, request);
  const b64 = await TurboLnd.sendToRouteSync((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.SendToRouteRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.SendResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * AddInvoice attempts to add a new invoice to the invoice database. Any
   * duplicated invoices are rejected, therefore all invoices *must* have a
   * unique payment preimage.
   *
   * @param [Invoice]
   * @returns [AddInvoiceResponse]
   *
   */
async function addInvoice(request) {
  const message = (0, _protobuf.create)(lnrpc.InvoiceSchema, request);
  const b64 = await TurboLnd.addInvoice((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.InvoiceSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.AddInvoiceResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListInvoices returns a list of all the invoices currently stored within the
   * database. Any active debug invoices are ignored. It has full support for
   * paginated responses, allowing users to query for specific invoices through
   * their add_index. This can be done by using either the first_index_offset or
   * last_index_offset fields included in the response as the index_offset of the
   * next request. By default, the first 100 invoices created will be returned.
   * Backwards pagination is also supported through the Reversed flag.
   *
   * @param [ListInvoiceRequest]
   * @returns [ListInvoiceResponse]
   *
   */
async function listInvoices(request) {
  const message = (0, _protobuf.create)(lnrpc.ListInvoiceRequestSchema, request);
  const b64 = await TurboLnd.listInvoices((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ListInvoiceRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ListInvoiceResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * LookupInvoice attempts to look up an invoice according to its payment hash.
   * The passed payment hash *must* be exactly 32 bytes, if not, an error is
   * returned.
   *
   * @param [PaymentHash]
   * @returns [Invoice]
   *
   */
async function lookupInvoice(request) {
  const message = (0, _protobuf.create)(lnrpc.PaymentHashSchema, request);
  const b64 = await TurboLnd.lookupInvoice((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.PaymentHashSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.InvoiceSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SubscribeInvoices returns a uni-directional stream (server -> client) for
   * notifying the client of newly added/settled invoices. The caller can
   * optionally specify the add_index and/or the settle_index. If the add_index
   * is specified, then we'll first start by sending add invoice events for all
   * invoices with an add_index greater than the specified value. If the
   * settle_index is specified, the next, we'll send out all settle events for
   * invoices with a settle_index greater than the specified value. One or both
   * of these fields can be set. If no fields are set, then we'll only send out
   * the latest add/settle events.
   *
   * @param [InvoiceSubscription]
   * @returns [Invoice]
   *
   */
function subscribeInvoices(request, onResponse, onError) {
  const message = (0, _protobuf.create)(lnrpc.InvoiceSubscriptionSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.InvoiceSubscriptionSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.InvoiceSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.subscribeInvoices(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * DecodePayReq takes an encoded payment request string and attempts to decode
   * it, returning a full description of the conditions encoded within the
   * payment request.
   *
   * @param [PayReqString]
   * @returns [PayReq]
   *
   */
async function decodePayReq(request) {
  const message = (0, _protobuf.create)(lnrpc.PayReqStringSchema, request);
  const b64 = await TurboLnd.decodePayReq((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.PayReqStringSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.PayReqSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListPayments returns a list of all outgoing payments.
   *
   * @param [ListPaymentsRequest]
   * @returns [ListPaymentsResponse]
   *
   */
async function listPayments(request) {
  const message = (0, _protobuf.create)(lnrpc.ListPaymentsRequestSchema, request);
  const b64 = await TurboLnd.listPayments((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ListPaymentsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ListPaymentsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * DeletePayment deletes an outgoing payment from DB. Note that it will not
   * attempt to delete an In-Flight payment, since that would be unsafe.
   *
   * @param [DeletePaymentRequest]
   * @returns [DeletePaymentResponse]
   *
   */
async function deletePayment(request) {
  const message = (0, _protobuf.create)(lnrpc.DeletePaymentRequestSchema, request);
  const b64 = await TurboLnd.deletePayment((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.DeletePaymentRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.DeletePaymentResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * DeleteAllPayments deletes all outgoing payments from DB. Note that it will
   * not attempt to delete In-Flight payments, since that would be unsafe.
   *
   * @param [DeleteAllPaymentsRequest]
   * @returns [DeleteAllPaymentsResponse]
   *
   */
async function deleteAllPayments(request) {
  const message = (0, _protobuf.create)(lnrpc.DeleteAllPaymentsRequestSchema, request);
  const b64 = await TurboLnd.deleteAllPayments((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.DeleteAllPaymentsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.DeleteAllPaymentsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * DescribeGraph returns a description of the latest graph state from the
   * point of view of the node. The graph information is partitioned into two
   * components: all the nodes/vertexes, and all the edges that connect the
   * vertexes themselves. As this is a directed graph, the edges also contain
   * the node directional specific routing policy which includes: the time lock
   * delta, fee information, etc.
   *
   * @param [ChannelGraphRequest]
   * @returns [ChannelGraph]
   *
   */
async function describeGraph(request) {
  const message = (0, _protobuf.create)(lnrpc.ChannelGraphRequestSchema, request);
  const b64 = await TurboLnd.describeGraph((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ChannelGraphRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ChannelGraphSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetNodeMetrics returns node metrics calculated from the graph. Currently
   * the only supported metric is betweenness centrality of individual nodes.
   *
   * @param [NodeMetricsRequest]
   * @returns [NodeMetricsResponse]
   *
   */
async function getNodeMetrics(request) {
  const message = (0, _protobuf.create)(lnrpc.NodeMetricsRequestSchema, request);
  const b64 = await TurboLnd.getNodeMetrics((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.NodeMetricsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.NodeMetricsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetChanInfo returns the latest authenticated network announcement for the
   * given channel identified by its channel ID: an 8-byte integer which
   * uniquely identifies the location of transaction's funding output within the
   * blockchain.
   *
   * @param [ChanInfoRequest]
   * @returns [ChannelEdge]
   *
   */
async function getChanInfo(request) {
  const message = (0, _protobuf.create)(lnrpc.ChanInfoRequestSchema, request);
  const b64 = await TurboLnd.getChanInfo((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ChanInfoRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ChannelEdgeSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetNodeInfo returns the latest advertised, aggregated, and authenticated
   * channel information for the specified node identified by its public key.
   *
   * @param [NodeInfoRequest]
   * @returns [NodeInfo]
   *
   */
async function getNodeInfo(request) {
  const message = (0, _protobuf.create)(lnrpc.NodeInfoRequestSchema, request);
  const b64 = await TurboLnd.getNodeInfo((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.NodeInfoRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.NodeInfoSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * QueryRoutes attempts to query the daemon's Channel Router for a possible
   * route to a target destination capable of carrying a specific amount of
   * satoshis. The returned route contains the full details required to craft and
   * send an HTLC, also including the necessary information that should be
   * present within the Sphinx packet encapsulated within the HTLC.
   *
   * When using REST, the `dest_custom_records` map type can be set by appending
   * `&dest_custom_records[<record_number>]=<record_data_base64_url_encoded>`
   * to the URL. Unfortunately this map type doesn't appear in the REST API
   * documentation because of a bug in the grpc-gateway library.
   *
   * @param [QueryRoutesRequest]
   * @returns [QueryRoutesResponse]
   *
   */
async function queryRoutes(request) {
  const message = (0, _protobuf.create)(lnrpc.QueryRoutesRequestSchema, request);
  const b64 = await TurboLnd.queryRoutes((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.QueryRoutesRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.QueryRoutesResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetNetworkInfo returns some basic stats about the known channel graph from
   * the point of view of the node.
   *
   * @param [NetworkInfoRequest]
   * @returns [NetworkInfo]
   *
   */
async function getNetworkInfo(request) {
  const message = (0, _protobuf.create)(lnrpc.NetworkInfoRequestSchema, request);
  const b64 = await TurboLnd.getNetworkInfo((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.NetworkInfoRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.NetworkInfoSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * StopDaemon will send a shutdown request to the interrupt handler, triggering
   * a graceful shutdown of the daemon.
   *
   * @param [StopRequest]
   * @returns [StopResponse]
   *
   */
async function stopDaemon(request) {
  const message = (0, _protobuf.create)(lnrpc.StopRequestSchema, request);
  const b64 = await TurboLnd.stopDaemon((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.StopRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.StopResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SubscribeChannelGraph launches a streaming RPC that allows the caller to
   * receive notifications upon any changes to the channel graph topology from
   * the point of view of the responding node. Events notified include: new
   * nodes coming online, nodes updating their authenticated attributes, new
   * channels being advertised, updates in the routing policy for a directional
   * channel edge, and when channels are closed on-chain.
   *
   * @param [GraphTopologySubscription]
   * @returns [GraphTopologyUpdate]
   *
   */
function subscribeChannelGraph(request, onResponse, onError) {
  const message = (0, _protobuf.create)(lnrpc.GraphTopologySubscriptionSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.GraphTopologySubscriptionSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.GraphTopologyUpdateSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.subscribeChannelGraph(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * DebugLevel allows a caller to programmatically set the logging verbosity of
   * lnd. The logging can be targeted according to a coarse daemon-wide logging
   * level, or in a granular fashion to specify the logging for a target
   * sub-system.
   *
   * @param [DebugLevelRequest]
   * @returns [DebugLevelResponse]
   *
   */
async function debugLevel(request) {
  const message = (0, _protobuf.create)(lnrpc.DebugLevelRequestSchema, request);
  const b64 = await TurboLnd.debugLevel((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.DebugLevelRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.DebugLevelResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * FeeReport allows the caller to obtain a report detailing the current fee
   * schedule enforced by the node globally for each channel.
   *
   * @param [FeeReportRequest]
   * @returns [FeeReportResponse]
   *
   */
async function feeReport(request) {
  const message = (0, _protobuf.create)(lnrpc.FeeReportRequestSchema, request);
  const b64 = await TurboLnd.feeReport((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.FeeReportRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.FeeReportResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * UpdateChannelPolicy allows the caller to update the fee schedule and
   * channel policies for all channels globally, or a particular channel.
   *
   * @param [PolicyUpdateRequest]
   * @returns [PolicyUpdateResponse]
   *
   */
async function updateChannelPolicy(request) {
  const message = (0, _protobuf.create)(lnrpc.PolicyUpdateRequestSchema, request);
  const b64 = await TurboLnd.updateChannelPolicy((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.PolicyUpdateRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.PolicyUpdateResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ForwardingHistory allows the caller to query the htlcswitch for a record of
   * all HTLCs forwarded within the target time range, and integer offset
   * within that time range, for a maximum number of events. If no maximum number
   * of events is specified, up to 100 events will be returned. If no time-range
   * is specified, then events will be returned in the order that they occured.
   *
   * A list of forwarding events are returned. The size of each forwarding event
   * is 40 bytes, and the max message size able to be returned in gRPC is 4 MiB.
   * As a result each message can only contain 50k entries. Each response has
   * the index offset of the last entry. The index offset can be provided to the
   * request to allow the caller to skip a series of records.
   *
   * @param [ForwardingHistoryRequest]
   * @returns [ForwardingHistoryResponse]
   *
   */
async function forwardingHistory(request) {
  const message = (0, _protobuf.create)(lnrpc.ForwardingHistoryRequestSchema, request);
  const b64 = await TurboLnd.forwardingHistory((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ForwardingHistoryRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ForwardingHistoryResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ExportChannelBackup attempts to return an encrypted static channel backup
   * for the target channel identified by it channel point. The backup is
   * encrypted with a key generated from the aezeed seed of the user. The
   * returned backup can either be restored using the RestoreChannelBackup
   * method once lnd is running, or via the InitWallet and UnlockWallet methods
   * from the WalletUnlocker service.
   *
   * @param [ExportChannelBackupRequest]
   * @returns [ChannelBackup]
   *
   */
async function exportChannelBackup(request) {
  const message = (0, _protobuf.create)(lnrpc.ExportChannelBackupRequestSchema, request);
  const b64 = await TurboLnd.exportChannelBackup((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ExportChannelBackupRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ChannelBackupSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ExportAllChannelBackups returns static channel backups for all existing
   * channels known to lnd. A set of regular singular static channel backups for
   * each channel are returned. Additionally, a multi-channel backup is returned
   * as well, which contains a single encrypted blob containing the backups of
   * each channel.
   *
   * @param [ChanBackupExportRequest]
   * @returns [ChanBackupSnapshot]
   *
   */
async function exportAllChannelBackups(request) {
  const message = (0, _protobuf.create)(lnrpc.ChanBackupExportRequestSchema, request);
  const b64 = await TurboLnd.exportAllChannelBackups((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ChanBackupExportRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ChanBackupSnapshotSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * VerifyChanBackup allows a caller to verify the integrity of a channel backup
   * snapshot. This method will accept either a packed Single or a packed Multi.
   * Specifying both will result in an error.
   *
   * @param [ChanBackupSnapshot]
   * @returns [VerifyChanBackupResponse]
   *
   */
async function verifyChanBackup(request) {
  const message = (0, _protobuf.create)(lnrpc.ChanBackupSnapshotSchema, request);
  const b64 = await TurboLnd.verifyChanBackup((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ChanBackupSnapshotSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.VerifyChanBackupResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * RestoreChannelBackups accepts a set of singular channel backups, or a
   * single encrypted multi-chan backup and attempts to recover any funds
   * remaining within the channel. If we are able to unpack the backup, then the
   * new channel will be shown under listchannels, as well as pending channels.
   *
   * @param [RestoreChanBackupRequest]
   * @returns [RestoreBackupResponse]
   *
   */
async function restoreChannelBackups(request) {
  const message = (0, _protobuf.create)(lnrpc.RestoreChanBackupRequestSchema, request);
  const b64 = await TurboLnd.restoreChannelBackups((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.RestoreChanBackupRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.RestoreBackupResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SubscribeChannelBackups allows a client to sub-subscribe to the most up to
   * date information concerning the state of all channel backups. Each time a
   * new channel is added, we return the new set of channels, along with a
   * multi-chan backup containing the backup info for all channels. Each time a
   * channel is closed, we send a new update, which contains new new chan back
   * ups, but the updated set of encrypted multi-chan backups with the closed
   * channel(s) removed.
   *
   * @param [ChannelBackupSubscription]
   * @returns [ChanBackupSnapshot]
   *
   */
function subscribeChannelBackups(request, onResponse, onError) {
  const message = (0, _protobuf.create)(lnrpc.ChannelBackupSubscriptionSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ChannelBackupSubscriptionSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.ChanBackupSnapshotSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.subscribeChannelBackups(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * BakeMacaroon allows the creation of a new macaroon with custom read and
   * write permissions. No first-party caveats are added since this can be done
   * offline.
   *
   * @param [BakeMacaroonRequest]
   * @returns [BakeMacaroonResponse]
   *
   */
async function bakeMacaroon(request) {
  const message = (0, _protobuf.create)(lnrpc.BakeMacaroonRequestSchema, request);
  const b64 = await TurboLnd.bakeMacaroon((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.BakeMacaroonRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.BakeMacaroonResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListMacaroonIDs returns all root key IDs that are in use.
   *
   * @param [ListMacaroonIDsRequest]
   * @returns [ListMacaroonIDsResponse]
   *
   */
async function listMacaroonIDs(request) {
  const message = (0, _protobuf.create)(lnrpc.ListMacaroonIDsRequestSchema, request);
  const b64 = await TurboLnd.listMacaroonIDs((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ListMacaroonIDsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ListMacaroonIDsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * DeleteMacaroonID deletes the specified macaroon ID and invalidates all
   * macaroons derived from that ID.
   *
   * @param [DeleteMacaroonIDRequest]
   * @returns [DeleteMacaroonIDResponse]
   *
   */
async function deleteMacaroonID(request) {
  const message = (0, _protobuf.create)(lnrpc.DeleteMacaroonIDRequestSchema, request);
  const b64 = await TurboLnd.deleteMacaroonID((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.DeleteMacaroonIDRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.DeleteMacaroonIDResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListPermissions lists all RPC method URIs and their required macaroon
   * permissions to access them.
   *
   * @param [ListPermissionsRequest]
   * @returns [ListPermissionsResponse]
   *
   */
async function listPermissions(request) {
  const message = (0, _protobuf.create)(lnrpc.ListPermissionsRequestSchema, request);
  const b64 = await TurboLnd.listPermissions((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ListPermissionsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ListPermissionsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * CheckMacaroonPermissions checks whether a request follows the constraints
   * imposed on the macaroon and that the macaroon is authorized to follow the
   * provided permissions.
   *
   * @param [CheckMacPermRequest]
   * @returns [CheckMacPermResponse]
   *
   */
async function checkMacaroonPermissions(request) {
  const message = (0, _protobuf.create)(lnrpc.CheckMacPermRequestSchema, request);
  const b64 = await TurboLnd.checkMacaroonPermissions((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.CheckMacPermRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.CheckMacPermResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * RegisterRPCMiddleware adds a new gRPC middleware to the interceptor chain. A
   * gRPC middleware is software component external to lnd that aims to add
   * additional business logic to lnd by observing/intercepting/validating
   * incoming gRPC client requests and (if needed) replacing/overwriting outgoing
   * messages before they're sent to the client. When registering the middleware
   * must identify itself and indicate what custom macaroon caveats it wants to
   * be responsible for. Only requests that contain a macaroon with that specific
   * custom caveat are then sent to the middleware for inspection. The other
   * option is to register for the read-only mode in which all requests/responses
   * are forwarded for interception to the middleware but the middleware is not
   * allowed to modify any responses. As a security measure, _no_ middleware can
   * modify responses for requests made with _unencumbered_ macaroons!
   *
   * @param [RPCMiddlewareResponse]
   * @returns [RPCMiddlewareRequest]
   *
   */
function registerRPCMiddleware(onResponse, onError) {
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.RPCMiddlewareRequestSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  const writeableStream = TurboLnd.registerRPCMiddleware(onResponseWrapper, onErrorWrapper);
  return {
    send: response => {
      const message = (0, _protobuf.create)(lnrpc.RPCMiddlewareResponseSchema, response);
      const responseB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.RPCMiddlewareResponseSchema, message));
      writeableStream.send(responseB64);
    },
    close: () => {
      writeableStream.stop();
    }
  };
}

/**
   *
   * SendCustomMessage sends a custom peer message.
   *
   * @param [SendCustomMessageRequest]
   * @returns [SendCustomMessageResponse]
   *
   */
async function sendCustomMessage(request) {
  const message = (0, _protobuf.create)(lnrpc.SendCustomMessageRequestSchema, request);
  const b64 = await TurboLnd.sendCustomMessage((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.SendCustomMessageRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.SendCustomMessageResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SubscribeCustomMessages subscribes to a stream of incoming custom peer
   * messages.
   *
   * To include messages with type outside of the custom range (>= 32768) lnd
   * needs to be compiled with  the `dev` build tag, and the message type to
   * override should be specified in lnd's experimental protocol configuration.
   *
   * @param [SubscribeCustomMessagesRequest]
   * @returns [CustomMessage]
   *
   */
function subscribeCustomMessages(request, onResponse, onError) {
  const message = (0, _protobuf.create)(lnrpc.SubscribeCustomMessagesRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.SubscribeCustomMessagesRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.CustomMessageSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.subscribeCustomMessages(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * ListAliases returns the set of all aliases that have ever existed with
   * their confirmed SCID (if it exists) and/or the base SCID (in the case of
   * zero conf).
   *
   * @param [ListAliasesRequest]
   * @returns [ListAliasesResponse]
   *
   */
async function listAliases(request) {
  const message = (0, _protobuf.create)(lnrpc.ListAliasesRequestSchema, request);
  const b64 = await TurboLnd.listAliases((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ListAliasesRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ListAliasesResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * If the replace_response field is set to true, this field must contain the
   * binary serialized gRPC message in the protobuf format.
   *
   * @param [LookupHtlcResolutionRequest]
   * @returns [LookupHtlcResolutionResponse]
   *
   */
async function lookupHtlcResolution(request) {
  const message = (0, _protobuf.create)(lnrpc.LookupHtlcResolutionRequestSchema, request);
  const b64 = await TurboLnd.lookupHtlcResolution((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.LookupHtlcResolutionRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.LookupHtlcResolutionResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GenSeed is the first method that should be used to instantiate a new lnd
   * instance. This method allows a caller to generate a new aezeed cipher seed
   * given an optional passphrase. If provided, the passphrase will be necessary
   * to decrypt the cipherseed to expose the internal wallet seed.
   *
   * Once the cipherseed is obtained and verified by the user, the InitWallet
   * method should be used to commit the newly generated seed, and create the
   * wallet.
   *
   * @param [GenSeedRequest]
   * @returns [GenSeedResponse]
   *
   */
async function genSeed(request) {
  const message = (0, _protobuf.create)(lnrpc.GenSeedRequestSchema, request);
  const b64 = await TurboLnd.genSeed((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.GenSeedRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.GenSeedResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * InitWallet is used when lnd is starting up for the first time to fully
   * initialize the daemon and its internal wallet. At the very least a wallet
   * password must be provided. This will be used to encrypt sensitive material
   * on disk.
   *
   * In the case of a recovery scenario, the user can also specify their aezeed
   * mnemonic and passphrase. If set, then the daemon will use this prior state
   * to initialize its internal wallet.
   *
   * Alternatively, this can be used along with the GenSeed RPC to obtain a
   * seed, then present it to the user. Once it has been verified by the user,
   * the seed can be fed into this RPC in order to commit the new wallet.
   *
   * @param [InitWalletRequest]
   * @returns [InitWalletResponse]
   *
   */
async function initWallet(request) {
  const message = (0, _protobuf.create)(lnrpc.InitWalletRequestSchema, request);
  const b64 = await TurboLnd.initWallet((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.InitWalletRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.InitWalletResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * UnlockWallet is used at startup of lnd to provide a password to unlock
   * the wallet database.
   *
   * @param [UnlockWalletRequest]
   * @returns [UnlockWalletResponse]
   *
   */
async function unlockWallet(request) {
  const message = (0, _protobuf.create)(lnrpc.UnlockWalletRequestSchema, request);
  const b64 = await TurboLnd.unlockWallet((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.UnlockWalletRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.UnlockWalletResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * The binary serialized admin macaroon that can be used to access the daemon
   * after rotating the macaroon root key. If both the stateless_init and
   * new_macaroon_root_key parameter were set to true, this is the ONLY copy of
   * the macaroon that was created from the new root key and MUST be stored
   * safely by the caller. Otherwise a copy of this macaroon is also persisted on
   * disk by the daemon, together with other macaroon files.
   *
   * @param [ChangePasswordRequest]
   * @returns [ChangePasswordResponse]
   *
   */
async function changePassword(request) {
  const message = (0, _protobuf.create)(lnrpc.ChangePasswordRequestSchema, request);
  const b64 = await TurboLnd.changePassword((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.ChangePasswordRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.ChangePasswordResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * Comments in this file will be directly parsed into the API
   * Documentation as descriptions of the associated method, message, or field.
   * These descriptions should go right above the definition of the object, and
   * can be in either block or // comment format.
   *
   * An RPC method can be matched to an lncli command by placing a line in the
   * beginning of the description in exactly the following format:
   * lncli: `methodname`
   *
   * Failure to specify the exact name of the command will cause documentation
   * generation to fail.
   *
   * More information on how exactly the gRPC documentation is generated from
   * this proto file can be found here:
   * https://github.com/lightninglabs/lightning-api
   *
   * @param [SubscribeStateRequest]
   * @returns [SubscribeStateResponse]
   *
   */
function subscribeState(request, onResponse, onError) {
  const message = (0, _protobuf.create)(lnrpc.SubscribeStateRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.SubscribeStateRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.SubscribeStateResponseSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.subscribeState(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   *
   * @param [GetStateRequest]
   * @returns [GetStateResponse]
   */
async function getState(request) {
  const message = (0, _protobuf.create)(lnrpc.GetStateRequestSchema, request);
  const b64 = await TurboLnd.getState((0, _wire.base64Encode)((0, _protobuf.toBinary)(lnrpc.GetStateRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.GetStateResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * Status returns the status of the light client neutrino instance,
   * along with height and hash of the best block, and a list of connected
   * peers.
   *
   * @param [StatusRequest]
   * @returns [StatusResponse]
   *
   */
async function autopilotStatus(request) {
  const message = (0, _protobuf.create)(autopilotrpc.StatusRequestSchema, request);
  const b64 = await TurboLnd.autopilotStatus((0, _wire.base64Encode)((0, _protobuf.toBinary)(autopilotrpc.StatusRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(autopilotrpc.StatusResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ModifyStatus is used to modify the status of the autopilot agent, like
   * enabling or disabling it.
   *
   * @param [ModifyStatusRequest]
   * @returns [ModifyStatusResponse]
   *
   */
async function autopilotModifyStatus(request) {
  const message = (0, _protobuf.create)(autopilotrpc.ModifyStatusRequestSchema, request);
  const b64 = await TurboLnd.autopilotModifyStatus((0, _wire.base64Encode)((0, _protobuf.toBinary)(autopilotrpc.ModifyStatusRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(autopilotrpc.ModifyStatusResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * QueryScores queries all available autopilot heuristics, in addition to any
   * active combination of these heruristics, for the scores they would give to
   * the given nodes.
   *
   * @param [QueryScoresRequest]
   * @returns [QueryScoresResponse]
   *
   */
async function autopilotQueryScores(request) {
  const message = (0, _protobuf.create)(autopilotrpc.QueryScoresRequestSchema, request);
  const b64 = await TurboLnd.autopilotQueryScores((0, _wire.base64Encode)((0, _protobuf.toBinary)(autopilotrpc.QueryScoresRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(autopilotrpc.QueryScoresResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * A map from hex-encoded public keys to scores. Scores must be in the range
   * [0.0, 1.0].
   *
   * @param [SetScoresRequest]
   * @returns [SetScoresResponse]
   *
   */
async function autopilotSetScores(request) {
  const message = (0, _protobuf.create)(autopilotrpc.SetScoresRequestSchema, request);
  const b64 = await TurboLnd.autopilotSetScores((0, _wire.base64Encode)((0, _protobuf.toBinary)(autopilotrpc.SetScoresRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(autopilotrpc.SetScoresResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * RegisterConfirmationsNtfn is a synchronous response-streaming RPC that
   * registers an intent for a client to be notified once a confirmation request
   * has reached its required number of confirmations on-chain.
   *
   * A confirmation request must have a valid output script. It is also possible
   * to give a transaction ID. If the transaction ID is not set, a notification
   * is sent once the output script confirms. If the transaction ID is also set,
   * a notification is sent once the output script confirms in the given
   * transaction.
   *
   * @param [ConfRequest]
   * @returns [ConfEvent]
   *
   */
function chainNotifierRegisterConfirmationsNtfn(request, onResponse, onError) {
  const message = (0, _protobuf.create)(chainrpc.ConfRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(chainrpc.ConfRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(chainrpc.ConfEventSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.chainNotifierRegisterConfirmationsNtfn(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * RegisterSpendNtfn is a synchronous response-streaming RPC that registers an
   * intent for a client to be notification once a spend request has been spent
   * by a transaction that has confirmed on-chain.
   *
   * A client can specify whether the spend request should be for a particular
   * outpoint  or for an output script by specifying a zero outpoint.
   *
   * @param [SpendRequest]
   * @returns [SpendEvent]
   *
   */
function chainNotifierRegisterSpendNtfn(request, onResponse, onError) {
  const message = (0, _protobuf.create)(chainrpc.SpendRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(chainrpc.SpendRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(chainrpc.SpendEventSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.chainNotifierRegisterSpendNtfn(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * An event sent when the spending transaction of the request was
   * reorged out of the chain.
   *
   * @param [BlockEpoch]
   * @returns [BlockEpoch]
   *
   */
function chainNotifierRegisterBlockEpochNtfn(request, onResponse, onError) {
  const message = (0, _protobuf.create)(chainrpc.BlockEpochSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(chainrpc.BlockEpochSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(chainrpc.BlockEpochSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.chainNotifierRegisterBlockEpochNtfn(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * SubscribeSingleInvoice returns a uni-directional stream (server -> client)
   * to notify the client of state transitions of the specified invoice.
   * Initially the current invoice state is always sent out.
   *
   * @param [SubscribeSingleInvoiceRequest]
   * @returns [Invoice]
   *
   */
function invoicesSubscribeSingleInvoice(request, onResponse, onError) {
  const message = (0, _protobuf.create)(invoicesrpc.SubscribeSingleInvoiceRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(invoicesrpc.SubscribeSingleInvoiceRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.InvoiceSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.invoicesSubscribeSingleInvoice(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * CancelInvoice cancels a currently open invoice. If the invoice is already
   * canceled, this call will succeed. If the invoice is already settled, it will
   * fail.
   *
   * @param [CancelInvoiceMsg]
   * @returns [CancelInvoiceResp]
   *
   */
async function invoicesCancelInvoice(request) {
  const message = (0, _protobuf.create)(invoicesrpc.CancelInvoiceMsgSchema, request);
  const b64 = await TurboLnd.invoicesCancelInvoice((0, _wire.base64Encode)((0, _protobuf.toBinary)(invoicesrpc.CancelInvoiceMsgSchema, message)));
  const response = (0, _protobuf.fromBinary)(invoicesrpc.CancelInvoiceRespSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * AddHoldInvoice creates a hold invoice. It ties the invoice to the hash
   * supplied in the request.
   *
   * @param [AddHoldInvoiceRequest]
   * @returns [AddHoldInvoiceResp]
   *
   */
async function invoicesAddHoldInvoice(request) {
  const message = (0, _protobuf.create)(invoicesrpc.AddHoldInvoiceRequestSchema, request);
  const b64 = await TurboLnd.invoicesAddHoldInvoice((0, _wire.base64Encode)((0, _protobuf.toBinary)(invoicesrpc.AddHoldInvoiceRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(invoicesrpc.AddHoldInvoiceRespSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SettleInvoice settles an accepted invoice. If the invoice is already
   * settled, this call will succeed.
   *
   * @param [SettleInvoiceMsg]
   * @returns [SettleInvoiceResp]
   *
   */
async function invoicesSettleInvoice(request) {
  const message = (0, _protobuf.create)(invoicesrpc.SettleInvoiceMsgSchema, request);
  const b64 = await TurboLnd.invoicesSettleInvoice((0, _wire.base64Encode)((0, _protobuf.toBinary)(invoicesrpc.SettleInvoiceMsgSchema, message)));
  const response = (0, _protobuf.fromBinary)(invoicesrpc.SettleInvoiceRespSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * Indicates that when a look up is done using a payment_addr, then no HTLCs
   * related to the payment_addr should be returned. This is useful when one
   * wants to be able to obtain the set of associated setIDs with a given
   * invoice, then look up the sub-invoices "projected" by that set ID.
   *
   * @param [LookupInvoiceMsg]
   * @returns [Invoice]
   *
   */
async function invoicesLookupInvoiceV2(request) {
  const message = (0, _protobuf.create)(invoicesrpc.LookupInvoiceMsgSchema, request);
  const b64 = await TurboLnd.invoicesLookupInvoiceV2((0, _wire.base64Encode)((0, _protobuf.toBinary)(invoicesrpc.LookupInvoiceMsgSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.InvoiceSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * Status returns the status of the light client neutrino instance,
   * along with height and hash of the best block, and a list of connected
   * peers.
   *
   * @param [StatusRequest]
   * @returns [StatusResponse]
   *
   */
async function neutrinoKitStatus(request) {
  const message = (0, _protobuf.create)(neutrinorpc.StatusRequestSchema, request);
  const b64 = await TurboLnd.neutrinoKitStatus((0, _wire.base64Encode)((0, _protobuf.toBinary)(neutrinorpc.StatusRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(neutrinorpc.StatusResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * AddPeer adds a new peer that has already been connected to the server.
   *
   * @param [AddPeerRequest]
   * @returns [AddPeerResponse]
   *
   */
async function neutrinoKitAddPeer(request) {
  const message = (0, _protobuf.create)(neutrinorpc.AddPeerRequestSchema, request);
  const b64 = await TurboLnd.neutrinoKitAddPeer((0, _wire.base64Encode)((0, _protobuf.toBinary)(neutrinorpc.AddPeerRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(neutrinorpc.AddPeerResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * DisconnectPeer disconnects a peer by target address. Both outbound and
   * inbound nodes will be searched for the target node. An error message will
   * be returned if the peer was not found.
   *
   * @param [DisconnectPeerRequest]
   * @returns [DisconnectPeerResponse]
   *
   */
async function neutrinoKitDisconnectPeer(request) {
  const message = (0, _protobuf.create)(neutrinorpc.DisconnectPeerRequestSchema, request);
  const b64 = await TurboLnd.neutrinoKitDisconnectPeer((0, _wire.base64Encode)((0, _protobuf.toBinary)(neutrinorpc.DisconnectPeerRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(neutrinorpc.DisconnectPeerResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * IsBanned returns true if the peer is banned, otherwise false.
   *
   * @param [IsBannedRequest]
   * @returns [IsBannedResponse]
   *
   */
async function neutrinoKitIsBanned(request) {
  const message = (0, _protobuf.create)(neutrinorpc.IsBannedRequestSchema, request);
  const b64 = await TurboLnd.neutrinoKitIsBanned((0, _wire.base64Encode)((0, _protobuf.toBinary)(neutrinorpc.IsBannedRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(neutrinorpc.IsBannedResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetBlockHeader returns a block header with a particular block hash.
   *
   * @param [GetBlockHeaderRequest]
   * @returns [GetBlockHeaderResponse]
   *
   */
async function neutrinoKitGetBlockHeader(request) {
  const message = (0, _protobuf.create)(neutrinorpc.GetBlockHeaderRequestSchema, request);
  const b64 = await TurboLnd.neutrinoKitGetBlockHeader((0, _wire.base64Encode)((0, _protobuf.toBinary)(neutrinorpc.GetBlockHeaderRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(neutrinorpc.GetBlockHeaderResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetBlock returns a block with a particular block hash.
   *
   * @param [GetBlockRequest]
   * @returns [GetBlockResponse]
   *
   */
async function neutrinoKitGetBlock(request) {
  const message = (0, _protobuf.create)(neutrinorpc.GetBlockRequestSchema, request);
  const b64 = await TurboLnd.neutrinoKitGetBlock((0, _wire.base64Encode)((0, _protobuf.toBinary)(neutrinorpc.GetBlockRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(neutrinorpc.GetBlockResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetCFilter returns a compact filter from a block.
   *
   * @param [GetCFilterRequest]
   * @returns [GetCFilterResponse]
   *
   */
async function neutrinoKitGetCFilter(request) {
  const message = (0, _protobuf.create)(neutrinorpc.GetCFilterRequestSchema, request);
  const b64 = await TurboLnd.neutrinoKitGetCFilter((0, _wire.base64Encode)((0, _protobuf.toBinary)(neutrinorpc.GetCFilterRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(neutrinorpc.GetCFilterResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * Deprecated, use chainrpc.GetBlockHash instead.
   * GetBlockHash returns the header hash of a block at a given height.
   *
   * @param [GetBlockHashRequest]
   * @returns [GetBlockHashResponse]
   *
   */
async function neutrinoKitGetBlockHash(request) {
  const message = (0, _protobuf.create)(neutrinorpc.GetBlockHashRequestSchema, request);
  const b64 = await TurboLnd.neutrinoKitGetBlockHash((0, _wire.base64Encode)((0, _protobuf.toBinary)(neutrinorpc.GetBlockHashRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(neutrinorpc.GetBlockHashResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SET_INVOICE_AMP identifies the features that should be advertised on
   * AMP invoices generated by the daemon.
   *
   * @param [NodeAnnouncementUpdateRequest]
   * @returns [NodeAnnouncementUpdateResponse]
   *
   */
async function peersUpdateNodeAnnouncement(request) {
  const message = (0, _protobuf.create)(peersrpc.NodeAnnouncementUpdateRequestSchema, request);
  const b64 = await TurboLnd.peersUpdateNodeAnnouncement((0, _wire.base64Encode)((0, _protobuf.toBinary)(peersrpc.NodeAnnouncementUpdateRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(peersrpc.NodeAnnouncementUpdateResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SendPaymentV2 attempts to route a payment described by the passed
   * PaymentRequest to the final destination. The call returns a stream of
   * payment updates.
   *
   * @param [SendPaymentRequest]
   * @returns [Payment]
   *
   */
function routerSendPaymentV2(request, onResponse, onError) {
  const message = (0, _protobuf.create)(routerrpc.SendPaymentRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.SendPaymentRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.PaymentSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.routerSendPaymentV2(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * TrackPaymentV2 returns an update stream for the payment identified by the
   * payment hash.
   *
   * @param [TrackPaymentRequest]
   * @returns [Payment]
   *
   */
function routerTrackPaymentV2(request, onResponse, onError) {
  const message = (0, _protobuf.create)(routerrpc.TrackPaymentRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.TrackPaymentRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.PaymentSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.routerTrackPaymentV2(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * TrackPayments returns an update stream for every payment that is not in a
   * terminal state. Note that if payments are in-flight while starting a new
   * subscription, the start of the payment stream could produce out-of-order
   * and/or duplicate events. In order to get updates for every in-flight
   * payment attempt make sure to subscribe to this method before initiating any
   * payments.
   *
   * @param [TrackPaymentsRequest]
   * @returns [Payment]
   *
   */
function routerTrackPayments(request, onResponse, onError) {
  const message = (0, _protobuf.create)(routerrpc.TrackPaymentsRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.TrackPaymentsRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(lnrpc.PaymentSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.routerTrackPayments(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * EstimateRouteFee allows callers to obtain a lower bound w.r.t how much it
   * may cost to send an HTLC to the target end destination.
   *
   * @param [RouteFeeRequest]
   * @returns [RouteFeeResponse]
   *
   */
async function routerEstimateRouteFee(request) {
  const message = (0, _protobuf.create)(routerrpc.RouteFeeRequestSchema, request);
  const b64 = await TurboLnd.routerEstimateRouteFee((0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.RouteFeeRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(routerrpc.RouteFeeResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * Deprecated, use SendToRouteV2. SendToRoute attempts to make a payment via
   * the specified route. This method differs from SendPayment in that it
   * allows users to specify a full route manually. This can be used for
   * things like rebalancing, and atomic swaps. It differs from the newer
   * SendToRouteV2 in that it doesn't return the full HTLC information.
   *
   * @param [SendToRouteRequest]
   * @returns [SendToRouteResponse]
   *
   */
async function routerSendToRoute(request) {
  const message = (0, _protobuf.create)(routerrpc.SendToRouteRequestSchema, request);
  const b64 = await TurboLnd.routerSendToRoute((0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.SendToRouteRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(routerrpc.SendToRouteResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SendToRouteV2 attempts to make a payment via the specified route. This
   * method differs from SendPayment in that it allows users to specify a full
   * route manually. This can be used for things like rebalancing, and atomic
   * swaps.
   *
   * @param [SendToRouteRequest]
   * @returns [HTLCAttempt]
   *
   */
async function routerSendToRouteV2(request) {
  const message = (0, _protobuf.create)(routerrpc.SendToRouteRequestSchema, request);
  const b64 = await TurboLnd.routerSendToRouteV2((0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.SendToRouteRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(lnrpc.HTLCAttemptSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ResetMissionControl clears all mission control state and starts with a clean
   * slate.
   *
   * @param [ResetMissionControlRequest]
   * @returns [ResetMissionControlResponse]
   *
   */
async function routerResetMissionControl(request) {
  const message = (0, _protobuf.create)(routerrpc.ResetMissionControlRequestSchema, request);
  const b64 = await TurboLnd.routerResetMissionControl((0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.ResetMissionControlRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(routerrpc.ResetMissionControlResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * QueryMissionControl exposes the internal mission control state to callers.
   * It is a development feature.
   *
   * @param [QueryMissionControlRequest]
   * @returns [QueryMissionControlResponse]
   *
   */
async function routerQueryMissionControl(request) {
  const message = (0, _protobuf.create)(routerrpc.QueryMissionControlRequestSchema, request);
  const b64 = await TurboLnd.routerQueryMissionControl((0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.QueryMissionControlRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(routerrpc.QueryMissionControlResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * XImportMissionControl is an experimental API that imports the state provided
   * to the internal mission control's state, using all results which are more
   * recent than our existing values. These values will only be imported
   * in-memory, and will not be persisted across restarts.
   *
   * @param [XImportMissionControlRequest]
   * @returns [XImportMissionControlResponse]
   *
   */
async function routerXImportMissionControl(request) {
  const message = (0, _protobuf.create)(routerrpc.XImportMissionControlRequestSchema, request);
  const b64 = await TurboLnd.routerXImportMissionControl((0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.XImportMissionControlRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(routerrpc.XImportMissionControlResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetMissionControlConfig returns mission control's current config.
   *
   * @param [GetMissionControlConfigRequest]
   * @returns [GetMissionControlConfigResponse]
   *
   */
async function routerGetMissionControlConfig(request) {
  const message = (0, _protobuf.create)(routerrpc.GetMissionControlConfigRequestSchema, request);
  const b64 = await TurboLnd.routerGetMissionControlConfig((0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.GetMissionControlConfigRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(routerrpc.GetMissionControlConfigResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SetMissionControlConfig will set mission control's config, if the config
   * provided is valid.
   *
   * @param [SetMissionControlConfigRequest]
   * @returns [SetMissionControlConfigResponse]
   *
   */
async function routerSetMissionControlConfig(request) {
  const message = (0, _protobuf.create)(routerrpc.SetMissionControlConfigRequestSchema, request);
  const b64 = await TurboLnd.routerSetMissionControlConfig((0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.SetMissionControlConfigRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(routerrpc.SetMissionControlConfigResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * Deprecated. QueryProbability returns the current success probability
   * estimate for a given node pair and amount. The call returns a zero success
   * probability if no channel is available or if the amount violates min/max
   * HTLC constraints.
   *
   * @param [QueryProbabilityRequest]
   * @returns [QueryProbabilityResponse]
   *
   */
async function routerQueryProbability(request) {
  const message = (0, _protobuf.create)(routerrpc.QueryProbabilityRequestSchema, request);
  const b64 = await TurboLnd.routerQueryProbability((0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.QueryProbabilityRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(routerrpc.QueryProbabilityResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * BuildRoute builds a fully specified route based on a list of hop public
   * keys. It retrieves the relevant channel policies from the graph in order to
   * calculate the correct fees and time locks.
   *
   * @param [BuildRouteRequest]
   * @returns [BuildRouteResponse]
   *
   */
async function routerBuildRoute(request) {
  const message = (0, _protobuf.create)(routerrpc.BuildRouteRequestSchema, request);
  const b64 = await TurboLnd.routerBuildRoute((0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.BuildRouteRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(routerrpc.BuildRouteResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SubscribeHtlcEvents creates a uni-directional stream from the server to
   * the client which delivers a stream of htlc events.
   *
   * @param [SubscribeHtlcEventsRequest]
   * @returns [HtlcEvent]
   *
   */
function routerSubscribeHtlcEvents(request, onResponse, onError) {
  const message = (0, _protobuf.create)(routerrpc.SubscribeHtlcEventsRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.SubscribeHtlcEventsRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(routerrpc.HtlcEventSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.routerSubscribeHtlcEvents(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * Deprecated, use SendPaymentV2. SendPayment attempts to route a payment
   * described by the passed PaymentRequest to the final destination. The call
   * returns a stream of payment status updates.
   *
   * @param [SendPaymentRequest]
   * @returns [PaymentStatus]
   *
   */
function routerSendPayment(request, onResponse, onError) {
  const message = (0, _protobuf.create)(routerrpc.SendPaymentRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.SendPaymentRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(routerrpc.PaymentStatusSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.routerSendPayment(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * Deprecated, use TrackPaymentV2. TrackPayment returns an update stream for
   * the payment identified by the payment hash.
   *
   * @param [TrackPaymentRequest]
   * @returns [PaymentStatus]
   *
   */
function routerTrackPayment(request, onResponse, onError) {
  const message = (0, _protobuf.create)(routerrpc.TrackPaymentRequestSchema, request);
  const requestB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.TrackPaymentRequestSchema, message));
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(routerrpc.PaymentStatusSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  return TurboLnd.routerTrackPayment(requestB64, onResponseWrapper, onErrorWrapper);
}

/**
   *
   * HtlcInterceptor dispatches a bi-directional streaming RPC in which
   * Forwarded HTLC requests are sent to the client and the client responds with
   * a boolean that tells LND if this htlc should be intercepted.
   * In case of interception, the htlc can be either settled, cancelled or
   * resumed later by using the ResolveHoldForward endpoint.
   *
   * @param [ForwardHtlcInterceptResponse]
   * @returns [ForwardHtlcInterceptRequest]
   *
   */
function routerHtlcInterceptor(onResponse, onError) {
  const onResponseWrapper = responseB64 => {
    onResponse((0, _protobuf.fromBinary)(routerrpc.ForwardHtlcInterceptRequestSchema, (0, _wire.base64Decode)(responseB64)));
  };
  const onErrorWrapper = error => onError(error);
  const writeableStream = TurboLnd.routerHtlcInterceptor(onResponseWrapper, onErrorWrapper);
  return {
    send: response => {
      const message = (0, _protobuf.create)(routerrpc.ForwardHtlcInterceptResponseSchema, response);
      const responseB64 = (0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.ForwardHtlcInterceptResponseSchema, message));
      writeableStream.send(responseB64);
    },
    close: () => {
      writeableStream.stop();
    }
  };
}

/**
   *
   * The key of this forwarded htlc. It defines the incoming channel id and
   * the index in this channel.
   *
   * @param [UpdateChanStatusRequest]
   * @returns [UpdateChanStatusResponse]
   *
   */
async function routerUpdateChanStatus(request) {
  const message = (0, _protobuf.create)(routerrpc.UpdateChanStatusRequestSchema, request);
  const b64 = await TurboLnd.routerUpdateChanStatus((0, _wire.base64Encode)((0, _protobuf.toBinary)(routerrpc.UpdateChanStatusRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(routerrpc.UpdateChanStatusResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SignOutputRaw is a method that can be used to generated a signature for a
   * set of inputs/outputs to a transaction. Each request specifies details
   * concerning how the outputs should be signed, which keys they should be
   * signed with, and also any optional tweaks. The return value is a fixed
   * 64-byte signature (the same format as we use on the wire in Lightning).
   *
   * If we are  unable to sign using the specified keys, then an error will be
   * returned.
   *
   * @param [SignReq]
   * @returns [SignResp]
   *
   */
async function signerSignOutputRaw(request) {
  const message = (0, _protobuf.create)(signrpc.SignReqSchema, request);
  const b64 = await TurboLnd.signerSignOutputRaw((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.SignReqSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.SignRespSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ComputeInputScript generates a complete InputIndex for the passed
   * transaction with the signature as defined within the passed SignDescriptor.
   * This method should be capable of generating the proper input script for both
   * regular p2wkh/p2tr outputs and p2wkh outputs nested within a regular p2sh
   * output.
   *
   * Note that when using this method to sign inputs belonging to the wallet,
   * the only items of the SignDescriptor that need to be populated are pkScript
   * in the TxOut field, the value in that same field, and finally the input
   * index.
   *
   * @param [SignReq]
   * @returns [InputScriptResp]
   *
   */
async function signerComputeInputScript(request) {
  const message = (0, _protobuf.create)(signrpc.SignReqSchema, request);
  const b64 = await TurboLnd.signerComputeInputScript((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.SignReqSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.InputScriptRespSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SignMessage signs a message with the key specified in the key locator. The
   * returned signature is fixed-size LN wire format encoded.
   *
   * The main difference to SignMessage in the main RPC is that a specific key is
   * used to sign the message instead of the node identity private key.
   *
   * @param [SignMessageReq]
   * @returns [SignMessageResp]
   *
   */
async function signerSignMessage(request) {
  const message = (0, _protobuf.create)(signrpc.SignMessageReqSchema, request);
  const b64 = await TurboLnd.signerSignMessage((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.SignMessageReqSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.SignMessageRespSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * VerifyMessage verifies a signature over a message using the public key
   * provided. The signature must be fixed-size LN wire format encoded.
   *
   * The main difference to VerifyMessage in the main RPC is that the public key
   * used to sign the message does not have to be a node known to the network.
   *
   * @param [VerifyMessageReq]
   * @returns [VerifyMessageResp]
   *
   */
async function signerVerifyMessage(request) {
  const message = (0, _protobuf.create)(signrpc.VerifyMessageReqSchema, request);
  const b64 = await TurboLnd.signerVerifyMessage((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.VerifyMessageReqSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.VerifyMessageRespSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * DeriveSharedKey returns a shared secret key by performing Diffie-Hellman key
   * derivation between the ephemeral public key in the request and the node's
   * key specified in the key_desc parameter. Either a key locator or a raw
   * public key is expected in the key_desc, if neither is supplied, defaults to
   * the node's identity private key:
   * P_shared = privKeyNode * ephemeralPubkey
   * The resulting shared public key is serialized in the compressed format and
   * hashed with sha256, resulting in the final key length of 256bit.
   *
   * @param [SharedKeyRequest]
   * @returns [SharedKeyResponse]
   *
   */
async function signerDeriveSharedKey(request) {
  const message = (0, _protobuf.create)(signrpc.SharedKeyRequestSchema, request);
  const b64 = await TurboLnd.signerDeriveSharedKey((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.SharedKeyRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.SharedKeyResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * MuSig2CombineKeys (experimental!) is a stateless helper RPC that can be used
   * to calculate the combined MuSig2 public key from a list of all participating
   * signers' public keys. This RPC is completely stateless and deterministic and
   * does not create any signing session. It can be used to determine the Taproot
   * public key that should be put in an on-chain output once all public keys are
   * known. A signing session is only needed later when that output should be
   * _spent_ again.
   *
   * NOTE: The MuSig2 BIP is not final yet and therefore this API must be
   * considered to be HIGHLY EXPERIMENTAL and subject to change in upcoming
   * releases. Backward compatibility is not guaranteed!
   *
   * @param [MuSig2CombineKeysRequest]
   * @returns [MuSig2CombineKeysResponse]
   *
   */
async function signerMuSig2CombineKeys(request) {
  const message = (0, _protobuf.create)(signrpc.MuSig2CombineKeysRequestSchema, request);
  const b64 = await TurboLnd.signerMuSig2CombineKeys((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.MuSig2CombineKeysRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.MuSig2CombineKeysResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * MuSig2CreateSession (experimental!) creates a new MuSig2 signing session
   * using the local key identified by the key locator. The complete list of all
   * public keys of all signing parties must be provided, including the public
   * key of the local signing key. If nonces of other parties are already known,
   * they can be submitted as well to reduce the number of RPC calls necessary
   * later on.
   *
   * NOTE: The MuSig2 BIP is not final yet and therefore this API must be
   * considered to be HIGHLY EXPERIMENTAL and subject to change in upcoming
   * releases. Backward compatibility is not guaranteed!
   *
   * @param [MuSig2SessionRequest]
   * @returns [MuSig2SessionResponse]
   *
   */
async function signerMuSig2CreateSession(request) {
  const message = (0, _protobuf.create)(signrpc.MuSig2SessionRequestSchema, request);
  const b64 = await TurboLnd.signerMuSig2CreateSession((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.MuSig2SessionRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.MuSig2SessionResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * MuSig2RegisterNonces (experimental!) registers one or more public nonces of
   * other signing participants for a session identified by its ID. This RPC can
   * be called multiple times until all nonces are registered.
   *
   * NOTE: The MuSig2 BIP is not final yet and therefore this API must be
   * considered to be HIGHLY EXPERIMENTAL and subject to change in upcoming
   * releases. Backward compatibility is not guaranteed!
   *
   * @param [MuSig2RegisterNoncesRequest]
   * @returns [MuSig2RegisterNoncesResponse]
   *
   */
async function signerMuSig2RegisterNonces(request) {
  const message = (0, _protobuf.create)(signrpc.MuSig2RegisterNoncesRequestSchema, request);
  const b64 = await TurboLnd.signerMuSig2RegisterNonces((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.MuSig2RegisterNoncesRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.MuSig2RegisterNoncesResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * MuSig2Sign (experimental!) creates a partial signature using the local
   * signing key that was specified when the session was created. This can only
   * be called when all public nonces of all participants are known and have been
   * registered with the session. If this node isn't responsible for combining
   * all the partial signatures, then the cleanup flag should be set, indicating
   * that the session can be removed from memory once the signature was produced.
   *
   * NOTE: The MuSig2 BIP is not final yet and therefore this API must be
   * considered to be HIGHLY EXPERIMENTAL and subject to change in upcoming
   * releases. Backward compatibility is not guaranteed!
   *
   * @param [MuSig2SignRequest]
   * @returns [MuSig2SignResponse]
   *
   */
async function signerMuSig2Sign(request) {
  const message = (0, _protobuf.create)(signrpc.MuSig2SignRequestSchema, request);
  const b64 = await TurboLnd.signerMuSig2Sign((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.MuSig2SignRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.MuSig2SignResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * MuSig2CombineSig (experimental!) combines the given partial signature(s)
   * with the local one, if it already exists. Once a partial signature of all
   * participants is registered, the final signature will be combined and
   * returned.
   *
   * NOTE: The MuSig2 BIP is not final yet and therefore this API must be
   * considered to be HIGHLY EXPERIMENTAL and subject to change in upcoming
   * releases. Backward compatibility is not guaranteed!
   *
   * @param [MuSig2CombineSigRequest]
   * @returns [MuSig2CombineSigResponse]
   *
   */
async function signerMuSig2CombineSig(request) {
  const message = (0, _protobuf.create)(signrpc.MuSig2CombineSigRequestSchema, request);
  const b64 = await TurboLnd.signerMuSig2CombineSig((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.MuSig2CombineSigRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.MuSig2CombineSigResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * The unique ID of the signing session that should be removed/cleaned up.
   *
   * @param [MuSig2CleanupRequest]
   * @returns [MuSig2CleanupResponse]
   *
   */
async function signerMuSig2Cleanup(request) {
  const message = (0, _protobuf.create)(signrpc.MuSig2CleanupRequestSchema, request);
  const b64 = await TurboLnd.signerMuSig2Cleanup((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.MuSig2CleanupRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.MuSig2CleanupResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetVersion returns the current version and build information of the running
   * daemon.
   *
   * @param [VersionRequest]
   * @returns [Version]
   *
   */
async function versionerGetVersion(request) {
  const message = (0, _protobuf.create)(verrpc.VersionRequestSchema, request);
  const b64 = await TurboLnd.versionerGetVersion((0, _wire.base64Encode)((0, _protobuf.toBinary)(verrpc.VersionRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(verrpc.VersionSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListUnspent returns a list of all utxos spendable by the wallet with a
   * number of confirmations between the specified minimum and maximum. By
   * default, all utxos are listed. To list only the unconfirmed utxos, set
   * the unconfirmed_only to true.
   *
   * @param [ListUnspentRequest]
   * @returns [ListUnspentResponse]
   *
   */
async function walletKitListUnspent(request) {
  const message = (0, _protobuf.create)(walletrpc.ListUnspentRequestSchema, request);
  const b64 = await TurboLnd.walletKitListUnspent((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.ListUnspentRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.ListUnspentResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * LeaseOutput locks an output to the given ID, preventing it from being
   * available for any future coin selection attempts. The absolute time of the
   * lock's expiration is returned. The expiration of the lock can be extended by
   * successive invocations of this RPC. Outputs can be unlocked before their
   * expiration through `ReleaseOutput`.
   *
   * @param [LeaseOutputRequest]
   * @returns [LeaseOutputResponse]
   *
   */
async function walletKitLeaseOutput(request) {
  const message = (0, _protobuf.create)(walletrpc.LeaseOutputRequestSchema, request);
  const b64 = await TurboLnd.walletKitLeaseOutput((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.LeaseOutputRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.LeaseOutputResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ReleaseOutput unlocks an output, allowing it to be available for coin
   * selection if it remains unspent. The ID should match the one used to
   * originally lock the output.
   *
   * @param [ReleaseOutputRequest]
   * @returns [ReleaseOutputResponse]
   *
   */
async function walletKitReleaseOutput(request) {
  const message = (0, _protobuf.create)(walletrpc.ReleaseOutputRequestSchema, request);
  const b64 = await TurboLnd.walletKitReleaseOutput((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.ReleaseOutputRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.ReleaseOutputResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListLeases lists all currently locked utxos.
   *
   * @param [ListLeasesRequest]
   * @returns [ListLeasesResponse]
   *
   */
async function walletKitListLeases(request) {
  const message = (0, _protobuf.create)(walletrpc.ListLeasesRequestSchema, request);
  const b64 = await TurboLnd.walletKitListLeases((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.ListLeasesRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.ListLeasesResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * DeriveNextKey attempts to derive the *next* key within the key family
   * (account in BIP43) specified. This method should return the next external
   * child within this branch.
   *
   * @param [KeyReq]
   * @returns [KeyDescriptor]
   *
   */
async function walletKitDeriveNextKey(request) {
  const message = (0, _protobuf.create)(walletrpc.KeyReqSchema, request);
  const b64 = await TurboLnd.walletKitDeriveNextKey((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.KeyReqSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.KeyDescriptorSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * DeriveKey attempts to derive an arbitrary key specified by the passed
   * KeyLocator.
   *
   * @param [KeyLocator]
   * @returns [KeyDescriptor]
   *
   */
async function walletKitDeriveKey(request) {
  const message = (0, _protobuf.create)(signrpc.KeyLocatorSchema, request);
  const b64 = await TurboLnd.walletKitDeriveKey((0, _wire.base64Encode)((0, _protobuf.toBinary)(signrpc.KeyLocatorSchema, message)));
  const response = (0, _protobuf.fromBinary)(signrpc.KeyDescriptorSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * NextAddr returns the next unused address within the wallet.
   *
   * @param [AddrRequest]
   * @returns [AddrResponse]
   *
   */
async function walletKitNextAddr(request) {
  const message = (0, _protobuf.create)(walletrpc.AddrRequestSchema, request);
  const b64 = await TurboLnd.walletKitNextAddr((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.AddrRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.AddrResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListAccounts retrieves all accounts belonging to the wallet by default. A
   * name and key scope filter can be provided to filter through all of the
   * wallet accounts and return only those matching.
   *
   * @param [ListAccountsRequest]
   * @returns [ListAccountsResponse]
   *
   */
async function walletKitListAccounts(request) {
  const message = (0, _protobuf.create)(walletrpc.ListAccountsRequestSchema, request);
  const b64 = await TurboLnd.walletKitListAccounts((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.ListAccountsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.ListAccountsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * RequiredReserve returns the minimum amount of satoshis that should be kept
   * in the wallet in order to fee bump anchor channels if necessary. The value
   * scales with the number of public anchor channels but is capped at a maximum.
   *
   * @param [RequiredReserveRequest]
   * @returns [RequiredReserveResponse]
   *
   */
async function walletKitRequiredReserve(request) {
  const message = (0, _protobuf.create)(walletrpc.RequiredReserveRequestSchema, request);
  const b64 = await TurboLnd.walletKitRequiredReserve((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.RequiredReserveRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.RequiredReserveResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListAddresses retrieves all the addresses along with their balance. An
   * account name filter can be provided to filter through all of the
   * wallet accounts and return the addresses of only those matching.
   *
   * @param [ListAddressesRequest]
   * @returns [ListAddressesResponse]
   *
   */
async function walletKitListAddresses(request) {
  const message = (0, _protobuf.create)(walletrpc.ListAddressesRequestSchema, request);
  const b64 = await TurboLnd.walletKitListAddresses((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.ListAddressesRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.ListAddressesResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SignMessageWithAddr returns the compact signature (base64 encoded) created
   * with the private key of the provided address. This requires the address
   * to be solely based on a public key lock (no scripts). Obviously the internal
   * lnd wallet has to possess the private key of the address otherwise
   * an error is returned.
   *
   * This method aims to provide full compatibility with the bitcoin-core and
   * btcd implementation. Bitcoin-core's algorithm is not specified in a
   * BIP and only applicable for legacy addresses. This method enhances the
   * signing for additional address types: P2WKH, NP2WKH, P2TR.
   * For P2TR addresses this represents a special case. ECDSA is used to create
   * a compact signature which makes the public key of the signature recoverable.
   *
   * @param [SignMessageWithAddrRequest]
   * @returns [SignMessageWithAddrResponse]
   *
   */
async function walletKitSignMessageWithAddr(request) {
  const message = (0, _protobuf.create)(walletrpc.SignMessageWithAddrRequestSchema, request);
  const b64 = await TurboLnd.walletKitSignMessageWithAddr((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.SignMessageWithAddrRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.SignMessageWithAddrResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * VerifyMessageWithAddr returns the validity and the recovered public key of
   * the provided compact signature (base64 encoded). The verification is
   * twofold. First the validity of the signature itself is checked and then
   * it is verified that the recovered public key of the signature equals
   * the public key of the provided address. There is no dependence on the
   * private key of the address therefore also external addresses are allowed
   * to verify signatures.
   * Supported address types are P2PKH, P2WKH, NP2WKH, P2TR.
   *
   * This method is the counterpart of the related signing method
   * (SignMessageWithAddr) and aims to provide full compatibility to
   * bitcoin-core's implementation. Although bitcoin-core/btcd only provide
   * this functionality for legacy addresses this function enhances it to
   * the address types: P2PKH, P2WKH, NP2WKH, P2TR.
   *
   * The verification for P2TR addresses is a special case and requires the
   * ECDSA compact signature to compare the reovered public key to the internal
   * taproot key. The compact ECDSA signature format was used because there
   * are still no known compact signature schemes for schnorr signatures.
   *
   * @param [VerifyMessageWithAddrRequest]
   * @returns [VerifyMessageWithAddrResponse]
   *
   */
async function walletKitVerifyMessageWithAddr(request) {
  const message = (0, _protobuf.create)(walletrpc.VerifyMessageWithAddrRequestSchema, request);
  const b64 = await TurboLnd.walletKitVerifyMessageWithAddr((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.VerifyMessageWithAddrRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.VerifyMessageWithAddrResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ImportAccount imports an account backed by an account extended public key.
   * The master key fingerprint denotes the fingerprint of the root key
   * corresponding to the account public key (also known as the key with
   * derivation path m/). This may be required by some hardware wallets for
   * proper identification and signing.
   *
   * The address type can usually be inferred from the key's version, but may be
   * required for certain keys to map them into the proper scope.
   *
   * For BIP-0044 keys, an address type must be specified as we intend to not
   * support importing BIP-0044 keys into the wallet using the legacy
   * pay-to-pubkey-hash (P2PKH) scheme. A nested witness address type will force
   * the standard BIP-0049 derivation scheme, while a witness address type will
   * force the standard BIP-0084 derivation scheme.
   *
   * For BIP-0049 keys, an address type must also be specified to make a
   * distinction between the standard BIP-0049 address schema (nested witness
   * pubkeys everywhere) and our own BIP-0049Plus address schema (nested pubkeys
   * externally, witness pubkeys internally).
   *
   * NOTE: Events (deposits/spends) for keys derived from an account will only be
   * detected by lnd if they happen after the import. Rescans to detect past
   * events will be supported later on.
   *
   * @param [ImportAccountRequest]
   * @returns [ImportAccountResponse]
   *
   */
async function walletKitImportAccount(request) {
  const message = (0, _protobuf.create)(walletrpc.ImportAccountRequestSchema, request);
  const b64 = await TurboLnd.walletKitImportAccount((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.ImportAccountRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.ImportAccountResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ImportPublicKey imports a public key as watch-only into the wallet. The
   * public key is converted into a simple address of the given type and that
   * address script is watched on chain. For Taproot keys, this will only watch
   * the BIP-0086 style output script. Use ImportTapscript for more advanced key
   * spend or script spend outputs.
   *
   * NOTE: Events (deposits/spends) for a key will only be detected by lnd if
   * they happen after the import. Rescans to detect past events will be
   * supported later on.
   *
   * @param [ImportPublicKeyRequest]
   * @returns [ImportPublicKeyResponse]
   *
   */
async function walletKitImportPublicKey(request) {
  const message = (0, _protobuf.create)(walletrpc.ImportPublicKeyRequestSchema, request);
  const b64 = await TurboLnd.walletKitImportPublicKey((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.ImportPublicKeyRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.ImportPublicKeyResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ImportTapscript imports a Taproot script and internal key and adds the
   * resulting Taproot output key as a watch-only output script into the wallet.
   * For BIP-0086 style Taproot keys (no root hash commitment and no script spend
   * path) use ImportPublicKey.
   *
   * NOTE: Events (deposits/spends) for a key will only be detected by lnd if
   * they happen after the import. Rescans to detect past events will be
   * supported later on.
   *
   * NOTE: Taproot keys imported through this RPC currently _cannot_ be used for
   * funding PSBTs. Only tracking the balance and UTXOs is currently supported.
   *
   * @param [ImportTapscriptRequest]
   * @returns [ImportTapscriptResponse]
   *
   */
async function walletKitImportTapscript(request) {
  const message = (0, _protobuf.create)(walletrpc.ImportTapscriptRequestSchema, request);
  const b64 = await TurboLnd.walletKitImportTapscript((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.ImportTapscriptRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.ImportTapscriptResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * PublishTransaction attempts to publish the passed transaction to the
   * network. Once this returns without an error, the wallet will continually
   * attempt to re-broadcast the transaction on start up, until it enters the
   * chain.
   *
   * @param [Transaction]
   * @returns [PublishResponse]
   *
   */
async function walletKitPublishTransaction(request) {
  const message = (0, _protobuf.create)(walletrpc.TransactionSchema, request);
  const b64 = await TurboLnd.walletKitPublishTransaction((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.TransactionSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.PublishResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SendOutputs is similar to the existing sendmany call in Bitcoind, and
   * allows the caller to create a transaction that sends to several outputs at
   * once. This is ideal when wanting to batch create a set of transactions.
   *
   * @param [SendOutputsRequest]
   * @returns [SendOutputsResponse]
   *
   */
async function walletKitSendOutputs(request) {
  const message = (0, _protobuf.create)(walletrpc.SendOutputsRequestSchema, request);
  const b64 = await TurboLnd.walletKitSendOutputs((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.SendOutputsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.SendOutputsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * EstimateFee attempts to query the internal fee estimator of the wallet to
   * determine the fee (in sat/kw) to attach to a transaction in order to
   * achieve the confirmation target.
   *
   * @param [EstimateFeeRequest]
   * @returns [EstimateFeeResponse]
   *
   */
async function walletKitEstimateFee(request) {
  const message = (0, _protobuf.create)(walletrpc.EstimateFeeRequestSchema, request);
  const b64 = await TurboLnd.walletKitEstimateFee((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.EstimateFeeRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.EstimateFeeResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * PendingSweeps returns lists of on-chain outputs that lnd is currently
   * attempting to sweep within its central batching engine. Outputs with similar
   * fee rates are batched together in order to sweep them within a single
   * transaction.
   *
   * NOTE: Some of the fields within PendingSweepsRequest are not guaranteed to
   * remain supported. This is an advanced API that depends on the internals of
   * the UtxoSweeper, so things may change.
   *
   * @param [PendingSweepsRequest]
   * @returns [PendingSweepsResponse]
   *
   */
async function walletKitPendingSweeps(request) {
  const message = (0, _protobuf.create)(walletrpc.PendingSweepsRequestSchema, request);
  const b64 = await TurboLnd.walletKitPendingSweeps((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.PendingSweepsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.PendingSweepsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * BumpFee bumps the fee of an arbitrary input within a transaction. This RPC
   * takes a different approach than bitcoind's bumpfee command. lnd has a
   * central batching engine in which inputs with similar fee rates are batched
   * together to save on transaction fees. Due to this, we cannot rely on
   * bumping the fee on a specific transaction, since transactions can change at
   * any point with the addition of new inputs. The list of inputs that
   * currently exist within lnd's central batching engine can be retrieved
   * through the PendingSweeps RPC.
   *
   * When bumping the fee of an input that currently exists within lnd's central
   * batching engine, a higher fee transaction will be created that replaces the
   * lower fee transaction through the Replace-By-Fee (RBF) policy. If it
   *
   * This RPC also serves useful when wanting to perform a Child-Pays-For-Parent
   * (CPFP), where the child transaction pays for its parent's fee. This can be
   * done by specifying an outpoint within the low fee transaction that is under
   * the control of the wallet.
   *
   * The fee preference can be expressed either as a specific fee rate or a delta
   * of blocks in which the output should be swept on-chain within. If a fee
   * preference is not explicitly specified, then an error is returned.
   *
   * Note that this RPC currently doesn't perform any validation checks on the
   * fee preference being provided. For now, the responsibility of ensuring that
   * the new fee preference is sufficient is delegated to the user.
   *
   * @param [BumpFeeRequest]
   * @returns [BumpFeeResponse]
   *
   */
async function walletKitBumpFee(request) {
  const message = (0, _protobuf.create)(walletrpc.BumpFeeRequestSchema, request);
  const b64 = await TurboLnd.walletKitBumpFee((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.BumpFeeRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.BumpFeeResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * ListSweeps returns a list of the sweep transactions our node has produced.
   * Note that these sweeps may not be confirmed yet, as we record sweeps on
   * broadcast, not confirmation.
   *
   * @param [ListSweepsRequest]
   * @returns [ListSweepsResponse]
   *
   */
async function walletKitListSweeps(request) {
  const message = (0, _protobuf.create)(walletrpc.ListSweepsRequestSchema, request);
  const b64 = await TurboLnd.walletKitListSweeps((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.ListSweepsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.ListSweepsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * LabelTransaction adds a label to a transaction. If the transaction already
   * has a label the call will fail unless the overwrite bool is set. This will
   * overwrite the exiting transaction label. Labels must not be empty, and
   * cannot exceed 500 characters.
   *
   * @param [LabelTransactionRequest]
   * @returns [LabelTransactionResponse]
   *
   */
async function walletKitLabelTransaction(request) {
  const message = (0, _protobuf.create)(walletrpc.LabelTransactionRequestSchema, request);
  const b64 = await TurboLnd.walletKitLabelTransaction((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.LabelTransactionRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.LabelTransactionResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * FundPsbt creates a fully populated PSBT that contains enough inputs to fund
   * the outputs specified in the template. There are two ways of specifying a
   * template: Either by passing in a PSBT with at least one output declared or
   * by passing in a raw TxTemplate message.
   *
   * If there are no inputs specified in the template, coin selection is
   * performed automatically. If the template does contain any inputs, it is
   * assumed that full coin selection happened externally and no additional
   * inputs are added. If the specified inputs aren't enough to fund the outputs
   * with the given fee rate, an error is returned.
   *
   * After either selecting or verifying the inputs, all input UTXOs are locked
   * with an internal app ID.
   *
   * NOTE: If this method returns without an error, it is the caller's
   * responsibility to either spend the locked UTXOs (by finalizing and then
   * publishing the transaction) or to unlock/release the locked UTXOs in case of
   * an error on the caller's side.
   *
   * @param [FundPsbtRequest]
   * @returns [FundPsbtResponse]
   *
   */
async function walletKitFundPsbt(request) {
  const message = (0, _protobuf.create)(walletrpc.FundPsbtRequestSchema, request);
  const b64 = await TurboLnd.walletKitFundPsbt((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.FundPsbtRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.FundPsbtResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * SignPsbt expects a partial transaction with all inputs and outputs fully
   * declared and tries to sign all unsigned inputs that have all required fields
   * (UTXO information, BIP32 derivation information, witness or sig scripts)
   * set.
   * If no error is returned, the PSBT is ready to be given to the next signer or
   * to be finalized if lnd was the last signer.
   *
   * NOTE: This RPC only signs inputs (and only those it can sign), it does not
   * perform any other tasks (such as coin selection, UTXO locking or
   * input/output/fee value validation, PSBT finalization). Any input that is
   * incomplete will be skipped.
   *
   * @param [SignPsbtRequest]
   * @returns [SignPsbtResponse]
   *
   */
async function walletKitSignPsbt(request) {
  const message = (0, _protobuf.create)(walletrpc.SignPsbtRequestSchema, request);
  const b64 = await TurboLnd.walletKitSignPsbt((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.SignPsbtRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.SignPsbtResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * The name of the account to finalize the PSBT with. If empty, the default
   * wallet account is used.
   *
   * @param [FinalizePsbtRequest]
   * @returns [FinalizePsbtResponse]
   *
   */
async function walletKitFinalizePsbt(request) {
  const message = (0, _protobuf.create)(walletrpc.FinalizePsbtRequestSchema, request);
  const b64 = await TurboLnd.walletKitFinalizePsbt((0, _wire.base64Encode)((0, _protobuf.toBinary)(walletrpc.FinalizePsbtRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(walletrpc.FinalizePsbtResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * GetInfo returns general information concerning the companion watchtower
   * including its public key and URIs where the server is currently
   * listening for clients.
   *
   * @param [GetInfoRequest]
   * @returns [GetInfoResponse]
   *
   */
async function watchtowerGetInfo(request) {
  const message = (0, _protobuf.create)(watchtowerrpc.GetInfoRequestSchema, request);
  const b64 = await TurboLnd.watchtowerGetInfo((0, _wire.base64Encode)((0, _protobuf.toBinary)(watchtowerrpc.GetInfoRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(watchtowerrpc.GetInfoResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * AddTower adds a new watchtower reachable at the given address and
   * considers it for new sessions. If the watchtower already exists, then
   * any new addresses included will be considered when dialing it for
   * session negotiations and backups.
   *
   * @param [AddTowerRequest]
   * @returns [AddTowerResponse]
   *
   */
async function watchtowerClientAddTower(request) {
  const message = (0, _protobuf.create)(wtclientrpc.AddTowerRequestSchema, request);
  const b64 = await TurboLnd.watchtowerClientAddTower((0, _wire.base64Encode)((0, _protobuf.toBinary)(wtclientrpc.AddTowerRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(wtclientrpc.AddTowerResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   * The fee rate, in satoshis per vbyte, that will be used by watchtowers for
   * justice transactions in response to channel breaches.
   *
   * @param [RemoveTowerRequest]
   * @returns [RemoveTowerResponse]
   *
   */
async function watchtowerClientRemoveTower(request) {
  const message = (0, _protobuf.create)(wtclientrpc.RemoveTowerRequestSchema, request);
  const b64 = await TurboLnd.watchtowerClientRemoveTower((0, _wire.base64Encode)((0, _protobuf.toBinary)(wtclientrpc.RemoveTowerRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(wtclientrpc.RemoveTowerResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   *
   * @param [ListTowersRequest]
   * @returns [ListTowersResponse]
   */
async function watchtowerClientListTowers(request) {
  const message = (0, _protobuf.create)(wtclientrpc.ListTowersRequestSchema, request);
  const b64 = await TurboLnd.watchtowerClientListTowers((0, _wire.base64Encode)((0, _protobuf.toBinary)(wtclientrpc.ListTowersRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(wtclientrpc.ListTowersResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   *
   * @param [GetTowerInfoRequest]
   * @returns [Tower]
   */
async function watchtowerClientGetTowerInfo(request) {
  const message = (0, _protobuf.create)(wtclientrpc.GetTowerInfoRequestSchema, request);
  const b64 = await TurboLnd.watchtowerClientGetTowerInfo((0, _wire.base64Encode)((0, _protobuf.toBinary)(wtclientrpc.GetTowerInfoRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(wtclientrpc.TowerSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   *
   * @param [StatsRequest]
   * @returns [StatsResponse]
   */
async function watchtowerClientStats(request) {
  const message = (0, _protobuf.create)(wtclientrpc.StatsRequestSchema, request);
  const b64 = await TurboLnd.watchtowerClientStats((0, _wire.base64Encode)((0, _protobuf.toBinary)(wtclientrpc.StatsRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(wtclientrpc.StatsResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}

/**
   *
   *
   * @param [PolicyRequest]
   * @returns [PolicyResponse]
   */
async function watchtowerClientPolicy(request) {
  const message = (0, _protobuf.create)(wtclientrpc.PolicyRequestSchema, request);
  const b64 = await TurboLnd.watchtowerClientPolicy((0, _wire.base64Encode)((0, _protobuf.toBinary)(wtclientrpc.PolicyRequestSchema, message)));
  const response = (0, _protobuf.fromBinary)(wtclientrpc.PolicyResponseSchema, (0, _wire.base64Decode)(b64));
  return response;
}
//# sourceMappingURL=index.js.map