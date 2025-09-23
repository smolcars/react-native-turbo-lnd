import type { TurboModule } from "react-native";
export type ProtobufBase64 = string;
export interface WriteableStream {
    send: (data: ProtobufBase64) => boolean;
    stop: () => boolean;
}
export type OnResponseCallback = (data: ProtobufBase64) => void;
export type OnErrorCallback = (error: string) => void;
export type UnsubscribeFromStream = () => void;
export interface Spec extends TurboModule {
    /**
     *
     * Starts up lnd.
     * You need to provide path to the app's local dir to lnd via `--lnddir` arg.
     * Use `subscribeState` to know when lnd is ready for wallet unlock/creation.
     *
     */
    start: (args: string) => Promise<string>;
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
    walletBalance(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    channelBalance(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * GetTransactions returns a list describing all the known transactions
     * relevant to the wallet.
     *
     * @param [GetTransactionsRequest]
     * @returns [TransactionDetails]
     *
     */
    getTransactions(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    estimateFee(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    sendCoins(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    listUnspent(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    subscribeTransactions(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    sendMany(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * NewAddress creates a new address under control of the local wallet.
     *
     * @param [NewAddressRequest]
     * @returns [NewAddressResponse]
     *
     */
    newAddress(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    signMessage(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    verifyMessage(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    connectPeer(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    disconnectPeer(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * ListPeers returns a verbose listing of all currently active peers.
     *
     * @param [ListPeersRequest]
     * @returns [ListPeersResponse]
     *
     */
    listPeers(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    subscribePeerEvents(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    getInfo(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    getRecoveryInfo(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    pendingChannels(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * ListChannels returns a description of all the open channels that this node
     * is a participant in.
     *
     * @param [ListChannelsRequest]
     * @returns [ListChannelsResponse]
     *
     */
    listChannels(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    subscribeChannelEvents(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
    /**
     *
     * ClosedChannels returns a description of all the closed channels that
     * this node was a participant in.
     *
     * @param [ClosedChannelsRequest]
     * @returns [ClosedChannelsResponse]
     *
     */
    closedChannels(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    openChannelSync(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    openChannel(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    batchOpenChannel(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    fundingStateStep(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    channelAcceptor(onResponse: OnResponseCallback, onError: OnErrorCallback): WriteableStream;
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
    closeChannel(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    abandonChannel(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    sendPayment(onResponse: OnResponseCallback, onError: OnErrorCallback): WriteableStream;
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
    sendPaymentSync(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    sendToRoute(onResponse: OnResponseCallback, onError: OnErrorCallback): WriteableStream;
    /**
     *
     * SendToRouteSync is a synchronous version of SendToRoute. It Will block
     * until the payment either fails or succeeds.
     *
     * @param [SendToRouteRequest]
     * @returns [SendResponse]
     *
     */
    sendToRouteSync(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    addInvoice(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    listInvoices(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    lookupInvoice(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    subscribeInvoices(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    decodePayReq(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * ListPayments returns a list of all outgoing payments.
     *
     * @param [ListPaymentsRequest]
     * @returns [ListPaymentsResponse]
     *
     */
    listPayments(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * DeletePayment deletes an outgoing payment from DB. Note that it will not
     * attempt to delete an In-Flight payment, since that would be unsafe.
     *
     * @param [DeletePaymentRequest]
     * @returns [DeletePaymentResponse]
     *
     */
    deletePayment(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * DeleteAllPayments deletes all outgoing payments from DB. Note that it will
     * not attempt to delete In-Flight payments, since that would be unsafe.
     *
     * @param [DeleteAllPaymentsRequest]
     * @returns [DeleteAllPaymentsResponse]
     *
     */
    deleteAllPayments(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    describeGraph(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * GetNodeMetrics returns node metrics calculated from the graph. Currently
     * the only supported metric is betweenness centrality of individual nodes.
     *
     * @param [NodeMetricsRequest]
     * @returns [NodeMetricsResponse]
     *
     */
    getNodeMetrics(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    getChanInfo(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * GetNodeInfo returns the latest advertised, aggregated, and authenticated
     * channel information for the specified node identified by its public key.
     *
     * @param [NodeInfoRequest]
     * @returns [NodeInfo]
     *
     */
    getNodeInfo(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    queryRoutes(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * GetNetworkInfo returns some basic stats about the known channel graph from
     * the point of view of the node.
     *
     * @param [NetworkInfoRequest]
     * @returns [NetworkInfo]
     *
     */
    getNetworkInfo(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * StopDaemon will send a shutdown request to the interrupt handler, triggering
     * a graceful shutdown of the daemon.
     *
     * @param [StopRequest]
     * @returns [StopResponse]
     *
     */
    stopDaemon(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    subscribeChannelGraph(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    debugLevel(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * FeeReport allows the caller to obtain a report detailing the current fee
     * schedule enforced by the node globally for each channel.
     *
     * @param [FeeReportRequest]
     * @returns [FeeReportResponse]
     *
     */
    feeReport(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * UpdateChannelPolicy allows the caller to update the fee schedule and
     * channel policies for all channels globally, or a particular channel.
     *
     * @param [PolicyUpdateRequest]
     * @returns [PolicyUpdateResponse]
     *
     */
    updateChannelPolicy(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    forwardingHistory(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    exportChannelBackup(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    exportAllChannelBackups(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    verifyChanBackup(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    restoreChannelBackups(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    subscribeChannelBackups(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    bakeMacaroon(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * ListMacaroonIDs returns all root key IDs that are in use.
     *
     * @param [ListMacaroonIDsRequest]
     * @returns [ListMacaroonIDsResponse]
     *
     */
    listMacaroonIDs(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * DeleteMacaroonID deletes the specified macaroon ID and invalidates all
     * macaroons derived from that ID.
     *
     * @param [DeleteMacaroonIDRequest]
     * @returns [DeleteMacaroonIDResponse]
     *
     */
    deleteMacaroonID(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * ListPermissions lists all RPC method URIs and their required macaroon
     * permissions to access them.
     *
     * @param [ListPermissionsRequest]
     * @returns [ListPermissionsResponse]
     *
     */
    listPermissions(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    checkMacaroonPermissions(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    registerRPCMiddleware(onResponse: OnResponseCallback, onError: OnErrorCallback): WriteableStream;
    /**
     *
     * SendCustomMessage sends a custom peer message.
     *
     * @param [SendCustomMessageRequest]
     * @returns [SendCustomMessageResponse]
     *
     */
    sendCustomMessage(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    subscribeCustomMessages(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    listAliases(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * If the replace_response field is set to true, this field must contain the
     * binary serialized gRPC message in the protobuf format.
     *
     * @param [LookupHtlcResolutionRequest]
     * @returns [LookupHtlcResolutionResponse]
     *
     */
    lookupHtlcResolution(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    genSeed(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    initWallet(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * UnlockWallet is used at startup of lnd to provide a password to unlock
     * the wallet database.
     *
     * @param [UnlockWalletRequest]
     * @returns [UnlockWalletResponse]
     *
     */
    unlockWallet(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    changePassword(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    subscribeState(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
    /**
     *
     *
     * @param [GetStateRequest]
     * @returns [GetStateResponse]
     */
    getState(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    autopilotStatus(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * ModifyStatus is used to modify the status of the autopilot agent, like
     * enabling or disabling it.
     *
     * @param [ModifyStatusRequest]
     * @returns [ModifyStatusResponse]
     *
     */
    autopilotModifyStatus(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    autopilotQueryScores(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * A map from hex-encoded public keys to scores. Scores must be in the range
     * [0.0, 1.0].
     *
     * @param [SetScoresRequest]
     * @returns [SetScoresResponse]
     *
     */
    autopilotSetScores(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    chainNotifierRegisterConfirmationsNtfn(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    chainNotifierRegisterSpendNtfn(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
    /**
     *
     * An event sent when the spending transaction of the request was
     * reorged out of the chain.
     *
     * @param [BlockEpoch]
     * @returns [BlockEpoch]
     *
     */
    chainNotifierRegisterBlockEpochNtfn(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    invoicesSubscribeSingleInvoice(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    invoicesCancelInvoice(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * AddHoldInvoice creates a hold invoice. It ties the invoice to the hash
     * supplied in the request.
     *
     * @param [AddHoldInvoiceRequest]
     * @returns [AddHoldInvoiceResp]
     *
     */
    invoicesAddHoldInvoice(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * SettleInvoice settles an accepted invoice. If the invoice is already
     * settled, this call will succeed.
     *
     * @param [SettleInvoiceMsg]
     * @returns [SettleInvoiceResp]
     *
     */
    invoicesSettleInvoice(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    invoicesLookupInvoiceV2(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    neutrinoKitStatus(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * AddPeer adds a new peer that has already been connected to the server.
     *
     * @param [AddPeerRequest]
     * @returns [AddPeerResponse]
     *
     */
    neutrinoKitAddPeer(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    neutrinoKitDisconnectPeer(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * IsBanned returns true if the peer is banned, otherwise false.
     *
     * @param [IsBannedRequest]
     * @returns [IsBannedResponse]
     *
     */
    neutrinoKitIsBanned(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * GetBlockHeader returns a block header with a particular block hash.
     *
     * @param [GetBlockHeaderRequest]
     * @returns [GetBlockHeaderResponse]
     *
     */
    neutrinoKitGetBlockHeader(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * GetBlock returns a block with a particular block hash.
     *
     * @param [GetBlockRequest]
     * @returns [GetBlockResponse]
     *
     */
    neutrinoKitGetBlock(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * GetCFilter returns a compact filter from a block.
     *
     * @param [GetCFilterRequest]
     * @returns [GetCFilterResponse]
     *
     */
    neutrinoKitGetCFilter(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * Deprecated, use chainrpc.GetBlockHash instead.
     * GetBlockHash returns the header hash of a block at a given height.
     *
     * @param [GetBlockHashRequest]
     * @returns [GetBlockHashResponse]
     *
     */
    neutrinoKitGetBlockHash(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * SET_INVOICE_AMP identifies the features that should be advertised on
     * AMP invoices generated by the daemon.
     *
     * @param [NodeAnnouncementUpdateRequest]
     * @returns [NodeAnnouncementUpdateResponse]
     *
     */
    peersUpdateNodeAnnouncement(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    routerSendPaymentV2(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
    /**
     *
     * TrackPaymentV2 returns an update stream for the payment identified by the
     * payment hash.
     *
     * @param [TrackPaymentRequest]
     * @returns [Payment]
     *
     */
    routerTrackPaymentV2(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    routerTrackPayments(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
    /**
     *
     * EstimateRouteFee allows callers to obtain a lower bound w.r.t how much it
     * may cost to send an HTLC to the target end destination.
     *
     * @param [RouteFeeRequest]
     * @returns [RouteFeeResponse]
     *
     */
    routerEstimateRouteFee(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    routerSendToRoute(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    routerSendToRouteV2(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * ResetMissionControl clears all mission control state and starts with a clean
     * slate.
     *
     * @param [ResetMissionControlRequest]
     * @returns [ResetMissionControlResponse]
     *
     */
    routerResetMissionControl(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * QueryMissionControl exposes the internal mission control state to callers.
     * It is a development feature.
     *
     * @param [QueryMissionControlRequest]
     * @returns [QueryMissionControlResponse]
     *
     */
    routerQueryMissionControl(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    routerXImportMissionControl(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * GetMissionControlConfig returns mission control's current config.
     *
     * @param [GetMissionControlConfigRequest]
     * @returns [GetMissionControlConfigResponse]
     *
     */
    routerGetMissionControlConfig(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * SetMissionControlConfig will set mission control's config, if the config
     * provided is valid.
     *
     * @param [SetMissionControlConfigRequest]
     * @returns [SetMissionControlConfigResponse]
     *
     */
    routerSetMissionControlConfig(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    routerQueryProbability(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    routerBuildRoute(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * SubscribeHtlcEvents creates a uni-directional stream from the server to
     * the client which delivers a stream of htlc events.
     *
     * @param [SubscribeHtlcEventsRequest]
     * @returns [HtlcEvent]
     *
     */
    routerSubscribeHtlcEvents(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    routerSendPayment(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
    /**
     *
     * Deprecated, use TrackPaymentV2. TrackPayment returns an update stream for
     * the payment identified by the payment hash.
     *
     * @param [TrackPaymentRequest]
     * @returns [PaymentStatus]
     *
     */
    routerTrackPayment(data: ProtobufBase64, onResponse: OnResponseCallback, onError: OnErrorCallback): UnsubscribeFromStream;
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
    routerHtlcInterceptor(onResponse: OnResponseCallback, onError: OnErrorCallback): WriteableStream;
    /**
     *
     * The key of this forwarded htlc. It defines the incoming channel id and
     * the index in this channel.
     *
     * @param [UpdateChanStatusRequest]
     * @returns [UpdateChanStatusResponse]
     *
     */
    routerUpdateChanStatus(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    signerSignOutputRaw(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    signerComputeInputScript(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    signerSignMessage(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    signerVerifyMessage(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    signerDeriveSharedKey(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    signerMuSig2CombineKeys(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    signerMuSig2CreateSession(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    signerMuSig2RegisterNonces(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    signerMuSig2Sign(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    signerMuSig2CombineSig(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * The unique ID of the signing session that should be removed/cleaned up.
     *
     * @param [MuSig2CleanupRequest]
     * @returns [MuSig2CleanupResponse]
     *
     */
    signerMuSig2Cleanup(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * GetVersion returns the current version and build information of the running
     * daemon.
     *
     * @param [VersionRequest]
     * @returns [Version]
     *
     */
    versionerGetVersion(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitListUnspent(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitLeaseOutput(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitReleaseOutput(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * ListLeases lists all currently locked utxos.
     *
     * @param [ListLeasesRequest]
     * @returns [ListLeasesResponse]
     *
     */
    walletKitListLeases(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitDeriveNextKey(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * DeriveKey attempts to derive an arbitrary key specified by the passed
     * KeyLocator.
     *
     * @param [KeyLocator]
     * @returns [KeyDescriptor]
     *
     */
    walletKitDeriveKey(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * NextAddr returns the next unused address within the wallet.
     *
     * @param [AddrRequest]
     * @returns [AddrResponse]
     *
     */
    walletKitNextAddr(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitListAccounts(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitRequiredReserve(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitListAddresses(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitSignMessageWithAddr(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitVerifyMessageWithAddr(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitImportAccount(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitImportPublicKey(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitImportTapscript(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitPublishTransaction(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitSendOutputs(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitEstimateFee(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitPendingSweeps(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitBumpFee(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitListSweeps(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitLabelTransaction(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitFundPsbt(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    walletKitSignPsbt(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * The name of the account to finalize the PSBT with. If empty, the default
     * wallet account is used.
     *
     * @param [FinalizePsbtRequest]
     * @returns [FinalizePsbtResponse]
     *
     */
    walletKitFinalizePsbt(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    watchtowerGetInfo(data: ProtobufBase64): Promise<ProtobufBase64>;
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
    watchtowerClientAddTower(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     * The fee rate, in satoshis per vbyte, that will be used by watchtowers for
     * justice transactions in response to channel breaches.
     *
     * @param [RemoveTowerRequest]
     * @returns [RemoveTowerResponse]
     *
     */
    watchtowerClientRemoveTower(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     *
     * @param [ListTowersRequest]
     * @returns [ListTowersResponse]
     */
    watchtowerClientListTowers(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     *
     * @param [GetTowerInfoRequest]
     * @returns [Tower]
     */
    watchtowerClientGetTowerInfo(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     *
     * @param [StatsRequest]
     * @returns [StatsResponse]
     */
    watchtowerClientStats(data: ProtobufBase64): Promise<ProtobufBase64>;
    /**
     *
     *
     * @param [PolicyRequest]
     * @returns [PolicyResponse]
     */
    watchtowerClientPolicy(data: ProtobufBase64): Promise<ProtobufBase64>;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeTurboLnd.d.ts.map