import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file lightning.proto.
 */
export declare const file_lightning: GenFile;
/**
 * @generated from message lnrpc.LookupHtlcResolutionRequest
 */
export type LookupHtlcResolutionRequest = Message<"lnrpc.LookupHtlcResolutionRequest"> & {
    /**
     * @generated from field: uint64 chan_id = 1;
     */
    chanId: bigint;
    /**
     * @generated from field: uint64 htlc_index = 2;
     */
    htlcIndex: bigint;
};
/**
 * Describes the message lnrpc.LookupHtlcResolutionRequest.
 * Use `create(LookupHtlcResolutionRequestSchema)` to create a new message.
 */
export declare const LookupHtlcResolutionRequestSchema: GenMessage<LookupHtlcResolutionRequest>;
/**
 * @generated from message lnrpc.LookupHtlcResolutionResponse
 */
export type LookupHtlcResolutionResponse = Message<"lnrpc.LookupHtlcResolutionResponse"> & {
    /**
     * Settled is true is the htlc was settled. If false, the htlc was failed.
     *
     * @generated from field: bool settled = 1;
     */
    settled: boolean;
    /**
     * Offchain indicates whether the htlc was resolved off-chain or on-chain.
     *
     * @generated from field: bool offchain = 2;
     */
    offchain: boolean;
};
/**
 * Describes the message lnrpc.LookupHtlcResolutionResponse.
 * Use `create(LookupHtlcResolutionResponseSchema)` to create a new message.
 */
export declare const LookupHtlcResolutionResponseSchema: GenMessage<LookupHtlcResolutionResponse>;
/**
 * @generated from message lnrpc.SubscribeCustomMessagesRequest
 */
export type SubscribeCustomMessagesRequest = Message<"lnrpc.SubscribeCustomMessagesRequest"> & {};
/**
 * Describes the message lnrpc.SubscribeCustomMessagesRequest.
 * Use `create(SubscribeCustomMessagesRequestSchema)` to create a new message.
 */
export declare const SubscribeCustomMessagesRequestSchema: GenMessage<SubscribeCustomMessagesRequest>;
/**
 * @generated from message lnrpc.CustomMessage
 */
export type CustomMessage = Message<"lnrpc.CustomMessage"> & {
    /**
     * Peer from which the message originates
     *
     * @generated from field: bytes peer = 1;
     */
    peer: Uint8Array;
    /**
     * Message type. This value will be in the custom range (>= 32768).
     *
     * @generated from field: uint32 type = 2;
     */
    type: number;
    /**
     * Raw message data
     *
     * @generated from field: bytes data = 3;
     */
    data: Uint8Array;
};
/**
 * Describes the message lnrpc.CustomMessage.
 * Use `create(CustomMessageSchema)` to create a new message.
 */
export declare const CustomMessageSchema: GenMessage<CustomMessage>;
/**
 * @generated from message lnrpc.SendCustomMessageRequest
 */
export type SendCustomMessageRequest = Message<"lnrpc.SendCustomMessageRequest"> & {
    /**
     * Peer to send the message to
     *
     * @generated from field: bytes peer = 1;
     */
    peer: Uint8Array;
    /**
     * Message type. This value needs to be in the custom range (>= 32768).
     * To send a type < custom range, lnd needs to be compiled with the `dev`
     * build tag, and the message type to override should be specified in lnd's
     * experimental protocol configuration.
     *
     * @generated from field: uint32 type = 2;
     */
    type: number;
    /**
     * Raw message data.
     *
     * @generated from field: bytes data = 3;
     */
    data: Uint8Array;
};
/**
 * Describes the message lnrpc.SendCustomMessageRequest.
 * Use `create(SendCustomMessageRequestSchema)` to create a new message.
 */
export declare const SendCustomMessageRequestSchema: GenMessage<SendCustomMessageRequest>;
/**
 * @generated from message lnrpc.SendCustomMessageResponse
 */
export type SendCustomMessageResponse = Message<"lnrpc.SendCustomMessageResponse"> & {};
/**
 * Describes the message lnrpc.SendCustomMessageResponse.
 * Use `create(SendCustomMessageResponseSchema)` to create a new message.
 */
export declare const SendCustomMessageResponseSchema: GenMessage<SendCustomMessageResponse>;
/**
 * @generated from message lnrpc.Utxo
 */
export type Utxo = Message<"lnrpc.Utxo"> & {
    /**
     * The type of address
     *
     * @generated from field: lnrpc.AddressType address_type = 1;
     */
    addressType: AddressType;
    /**
     * The address
     *
     * @generated from field: string address = 2;
     */
    address: string;
    /**
     * The value of the unspent coin in satoshis
     *
     * @generated from field: int64 amount_sat = 3;
     */
    amountSat: bigint;
    /**
     * The pkscript in hex
     *
     * @generated from field: string pk_script = 4;
     */
    pkScript: string;
    /**
     * The outpoint in format txid:n
     *
     * @generated from field: lnrpc.OutPoint outpoint = 5;
     */
    outpoint?: OutPoint;
    /**
     * The number of confirmations for the Utxo
     *
     * @generated from field: int64 confirmations = 6;
     */
    confirmations: bigint;
};
/**
 * Describes the message lnrpc.Utxo.
 * Use `create(UtxoSchema)` to create a new message.
 */
export declare const UtxoSchema: GenMessage<Utxo>;
/**
 * @generated from message lnrpc.OutputDetail
 */
export type OutputDetail = Message<"lnrpc.OutputDetail"> & {
    /**
     * The type of the output
     *
     * @generated from field: lnrpc.OutputScriptType output_type = 1;
     */
    outputType: OutputScriptType;
    /**
     * The address
     *
     * @generated from field: string address = 2;
     */
    address: string;
    /**
     * The pkscript in hex
     *
     * @generated from field: string pk_script = 3;
     */
    pkScript: string;
    /**
     * The output index used in the raw transaction
     *
     * @generated from field: int64 output_index = 4;
     */
    outputIndex: bigint;
    /**
     * The value of the output coin in satoshis
     *
     * @generated from field: int64 amount = 5;
     */
    amount: bigint;
    /**
     * Denotes if the output is controlled by the internal wallet
     *
     * @generated from field: bool is_our_address = 6;
     */
    isOurAddress: boolean;
};
/**
 * Describes the message lnrpc.OutputDetail.
 * Use `create(OutputDetailSchema)` to create a new message.
 */
export declare const OutputDetailSchema: GenMessage<OutputDetail>;
/**
 * @generated from message lnrpc.Transaction
 */
export type Transaction = Message<"lnrpc.Transaction"> & {
    /**
     * The transaction hash
     *
     * @generated from field: string tx_hash = 1;
     */
    txHash: string;
    /**
     * The transaction amount, denominated in satoshis
     *
     * @generated from field: int64 amount = 2;
     */
    amount: bigint;
    /**
     * The number of confirmations
     *
     * @generated from field: int32 num_confirmations = 3;
     */
    numConfirmations: number;
    /**
     * The hash of the block this transaction was included in
     *
     * @generated from field: string block_hash = 4;
     */
    blockHash: string;
    /**
     * The height of the block this transaction was included in
     *
     * @generated from field: int32 block_height = 5;
     */
    blockHeight: number;
    /**
     * Timestamp of this transaction
     *
     * @generated from field: int64 time_stamp = 6;
     */
    timeStamp: bigint;
    /**
     * Fees paid for this transaction
     *
     * @generated from field: int64 total_fees = 7;
     */
    totalFees: bigint;
    /**
     * Addresses that received funds for this transaction. Deprecated as it is
     * now incorporated in the output_details field.
     *
     * @generated from field: repeated string dest_addresses = 8 [deprecated = true];
     * @deprecated
     */
    destAddresses: string[];
    /**
     * Outputs that received funds for this transaction
     *
     * @generated from field: repeated lnrpc.OutputDetail output_details = 11;
     */
    outputDetails: OutputDetail[];
    /**
     * The raw transaction hex.
     *
     * @generated from field: string raw_tx_hex = 9;
     */
    rawTxHex: string;
    /**
     * A label that was optionally set on transaction broadcast.
     *
     * @generated from field: string label = 10;
     */
    label: string;
    /**
     * PreviousOutpoints/Inputs of this transaction.
     *
     * @generated from field: repeated lnrpc.PreviousOutPoint previous_outpoints = 12;
     */
    previousOutpoints: PreviousOutPoint[];
};
/**
 * Describes the message lnrpc.Transaction.
 * Use `create(TransactionSchema)` to create a new message.
 */
export declare const TransactionSchema: GenMessage<Transaction>;
/**
 * @generated from message lnrpc.GetTransactionsRequest
 */
export type GetTransactionsRequest = Message<"lnrpc.GetTransactionsRequest"> & {
    /**
     *
     * The height from which to list transactions, inclusive. If this value is
     * greater than end_height, transactions will be read in reverse.
     *
     * @generated from field: int32 start_height = 1;
     */
    startHeight: number;
    /**
     *
     * The height until which to list transactions, inclusive. To include
     * unconfirmed transactions, this value should be set to -1, which will
     * return transactions from start_height until the current chain tip and
     * unconfirmed transactions. If no end_height is provided, the call will
     * default to this option.
     *
     * @generated from field: int32 end_height = 2;
     */
    endHeight: number;
    /**
     * An optional filter to only include transactions relevant to an account.
     *
     * @generated from field: string account = 3;
     */
    account: string;
};
/**
 * Describes the message lnrpc.GetTransactionsRequest.
 * Use `create(GetTransactionsRequestSchema)` to create a new message.
 */
export declare const GetTransactionsRequestSchema: GenMessage<GetTransactionsRequest>;
/**
 * @generated from message lnrpc.TransactionDetails
 */
export type TransactionDetails = Message<"lnrpc.TransactionDetails"> & {
    /**
     * The list of transactions relevant to the wallet.
     *
     * @generated from field: repeated lnrpc.Transaction transactions = 1;
     */
    transactions: Transaction[];
};
/**
 * Describes the message lnrpc.TransactionDetails.
 * Use `create(TransactionDetailsSchema)` to create a new message.
 */
export declare const TransactionDetailsSchema: GenMessage<TransactionDetails>;
/**
 * @generated from message lnrpc.FeeLimit
 */
export type FeeLimit = Message<"lnrpc.FeeLimit"> & {
    /**
     * @generated from oneof lnrpc.FeeLimit.limit
     */
    limit: {
        /**
         *
         * The fee limit expressed as a fixed amount of satoshis.
         *
         * The fields fixed and fixed_msat are mutually exclusive.
         *
         * @generated from field: int64 fixed = 1;
         */
        value: bigint;
        case: "fixed";
    } | {
        /**
         *
         * The fee limit expressed as a fixed amount of millisatoshis.
         *
         * The fields fixed and fixed_msat are mutually exclusive.
         *
         * @generated from field: int64 fixed_msat = 3;
         */
        value: bigint;
        case: "fixedMsat";
    } | {
        /**
         * The fee limit expressed as a percentage of the payment amount.
         *
         * @generated from field: int64 percent = 2;
         */
        value: bigint;
        case: "percent";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message lnrpc.FeeLimit.
 * Use `create(FeeLimitSchema)` to create a new message.
 */
export declare const FeeLimitSchema: GenMessage<FeeLimit>;
/**
 * @generated from message lnrpc.SendRequest
 */
export type SendRequest = Message<"lnrpc.SendRequest"> & {
    /**
     *
     * The identity pubkey of the payment recipient. When using REST, this field
     * must be encoded as base64.
     *
     * @generated from field: bytes dest = 1;
     */
    dest: Uint8Array;
    /**
     *
     * The hex-encoded identity pubkey of the payment recipient. Deprecated now
     * that the REST gateway supports base64 encoding of bytes fields.
     *
     * @generated from field: string dest_string = 2 [deprecated = true];
     * @deprecated
     */
    destString: string;
    /**
     *
     * The amount to send expressed in satoshis.
     *
     * The fields amt and amt_msat are mutually exclusive.
     *
     * @generated from field: int64 amt = 3;
     */
    amt: bigint;
    /**
     *
     * The amount to send expressed in millisatoshis.
     *
     * The fields amt and amt_msat are mutually exclusive.
     *
     * @generated from field: int64 amt_msat = 12;
     */
    amtMsat: bigint;
    /**
     *
     * The hash to use within the payment's HTLC. When using REST, this field
     * must be encoded as base64.
     *
     * @generated from field: bytes payment_hash = 4;
     */
    paymentHash: Uint8Array;
    /**
     *
     * The hex-encoded hash to use within the payment's HTLC. Deprecated now
     * that the REST gateway supports base64 encoding of bytes fields.
     *
     * @generated from field: string payment_hash_string = 5 [deprecated = true];
     * @deprecated
     */
    paymentHashString: string;
    /**
     *
     * A bare-bones invoice for a payment within the Lightning Network. With the
     * details of the invoice, the sender has all the data necessary to send a
     * payment to the recipient.
     *
     * @generated from field: string payment_request = 6;
     */
    paymentRequest: string;
    /**
     *
     * The CLTV delta from the current height that should be used to set the
     * timelock for the final hop.
     *
     * @generated from field: int32 final_cltv_delta = 7;
     */
    finalCltvDelta: number;
    /**
     *
     * The maximum number of satoshis that will be paid as a fee of the payment.
     * This value can be represented either as a percentage of the amount being
     * sent, or as a fixed amount of the maximum fee the user is willing the pay to
     * send the payment. If not specified, lnd will use a default value of 100%
     * fees for small amounts (<=1k sat) or 5% fees for larger amounts.
     *
     * @generated from field: lnrpc.FeeLimit fee_limit = 8;
     */
    feeLimit?: FeeLimit;
    /**
     *
     * The channel id of the channel that must be taken to the first hop. If zero,
     * any channel may be used.
     *
     * @generated from field: uint64 outgoing_chan_id = 9 [jstype = JS_STRING];
     */
    outgoingChanId: string;
    /**
     *
     * The pubkey of the last hop of the route. If empty, any hop may be used.
     *
     * @generated from field: bytes last_hop_pubkey = 13;
     */
    lastHopPubkey: Uint8Array;
    /**
     *
     * An optional maximum total time lock for the route. This should not exceed
     * lnd's `--max-cltv-expiry` setting. If zero, then the value of
     * `--max-cltv-expiry` is enforced.
     *
     * @generated from field: uint32 cltv_limit = 10;
     */
    cltvLimit: number;
    /**
     *
     * An optional field that can be used to pass an arbitrary set of TLV records
     * to a peer which understands the new records. This can be used to pass
     * application specific data during the payment attempt. Record types are
     * required to be in the custom range >= 65536. When using REST, the values
     * must be encoded as base64.
     *
     * @generated from field: map<uint64, bytes> dest_custom_records = 11;
     */
    destCustomRecords: {
        [key: string]: Uint8Array;
    };
    /**
     * If set, circular payments to self are permitted.
     *
     * @generated from field: bool allow_self_payment = 14;
     */
    allowSelfPayment: boolean;
    /**
     *
     * Features assumed to be supported by the final node. All transitive feature
     * dependencies must also be set properly. For a given feature bit pair, either
     * optional or remote may be set, but not both. If this field is nil or empty,
     * the router will try to load destination features from the graph as a
     * fallback.
     *
     * @generated from field: repeated lnrpc.FeatureBit dest_features = 15;
     */
    destFeatures: FeatureBit[];
    /**
     *
     * The payment address of the generated invoice.
     *
     * @generated from field: bytes payment_addr = 16;
     */
    paymentAddr: Uint8Array;
};
/**
 * Describes the message lnrpc.SendRequest.
 * Use `create(SendRequestSchema)` to create a new message.
 */
export declare const SendRequestSchema: GenMessage<SendRequest>;
/**
 * @generated from message lnrpc.SendResponse
 */
export type SendResponse = Message<"lnrpc.SendResponse"> & {
    /**
     * @generated from field: string payment_error = 1;
     */
    paymentError: string;
    /**
     * @generated from field: bytes payment_preimage = 2;
     */
    paymentPreimage: Uint8Array;
    /**
     * @generated from field: lnrpc.Route payment_route = 3;
     */
    paymentRoute?: Route;
    /**
     * @generated from field: bytes payment_hash = 4;
     */
    paymentHash: Uint8Array;
};
/**
 * Describes the message lnrpc.SendResponse.
 * Use `create(SendResponseSchema)` to create a new message.
 */
export declare const SendResponseSchema: GenMessage<SendResponse>;
/**
 * @generated from message lnrpc.SendToRouteRequest
 */
export type SendToRouteRequest = Message<"lnrpc.SendToRouteRequest"> & {
    /**
     *
     * The payment hash to use for the HTLC. When using REST, this field must be
     * encoded as base64.
     *
     * @generated from field: bytes payment_hash = 1;
     */
    paymentHash: Uint8Array;
    /**
     *
     * An optional hex-encoded payment hash to be used for the HTLC. Deprecated now
     * that the REST gateway supports base64 encoding of bytes fields.
     *
     * @generated from field: string payment_hash_string = 2 [deprecated = true];
     * @deprecated
     */
    paymentHashString: string;
    /**
     * Route that should be used to attempt to complete the payment.
     *
     * @generated from field: lnrpc.Route route = 4;
     */
    route?: Route;
};
/**
 * Describes the message lnrpc.SendToRouteRequest.
 * Use `create(SendToRouteRequestSchema)` to create a new message.
 */
export declare const SendToRouteRequestSchema: GenMessage<SendToRouteRequest>;
/**
 * @generated from message lnrpc.ChannelAcceptRequest
 */
export type ChannelAcceptRequest = Message<"lnrpc.ChannelAcceptRequest"> & {
    /**
     * The pubkey of the node that wishes to open an inbound channel.
     *
     * @generated from field: bytes node_pubkey = 1;
     */
    nodePubkey: Uint8Array;
    /**
     * The hash of the genesis block that the proposed channel resides in.
     *
     * @generated from field: bytes chain_hash = 2;
     */
    chainHash: Uint8Array;
    /**
     * The pending channel id.
     *
     * @generated from field: bytes pending_chan_id = 3;
     */
    pendingChanId: Uint8Array;
    /**
     * The funding amount in satoshis that initiator wishes to use in the
     * channel.
     *
     * @generated from field: uint64 funding_amt = 4;
     */
    fundingAmt: bigint;
    /**
     * The push amount of the proposed channel in millisatoshis.
     *
     * @generated from field: uint64 push_amt = 5;
     */
    pushAmt: bigint;
    /**
     * The dust limit of the initiator's commitment tx.
     *
     * @generated from field: uint64 dust_limit = 6;
     */
    dustLimit: bigint;
    /**
     * The maximum amount of coins in millisatoshis that can be pending in this
     * channel.
     *
     * @generated from field: uint64 max_value_in_flight = 7;
     */
    maxValueInFlight: bigint;
    /**
     * The minimum amount of satoshis the initiator requires us to have at all
     * times.
     *
     * @generated from field: uint64 channel_reserve = 8;
     */
    channelReserve: bigint;
    /**
     * The smallest HTLC in millisatoshis that the initiator will accept.
     *
     * @generated from field: uint64 min_htlc = 9;
     */
    minHtlc: bigint;
    /**
     * The initial fee rate that the initiator suggests for both commitment
     * transactions.
     *
     * @generated from field: uint64 fee_per_kw = 10;
     */
    feePerKw: bigint;
    /**
     *
     * The number of blocks to use for the relative time lock in the pay-to-self
     * output of both commitment transactions.
     *
     * @generated from field: uint32 csv_delay = 11;
     */
    csvDelay: number;
    /**
     * The total number of incoming HTLC's that the initiator will accept.
     *
     * @generated from field: uint32 max_accepted_htlcs = 12;
     */
    maxAcceptedHtlcs: number;
    /**
     * A bit-field which the initiator uses to specify proposed channel
     * behavior.
     *
     * @generated from field: uint32 channel_flags = 13;
     */
    channelFlags: number;
    /**
     * The commitment type the initiator wishes to use for the proposed channel.
     *
     * @generated from field: lnrpc.CommitmentType commitment_type = 14;
     */
    commitmentType: CommitmentType;
    /**
     * Whether the initiator wants to open a zero-conf channel via the channel
     * type.
     *
     * @generated from field: bool wants_zero_conf = 15;
     */
    wantsZeroConf: boolean;
    /**
     * Whether the initiator wants to use the scid-alias channel type. This is
     * separate from the feature bit.
     *
     * @generated from field: bool wants_scid_alias = 16;
     */
    wantsScidAlias: boolean;
};
/**
 * Describes the message lnrpc.ChannelAcceptRequest.
 * Use `create(ChannelAcceptRequestSchema)` to create a new message.
 */
export declare const ChannelAcceptRequestSchema: GenMessage<ChannelAcceptRequest>;
/**
 * @generated from message lnrpc.ChannelAcceptResponse
 */
export type ChannelAcceptResponse = Message<"lnrpc.ChannelAcceptResponse"> & {
    /**
     * Whether or not the client accepts the channel.
     *
     * @generated from field: bool accept = 1;
     */
    accept: boolean;
    /**
     * The pending channel id to which this response applies.
     *
     * @generated from field: bytes pending_chan_id = 2;
     */
    pendingChanId: Uint8Array;
    /**
     *
     * An optional error to send the initiating party to indicate why the channel
     * was rejected. This field *should not* contain sensitive information, it will
     * be sent to the initiating party. This field should only be set if accept is
     * false, the channel will be rejected if an error is set with accept=true
     * because the meaning of this response is ambiguous. Limited to 500
     * characters.
     *
     * @generated from field: string error = 3;
     */
    error: string;
    /**
     *
     * The upfront shutdown address to use if the initiating peer supports option
     * upfront shutdown script (see ListPeers for the features supported). Note
     * that the channel open will fail if this value is set for a peer that does
     * not support this feature bit.
     *
     * @generated from field: string upfront_shutdown = 4;
     */
    upfrontShutdown: string;
    /**
     *
     * The csv delay (in blocks) that we require for the remote party.
     *
     * @generated from field: uint32 csv_delay = 5;
     */
    csvDelay: number;
    /**
     *
     * The reserve amount in satoshis that we require the remote peer to adhere to.
     * We require that the remote peer always have some reserve amount allocated to
     * them so that there is always a disincentive to broadcast old state (if they
     * hold 0 sats on their side of the channel, there is nothing to lose).
     *
     * @generated from field: uint64 reserve_sat = 6;
     */
    reserveSat: bigint;
    /**
     *
     * The maximum amount of funds in millisatoshis that we allow the remote peer
     * to have in outstanding htlcs.
     *
     * @generated from field: uint64 in_flight_max_msat = 7;
     */
    inFlightMaxMsat: bigint;
    /**
     *
     * The maximum number of htlcs that the remote peer can offer us.
     *
     * @generated from field: uint32 max_htlc_count = 8;
     */
    maxHtlcCount: number;
    /**
     *
     * The minimum value in millisatoshis for incoming htlcs on the channel.
     *
     * @generated from field: uint64 min_htlc_in = 9;
     */
    minHtlcIn: bigint;
    /**
     *
     * The number of confirmations we require before we consider the channel open.
     *
     * @generated from field: uint32 min_accept_depth = 10;
     */
    minAcceptDepth: number;
    /**
     *
     * Whether the responder wants this to be a zero-conf channel. This will fail
     * if either side does not have the scid-alias feature bit set. The minimum
     * depth field must be zero if this is true.
     *
     * @generated from field: bool zero_conf = 11;
     */
    zeroConf: boolean;
};
/**
 * Describes the message lnrpc.ChannelAcceptResponse.
 * Use `create(ChannelAcceptResponseSchema)` to create a new message.
 */
export declare const ChannelAcceptResponseSchema: GenMessage<ChannelAcceptResponse>;
/**
 * @generated from message lnrpc.ChannelPoint
 */
export type ChannelPoint = Message<"lnrpc.ChannelPoint"> & {
    /**
     * @generated from oneof lnrpc.ChannelPoint.funding_txid
     */
    fundingTxid: {
        /**
         *
         * Txid of the funding transaction. When using REST, this field must be
         * encoded as base64.
         *
         * @generated from field: bytes funding_txid_bytes = 1;
         */
        value: Uint8Array;
        case: "fundingTxidBytes";
    } | {
        /**
         *
         * Hex-encoded string representing the byte-reversed hash of the funding
         * transaction.
         *
         * @generated from field: string funding_txid_str = 2;
         */
        value: string;
        case: "fundingTxidStr";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * The index of the output of the funding transaction
     *
     * @generated from field: uint32 output_index = 3;
     */
    outputIndex: number;
};
/**
 * Describes the message lnrpc.ChannelPoint.
 * Use `create(ChannelPointSchema)` to create a new message.
 */
export declare const ChannelPointSchema: GenMessage<ChannelPoint>;
/**
 * @generated from message lnrpc.OutPoint
 */
export type OutPoint = Message<"lnrpc.OutPoint"> & {
    /**
     * Raw bytes representing the transaction id.
     *
     * @generated from field: bytes txid_bytes = 1;
     */
    txidBytes: Uint8Array;
    /**
     * Reversed, hex-encoded string representing the transaction id.
     *
     * @generated from field: string txid_str = 2;
     */
    txidStr: string;
    /**
     * The index of the output on the transaction.
     *
     * @generated from field: uint32 output_index = 3;
     */
    outputIndex: number;
};
/**
 * Describes the message lnrpc.OutPoint.
 * Use `create(OutPointSchema)` to create a new message.
 */
export declare const OutPointSchema: GenMessage<OutPoint>;
/**
 * @generated from message lnrpc.PreviousOutPoint
 */
export type PreviousOutPoint = Message<"lnrpc.PreviousOutPoint"> & {
    /**
     * The outpoint in format txid:n.
     *
     * @generated from field: string outpoint = 1;
     */
    outpoint: string;
    /**
     * Denotes if the outpoint is controlled by the internal wallet.
     * The flag will only detect p2wkh, np2wkh and p2tr inputs as its own.
     *
     * @generated from field: bool is_our_output = 2;
     */
    isOurOutput: boolean;
};
/**
 * Describes the message lnrpc.PreviousOutPoint.
 * Use `create(PreviousOutPointSchema)` to create a new message.
 */
export declare const PreviousOutPointSchema: GenMessage<PreviousOutPoint>;
/**
 * @generated from message lnrpc.LightningAddress
 */
export type LightningAddress = Message<"lnrpc.LightningAddress"> & {
    /**
     * The identity pubkey of the Lightning node.
     *
     * @generated from field: string pubkey = 1;
     */
    pubkey: string;
    /**
     * The network location of the lightning node, e.g. `69.69.69.69:1337` or
     * `localhost:10011`.
     *
     * @generated from field: string host = 2;
     */
    host: string;
};
/**
 * Describes the message lnrpc.LightningAddress.
 * Use `create(LightningAddressSchema)` to create a new message.
 */
export declare const LightningAddressSchema: GenMessage<LightningAddress>;
/**
 * @generated from message lnrpc.EstimateFeeRequest
 */
export type EstimateFeeRequest = Message<"lnrpc.EstimateFeeRequest"> & {
    /**
     * The map from addresses to amounts for the transaction.
     *
     * @generated from field: map<string, int64> AddrToAmount = 1;
     */
    AddrToAmount: {
        [key: string]: bigint;
    };
    /**
     * The target number of blocks that this transaction should be confirmed
     * by.
     *
     * @generated from field: int32 target_conf = 2;
     */
    targetConf: number;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the transaction must satisfy.
     *
     * @generated from field: int32 min_confs = 3;
     */
    minConfs: number;
    /**
     * Whether unconfirmed outputs should be used as inputs for the transaction.
     *
     * @generated from field: bool spend_unconfirmed = 4;
     */
    spendUnconfirmed: boolean;
};
/**
 * Describes the message lnrpc.EstimateFeeRequest.
 * Use `create(EstimateFeeRequestSchema)` to create a new message.
 */
export declare const EstimateFeeRequestSchema: GenMessage<EstimateFeeRequest>;
/**
 * @generated from message lnrpc.EstimateFeeResponse
 */
export type EstimateFeeResponse = Message<"lnrpc.EstimateFeeResponse"> & {
    /**
     * The total fee in satoshis.
     *
     * @generated from field: int64 fee_sat = 1;
     */
    feeSat: bigint;
    /**
     * Deprecated, use sat_per_vbyte.
     * The fee rate in satoshi/vbyte.
     *
     * @generated from field: int64 feerate_sat_per_byte = 2 [deprecated = true];
     * @deprecated
     */
    feerateSatPerByte: bigint;
    /**
     * The fee rate in satoshi/vbyte.
     *
     * @generated from field: uint64 sat_per_vbyte = 3;
     */
    satPerVbyte: bigint;
};
/**
 * Describes the message lnrpc.EstimateFeeResponse.
 * Use `create(EstimateFeeResponseSchema)` to create a new message.
 */
export declare const EstimateFeeResponseSchema: GenMessage<EstimateFeeResponse>;
/**
 * @generated from message lnrpc.SendManyRequest
 */
export type SendManyRequest = Message<"lnrpc.SendManyRequest"> & {
    /**
     * The map from addresses to amounts
     *
     * @generated from field: map<string, int64> AddrToAmount = 1;
     */
    AddrToAmount: {
        [key: string]: bigint;
    };
    /**
     * The target number of blocks that this transaction should be confirmed
     * by.
     *
     * @generated from field: int32 target_conf = 3;
     */
    targetConf: number;
    /**
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * transaction.
     *
     * @generated from field: uint64 sat_per_vbyte = 4;
     */
    satPerVbyte: bigint;
    /**
     * Deprecated, use sat_per_vbyte.
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * transaction.
     *
     * @generated from field: int64 sat_per_byte = 5 [deprecated = true];
     * @deprecated
     */
    satPerByte: bigint;
    /**
     * An optional label for the transaction, limited to 500 characters.
     *
     * @generated from field: string label = 6;
     */
    label: string;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the transaction must satisfy.
     *
     * @generated from field: int32 min_confs = 7;
     */
    minConfs: number;
    /**
     * Whether unconfirmed outputs should be used as inputs for the transaction.
     *
     * @generated from field: bool spend_unconfirmed = 8;
     */
    spendUnconfirmed: boolean;
};
/**
 * Describes the message lnrpc.SendManyRequest.
 * Use `create(SendManyRequestSchema)` to create a new message.
 */
export declare const SendManyRequestSchema: GenMessage<SendManyRequest>;
/**
 * @generated from message lnrpc.SendManyResponse
 */
export type SendManyResponse = Message<"lnrpc.SendManyResponse"> & {
    /**
     * The id of the transaction
     *
     * @generated from field: string txid = 1;
     */
    txid: string;
};
/**
 * Describes the message lnrpc.SendManyResponse.
 * Use `create(SendManyResponseSchema)` to create a new message.
 */
export declare const SendManyResponseSchema: GenMessage<SendManyResponse>;
/**
 * @generated from message lnrpc.SendCoinsRequest
 */
export type SendCoinsRequest = Message<"lnrpc.SendCoinsRequest"> & {
    /**
     * The address to send coins to
     *
     * @generated from field: string addr = 1;
     */
    addr: string;
    /**
     * The amount in satoshis to send
     *
     * @generated from field: int64 amount = 2;
     */
    amount: bigint;
    /**
     * The target number of blocks that this transaction should be confirmed
     * by.
     *
     * @generated from field: int32 target_conf = 3;
     */
    targetConf: number;
    /**
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * transaction.
     *
     * @generated from field: uint64 sat_per_vbyte = 4;
     */
    satPerVbyte: bigint;
    /**
     * Deprecated, use sat_per_vbyte.
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * transaction.
     *
     * @generated from field: int64 sat_per_byte = 5 [deprecated = true];
     * @deprecated
     */
    satPerByte: bigint;
    /**
     *
     * If set, then the amount field will be ignored, and lnd will attempt to
     * send all the coins under control of the internal wallet to the specified
     * address.
     *
     * @generated from field: bool send_all = 6;
     */
    sendAll: boolean;
    /**
     * An optional label for the transaction, limited to 500 characters.
     *
     * @generated from field: string label = 7;
     */
    label: string;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the transaction must satisfy.
     *
     * @generated from field: int32 min_confs = 8;
     */
    minConfs: number;
    /**
     * Whether unconfirmed outputs should be used as inputs for the transaction.
     *
     * @generated from field: bool spend_unconfirmed = 9;
     */
    spendUnconfirmed: boolean;
};
/**
 * Describes the message lnrpc.SendCoinsRequest.
 * Use `create(SendCoinsRequestSchema)` to create a new message.
 */
export declare const SendCoinsRequestSchema: GenMessage<SendCoinsRequest>;
/**
 * @generated from message lnrpc.SendCoinsResponse
 */
export type SendCoinsResponse = Message<"lnrpc.SendCoinsResponse"> & {
    /**
     * The transaction ID of the transaction
     *
     * @generated from field: string txid = 1;
     */
    txid: string;
};
/**
 * Describes the message lnrpc.SendCoinsResponse.
 * Use `create(SendCoinsResponseSchema)` to create a new message.
 */
export declare const SendCoinsResponseSchema: GenMessage<SendCoinsResponse>;
/**
 * @generated from message lnrpc.ListUnspentRequest
 */
export type ListUnspentRequest = Message<"lnrpc.ListUnspentRequest"> & {
    /**
     * The minimum number of confirmations to be included.
     *
     * @generated from field: int32 min_confs = 1;
     */
    minConfs: number;
    /**
     * The maximum number of confirmations to be included.
     *
     * @generated from field: int32 max_confs = 2;
     */
    maxConfs: number;
    /**
     * An optional filter to only include outputs belonging to an account.
     *
     * @generated from field: string account = 3;
     */
    account: string;
};
/**
 * Describes the message lnrpc.ListUnspentRequest.
 * Use `create(ListUnspentRequestSchema)` to create a new message.
 */
export declare const ListUnspentRequestSchema: GenMessage<ListUnspentRequest>;
/**
 * @generated from message lnrpc.ListUnspentResponse
 */
export type ListUnspentResponse = Message<"lnrpc.ListUnspentResponse"> & {
    /**
     * A list of utxos
     *
     * @generated from field: repeated lnrpc.Utxo utxos = 1;
     */
    utxos: Utxo[];
};
/**
 * Describes the message lnrpc.ListUnspentResponse.
 * Use `create(ListUnspentResponseSchema)` to create a new message.
 */
export declare const ListUnspentResponseSchema: GenMessage<ListUnspentResponse>;
/**
 * @generated from message lnrpc.NewAddressRequest
 */
export type NewAddressRequest = Message<"lnrpc.NewAddressRequest"> & {
    /**
     * The type of address to generate.
     *
     * @generated from field: lnrpc.AddressType type = 1;
     */
    type: AddressType;
    /**
     *
     * The name of the account to generate a new address for. If empty, the
     * default wallet account is used.
     *
     * @generated from field: string account = 2;
     */
    account: string;
};
/**
 * Describes the message lnrpc.NewAddressRequest.
 * Use `create(NewAddressRequestSchema)` to create a new message.
 */
export declare const NewAddressRequestSchema: GenMessage<NewAddressRequest>;
/**
 * @generated from message lnrpc.NewAddressResponse
 */
export type NewAddressResponse = Message<"lnrpc.NewAddressResponse"> & {
    /**
     * The newly generated wallet address
     *
     * @generated from field: string address = 1;
     */
    address: string;
};
/**
 * Describes the message lnrpc.NewAddressResponse.
 * Use `create(NewAddressResponseSchema)` to create a new message.
 */
export declare const NewAddressResponseSchema: GenMessage<NewAddressResponse>;
/**
 * @generated from message lnrpc.SignMessageRequest
 */
export type SignMessageRequest = Message<"lnrpc.SignMessageRequest"> & {
    /**
     *
     * The message to be signed. When using REST, this field must be encoded as
     * base64.
     *
     * @generated from field: bytes msg = 1;
     */
    msg: Uint8Array;
    /**
     *
     * Instead of the default double-SHA256 hashing of the message before signing,
     * only use one round of hashing instead.
     *
     * @generated from field: bool single_hash = 2;
     */
    singleHash: boolean;
};
/**
 * Describes the message lnrpc.SignMessageRequest.
 * Use `create(SignMessageRequestSchema)` to create a new message.
 */
export declare const SignMessageRequestSchema: GenMessage<SignMessageRequest>;
/**
 * @generated from message lnrpc.SignMessageResponse
 */
export type SignMessageResponse = Message<"lnrpc.SignMessageResponse"> & {
    /**
     * The signature for the given message
     *
     * @generated from field: string signature = 1;
     */
    signature: string;
};
/**
 * Describes the message lnrpc.SignMessageResponse.
 * Use `create(SignMessageResponseSchema)` to create a new message.
 */
export declare const SignMessageResponseSchema: GenMessage<SignMessageResponse>;
/**
 * @generated from message lnrpc.VerifyMessageRequest
 */
export type VerifyMessageRequest = Message<"lnrpc.VerifyMessageRequest"> & {
    /**
     *
     * The message over which the signature is to be verified. When using REST,
     * this field must be encoded as base64.
     *
     * @generated from field: bytes msg = 1;
     */
    msg: Uint8Array;
    /**
     * The signature to be verified over the given message
     *
     * @generated from field: string signature = 2;
     */
    signature: string;
};
/**
 * Describes the message lnrpc.VerifyMessageRequest.
 * Use `create(VerifyMessageRequestSchema)` to create a new message.
 */
export declare const VerifyMessageRequestSchema: GenMessage<VerifyMessageRequest>;
/**
 * @generated from message lnrpc.VerifyMessageResponse
 */
export type VerifyMessageResponse = Message<"lnrpc.VerifyMessageResponse"> & {
    /**
     * Whether the signature was valid over the given message
     *
     * @generated from field: bool valid = 1;
     */
    valid: boolean;
    /**
     * The pubkey recovered from the signature
     *
     * @generated from field: string pubkey = 2;
     */
    pubkey: string;
};
/**
 * Describes the message lnrpc.VerifyMessageResponse.
 * Use `create(VerifyMessageResponseSchema)` to create a new message.
 */
export declare const VerifyMessageResponseSchema: GenMessage<VerifyMessageResponse>;
/**
 * @generated from message lnrpc.ConnectPeerRequest
 */
export type ConnectPeerRequest = Message<"lnrpc.ConnectPeerRequest"> & {
    /**
     *
     * Lightning address of the peer to connect to.
     *
     * @generated from field: lnrpc.LightningAddress addr = 1;
     */
    addr?: LightningAddress;
    /**
     *
     * If set, the daemon will attempt to persistently connect to the target
     * peer. Otherwise, the call will be synchronous.
     *
     * @generated from field: bool perm = 2;
     */
    perm: boolean;
    /**
     *
     * The connection timeout value (in seconds) for this request. It won't affect
     * other requests.
     *
     * @generated from field: uint64 timeout = 3;
     */
    timeout: bigint;
};
/**
 * Describes the message lnrpc.ConnectPeerRequest.
 * Use `create(ConnectPeerRequestSchema)` to create a new message.
 */
export declare const ConnectPeerRequestSchema: GenMessage<ConnectPeerRequest>;
/**
 * @generated from message lnrpc.ConnectPeerResponse
 */
export type ConnectPeerResponse = Message<"lnrpc.ConnectPeerResponse"> & {};
/**
 * Describes the message lnrpc.ConnectPeerResponse.
 * Use `create(ConnectPeerResponseSchema)` to create a new message.
 */
export declare const ConnectPeerResponseSchema: GenMessage<ConnectPeerResponse>;
/**
 * @generated from message lnrpc.DisconnectPeerRequest
 */
export type DisconnectPeerRequest = Message<"lnrpc.DisconnectPeerRequest"> & {
    /**
     * The pubkey of the node to disconnect from
     *
     * @generated from field: string pub_key = 1;
     */
    pubKey: string;
};
/**
 * Describes the message lnrpc.DisconnectPeerRequest.
 * Use `create(DisconnectPeerRequestSchema)` to create a new message.
 */
export declare const DisconnectPeerRequestSchema: GenMessage<DisconnectPeerRequest>;
/**
 * @generated from message lnrpc.DisconnectPeerResponse
 */
export type DisconnectPeerResponse = Message<"lnrpc.DisconnectPeerResponse"> & {};
/**
 * Describes the message lnrpc.DisconnectPeerResponse.
 * Use `create(DisconnectPeerResponseSchema)` to create a new message.
 */
export declare const DisconnectPeerResponseSchema: GenMessage<DisconnectPeerResponse>;
/**
 * @generated from message lnrpc.HTLC
 */
export type HTLC = Message<"lnrpc.HTLC"> & {
    /**
     * @generated from field: bool incoming = 1;
     */
    incoming: boolean;
    /**
     * @generated from field: int64 amount = 2;
     */
    amount: bigint;
    /**
     * @generated from field: bytes hash_lock = 3;
     */
    hashLock: Uint8Array;
    /**
     * @generated from field: uint32 expiration_height = 4;
     */
    expirationHeight: number;
    /**
     * Index identifying the htlc on the channel.
     *
     * @generated from field: uint64 htlc_index = 5;
     */
    htlcIndex: bigint;
    /**
     * If this HTLC is involved in a forwarding operation, this field indicates
     * the forwarding channel. For an outgoing htlc, it is the incoming channel.
     * For an incoming htlc, it is the outgoing channel. When the htlc
     * originates from this node or this node is the final destination,
     * forwarding_channel will be zero. The forwarding channel will also be zero
     * for htlcs that need to be forwarded but don't have a forwarding decision
     * persisted yet.
     *
     * @generated from field: uint64 forwarding_channel = 6;
     */
    forwardingChannel: bigint;
    /**
     * Index identifying the htlc on the forwarding channel.
     *
     * @generated from field: uint64 forwarding_htlc_index = 7;
     */
    forwardingHtlcIndex: bigint;
};
/**
 * Describes the message lnrpc.HTLC.
 * Use `create(HTLCSchema)` to create a new message.
 */
export declare const HTLCSchema: GenMessage<HTLC>;
/**
 * @generated from message lnrpc.ChannelConstraints
 */
export type ChannelConstraints = Message<"lnrpc.ChannelConstraints"> & {
    /**
     *
     * The CSV delay expressed in relative blocks. If the channel is force closed,
     * we will need to wait for this many blocks before we can regain our funds.
     *
     * @generated from field: uint32 csv_delay = 1;
     */
    csvDelay: number;
    /**
     * The minimum satoshis this node is required to reserve in its balance.
     *
     * @generated from field: uint64 chan_reserve_sat = 2;
     */
    chanReserveSat: bigint;
    /**
     * The dust limit (in satoshis) of the initiator's commitment tx.
     *
     * @generated from field: uint64 dust_limit_sat = 3;
     */
    dustLimitSat: bigint;
    /**
     * The maximum amount of coins in millisatoshis that can be pending in this
     * channel.
     *
     * @generated from field: uint64 max_pending_amt_msat = 4;
     */
    maxPendingAmtMsat: bigint;
    /**
     * The smallest HTLC in millisatoshis that the initiator will accept.
     *
     * @generated from field: uint64 min_htlc_msat = 5;
     */
    minHtlcMsat: bigint;
    /**
     * The total number of incoming HTLC's that the initiator will accept.
     *
     * @generated from field: uint32 max_accepted_htlcs = 6;
     */
    maxAcceptedHtlcs: number;
};
/**
 * Describes the message lnrpc.ChannelConstraints.
 * Use `create(ChannelConstraintsSchema)` to create a new message.
 */
export declare const ChannelConstraintsSchema: GenMessage<ChannelConstraints>;
/**
 * @generated from message lnrpc.Channel
 */
export type Channel = Message<"lnrpc.Channel"> & {
    /**
     * Whether this channel is active or not
     *
     * @generated from field: bool active = 1;
     */
    active: boolean;
    /**
     * The identity pubkey of the remote node
     *
     * @generated from field: string remote_pubkey = 2;
     */
    remotePubkey: string;
    /**
     *
     * The outpoint (txid:index) of the funding transaction. With this value, Bob
     * will be able to generate a signature for Alice's version of the commitment
     * transaction.
     *
     * @generated from field: string channel_point = 3;
     */
    channelPoint: string;
    /**
     *
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     *
     * @generated from field: uint64 chan_id = 4 [jstype = JS_STRING];
     */
    chanId: string;
    /**
     * The total amount of funds held in this channel
     *
     * @generated from field: int64 capacity = 5;
     */
    capacity: bigint;
    /**
     * This node's current balance in this channel
     *
     * @generated from field: int64 local_balance = 6;
     */
    localBalance: bigint;
    /**
     * The counterparty's current balance in this channel
     *
     * @generated from field: int64 remote_balance = 7;
     */
    remoteBalance: bigint;
    /**
     *
     * The amount calculated to be paid in fees for the current set of commitment
     * transactions. The fee amount is persisted with the channel in order to
     * allow the fee amount to be removed and recalculated with each channel state
     * update, including updates that happen after a system restart.
     *
     * @generated from field: int64 commit_fee = 8;
     */
    commitFee: bigint;
    /**
     * The weight of the commitment transaction
     *
     * @generated from field: int64 commit_weight = 9;
     */
    commitWeight: bigint;
    /**
     *
     * The required number of satoshis per kilo-weight that the requester will pay
     * at all times, for both the funding transaction and commitment transaction.
     * This value can later be updated once the channel is open.
     *
     * @generated from field: int64 fee_per_kw = 10;
     */
    feePerKw: bigint;
    /**
     * The unsettled balance in this channel
     *
     * @generated from field: int64 unsettled_balance = 11;
     */
    unsettledBalance: bigint;
    /**
     *
     * The total number of satoshis we've sent within this channel.
     *
     * @generated from field: int64 total_satoshis_sent = 12;
     */
    totalSatoshisSent: bigint;
    /**
     *
     * The total number of satoshis we've received within this channel.
     *
     * @generated from field: int64 total_satoshis_received = 13;
     */
    totalSatoshisReceived: bigint;
    /**
     *
     * The total number of updates conducted within this channel.
     *
     * @generated from field: uint64 num_updates = 14;
     */
    numUpdates: bigint;
    /**
     *
     * The list of active, uncleared HTLCs currently pending within the channel.
     *
     * @generated from field: repeated lnrpc.HTLC pending_htlcs = 15;
     */
    pendingHtlcs: HTLC[];
    /**
     *
     * Deprecated. The CSV delay expressed in relative blocks. If the channel is
     * force closed, we will need to wait for this many blocks before we can regain
     * our funds.
     *
     * @generated from field: uint32 csv_delay = 16 [deprecated = true];
     * @deprecated
     */
    csvDelay: number;
    /**
     * Whether this channel is advertised to the network or not.
     *
     * @generated from field: bool private = 17;
     */
    private: boolean;
    /**
     * True if we were the ones that created the channel.
     *
     * @generated from field: bool initiator = 18;
     */
    initiator: boolean;
    /**
     * A set of flags showing the current state of the channel.
     *
     * @generated from field: string chan_status_flags = 19;
     */
    chanStatusFlags: string;
    /**
     * Deprecated. The minimum satoshis this node is required to reserve in its
     * balance.
     *
     * @generated from field: int64 local_chan_reserve_sat = 20 [deprecated = true];
     * @deprecated
     */
    localChanReserveSat: bigint;
    /**
     *
     * Deprecated. The minimum satoshis the other node is required to reserve in
     * its balance.
     *
     * @generated from field: int64 remote_chan_reserve_sat = 21 [deprecated = true];
     * @deprecated
     */
    remoteChanReserveSat: bigint;
    /**
     * Deprecated. Use commitment_type.
     *
     * @generated from field: bool static_remote_key = 22 [deprecated = true];
     * @deprecated
     */
    staticRemoteKey: boolean;
    /**
     * The commitment type used by this channel.
     *
     * @generated from field: lnrpc.CommitmentType commitment_type = 26;
     */
    commitmentType: CommitmentType;
    /**
     *
     * The number of seconds that the channel has been monitored by the channel
     * scoring system. Scores are currently not persisted, so this value may be
     * less than the lifetime of the channel [EXPERIMENTAL].
     *
     * @generated from field: int64 lifetime = 23;
     */
    lifetime: bigint;
    /**
     *
     * The number of seconds that the remote peer has been observed as being online
     * by the channel scoring system over the lifetime of the channel
     * [EXPERIMENTAL].
     *
     * @generated from field: int64 uptime = 24;
     */
    uptime: bigint;
    /**
     *
     * Close address is the address that we will enforce payout to on cooperative
     * close if the channel was opened utilizing option upfront shutdown. This
     * value can be set on channel open by setting close_address in an open channel
     * request. If this value is not set, you can still choose a payout address by
     * cooperatively closing with the delivery_address field set.
     *
     * @generated from field: string close_address = 25;
     */
    closeAddress: string;
    /**
     *
     * The amount that the initiator of the channel optionally pushed to the remote
     * party on channel open. This amount will be zero if the channel initiator did
     * not push any funds to the remote peer. If the initiator field is true, we
     * pushed this amount to our peer, if it is false, the remote peer pushed this
     * amount to us.
     *
     * @generated from field: uint64 push_amount_sat = 27;
     */
    pushAmountSat: bigint;
    /**
     *
     * This uint32 indicates if this channel is to be considered 'frozen'. A
     * frozen channel doest not allow a cooperative channel close by the
     * initiator. The thaw_height is the height that this restriction stops
     * applying to the channel. This field is optional, not setting it or using a
     * value of zero will mean the channel has no additional restrictions. The
     * height can be interpreted in two ways: as a relative height if the value is
     * less than 500,000, or as an absolute height otherwise.
     *
     * @generated from field: uint32 thaw_height = 28;
     */
    thawHeight: number;
    /**
     * List constraints for the local node.
     *
     * @generated from field: lnrpc.ChannelConstraints local_constraints = 29;
     */
    localConstraints?: ChannelConstraints;
    /**
     * List constraints for the remote node.
     *
     * @generated from field: lnrpc.ChannelConstraints remote_constraints = 30;
     */
    remoteConstraints?: ChannelConstraints;
    /**
     *
     * This lists out the set of alias short channel ids that exist for a channel.
     * This may be empty.
     *
     * @generated from field: repeated uint64 alias_scids = 31;
     */
    aliasScids: bigint[];
    /**
     * Whether or not this is a zero-conf channel.
     *
     * @generated from field: bool zero_conf = 32;
     */
    zeroConf: boolean;
    /**
     * This is the confirmed / on-chain zero-conf SCID.
     *
     * @generated from field: uint64 zero_conf_confirmed_scid = 33;
     */
    zeroConfConfirmedScid: bigint;
    /**
     * The configured alias name of our peer.
     *
     * @generated from field: string peer_alias = 34;
     */
    peerAlias: string;
    /**
     * This is the peer SCID alias.
     *
     * @generated from field: uint64 peer_scid_alias = 35 [jstype = JS_STRING];
     */
    peerScidAlias: string;
    /**
     *
     * An optional note-to-self to go along with the channel containing some
     * useful information. This is only ever stored locally and in no way impacts
     * the channel's operation.
     *
     * @generated from field: string memo = 36;
     */
    memo: string;
};
/**
 * Describes the message lnrpc.Channel.
 * Use `create(ChannelSchema)` to create a new message.
 */
export declare const ChannelSchema: GenMessage<Channel>;
/**
 * @generated from message lnrpc.ListChannelsRequest
 */
export type ListChannelsRequest = Message<"lnrpc.ListChannelsRequest"> & {
    /**
     * @generated from field: bool active_only = 1;
     */
    activeOnly: boolean;
    /**
     * @generated from field: bool inactive_only = 2;
     */
    inactiveOnly: boolean;
    /**
     * @generated from field: bool public_only = 3;
     */
    publicOnly: boolean;
    /**
     * @generated from field: bool private_only = 4;
     */
    privateOnly: boolean;
    /**
     *
     * Filters the response for channels with a target peer's pubkey. If peer is
     * empty, all channels will be returned.
     *
     * @generated from field: bytes peer = 5;
     */
    peer: Uint8Array;
    /**
     * Informs the server if the peer alias lookup per channel should be
     * enabled. It is turned off by default in order to avoid degradation of
     * performance for existing clients.
     *
     * @generated from field: bool peer_alias_lookup = 6;
     */
    peerAliasLookup: boolean;
};
/**
 * Describes the message lnrpc.ListChannelsRequest.
 * Use `create(ListChannelsRequestSchema)` to create a new message.
 */
export declare const ListChannelsRequestSchema: GenMessage<ListChannelsRequest>;
/**
 * @generated from message lnrpc.ListChannelsResponse
 */
export type ListChannelsResponse = Message<"lnrpc.ListChannelsResponse"> & {
    /**
     * The list of active channels
     *
     * @generated from field: repeated lnrpc.Channel channels = 11;
     */
    channels: Channel[];
};
/**
 * Describes the message lnrpc.ListChannelsResponse.
 * Use `create(ListChannelsResponseSchema)` to create a new message.
 */
export declare const ListChannelsResponseSchema: GenMessage<ListChannelsResponse>;
/**
 * @generated from message lnrpc.AliasMap
 */
export type AliasMap = Message<"lnrpc.AliasMap"> & {
    /**
     *
     * For non-zero-conf channels, this is the confirmed SCID. Otherwise, this is
     * the first assigned "base" alias.
     *
     * @generated from field: uint64 base_scid = 1;
     */
    baseScid: bigint;
    /**
     * The set of all aliases stored for the base SCID.
     *
     * @generated from field: repeated uint64 aliases = 2;
     */
    aliases: bigint[];
};
/**
 * Describes the message lnrpc.AliasMap.
 * Use `create(AliasMapSchema)` to create a new message.
 */
export declare const AliasMapSchema: GenMessage<AliasMap>;
/**
 * @generated from message lnrpc.ListAliasesRequest
 */
export type ListAliasesRequest = Message<"lnrpc.ListAliasesRequest"> & {};
/**
 * Describes the message lnrpc.ListAliasesRequest.
 * Use `create(ListAliasesRequestSchema)` to create a new message.
 */
export declare const ListAliasesRequestSchema: GenMessage<ListAliasesRequest>;
/**
 * @generated from message lnrpc.ListAliasesResponse
 */
export type ListAliasesResponse = Message<"lnrpc.ListAliasesResponse"> & {
    /**
     * @generated from field: repeated lnrpc.AliasMap alias_maps = 1;
     */
    aliasMaps: AliasMap[];
};
/**
 * Describes the message lnrpc.ListAliasesResponse.
 * Use `create(ListAliasesResponseSchema)` to create a new message.
 */
export declare const ListAliasesResponseSchema: GenMessage<ListAliasesResponse>;
/**
 * @generated from message lnrpc.ChannelCloseSummary
 */
export type ChannelCloseSummary = Message<"lnrpc.ChannelCloseSummary"> & {
    /**
     * The outpoint (txid:index) of the funding transaction.
     *
     * @generated from field: string channel_point = 1;
     */
    channelPoint: string;
    /**
     *  The unique channel ID for the channel.
     *
     * @generated from field: uint64 chan_id = 2 [jstype = JS_STRING];
     */
    chanId: string;
    /**
     * The hash of the genesis block that this channel resides within.
     *
     * @generated from field: string chain_hash = 3;
     */
    chainHash: string;
    /**
     * The txid of the transaction which ultimately closed this channel.
     *
     * @generated from field: string closing_tx_hash = 4;
     */
    closingTxHash: string;
    /**
     * Public key of the remote peer that we formerly had a channel with.
     *
     * @generated from field: string remote_pubkey = 5;
     */
    remotePubkey: string;
    /**
     * Total capacity of the channel.
     *
     * @generated from field: int64 capacity = 6;
     */
    capacity: bigint;
    /**
     * Height at which the funding transaction was spent.
     *
     * @generated from field: uint32 close_height = 7;
     */
    closeHeight: number;
    /**
     * Settled balance at the time of channel closure
     *
     * @generated from field: int64 settled_balance = 8;
     */
    settledBalance: bigint;
    /**
     * The sum of all the time-locked outputs at the time of channel closure
     *
     * @generated from field: int64 time_locked_balance = 9;
     */
    timeLockedBalance: bigint;
    /**
     * Details on how the channel was closed.
     *
     * @generated from field: lnrpc.ChannelCloseSummary.ClosureType close_type = 10;
     */
    closeType: ChannelCloseSummary_ClosureType;
    /**
     *
     * Open initiator is the party that initiated opening the channel. Note that
     * this value may be unknown if the channel was closed before we migrated to
     * store open channel information after close.
     *
     * @generated from field: lnrpc.Initiator open_initiator = 11;
     */
    openInitiator: Initiator;
    /**
     *
     * Close initiator indicates which party initiated the close. This value will
     * be unknown for channels that were cooperatively closed before we started
     * tracking cooperative close initiators. Note that this indicates which party
     * initiated a close, and it is possible for both to initiate cooperative or
     * force closes, although only one party's close will be confirmed on chain.
     *
     * @generated from field: lnrpc.Initiator close_initiator = 12;
     */
    closeInitiator: Initiator;
    /**
     * @generated from field: repeated lnrpc.Resolution resolutions = 13;
     */
    resolutions: Resolution[];
    /**
     *
     * This lists out the set of alias short channel ids that existed for the
     * closed channel. This may be empty.
     *
     * @generated from field: repeated uint64 alias_scids = 14;
     */
    aliasScids: bigint[];
    /**
     *  The confirmed SCID for a zero-conf channel.
     *
     * @generated from field: uint64 zero_conf_confirmed_scid = 15 [jstype = JS_STRING];
     */
    zeroConfConfirmedScid: string;
};
/**
 * Describes the message lnrpc.ChannelCloseSummary.
 * Use `create(ChannelCloseSummarySchema)` to create a new message.
 */
export declare const ChannelCloseSummarySchema: GenMessage<ChannelCloseSummary>;
/**
 * @generated from enum lnrpc.ChannelCloseSummary.ClosureType
 */
export declare enum ChannelCloseSummary_ClosureType {
    /**
     * @generated from enum value: COOPERATIVE_CLOSE = 0;
     */
    COOPERATIVE_CLOSE = 0,
    /**
     * @generated from enum value: LOCAL_FORCE_CLOSE = 1;
     */
    LOCAL_FORCE_CLOSE = 1,
    /**
     * @generated from enum value: REMOTE_FORCE_CLOSE = 2;
     */
    REMOTE_FORCE_CLOSE = 2,
    /**
     * @generated from enum value: BREACH_CLOSE = 3;
     */
    BREACH_CLOSE = 3,
    /**
     * @generated from enum value: FUNDING_CANCELED = 4;
     */
    FUNDING_CANCELED = 4,
    /**
     * @generated from enum value: ABANDONED = 5;
     */
    ABANDONED = 5
}
/**
 * Describes the enum lnrpc.ChannelCloseSummary.ClosureType.
 */
export declare const ChannelCloseSummary_ClosureTypeSchema: GenEnum<ChannelCloseSummary_ClosureType>;
/**
 * @generated from message lnrpc.Resolution
 */
export type Resolution = Message<"lnrpc.Resolution"> & {
    /**
     * The type of output we are resolving.
     *
     * @generated from field: lnrpc.ResolutionType resolution_type = 1;
     */
    resolutionType: ResolutionType;
    /**
     * The outcome of our on chain action that resolved the outpoint.
     *
     * @generated from field: lnrpc.ResolutionOutcome outcome = 2;
     */
    outcome: ResolutionOutcome;
    /**
     * The outpoint that was spent by the resolution.
     *
     * @generated from field: lnrpc.OutPoint outpoint = 3;
     */
    outpoint?: OutPoint;
    /**
     * The amount that was claimed by the resolution.
     *
     * @generated from field: uint64 amount_sat = 4;
     */
    amountSat: bigint;
    /**
     * The hex-encoded transaction ID of the sweep transaction that spent the
     * output.
     *
     * @generated from field: string sweep_txid = 5;
     */
    sweepTxid: string;
};
/**
 * Describes the message lnrpc.Resolution.
 * Use `create(ResolutionSchema)` to create a new message.
 */
export declare const ResolutionSchema: GenMessage<Resolution>;
/**
 * @generated from message lnrpc.ClosedChannelsRequest
 */
export type ClosedChannelsRequest = Message<"lnrpc.ClosedChannelsRequest"> & {
    /**
     * @generated from field: bool cooperative = 1;
     */
    cooperative: boolean;
    /**
     * @generated from field: bool local_force = 2;
     */
    localForce: boolean;
    /**
     * @generated from field: bool remote_force = 3;
     */
    remoteForce: boolean;
    /**
     * @generated from field: bool breach = 4;
     */
    breach: boolean;
    /**
     * @generated from field: bool funding_canceled = 5;
     */
    fundingCanceled: boolean;
    /**
     * @generated from field: bool abandoned = 6;
     */
    abandoned: boolean;
};
/**
 * Describes the message lnrpc.ClosedChannelsRequest.
 * Use `create(ClosedChannelsRequestSchema)` to create a new message.
 */
export declare const ClosedChannelsRequestSchema: GenMessage<ClosedChannelsRequest>;
/**
 * @generated from message lnrpc.ClosedChannelsResponse
 */
export type ClosedChannelsResponse = Message<"lnrpc.ClosedChannelsResponse"> & {
    /**
     * @generated from field: repeated lnrpc.ChannelCloseSummary channels = 1;
     */
    channels: ChannelCloseSummary[];
};
/**
 * Describes the message lnrpc.ClosedChannelsResponse.
 * Use `create(ClosedChannelsResponseSchema)` to create a new message.
 */
export declare const ClosedChannelsResponseSchema: GenMessage<ClosedChannelsResponse>;
/**
 * @generated from message lnrpc.Peer
 */
export type Peer = Message<"lnrpc.Peer"> & {
    /**
     * The identity pubkey of the peer
     *
     * @generated from field: string pub_key = 1;
     */
    pubKey: string;
    /**
     * Network address of the peer; eg `127.0.0.1:10011`
     *
     * @generated from field: string address = 3;
     */
    address: string;
    /**
     * Bytes of data transmitted to this peer
     *
     * @generated from field: uint64 bytes_sent = 4;
     */
    bytesSent: bigint;
    /**
     * Bytes of data transmitted from this peer
     *
     * @generated from field: uint64 bytes_recv = 5;
     */
    bytesRecv: bigint;
    /**
     * Satoshis sent to this peer
     *
     * @generated from field: int64 sat_sent = 6;
     */
    satSent: bigint;
    /**
     * Satoshis received from this peer
     *
     * @generated from field: int64 sat_recv = 7;
     */
    satRecv: bigint;
    /**
     * A channel is inbound if the counterparty initiated the channel
     *
     * @generated from field: bool inbound = 8;
     */
    inbound: boolean;
    /**
     * Ping time to this peer
     *
     * @generated from field: int64 ping_time = 9;
     */
    pingTime: bigint;
    /**
     * The type of sync we are currently performing with this peer.
     *
     * @generated from field: lnrpc.Peer.SyncType sync_type = 10;
     */
    syncType: Peer_SyncType;
    /**
     * Features advertised by the remote peer in their init message.
     *
     * @generated from field: map<uint32, lnrpc.Feature> features = 11;
     */
    features: {
        [key: number]: Feature;
    };
    /**
     *
     * The latest errors received from our peer with timestamps, limited to the 10
     * most recent errors. These errors are tracked across peer connections, but
     * are not persisted across lnd restarts. Note that these errors are only
     * stored for peers that we have channels open with, to prevent peers from
     * spamming us with errors at no cost.
     *
     * @generated from field: repeated lnrpc.TimestampedError errors = 12;
     */
    errors: TimestampedError[];
    /**
     *
     * The number of times we have recorded this peer going offline or coming
     * online, recorded across restarts. Note that this value is decreased over
     * time if the peer has not recently flapped, so that we can forgive peers
     * with historically high flap counts.
     *
     * @generated from field: int32 flap_count = 13;
     */
    flapCount: number;
    /**
     *
     * The timestamp of the last flap we observed for this peer. If this value is
     * zero, we have not observed any flaps for this peer.
     *
     * @generated from field: int64 last_flap_ns = 14;
     */
    lastFlapNs: bigint;
    /**
     *
     * The last ping payload the peer has sent to us.
     *
     * @generated from field: bytes last_ping_payload = 15;
     */
    lastPingPayload: Uint8Array;
};
/**
 * Describes the message lnrpc.Peer.
 * Use `create(PeerSchema)` to create a new message.
 */
export declare const PeerSchema: GenMessage<Peer>;
/**
 * @generated from enum lnrpc.Peer.SyncType
 */
export declare enum Peer_SyncType {
    /**
     *
     * Denotes that we cannot determine the peer's current sync type.
     *
     * @generated from enum value: UNKNOWN_SYNC = 0;
     */
    UNKNOWN_SYNC = 0,
    /**
     *
     * Denotes that we are actively receiving new graph updates from the peer.
     *
     * @generated from enum value: ACTIVE_SYNC = 1;
     */
    ACTIVE_SYNC = 1,
    /**
     *
     * Denotes that we are not receiving new graph updates from the peer.
     *
     * @generated from enum value: PASSIVE_SYNC = 2;
     */
    PASSIVE_SYNC = 2,
    /**
     *
     * Denotes that this peer is pinned into an active sync.
     *
     * @generated from enum value: PINNED_SYNC = 3;
     */
    PINNED_SYNC = 3
}
/**
 * Describes the enum lnrpc.Peer.SyncType.
 */
export declare const Peer_SyncTypeSchema: GenEnum<Peer_SyncType>;
/**
 * @generated from message lnrpc.TimestampedError
 */
export type TimestampedError = Message<"lnrpc.TimestampedError"> & {
    /**
     * The unix timestamp in seconds when the error occurred.
     *
     * @generated from field: uint64 timestamp = 1;
     */
    timestamp: bigint;
    /**
     * The string representation of the error sent by our peer.
     *
     * @generated from field: string error = 2;
     */
    error: string;
};
/**
 * Describes the message lnrpc.TimestampedError.
 * Use `create(TimestampedErrorSchema)` to create a new message.
 */
export declare const TimestampedErrorSchema: GenMessage<TimestampedError>;
/**
 * @generated from message lnrpc.ListPeersRequest
 */
export type ListPeersRequest = Message<"lnrpc.ListPeersRequest"> & {
    /**
     *
     * If true, only the last error that our peer sent us will be returned with
     * the peer's information, rather than the full set of historic errors we have
     * stored.
     *
     * @generated from field: bool latest_error = 1;
     */
    latestError: boolean;
};
/**
 * Describes the message lnrpc.ListPeersRequest.
 * Use `create(ListPeersRequestSchema)` to create a new message.
 */
export declare const ListPeersRequestSchema: GenMessage<ListPeersRequest>;
/**
 * @generated from message lnrpc.ListPeersResponse
 */
export type ListPeersResponse = Message<"lnrpc.ListPeersResponse"> & {
    /**
     * The list of currently connected peers
     *
     * @generated from field: repeated lnrpc.Peer peers = 1;
     */
    peers: Peer[];
};
/**
 * Describes the message lnrpc.ListPeersResponse.
 * Use `create(ListPeersResponseSchema)` to create a new message.
 */
export declare const ListPeersResponseSchema: GenMessage<ListPeersResponse>;
/**
 * @generated from message lnrpc.PeerEventSubscription
 */
export type PeerEventSubscription = Message<"lnrpc.PeerEventSubscription"> & {};
/**
 * Describes the message lnrpc.PeerEventSubscription.
 * Use `create(PeerEventSubscriptionSchema)` to create a new message.
 */
export declare const PeerEventSubscriptionSchema: GenMessage<PeerEventSubscription>;
/**
 * @generated from message lnrpc.PeerEvent
 */
export type PeerEvent = Message<"lnrpc.PeerEvent"> & {
    /**
     * The identity pubkey of the peer.
     *
     * @generated from field: string pub_key = 1;
     */
    pubKey: string;
    /**
     * @generated from field: lnrpc.PeerEvent.EventType type = 2;
     */
    type: PeerEvent_EventType;
};
/**
 * Describes the message lnrpc.PeerEvent.
 * Use `create(PeerEventSchema)` to create a new message.
 */
export declare const PeerEventSchema: GenMessage<PeerEvent>;
/**
 * @generated from enum lnrpc.PeerEvent.EventType
 */
export declare enum PeerEvent_EventType {
    /**
     * @generated from enum value: PEER_ONLINE = 0;
     */
    PEER_ONLINE = 0,
    /**
     * @generated from enum value: PEER_OFFLINE = 1;
     */
    PEER_OFFLINE = 1
}
/**
 * Describes the enum lnrpc.PeerEvent.EventType.
 */
export declare const PeerEvent_EventTypeSchema: GenEnum<PeerEvent_EventType>;
/**
 * @generated from message lnrpc.GetInfoRequest
 */
export type GetInfoRequest = Message<"lnrpc.GetInfoRequest"> & {};
/**
 * Describes the message lnrpc.GetInfoRequest.
 * Use `create(GetInfoRequestSchema)` to create a new message.
 */
export declare const GetInfoRequestSchema: GenMessage<GetInfoRequest>;
/**
 * @generated from message lnrpc.GetInfoResponse
 */
export type GetInfoResponse = Message<"lnrpc.GetInfoResponse"> & {
    /**
     * The version of the LND software that the node is running.
     *
     * @generated from field: string version = 14;
     */
    version: string;
    /**
     * The SHA1 commit hash that the daemon is compiled with.
     *
     * @generated from field: string commit_hash = 20;
     */
    commitHash: string;
    /**
     * The identity pubkey of the current node.
     *
     * @generated from field: string identity_pubkey = 1;
     */
    identityPubkey: string;
    /**
     * If applicable, the alias of the current node, e.g. "bob"
     *
     * @generated from field: string alias = 2;
     */
    alias: string;
    /**
     * The color of the current node in hex code format
     *
     * @generated from field: string color = 17;
     */
    color: string;
    /**
     * Number of pending channels
     *
     * @generated from field: uint32 num_pending_channels = 3;
     */
    numPendingChannels: number;
    /**
     * Number of active channels
     *
     * @generated from field: uint32 num_active_channels = 4;
     */
    numActiveChannels: number;
    /**
     * Number of inactive channels
     *
     * @generated from field: uint32 num_inactive_channels = 15;
     */
    numInactiveChannels: number;
    /**
     * Number of peers
     *
     * @generated from field: uint32 num_peers = 5;
     */
    numPeers: number;
    /**
     * The node's current view of the height of the best block
     *
     * @generated from field: uint32 block_height = 6;
     */
    blockHeight: number;
    /**
     * The node's current view of the hash of the best block
     *
     * @generated from field: string block_hash = 8;
     */
    blockHash: string;
    /**
     * Timestamp of the block best known to the wallet
     *
     * @generated from field: int64 best_header_timestamp = 13;
     */
    bestHeaderTimestamp: bigint;
    /**
     * Whether the wallet's view is synced to the main chain
     *
     * @generated from field: bool synced_to_chain = 9;
     */
    syncedToChain: boolean;
    /**
     * Whether we consider ourselves synced with the public channel graph.
     *
     * @generated from field: bool synced_to_graph = 18;
     */
    syncedToGraph: boolean;
    /**
     *
     * Whether the current node is connected to testnet. This field is
     * deprecated and the network field should be used instead
     *
     * @generated from field: bool testnet = 10 [deprecated = true];
     * @deprecated
     */
    testnet: boolean;
    /**
     * A list of active chains the node is connected to
     *
     * @generated from field: repeated lnrpc.Chain chains = 16;
     */
    chains: Chain[];
    /**
     * The URIs of the current node.
     *
     * @generated from field: repeated string uris = 12;
     */
    uris: string[];
    /**
     *
     * Features that our node has advertised in our init message, node
     * announcements and invoices.
     *
     * @generated from field: map<uint32, lnrpc.Feature> features = 19;
     */
    features: {
        [key: number]: Feature;
    };
    /**
     *
     * Indicates whether the HTLC interceptor API is in always-on mode.
     *
     * @generated from field: bool require_htlc_interceptor = 21;
     */
    requireHtlcInterceptor: boolean;
    /**
     * Indicates whether final htlc resolutions are stored on disk.
     *
     * @generated from field: bool store_final_htlc_resolutions = 22;
     */
    storeFinalHtlcResolutions: boolean;
};
/**
 * Describes the message lnrpc.GetInfoResponse.
 * Use `create(GetInfoResponseSchema)` to create a new message.
 */
export declare const GetInfoResponseSchema: GenMessage<GetInfoResponse>;
/**
 * @generated from message lnrpc.GetRecoveryInfoRequest
 */
export type GetRecoveryInfoRequest = Message<"lnrpc.GetRecoveryInfoRequest"> & {};
/**
 * Describes the message lnrpc.GetRecoveryInfoRequest.
 * Use `create(GetRecoveryInfoRequestSchema)` to create a new message.
 */
export declare const GetRecoveryInfoRequestSchema: GenMessage<GetRecoveryInfoRequest>;
/**
 * @generated from message lnrpc.GetRecoveryInfoResponse
 */
export type GetRecoveryInfoResponse = Message<"lnrpc.GetRecoveryInfoResponse"> & {
    /**
     * Whether the wallet is in recovery mode
     *
     * @generated from field: bool recovery_mode = 1;
     */
    recoveryMode: boolean;
    /**
     * Whether the wallet recovery progress is finished
     *
     * @generated from field: bool recovery_finished = 2;
     */
    recoveryFinished: boolean;
    /**
     * The recovery progress, ranging from 0 to 1.
     *
     * @generated from field: double progress = 3;
     */
    progress: number;
};
/**
 * Describes the message lnrpc.GetRecoveryInfoResponse.
 * Use `create(GetRecoveryInfoResponseSchema)` to create a new message.
 */
export declare const GetRecoveryInfoResponseSchema: GenMessage<GetRecoveryInfoResponse>;
/**
 * @generated from message lnrpc.Chain
 */
export type Chain = Message<"lnrpc.Chain"> & {
    /**
     * The blockchain the node is on (eg bitcoin, litecoin)
     *
     * @generated from field: string chain = 1;
     */
    chain: string;
    /**
     * The network the node is on (eg regtest, testnet, mainnet)
     *
     * @generated from field: string network = 2;
     */
    network: string;
};
/**
 * Describes the message lnrpc.Chain.
 * Use `create(ChainSchema)` to create a new message.
 */
export declare const ChainSchema: GenMessage<Chain>;
/**
 * @generated from message lnrpc.ConfirmationUpdate
 */
export type ConfirmationUpdate = Message<"lnrpc.ConfirmationUpdate"> & {
    /**
     * @generated from field: bytes block_sha = 1;
     */
    blockSha: Uint8Array;
    /**
     * @generated from field: int32 block_height = 2;
     */
    blockHeight: number;
    /**
     * @generated from field: uint32 num_confs_left = 3;
     */
    numConfsLeft: number;
};
/**
 * Describes the message lnrpc.ConfirmationUpdate.
 * Use `create(ConfirmationUpdateSchema)` to create a new message.
 */
export declare const ConfirmationUpdateSchema: GenMessage<ConfirmationUpdate>;
/**
 * @generated from message lnrpc.ChannelOpenUpdate
 */
export type ChannelOpenUpdate = Message<"lnrpc.ChannelOpenUpdate"> & {
    /**
     * @generated from field: lnrpc.ChannelPoint channel_point = 1;
     */
    channelPoint?: ChannelPoint;
};
/**
 * Describes the message lnrpc.ChannelOpenUpdate.
 * Use `create(ChannelOpenUpdateSchema)` to create a new message.
 */
export declare const ChannelOpenUpdateSchema: GenMessage<ChannelOpenUpdate>;
/**
 * @generated from message lnrpc.ChannelCloseUpdate
 */
export type ChannelCloseUpdate = Message<"lnrpc.ChannelCloseUpdate"> & {
    /**
     * @generated from field: bytes closing_txid = 1;
     */
    closingTxid: Uint8Array;
    /**
     * @generated from field: bool success = 2;
     */
    success: boolean;
};
/**
 * Describes the message lnrpc.ChannelCloseUpdate.
 * Use `create(ChannelCloseUpdateSchema)` to create a new message.
 */
export declare const ChannelCloseUpdateSchema: GenMessage<ChannelCloseUpdate>;
/**
 * @generated from message lnrpc.CloseChannelRequest
 */
export type CloseChannelRequest = Message<"lnrpc.CloseChannelRequest"> & {
    /**
     *
     * The outpoint (txid:index) of the funding transaction. With this value, Bob
     * will be able to generate a signature for Alice's version of the commitment
     * transaction.
     *
     * @generated from field: lnrpc.ChannelPoint channel_point = 1;
     */
    channelPoint?: ChannelPoint;
    /**
     * If true, then the channel will be closed forcibly. This means the
     * current commitment transaction will be signed and broadcast.
     *
     * @generated from field: bool force = 2;
     */
    force: boolean;
    /**
     * The target number of blocks that the closure transaction should be
     * confirmed by.
     *
     * @generated from field: int32 target_conf = 3;
     */
    targetConf: number;
    /**
     * Deprecated, use sat_per_vbyte.
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * closure transaction.
     *
     * @generated from field: int64 sat_per_byte = 4 [deprecated = true];
     * @deprecated
     */
    satPerByte: bigint;
    /**
     *
     * An optional address to send funds to in the case of a cooperative close.
     * If the channel was opened with an upfront shutdown script and this field
     * is set, the request to close will fail because the channel must pay out
     * to the upfront shutdown addresss.
     *
     * @generated from field: string delivery_address = 5;
     */
    deliveryAddress: string;
    /**
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * closure transaction.
     *
     * @generated from field: uint64 sat_per_vbyte = 6;
     */
    satPerVbyte: bigint;
    /**
     * The maximum fee rate the closer is willing to pay.
     *
     * NOTE: This field is only respected if we're the initiator of the channel.
     *
     * @generated from field: uint64 max_fee_per_vbyte = 7;
     */
    maxFeePerVbyte: bigint;
};
/**
 * Describes the message lnrpc.CloseChannelRequest.
 * Use `create(CloseChannelRequestSchema)` to create a new message.
 */
export declare const CloseChannelRequestSchema: GenMessage<CloseChannelRequest>;
/**
 * @generated from message lnrpc.CloseStatusUpdate
 */
export type CloseStatusUpdate = Message<"lnrpc.CloseStatusUpdate"> & {
    /**
     * @generated from oneof lnrpc.CloseStatusUpdate.update
     */
    update: {
        /**
         * @generated from field: lnrpc.PendingUpdate close_pending = 1;
         */
        value: PendingUpdate;
        case: "closePending";
    } | {
        /**
         * @generated from field: lnrpc.ChannelCloseUpdate chan_close = 3;
         */
        value: ChannelCloseUpdate;
        case: "chanClose";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message lnrpc.CloseStatusUpdate.
 * Use `create(CloseStatusUpdateSchema)` to create a new message.
 */
export declare const CloseStatusUpdateSchema: GenMessage<CloseStatusUpdate>;
/**
 * @generated from message lnrpc.PendingUpdate
 */
export type PendingUpdate = Message<"lnrpc.PendingUpdate"> & {
    /**
     * @generated from field: bytes txid = 1;
     */
    txid: Uint8Array;
    /**
     * @generated from field: uint32 output_index = 2;
     */
    outputIndex: number;
};
/**
 * Describes the message lnrpc.PendingUpdate.
 * Use `create(PendingUpdateSchema)` to create a new message.
 */
export declare const PendingUpdateSchema: GenMessage<PendingUpdate>;
/**
 * @generated from message lnrpc.ReadyForPsbtFunding
 */
export type ReadyForPsbtFunding = Message<"lnrpc.ReadyForPsbtFunding"> & {
    /**
     *
     * The P2WSH address of the channel funding multisig address that the below
     * specified amount in satoshis needs to be sent to.
     *
     * @generated from field: string funding_address = 1;
     */
    fundingAddress: string;
    /**
     *
     * The exact amount in satoshis that needs to be sent to the above address to
     * fund the pending channel.
     *
     * @generated from field: int64 funding_amount = 2;
     */
    fundingAmount: bigint;
    /**
     *
     * A raw PSBT that contains the pending channel output. If a base PSBT was
     * provided in the PsbtShim, this is the base PSBT with one additional output.
     * If no base PSBT was specified, this is an otherwise empty PSBT with exactly
     * one output.
     *
     * @generated from field: bytes psbt = 3;
     */
    psbt: Uint8Array;
};
/**
 * Describes the message lnrpc.ReadyForPsbtFunding.
 * Use `create(ReadyForPsbtFundingSchema)` to create a new message.
 */
export declare const ReadyForPsbtFundingSchema: GenMessage<ReadyForPsbtFunding>;
/**
 * @generated from message lnrpc.BatchOpenChannelRequest
 */
export type BatchOpenChannelRequest = Message<"lnrpc.BatchOpenChannelRequest"> & {
    /**
     * The list of channels to open.
     *
     * @generated from field: repeated lnrpc.BatchOpenChannel channels = 1;
     */
    channels: BatchOpenChannel[];
    /**
     * The target number of blocks that the funding transaction should be
     * confirmed by.
     *
     * @generated from field: int32 target_conf = 2;
     */
    targetConf: number;
    /**
     * A manual fee rate set in sat/vByte that should be used when crafting the
     * funding transaction.
     *
     * @generated from field: int64 sat_per_vbyte = 3;
     */
    satPerVbyte: bigint;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the funding transaction must satisfy.
     *
     * @generated from field: int32 min_confs = 4;
     */
    minConfs: number;
    /**
     * Whether unconfirmed outputs should be used as inputs for the funding
     * transaction.
     *
     * @generated from field: bool spend_unconfirmed = 5;
     */
    spendUnconfirmed: boolean;
    /**
     * An optional label for the batch transaction, limited to 500 characters.
     *
     * @generated from field: string label = 6;
     */
    label: string;
};
/**
 * Describes the message lnrpc.BatchOpenChannelRequest.
 * Use `create(BatchOpenChannelRequestSchema)` to create a new message.
 */
export declare const BatchOpenChannelRequestSchema: GenMessage<BatchOpenChannelRequest>;
/**
 * @generated from message lnrpc.BatchOpenChannel
 */
export type BatchOpenChannel = Message<"lnrpc.BatchOpenChannel"> & {
    /**
     * The pubkey of the node to open a channel with. When using REST, this
     * field must be encoded as base64.
     *
     * @generated from field: bytes node_pubkey = 1;
     */
    nodePubkey: Uint8Array;
    /**
     * The number of satoshis the wallet should commit to the channel.
     *
     * @generated from field: int64 local_funding_amount = 2;
     */
    localFundingAmount: bigint;
    /**
     * The number of satoshis to push to the remote side as part of the initial
     * commitment state.
     *
     * @generated from field: int64 push_sat = 3;
     */
    pushSat: bigint;
    /**
     * Whether this channel should be private, not announced to the greater
     * network.
     *
     * @generated from field: bool private = 4;
     */
    private: boolean;
    /**
     * The minimum value in millisatoshi we will require for incoming HTLCs on
     * the channel.
     *
     * @generated from field: int64 min_htlc_msat = 5;
     */
    minHtlcMsat: bigint;
    /**
     * The delay we require on the remote's commitment transaction. If this is
     * not set, it will be scaled automatically with the channel size.
     *
     * @generated from field: uint32 remote_csv_delay = 6;
     */
    remoteCsvDelay: number;
    /**
     *
     * Close address is an optional address which specifies the address to which
     * funds should be paid out to upon cooperative close. This field may only be
     * set if the peer supports the option upfront feature bit (call listpeers
     * to check). The remote peer will only accept cooperative closes to this
     * address if it is set.
     *
     * Note: If this value is set on channel creation, you will *not* be able to
     * cooperatively close out to a different address.
     *
     * @generated from field: string close_address = 7;
     */
    closeAddress: string;
    /**
     *
     * An optional, unique identifier of 32 random bytes that will be used as the
     * pending channel ID to identify the channel while it is in the pre-pending
     * state.
     *
     * @generated from field: bytes pending_chan_id = 8;
     */
    pendingChanId: Uint8Array;
    /**
     *
     * The explicit commitment type to use. Note this field will only be used if
     * the remote peer supports explicit channel negotiation.
     *
     * @generated from field: lnrpc.CommitmentType commitment_type = 9;
     */
    commitmentType: CommitmentType;
    /**
     *
     * The maximum amount of coins in millisatoshi that can be pending within
     * the channel. It only applies to the remote party.
     *
     * @generated from field: uint64 remote_max_value_in_flight_msat = 10;
     */
    remoteMaxValueInFlightMsat: bigint;
    /**
     *
     * The maximum number of concurrent HTLCs we will allow the remote party to add
     * to the commitment transaction.
     *
     * @generated from field: uint32 remote_max_htlcs = 11;
     */
    remoteMaxHtlcs: number;
    /**
     *
     * Max local csv is the maximum csv delay we will allow for our own commitment
     * transaction.
     *
     * @generated from field: uint32 max_local_csv = 12;
     */
    maxLocalCsv: number;
    /**
     *
     * If this is true, then a zero-conf channel open will be attempted.
     *
     * @generated from field: bool zero_conf = 13;
     */
    zeroConf: boolean;
    /**
     *
     * If this is true, then an option-scid-alias channel-type open will be
     * attempted.
     *
     * @generated from field: bool scid_alias = 14;
     */
    scidAlias: boolean;
    /**
     *
     * The base fee charged regardless of the number of milli-satoshis sent.
     *
     * @generated from field: uint64 base_fee = 15;
     */
    baseFee: bigint;
    /**
     *
     * The fee rate in ppm (parts per million) that will be charged in
     * proportion of the value of each forwarded HTLC.
     *
     * @generated from field: uint64 fee_rate = 16;
     */
    feeRate: bigint;
    /**
     *
     * If use_base_fee is true the open channel announcement will update the
     * channel base fee with the value specified in base_fee. In the case of
     * a base_fee of 0 use_base_fee is needed downstream to distinguish whether
     * to use the default base fee value specified in the config or 0.
     *
     * @generated from field: bool use_base_fee = 17;
     */
    useBaseFee: boolean;
    /**
     *
     * If use_fee_rate is true the open channel announcement will update the
     * channel fee rate with the value specified in fee_rate. In the case of
     * a fee_rate of 0 use_fee_rate is needed downstream to distinguish whether
     * to use the default fee rate value specified in the config or 0.
     *
     * @generated from field: bool use_fee_rate = 18;
     */
    useFeeRate: boolean;
    /**
     *
     * The number of satoshis we require the remote peer to reserve. This value,
     * if specified, must be above the dust limit and below 20% of the channel
     * capacity.
     *
     * @generated from field: uint64 remote_chan_reserve_sat = 19;
     */
    remoteChanReserveSat: bigint;
    /**
     *
     * An optional note-to-self to go along with the channel containing some
     * useful information. This is only ever stored locally and in no way impacts
     * the channel's operation.
     *
     * @generated from field: string memo = 20;
     */
    memo: string;
};
/**
 * Describes the message lnrpc.BatchOpenChannel.
 * Use `create(BatchOpenChannelSchema)` to create a new message.
 */
export declare const BatchOpenChannelSchema: GenMessage<BatchOpenChannel>;
/**
 * @generated from message lnrpc.BatchOpenChannelResponse
 */
export type BatchOpenChannelResponse = Message<"lnrpc.BatchOpenChannelResponse"> & {
    /**
     * @generated from field: repeated lnrpc.PendingUpdate pending_channels = 1;
     */
    pendingChannels: PendingUpdate[];
};
/**
 * Describes the message lnrpc.BatchOpenChannelResponse.
 * Use `create(BatchOpenChannelResponseSchema)` to create a new message.
 */
export declare const BatchOpenChannelResponseSchema: GenMessage<BatchOpenChannelResponse>;
/**
 * @generated from message lnrpc.OpenChannelRequest
 */
export type OpenChannelRequest = Message<"lnrpc.OpenChannelRequest"> & {
    /**
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * funding transaction.
     *
     * @generated from field: uint64 sat_per_vbyte = 1;
     */
    satPerVbyte: bigint;
    /**
     *
     * The pubkey of the node to open a channel with. When using REST, this field
     * must be encoded as base64.
     *
     * @generated from field: bytes node_pubkey = 2;
     */
    nodePubkey: Uint8Array;
    /**
     *
     * The hex encoded pubkey of the node to open a channel with. Deprecated now
     * that the REST gateway supports base64 encoding of bytes fields.
     *
     * @generated from field: string node_pubkey_string = 3 [deprecated = true];
     * @deprecated
     */
    nodePubkeyString: string;
    /**
     * The number of satoshis the wallet should commit to the channel
     *
     * @generated from field: int64 local_funding_amount = 4;
     */
    localFundingAmount: bigint;
    /**
     * The number of satoshis to push to the remote side as part of the initial
     * commitment state
     *
     * @generated from field: int64 push_sat = 5;
     */
    pushSat: bigint;
    /**
     * The target number of blocks that the funding transaction should be
     * confirmed by.
     *
     * @generated from field: int32 target_conf = 6;
     */
    targetConf: number;
    /**
     * Deprecated, use sat_per_vbyte.
     * A manual fee rate set in sat/vbyte that should be used when crafting the
     * funding transaction.
     *
     * @generated from field: int64 sat_per_byte = 7 [deprecated = true];
     * @deprecated
     */
    satPerByte: bigint;
    /**
     * Whether this channel should be private, not announced to the greater
     * network.
     *
     * @generated from field: bool private = 8;
     */
    private: boolean;
    /**
     * The minimum value in millisatoshi we will require for incoming HTLCs on
     * the channel.
     *
     * @generated from field: int64 min_htlc_msat = 9;
     */
    minHtlcMsat: bigint;
    /**
     * The delay we require on the remote's commitment transaction. If this is
     * not set, it will be scaled automatically with the channel size.
     *
     * @generated from field: uint32 remote_csv_delay = 10;
     */
    remoteCsvDelay: number;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the funding transaction must satisfy.
     *
     * @generated from field: int32 min_confs = 11;
     */
    minConfs: number;
    /**
     * Whether unconfirmed outputs should be used as inputs for the funding
     * transaction.
     *
     * @generated from field: bool spend_unconfirmed = 12;
     */
    spendUnconfirmed: boolean;
    /**
     *
     * Close address is an optional address which specifies the address to which
     * funds should be paid out to upon cooperative close. This field may only be
     * set if the peer supports the option upfront feature bit (call listpeers
     * to check). The remote peer will only accept cooperative closes to this
     * address if it is set.
     *
     * Note: If this value is set on channel creation, you will *not* be able to
     * cooperatively close out to a different address.
     *
     * @generated from field: string close_address = 13;
     */
    closeAddress: string;
    /**
     *
     * Funding shims are an optional argument that allow the caller to intercept
     * certain funding functionality. For example, a shim can be provided to use a
     * particular key for the commitment key (ideally cold) rather than use one
     * that is generated by the wallet as normal, or signal that signing will be
     * carried out in an interactive manner (PSBT based).
     *
     * @generated from field: lnrpc.FundingShim funding_shim = 14;
     */
    fundingShim?: FundingShim;
    /**
     *
     * The maximum amount of coins in millisatoshi that can be pending within
     * the channel. It only applies to the remote party.
     *
     * @generated from field: uint64 remote_max_value_in_flight_msat = 15;
     */
    remoteMaxValueInFlightMsat: bigint;
    /**
     *
     * The maximum number of concurrent HTLCs we will allow the remote party to add
     * to the commitment transaction.
     *
     * @generated from field: uint32 remote_max_htlcs = 16;
     */
    remoteMaxHtlcs: number;
    /**
     *
     * Max local csv is the maximum csv delay we will allow for our own commitment
     * transaction.
     *
     * @generated from field: uint32 max_local_csv = 17;
     */
    maxLocalCsv: number;
    /**
     *
     * The explicit commitment type to use. Note this field will only be used if
     * the remote peer supports explicit channel negotiation.
     *
     * @generated from field: lnrpc.CommitmentType commitment_type = 18;
     */
    commitmentType: CommitmentType;
    /**
     *
     * If this is true, then a zero-conf channel open will be attempted.
     *
     * @generated from field: bool zero_conf = 19;
     */
    zeroConf: boolean;
    /**
     *
     * If this is true, then an option-scid-alias channel-type open will be
     * attempted.
     *
     * @generated from field: bool scid_alias = 20;
     */
    scidAlias: boolean;
    /**
     *
     * The base fee charged regardless of the number of milli-satoshis sent.
     *
     * @generated from field: uint64 base_fee = 21;
     */
    baseFee: bigint;
    /**
     *
     * The fee rate in ppm (parts per million) that will be charged in
     * proportion of the value of each forwarded HTLC.
     *
     * @generated from field: uint64 fee_rate = 22;
     */
    feeRate: bigint;
    /**
     *
     * If use_base_fee is true the open channel announcement will update the
     * channel base fee with the value specified in base_fee. In the case of
     * a base_fee of 0 use_base_fee is needed downstream to distinguish whether
     * to use the default base fee value specified in the config or 0.
     *
     * @generated from field: bool use_base_fee = 23;
     */
    useBaseFee: boolean;
    /**
     *
     * If use_fee_rate is true the open channel announcement will update the
     * channel fee rate with the value specified in fee_rate. In the case of
     * a fee_rate of 0 use_fee_rate is needed downstream to distinguish whether
     * to use the default fee rate value specified in the config or 0.
     *
     * @generated from field: bool use_fee_rate = 24;
     */
    useFeeRate: boolean;
    /**
     *
     * The number of satoshis we require the remote peer to reserve. This value,
     * if specified, must be above the dust limit and below 20% of the channel
     * capacity.
     *
     * @generated from field: uint64 remote_chan_reserve_sat = 25;
     */
    remoteChanReserveSat: bigint;
    /**
     *
     * If set, then lnd will attempt to commit all the coins under control of the
     * internal wallet to open the channel, and the LocalFundingAmount field must
     * be zero and is ignored.
     *
     * @generated from field: bool fund_max = 26;
     */
    fundMax: boolean;
    /**
     *
     * An optional note-to-self to go along with the channel containing some
     * useful information. This is only ever stored locally and in no way impacts
     * the channel's operation.
     *
     * @generated from field: string memo = 27;
     */
    memo: string;
    /**
     *
     * A list of selected outpoints that are allocated for channel funding.
     *
     * @generated from field: repeated lnrpc.OutPoint outpoints = 28;
     */
    outpoints: OutPoint[];
};
/**
 * Describes the message lnrpc.OpenChannelRequest.
 * Use `create(OpenChannelRequestSchema)` to create a new message.
 */
export declare const OpenChannelRequestSchema: GenMessage<OpenChannelRequest>;
/**
 * @generated from message lnrpc.OpenStatusUpdate
 */
export type OpenStatusUpdate = Message<"lnrpc.OpenStatusUpdate"> & {
    /**
     * @generated from oneof lnrpc.OpenStatusUpdate.update
     */
    update: {
        /**
         *
         * Signals that the channel is now fully negotiated and the funding
         * transaction published.
         *
         * @generated from field: lnrpc.PendingUpdate chan_pending = 1;
         */
        value: PendingUpdate;
        case: "chanPending";
    } | {
        /**
         *
         * Signals that the channel's funding transaction has now reached the
         * required number of confirmations on chain and can be used.
         *
         * @generated from field: lnrpc.ChannelOpenUpdate chan_open = 3;
         */
        value: ChannelOpenUpdate;
        case: "chanOpen";
    } | {
        /**
         *
         * Signals that the funding process has been suspended and the construction
         * of a PSBT that funds the channel PK script is now required.
         *
         * @generated from field: lnrpc.ReadyForPsbtFunding psbt_fund = 5;
         */
        value: ReadyForPsbtFunding;
        case: "psbtFund";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     *
     * The pending channel ID of the created channel. This value may be used to
     * further the funding flow manually via the FundingStateStep method.
     *
     * @generated from field: bytes pending_chan_id = 4;
     */
    pendingChanId: Uint8Array;
};
/**
 * Describes the message lnrpc.OpenStatusUpdate.
 * Use `create(OpenStatusUpdateSchema)` to create a new message.
 */
export declare const OpenStatusUpdateSchema: GenMessage<OpenStatusUpdate>;
/**
 * @generated from message lnrpc.KeyLocator
 */
export type KeyLocator = Message<"lnrpc.KeyLocator"> & {
    /**
     * The family of key being identified.
     *
     * @generated from field: int32 key_family = 1;
     */
    keyFamily: number;
    /**
     * The precise index of the key being identified.
     *
     * @generated from field: int32 key_index = 2;
     */
    keyIndex: number;
};
/**
 * Describes the message lnrpc.KeyLocator.
 * Use `create(KeyLocatorSchema)` to create a new message.
 */
export declare const KeyLocatorSchema: GenMessage<KeyLocator>;
/**
 * @generated from message lnrpc.KeyDescriptor
 */
export type KeyDescriptor = Message<"lnrpc.KeyDescriptor"> & {
    /**
     *
     * The raw bytes of the key being identified.
     *
     * @generated from field: bytes raw_key_bytes = 1;
     */
    rawKeyBytes: Uint8Array;
    /**
     *
     * The key locator that identifies which key to use for signing.
     *
     * @generated from field: lnrpc.KeyLocator key_loc = 2;
     */
    keyLoc?: KeyLocator;
};
/**
 * Describes the message lnrpc.KeyDescriptor.
 * Use `create(KeyDescriptorSchema)` to create a new message.
 */
export declare const KeyDescriptorSchema: GenMessage<KeyDescriptor>;
/**
 * @generated from message lnrpc.ChanPointShim
 */
export type ChanPointShim = Message<"lnrpc.ChanPointShim"> & {
    /**
     *
     * The size of the pre-crafted output to be used as the channel point for this
     * channel funding.
     *
     * @generated from field: int64 amt = 1;
     */
    amt: bigint;
    /**
     * The target channel point to refrence in created commitment transactions.
     *
     * @generated from field: lnrpc.ChannelPoint chan_point = 2;
     */
    chanPoint?: ChannelPoint;
    /**
     * Our local key to use when creating the multi-sig output.
     *
     * @generated from field: lnrpc.KeyDescriptor local_key = 3;
     */
    localKey?: KeyDescriptor;
    /**
     * The key of the remote party to use when creating the multi-sig output.
     *
     * @generated from field: bytes remote_key = 4;
     */
    remoteKey: Uint8Array;
    /**
     *
     * If non-zero, then this will be used as the pending channel ID on the wire
     * protocol to initate the funding request. This is an optional field, and
     * should only be set if the responder is already expecting a specific pending
     * channel ID.
     *
     * @generated from field: bytes pending_chan_id = 5;
     */
    pendingChanId: Uint8Array;
    /**
     *
     * This uint32 indicates if this channel is to be considered 'frozen'. A frozen
     * channel does not allow a cooperative channel close by the initiator. The
     * thaw_height is the height that this restriction stops applying to the
     * channel. The height can be interpreted in two ways: as a relative height if
     * the value is less than 500,000, or as an absolute height otherwise.
     *
     * @generated from field: uint32 thaw_height = 6;
     */
    thawHeight: number;
    /**
     *
     * Indicates that the funding output is using a MuSig2 multi-sig output.
     *
     * @generated from field: bool musig2 = 7;
     */
    musig2: boolean;
};
/**
 * Describes the message lnrpc.ChanPointShim.
 * Use `create(ChanPointShimSchema)` to create a new message.
 */
export declare const ChanPointShimSchema: GenMessage<ChanPointShim>;
/**
 * @generated from message lnrpc.PsbtShim
 */
export type PsbtShim = Message<"lnrpc.PsbtShim"> & {
    /**
     *
     * A unique identifier of 32 random bytes that will be used as the pending
     * channel ID to identify the PSBT state machine when interacting with it and
     * on the wire protocol to initiate the funding request.
     *
     * @generated from field: bytes pending_chan_id = 1;
     */
    pendingChanId: Uint8Array;
    /**
     *
     * An optional base PSBT the new channel output will be added to. If this is
     * non-empty, it must be a binary serialized PSBT.
     *
     * @generated from field: bytes base_psbt = 2;
     */
    basePsbt: Uint8Array;
    /**
     *
     * If a channel should be part of a batch (multiple channel openings in one
     * transaction), it can be dangerous if the whole batch transaction is
     * published too early before all channel opening negotiations are completed.
     * This flag prevents this particular channel from broadcasting the transaction
     * after the negotiation with the remote peer. In a batch of channel openings
     * this flag should be set to true for every channel but the very last.
     *
     * @generated from field: bool no_publish = 3;
     */
    noPublish: boolean;
};
/**
 * Describes the message lnrpc.PsbtShim.
 * Use `create(PsbtShimSchema)` to create a new message.
 */
export declare const PsbtShimSchema: GenMessage<PsbtShim>;
/**
 * @generated from message lnrpc.FundingShim
 */
export type FundingShim = Message<"lnrpc.FundingShim"> & {
    /**
     * @generated from oneof lnrpc.FundingShim.shim
     */
    shim: {
        /**
         *
         * A channel shim where the channel point was fully constructed outside
         * of lnd's wallet and the transaction might already be published.
         *
         * @generated from field: lnrpc.ChanPointShim chan_point_shim = 1;
         */
        value: ChanPointShim;
        case: "chanPointShim";
    } | {
        /**
         *
         * A channel shim that uses a PSBT to fund and sign the channel funding
         * transaction.
         *
         * @generated from field: lnrpc.PsbtShim psbt_shim = 2;
         */
        value: PsbtShim;
        case: "psbtShim";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message lnrpc.FundingShim.
 * Use `create(FundingShimSchema)` to create a new message.
 */
export declare const FundingShimSchema: GenMessage<FundingShim>;
/**
 * @generated from message lnrpc.FundingShimCancel
 */
export type FundingShimCancel = Message<"lnrpc.FundingShimCancel"> & {
    /**
     * The pending channel ID of the channel to cancel the funding shim for.
     *
     * @generated from field: bytes pending_chan_id = 1;
     */
    pendingChanId: Uint8Array;
};
/**
 * Describes the message lnrpc.FundingShimCancel.
 * Use `create(FundingShimCancelSchema)` to create a new message.
 */
export declare const FundingShimCancelSchema: GenMessage<FundingShimCancel>;
/**
 * @generated from message lnrpc.FundingPsbtVerify
 */
export type FundingPsbtVerify = Message<"lnrpc.FundingPsbtVerify"> & {
    /**
     *
     * The funded but not yet signed PSBT that sends the exact channel capacity
     * amount to the PK script returned in the open channel message in a previous
     * step.
     *
     * @generated from field: bytes funded_psbt = 1;
     */
    fundedPsbt: Uint8Array;
    /**
     * The pending channel ID of the channel to get the PSBT for.
     *
     * @generated from field: bytes pending_chan_id = 2;
     */
    pendingChanId: Uint8Array;
    /**
     *
     * Can only be used if the no_publish flag was set to true in the OpenChannel
     * call meaning that the caller is solely responsible for publishing the final
     * funding transaction. If skip_finalize is set to true then lnd will not wait
     * for a FundingPsbtFinalize state step and instead assumes that a transaction
     * with the same TXID as the passed in PSBT will eventually confirm.
     * IT IS ABSOLUTELY IMPERATIVE that the TXID of the transaction that is
     * eventually published does have the _same TXID_ as the verified PSBT. That
     * means no inputs or outputs can change, only signatures can be added. If the
     * TXID changes between this call and the publish step then the channel will
     * never be created and the funds will be in limbo.
     *
     * @generated from field: bool skip_finalize = 3;
     */
    skipFinalize: boolean;
};
/**
 * Describes the message lnrpc.FundingPsbtVerify.
 * Use `create(FundingPsbtVerifySchema)` to create a new message.
 */
export declare const FundingPsbtVerifySchema: GenMessage<FundingPsbtVerify>;
/**
 * @generated from message lnrpc.FundingPsbtFinalize
 */
export type FundingPsbtFinalize = Message<"lnrpc.FundingPsbtFinalize"> & {
    /**
     *
     * The funded PSBT that contains all witness data to send the exact channel
     * capacity amount to the PK script returned in the open channel message in a
     * previous step. Cannot be set at the same time as final_raw_tx.
     *
     * @generated from field: bytes signed_psbt = 1;
     */
    signedPsbt: Uint8Array;
    /**
     * The pending channel ID of the channel to get the PSBT for.
     *
     * @generated from field: bytes pending_chan_id = 2;
     */
    pendingChanId: Uint8Array;
    /**
     *
     * As an alternative to the signed PSBT with all witness data, the final raw
     * wire format transaction can also be specified directly. Cannot be set at the
     * same time as signed_psbt.
     *
     * @generated from field: bytes final_raw_tx = 3;
     */
    finalRawTx: Uint8Array;
};
/**
 * Describes the message lnrpc.FundingPsbtFinalize.
 * Use `create(FundingPsbtFinalizeSchema)` to create a new message.
 */
export declare const FundingPsbtFinalizeSchema: GenMessage<FundingPsbtFinalize>;
/**
 * @generated from message lnrpc.FundingTransitionMsg
 */
export type FundingTransitionMsg = Message<"lnrpc.FundingTransitionMsg"> & {
    /**
     * @generated from oneof lnrpc.FundingTransitionMsg.trigger
     */
    trigger: {
        /**
         *
         * The funding shim to register. This should be used before any
         * channel funding has began by the remote party, as it is intended as a
         * preparatory step for the full channel funding.
         *
         * @generated from field: lnrpc.FundingShim shim_register = 1;
         */
        value: FundingShim;
        case: "shimRegister";
    } | {
        /**
         * Used to cancel an existing registered funding shim.
         *
         * @generated from field: lnrpc.FundingShimCancel shim_cancel = 2;
         */
        value: FundingShimCancel;
        case: "shimCancel";
    } | {
        /**
         *
         * Used to continue a funding flow that was initiated to be executed
         * through a PSBT. This step verifies that the PSBT contains the correct
         * outputs to fund the channel.
         *
         * @generated from field: lnrpc.FundingPsbtVerify psbt_verify = 3;
         */
        value: FundingPsbtVerify;
        case: "psbtVerify";
    } | {
        /**
         *
         * Used to continue a funding flow that was initiated to be executed
         * through a PSBT. This step finalizes the funded and signed PSBT, finishes
         * negotiation with the peer and finally publishes the resulting funding
         * transaction.
         *
         * @generated from field: lnrpc.FundingPsbtFinalize psbt_finalize = 4;
         */
        value: FundingPsbtFinalize;
        case: "psbtFinalize";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message lnrpc.FundingTransitionMsg.
 * Use `create(FundingTransitionMsgSchema)` to create a new message.
 */
export declare const FundingTransitionMsgSchema: GenMessage<FundingTransitionMsg>;
/**
 * @generated from message lnrpc.FundingStateStepResp
 */
export type FundingStateStepResp = Message<"lnrpc.FundingStateStepResp"> & {};
/**
 * Describes the message lnrpc.FundingStateStepResp.
 * Use `create(FundingStateStepRespSchema)` to create a new message.
 */
export declare const FundingStateStepRespSchema: GenMessage<FundingStateStepResp>;
/**
 * @generated from message lnrpc.PendingHTLC
 */
export type PendingHTLC = Message<"lnrpc.PendingHTLC"> & {
    /**
     * The direction within the channel that the htlc was sent
     *
     * @generated from field: bool incoming = 1;
     */
    incoming: boolean;
    /**
     * The total value of the htlc
     *
     * @generated from field: int64 amount = 2;
     */
    amount: bigint;
    /**
     * The final output to be swept back to the user's wallet
     *
     * @generated from field: string outpoint = 3;
     */
    outpoint: string;
    /**
     * The next block height at which we can spend the current stage
     *
     * @generated from field: uint32 maturity_height = 4;
     */
    maturityHeight: number;
    /**
     *
     * The number of blocks remaining until the current stage can be swept.
     * Negative values indicate how many blocks have passed since becoming
     * mature.
     *
     * @generated from field: int32 blocks_til_maturity = 5;
     */
    blocksTilMaturity: number;
    /**
     * Indicates whether the htlc is in its first or second stage of recovery
     *
     * @generated from field: uint32 stage = 6;
     */
    stage: number;
};
/**
 * Describes the message lnrpc.PendingHTLC.
 * Use `create(PendingHTLCSchema)` to create a new message.
 */
export declare const PendingHTLCSchema: GenMessage<PendingHTLC>;
/**
 * @generated from message lnrpc.PendingChannelsRequest
 */
export type PendingChannelsRequest = Message<"lnrpc.PendingChannelsRequest"> & {};
/**
 * Describes the message lnrpc.PendingChannelsRequest.
 * Use `create(PendingChannelsRequestSchema)` to create a new message.
 */
export declare const PendingChannelsRequestSchema: GenMessage<PendingChannelsRequest>;
/**
 * @generated from message lnrpc.PendingChannelsResponse
 */
export type PendingChannelsResponse = Message<"lnrpc.PendingChannelsResponse"> & {
    /**
     * The balance in satoshis encumbered in pending channels
     *
     * @generated from field: int64 total_limbo_balance = 1;
     */
    totalLimboBalance: bigint;
    /**
     * Channels pending opening
     *
     * @generated from field: repeated lnrpc.PendingChannelsResponse.PendingOpenChannel pending_open_channels = 2;
     */
    pendingOpenChannels: PendingChannelsResponse_PendingOpenChannel[];
    /**
     *
     * Deprecated: Channels pending closing previously contained cooperatively
     * closed channels with a single confirmation. These channels are now
     * considered closed from the time we see them on chain.
     *
     * @generated from field: repeated lnrpc.PendingChannelsResponse.ClosedChannel pending_closing_channels = 3 [deprecated = true];
     * @deprecated
     */
    pendingClosingChannels: PendingChannelsResponse_ClosedChannel[];
    /**
     * Channels pending force closing
     *
     * @generated from field: repeated lnrpc.PendingChannelsResponse.ForceClosedChannel pending_force_closing_channels = 4;
     */
    pendingForceClosingChannels: PendingChannelsResponse_ForceClosedChannel[];
    /**
     * Channels waiting for closing tx to confirm
     *
     * @generated from field: repeated lnrpc.PendingChannelsResponse.WaitingCloseChannel waiting_close_channels = 5;
     */
    waitingCloseChannels: PendingChannelsResponse_WaitingCloseChannel[];
};
/**
 * Describes the message lnrpc.PendingChannelsResponse.
 * Use `create(PendingChannelsResponseSchema)` to create a new message.
 */
export declare const PendingChannelsResponseSchema: GenMessage<PendingChannelsResponse>;
/**
 * @generated from message lnrpc.PendingChannelsResponse.PendingChannel
 */
export type PendingChannelsResponse_PendingChannel = Message<"lnrpc.PendingChannelsResponse.PendingChannel"> & {
    /**
     * @generated from field: string remote_node_pub = 1;
     */
    remoteNodePub: string;
    /**
     * @generated from field: string channel_point = 2;
     */
    channelPoint: string;
    /**
     * @generated from field: int64 capacity = 3;
     */
    capacity: bigint;
    /**
     * @generated from field: int64 local_balance = 4;
     */
    localBalance: bigint;
    /**
     * @generated from field: int64 remote_balance = 5;
     */
    remoteBalance: bigint;
    /**
     * The minimum satoshis this node is required to reserve in its
     * balance.
     *
     * @generated from field: int64 local_chan_reserve_sat = 6;
     */
    localChanReserveSat: bigint;
    /**
     *
     * The minimum satoshis the other node is required to reserve in its
     * balance.
     *
     * @generated from field: int64 remote_chan_reserve_sat = 7;
     */
    remoteChanReserveSat: bigint;
    /**
     * The party that initiated opening the channel.
     *
     * @generated from field: lnrpc.Initiator initiator = 8;
     */
    initiator: Initiator;
    /**
     * The commitment type used by this channel.
     *
     * @generated from field: lnrpc.CommitmentType commitment_type = 9;
     */
    commitmentType: CommitmentType;
    /**
     * Total number of forwarding packages created in this channel.
     *
     * @generated from field: int64 num_forwarding_packages = 10;
     */
    numForwardingPackages: bigint;
    /**
     * A set of flags showing the current state of the channel.
     *
     * @generated from field: string chan_status_flags = 11;
     */
    chanStatusFlags: string;
    /**
     * Whether this channel is advertised to the network or not.
     *
     * @generated from field: bool private = 12;
     */
    private: boolean;
    /**
     *
     * An optional note-to-self to go along with the channel containing some
     * useful information. This is only ever stored locally and in no way
     * impacts the channel's operation.
     *
     * @generated from field: string memo = 13;
     */
    memo: string;
};
/**
 * Describes the message lnrpc.PendingChannelsResponse.PendingChannel.
 * Use `create(PendingChannelsResponse_PendingChannelSchema)` to create a new message.
 */
export declare const PendingChannelsResponse_PendingChannelSchema: GenMessage<PendingChannelsResponse_PendingChannel>;
/**
 * @generated from message lnrpc.PendingChannelsResponse.PendingOpenChannel
 */
export type PendingChannelsResponse_PendingOpenChannel = Message<"lnrpc.PendingChannelsResponse.PendingOpenChannel"> & {
    /**
     * The pending channel
     *
     * @generated from field: lnrpc.PendingChannelsResponse.PendingChannel channel = 1;
     */
    channel?: PendingChannelsResponse_PendingChannel;
    /**
     *
     * The amount calculated to be paid in fees for the current set of
     * commitment transactions. The fee amount is persisted with the channel
     * in order to allow the fee amount to be removed and recalculated with
     * each channel state update, including updates that happen after a system
     * restart.
     *
     * @generated from field: int64 commit_fee = 4;
     */
    commitFee: bigint;
    /**
     * The weight of the commitment transaction
     *
     * @generated from field: int64 commit_weight = 5;
     */
    commitWeight: bigint;
    /**
     *
     * The required number of satoshis per kilo-weight that the requester will
     * pay at all times, for both the funding transaction and commitment
     * transaction. This value can later be updated once the channel is open.
     *
     * @generated from field: int64 fee_per_kw = 6;
     */
    feePerKw: bigint;
    /**
     * The number of blocks until the funding transaction is considered
     * expired. If this value gets close to zero, there is a risk that the
     * channel funding will be canceled by the channel responder. The
     * channel should be fee bumped using CPFP (see walletrpc.BumpFee) to
     * ensure that the channel confirms in time. Otherwise a force-close
     * will be necessary if the channel confirms after the funding
     * transaction expires. A negative value means the channel responder has
     * very likely canceled the funding and the channel will never become
     * fully operational.
     *
     * @generated from field: int32 funding_expiry_blocks = 3;
     */
    fundingExpiryBlocks: number;
};
/**
 * Describes the message lnrpc.PendingChannelsResponse.PendingOpenChannel.
 * Use `create(PendingChannelsResponse_PendingOpenChannelSchema)` to create a new message.
 */
export declare const PendingChannelsResponse_PendingOpenChannelSchema: GenMessage<PendingChannelsResponse_PendingOpenChannel>;
/**
 * @generated from message lnrpc.PendingChannelsResponse.WaitingCloseChannel
 */
export type PendingChannelsResponse_WaitingCloseChannel = Message<"lnrpc.PendingChannelsResponse.WaitingCloseChannel"> & {
    /**
     * The pending channel waiting for closing tx to confirm
     *
     * @generated from field: lnrpc.PendingChannelsResponse.PendingChannel channel = 1;
     */
    channel?: PendingChannelsResponse_PendingChannel;
    /**
     * The balance in satoshis encumbered in this channel
     *
     * @generated from field: int64 limbo_balance = 2;
     */
    limboBalance: bigint;
    /**
     *
     * A list of valid commitment transactions. Any of these can confirm at
     * this point.
     *
     * @generated from field: lnrpc.PendingChannelsResponse.Commitments commitments = 3;
     */
    commitments?: PendingChannelsResponse_Commitments;
    /**
     * The transaction id of the closing transaction
     *
     * @generated from field: string closing_txid = 4;
     */
    closingTxid: string;
};
/**
 * Describes the message lnrpc.PendingChannelsResponse.WaitingCloseChannel.
 * Use `create(PendingChannelsResponse_WaitingCloseChannelSchema)` to create a new message.
 */
export declare const PendingChannelsResponse_WaitingCloseChannelSchema: GenMessage<PendingChannelsResponse_WaitingCloseChannel>;
/**
 * @generated from message lnrpc.PendingChannelsResponse.Commitments
 */
export type PendingChannelsResponse_Commitments = Message<"lnrpc.PendingChannelsResponse.Commitments"> & {
    /**
     * Hash of the local version of the commitment tx.
     *
     * @generated from field: string local_txid = 1;
     */
    localTxid: string;
    /**
     * Hash of the remote version of the commitment tx.
     *
     * @generated from field: string remote_txid = 2;
     */
    remoteTxid: string;
    /**
     * Hash of the remote pending version of the commitment tx.
     *
     * @generated from field: string remote_pending_txid = 3;
     */
    remotePendingTxid: string;
    /**
     *
     * The amount in satoshis calculated to be paid in fees for the local
     * commitment.
     *
     * @generated from field: uint64 local_commit_fee_sat = 4;
     */
    localCommitFeeSat: bigint;
    /**
     *
     * The amount in satoshis calculated to be paid in fees for the remote
     * commitment.
     *
     * @generated from field: uint64 remote_commit_fee_sat = 5;
     */
    remoteCommitFeeSat: bigint;
    /**
     *
     * The amount in satoshis calculated to be paid in fees for the remote
     * pending commitment.
     *
     * @generated from field: uint64 remote_pending_commit_fee_sat = 6;
     */
    remotePendingCommitFeeSat: bigint;
};
/**
 * Describes the message lnrpc.PendingChannelsResponse.Commitments.
 * Use `create(PendingChannelsResponse_CommitmentsSchema)` to create a new message.
 */
export declare const PendingChannelsResponse_CommitmentsSchema: GenMessage<PendingChannelsResponse_Commitments>;
/**
 * @generated from message lnrpc.PendingChannelsResponse.ClosedChannel
 */
export type PendingChannelsResponse_ClosedChannel = Message<"lnrpc.PendingChannelsResponse.ClosedChannel"> & {
    /**
     * The pending channel to be closed
     *
     * @generated from field: lnrpc.PendingChannelsResponse.PendingChannel channel = 1;
     */
    channel?: PendingChannelsResponse_PendingChannel;
    /**
     * The transaction id of the closing transaction
     *
     * @generated from field: string closing_txid = 2;
     */
    closingTxid: string;
};
/**
 * Describes the message lnrpc.PendingChannelsResponse.ClosedChannel.
 * Use `create(PendingChannelsResponse_ClosedChannelSchema)` to create a new message.
 */
export declare const PendingChannelsResponse_ClosedChannelSchema: GenMessage<PendingChannelsResponse_ClosedChannel>;
/**
 * @generated from message lnrpc.PendingChannelsResponse.ForceClosedChannel
 */
export type PendingChannelsResponse_ForceClosedChannel = Message<"lnrpc.PendingChannelsResponse.ForceClosedChannel"> & {
    /**
     * The pending channel to be force closed
     *
     * @generated from field: lnrpc.PendingChannelsResponse.PendingChannel channel = 1;
     */
    channel?: PendingChannelsResponse_PendingChannel;
    /**
     * The transaction id of the closing transaction
     *
     * @generated from field: string closing_txid = 2;
     */
    closingTxid: string;
    /**
     * The balance in satoshis encumbered in this pending channel
     *
     * @generated from field: int64 limbo_balance = 3;
     */
    limboBalance: bigint;
    /**
     * The height at which funds can be swept into the wallet
     *
     * @generated from field: uint32 maturity_height = 4;
     */
    maturityHeight: number;
    /**
     *
     * Remaining # of blocks until the commitment output can be swept.
     * Negative values indicate how many blocks have passed since becoming
     * mature.
     *
     * @generated from field: int32 blocks_til_maturity = 5;
     */
    blocksTilMaturity: number;
    /**
     * The total value of funds successfully recovered from this channel
     *
     * @generated from field: int64 recovered_balance = 6;
     */
    recoveredBalance: bigint;
    /**
     * @generated from field: repeated lnrpc.PendingHTLC pending_htlcs = 8;
     */
    pendingHtlcs: PendingHTLC[];
    /**
     * @generated from field: lnrpc.PendingChannelsResponse.ForceClosedChannel.AnchorState anchor = 9;
     */
    anchor: PendingChannelsResponse_ForceClosedChannel_AnchorState;
};
/**
 * Describes the message lnrpc.PendingChannelsResponse.ForceClosedChannel.
 * Use `create(PendingChannelsResponse_ForceClosedChannelSchema)` to create a new message.
 */
export declare const PendingChannelsResponse_ForceClosedChannelSchema: GenMessage<PendingChannelsResponse_ForceClosedChannel>;
/**
 *
 * There are three resolution states for the anchor:
 * limbo, lost and recovered. Derive the current state
 * from the limbo and recovered balances.
 *
 * @generated from enum lnrpc.PendingChannelsResponse.ForceClosedChannel.AnchorState
 */
export declare enum PendingChannelsResponse_ForceClosedChannel_AnchorState {
    /**
     * The recovered_balance is zero and limbo_balance is non-zero.
     *
     * @generated from enum value: LIMBO = 0;
     */
    LIMBO = 0,
    /**
     * The recovered_balance is non-zero.
     *
     * @generated from enum value: RECOVERED = 1;
     */
    RECOVERED = 1,
    /**
     * A state that is neither LIMBO nor RECOVERED.
     *
     * @generated from enum value: LOST = 2;
     */
    LOST = 2
}
/**
 * Describes the enum lnrpc.PendingChannelsResponse.ForceClosedChannel.AnchorState.
 */
export declare const PendingChannelsResponse_ForceClosedChannel_AnchorStateSchema: GenEnum<PendingChannelsResponse_ForceClosedChannel_AnchorState>;
/**
 * @generated from message lnrpc.ChannelEventSubscription
 */
export type ChannelEventSubscription = Message<"lnrpc.ChannelEventSubscription"> & {};
/**
 * Describes the message lnrpc.ChannelEventSubscription.
 * Use `create(ChannelEventSubscriptionSchema)` to create a new message.
 */
export declare const ChannelEventSubscriptionSchema: GenMessage<ChannelEventSubscription>;
/**
 * @generated from message lnrpc.ChannelEventUpdate
 */
export type ChannelEventUpdate = Message<"lnrpc.ChannelEventUpdate"> & {
    /**
     * @generated from oneof lnrpc.ChannelEventUpdate.channel
     */
    channel: {
        /**
         * @generated from field: lnrpc.Channel open_channel = 1;
         */
        value: Channel;
        case: "openChannel";
    } | {
        /**
         * @generated from field: lnrpc.ChannelCloseSummary closed_channel = 2;
         */
        value: ChannelCloseSummary;
        case: "closedChannel";
    } | {
        /**
         * @generated from field: lnrpc.ChannelPoint active_channel = 3;
         */
        value: ChannelPoint;
        case: "activeChannel";
    } | {
        /**
         * @generated from field: lnrpc.ChannelPoint inactive_channel = 4;
         */
        value: ChannelPoint;
        case: "inactiveChannel";
    } | {
        /**
         * @generated from field: lnrpc.PendingUpdate pending_open_channel = 6;
         */
        value: PendingUpdate;
        case: "pendingOpenChannel";
    } | {
        /**
         * @generated from field: lnrpc.ChannelPoint fully_resolved_channel = 7;
         */
        value: ChannelPoint;
        case: "fullyResolvedChannel";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * @generated from field: lnrpc.ChannelEventUpdate.UpdateType type = 5;
     */
    type: ChannelEventUpdate_UpdateType;
};
/**
 * Describes the message lnrpc.ChannelEventUpdate.
 * Use `create(ChannelEventUpdateSchema)` to create a new message.
 */
export declare const ChannelEventUpdateSchema: GenMessage<ChannelEventUpdate>;
/**
 * @generated from enum lnrpc.ChannelEventUpdate.UpdateType
 */
export declare enum ChannelEventUpdate_UpdateType {
    /**
     * @generated from enum value: OPEN_CHANNEL = 0;
     */
    OPEN_CHANNEL = 0,
    /**
     * @generated from enum value: CLOSED_CHANNEL = 1;
     */
    CLOSED_CHANNEL = 1,
    /**
     * @generated from enum value: ACTIVE_CHANNEL = 2;
     */
    ACTIVE_CHANNEL = 2,
    /**
     * @generated from enum value: INACTIVE_CHANNEL = 3;
     */
    INACTIVE_CHANNEL = 3,
    /**
     * @generated from enum value: PENDING_OPEN_CHANNEL = 4;
     */
    PENDING_OPEN_CHANNEL = 4,
    /**
     * @generated from enum value: FULLY_RESOLVED_CHANNEL = 5;
     */
    FULLY_RESOLVED_CHANNEL = 5
}
/**
 * Describes the enum lnrpc.ChannelEventUpdate.UpdateType.
 */
export declare const ChannelEventUpdate_UpdateTypeSchema: GenEnum<ChannelEventUpdate_UpdateType>;
/**
 * @generated from message lnrpc.WalletAccountBalance
 */
export type WalletAccountBalance = Message<"lnrpc.WalletAccountBalance"> & {
    /**
     * The confirmed balance of the account (with >= 1 confirmations).
     *
     * @generated from field: int64 confirmed_balance = 1;
     */
    confirmedBalance: bigint;
    /**
     * The unconfirmed balance of the account (with 0 confirmations).
     *
     * @generated from field: int64 unconfirmed_balance = 2;
     */
    unconfirmedBalance: bigint;
};
/**
 * Describes the message lnrpc.WalletAccountBalance.
 * Use `create(WalletAccountBalanceSchema)` to create a new message.
 */
export declare const WalletAccountBalanceSchema: GenMessage<WalletAccountBalance>;
/**
 * @generated from message lnrpc.WalletBalanceRequest
 */
export type WalletBalanceRequest = Message<"lnrpc.WalletBalanceRequest"> & {
    /**
     * The wallet account the balance is shown for.
     * If this is not specified, the balance of the "default" account is shown.
     *
     * @generated from field: string account = 1;
     */
    account: string;
};
/**
 * Describes the message lnrpc.WalletBalanceRequest.
 * Use `create(WalletBalanceRequestSchema)` to create a new message.
 */
export declare const WalletBalanceRequestSchema: GenMessage<WalletBalanceRequest>;
/**
 * @generated from message lnrpc.WalletBalanceResponse
 */
export type WalletBalanceResponse = Message<"lnrpc.WalletBalanceResponse"> & {
    /**
     * The balance of the wallet
     *
     * @generated from field: int64 total_balance = 1;
     */
    totalBalance: bigint;
    /**
     * The confirmed balance of a wallet(with >= 1 confirmations)
     *
     * @generated from field: int64 confirmed_balance = 2;
     */
    confirmedBalance: bigint;
    /**
     * The unconfirmed balance of a wallet(with 0 confirmations)
     *
     * @generated from field: int64 unconfirmed_balance = 3;
     */
    unconfirmedBalance: bigint;
    /**
     * The total amount of wallet UTXOs held in outputs that are locked for
     * other usage.
     *
     * @generated from field: int64 locked_balance = 5;
     */
    lockedBalance: bigint;
    /**
     * The amount of reserve required.
     *
     * @generated from field: int64 reserved_balance_anchor_chan = 6;
     */
    reservedBalanceAnchorChan: bigint;
    /**
     * A mapping of each wallet account's name to its balance.
     *
     * @generated from field: map<string, lnrpc.WalletAccountBalance> account_balance = 4;
     */
    accountBalance: {
        [key: string]: WalletAccountBalance;
    };
};
/**
 * Describes the message lnrpc.WalletBalanceResponse.
 * Use `create(WalletBalanceResponseSchema)` to create a new message.
 */
export declare const WalletBalanceResponseSchema: GenMessage<WalletBalanceResponse>;
/**
 * @generated from message lnrpc.Amount
 */
export type Amount = Message<"lnrpc.Amount"> & {
    /**
     * Value denominated in satoshis.
     *
     * @generated from field: uint64 sat = 1;
     */
    sat: bigint;
    /**
     * Value denominated in milli-satoshis.
     *
     * @generated from field: uint64 msat = 2;
     */
    msat: bigint;
};
/**
 * Describes the message lnrpc.Amount.
 * Use `create(AmountSchema)` to create a new message.
 */
export declare const AmountSchema: GenMessage<Amount>;
/**
 * @generated from message lnrpc.ChannelBalanceRequest
 */
export type ChannelBalanceRequest = Message<"lnrpc.ChannelBalanceRequest"> & {};
/**
 * Describes the message lnrpc.ChannelBalanceRequest.
 * Use `create(ChannelBalanceRequestSchema)` to create a new message.
 */
export declare const ChannelBalanceRequestSchema: GenMessage<ChannelBalanceRequest>;
/**
 * @generated from message lnrpc.ChannelBalanceResponse
 */
export type ChannelBalanceResponse = Message<"lnrpc.ChannelBalanceResponse"> & {
    /**
     * Deprecated. Sum of channels balances denominated in satoshis
     *
     * @generated from field: int64 balance = 1 [deprecated = true];
     * @deprecated
     */
    balance: bigint;
    /**
     * Deprecated. Sum of channels pending balances denominated in satoshis
     *
     * @generated from field: int64 pending_open_balance = 2 [deprecated = true];
     * @deprecated
     */
    pendingOpenBalance: bigint;
    /**
     * Sum of channels local balances.
     *
     * @generated from field: lnrpc.Amount local_balance = 3;
     */
    localBalance?: Amount;
    /**
     * Sum of channels remote balances.
     *
     * @generated from field: lnrpc.Amount remote_balance = 4;
     */
    remoteBalance?: Amount;
    /**
     * Sum of channels local unsettled balances.
     *
     * @generated from field: lnrpc.Amount unsettled_local_balance = 5;
     */
    unsettledLocalBalance?: Amount;
    /**
     * Sum of channels remote unsettled balances.
     *
     * @generated from field: lnrpc.Amount unsettled_remote_balance = 6;
     */
    unsettledRemoteBalance?: Amount;
    /**
     * Sum of channels pending local balances.
     *
     * @generated from field: lnrpc.Amount pending_open_local_balance = 7;
     */
    pendingOpenLocalBalance?: Amount;
    /**
     * Sum of channels pending remote balances.
     *
     * @generated from field: lnrpc.Amount pending_open_remote_balance = 8;
     */
    pendingOpenRemoteBalance?: Amount;
};
/**
 * Describes the message lnrpc.ChannelBalanceResponse.
 * Use `create(ChannelBalanceResponseSchema)` to create a new message.
 */
export declare const ChannelBalanceResponseSchema: GenMessage<ChannelBalanceResponse>;
/**
 * @generated from message lnrpc.QueryRoutesRequest
 */
export type QueryRoutesRequest = Message<"lnrpc.QueryRoutesRequest"> & {
    /**
     * The 33-byte hex-encoded public key for the payment destination
     *
     * @generated from field: string pub_key = 1;
     */
    pubKey: string;
    /**
     *
     * The amount to send expressed in satoshis.
     *
     * The fields amt and amt_msat are mutually exclusive.
     *
     * @generated from field: int64 amt = 2;
     */
    amt: bigint;
    /**
     *
     * The amount to send expressed in millisatoshis.
     *
     * The fields amt and amt_msat are mutually exclusive.
     *
     * @generated from field: int64 amt_msat = 12;
     */
    amtMsat: bigint;
    /**
     *
     * An optional CLTV delta from the current height that should be used for the
     * timelock of the final hop. Note that unlike SendPayment, QueryRoutes does
     * not add any additional block padding on top of final_ctlv_delta. This
     * padding of a few blocks needs to be added manually or otherwise failures may
     * happen when a block comes in while the payment is in flight.
     *
     * @generated from field: int32 final_cltv_delta = 4;
     */
    finalCltvDelta: number;
    /**
     *
     * The maximum number of satoshis that will be paid as a fee of the payment.
     * This value can be represented either as a percentage of the amount being
     * sent, or as a fixed amount of the maximum fee the user is willing the pay to
     * send the payment. If not specified, lnd will use a default value of 100%
     * fees for small amounts (<=1k sat) or 5% fees for larger amounts.
     *
     * @generated from field: lnrpc.FeeLimit fee_limit = 5;
     */
    feeLimit?: FeeLimit;
    /**
     *
     * A list of nodes to ignore during path finding. When using REST, these fields
     * must be encoded as base64.
     *
     * @generated from field: repeated bytes ignored_nodes = 6;
     */
    ignoredNodes: Uint8Array[];
    /**
     *
     * Deprecated. A list of edges to ignore during path finding.
     *
     * @generated from field: repeated lnrpc.EdgeLocator ignored_edges = 7 [deprecated = true];
     * @deprecated
     */
    ignoredEdges: EdgeLocator[];
    /**
     *
     * The source node where the request route should originated from. If empty,
     * self is assumed.
     *
     * @generated from field: string source_pub_key = 8;
     */
    sourcePubKey: string;
    /**
     *
     * If set to true, edge probabilities from mission control will be used to get
     * the optimal route.
     *
     * @generated from field: bool use_mission_control = 9;
     */
    useMissionControl: boolean;
    /**
     *
     * A list of directed node pairs that will be ignored during path finding.
     *
     * @generated from field: repeated lnrpc.NodePair ignored_pairs = 10;
     */
    ignoredPairs: NodePair[];
    /**
     *
     * An optional maximum total time lock for the route. If the source is empty or
     * ourselves, this should not exceed lnd's `--max-cltv-expiry` setting. If
     * zero, then the value of `--max-cltv-expiry` is used as the limit.
     *
     * @generated from field: uint32 cltv_limit = 11;
     */
    cltvLimit: number;
    /**
     *
     * An optional field that can be used to pass an arbitrary set of TLV records
     * to a peer which understands the new records. This can be used to pass
     * application specific data during the payment attempt. If the destination
     * does not support the specified records, an error will be returned.
     * Record types are required to be in the custom range >= 65536. When using
     * REST, the values must be encoded as base64.
     *
     * @generated from field: map<uint64, bytes> dest_custom_records = 13;
     */
    destCustomRecords: {
        [key: string]: Uint8Array;
    };
    /**
     *
     * The channel id of the channel that must be taken to the first hop. If zero,
     * any channel may be used.
     *
     * @generated from field: uint64 outgoing_chan_id = 14 [jstype = JS_STRING];
     */
    outgoingChanId: string;
    /**
     *
     * The pubkey of the last hop of the route. If empty, any hop may be used.
     *
     * @generated from field: bytes last_hop_pubkey = 15;
     */
    lastHopPubkey: Uint8Array;
    /**
     *
     * Optional route hints to reach the destination through private channels.
     *
     * @generated from field: repeated lnrpc.RouteHint route_hints = 16;
     */
    routeHints: RouteHint[];
    /**
     *
     * Features assumed to be supported by the final node. All transitive feature
     * dependencies must also be set properly. For a given feature bit pair, either
     * optional or remote may be set, but not both. If this field is nil or empty,
     * the router will try to load destination features from the graph as a
     * fallback.
     *
     * @generated from field: repeated lnrpc.FeatureBit dest_features = 17;
     */
    destFeatures: FeatureBit[];
    /**
     *
     * The time preference for this payment. Set to -1 to optimize for fees
     * only, to 1 to optimize for reliability only or a value inbetween for a mix.
     *
     * @generated from field: double time_pref = 18;
     */
    timePref: number;
};
/**
 * Describes the message lnrpc.QueryRoutesRequest.
 * Use `create(QueryRoutesRequestSchema)` to create a new message.
 */
export declare const QueryRoutesRequestSchema: GenMessage<QueryRoutesRequest>;
/**
 * @generated from message lnrpc.NodePair
 */
export type NodePair = Message<"lnrpc.NodePair"> & {
    /**
     *
     * The sending node of the pair. When using REST, this field must be encoded as
     * base64.
     *
     * @generated from field: bytes from = 1;
     */
    from: Uint8Array;
    /**
     *
     * The receiving node of the pair. When using REST, this field must be encoded
     * as base64.
     *
     * @generated from field: bytes to = 2;
     */
    to: Uint8Array;
};
/**
 * Describes the message lnrpc.NodePair.
 * Use `create(NodePairSchema)` to create a new message.
 */
export declare const NodePairSchema: GenMessage<NodePair>;
/**
 * @generated from message lnrpc.EdgeLocator
 */
export type EdgeLocator = Message<"lnrpc.EdgeLocator"> & {
    /**
     * The short channel id of this edge.
     *
     * @generated from field: uint64 channel_id = 1 [jstype = JS_STRING];
     */
    channelId: string;
    /**
     *
     * The direction of this edge. If direction_reverse is false, the direction
     * of this edge is from the channel endpoint with the lexicographically smaller
     * pub key to the endpoint with the larger pub key. If direction_reverse is
     * is true, the edge goes the other way.
     *
     * @generated from field: bool direction_reverse = 2;
     */
    directionReverse: boolean;
};
/**
 * Describes the message lnrpc.EdgeLocator.
 * Use `create(EdgeLocatorSchema)` to create a new message.
 */
export declare const EdgeLocatorSchema: GenMessage<EdgeLocator>;
/**
 * @generated from message lnrpc.QueryRoutesResponse
 */
export type QueryRoutesResponse = Message<"lnrpc.QueryRoutesResponse"> & {
    /**
     *
     * The route that results from the path finding operation. This is still a
     * repeated field to retain backwards compatibility.
     *
     * @generated from field: repeated lnrpc.Route routes = 1;
     */
    routes: Route[];
    /**
     *
     * The success probability of the returned route based on the current mission
     * control state. [EXPERIMENTAL]
     *
     * @generated from field: double success_prob = 2;
     */
    successProb: number;
};
/**
 * Describes the message lnrpc.QueryRoutesResponse.
 * Use `create(QueryRoutesResponseSchema)` to create a new message.
 */
export declare const QueryRoutesResponseSchema: GenMessage<QueryRoutesResponse>;
/**
 * @generated from message lnrpc.Hop
 */
export type Hop = Message<"lnrpc.Hop"> & {
    /**
     *
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     *
     * @generated from field: uint64 chan_id = 1 [jstype = JS_STRING];
     */
    chanId: string;
    /**
     * @generated from field: int64 chan_capacity = 2 [deprecated = true];
     * @deprecated
     */
    chanCapacity: bigint;
    /**
     * @generated from field: int64 amt_to_forward = 3 [deprecated = true];
     * @deprecated
     */
    amtToForward: bigint;
    /**
     * @generated from field: int64 fee = 4 [deprecated = true];
     * @deprecated
     */
    fee: bigint;
    /**
     * @generated from field: uint32 expiry = 5;
     */
    expiry: number;
    /**
     * @generated from field: int64 amt_to_forward_msat = 6;
     */
    amtToForwardMsat: bigint;
    /**
     * @generated from field: int64 fee_msat = 7;
     */
    feeMsat: bigint;
    /**
     *
     * An optional public key of the hop. If the public key is given, the payment
     * can be executed without relying on a copy of the channel graph.
     *
     * @generated from field: string pub_key = 8;
     */
    pubKey: string;
    /**
     *
     * If set to true, then this hop will be encoded using the new variable length
     * TLV format. Note that if any custom tlv_records below are specified, then
     * this field MUST be set to true for them to be encoded properly.
     *
     * @generated from field: bool tlv_payload = 9 [deprecated = true];
     * @deprecated
     */
    tlvPayload: boolean;
    /**
     *
     * An optional TLV record that signals the use of an MPP payment. If present,
     * the receiver will enforce that the same mpp_record is included in the final
     * hop payload of all non-zero payments in the HTLC set. If empty, a regular
     * single-shot payment is or was attempted.
     *
     * @generated from field: lnrpc.MPPRecord mpp_record = 10;
     */
    mppRecord?: MPPRecord;
    /**
     *
     * An optional TLV record that signals the use of an AMP payment. If present,
     * the receiver will treat all received payments including the same
     * (payment_addr, set_id) pair  as being part of one logical payment. The
     * payment will be settled by XORing the root_share's together and deriving the
     * child hashes and preimages according to BOLT XX. Must be used in conjunction
     * with mpp_record.
     *
     * @generated from field: lnrpc.AMPRecord amp_record = 12;
     */
    ampRecord?: AMPRecord;
    /**
     *
     * An optional set of key-value TLV records. This is useful within the context
     * of the SendToRoute call as it allows callers to specify arbitrary K-V pairs
     * to drop off at each hop within the onion.
     *
     * @generated from field: map<uint64, bytes> custom_records = 11;
     */
    customRecords: {
        [key: string]: Uint8Array;
    };
    /**
     * The payment metadata to send along with the payment to the payee.
     *
     * @generated from field: bytes metadata = 13;
     */
    metadata: Uint8Array;
};
/**
 * Describes the message lnrpc.Hop.
 * Use `create(HopSchema)` to create a new message.
 */
export declare const HopSchema: GenMessage<Hop>;
/**
 * @generated from message lnrpc.MPPRecord
 */
export type MPPRecord = Message<"lnrpc.MPPRecord"> & {
    /**
     *
     * A unique, random identifier used to authenticate the sender as the intended
     * payer of a multi-path payment. The payment_addr must be the same for all
     * subpayments, and match the payment_addr provided in the receiver's invoice.
     * The same payment_addr must be used on all subpayments.
     *
     * @generated from field: bytes payment_addr = 11;
     */
    paymentAddr: Uint8Array;
    /**
     *
     * The total amount in milli-satoshis being sent as part of a larger multi-path
     * payment. The caller is responsible for ensuring subpayments to the same node
     * and payment_hash sum exactly to total_amt_msat. The same
     * total_amt_msat must be used on all subpayments.
     *
     * @generated from field: int64 total_amt_msat = 10;
     */
    totalAmtMsat: bigint;
};
/**
 * Describes the message lnrpc.MPPRecord.
 * Use `create(MPPRecordSchema)` to create a new message.
 */
export declare const MPPRecordSchema: GenMessage<MPPRecord>;
/**
 * @generated from message lnrpc.AMPRecord
 */
export type AMPRecord = Message<"lnrpc.AMPRecord"> & {
    /**
     * @generated from field: bytes root_share = 1;
     */
    rootShare: Uint8Array;
    /**
     * @generated from field: bytes set_id = 2;
     */
    setId: Uint8Array;
    /**
     * @generated from field: uint32 child_index = 3;
     */
    childIndex: number;
};
/**
 * Describes the message lnrpc.AMPRecord.
 * Use `create(AMPRecordSchema)` to create a new message.
 */
export declare const AMPRecordSchema: GenMessage<AMPRecord>;
/**
 *
 * A path through the channel graph which runs over one or more channels in
 * succession. This struct carries all the information required to craft the
 * Sphinx onion packet, and send the payment along the first hop in the path. A
 * route is only selected as valid if all the channels have sufficient capacity to
 * carry the initial payment amount after fees are accounted for.
 *
 * @generated from message lnrpc.Route
 */
export type Route = Message<"lnrpc.Route"> & {
    /**
     *
     * The cumulative (final) time lock across the entire route. This is the CLTV
     * value that should be extended to the first hop in the route. All other hops
     * will decrement the time-lock as advertised, leaving enough time for all
     * hops to wait for or present the payment preimage to complete the payment.
     *
     * @generated from field: uint32 total_time_lock = 1;
     */
    totalTimeLock: number;
    /**
     *
     * The sum of the fees paid at each hop within the final route. In the case
     * of a one-hop payment, this value will be zero as we don't need to pay a fee
     * to ourselves.
     *
     * @generated from field: int64 total_fees = 2 [deprecated = true];
     * @deprecated
     */
    totalFees: bigint;
    /**
     *
     * The total amount of funds required to complete a payment over this route.
     * This value includes the cumulative fees at each hop. As a result, the HTLC
     * extended to the first-hop in the route will need to have at least this many
     * satoshis, otherwise the route will fail at an intermediate node due to an
     * insufficient amount of fees.
     *
     * @generated from field: int64 total_amt = 3 [deprecated = true];
     * @deprecated
     */
    totalAmt: bigint;
    /**
     *
     * Contains details concerning the specific forwarding details at each hop.
     *
     * @generated from field: repeated lnrpc.Hop hops = 4;
     */
    hops: Hop[];
    /**
     *
     * The total fees in millisatoshis.
     *
     * @generated from field: int64 total_fees_msat = 5;
     */
    totalFeesMsat: bigint;
    /**
     *
     * The total amount in millisatoshis.
     *
     * @generated from field: int64 total_amt_msat = 6;
     */
    totalAmtMsat: bigint;
};
/**
 * Describes the message lnrpc.Route.
 * Use `create(RouteSchema)` to create a new message.
 */
export declare const RouteSchema: GenMessage<Route>;
/**
 * @generated from message lnrpc.NodeInfoRequest
 */
export type NodeInfoRequest = Message<"lnrpc.NodeInfoRequest"> & {
    /**
     * The 33-byte hex-encoded compressed public of the target node
     *
     * @generated from field: string pub_key = 1;
     */
    pubKey: string;
    /**
     * If true, will include all known channels associated with the node.
     *
     * @generated from field: bool include_channels = 2;
     */
    includeChannels: boolean;
};
/**
 * Describes the message lnrpc.NodeInfoRequest.
 * Use `create(NodeInfoRequestSchema)` to create a new message.
 */
export declare const NodeInfoRequestSchema: GenMessage<NodeInfoRequest>;
/**
 * @generated from message lnrpc.NodeInfo
 */
export type NodeInfo = Message<"lnrpc.NodeInfo"> & {
    /**
     *
     * An individual vertex/node within the channel graph. A node is
     * connected to other nodes by one or more channel edges emanating from it. As
     * the graph is directed, a node will also have an incoming edge attached to
     * it for each outgoing edge.
     *
     * @generated from field: lnrpc.LightningNode node = 1;
     */
    node?: LightningNode;
    /**
     * The total number of channels for the node.
     *
     * @generated from field: uint32 num_channels = 2;
     */
    numChannels: number;
    /**
     * The sum of all channels capacity for the node, denominated in satoshis.
     *
     * @generated from field: int64 total_capacity = 3;
     */
    totalCapacity: bigint;
    /**
     * A list of all public channels for the node.
     *
     * @generated from field: repeated lnrpc.ChannelEdge channels = 4;
     */
    channels: ChannelEdge[];
};
/**
 * Describes the message lnrpc.NodeInfo.
 * Use `create(NodeInfoSchema)` to create a new message.
 */
export declare const NodeInfoSchema: GenMessage<NodeInfo>;
/**
 *
 * An individual vertex/node within the channel graph. A node is
 * connected to other nodes by one or more channel edges emanating from it. As the
 * graph is directed, a node will also have an incoming edge attached to it for
 * each outgoing edge.
 *
 * @generated from message lnrpc.LightningNode
 */
export type LightningNode = Message<"lnrpc.LightningNode"> & {
    /**
     * @generated from field: uint32 last_update = 1;
     */
    lastUpdate: number;
    /**
     * @generated from field: string pub_key = 2;
     */
    pubKey: string;
    /**
     * @generated from field: string alias = 3;
     */
    alias: string;
    /**
     * @generated from field: repeated lnrpc.NodeAddress addresses = 4;
     */
    addresses: NodeAddress[];
    /**
     * @generated from field: string color = 5;
     */
    color: string;
    /**
     * @generated from field: map<uint32, lnrpc.Feature> features = 6;
     */
    features: {
        [key: number]: Feature;
    };
    /**
     * Custom node announcement tlv records.
     *
     * @generated from field: map<uint64, bytes> custom_records = 7;
     */
    customRecords: {
        [key: string]: Uint8Array;
    };
};
/**
 * Describes the message lnrpc.LightningNode.
 * Use `create(LightningNodeSchema)` to create a new message.
 */
export declare const LightningNodeSchema: GenMessage<LightningNode>;
/**
 * @generated from message lnrpc.NodeAddress
 */
export type NodeAddress = Message<"lnrpc.NodeAddress"> & {
    /**
     * @generated from field: string network = 1;
     */
    network: string;
    /**
     * @generated from field: string addr = 2;
     */
    addr: string;
};
/**
 * Describes the message lnrpc.NodeAddress.
 * Use `create(NodeAddressSchema)` to create a new message.
 */
export declare const NodeAddressSchema: GenMessage<NodeAddress>;
/**
 * @generated from message lnrpc.RoutingPolicy
 */
export type RoutingPolicy = Message<"lnrpc.RoutingPolicy"> & {
    /**
     * @generated from field: uint32 time_lock_delta = 1;
     */
    timeLockDelta: number;
    /**
     * @generated from field: int64 min_htlc = 2;
     */
    minHtlc: bigint;
    /**
     * @generated from field: int64 fee_base_msat = 3;
     */
    feeBaseMsat: bigint;
    /**
     * @generated from field: int64 fee_rate_milli_msat = 4;
     */
    feeRateMilliMsat: bigint;
    /**
     * @generated from field: bool disabled = 5;
     */
    disabled: boolean;
    /**
     * @generated from field: uint64 max_htlc_msat = 6;
     */
    maxHtlcMsat: bigint;
    /**
     * @generated from field: uint32 last_update = 7;
     */
    lastUpdate: number;
    /**
     * Custom channel update tlv records.
     *
     * @generated from field: map<uint64, bytes> custom_records = 8;
     */
    customRecords: {
        [key: string]: Uint8Array;
    };
};
/**
 * Describes the message lnrpc.RoutingPolicy.
 * Use `create(RoutingPolicySchema)` to create a new message.
 */
export declare const RoutingPolicySchema: GenMessage<RoutingPolicy>;
/**
 *
 * A fully authenticated channel along with all its unique attributes.
 * Once an authenticated channel announcement has been processed on the network,
 * then an instance of ChannelEdgeInfo encapsulating the channels attributes is
 * stored. The other portions relevant to routing policy of a channel are stored
 * within a ChannelEdgePolicy for each direction of the channel.
 *
 * @generated from message lnrpc.ChannelEdge
 */
export type ChannelEdge = Message<"lnrpc.ChannelEdge"> & {
    /**
     *
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     *
     * @generated from field: uint64 channel_id = 1 [jstype = JS_STRING];
     */
    channelId: string;
    /**
     * @generated from field: string chan_point = 2;
     */
    chanPoint: string;
    /**
     * @generated from field: uint32 last_update = 3 [deprecated = true];
     * @deprecated
     */
    lastUpdate: number;
    /**
     * @generated from field: string node1_pub = 4;
     */
    node1Pub: string;
    /**
     * @generated from field: string node2_pub = 5;
     */
    node2Pub: string;
    /**
     * @generated from field: int64 capacity = 6;
     */
    capacity: bigint;
    /**
     * @generated from field: lnrpc.RoutingPolicy node1_policy = 7;
     */
    node1Policy?: RoutingPolicy;
    /**
     * @generated from field: lnrpc.RoutingPolicy node2_policy = 8;
     */
    node2Policy?: RoutingPolicy;
    /**
     * Custom channel announcement tlv records.
     *
     * @generated from field: map<uint64, bytes> custom_records = 9;
     */
    customRecords: {
        [key: string]: Uint8Array;
    };
};
/**
 * Describes the message lnrpc.ChannelEdge.
 * Use `create(ChannelEdgeSchema)` to create a new message.
 */
export declare const ChannelEdgeSchema: GenMessage<ChannelEdge>;
/**
 * @generated from message lnrpc.ChannelGraphRequest
 */
export type ChannelGraphRequest = Message<"lnrpc.ChannelGraphRequest"> & {
    /**
     *
     * Whether unannounced channels are included in the response or not. If set,
     * unannounced channels are included. Unannounced channels are both private
     * channels, and public channels that are not yet announced to the network.
     *
     * @generated from field: bool include_unannounced = 1;
     */
    includeUnannounced: boolean;
};
/**
 * Describes the message lnrpc.ChannelGraphRequest.
 * Use `create(ChannelGraphRequestSchema)` to create a new message.
 */
export declare const ChannelGraphRequestSchema: GenMessage<ChannelGraphRequest>;
/**
 * Returns a new instance of the directed channel graph.
 *
 * @generated from message lnrpc.ChannelGraph
 */
export type ChannelGraph = Message<"lnrpc.ChannelGraph"> & {
    /**
     * The list of `LightningNode`s in this channel graph
     *
     * @generated from field: repeated lnrpc.LightningNode nodes = 1;
     */
    nodes: LightningNode[];
    /**
     * The list of `ChannelEdge`s in this channel graph
     *
     * @generated from field: repeated lnrpc.ChannelEdge edges = 2;
     */
    edges: ChannelEdge[];
};
/**
 * Describes the message lnrpc.ChannelGraph.
 * Use `create(ChannelGraphSchema)` to create a new message.
 */
export declare const ChannelGraphSchema: GenMessage<ChannelGraph>;
/**
 * @generated from message lnrpc.NodeMetricsRequest
 */
export type NodeMetricsRequest = Message<"lnrpc.NodeMetricsRequest"> & {
    /**
     * The requested node metrics.
     *
     * @generated from field: repeated lnrpc.NodeMetricType types = 1;
     */
    types: NodeMetricType[];
};
/**
 * Describes the message lnrpc.NodeMetricsRequest.
 * Use `create(NodeMetricsRequestSchema)` to create a new message.
 */
export declare const NodeMetricsRequestSchema: GenMessage<NodeMetricsRequest>;
/**
 * @generated from message lnrpc.NodeMetricsResponse
 */
export type NodeMetricsResponse = Message<"lnrpc.NodeMetricsResponse"> & {
    /**
     *
     * Betweenness centrality is the sum of the ratio of shortest paths that pass
     * through the node for each pair of nodes in the graph (not counting paths
     * starting or ending at this node).
     * Map of node pubkey to betweenness centrality of the node. Normalized
     * values are in the [0,1] closed interval.
     *
     * @generated from field: map<string, lnrpc.FloatMetric> betweenness_centrality = 1;
     */
    betweennessCentrality: {
        [key: string]: FloatMetric;
    };
};
/**
 * Describes the message lnrpc.NodeMetricsResponse.
 * Use `create(NodeMetricsResponseSchema)` to create a new message.
 */
export declare const NodeMetricsResponseSchema: GenMessage<NodeMetricsResponse>;
/**
 * @generated from message lnrpc.FloatMetric
 */
export type FloatMetric = Message<"lnrpc.FloatMetric"> & {
    /**
     * Arbitrary float value.
     *
     * @generated from field: double value = 1;
     */
    value: number;
    /**
     * The value normalized to [0,1] or [-1,1].
     *
     * @generated from field: double normalized_value = 2;
     */
    normalizedValue: number;
};
/**
 * Describes the message lnrpc.FloatMetric.
 * Use `create(FloatMetricSchema)` to create a new message.
 */
export declare const FloatMetricSchema: GenMessage<FloatMetric>;
/**
 * @generated from message lnrpc.ChanInfoRequest
 */
export type ChanInfoRequest = Message<"lnrpc.ChanInfoRequest"> & {
    /**
     *
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     *
     * @generated from field: uint64 chan_id = 1 [jstype = JS_STRING];
     */
    chanId: string;
};
/**
 * Describes the message lnrpc.ChanInfoRequest.
 * Use `create(ChanInfoRequestSchema)` to create a new message.
 */
export declare const ChanInfoRequestSchema: GenMessage<ChanInfoRequest>;
/**
 * @generated from message lnrpc.NetworkInfoRequest
 */
export type NetworkInfoRequest = Message<"lnrpc.NetworkInfoRequest"> & {};
/**
 * Describes the message lnrpc.NetworkInfoRequest.
 * Use `create(NetworkInfoRequestSchema)` to create a new message.
 */
export declare const NetworkInfoRequestSchema: GenMessage<NetworkInfoRequest>;
/**
 * @generated from message lnrpc.NetworkInfo
 */
export type NetworkInfo = Message<"lnrpc.NetworkInfo"> & {
    /**
     * @generated from field: uint32 graph_diameter = 1;
     */
    graphDiameter: number;
    /**
     * @generated from field: double avg_out_degree = 2;
     */
    avgOutDegree: number;
    /**
     * @generated from field: uint32 max_out_degree = 3;
     */
    maxOutDegree: number;
    /**
     * @generated from field: uint32 num_nodes = 4;
     */
    numNodes: number;
    /**
     * @generated from field: uint32 num_channels = 5;
     */
    numChannels: number;
    /**
     * @generated from field: int64 total_network_capacity = 6;
     */
    totalNetworkCapacity: bigint;
    /**
     * @generated from field: double avg_channel_size = 7;
     */
    avgChannelSize: number;
    /**
     * @generated from field: int64 min_channel_size = 8;
     */
    minChannelSize: bigint;
    /**
     * @generated from field: int64 max_channel_size = 9;
     */
    maxChannelSize: bigint;
    /**
     * @generated from field: int64 median_channel_size_sat = 10;
     */
    medianChannelSizeSat: bigint;
    /**
     * The number of edges marked as zombies.
     *
     * @generated from field: uint64 num_zombie_chans = 11;
     */
    numZombieChans: bigint;
};
/**
 * Describes the message lnrpc.NetworkInfo.
 * Use `create(NetworkInfoSchema)` to create a new message.
 */
export declare const NetworkInfoSchema: GenMessage<NetworkInfo>;
/**
 * @generated from message lnrpc.StopRequest
 */
export type StopRequest = Message<"lnrpc.StopRequest"> & {};
/**
 * Describes the message lnrpc.StopRequest.
 * Use `create(StopRequestSchema)` to create a new message.
 */
export declare const StopRequestSchema: GenMessage<StopRequest>;
/**
 * @generated from message lnrpc.StopResponse
 */
export type StopResponse = Message<"lnrpc.StopResponse"> & {};
/**
 * Describes the message lnrpc.StopResponse.
 * Use `create(StopResponseSchema)` to create a new message.
 */
export declare const StopResponseSchema: GenMessage<StopResponse>;
/**
 * @generated from message lnrpc.GraphTopologySubscription
 */
export type GraphTopologySubscription = Message<"lnrpc.GraphTopologySubscription"> & {};
/**
 * Describes the message lnrpc.GraphTopologySubscription.
 * Use `create(GraphTopologySubscriptionSchema)` to create a new message.
 */
export declare const GraphTopologySubscriptionSchema: GenMessage<GraphTopologySubscription>;
/**
 * @generated from message lnrpc.GraphTopologyUpdate
 */
export type GraphTopologyUpdate = Message<"lnrpc.GraphTopologyUpdate"> & {
    /**
     * @generated from field: repeated lnrpc.NodeUpdate node_updates = 1;
     */
    nodeUpdates: NodeUpdate[];
    /**
     * @generated from field: repeated lnrpc.ChannelEdgeUpdate channel_updates = 2;
     */
    channelUpdates: ChannelEdgeUpdate[];
    /**
     * @generated from field: repeated lnrpc.ClosedChannelUpdate closed_chans = 3;
     */
    closedChans: ClosedChannelUpdate[];
};
/**
 * Describes the message lnrpc.GraphTopologyUpdate.
 * Use `create(GraphTopologyUpdateSchema)` to create a new message.
 */
export declare const GraphTopologyUpdateSchema: GenMessage<GraphTopologyUpdate>;
/**
 * @generated from message lnrpc.NodeUpdate
 */
export type NodeUpdate = Message<"lnrpc.NodeUpdate"> & {
    /**
     *
     * Deprecated, use node_addresses.
     *
     * @generated from field: repeated string addresses = 1 [deprecated = true];
     * @deprecated
     */
    addresses: string[];
    /**
     * @generated from field: string identity_key = 2;
     */
    identityKey: string;
    /**
     *
     * Deprecated, use features.
     *
     * @generated from field: bytes global_features = 3 [deprecated = true];
     * @deprecated
     */
    globalFeatures: Uint8Array;
    /**
     * @generated from field: string alias = 4;
     */
    alias: string;
    /**
     * @generated from field: string color = 5;
     */
    color: string;
    /**
     * @generated from field: repeated lnrpc.NodeAddress node_addresses = 7;
     */
    nodeAddresses: NodeAddress[];
    /**
     *
     * Features that the node has advertised in the init message, node
     * announcements and invoices.
     *
     * @generated from field: map<uint32, lnrpc.Feature> features = 6;
     */
    features: {
        [key: number]: Feature;
    };
};
/**
 * Describes the message lnrpc.NodeUpdate.
 * Use `create(NodeUpdateSchema)` to create a new message.
 */
export declare const NodeUpdateSchema: GenMessage<NodeUpdate>;
/**
 * @generated from message lnrpc.ChannelEdgeUpdate
 */
export type ChannelEdgeUpdate = Message<"lnrpc.ChannelEdgeUpdate"> & {
    /**
     *
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     *
     * @generated from field: uint64 chan_id = 1 [jstype = JS_STRING];
     */
    chanId: string;
    /**
     * @generated from field: lnrpc.ChannelPoint chan_point = 2;
     */
    chanPoint?: ChannelPoint;
    /**
     * @generated from field: int64 capacity = 3;
     */
    capacity: bigint;
    /**
     * @generated from field: lnrpc.RoutingPolicy routing_policy = 4;
     */
    routingPolicy?: RoutingPolicy;
    /**
     * @generated from field: string advertising_node = 5;
     */
    advertisingNode: string;
    /**
     * @generated from field: string connecting_node = 6;
     */
    connectingNode: string;
};
/**
 * Describes the message lnrpc.ChannelEdgeUpdate.
 * Use `create(ChannelEdgeUpdateSchema)` to create a new message.
 */
export declare const ChannelEdgeUpdateSchema: GenMessage<ChannelEdgeUpdate>;
/**
 * @generated from message lnrpc.ClosedChannelUpdate
 */
export type ClosedChannelUpdate = Message<"lnrpc.ClosedChannelUpdate"> & {
    /**
     *
     * The unique channel ID for the channel. The first 3 bytes are the block
     * height, the next 3 the index within the block, and the last 2 bytes are the
     * output index for the channel.
     *
     * @generated from field: uint64 chan_id = 1 [jstype = JS_STRING];
     */
    chanId: string;
    /**
     * @generated from field: int64 capacity = 2;
     */
    capacity: bigint;
    /**
     * @generated from field: uint32 closed_height = 3;
     */
    closedHeight: number;
    /**
     * @generated from field: lnrpc.ChannelPoint chan_point = 4;
     */
    chanPoint?: ChannelPoint;
};
/**
 * Describes the message lnrpc.ClosedChannelUpdate.
 * Use `create(ClosedChannelUpdateSchema)` to create a new message.
 */
export declare const ClosedChannelUpdateSchema: GenMessage<ClosedChannelUpdate>;
/**
 * @generated from message lnrpc.HopHint
 */
export type HopHint = Message<"lnrpc.HopHint"> & {
    /**
     * The public key of the node at the start of the channel.
     *
     * @generated from field: string node_id = 1;
     */
    nodeId: string;
    /**
     * The unique identifier of the channel.
     *
     * @generated from field: uint64 chan_id = 2 [jstype = JS_STRING];
     */
    chanId: string;
    /**
     * The base fee of the channel denominated in millisatoshis.
     *
     * @generated from field: uint32 fee_base_msat = 3;
     */
    feeBaseMsat: number;
    /**
     *
     * The fee rate of the channel for sending one satoshi across it denominated in
     * millionths of a satoshi.
     *
     * @generated from field: uint32 fee_proportional_millionths = 4;
     */
    feeProportionalMillionths: number;
    /**
     * The time-lock delta of the channel.
     *
     * @generated from field: uint32 cltv_expiry_delta = 5;
     */
    cltvExpiryDelta: number;
};
/**
 * Describes the message lnrpc.HopHint.
 * Use `create(HopHintSchema)` to create a new message.
 */
export declare const HopHintSchema: GenMessage<HopHint>;
/**
 * @generated from message lnrpc.SetID
 */
export type SetID = Message<"lnrpc.SetID"> & {
    /**
     * @generated from field: bytes set_id = 1;
     */
    setId: Uint8Array;
};
/**
 * Describes the message lnrpc.SetID.
 * Use `create(SetIDSchema)` to create a new message.
 */
export declare const SetIDSchema: GenMessage<SetID>;
/**
 * @generated from message lnrpc.RouteHint
 */
export type RouteHint = Message<"lnrpc.RouteHint"> & {
    /**
     *
     * A list of hop hints that when chained together can assist in reaching a
     * specific destination.
     *
     * @generated from field: repeated lnrpc.HopHint hop_hints = 1;
     */
    hopHints: HopHint[];
};
/**
 * Describes the message lnrpc.RouteHint.
 * Use `create(RouteHintSchema)` to create a new message.
 */
export declare const RouteHintSchema: GenMessage<RouteHint>;
/**
 * @generated from message lnrpc.AMPInvoiceState
 */
export type AMPInvoiceState = Message<"lnrpc.AMPInvoiceState"> & {
    /**
     * The state the HTLCs associated with this setID are in.
     *
     * @generated from field: lnrpc.InvoiceHTLCState state = 1;
     */
    state: InvoiceHTLCState;
    /**
     * The settle index of this HTLC set, if the invoice state is settled.
     *
     * @generated from field: uint64 settle_index = 2;
     */
    settleIndex: bigint;
    /**
     * The time this HTLC set was settled expressed in unix epoch.
     *
     * @generated from field: int64 settle_time = 3;
     */
    settleTime: bigint;
    /**
     * The total amount paid for the sub-invoice expressed in milli satoshis.
     *
     * @generated from field: int64 amt_paid_msat = 5;
     */
    amtPaidMsat: bigint;
};
/**
 * Describes the message lnrpc.AMPInvoiceState.
 * Use `create(AMPInvoiceStateSchema)` to create a new message.
 */
export declare const AMPInvoiceStateSchema: GenMessage<AMPInvoiceState>;
/**
 * @generated from message lnrpc.Invoice
 */
export type Invoice = Message<"lnrpc.Invoice"> & {
    /**
     *
     * An optional memo to attach along with the invoice. Used for record keeping
     * purposes for the invoice's creator, and will also be set in the description
     * field of the encoded payment request if the description_hash field is not
     * being used.
     *
     * @generated from field: string memo = 1;
     */
    memo: string;
    /**
     *
     * The hex-encoded preimage (32 byte) which will allow settling an incoming
     * HTLC payable to this preimage. When using REST, this field must be encoded
     * as base64.
     *
     * @generated from field: bytes r_preimage = 3;
     */
    rPreimage: Uint8Array;
    /**
     *
     * The hash of the preimage. When using REST, this field must be encoded as
     * base64.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: bytes r_hash = 4;
     */
    rHash: Uint8Array;
    /**
     *
     * The value of this invoice in satoshis
     *
     * The fields value and value_msat are mutually exclusive.
     *
     * @generated from field: int64 value = 5;
     */
    value: bigint;
    /**
     *
     * The value of this invoice in millisatoshis
     *
     * The fields value and value_msat are mutually exclusive.
     *
     * @generated from field: int64 value_msat = 23;
     */
    valueMsat: bigint;
    /**
     *
     * Whether this invoice has been fulfilled.
     *
     * The field is deprecated. Use the state field instead (compare to SETTLED).
     *
     * @generated from field: bool settled = 6 [deprecated = true];
     * @deprecated
     */
    settled: boolean;
    /**
     *
     * When this invoice was created.
     * Measured in seconds since the unix epoch.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: int64 creation_date = 7;
     */
    creationDate: bigint;
    /**
     *
     * When this invoice was settled.
     * Measured in seconds since the unix epoch.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: int64 settle_date = 8;
     */
    settleDate: bigint;
    /**
     *
     * A bare-bones invoice for a payment within the Lightning Network. With the
     * details of the invoice, the sender has all the data necessary to send a
     * payment to the recipient.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: string payment_request = 9;
     */
    paymentRequest: string;
    /**
     *
     * Hash (SHA-256) of a description of the payment. Used if the description of
     * payment (memo) is too long to naturally fit within the description field
     * of an encoded payment request. When using REST, this field must be encoded
     * as base64.
     *
     * @generated from field: bytes description_hash = 10;
     */
    descriptionHash: Uint8Array;
    /**
     * Payment request expiry time in seconds. Default is 86400 (24 hours).
     *
     * @generated from field: int64 expiry = 11;
     */
    expiry: bigint;
    /**
     * Fallback on-chain address.
     *
     * @generated from field: string fallback_addr = 12;
     */
    fallbackAddr: string;
    /**
     * Delta to use for the time-lock of the CLTV extended to the final hop.
     *
     * @generated from field: uint64 cltv_expiry = 13;
     */
    cltvExpiry: bigint;
    /**
     *
     * Route hints that can each be individually used to assist in reaching the
     * invoice's destination.
     *
     * @generated from field: repeated lnrpc.RouteHint route_hints = 14;
     */
    routeHints: RouteHint[];
    /**
     * Whether this invoice should include routing hints for private channels.
     * Note: When enabled, if value and value_msat are zero, a large number of
     * hints with these channels can be included, which might not be desirable.
     *
     * @generated from field: bool private = 15;
     */
    private: boolean;
    /**
     *
     * The "add" index of this invoice. Each newly created invoice will increment
     * this index making it monotonically increasing. Callers to the
     * SubscribeInvoices call can use this to instantly get notified of all added
     * invoices with an add_index greater than this one.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: uint64 add_index = 16;
     */
    addIndex: bigint;
    /**
     *
     * The "settle" index of this invoice. Each newly settled invoice will
     * increment this index making it monotonically increasing. Callers to the
     * SubscribeInvoices call can use this to instantly get notified of all
     * settled invoices with an settle_index greater than this one.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: uint64 settle_index = 17;
     */
    settleIndex: bigint;
    /**
     * Deprecated, use amt_paid_sat or amt_paid_msat.
     *
     * @generated from field: int64 amt_paid = 18 [deprecated = true];
     * @deprecated
     */
    amtPaid: bigint;
    /**
     *
     * The amount that was accepted for this invoice, in satoshis. This will ONLY
     * be set if this invoice has been settled or accepted. We provide this field
     * as if the invoice was created with a zero value, then we need to record what
     * amount was ultimately accepted. Additionally, it's possible that the sender
     * paid MORE that was specified in the original invoice. So we'll record that
     * here as well.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: int64 amt_paid_sat = 19;
     */
    amtPaidSat: bigint;
    /**
     *
     * The amount that was accepted for this invoice, in millisatoshis. This will
     * ONLY be set if this invoice has been settled or accepted. We provide this
     * field as if the invoice was created with a zero value, then we need to
     * record what amount was ultimately accepted. Additionally, it's possible that
     * the sender paid MORE that was specified in the original invoice. So we'll
     * record that here as well.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: int64 amt_paid_msat = 20;
     */
    amtPaidMsat: bigint;
    /**
     *
     * The state the invoice is in.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: lnrpc.Invoice.InvoiceState state = 21;
     */
    state: Invoice_InvoiceState;
    /**
     *
     * List of HTLCs paying to this invoice [EXPERIMENTAL].
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: repeated lnrpc.InvoiceHTLC htlcs = 22;
     */
    htlcs: InvoiceHTLC[];
    /**
     *
     * List of features advertised on the invoice.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: map<uint32, lnrpc.Feature> features = 24;
     */
    features: {
        [key: number]: Feature;
    };
    /**
     *
     * Indicates if this invoice was a spontaneous payment that arrived via keysend
     * [EXPERIMENTAL].
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: bool is_keysend = 25;
     */
    isKeysend: boolean;
    /**
     *
     * The payment address of this invoice. This value will be used in MPP
     * payments, and also for newer invoices that always require the MPP payload
     * for added end-to-end security.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: bytes payment_addr = 26;
     */
    paymentAddr: Uint8Array;
    /**
     *
     * Signals whether or not this is an AMP invoice.
     *
     * @generated from field: bool is_amp = 27;
     */
    isAmp: boolean;
    /**
     *
     * [EXPERIMENTAL]:
     *
     * Maps a 32-byte hex-encoded set ID to the sub-invoice AMP state for the
     * given set ID. This field is always populated for AMP invoices, and can be
     * used along side LookupInvoice to obtain the HTLC information related to a
     * given sub-invoice.
     * Note: Output only, don't specify for creating an invoice.
     *
     * @generated from field: map<string, lnrpc.AMPInvoiceState> amp_invoice_state = 28;
     */
    ampInvoiceState: {
        [key: string]: AMPInvoiceState;
    };
    /**
     *
     * The minimum number of hop hints to include in this invoice.
     *
     * @generated from field: int32 min_hop_hints = 29;
     */
    minHopHints: number;
};
/**
 * Describes the message lnrpc.Invoice.
 * Use `create(InvoiceSchema)` to create a new message.
 */
export declare const InvoiceSchema: GenMessage<Invoice>;
/**
 * @generated from enum lnrpc.Invoice.InvoiceState
 */
export declare enum Invoice_InvoiceState {
    /**
     * @generated from enum value: OPEN = 0;
     */
    OPEN = 0,
    /**
     * @generated from enum value: SETTLED = 1;
     */
    SETTLED = 1,
    /**
     * @generated from enum value: CANCELED = 2;
     */
    CANCELED = 2,
    /**
     * @generated from enum value: ACCEPTED = 3;
     */
    ACCEPTED = 3
}
/**
 * Describes the enum lnrpc.Invoice.InvoiceState.
 */
export declare const Invoice_InvoiceStateSchema: GenEnum<Invoice_InvoiceState>;
/**
 * Details of an HTLC that paid to an invoice
 *
 * @generated from message lnrpc.InvoiceHTLC
 */
export type InvoiceHTLC = Message<"lnrpc.InvoiceHTLC"> & {
    /**
     * Short channel id over which the htlc was received.
     *
     * @generated from field: uint64 chan_id = 1 [jstype = JS_STRING];
     */
    chanId: string;
    /**
     * Index identifying the htlc on the channel.
     *
     * @generated from field: uint64 htlc_index = 2;
     */
    htlcIndex: bigint;
    /**
     * The amount of the htlc in msat.
     *
     * @generated from field: uint64 amt_msat = 3;
     */
    amtMsat: bigint;
    /**
     * Block height at which this htlc was accepted.
     *
     * @generated from field: int32 accept_height = 4;
     */
    acceptHeight: number;
    /**
     * Time at which this htlc was accepted.
     *
     * @generated from field: int64 accept_time = 5;
     */
    acceptTime: bigint;
    /**
     * Time at which this htlc was settled or canceled.
     *
     * @generated from field: int64 resolve_time = 6;
     */
    resolveTime: bigint;
    /**
     * Block height at which this htlc expires.
     *
     * @generated from field: int32 expiry_height = 7;
     */
    expiryHeight: number;
    /**
     * Current state the htlc is in.
     *
     * @generated from field: lnrpc.InvoiceHTLCState state = 8;
     */
    state: InvoiceHTLCState;
    /**
     * Custom tlv records.
     *
     * @generated from field: map<uint64, bytes> custom_records = 9;
     */
    customRecords: {
        [key: string]: Uint8Array;
    };
    /**
     * The total amount of the mpp payment in msat.
     *
     * @generated from field: uint64 mpp_total_amt_msat = 10;
     */
    mppTotalAmtMsat: bigint;
    /**
     * Details relevant to AMP HTLCs, only populated if this is an AMP HTLC.
     *
     * @generated from field: lnrpc.AMP amp = 11;
     */
    amp?: AMP;
};
/**
 * Describes the message lnrpc.InvoiceHTLC.
 * Use `create(InvoiceHTLCSchema)` to create a new message.
 */
export declare const InvoiceHTLCSchema: GenMessage<InvoiceHTLC>;
/**
 * Details specific to AMP HTLCs.
 *
 * @generated from message lnrpc.AMP
 */
export type AMP = Message<"lnrpc.AMP"> & {
    /**
     * An n-of-n secret share of the root seed from which child payment hashes
     * and preimages are derived.
     *
     * @generated from field: bytes root_share = 1;
     */
    rootShare: Uint8Array;
    /**
     * An identifier for the HTLC set that this HTLC belongs to.
     *
     * @generated from field: bytes set_id = 2;
     */
    setId: Uint8Array;
    /**
     * A nonce used to randomize the child preimage and child hash from a given
     * root_share.
     *
     * @generated from field: uint32 child_index = 3;
     */
    childIndex: number;
    /**
     * The payment hash of the AMP HTLC.
     *
     * @generated from field: bytes hash = 4;
     */
    hash: Uint8Array;
    /**
     * The preimage used to settle this AMP htlc. This field will only be
     * populated if the invoice is in InvoiceState_ACCEPTED or
     * InvoiceState_SETTLED.
     *
     * @generated from field: bytes preimage = 5;
     */
    preimage: Uint8Array;
};
/**
 * Describes the message lnrpc.AMP.
 * Use `create(AMPSchema)` to create a new message.
 */
export declare const AMPSchema: GenMessage<AMP>;
/**
 * @generated from message lnrpc.AddInvoiceResponse
 */
export type AddInvoiceResponse = Message<"lnrpc.AddInvoiceResponse"> & {
    /**
     * @generated from field: bytes r_hash = 1;
     */
    rHash: Uint8Array;
    /**
     *
     * A bare-bones invoice for a payment within the Lightning Network. With the
     * details of the invoice, the sender has all the data necessary to send a
     * payment to the recipient.
     *
     * @generated from field: string payment_request = 2;
     */
    paymentRequest: string;
    /**
     *
     * The "add" index of this invoice. Each newly created invoice will increment
     * this index making it monotonically increasing. Callers to the
     * SubscribeInvoices call can use this to instantly get notified of all added
     * invoices with an add_index greater than this one.
     *
     * @generated from field: uint64 add_index = 16;
     */
    addIndex: bigint;
    /**
     *
     * The payment address of the generated invoice. This value should be used
     * in all payments for this invoice as we require it for end to end
     * security.
     *
     * @generated from field: bytes payment_addr = 17;
     */
    paymentAddr: Uint8Array;
};
/**
 * Describes the message lnrpc.AddInvoiceResponse.
 * Use `create(AddInvoiceResponseSchema)` to create a new message.
 */
export declare const AddInvoiceResponseSchema: GenMessage<AddInvoiceResponse>;
/**
 * @generated from message lnrpc.PaymentHash
 */
export type PaymentHash = Message<"lnrpc.PaymentHash"> & {
    /**
     *
     * The hex-encoded payment hash of the invoice to be looked up. The passed
     * payment hash must be exactly 32 bytes, otherwise an error is returned.
     * Deprecated now that the REST gateway supports base64 encoding of bytes
     * fields.
     *
     * @generated from field: string r_hash_str = 1 [deprecated = true];
     * @deprecated
     */
    rHashStr: string;
    /**
     *
     * The payment hash of the invoice to be looked up. When using REST, this field
     * must be encoded as base64.
     *
     * @generated from field: bytes r_hash = 2;
     */
    rHash: Uint8Array;
};
/**
 * Describes the message lnrpc.PaymentHash.
 * Use `create(PaymentHashSchema)` to create a new message.
 */
export declare const PaymentHashSchema: GenMessage<PaymentHash>;
/**
 * @generated from message lnrpc.ListInvoiceRequest
 */
export type ListInvoiceRequest = Message<"lnrpc.ListInvoiceRequest"> & {
    /**
     *
     * If set, only invoices that are not settled and not canceled will be returned
     * in the response.
     *
     * @generated from field: bool pending_only = 1;
     */
    pendingOnly: boolean;
    /**
     *
     * The index of an invoice that will be used as either the start or end of a
     * query to determine which invoices should be returned in the response.
     *
     * @generated from field: uint64 index_offset = 4;
     */
    indexOffset: bigint;
    /**
     * The max number of invoices to return in the response to this query.
     *
     * @generated from field: uint64 num_max_invoices = 5;
     */
    numMaxInvoices: bigint;
    /**
     *
     * If set, the invoices returned will result from seeking backwards from the
     * specified index offset. This can be used to paginate backwards.
     *
     * @generated from field: bool reversed = 6;
     */
    reversed: boolean;
    /**
     * If set, returns all invoices with a creation date greater than or equal
     * to it. Measured in seconds since the unix epoch.
     *
     * @generated from field: uint64 creation_date_start = 7;
     */
    creationDateStart: bigint;
    /**
     * If set, returns all invoices with a creation date less than or equal to
     * it. Measured in seconds since the unix epoch.
     *
     * @generated from field: uint64 creation_date_end = 8;
     */
    creationDateEnd: bigint;
};
/**
 * Describes the message lnrpc.ListInvoiceRequest.
 * Use `create(ListInvoiceRequestSchema)` to create a new message.
 */
export declare const ListInvoiceRequestSchema: GenMessage<ListInvoiceRequest>;
/**
 * @generated from message lnrpc.ListInvoiceResponse
 */
export type ListInvoiceResponse = Message<"lnrpc.ListInvoiceResponse"> & {
    /**
     *
     * A list of invoices from the time slice of the time series specified in the
     * request.
     *
     * @generated from field: repeated lnrpc.Invoice invoices = 1;
     */
    invoices: Invoice[];
    /**
     *
     * The index of the last item in the set of returned invoices. This can be used
     * to seek further, pagination style.
     *
     * @generated from field: uint64 last_index_offset = 2;
     */
    lastIndexOffset: bigint;
    /**
     *
     * The index of the last item in the set of returned invoices. This can be used
     * to seek backwards, pagination style.
     *
     * @generated from field: uint64 first_index_offset = 3;
     */
    firstIndexOffset: bigint;
};
/**
 * Describes the message lnrpc.ListInvoiceResponse.
 * Use `create(ListInvoiceResponseSchema)` to create a new message.
 */
export declare const ListInvoiceResponseSchema: GenMessage<ListInvoiceResponse>;
/**
 * @generated from message lnrpc.InvoiceSubscription
 */
export type InvoiceSubscription = Message<"lnrpc.InvoiceSubscription"> & {
    /**
     *
     * If specified (non-zero), then we'll first start by sending out
     * notifications for all added indexes with an add_index greater than this
     * value. This allows callers to catch up on any events they missed while they
     * weren't connected to the streaming RPC.
     *
     * @generated from field: uint64 add_index = 1;
     */
    addIndex: bigint;
    /**
     *
     * If specified (non-zero), then we'll first start by sending out
     * notifications for all settled indexes with an settle_index greater than
     * this value. This allows callers to catch up on any events they missed while
     * they weren't connected to the streaming RPC.
     *
     * @generated from field: uint64 settle_index = 2;
     */
    settleIndex: bigint;
};
/**
 * Describes the message lnrpc.InvoiceSubscription.
 * Use `create(InvoiceSubscriptionSchema)` to create a new message.
 */
export declare const InvoiceSubscriptionSchema: GenMessage<InvoiceSubscription>;
/**
 * @generated from message lnrpc.Payment
 */
export type Payment = Message<"lnrpc.Payment"> & {
    /**
     * The payment hash
     *
     * @generated from field: string payment_hash = 1;
     */
    paymentHash: string;
    /**
     * Deprecated, use value_sat or value_msat.
     *
     * @generated from field: int64 value = 2 [deprecated = true];
     * @deprecated
     */
    value: bigint;
    /**
     * Deprecated, use creation_time_ns
     *
     * @generated from field: int64 creation_date = 3 [deprecated = true];
     * @deprecated
     */
    creationDate: bigint;
    /**
     * Deprecated, use fee_sat or fee_msat.
     *
     * @generated from field: int64 fee = 5 [deprecated = true];
     * @deprecated
     */
    fee: bigint;
    /**
     * The payment preimage
     *
     * @generated from field: string payment_preimage = 6;
     */
    paymentPreimage: string;
    /**
     * The value of the payment in satoshis
     *
     * @generated from field: int64 value_sat = 7;
     */
    valueSat: bigint;
    /**
     * The value of the payment in milli-satoshis
     *
     * @generated from field: int64 value_msat = 8;
     */
    valueMsat: bigint;
    /**
     * The optional payment request being fulfilled.
     *
     * @generated from field: string payment_request = 9;
     */
    paymentRequest: string;
    /**
     * The status of the payment.
     *
     * @generated from field: lnrpc.Payment.PaymentStatus status = 10;
     */
    status: Payment_PaymentStatus;
    /**
     *  The fee paid for this payment in satoshis
     *
     * @generated from field: int64 fee_sat = 11;
     */
    feeSat: bigint;
    /**
     *  The fee paid for this payment in milli-satoshis
     *
     * @generated from field: int64 fee_msat = 12;
     */
    feeMsat: bigint;
    /**
     * The time in UNIX nanoseconds at which the payment was created.
     *
     * @generated from field: int64 creation_time_ns = 13;
     */
    creationTimeNs: bigint;
    /**
     * The HTLCs made in attempt to settle the payment.
     *
     * @generated from field: repeated lnrpc.HTLCAttempt htlcs = 14;
     */
    htlcs: HTLCAttempt[];
    /**
     *
     * The creation index of this payment. Each payment can be uniquely identified
     * by this index, which may not strictly increment by 1 for payments made in
     * older versions of lnd.
     *
     * @generated from field: uint64 payment_index = 15;
     */
    paymentIndex: bigint;
    /**
     * @generated from field: lnrpc.PaymentFailureReason failure_reason = 16;
     */
    failureReason: PaymentFailureReason;
};
/**
 * Describes the message lnrpc.Payment.
 * Use `create(PaymentSchema)` to create a new message.
 */
export declare const PaymentSchema: GenMessage<Payment>;
/**
 * @generated from enum lnrpc.Payment.PaymentStatus
 */
export declare enum Payment_PaymentStatus {
    /**
     * @generated from enum value: UNKNOWN = 0;
     */
    UNKNOWN = 0,
    /**
     * @generated from enum value: IN_FLIGHT = 1;
     */
    IN_FLIGHT = 1,
    /**
     * @generated from enum value: SUCCEEDED = 2;
     */
    SUCCEEDED = 2,
    /**
     * @generated from enum value: FAILED = 3;
     */
    FAILED = 3
}
/**
 * Describes the enum lnrpc.Payment.PaymentStatus.
 */
export declare const Payment_PaymentStatusSchema: GenEnum<Payment_PaymentStatus>;
/**
 * @generated from message lnrpc.HTLCAttempt
 */
export type HTLCAttempt = Message<"lnrpc.HTLCAttempt"> & {
    /**
     * The unique ID that is used for this attempt.
     *
     * @generated from field: uint64 attempt_id = 7;
     */
    attemptId: bigint;
    /**
     * The status of the HTLC.
     *
     * @generated from field: lnrpc.HTLCAttempt.HTLCStatus status = 1;
     */
    status: HTLCAttempt_HTLCStatus;
    /**
     * The route taken by this HTLC.
     *
     * @generated from field: lnrpc.Route route = 2;
     */
    route?: Route;
    /**
     * The time in UNIX nanoseconds at which this HTLC was sent.
     *
     * @generated from field: int64 attempt_time_ns = 3;
     */
    attemptTimeNs: bigint;
    /**
     *
     * The time in UNIX nanoseconds at which this HTLC was settled or failed.
     * This value will not be set if the HTLC is still IN_FLIGHT.
     *
     * @generated from field: int64 resolve_time_ns = 4;
     */
    resolveTimeNs: bigint;
    /**
     * Detailed htlc failure info.
     *
     * @generated from field: lnrpc.Failure failure = 5;
     */
    failure?: Failure;
    /**
     * The preimage that was used to settle the HTLC.
     *
     * @generated from field: bytes preimage = 6;
     */
    preimage: Uint8Array;
};
/**
 * Describes the message lnrpc.HTLCAttempt.
 * Use `create(HTLCAttemptSchema)` to create a new message.
 */
export declare const HTLCAttemptSchema: GenMessage<HTLCAttempt>;
/**
 * @generated from enum lnrpc.HTLCAttempt.HTLCStatus
 */
export declare enum HTLCAttempt_HTLCStatus {
    /**
     * @generated from enum value: IN_FLIGHT = 0;
     */
    IN_FLIGHT = 0,
    /**
     * @generated from enum value: SUCCEEDED = 1;
     */
    SUCCEEDED = 1,
    /**
     * @generated from enum value: FAILED = 2;
     */
    FAILED = 2
}
/**
 * Describes the enum lnrpc.HTLCAttempt.HTLCStatus.
 */
export declare const HTLCAttempt_HTLCStatusSchema: GenEnum<HTLCAttempt_HTLCStatus>;
/**
 * @generated from message lnrpc.ListPaymentsRequest
 */
export type ListPaymentsRequest = Message<"lnrpc.ListPaymentsRequest"> & {
    /**
     *
     * If true, then return payments that have not yet fully completed. This means
     * that pending payments, as well as failed payments will show up if this
     * field is set to true. This flag doesn't change the meaning of the indices,
     * which are tied to individual payments.
     *
     * @generated from field: bool include_incomplete = 1;
     */
    includeIncomplete: boolean;
    /**
     *
     * The index of a payment that will be used as either the start or end of a
     * query to determine which payments should be returned in the response. The
     * index_offset is exclusive. In the case of a zero index_offset, the query
     * will start with the oldest payment when paginating forwards, or will end
     * with the most recent payment when paginating backwards.
     *
     * @generated from field: uint64 index_offset = 2;
     */
    indexOffset: bigint;
    /**
     * The maximal number of payments returned in the response to this query.
     *
     * @generated from field: uint64 max_payments = 3;
     */
    maxPayments: bigint;
    /**
     *
     * If set, the payments returned will result from seeking backwards from the
     * specified index offset. This can be used to paginate backwards. The order
     * of the returned payments is always oldest first (ascending index order).
     *
     * @generated from field: bool reversed = 4;
     */
    reversed: boolean;
    /**
     *
     * If set, all payments (complete and incomplete, independent of the
     * max_payments parameter) will be counted. Note that setting this to true will
     * increase the run time of the call significantly on systems that have a lot
     * of payments, as all of them have to be iterated through to be counted.
     *
     * @generated from field: bool count_total_payments = 5;
     */
    countTotalPayments: boolean;
    /**
     * If set, returns all invoices with a creation date greater than or equal
     * to it. Measured in seconds since the unix epoch.
     *
     * @generated from field: uint64 creation_date_start = 6;
     */
    creationDateStart: bigint;
    /**
     * If set, returns all invoices with a creation date less than or equal to
     * it. Measured in seconds since the unix epoch.
     *
     * @generated from field: uint64 creation_date_end = 7;
     */
    creationDateEnd: bigint;
};
/**
 * Describes the message lnrpc.ListPaymentsRequest.
 * Use `create(ListPaymentsRequestSchema)` to create a new message.
 */
export declare const ListPaymentsRequestSchema: GenMessage<ListPaymentsRequest>;
/**
 * @generated from message lnrpc.ListPaymentsResponse
 */
export type ListPaymentsResponse = Message<"lnrpc.ListPaymentsResponse"> & {
    /**
     * The list of payments
     *
     * @generated from field: repeated lnrpc.Payment payments = 1;
     */
    payments: Payment[];
    /**
     *
     * The index of the first item in the set of returned payments. This can be
     * used as the index_offset to continue seeking backwards in the next request.
     *
     * @generated from field: uint64 first_index_offset = 2;
     */
    firstIndexOffset: bigint;
    /**
     *
     * The index of the last item in the set of returned payments. This can be used
     * as the index_offset to continue seeking forwards in the next request.
     *
     * @generated from field: uint64 last_index_offset = 3;
     */
    lastIndexOffset: bigint;
    /**
     *
     * Will only be set if count_total_payments in the request was set. Represents
     * the total number of payments (complete and incomplete, independent of the
     * number of payments requested in the query) currently present in the payments
     * database.
     *
     * @generated from field: uint64 total_num_payments = 4;
     */
    totalNumPayments: bigint;
};
/**
 * Describes the message lnrpc.ListPaymentsResponse.
 * Use `create(ListPaymentsResponseSchema)` to create a new message.
 */
export declare const ListPaymentsResponseSchema: GenMessage<ListPaymentsResponse>;
/**
 * @generated from message lnrpc.DeletePaymentRequest
 */
export type DeletePaymentRequest = Message<"lnrpc.DeletePaymentRequest"> & {
    /**
     * Payment hash to delete.
     *
     * @generated from field: bytes payment_hash = 1;
     */
    paymentHash: Uint8Array;
    /**
     *
     * Only delete failed HTLCs from the payment, not the payment itself.
     *
     * @generated from field: bool failed_htlcs_only = 2;
     */
    failedHtlcsOnly: boolean;
};
/**
 * Describes the message lnrpc.DeletePaymentRequest.
 * Use `create(DeletePaymentRequestSchema)` to create a new message.
 */
export declare const DeletePaymentRequestSchema: GenMessage<DeletePaymentRequest>;
/**
 * @generated from message lnrpc.DeleteAllPaymentsRequest
 */
export type DeleteAllPaymentsRequest = Message<"lnrpc.DeleteAllPaymentsRequest"> & {
    /**
     * Only delete failed payments.
     *
     * @generated from field: bool failed_payments_only = 1;
     */
    failedPaymentsOnly: boolean;
    /**
     *
     * Only delete failed HTLCs from payments, not the payment itself.
     *
     * @generated from field: bool failed_htlcs_only = 2;
     */
    failedHtlcsOnly: boolean;
};
/**
 * Describes the message lnrpc.DeleteAllPaymentsRequest.
 * Use `create(DeleteAllPaymentsRequestSchema)` to create a new message.
 */
export declare const DeleteAllPaymentsRequestSchema: GenMessage<DeleteAllPaymentsRequest>;
/**
 * @generated from message lnrpc.DeletePaymentResponse
 */
export type DeletePaymentResponse = Message<"lnrpc.DeletePaymentResponse"> & {};
/**
 * Describes the message lnrpc.DeletePaymentResponse.
 * Use `create(DeletePaymentResponseSchema)` to create a new message.
 */
export declare const DeletePaymentResponseSchema: GenMessage<DeletePaymentResponse>;
/**
 * @generated from message lnrpc.DeleteAllPaymentsResponse
 */
export type DeleteAllPaymentsResponse = Message<"lnrpc.DeleteAllPaymentsResponse"> & {};
/**
 * Describes the message lnrpc.DeleteAllPaymentsResponse.
 * Use `create(DeleteAllPaymentsResponseSchema)` to create a new message.
 */
export declare const DeleteAllPaymentsResponseSchema: GenMessage<DeleteAllPaymentsResponse>;
/**
 * @generated from message lnrpc.AbandonChannelRequest
 */
export type AbandonChannelRequest = Message<"lnrpc.AbandonChannelRequest"> & {
    /**
     * @generated from field: lnrpc.ChannelPoint channel_point = 1;
     */
    channelPoint?: ChannelPoint;
    /**
     * @generated from field: bool pending_funding_shim_only = 2;
     */
    pendingFundingShimOnly: boolean;
    /**
     *
     * Override the requirement for being in dev mode by setting this to true and
     * confirming the user knows what they are doing and this is a potential foot
     * gun to lose funds if used on active channels.
     *
     * @generated from field: bool i_know_what_i_am_doing = 3;
     */
    iKnowWhatIAmDoing: boolean;
};
/**
 * Describes the message lnrpc.AbandonChannelRequest.
 * Use `create(AbandonChannelRequestSchema)` to create a new message.
 */
export declare const AbandonChannelRequestSchema: GenMessage<AbandonChannelRequest>;
/**
 * @generated from message lnrpc.AbandonChannelResponse
 */
export type AbandonChannelResponse = Message<"lnrpc.AbandonChannelResponse"> & {};
/**
 * Describes the message lnrpc.AbandonChannelResponse.
 * Use `create(AbandonChannelResponseSchema)` to create a new message.
 */
export declare const AbandonChannelResponseSchema: GenMessage<AbandonChannelResponse>;
/**
 * @generated from message lnrpc.DebugLevelRequest
 */
export type DebugLevelRequest = Message<"lnrpc.DebugLevelRequest"> & {
    /**
     * @generated from field: bool show = 1;
     */
    show: boolean;
    /**
     * @generated from field: string level_spec = 2;
     */
    levelSpec: string;
};
/**
 * Describes the message lnrpc.DebugLevelRequest.
 * Use `create(DebugLevelRequestSchema)` to create a new message.
 */
export declare const DebugLevelRequestSchema: GenMessage<DebugLevelRequest>;
/**
 * @generated from message lnrpc.DebugLevelResponse
 */
export type DebugLevelResponse = Message<"lnrpc.DebugLevelResponse"> & {
    /**
     * @generated from field: string sub_systems = 1;
     */
    subSystems: string;
};
/**
 * Describes the message lnrpc.DebugLevelResponse.
 * Use `create(DebugLevelResponseSchema)` to create a new message.
 */
export declare const DebugLevelResponseSchema: GenMessage<DebugLevelResponse>;
/**
 * @generated from message lnrpc.PayReqString
 */
export type PayReqString = Message<"lnrpc.PayReqString"> & {
    /**
     * The payment request string to be decoded
     *
     * @generated from field: string pay_req = 1;
     */
    payReq: string;
};
/**
 * Describes the message lnrpc.PayReqString.
 * Use `create(PayReqStringSchema)` to create a new message.
 */
export declare const PayReqStringSchema: GenMessage<PayReqString>;
/**
 * @generated from message lnrpc.PayReq
 */
export type PayReq = Message<"lnrpc.PayReq"> & {
    /**
     * @generated from field: string destination = 1;
     */
    destination: string;
    /**
     * @generated from field: string payment_hash = 2;
     */
    paymentHash: string;
    /**
     * @generated from field: int64 num_satoshis = 3;
     */
    numSatoshis: bigint;
    /**
     * @generated from field: int64 timestamp = 4;
     */
    timestamp: bigint;
    /**
     * @generated from field: int64 expiry = 5;
     */
    expiry: bigint;
    /**
     * @generated from field: string description = 6;
     */
    description: string;
    /**
     * @generated from field: string description_hash = 7;
     */
    descriptionHash: string;
    /**
     * @generated from field: string fallback_addr = 8;
     */
    fallbackAddr: string;
    /**
     * @generated from field: int64 cltv_expiry = 9;
     */
    cltvExpiry: bigint;
    /**
     * @generated from field: repeated lnrpc.RouteHint route_hints = 10;
     */
    routeHints: RouteHint[];
    /**
     * @generated from field: bytes payment_addr = 11;
     */
    paymentAddr: Uint8Array;
    /**
     * @generated from field: int64 num_msat = 12;
     */
    numMsat: bigint;
    /**
     * @generated from field: map<uint32, lnrpc.Feature> features = 13;
     */
    features: {
        [key: number]: Feature;
    };
};
/**
 * Describes the message lnrpc.PayReq.
 * Use `create(PayReqSchema)` to create a new message.
 */
export declare const PayReqSchema: GenMessage<PayReq>;
/**
 * @generated from message lnrpc.Feature
 */
export type Feature = Message<"lnrpc.Feature"> & {
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: bool is_required = 3;
     */
    isRequired: boolean;
    /**
     * @generated from field: bool is_known = 4;
     */
    isKnown: boolean;
};
/**
 * Describes the message lnrpc.Feature.
 * Use `create(FeatureSchema)` to create a new message.
 */
export declare const FeatureSchema: GenMessage<Feature>;
/**
 * @generated from message lnrpc.FeeReportRequest
 */
export type FeeReportRequest = Message<"lnrpc.FeeReportRequest"> & {};
/**
 * Describes the message lnrpc.FeeReportRequest.
 * Use `create(FeeReportRequestSchema)` to create a new message.
 */
export declare const FeeReportRequestSchema: GenMessage<FeeReportRequest>;
/**
 * @generated from message lnrpc.ChannelFeeReport
 */
export type ChannelFeeReport = Message<"lnrpc.ChannelFeeReport"> & {
    /**
     * The short channel id that this fee report belongs to.
     *
     * @generated from field: uint64 chan_id = 5 [jstype = JS_STRING];
     */
    chanId: string;
    /**
     * The channel that this fee report belongs to.
     *
     * @generated from field: string channel_point = 1;
     */
    channelPoint: string;
    /**
     * The base fee charged regardless of the number of milli-satoshis sent.
     *
     * @generated from field: int64 base_fee_msat = 2;
     */
    baseFeeMsat: bigint;
    /**
     * The amount charged per milli-satoshis transferred expressed in
     * millionths of a satoshi.
     *
     * @generated from field: int64 fee_per_mil = 3;
     */
    feePerMil: bigint;
    /**
     * The effective fee rate in milli-satoshis. Computed by dividing the
     * fee_per_mil value by 1 million.
     *
     * @generated from field: double fee_rate = 4;
     */
    feeRate: number;
};
/**
 * Describes the message lnrpc.ChannelFeeReport.
 * Use `create(ChannelFeeReportSchema)` to create a new message.
 */
export declare const ChannelFeeReportSchema: GenMessage<ChannelFeeReport>;
/**
 * @generated from message lnrpc.FeeReportResponse
 */
export type FeeReportResponse = Message<"lnrpc.FeeReportResponse"> & {
    /**
     * An array of channel fee reports which describes the current fee schedule
     * for each channel.
     *
     * @generated from field: repeated lnrpc.ChannelFeeReport channel_fees = 1;
     */
    channelFees: ChannelFeeReport[];
    /**
     * The total amount of fee revenue (in satoshis) the switch has collected
     * over the past 24 hrs.
     *
     * @generated from field: uint64 day_fee_sum = 2;
     */
    dayFeeSum: bigint;
    /**
     * The total amount of fee revenue (in satoshis) the switch has collected
     * over the past 1 week.
     *
     * @generated from field: uint64 week_fee_sum = 3;
     */
    weekFeeSum: bigint;
    /**
     * The total amount of fee revenue (in satoshis) the switch has collected
     * over the past 1 month.
     *
     * @generated from field: uint64 month_fee_sum = 4;
     */
    monthFeeSum: bigint;
};
/**
 * Describes the message lnrpc.FeeReportResponse.
 * Use `create(FeeReportResponseSchema)` to create a new message.
 */
export declare const FeeReportResponseSchema: GenMessage<FeeReportResponse>;
/**
 * @generated from message lnrpc.PolicyUpdateRequest
 */
export type PolicyUpdateRequest = Message<"lnrpc.PolicyUpdateRequest"> & {
    /**
     * @generated from oneof lnrpc.PolicyUpdateRequest.scope
     */
    scope: {
        /**
         * If set, then this update applies to all currently active channels.
         *
         * @generated from field: bool global = 1;
         */
        value: boolean;
        case: "global";
    } | {
        /**
         * If set, this update will target a specific channel.
         *
         * @generated from field: lnrpc.ChannelPoint chan_point = 2;
         */
        value: ChannelPoint;
        case: "chanPoint";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * The base fee charged regardless of the number of milli-satoshis sent.
     *
     * @generated from field: int64 base_fee_msat = 3;
     */
    baseFeeMsat: bigint;
    /**
     * The effective fee rate in milli-satoshis. The precision of this value
     * goes up to 6 decimal places, so 1e-6.
     *
     * @generated from field: double fee_rate = 4;
     */
    feeRate: number;
    /**
     * The effective fee rate in micro-satoshis (parts per million).
     *
     * @generated from field: uint32 fee_rate_ppm = 9;
     */
    feeRatePpm: number;
    /**
     * The required timelock delta for HTLCs forwarded over the channel.
     *
     * @generated from field: uint32 time_lock_delta = 5;
     */
    timeLockDelta: number;
    /**
     * If set, the maximum HTLC size in milli-satoshis. If unset, the maximum
     * HTLC will be unchanged.
     *
     * @generated from field: uint64 max_htlc_msat = 6;
     */
    maxHtlcMsat: bigint;
    /**
     * The minimum HTLC size in milli-satoshis. Only applied if
     * min_htlc_msat_specified is true.
     *
     * @generated from field: uint64 min_htlc_msat = 7;
     */
    minHtlcMsat: bigint;
    /**
     * If true, min_htlc_msat is applied.
     *
     * @generated from field: bool min_htlc_msat_specified = 8;
     */
    minHtlcMsatSpecified: boolean;
};
/**
 * Describes the message lnrpc.PolicyUpdateRequest.
 * Use `create(PolicyUpdateRequestSchema)` to create a new message.
 */
export declare const PolicyUpdateRequestSchema: GenMessage<PolicyUpdateRequest>;
/**
 * @generated from message lnrpc.FailedUpdate
 */
export type FailedUpdate = Message<"lnrpc.FailedUpdate"> & {
    /**
     * The outpoint in format txid:n
     *
     * @generated from field: lnrpc.OutPoint outpoint = 1;
     */
    outpoint?: OutPoint;
    /**
     * Reason for the policy update failure.
     *
     * @generated from field: lnrpc.UpdateFailure reason = 2;
     */
    reason: UpdateFailure;
    /**
     * A string representation of the policy update error.
     *
     * @generated from field: string update_error = 3;
     */
    updateError: string;
};
/**
 * Describes the message lnrpc.FailedUpdate.
 * Use `create(FailedUpdateSchema)` to create a new message.
 */
export declare const FailedUpdateSchema: GenMessage<FailedUpdate>;
/**
 * @generated from message lnrpc.PolicyUpdateResponse
 */
export type PolicyUpdateResponse = Message<"lnrpc.PolicyUpdateResponse"> & {
    /**
     * List of failed policy updates.
     *
     * @generated from field: repeated lnrpc.FailedUpdate failed_updates = 1;
     */
    failedUpdates: FailedUpdate[];
};
/**
 * Describes the message lnrpc.PolicyUpdateResponse.
 * Use `create(PolicyUpdateResponseSchema)` to create a new message.
 */
export declare const PolicyUpdateResponseSchema: GenMessage<PolicyUpdateResponse>;
/**
 * @generated from message lnrpc.ForwardingHistoryRequest
 */
export type ForwardingHistoryRequest = Message<"lnrpc.ForwardingHistoryRequest"> & {
    /**
     * Start time is the starting point of the forwarding history request. All
     * records beyond this point will be included, respecting the end time, and
     * the index offset.
     *
     * @generated from field: uint64 start_time = 1;
     */
    startTime: bigint;
    /**
     * End time is the end point of the forwarding history request. The
     * response will carry at most 50k records between the start time and the
     * end time. The index offset can be used to implement pagination.
     *
     * @generated from field: uint64 end_time = 2;
     */
    endTime: bigint;
    /**
     * Index offset is the offset in the time series to start at. As each
     * response can only contain 50k records, callers can use this to skip
     * around within a packed time series.
     *
     * @generated from field: uint32 index_offset = 3;
     */
    indexOffset: number;
    /**
     * The max number of events to return in the response to this query.
     *
     * @generated from field: uint32 num_max_events = 4;
     */
    numMaxEvents: number;
    /**
     * Informs the server if the peer alias should be looked up for each
     * forwarding event.
     *
     * @generated from field: bool peer_alias_lookup = 5;
     */
    peerAliasLookup: boolean;
};
/**
 * Describes the message lnrpc.ForwardingHistoryRequest.
 * Use `create(ForwardingHistoryRequestSchema)` to create a new message.
 */
export declare const ForwardingHistoryRequestSchema: GenMessage<ForwardingHistoryRequest>;
/**
 * @generated from message lnrpc.ForwardingEvent
 */
export type ForwardingEvent = Message<"lnrpc.ForwardingEvent"> & {
    /**
     * Timestamp is the time (unix epoch offset) that this circuit was
     * completed. Deprecated by timestamp_ns.
     *
     * @generated from field: uint64 timestamp = 1 [deprecated = true];
     * @deprecated
     */
    timestamp: bigint;
    /**
     * The incoming channel ID that carried the HTLC that created the circuit.
     *
     * @generated from field: uint64 chan_id_in = 2 [jstype = JS_STRING];
     */
    chanIdIn: string;
    /**
     * The outgoing channel ID that carried the preimage that completed the
     * circuit.
     *
     * @generated from field: uint64 chan_id_out = 4 [jstype = JS_STRING];
     */
    chanIdOut: string;
    /**
     * The total amount (in satoshis) of the incoming HTLC that created half
     * the circuit.
     *
     * @generated from field: uint64 amt_in = 5;
     */
    amtIn: bigint;
    /**
     * The total amount (in satoshis) of the outgoing HTLC that created the
     * second half of the circuit.
     *
     * @generated from field: uint64 amt_out = 6;
     */
    amtOut: bigint;
    /**
     * The total fee (in satoshis) that this payment circuit carried.
     *
     * @generated from field: uint64 fee = 7;
     */
    fee: bigint;
    /**
     * The total fee (in milli-satoshis) that this payment circuit carried.
     *
     * @generated from field: uint64 fee_msat = 8;
     */
    feeMsat: bigint;
    /**
     * The total amount (in milli-satoshis) of the incoming HTLC that created
     * half the circuit.
     *
     * @generated from field: uint64 amt_in_msat = 9;
     */
    amtInMsat: bigint;
    /**
     * The total amount (in milli-satoshis) of the outgoing HTLC that created
     * the second half of the circuit.
     *
     * @generated from field: uint64 amt_out_msat = 10;
     */
    amtOutMsat: bigint;
    /**
     * The number of nanoseconds elapsed since January 1, 1970 UTC when this
     * circuit was completed.
     *
     * @generated from field: uint64 timestamp_ns = 11;
     */
    timestampNs: bigint;
    /**
     * The peer alias of the incoming channel.
     *
     * @generated from field: string peer_alias_in = 12;
     */
    peerAliasIn: string;
    /**
     * The peer alias of the outgoing channel.
     *
     * @generated from field: string peer_alias_out = 13;
     */
    peerAliasOut: string;
};
/**
 * Describes the message lnrpc.ForwardingEvent.
 * Use `create(ForwardingEventSchema)` to create a new message.
 */
export declare const ForwardingEventSchema: GenMessage<ForwardingEvent>;
/**
 * @generated from message lnrpc.ForwardingHistoryResponse
 */
export type ForwardingHistoryResponse = Message<"lnrpc.ForwardingHistoryResponse"> & {
    /**
     * A list of forwarding events from the time slice of the time series
     * specified in the request.
     *
     * @generated from field: repeated lnrpc.ForwardingEvent forwarding_events = 1;
     */
    forwardingEvents: ForwardingEvent[];
    /**
     * The index of the last time in the set of returned forwarding events. Can
     * be used to seek further, pagination style.
     *
     * @generated from field: uint32 last_offset_index = 2;
     */
    lastOffsetIndex: number;
};
/**
 * Describes the message lnrpc.ForwardingHistoryResponse.
 * Use `create(ForwardingHistoryResponseSchema)` to create a new message.
 */
export declare const ForwardingHistoryResponseSchema: GenMessage<ForwardingHistoryResponse>;
/**
 * @generated from message lnrpc.ExportChannelBackupRequest
 */
export type ExportChannelBackupRequest = Message<"lnrpc.ExportChannelBackupRequest"> & {
    /**
     * The target channel point to obtain a back up for.
     *
     * @generated from field: lnrpc.ChannelPoint chan_point = 1;
     */
    chanPoint?: ChannelPoint;
};
/**
 * Describes the message lnrpc.ExportChannelBackupRequest.
 * Use `create(ExportChannelBackupRequestSchema)` to create a new message.
 */
export declare const ExportChannelBackupRequestSchema: GenMessage<ExportChannelBackupRequest>;
/**
 * @generated from message lnrpc.ChannelBackup
 */
export type ChannelBackup = Message<"lnrpc.ChannelBackup"> & {
    /**
     *
     * Identifies the channel that this backup belongs to.
     *
     * @generated from field: lnrpc.ChannelPoint chan_point = 1;
     */
    chanPoint?: ChannelPoint;
    /**
     *
     * Is an encrypted single-chan backup. this can be passed to
     * RestoreChannelBackups, or the WalletUnlocker Init and Unlock methods in
     * order to trigger the recovery protocol. When using REST, this field must be
     * encoded as base64.
     *
     * @generated from field: bytes chan_backup = 2;
     */
    chanBackup: Uint8Array;
};
/**
 * Describes the message lnrpc.ChannelBackup.
 * Use `create(ChannelBackupSchema)` to create a new message.
 */
export declare const ChannelBackupSchema: GenMessage<ChannelBackup>;
/**
 * @generated from message lnrpc.MultiChanBackup
 */
export type MultiChanBackup = Message<"lnrpc.MultiChanBackup"> & {
    /**
     *
     * Is the set of all channels that are included in this multi-channel backup.
     *
     * @generated from field: repeated lnrpc.ChannelPoint chan_points = 1;
     */
    chanPoints: ChannelPoint[];
    /**
     *
     * A single encrypted blob containing all the static channel backups of the
     * channel listed above. This can be stored as a single file or blob, and
     * safely be replaced with any prior/future versions. When using REST, this
     * field must be encoded as base64.
     *
     * @generated from field: bytes multi_chan_backup = 2;
     */
    multiChanBackup: Uint8Array;
};
/**
 * Describes the message lnrpc.MultiChanBackup.
 * Use `create(MultiChanBackupSchema)` to create a new message.
 */
export declare const MultiChanBackupSchema: GenMessage<MultiChanBackup>;
/**
 * @generated from message lnrpc.ChanBackupExportRequest
 */
export type ChanBackupExportRequest = Message<"lnrpc.ChanBackupExportRequest"> & {};
/**
 * Describes the message lnrpc.ChanBackupExportRequest.
 * Use `create(ChanBackupExportRequestSchema)` to create a new message.
 */
export declare const ChanBackupExportRequestSchema: GenMessage<ChanBackupExportRequest>;
/**
 * @generated from message lnrpc.ChanBackupSnapshot
 */
export type ChanBackupSnapshot = Message<"lnrpc.ChanBackupSnapshot"> & {
    /**
     *
     * The set of new channels that have been added since the last channel backup
     * snapshot was requested.
     *
     * @generated from field: lnrpc.ChannelBackups single_chan_backups = 1;
     */
    singleChanBackups?: ChannelBackups;
    /**
     *
     * A multi-channel backup that covers all open channels currently known to
     * lnd.
     *
     * @generated from field: lnrpc.MultiChanBackup multi_chan_backup = 2;
     */
    multiChanBackup?: MultiChanBackup;
};
/**
 * Describes the message lnrpc.ChanBackupSnapshot.
 * Use `create(ChanBackupSnapshotSchema)` to create a new message.
 */
export declare const ChanBackupSnapshotSchema: GenMessage<ChanBackupSnapshot>;
/**
 * @generated from message lnrpc.ChannelBackups
 */
export type ChannelBackups = Message<"lnrpc.ChannelBackups"> & {
    /**
     *
     * A set of single-chan static channel backups.
     *
     * @generated from field: repeated lnrpc.ChannelBackup chan_backups = 1;
     */
    chanBackups: ChannelBackup[];
};
/**
 * Describes the message lnrpc.ChannelBackups.
 * Use `create(ChannelBackupsSchema)` to create a new message.
 */
export declare const ChannelBackupsSchema: GenMessage<ChannelBackups>;
/**
 * @generated from message lnrpc.RestoreChanBackupRequest
 */
export type RestoreChanBackupRequest = Message<"lnrpc.RestoreChanBackupRequest"> & {
    /**
     * @generated from oneof lnrpc.RestoreChanBackupRequest.backup
     */
    backup: {
        /**
         *
         * The channels to restore as a list of channel/backup pairs.
         *
         * @generated from field: lnrpc.ChannelBackups chan_backups = 1;
         */
        value: ChannelBackups;
        case: "chanBackups";
    } | {
        /**
         *
         * The channels to restore in the packed multi backup format. When using
         * REST, this field must be encoded as base64.
         *
         * @generated from field: bytes multi_chan_backup = 2;
         */
        value: Uint8Array;
        case: "multiChanBackup";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message lnrpc.RestoreChanBackupRequest.
 * Use `create(RestoreChanBackupRequestSchema)` to create a new message.
 */
export declare const RestoreChanBackupRequestSchema: GenMessage<RestoreChanBackupRequest>;
/**
 * @generated from message lnrpc.RestoreBackupResponse
 */
export type RestoreBackupResponse = Message<"lnrpc.RestoreBackupResponse"> & {};
/**
 * Describes the message lnrpc.RestoreBackupResponse.
 * Use `create(RestoreBackupResponseSchema)` to create a new message.
 */
export declare const RestoreBackupResponseSchema: GenMessage<RestoreBackupResponse>;
/**
 * @generated from message lnrpc.ChannelBackupSubscription
 */
export type ChannelBackupSubscription = Message<"lnrpc.ChannelBackupSubscription"> & {};
/**
 * Describes the message lnrpc.ChannelBackupSubscription.
 * Use `create(ChannelBackupSubscriptionSchema)` to create a new message.
 */
export declare const ChannelBackupSubscriptionSchema: GenMessage<ChannelBackupSubscription>;
/**
 * @generated from message lnrpc.VerifyChanBackupResponse
 */
export type VerifyChanBackupResponse = Message<"lnrpc.VerifyChanBackupResponse"> & {};
/**
 * Describes the message lnrpc.VerifyChanBackupResponse.
 * Use `create(VerifyChanBackupResponseSchema)` to create a new message.
 */
export declare const VerifyChanBackupResponseSchema: GenMessage<VerifyChanBackupResponse>;
/**
 * @generated from message lnrpc.MacaroonPermission
 */
export type MacaroonPermission = Message<"lnrpc.MacaroonPermission"> & {
    /**
     * The entity a permission grants access to.
     *
     * @generated from field: string entity = 1;
     */
    entity: string;
    /**
     * The action that is granted.
     *
     * @generated from field: string action = 2;
     */
    action: string;
};
/**
 * Describes the message lnrpc.MacaroonPermission.
 * Use `create(MacaroonPermissionSchema)` to create a new message.
 */
export declare const MacaroonPermissionSchema: GenMessage<MacaroonPermission>;
/**
 * @generated from message lnrpc.BakeMacaroonRequest
 */
export type BakeMacaroonRequest = Message<"lnrpc.BakeMacaroonRequest"> & {
    /**
     * The list of permissions the new macaroon should grant.
     *
     * @generated from field: repeated lnrpc.MacaroonPermission permissions = 1;
     */
    permissions: MacaroonPermission[];
    /**
     * The root key ID used to create the macaroon, must be a positive integer.
     *
     * @generated from field: uint64 root_key_id = 2;
     */
    rootKeyId: bigint;
    /**
     *
     * Informs the RPC on whether to allow external permissions that LND is not
     * aware of.
     *
     * @generated from field: bool allow_external_permissions = 3;
     */
    allowExternalPermissions: boolean;
};
/**
 * Describes the message lnrpc.BakeMacaroonRequest.
 * Use `create(BakeMacaroonRequestSchema)` to create a new message.
 */
export declare const BakeMacaroonRequestSchema: GenMessage<BakeMacaroonRequest>;
/**
 * @generated from message lnrpc.BakeMacaroonResponse
 */
export type BakeMacaroonResponse = Message<"lnrpc.BakeMacaroonResponse"> & {
    /**
     * The hex encoded macaroon, serialized in binary format.
     *
     * @generated from field: string macaroon = 1;
     */
    macaroon: string;
};
/**
 * Describes the message lnrpc.BakeMacaroonResponse.
 * Use `create(BakeMacaroonResponseSchema)` to create a new message.
 */
export declare const BakeMacaroonResponseSchema: GenMessage<BakeMacaroonResponse>;
/**
 * @generated from message lnrpc.ListMacaroonIDsRequest
 */
export type ListMacaroonIDsRequest = Message<"lnrpc.ListMacaroonIDsRequest"> & {};
/**
 * Describes the message lnrpc.ListMacaroonIDsRequest.
 * Use `create(ListMacaroonIDsRequestSchema)` to create a new message.
 */
export declare const ListMacaroonIDsRequestSchema: GenMessage<ListMacaroonIDsRequest>;
/**
 * @generated from message lnrpc.ListMacaroonIDsResponse
 */
export type ListMacaroonIDsResponse = Message<"lnrpc.ListMacaroonIDsResponse"> & {
    /**
     * The list of root key IDs that are in use.
     *
     * @generated from field: repeated uint64 root_key_ids = 1;
     */
    rootKeyIds: bigint[];
};
/**
 * Describes the message lnrpc.ListMacaroonIDsResponse.
 * Use `create(ListMacaroonIDsResponseSchema)` to create a new message.
 */
export declare const ListMacaroonIDsResponseSchema: GenMessage<ListMacaroonIDsResponse>;
/**
 * @generated from message lnrpc.DeleteMacaroonIDRequest
 */
export type DeleteMacaroonIDRequest = Message<"lnrpc.DeleteMacaroonIDRequest"> & {
    /**
     * The root key ID to be removed.
     *
     * @generated from field: uint64 root_key_id = 1;
     */
    rootKeyId: bigint;
};
/**
 * Describes the message lnrpc.DeleteMacaroonIDRequest.
 * Use `create(DeleteMacaroonIDRequestSchema)` to create a new message.
 */
export declare const DeleteMacaroonIDRequestSchema: GenMessage<DeleteMacaroonIDRequest>;
/**
 * @generated from message lnrpc.DeleteMacaroonIDResponse
 */
export type DeleteMacaroonIDResponse = Message<"lnrpc.DeleteMacaroonIDResponse"> & {
    /**
     * A boolean indicates that the deletion is successful.
     *
     * @generated from field: bool deleted = 1;
     */
    deleted: boolean;
};
/**
 * Describes the message lnrpc.DeleteMacaroonIDResponse.
 * Use `create(DeleteMacaroonIDResponseSchema)` to create a new message.
 */
export declare const DeleteMacaroonIDResponseSchema: GenMessage<DeleteMacaroonIDResponse>;
/**
 * @generated from message lnrpc.MacaroonPermissionList
 */
export type MacaroonPermissionList = Message<"lnrpc.MacaroonPermissionList"> & {
    /**
     * A list of macaroon permissions.
     *
     * @generated from field: repeated lnrpc.MacaroonPermission permissions = 1;
     */
    permissions: MacaroonPermission[];
};
/**
 * Describes the message lnrpc.MacaroonPermissionList.
 * Use `create(MacaroonPermissionListSchema)` to create a new message.
 */
export declare const MacaroonPermissionListSchema: GenMessage<MacaroonPermissionList>;
/**
 * @generated from message lnrpc.ListPermissionsRequest
 */
export type ListPermissionsRequest = Message<"lnrpc.ListPermissionsRequest"> & {};
/**
 * Describes the message lnrpc.ListPermissionsRequest.
 * Use `create(ListPermissionsRequestSchema)` to create a new message.
 */
export declare const ListPermissionsRequestSchema: GenMessage<ListPermissionsRequest>;
/**
 * @generated from message lnrpc.ListPermissionsResponse
 */
export type ListPermissionsResponse = Message<"lnrpc.ListPermissionsResponse"> & {
    /**
     *
     * A map between all RPC method URIs and their required macaroon permissions to
     * access them.
     *
     * @generated from field: map<string, lnrpc.MacaroonPermissionList> method_permissions = 1;
     */
    methodPermissions: {
        [key: string]: MacaroonPermissionList;
    };
};
/**
 * Describes the message lnrpc.ListPermissionsResponse.
 * Use `create(ListPermissionsResponseSchema)` to create a new message.
 */
export declare const ListPermissionsResponseSchema: GenMessage<ListPermissionsResponse>;
/**
 * @generated from message lnrpc.Failure
 */
export type Failure = Message<"lnrpc.Failure"> & {
    /**
     * Failure code as defined in the Lightning spec
     *
     * @generated from field: lnrpc.Failure.FailureCode code = 1;
     */
    code: Failure_FailureCode;
    /**
     * An optional channel update message.
     *
     * @generated from field: lnrpc.ChannelUpdate channel_update = 3;
     */
    channelUpdate?: ChannelUpdate;
    /**
     * A failure type-dependent htlc value.
     *
     * @generated from field: uint64 htlc_msat = 4;
     */
    htlcMsat: bigint;
    /**
     * The sha256 sum of the onion payload.
     *
     * @generated from field: bytes onion_sha_256 = 5;
     */
    onionSha256: Uint8Array;
    /**
     * A failure type-dependent cltv expiry value.
     *
     * @generated from field: uint32 cltv_expiry = 6;
     */
    cltvExpiry: number;
    /**
     * A failure type-dependent flags value.
     *
     * @generated from field: uint32 flags = 7;
     */
    flags: number;
    /**
     *
     * The position in the path of the intermediate or final node that generated
     * the failure message. Position zero is the sender node.
     *
     * @generated from field: uint32 failure_source_index = 8;
     */
    failureSourceIndex: number;
    /**
     * A failure type-dependent block height.
     *
     * @generated from field: uint32 height = 9;
     */
    height: number;
};
/**
 * Describes the message lnrpc.Failure.
 * Use `create(FailureSchema)` to create a new message.
 */
export declare const FailureSchema: GenMessage<Failure>;
/**
 * @generated from enum lnrpc.Failure.FailureCode
 */
export declare enum Failure_FailureCode {
    /**
     *
     * The numbers assigned in this enumeration match the failure codes as
     * defined in BOLT #4. Because protobuf 3 requires enums to start with 0,
     * a RESERVED value is added.
     *
     * @generated from enum value: RESERVED = 0;
     */
    RESERVED = 0,
    /**
     * @generated from enum value: INCORRECT_OR_UNKNOWN_PAYMENT_DETAILS = 1;
     */
    INCORRECT_OR_UNKNOWN_PAYMENT_DETAILS = 1,
    /**
     * @generated from enum value: INCORRECT_PAYMENT_AMOUNT = 2;
     */
    INCORRECT_PAYMENT_AMOUNT = 2,
    /**
     * @generated from enum value: FINAL_INCORRECT_CLTV_EXPIRY = 3;
     */
    FINAL_INCORRECT_CLTV_EXPIRY = 3,
    /**
     * @generated from enum value: FINAL_INCORRECT_HTLC_AMOUNT = 4;
     */
    FINAL_INCORRECT_HTLC_AMOUNT = 4,
    /**
     * @generated from enum value: FINAL_EXPIRY_TOO_SOON = 5;
     */
    FINAL_EXPIRY_TOO_SOON = 5,
    /**
     * @generated from enum value: INVALID_REALM = 6;
     */
    INVALID_REALM = 6,
    /**
     * @generated from enum value: EXPIRY_TOO_SOON = 7;
     */
    EXPIRY_TOO_SOON = 7,
    /**
     * @generated from enum value: INVALID_ONION_VERSION = 8;
     */
    INVALID_ONION_VERSION = 8,
    /**
     * @generated from enum value: INVALID_ONION_HMAC = 9;
     */
    INVALID_ONION_HMAC = 9,
    /**
     * @generated from enum value: INVALID_ONION_KEY = 10;
     */
    INVALID_ONION_KEY = 10,
    /**
     * @generated from enum value: AMOUNT_BELOW_MINIMUM = 11;
     */
    AMOUNT_BELOW_MINIMUM = 11,
    /**
     * @generated from enum value: FEE_INSUFFICIENT = 12;
     */
    FEE_INSUFFICIENT = 12,
    /**
     * @generated from enum value: INCORRECT_CLTV_EXPIRY = 13;
     */
    INCORRECT_CLTV_EXPIRY = 13,
    /**
     * @generated from enum value: CHANNEL_DISABLED = 14;
     */
    CHANNEL_DISABLED = 14,
    /**
     * @generated from enum value: TEMPORARY_CHANNEL_FAILURE = 15;
     */
    TEMPORARY_CHANNEL_FAILURE = 15,
    /**
     * @generated from enum value: REQUIRED_NODE_FEATURE_MISSING = 16;
     */
    REQUIRED_NODE_FEATURE_MISSING = 16,
    /**
     * @generated from enum value: REQUIRED_CHANNEL_FEATURE_MISSING = 17;
     */
    REQUIRED_CHANNEL_FEATURE_MISSING = 17,
    /**
     * @generated from enum value: UNKNOWN_NEXT_PEER = 18;
     */
    UNKNOWN_NEXT_PEER = 18,
    /**
     * @generated from enum value: TEMPORARY_NODE_FAILURE = 19;
     */
    TEMPORARY_NODE_FAILURE = 19,
    /**
     * @generated from enum value: PERMANENT_NODE_FAILURE = 20;
     */
    PERMANENT_NODE_FAILURE = 20,
    /**
     * @generated from enum value: PERMANENT_CHANNEL_FAILURE = 21;
     */
    PERMANENT_CHANNEL_FAILURE = 21,
    /**
     * @generated from enum value: EXPIRY_TOO_FAR = 22;
     */
    EXPIRY_TOO_FAR = 22,
    /**
     * @generated from enum value: MPP_TIMEOUT = 23;
     */
    MPP_TIMEOUT = 23,
    /**
     * @generated from enum value: INVALID_ONION_PAYLOAD = 24;
     */
    INVALID_ONION_PAYLOAD = 24,
    /**
     *
     * An internal error occurred.
     *
     * @generated from enum value: INTERNAL_FAILURE = 997;
     */
    INTERNAL_FAILURE = 997,
    /**
     *
     * The error source is known, but the failure itself couldn't be decoded.
     *
     * @generated from enum value: UNKNOWN_FAILURE = 998;
     */
    UNKNOWN_FAILURE = 998,
    /**
     *
     * An unreadable failure result is returned if the received failure message
     * cannot be decrypted. In that case the error source is unknown.
     *
     * @generated from enum value: UNREADABLE_FAILURE = 999;
     */
    UNREADABLE_FAILURE = 999
}
/**
 * Describes the enum lnrpc.Failure.FailureCode.
 */
export declare const Failure_FailureCodeSchema: GenEnum<Failure_FailureCode>;
/**
 * @generated from message lnrpc.ChannelUpdate
 */
export type ChannelUpdate = Message<"lnrpc.ChannelUpdate"> & {
    /**
     *
     * The signature that validates the announced data and proves the ownership
     * of node id.
     *
     * @generated from field: bytes signature = 1;
     */
    signature: Uint8Array;
    /**
     *
     * The target chain that this channel was opened within. This value
     * should be the genesis hash of the target chain. Along with the short
     * channel ID, this uniquely identifies the channel globally in a
     * blockchain.
     *
     * @generated from field: bytes chain_hash = 2;
     */
    chainHash: Uint8Array;
    /**
     *
     * The unique description of the funding transaction.
     *
     * @generated from field: uint64 chan_id = 3 [jstype = JS_STRING];
     */
    chanId: string;
    /**
     *
     * A timestamp that allows ordering in the case of multiple announcements.
     * We should ignore the message if timestamp is not greater than the
     * last-received.
     *
     * @generated from field: uint32 timestamp = 4;
     */
    timestamp: number;
    /**
     *
     * The bitfield that describes whether optional fields are present in this
     * update. Currently, the least-significant bit must be set to 1 if the
     * optional field MaxHtlc is present.
     *
     * @generated from field: uint32 message_flags = 10;
     */
    messageFlags: number;
    /**
     *
     * The bitfield that describes additional meta-data concerning how the
     * update is to be interpreted. Currently, the least-significant bit must be
     * set to 0 if the creating node corresponds to the first node in the
     * previously sent channel announcement and 1 otherwise. If the second bit
     * is set, then the channel is set to be disabled.
     *
     * @generated from field: uint32 channel_flags = 5;
     */
    channelFlags: number;
    /**
     *
     * The minimum number of blocks this node requires to be added to the expiry
     * of HTLCs. This is a security parameter determined by the node operator.
     * This value represents the required gap between the time locks of the
     * incoming and outgoing HTLC's set to this node.
     *
     * @generated from field: uint32 time_lock_delta = 6;
     */
    timeLockDelta: number;
    /**
     *
     * The minimum HTLC value which will be accepted.
     *
     * @generated from field: uint64 htlc_minimum_msat = 7;
     */
    htlcMinimumMsat: bigint;
    /**
     *
     * The base fee that must be used for incoming HTLC's to this particular
     * channel. This value will be tacked onto the required for a payment
     * independent of the size of the payment.
     *
     * @generated from field: uint32 base_fee = 8;
     */
    baseFee: number;
    /**
     *
     * The fee rate that will be charged per millionth of a satoshi.
     *
     * @generated from field: uint32 fee_rate = 9;
     */
    feeRate: number;
    /**
     *
     * The maximum HTLC value which will be accepted.
     *
     * @generated from field: uint64 htlc_maximum_msat = 11;
     */
    htlcMaximumMsat: bigint;
    /**
     *
     * The set of data that was appended to this message, some of which we may
     * not actually know how to iterate or parse. By holding onto this data, we
     * ensure that we're able to properly validate the set of signatures that
     * cover these new fields, and ensure we're able to make upgrades to the
     * network in a forwards compatible manner.
     *
     * @generated from field: bytes extra_opaque_data = 12;
     */
    extraOpaqueData: Uint8Array;
};
/**
 * Describes the message lnrpc.ChannelUpdate.
 * Use `create(ChannelUpdateSchema)` to create a new message.
 */
export declare const ChannelUpdateSchema: GenMessage<ChannelUpdate>;
/**
 * @generated from message lnrpc.MacaroonId
 */
export type MacaroonId = Message<"lnrpc.MacaroonId"> & {
    /**
     * @generated from field: bytes nonce = 1;
     */
    nonce: Uint8Array;
    /**
     * @generated from field: bytes storageId = 2;
     */
    storageId: Uint8Array;
    /**
     * @generated from field: repeated lnrpc.Op ops = 3;
     */
    ops: Op[];
};
/**
 * Describes the message lnrpc.MacaroonId.
 * Use `create(MacaroonIdSchema)` to create a new message.
 */
export declare const MacaroonIdSchema: GenMessage<MacaroonId>;
/**
 * @generated from message lnrpc.Op
 */
export type Op = Message<"lnrpc.Op"> & {
    /**
     * @generated from field: string entity = 1;
     */
    entity: string;
    /**
     * @generated from field: repeated string actions = 2;
     */
    actions: string[];
};
/**
 * Describes the message lnrpc.Op.
 * Use `create(OpSchema)` to create a new message.
 */
export declare const OpSchema: GenMessage<Op>;
/**
 * @generated from message lnrpc.CheckMacPermRequest
 */
export type CheckMacPermRequest = Message<"lnrpc.CheckMacPermRequest"> & {
    /**
     * @generated from field: bytes macaroon = 1;
     */
    macaroon: Uint8Array;
    /**
     * @generated from field: repeated lnrpc.MacaroonPermission permissions = 2;
     */
    permissions: MacaroonPermission[];
    /**
     * @generated from field: string fullMethod = 3;
     */
    fullMethod: string;
};
/**
 * Describes the message lnrpc.CheckMacPermRequest.
 * Use `create(CheckMacPermRequestSchema)` to create a new message.
 */
export declare const CheckMacPermRequestSchema: GenMessage<CheckMacPermRequest>;
/**
 * @generated from message lnrpc.CheckMacPermResponse
 */
export type CheckMacPermResponse = Message<"lnrpc.CheckMacPermResponse"> & {
    /**
     * @generated from field: bool valid = 1;
     */
    valid: boolean;
};
/**
 * Describes the message lnrpc.CheckMacPermResponse.
 * Use `create(CheckMacPermResponseSchema)` to create a new message.
 */
export declare const CheckMacPermResponseSchema: GenMessage<CheckMacPermResponse>;
/**
 * @generated from message lnrpc.RPCMiddlewareRequest
 */
export type RPCMiddlewareRequest = Message<"lnrpc.RPCMiddlewareRequest"> & {
    /**
     *
     * The unique ID of the intercepted original gRPC request. Useful for mapping
     * request to response when implementing full duplex message interception. For
     * streaming requests, this will be the same ID for all incoming and outgoing
     * middleware intercept messages of the _same_ stream.
     *
     * @generated from field: uint64 request_id = 1;
     */
    requestId: bigint;
    /**
     *
     * The raw bytes of the complete macaroon as sent by the gRPC client in the
     * original request. This might be empty for a request that doesn't require
     * macaroons such as the wallet unlocker RPCs.
     *
     * @generated from field: bytes raw_macaroon = 2;
     */
    rawMacaroon: Uint8Array;
    /**
     *
     * The parsed condition of the macaroon's custom caveat for convenient access.
     * This field only contains the value of the custom caveat that the handling
     * middleware has registered itself for. The condition _must_ be validated for
     * messages of intercept_type stream_auth and request!
     *
     * @generated from field: string custom_caveat_condition = 3;
     */
    customCaveatCondition: string;
    /**
     *
     * There are three types of messages that will be sent to the middleware for
     * inspection and approval: Stream authentication, request and response
     * interception. The first two can only be accepted (=forward to main RPC
     * server) or denied (=return error to client). Intercepted responses can also
     * be replaced/overwritten.
     *
     * @generated from oneof lnrpc.RPCMiddlewareRequest.intercept_type
     */
    interceptType: {
        /**
         *
         * Intercept stream authentication: each new streaming RPC call that is
         * initiated against lnd and contains the middleware's custom macaroon
         * caveat can be approved or denied based upon the macaroon in the stream
         * header. This message will only be sent for streaming RPCs, unary RPCs
         * must handle the macaroon authentication in the request interception to
         * avoid an additional message round trip between lnd and the middleware.
         *
         * @generated from field: lnrpc.StreamAuth stream_auth = 4;
         */
        value: StreamAuth;
        case: "streamAuth";
    } | {
        /**
         *
         * Intercept incoming gRPC client request message: all incoming messages,
         * both on streaming and unary RPCs, are forwarded to the middleware for
         * inspection. For unary RPC messages the middleware is also expected to
         * validate the custom macaroon caveat of the request.
         *
         * @generated from field: lnrpc.RPCMessage request = 5;
         */
        value: RPCMessage;
        case: "request";
    } | {
        /**
         *
         * Intercept outgoing gRPC response message: all outgoing messages, both on
         * streaming and unary RPCs, are forwarded to the middleware for inspection
         * and amendment. The response in this message is the original response as
         * it was generated by the main RPC server. It can either be accepted
         * (=forwarded to the client), replaced/overwritten with a new message of
         * the same type, or replaced by an error message.
         *
         * @generated from field: lnrpc.RPCMessage response = 6;
         */
        value: RPCMessage;
        case: "response";
    } | {
        /**
         *
         * This is used to indicate to the client that the server has successfully
         * registered the interceptor. This is only used in the very first message
         * that the server sends to the client after the client sends the server
         * the middleware registration message.
         *
         * @generated from field: bool reg_complete = 8;
         */
        value: boolean;
        case: "regComplete";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     *
     * The unique message ID of this middleware intercept message. There can be
     * multiple middleware intercept messages per single gRPC request (one for the
     * incoming request and one for the outgoing response) or gRPC stream (one for
     * each incoming message and one for each outgoing response). This message ID
     * must be referenced when responding (accepting/rejecting/modifying) to an
     * intercept message.
     *
     * @generated from field: uint64 msg_id = 7;
     */
    msgId: bigint;
};
/**
 * Describes the message lnrpc.RPCMiddlewareRequest.
 * Use `create(RPCMiddlewareRequestSchema)` to create a new message.
 */
export declare const RPCMiddlewareRequestSchema: GenMessage<RPCMiddlewareRequest>;
/**
 * @generated from message lnrpc.StreamAuth
 */
export type StreamAuth = Message<"lnrpc.StreamAuth"> & {
    /**
     *
     * The full URI (in the format /<rpcpackage>.<ServiceName>/MethodName, for
     * example /lnrpc.Lightning/GetInfo) of the streaming RPC method that was just
     * established.
     *
     * @generated from field: string method_full_uri = 1;
     */
    methodFullUri: string;
};
/**
 * Describes the message lnrpc.StreamAuth.
 * Use `create(StreamAuthSchema)` to create a new message.
 */
export declare const StreamAuthSchema: GenMessage<StreamAuth>;
/**
 * @generated from message lnrpc.RPCMessage
 */
export type RPCMessage = Message<"lnrpc.RPCMessage"> & {
    /**
     *
     * The full URI (in the format /<rpcpackage>.<ServiceName>/MethodName, for
     * example /lnrpc.Lightning/GetInfo) of the RPC method the message was sent
     * to/from.
     *
     * @generated from field: string method_full_uri = 1;
     */
    methodFullUri: string;
    /**
     *
     * Indicates whether the message was sent over a streaming RPC method or not.
     *
     * @generated from field: bool stream_rpc = 2;
     */
    streamRpc: boolean;
    /**
     *
     * The full canonical gRPC name of the message type (in the format
     * <rpcpackage>.TypeName, for example lnrpc.GetInfoRequest). In case of an
     * error being returned from lnd, this simply contains the string "error".
     *
     * @generated from field: string type_name = 3;
     */
    typeName: string;
    /**
     *
     * The full content of the gRPC message, serialized in the binary protobuf
     * format.
     *
     * @generated from field: bytes serialized = 4;
     */
    serialized: Uint8Array;
    /**
     *
     * Indicates that the response from lnd was an error, not a gRPC response. If
     * this is set to true then the type_name contains the string "error" and
     * serialized contains the error string.
     *
     * @generated from field: bool is_error = 5;
     */
    isError: boolean;
};
/**
 * Describes the message lnrpc.RPCMessage.
 * Use `create(RPCMessageSchema)` to create a new message.
 */
export declare const RPCMessageSchema: GenMessage<RPCMessage>;
/**
 * @generated from message lnrpc.RPCMiddlewareResponse
 */
export type RPCMiddlewareResponse = Message<"lnrpc.RPCMiddlewareResponse"> & {
    /**
     *
     * The request message ID this response refers to. Must always be set when
     * giving feedback to an intercept but is ignored for the initial registration
     * message.
     *
     * @generated from field: uint64 ref_msg_id = 1;
     */
    refMsgId: bigint;
    /**
     *
     * The middleware can only send two types of messages to lnd: The initial
     * registration message that identifies the middleware and after that only
     * feedback messages to requests sent to the middleware.
     *
     * @generated from oneof lnrpc.RPCMiddlewareResponse.middleware_message
     */
    middlewareMessage: {
        /**
         *
         * The registration message identifies the middleware that's being
         * registered in lnd. The registration message must be sent immediately
         * after initiating the RegisterRpcMiddleware stream, otherwise lnd will
         * time out the attempt and terminate the request. NOTE: The middleware
         * will only receive interception messages for requests that contain a
         * macaroon with the custom caveat that the middleware declares it is
         * responsible for handling in the registration message! As a security
         * measure, _no_ middleware can intercept requests made with _unencumbered_
         * macaroons!
         *
         * @generated from field: lnrpc.MiddlewareRegistration register = 2;
         */
        value: MiddlewareRegistration;
        case: "register";
    } | {
        /**
         *
         * The middleware received an interception request and gives feedback to
         * it. The request_id indicates what message the feedback refers to.
         *
         * @generated from field: lnrpc.InterceptFeedback feedback = 3;
         */
        value: InterceptFeedback;
        case: "feedback";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message lnrpc.RPCMiddlewareResponse.
 * Use `create(RPCMiddlewareResponseSchema)` to create a new message.
 */
export declare const RPCMiddlewareResponseSchema: GenMessage<RPCMiddlewareResponse>;
/**
 * @generated from message lnrpc.MiddlewareRegistration
 */
export type MiddlewareRegistration = Message<"lnrpc.MiddlewareRegistration"> & {
    /**
     *
     * The name of the middleware to register. The name should be as informative
     * as possible and is logged on registration.
     *
     * @generated from field: string middleware_name = 1;
     */
    middlewareName: string;
    /**
     *
     * The name of the custom macaroon caveat that this middleware is responsible
     * for. Only requests/responses that contain a macaroon with the registered
     * custom caveat are forwarded for interception to the middleware. The
     * exception being the read-only mode: All requests/responses are forwarded to
     * a middleware that requests read-only access but such a middleware won't be
     * allowed to _alter_ responses. As a security measure, _no_ middleware can
     * change responses to requests made with _unencumbered_ macaroons!
     * NOTE: Cannot be used at the same time as read_only_mode.
     *
     * @generated from field: string custom_macaroon_caveat_name = 2;
     */
    customMacaroonCaveatName: string;
    /**
     *
     * Instead of defining a custom macaroon caveat name a middleware can register
     * itself for read-only access only. In that mode all requests/responses are
     * forwarded to the middleware but the middleware isn't allowed to alter any of
     * the responses.
     * NOTE: Cannot be used at the same time as custom_macaroon_caveat_name.
     *
     * @generated from field: bool read_only_mode = 3;
     */
    readOnlyMode: boolean;
};
/**
 * Describes the message lnrpc.MiddlewareRegistration.
 * Use `create(MiddlewareRegistrationSchema)` to create a new message.
 */
export declare const MiddlewareRegistrationSchema: GenMessage<MiddlewareRegistration>;
/**
 * @generated from message lnrpc.InterceptFeedback
 */
export type InterceptFeedback = Message<"lnrpc.InterceptFeedback"> & {
    /**
     *
     * The error to return to the user. If this is non-empty, the incoming gRPC
     * stream/request is aborted and the error is returned to the gRPC client. If
     * this value is empty, it means the middleware accepts the stream/request/
     * response and the processing of it can continue.
     *
     * @generated from field: string error = 1;
     */
    error: string;
    /**
     *
     * A boolean indicating that the gRPC message should be replaced/overwritten.
     * This boolean is needed because in protobuf an empty message is serialized as
     * a 0-length or nil byte slice and we wouldn't be able to distinguish between
     * an empty replacement message and the "don't replace anything" case.
     *
     * @generated from field: bool replace_response = 2;
     */
    replaceResponse: boolean;
    /**
     *
     * If the replace_response field is set to true, this field must contain the
     * binary serialized gRPC message in the protobuf format.
     *
     * @generated from field: bytes replacement_serialized = 3;
     */
    replacementSerialized: Uint8Array;
};
/**
 * Describes the message lnrpc.InterceptFeedback.
 * Use `create(InterceptFeedbackSchema)` to create a new message.
 */
export declare const InterceptFeedbackSchema: GenMessage<InterceptFeedback>;
/**
 * @generated from enum lnrpc.OutputScriptType
 */
export declare enum OutputScriptType {
    /**
     * @generated from enum value: SCRIPT_TYPE_PUBKEY_HASH = 0;
     */
    SCRIPT_TYPE_PUBKEY_HASH = 0,
    /**
     * @generated from enum value: SCRIPT_TYPE_SCRIPT_HASH = 1;
     */
    SCRIPT_TYPE_SCRIPT_HASH = 1,
    /**
     * @generated from enum value: SCRIPT_TYPE_WITNESS_V0_PUBKEY_HASH = 2;
     */
    SCRIPT_TYPE_WITNESS_V0_PUBKEY_HASH = 2,
    /**
     * @generated from enum value: SCRIPT_TYPE_WITNESS_V0_SCRIPT_HASH = 3;
     */
    SCRIPT_TYPE_WITNESS_V0_SCRIPT_HASH = 3,
    /**
     * @generated from enum value: SCRIPT_TYPE_PUBKEY = 4;
     */
    SCRIPT_TYPE_PUBKEY = 4,
    /**
     * @generated from enum value: SCRIPT_TYPE_MULTISIG = 5;
     */
    SCRIPT_TYPE_MULTISIG = 5,
    /**
     * @generated from enum value: SCRIPT_TYPE_NULLDATA = 6;
     */
    SCRIPT_TYPE_NULLDATA = 6,
    /**
     * @generated from enum value: SCRIPT_TYPE_NON_STANDARD = 7;
     */
    SCRIPT_TYPE_NON_STANDARD = 7,
    /**
     * @generated from enum value: SCRIPT_TYPE_WITNESS_UNKNOWN = 8;
     */
    SCRIPT_TYPE_WITNESS_UNKNOWN = 8,
    /**
     * @generated from enum value: SCRIPT_TYPE_WITNESS_V1_TAPROOT = 9;
     */
    SCRIPT_TYPE_WITNESS_V1_TAPROOT = 9
}
/**
 * Describes the enum lnrpc.OutputScriptType.
 */
export declare const OutputScriptTypeSchema: GenEnum<OutputScriptType>;
/**
 *
 * `AddressType` has to be one of:
 *
 * - `p2wkh`: Pay to witness key hash (`WITNESS_PUBKEY_HASH` = 0)
 * - `np2wkh`: Pay to nested witness key hash (`NESTED_PUBKEY_HASH` = 1)
 * - `p2tr`: Pay to taproot pubkey (`TAPROOT_PUBKEY` = 4)
 *
 * @generated from enum lnrpc.AddressType
 */
export declare enum AddressType {
    /**
     * @generated from enum value: WITNESS_PUBKEY_HASH = 0;
     */
    WITNESS_PUBKEY_HASH = 0,
    /**
     * @generated from enum value: NESTED_PUBKEY_HASH = 1;
     */
    NESTED_PUBKEY_HASH = 1,
    /**
     * @generated from enum value: UNUSED_WITNESS_PUBKEY_HASH = 2;
     */
    UNUSED_WITNESS_PUBKEY_HASH = 2,
    /**
     * @generated from enum value: UNUSED_NESTED_PUBKEY_HASH = 3;
     */
    UNUSED_NESTED_PUBKEY_HASH = 3,
    /**
     * @generated from enum value: TAPROOT_PUBKEY = 4;
     */
    TAPROOT_PUBKEY = 4,
    /**
     * @generated from enum value: UNUSED_TAPROOT_PUBKEY = 5;
     */
    UNUSED_TAPROOT_PUBKEY = 5
}
/**
 * Describes the enum lnrpc.AddressType.
 */
export declare const AddressTypeSchema: GenEnum<AddressType>;
/**
 * @generated from enum lnrpc.CommitmentType
 */
export declare enum CommitmentType {
    /**
     *
     * Returned when the commitment type isn't known or unavailable.
     *
     * @generated from enum value: UNKNOWN_COMMITMENT_TYPE = 0;
     */
    UNKNOWN_COMMITMENT_TYPE = 0,
    /**
     *
     * A channel using the legacy commitment format having tweaked to_remote
     * keys.
     *
     * @generated from enum value: LEGACY = 1;
     */
    LEGACY = 1,
    /**
     *
     * A channel that uses the modern commitment format where the key in the
     * output of the remote party does not change each state. This makes back
     * up and recovery easier as when the channel is closed, the funds go
     * directly to that key.
     *
     * @generated from enum value: STATIC_REMOTE_KEY = 2;
     */
    STATIC_REMOTE_KEY = 2,
    /**
     *
     * A channel that uses a commitment format that has anchor outputs on the
     * commitments, allowing fee bumping after a force close transaction has
     * been broadcast.
     *
     * @generated from enum value: ANCHORS = 3;
     */
    ANCHORS = 3,
    /**
     *
     * A channel that uses a commitment type that builds upon the anchors
     * commitment format, but in addition requires a CLTV clause to spend outputs
     * paying to the channel initiator. This is intended for use on leased channels
     * to guarantee that the channel initiator has no incentives to close a leased
     * channel before its maturity date.
     *
     * @generated from enum value: SCRIPT_ENFORCED_LEASE = 4;
     */
    SCRIPT_ENFORCED_LEASE = 4,
    /**
     * TODO(roasbeef): need script enforce mirror type for the above as well?
     *
     * @generated from enum value: SIMPLE_TAPROOT = 5;
     */
    SIMPLE_TAPROOT = 5
}
/**
 * Describes the enum lnrpc.CommitmentType.
 */
export declare const CommitmentTypeSchema: GenEnum<CommitmentType>;
/**
 * @generated from enum lnrpc.Initiator
 */
export declare enum Initiator {
    /**
     * @generated from enum value: INITIATOR_UNKNOWN = 0;
     */
    UNKNOWN = 0,
    /**
     * @generated from enum value: INITIATOR_LOCAL = 1;
     */
    LOCAL = 1,
    /**
     * @generated from enum value: INITIATOR_REMOTE = 2;
     */
    REMOTE = 2,
    /**
     * @generated from enum value: INITIATOR_BOTH = 3;
     */
    BOTH = 3
}
/**
 * Describes the enum lnrpc.Initiator.
 */
export declare const InitiatorSchema: GenEnum<Initiator>;
/**
 * @generated from enum lnrpc.ResolutionType
 */
export declare enum ResolutionType {
    /**
     * @generated from enum value: TYPE_UNKNOWN = 0;
     */
    TYPE_UNKNOWN = 0,
    /**
     * We resolved an anchor output.
     *
     * @generated from enum value: ANCHOR = 1;
     */
    ANCHOR = 1,
    /**
     *
     * We are resolving an incoming htlc on chain. This if this htlc is
     * claimed, we swept the incoming htlc with the preimage. If it is timed
     * out, our peer swept the timeout path.
     *
     * @generated from enum value: INCOMING_HTLC = 2;
     */
    INCOMING_HTLC = 2,
    /**
     *
     * We are resolving an outgoing htlc on chain. If this htlc is claimed,
     * the remote party swept the htlc with the preimage. If it is timed out,
     * we swept it with the timeout path.
     *
     * @generated from enum value: OUTGOING_HTLC = 3;
     */
    OUTGOING_HTLC = 3,
    /**
     * We force closed and need to sweep our time locked commitment output.
     *
     * @generated from enum value: COMMIT = 4;
     */
    COMMIT = 4
}
/**
 * Describes the enum lnrpc.ResolutionType.
 */
export declare const ResolutionTypeSchema: GenEnum<ResolutionType>;
/**
 * @generated from enum lnrpc.ResolutionOutcome
 */
export declare enum ResolutionOutcome {
    /**
     * Outcome unknown.
     *
     * @generated from enum value: OUTCOME_UNKNOWN = 0;
     */
    OUTCOME_UNKNOWN = 0,
    /**
     * An output was claimed on chain.
     *
     * @generated from enum value: CLAIMED = 1;
     */
    CLAIMED = 1,
    /**
     * An output was left unclaimed on chain.
     *
     * @generated from enum value: UNCLAIMED = 2;
     */
    UNCLAIMED = 2,
    /**
     *
     * ResolverOutcomeAbandoned indicates that an output that we did not
     * claim on chain, for example an anchor that we did not sweep and a
     * third party claimed on chain, or a htlc that we could not decode
     * so left unclaimed.
     *
     * @generated from enum value: ABANDONED = 3;
     */
    ABANDONED = 3,
    /**
     *
     * If we force closed our channel, our htlcs need to be claimed in two
     * stages. This outcome represents the broadcast of a timeout or success
     * transaction for this two stage htlc claim.
     *
     * @generated from enum value: FIRST_STAGE = 4;
     */
    FIRST_STAGE = 4,
    /**
     * A htlc was timed out on chain.
     *
     * @generated from enum value: TIMEOUT = 5;
     */
    TIMEOUT = 5
}
/**
 * Describes the enum lnrpc.ResolutionOutcome.
 */
export declare const ResolutionOutcomeSchema: GenEnum<ResolutionOutcome>;
/**
 * @generated from enum lnrpc.NodeMetricType
 */
export declare enum NodeMetricType {
    /**
     * @generated from enum value: UNKNOWN = 0;
     */
    UNKNOWN = 0,
    /**
     * @generated from enum value: BETWEENNESS_CENTRALITY = 1;
     */
    BETWEENNESS_CENTRALITY = 1
}
/**
 * Describes the enum lnrpc.NodeMetricType.
 */
export declare const NodeMetricTypeSchema: GenEnum<NodeMetricType>;
/**
 * @generated from enum lnrpc.InvoiceHTLCState
 */
export declare enum InvoiceHTLCState {
    /**
     * @generated from enum value: ACCEPTED = 0;
     */
    ACCEPTED = 0,
    /**
     * @generated from enum value: SETTLED = 1;
     */
    SETTLED = 1,
    /**
     * @generated from enum value: CANCELED = 2;
     */
    CANCELED = 2
}
/**
 * Describes the enum lnrpc.InvoiceHTLCState.
 */
export declare const InvoiceHTLCStateSchema: GenEnum<InvoiceHTLCState>;
/**
 * @generated from enum lnrpc.PaymentFailureReason
 */
export declare enum PaymentFailureReason {
    /**
     *
     * Payment isn't failed (yet).
     *
     * @generated from enum value: FAILURE_REASON_NONE = 0;
     */
    FAILURE_REASON_NONE = 0,
    /**
     *
     * There are more routes to try, but the payment timeout was exceeded.
     *
     * @generated from enum value: FAILURE_REASON_TIMEOUT = 1;
     */
    FAILURE_REASON_TIMEOUT = 1,
    /**
     *
     * All possible routes were tried and failed permanently. Or were no
     * routes to the destination at all.
     *
     * @generated from enum value: FAILURE_REASON_NO_ROUTE = 2;
     */
    FAILURE_REASON_NO_ROUTE = 2,
    /**
     *
     * A non-recoverable error has occured.
     *
     * @generated from enum value: FAILURE_REASON_ERROR = 3;
     */
    FAILURE_REASON_ERROR = 3,
    /**
     *
     * Payment details incorrect (unknown hash, invalid amt or
     * invalid final cltv delta)
     *
     * @generated from enum value: FAILURE_REASON_INCORRECT_PAYMENT_DETAILS = 4;
     */
    FAILURE_REASON_INCORRECT_PAYMENT_DETAILS = 4,
    /**
     *
     * Insufficient local balance.
     *
     * @generated from enum value: FAILURE_REASON_INSUFFICIENT_BALANCE = 5;
     */
    FAILURE_REASON_INSUFFICIENT_BALANCE = 5
}
/**
 * Describes the enum lnrpc.PaymentFailureReason.
 */
export declare const PaymentFailureReasonSchema: GenEnum<PaymentFailureReason>;
/**
 * @generated from enum lnrpc.FeatureBit
 */
export declare enum FeatureBit {
    /**
     * @generated from enum value: DATALOSS_PROTECT_REQ = 0;
     */
    DATALOSS_PROTECT_REQ = 0,
    /**
     * @generated from enum value: DATALOSS_PROTECT_OPT = 1;
     */
    DATALOSS_PROTECT_OPT = 1,
    /**
     * @generated from enum value: INITIAL_ROUING_SYNC = 3;
     */
    INITIAL_ROUING_SYNC = 3,
    /**
     * @generated from enum value: UPFRONT_SHUTDOWN_SCRIPT_REQ = 4;
     */
    UPFRONT_SHUTDOWN_SCRIPT_REQ = 4,
    /**
     * @generated from enum value: UPFRONT_SHUTDOWN_SCRIPT_OPT = 5;
     */
    UPFRONT_SHUTDOWN_SCRIPT_OPT = 5,
    /**
     * @generated from enum value: GOSSIP_QUERIES_REQ = 6;
     */
    GOSSIP_QUERIES_REQ = 6,
    /**
     * @generated from enum value: GOSSIP_QUERIES_OPT = 7;
     */
    GOSSIP_QUERIES_OPT = 7,
    /**
     * @generated from enum value: TLV_ONION_REQ = 8;
     */
    TLV_ONION_REQ = 8,
    /**
     * @generated from enum value: TLV_ONION_OPT = 9;
     */
    TLV_ONION_OPT = 9,
    /**
     * @generated from enum value: EXT_GOSSIP_QUERIES_REQ = 10;
     */
    EXT_GOSSIP_QUERIES_REQ = 10,
    /**
     * @generated from enum value: EXT_GOSSIP_QUERIES_OPT = 11;
     */
    EXT_GOSSIP_QUERIES_OPT = 11,
    /**
     * @generated from enum value: STATIC_REMOTE_KEY_REQ = 12;
     */
    STATIC_REMOTE_KEY_REQ = 12,
    /**
     * @generated from enum value: STATIC_REMOTE_KEY_OPT = 13;
     */
    STATIC_REMOTE_KEY_OPT = 13,
    /**
     * @generated from enum value: PAYMENT_ADDR_REQ = 14;
     */
    PAYMENT_ADDR_REQ = 14,
    /**
     * @generated from enum value: PAYMENT_ADDR_OPT = 15;
     */
    PAYMENT_ADDR_OPT = 15,
    /**
     * @generated from enum value: MPP_REQ = 16;
     */
    MPP_REQ = 16,
    /**
     * @generated from enum value: MPP_OPT = 17;
     */
    MPP_OPT = 17,
    /**
     * @generated from enum value: WUMBO_CHANNELS_REQ = 18;
     */
    WUMBO_CHANNELS_REQ = 18,
    /**
     * @generated from enum value: WUMBO_CHANNELS_OPT = 19;
     */
    WUMBO_CHANNELS_OPT = 19,
    /**
     * @generated from enum value: ANCHORS_REQ = 20;
     */
    ANCHORS_REQ = 20,
    /**
     * @generated from enum value: ANCHORS_OPT = 21;
     */
    ANCHORS_OPT = 21,
    /**
     * @generated from enum value: ANCHORS_ZERO_FEE_HTLC_REQ = 22;
     */
    ANCHORS_ZERO_FEE_HTLC_REQ = 22,
    /**
     * @generated from enum value: ANCHORS_ZERO_FEE_HTLC_OPT = 23;
     */
    ANCHORS_ZERO_FEE_HTLC_OPT = 23,
    /**
     * @generated from enum value: AMP_REQ = 30;
     */
    AMP_REQ = 30,
    /**
     * @generated from enum value: AMP_OPT = 31;
     */
    AMP_OPT = 31
}
/**
 * Describes the enum lnrpc.FeatureBit.
 */
export declare const FeatureBitSchema: GenEnum<FeatureBit>;
/**
 * @generated from enum lnrpc.UpdateFailure
 */
export declare enum UpdateFailure {
    /**
     * @generated from enum value: UPDATE_FAILURE_UNKNOWN = 0;
     */
    UNKNOWN = 0,
    /**
     * @generated from enum value: UPDATE_FAILURE_PENDING = 1;
     */
    PENDING = 1,
    /**
     * @generated from enum value: UPDATE_FAILURE_NOT_FOUND = 2;
     */
    NOT_FOUND = 2,
    /**
     * @generated from enum value: UPDATE_FAILURE_INTERNAL_ERR = 3;
     */
    INTERNAL_ERR = 3,
    /**
     * @generated from enum value: UPDATE_FAILURE_INVALID_PARAMETER = 4;
     */
    INVALID_PARAMETER = 4
}
/**
 * Describes the enum lnrpc.UpdateFailure.
 */
export declare const UpdateFailureSchema: GenEnum<UpdateFailure>;
/**
 * Lightning is the main RPC server of the daemon.
 *
 * @generated from service lnrpc.Lightning
 */
export declare const Lightning: GenService<{
    /**
     * lncli: `walletbalance`
     * WalletBalance returns total unspent outputs(confirmed and unconfirmed), all
     * confirmed unspent outputs and all unconfirmed unspent outputs under control
     * of the wallet.
     *
     * @generated from rpc lnrpc.Lightning.WalletBalance
     */
    walletBalance: {
        methodKind: "unary";
        input: typeof WalletBalanceRequestSchema;
        output: typeof WalletBalanceResponseSchema;
    };
    /**
     * lncli: `channelbalance`
     * ChannelBalance returns a report on the total funds across all open channels,
     * categorized in local/remote, pending local/remote and unsettled local/remote
     * balances.
     *
     * @generated from rpc lnrpc.Lightning.ChannelBalance
     */
    channelBalance: {
        methodKind: "unary";
        input: typeof ChannelBalanceRequestSchema;
        output: typeof ChannelBalanceResponseSchema;
    };
    /**
     * lncli: `listchaintxns`
     * GetTransactions returns a list describing all the known transactions
     * relevant to the wallet.
     *
     * @generated from rpc lnrpc.Lightning.GetTransactions
     */
    getTransactions: {
        methodKind: "unary";
        input: typeof GetTransactionsRequestSchema;
        output: typeof TransactionDetailsSchema;
    };
    /**
     * lncli: `estimatefee`
     * EstimateFee asks the chain backend to estimate the fee rate and total fees
     * for a transaction that pays to multiple specified outputs.
     *
     * When using REST, the `AddrToAmount` map type can be set by appending
     * `&AddrToAmount[<address>]=<amount_to_send>` to the URL. Unfortunately this
     * map type doesn't appear in the REST API documentation because of a bug in
     * the grpc-gateway library.
     *
     * @generated from rpc lnrpc.Lightning.EstimateFee
     */
    estimateFee: {
        methodKind: "unary";
        input: typeof EstimateFeeRequestSchema;
        output: typeof EstimateFeeResponseSchema;
    };
    /**
     * lncli: `sendcoins`
     * SendCoins executes a request to send coins to a particular address. Unlike
     * SendMany, this RPC call only allows creating a single output at a time. If
     * neither target_conf, or sat_per_vbyte are set, then the internal wallet will
     * consult its fee model to determine a fee for the default confirmation
     * target.
     *
     * @generated from rpc lnrpc.Lightning.SendCoins
     */
    sendCoins: {
        methodKind: "unary";
        input: typeof SendCoinsRequestSchema;
        output: typeof SendCoinsResponseSchema;
    };
    /**
     * lncli: `listunspent`
     * Deprecated, use walletrpc.ListUnspent instead.
     *
     * ListUnspent returns a list of all utxos spendable by the wallet with a
     * number of confirmations between the specified minimum and maximum.
     *
     * @generated from rpc lnrpc.Lightning.ListUnspent
     */
    listUnspent: {
        methodKind: "unary";
        input: typeof ListUnspentRequestSchema;
        output: typeof ListUnspentResponseSchema;
    };
    /**
     *
     * SubscribeTransactions creates a uni-directional stream from the server to
     * the client in which any newly discovered transactions relevant to the
     * wallet are sent over.
     *
     * @generated from rpc lnrpc.Lightning.SubscribeTransactions
     */
    subscribeTransactions: {
        methodKind: "server_streaming";
        input: typeof GetTransactionsRequestSchema;
        output: typeof TransactionSchema;
    };
    /**
     * lncli: `sendmany`
     * SendMany handles a request for a transaction that creates multiple specified
     * outputs in parallel. If neither target_conf, or sat_per_vbyte are set, then
     * the internal wallet will consult its fee model to determine a fee for the
     * default confirmation target.
     *
     * @generated from rpc lnrpc.Lightning.SendMany
     */
    sendMany: {
        methodKind: "unary";
        input: typeof SendManyRequestSchema;
        output: typeof SendManyResponseSchema;
    };
    /**
     * lncli: `newaddress`
     * NewAddress creates a new address under control of the local wallet.
     *
     * @generated from rpc lnrpc.Lightning.NewAddress
     */
    newAddress: {
        methodKind: "unary";
        input: typeof NewAddressRequestSchema;
        output: typeof NewAddressResponseSchema;
    };
    /**
     * lncli: `signmessage`
     * SignMessage signs a message with this node's private key. The returned
     * signature string is `zbase32` encoded and pubkey recoverable, meaning that
     * only the message digest and signature are needed for verification.
     *
     * @generated from rpc lnrpc.Lightning.SignMessage
     */
    signMessage: {
        methodKind: "unary";
        input: typeof SignMessageRequestSchema;
        output: typeof SignMessageResponseSchema;
    };
    /**
     * lncli: `verifymessage`
     * VerifyMessage verifies a signature over a message and recovers the signer's
     * public key. The signature is only deemed valid if the recovered public key
     * corresponds to a node key in the public Lightning network. The signature
     * must be zbase32 encoded and signed by an active node in the resident node's
     * channel database. In addition to returning the validity of the signature,
     * VerifyMessage also returns the recovered pubkey from the signature.
     *
     * @generated from rpc lnrpc.Lightning.VerifyMessage
     */
    verifyMessage: {
        methodKind: "unary";
        input: typeof VerifyMessageRequestSchema;
        output: typeof VerifyMessageResponseSchema;
    };
    /**
     * lncli: `connect`
     * ConnectPeer attempts to establish a connection to a remote peer. This is at
     * the networking level, and is used for communication between nodes. This is
     * distinct from establishing a channel with a peer.
     *
     * @generated from rpc lnrpc.Lightning.ConnectPeer
     */
    connectPeer: {
        methodKind: "unary";
        input: typeof ConnectPeerRequestSchema;
        output: typeof ConnectPeerResponseSchema;
    };
    /**
     * lncli: `disconnect`
     * DisconnectPeer attempts to disconnect one peer from another identified by a
     * given pubKey. In the case that we currently have a pending or active channel
     * with the target peer, then this action will be not be allowed.
     *
     * @generated from rpc lnrpc.Lightning.DisconnectPeer
     */
    disconnectPeer: {
        methodKind: "unary";
        input: typeof DisconnectPeerRequestSchema;
        output: typeof DisconnectPeerResponseSchema;
    };
    /**
     * lncli: `listpeers`
     * ListPeers returns a verbose listing of all currently active peers.
     *
     * @generated from rpc lnrpc.Lightning.ListPeers
     */
    listPeers: {
        methodKind: "unary";
        input: typeof ListPeersRequestSchema;
        output: typeof ListPeersResponseSchema;
    };
    /**
     *
     * SubscribePeerEvents creates a uni-directional stream from the server to
     * the client in which any events relevant to the state of peers are sent
     * over. Events include peers going online and offline.
     *
     * @generated from rpc lnrpc.Lightning.SubscribePeerEvents
     */
    subscribePeerEvents: {
        methodKind: "server_streaming";
        input: typeof PeerEventSubscriptionSchema;
        output: typeof PeerEventSchema;
    };
    /**
     * lncli: `getinfo`
     * GetInfo returns general information concerning the lightning node including
     * it's identity pubkey, alias, the chains it is connected to, and information
     * concerning the number of open+pending channels.
     *
     * @generated from rpc lnrpc.Lightning.GetInfo
     */
    getInfo: {
        methodKind: "unary";
        input: typeof GetInfoRequestSchema;
        output: typeof GetInfoResponseSchema;
    };
    /**
     * * lncli: `getrecoveryinfo`
     * GetRecoveryInfo returns information concerning the recovery mode including
     * whether it's in a recovery mode, whether the recovery is finished, and the
     * progress made so far.
     *
     * @generated from rpc lnrpc.Lightning.GetRecoveryInfo
     */
    getRecoveryInfo: {
        methodKind: "unary";
        input: typeof GetRecoveryInfoRequestSchema;
        output: typeof GetRecoveryInfoResponseSchema;
    };
    /**
     * lncli: `pendingchannels`
     * PendingChannels returns a list of all the channels that are currently
     * considered "pending". A channel is pending if it has finished the funding
     * workflow and is waiting for confirmations for the funding txn, or is in the
     * process of closure, either initiated cooperatively or non-cooperatively.
     *
     * @generated from rpc lnrpc.Lightning.PendingChannels
     */
    pendingChannels: {
        methodKind: "unary";
        input: typeof PendingChannelsRequestSchema;
        output: typeof PendingChannelsResponseSchema;
    };
    /**
     * lncli: `listchannels`
     * ListChannels returns a description of all the open channels that this node
     * is a participant in.
     *
     * @generated from rpc lnrpc.Lightning.ListChannels
     */
    listChannels: {
        methodKind: "unary";
        input: typeof ListChannelsRequestSchema;
        output: typeof ListChannelsResponseSchema;
    };
    /**
     *
     * SubscribeChannelEvents creates a uni-directional stream from the server to
     * the client in which any updates relevant to the state of the channels are
     * sent over. Events include new active channels, inactive channels, and closed
     * channels.
     *
     * @generated from rpc lnrpc.Lightning.SubscribeChannelEvents
     */
    subscribeChannelEvents: {
        methodKind: "server_streaming";
        input: typeof ChannelEventSubscriptionSchema;
        output: typeof ChannelEventUpdateSchema;
    };
    /**
     * lncli: `closedchannels`
     * ClosedChannels returns a description of all the closed channels that
     * this node was a participant in.
     *
     * @generated from rpc lnrpc.Lightning.ClosedChannels
     */
    closedChannels: {
        methodKind: "unary";
        input: typeof ClosedChannelsRequestSchema;
        output: typeof ClosedChannelsResponseSchema;
    };
    /**
     *
     * OpenChannelSync is a synchronous version of the OpenChannel RPC call. This
     * call is meant to be consumed by clients to the REST proxy. As with all
     * other sync calls, all byte slices are intended to be populated as hex
     * encoded strings.
     *
     * @generated from rpc lnrpc.Lightning.OpenChannelSync
     */
    openChannelSync: {
        methodKind: "unary";
        input: typeof OpenChannelRequestSchema;
        output: typeof ChannelPointSchema;
    };
    /**
     * lncli: `openchannel`
     * OpenChannel attempts to open a singly funded channel specified in the
     * request to a remote peer. Users are able to specify a target number of
     * blocks that the funding transaction should be confirmed in, or a manual fee
     * rate to us for the funding transaction. If neither are specified, then a
     * lax block confirmation target is used. Each OpenStatusUpdate will return
     * the pending channel ID of the in-progress channel. Depending on the
     * arguments specified in the OpenChannelRequest, this pending channel ID can
     * then be used to manually progress the channel funding flow.
     *
     * @generated from rpc lnrpc.Lightning.OpenChannel
     */
    openChannel: {
        methodKind: "server_streaming";
        input: typeof OpenChannelRequestSchema;
        output: typeof OpenStatusUpdateSchema;
    };
    /**
     * lncli: `batchopenchannel`
     * BatchOpenChannel attempts to open multiple single-funded channels in a
     * single transaction in an atomic way. This means either all channel open
     * requests succeed at once or all attempts are aborted if any of them fail.
     * This is the safer variant of using PSBTs to manually fund a batch of
     * channels through the OpenChannel RPC.
     *
     * @generated from rpc lnrpc.Lightning.BatchOpenChannel
     */
    batchOpenChannel: {
        methodKind: "unary";
        input: typeof BatchOpenChannelRequestSchema;
        output: typeof BatchOpenChannelResponseSchema;
    };
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
     * @generated from rpc lnrpc.Lightning.FundingStateStep
     */
    fundingStateStep: {
        methodKind: "unary";
        input: typeof FundingTransitionMsgSchema;
        output: typeof FundingStateStepRespSchema;
    };
    /**
     *
     * ChannelAcceptor dispatches a bi-directional streaming RPC in which
     * OpenChannel requests are sent to the client and the client responds with
     * a boolean that tells LND whether or not to accept the channel. This allows
     * node operators to specify their own criteria for accepting inbound channels
     * through a single persistent connection.
     *
     * @generated from rpc lnrpc.Lightning.ChannelAcceptor
     */
    channelAcceptor: {
        methodKind: "bidi_streaming";
        input: typeof ChannelAcceptResponseSchema;
        output: typeof ChannelAcceptRequestSchema;
    };
    /**
     * lncli: `closechannel`
     * CloseChannel attempts to close an active channel identified by its channel
     * outpoint (ChannelPoint). The actions of this method can additionally be
     * augmented to attempt a force close after a timeout period in the case of an
     * inactive peer. If a non-force close (cooperative closure) is requested,
     * then the user can specify either a target number of blocks until the
     * closure transaction is confirmed, or a manual fee rate. If neither are
     * specified, then a default lax, block confirmation target is used.
     *
     * @generated from rpc lnrpc.Lightning.CloseChannel
     */
    closeChannel: {
        methodKind: "server_streaming";
        input: typeof CloseChannelRequestSchema;
        output: typeof CloseStatusUpdateSchema;
    };
    /**
     * lncli: `abandonchannel`
     * AbandonChannel removes all channel state from the database except for a
     * close summary. This method can be used to get rid of permanently unusable
     * channels due to bugs fixed in newer versions of lnd. This method can also be
     * used to remove externally funded channels where the funding transaction was
     * never broadcast. Only available for non-externally funded channels in dev
     * build.
     *
     * @generated from rpc lnrpc.Lightning.AbandonChannel
     */
    abandonChannel: {
        methodKind: "unary";
        input: typeof AbandonChannelRequestSchema;
        output: typeof AbandonChannelResponseSchema;
    };
    /**
     * lncli: `sendpayment`
     * Deprecated, use routerrpc.SendPaymentV2. SendPayment dispatches a
     * bi-directional streaming RPC for sending payments through the Lightning
     * Network. A single RPC invocation creates a persistent bi-directional
     * stream allowing clients to rapidly send payments through the Lightning
     * Network with a single persistent connection.
     *
     * @generated from rpc lnrpc.Lightning.SendPayment
     * @deprecated
     */
    sendPayment: {
        methodKind: "bidi_streaming";
        input: typeof SendRequestSchema;
        output: typeof SendResponseSchema;
    };
    /**
     *
     * SendPaymentSync is the synchronous non-streaming version of SendPayment.
     * This RPC is intended to be consumed by clients of the REST proxy.
     * Additionally, this RPC expects the destination's public key and the payment
     * hash (if any) to be encoded as hex strings.
     *
     * @generated from rpc lnrpc.Lightning.SendPaymentSync
     */
    sendPaymentSync: {
        methodKind: "unary";
        input: typeof SendRequestSchema;
        output: typeof SendResponseSchema;
    };
    /**
     * lncli: `sendtoroute`
     * Deprecated, use routerrpc.SendToRouteV2. SendToRoute is a bi-directional
     * streaming RPC for sending payment through the Lightning Network. This
     * method differs from SendPayment in that it allows users to specify a full
     * route manually. This can be used for things like rebalancing, and atomic
     * swaps.
     *
     * @generated from rpc lnrpc.Lightning.SendToRoute
     * @deprecated
     */
    sendToRoute: {
        methodKind: "bidi_streaming";
        input: typeof SendToRouteRequestSchema;
        output: typeof SendResponseSchema;
    };
    /**
     *
     * SendToRouteSync is a synchronous version of SendToRoute. It Will block
     * until the payment either fails or succeeds.
     *
     * @generated from rpc lnrpc.Lightning.SendToRouteSync
     */
    sendToRouteSync: {
        methodKind: "unary";
        input: typeof SendToRouteRequestSchema;
        output: typeof SendResponseSchema;
    };
    /**
     * lncli: `addinvoice`
     * AddInvoice attempts to add a new invoice to the invoice database. Any
     * duplicated invoices are rejected, therefore all invoices *must* have a
     * unique payment preimage.
     *
     * @generated from rpc lnrpc.Lightning.AddInvoice
     */
    addInvoice: {
        methodKind: "unary";
        input: typeof InvoiceSchema;
        output: typeof AddInvoiceResponseSchema;
    };
    /**
     * lncli: `listinvoices`
     * ListInvoices returns a list of all the invoices currently stored within the
     * database. Any active debug invoices are ignored. It has full support for
     * paginated responses, allowing users to query for specific invoices through
     * their add_index. This can be done by using either the first_index_offset or
     * last_index_offset fields included in the response as the index_offset of the
     * next request. By default, the first 100 invoices created will be returned.
     * Backwards pagination is also supported through the Reversed flag.
     *
     * @generated from rpc lnrpc.Lightning.ListInvoices
     */
    listInvoices: {
        methodKind: "unary";
        input: typeof ListInvoiceRequestSchema;
        output: typeof ListInvoiceResponseSchema;
    };
    /**
     * lncli: `lookupinvoice`
     * LookupInvoice attempts to look up an invoice according to its payment hash.
     * The passed payment hash *must* be exactly 32 bytes, if not, an error is
     * returned.
     *
     * @generated from rpc lnrpc.Lightning.LookupInvoice
     */
    lookupInvoice: {
        methodKind: "unary";
        input: typeof PaymentHashSchema;
        output: typeof InvoiceSchema;
    };
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
     * @generated from rpc lnrpc.Lightning.SubscribeInvoices
     */
    subscribeInvoices: {
        methodKind: "server_streaming";
        input: typeof InvoiceSubscriptionSchema;
        output: typeof InvoiceSchema;
    };
    /**
     * lncli: `decodepayreq`
     * DecodePayReq takes an encoded payment request string and attempts to decode
     * it, returning a full description of the conditions encoded within the
     * payment request.
     *
     * @generated from rpc lnrpc.Lightning.DecodePayReq
     */
    decodePayReq: {
        methodKind: "unary";
        input: typeof PayReqStringSchema;
        output: typeof PayReqSchema;
    };
    /**
     * lncli: `listpayments`
     * ListPayments returns a list of all outgoing payments.
     *
     * @generated from rpc lnrpc.Lightning.ListPayments
     */
    listPayments: {
        methodKind: "unary";
        input: typeof ListPaymentsRequestSchema;
        output: typeof ListPaymentsResponseSchema;
    };
    /**
     *
     * DeletePayment deletes an outgoing payment from DB. Note that it will not
     * attempt to delete an In-Flight payment, since that would be unsafe.
     *
     * @generated from rpc lnrpc.Lightning.DeletePayment
     */
    deletePayment: {
        methodKind: "unary";
        input: typeof DeletePaymentRequestSchema;
        output: typeof DeletePaymentResponseSchema;
    };
    /**
     *
     * DeleteAllPayments deletes all outgoing payments from DB. Note that it will
     * not attempt to delete In-Flight payments, since that would be unsafe.
     *
     * @generated from rpc lnrpc.Lightning.DeleteAllPayments
     */
    deleteAllPayments: {
        methodKind: "unary";
        input: typeof DeleteAllPaymentsRequestSchema;
        output: typeof DeleteAllPaymentsResponseSchema;
    };
    /**
     * lncli: `describegraph`
     * DescribeGraph returns a description of the latest graph state from the
     * point of view of the node. The graph information is partitioned into two
     * components: all the nodes/vertexes, and all the edges that connect the
     * vertexes themselves. As this is a directed graph, the edges also contain
     * the node directional specific routing policy which includes: the time lock
     * delta, fee information, etc.
     *
     * @generated from rpc lnrpc.Lightning.DescribeGraph
     */
    describeGraph: {
        methodKind: "unary";
        input: typeof ChannelGraphRequestSchema;
        output: typeof ChannelGraphSchema;
    };
    /**
     * lncli: `getnodemetrics`
     * GetNodeMetrics returns node metrics calculated from the graph. Currently
     * the only supported metric is betweenness centrality of individual nodes.
     *
     * @generated from rpc lnrpc.Lightning.GetNodeMetrics
     */
    getNodeMetrics: {
        methodKind: "unary";
        input: typeof NodeMetricsRequestSchema;
        output: typeof NodeMetricsResponseSchema;
    };
    /**
     * lncli: `getchaninfo`
     * GetChanInfo returns the latest authenticated network announcement for the
     * given channel identified by its channel ID: an 8-byte integer which
     * uniquely identifies the location of transaction's funding output within the
     * blockchain.
     *
     * @generated from rpc lnrpc.Lightning.GetChanInfo
     */
    getChanInfo: {
        methodKind: "unary";
        input: typeof ChanInfoRequestSchema;
        output: typeof ChannelEdgeSchema;
    };
    /**
     * lncli: `getnodeinfo`
     * GetNodeInfo returns the latest advertised, aggregated, and authenticated
     * channel information for the specified node identified by its public key.
     *
     * @generated from rpc lnrpc.Lightning.GetNodeInfo
     */
    getNodeInfo: {
        methodKind: "unary";
        input: typeof NodeInfoRequestSchema;
        output: typeof NodeInfoSchema;
    };
    /**
     * lncli: `queryroutes`
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
     * @generated from rpc lnrpc.Lightning.QueryRoutes
     */
    queryRoutes: {
        methodKind: "unary";
        input: typeof QueryRoutesRequestSchema;
        output: typeof QueryRoutesResponseSchema;
    };
    /**
     * lncli: `getnetworkinfo`
     * GetNetworkInfo returns some basic stats about the known channel graph from
     * the point of view of the node.
     *
     * @generated from rpc lnrpc.Lightning.GetNetworkInfo
     */
    getNetworkInfo: {
        methodKind: "unary";
        input: typeof NetworkInfoRequestSchema;
        output: typeof NetworkInfoSchema;
    };
    /**
     * lncli: `stop`
     * StopDaemon will send a shutdown request to the interrupt handler, triggering
     * a graceful shutdown of the daemon.
     *
     * @generated from rpc lnrpc.Lightning.StopDaemon
     */
    stopDaemon: {
        methodKind: "unary";
        input: typeof StopRequestSchema;
        output: typeof StopResponseSchema;
    };
    /**
     *
     * SubscribeChannelGraph launches a streaming RPC that allows the caller to
     * receive notifications upon any changes to the channel graph topology from
     * the point of view of the responding node. Events notified include: new
     * nodes coming online, nodes updating their authenticated attributes, new
     * channels being advertised, updates in the routing policy for a directional
     * channel edge, and when channels are closed on-chain.
     *
     * @generated from rpc lnrpc.Lightning.SubscribeChannelGraph
     */
    subscribeChannelGraph: {
        methodKind: "server_streaming";
        input: typeof GraphTopologySubscriptionSchema;
        output: typeof GraphTopologyUpdateSchema;
    };
    /**
     * lncli: `debuglevel`
     * DebugLevel allows a caller to programmatically set the logging verbosity of
     * lnd. The logging can be targeted according to a coarse daemon-wide logging
     * level, or in a granular fashion to specify the logging for a target
     * sub-system.
     *
     * @generated from rpc lnrpc.Lightning.DebugLevel
     */
    debugLevel: {
        methodKind: "unary";
        input: typeof DebugLevelRequestSchema;
        output: typeof DebugLevelResponseSchema;
    };
    /**
     * lncli: `feereport`
     * FeeReport allows the caller to obtain a report detailing the current fee
     * schedule enforced by the node globally for each channel.
     *
     * @generated from rpc lnrpc.Lightning.FeeReport
     */
    feeReport: {
        methodKind: "unary";
        input: typeof FeeReportRequestSchema;
        output: typeof FeeReportResponseSchema;
    };
    /**
     * lncli: `updatechanpolicy`
     * UpdateChannelPolicy allows the caller to update the fee schedule and
     * channel policies for all channels globally, or a particular channel.
     *
     * @generated from rpc lnrpc.Lightning.UpdateChannelPolicy
     */
    updateChannelPolicy: {
        methodKind: "unary";
        input: typeof PolicyUpdateRequestSchema;
        output: typeof PolicyUpdateResponseSchema;
    };
    /**
     * lncli: `fwdinghistory`
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
     * @generated from rpc lnrpc.Lightning.ForwardingHistory
     */
    forwardingHistory: {
        methodKind: "unary";
        input: typeof ForwardingHistoryRequestSchema;
        output: typeof ForwardingHistoryResponseSchema;
    };
    /**
     * lncli: `exportchanbackup`
     * ExportChannelBackup attempts to return an encrypted static channel backup
     * for the target channel identified by it channel point. The backup is
     * encrypted with a key generated from the aezeed seed of the user. The
     * returned backup can either be restored using the RestoreChannelBackup
     * method once lnd is running, or via the InitWallet and UnlockWallet methods
     * from the WalletUnlocker service.
     *
     * @generated from rpc lnrpc.Lightning.ExportChannelBackup
     */
    exportChannelBackup: {
        methodKind: "unary";
        input: typeof ExportChannelBackupRequestSchema;
        output: typeof ChannelBackupSchema;
    };
    /**
     *
     * ExportAllChannelBackups returns static channel backups for all existing
     * channels known to lnd. A set of regular singular static channel backups for
     * each channel are returned. Additionally, a multi-channel backup is returned
     * as well, which contains a single encrypted blob containing the backups of
     * each channel.
     *
     * @generated from rpc lnrpc.Lightning.ExportAllChannelBackups
     */
    exportAllChannelBackups: {
        methodKind: "unary";
        input: typeof ChanBackupExportRequestSchema;
        output: typeof ChanBackupSnapshotSchema;
    };
    /**
     *
     * VerifyChanBackup allows a caller to verify the integrity of a channel backup
     * snapshot. This method will accept either a packed Single or a packed Multi.
     * Specifying both will result in an error.
     *
     * @generated from rpc lnrpc.Lightning.VerifyChanBackup
     */
    verifyChanBackup: {
        methodKind: "unary";
        input: typeof ChanBackupSnapshotSchema;
        output: typeof VerifyChanBackupResponseSchema;
    };
    /**
     * lncli: `restorechanbackup`
     * RestoreChannelBackups accepts a set of singular channel backups, or a
     * single encrypted multi-chan backup and attempts to recover any funds
     * remaining within the channel. If we are able to unpack the backup, then the
     * new channel will be shown under listchannels, as well as pending channels.
     *
     * @generated from rpc lnrpc.Lightning.RestoreChannelBackups
     */
    restoreChannelBackups: {
        methodKind: "unary";
        input: typeof RestoreChanBackupRequestSchema;
        output: typeof RestoreBackupResponseSchema;
    };
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
     * @generated from rpc lnrpc.Lightning.SubscribeChannelBackups
     */
    subscribeChannelBackups: {
        methodKind: "server_streaming";
        input: typeof ChannelBackupSubscriptionSchema;
        output: typeof ChanBackupSnapshotSchema;
    };
    /**
     * lncli: `bakemacaroon`
     * BakeMacaroon allows the creation of a new macaroon with custom read and
     * write permissions. No first-party caveats are added since this can be done
     * offline.
     *
     * @generated from rpc lnrpc.Lightning.BakeMacaroon
     */
    bakeMacaroon: {
        methodKind: "unary";
        input: typeof BakeMacaroonRequestSchema;
        output: typeof BakeMacaroonResponseSchema;
    };
    /**
     * lncli: `listmacaroonids`
     * ListMacaroonIDs returns all root key IDs that are in use.
     *
     * @generated from rpc lnrpc.Lightning.ListMacaroonIDs
     */
    listMacaroonIDs: {
        methodKind: "unary";
        input: typeof ListMacaroonIDsRequestSchema;
        output: typeof ListMacaroonIDsResponseSchema;
    };
    /**
     * lncli: `deletemacaroonid`
     * DeleteMacaroonID deletes the specified macaroon ID and invalidates all
     * macaroons derived from that ID.
     *
     * @generated from rpc lnrpc.Lightning.DeleteMacaroonID
     */
    deleteMacaroonID: {
        methodKind: "unary";
        input: typeof DeleteMacaroonIDRequestSchema;
        output: typeof DeleteMacaroonIDResponseSchema;
    };
    /**
     * lncli: `listpermissions`
     * ListPermissions lists all RPC method URIs and their required macaroon
     * permissions to access them.
     *
     * @generated from rpc lnrpc.Lightning.ListPermissions
     */
    listPermissions: {
        methodKind: "unary";
        input: typeof ListPermissionsRequestSchema;
        output: typeof ListPermissionsResponseSchema;
    };
    /**
     *
     * CheckMacaroonPermissions checks whether a request follows the constraints
     * imposed on the macaroon and that the macaroon is authorized to follow the
     * provided permissions.
     *
     * @generated from rpc lnrpc.Lightning.CheckMacaroonPermissions
     */
    checkMacaroonPermissions: {
        methodKind: "unary";
        input: typeof CheckMacPermRequestSchema;
        output: typeof CheckMacPermResponseSchema;
    };
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
     * @generated from rpc lnrpc.Lightning.RegisterRPCMiddleware
     */
    registerRPCMiddleware: {
        methodKind: "bidi_streaming";
        input: typeof RPCMiddlewareResponseSchema;
        output: typeof RPCMiddlewareRequestSchema;
    };
    /**
     * lncli: `sendcustom`
     * SendCustomMessage sends a custom peer message.
     *
     * @generated from rpc lnrpc.Lightning.SendCustomMessage
     */
    sendCustomMessage: {
        methodKind: "unary";
        input: typeof SendCustomMessageRequestSchema;
        output: typeof SendCustomMessageResponseSchema;
    };
    /**
     * lncli: `subscribecustom`
     * SubscribeCustomMessages subscribes to a stream of incoming custom peer
     * messages.
     *
     * To include messages with type outside of the custom range (>= 32768) lnd
     * needs to be compiled with  the `dev` build tag, and the message type to
     * override should be specified in lnd's experimental protocol configuration.
     *
     * @generated from rpc lnrpc.Lightning.SubscribeCustomMessages
     */
    subscribeCustomMessages: {
        methodKind: "server_streaming";
        input: typeof SubscribeCustomMessagesRequestSchema;
        output: typeof CustomMessageSchema;
    };
    /**
     * lncli: `listaliases`
     * ListAliases returns the set of all aliases that have ever existed with
     * their confirmed SCID (if it exists) and/or the base SCID (in the case of
     * zero conf).
     *
     * @generated from rpc lnrpc.Lightning.ListAliases
     */
    listAliases: {
        methodKind: "unary";
        input: typeof ListAliasesRequestSchema;
        output: typeof ListAliasesResponseSchema;
    };
    /**
     *
     * LookupHtlcResolution retrieves a final htlc resolution from the database.
     * If the htlc has no final resolution yet, a NotFound grpc status code is
     * returned.
     *
     * @generated from rpc lnrpc.Lightning.LookupHtlcResolution
     */
    lookupHtlcResolution: {
        methodKind: "unary";
        input: typeof LookupHtlcResolutionRequestSchema;
        output: typeof LookupHtlcResolutionResponseSchema;
    };
}>;
export declare const file_walletunlocker: GenFile;
/**
 * @generated from message lnrpc.GenSeedRequest
 */
export type GenSeedRequest = Message<"lnrpc.GenSeedRequest"> & {
    /**
     *
     * aezeed_passphrase is an optional user provided passphrase that will be used
     * to encrypt the generated aezeed cipher seed. When using REST, this field
     * must be encoded as base64.
     *
     * @generated from field: bytes aezeed_passphrase = 1;
     */
    aezeedPassphrase: Uint8Array;
    /**
     *
     * seed_entropy is an optional 16-bytes generated via CSPRNG. If not
     * specified, then a fresh set of randomness will be used to create the seed.
     * When using REST, this field must be encoded as base64.
     *
     * @generated from field: bytes seed_entropy = 2;
     */
    seedEntropy: Uint8Array;
};
/**
 * Describes the message lnrpc.GenSeedRequest.
 * Use `create(GenSeedRequestSchema)` to create a new message.
 */
export declare const GenSeedRequestSchema: GenMessage<GenSeedRequest>;
/**
 * @generated from message lnrpc.GenSeedResponse
 */
export type GenSeedResponse = Message<"lnrpc.GenSeedResponse"> & {
    /**
     *
     * cipher_seed_mnemonic is a 24-word mnemonic that encodes a prior aezeed
     * cipher seed obtained by the user. This field is optional, as if not
     * provided, then the daemon will generate a new cipher seed for the user.
     * Otherwise, then the daemon will attempt to recover the wallet state linked
     * to this cipher seed.
     *
     * @generated from field: repeated string cipher_seed_mnemonic = 1;
     */
    cipherSeedMnemonic: string[];
    /**
     *
     * enciphered_seed are the raw aezeed cipher seed bytes. This is the raw
     * cipher text before run through our mnemonic encoding scheme.
     *
     * @generated from field: bytes enciphered_seed = 2;
     */
    encipheredSeed: Uint8Array;
};
/**
 * Describes the message lnrpc.GenSeedResponse.
 * Use `create(GenSeedResponseSchema)` to create a new message.
 */
export declare const GenSeedResponseSchema: GenMessage<GenSeedResponse>;
/**
 * @generated from message lnrpc.InitWalletRequest
 */
export type InitWalletRequest = Message<"lnrpc.InitWalletRequest"> & {
    /**
     *
     * wallet_password is the passphrase that should be used to encrypt the
     * wallet. This MUST be at least 8 chars in length. After creation, this
     * password is required to unlock the daemon. When using REST, this field
     * must be encoded as base64.
     *
     * @generated from field: bytes wallet_password = 1;
     */
    walletPassword: Uint8Array;
    /**
     *
     * cipher_seed_mnemonic is a 24-word mnemonic that encodes a prior aezeed
     * cipher seed obtained by the user. This may have been generated by the
     * GenSeed method, or be an existing seed.
     *
     * @generated from field: repeated string cipher_seed_mnemonic = 2;
     */
    cipherSeedMnemonic: string[];
    /**
     *
     * aezeed_passphrase is an optional user provided passphrase that will be used
     * to encrypt the generated aezeed cipher seed. When using REST, this field
     * must be encoded as base64.
     *
     * @generated from field: bytes aezeed_passphrase = 3;
     */
    aezeedPassphrase: Uint8Array;
    /**
     *
     * recovery_window is an optional argument specifying the address lookahead
     * when restoring a wallet seed. The recovery window applies to each
     * individual branch of the BIP44 derivation paths. Supplying a recovery
     * window of zero indicates that no addresses should be recovered, such after
     * the first initialization of the wallet.
     *
     * @generated from field: int32 recovery_window = 4;
     */
    recoveryWindow: number;
    /**
     *
     * channel_backups is an optional argument that allows clients to recover the
     * settled funds within a set of channels. This should be populated if the
     * user was unable to close out all channels and sweep funds before partial or
     * total data loss occurred. If specified, then after on-chain recovery of
     * funds, lnd begin to carry out the data loss recovery protocol in order to
     * recover the funds in each channel from a remote force closed transaction.
     *
     * @generated from field: lnrpc.ChanBackupSnapshot channel_backups = 5;
     */
    channelBackups?: ChanBackupSnapshot;
    /**
     *
     * stateless_init is an optional argument instructing the daemon NOT to create
     * any *.macaroon files in its filesystem. If this parameter is set, then the
     * admin macaroon returned in the response MUST be stored by the caller of the
     * RPC as otherwise all access to the daemon will be lost!
     *
     * @generated from field: bool stateless_init = 6;
     */
    statelessInit: boolean;
    /**
     *
     * extended_master_key is an alternative to specifying cipher_seed_mnemonic and
     * aezeed_passphrase. Instead of deriving the master root key from the entropy
     * of an aezeed cipher seed, the given extended master root key is used
     * directly as the wallet's master key. This allows users to import/use a
     * master key from another wallet. When doing so, lnd still uses its default
     * SegWit only (BIP49/84) derivation paths and funds from custom/non-default
     * derivation paths will not automatically appear in the on-chain wallet. Using
     * an 'xprv' instead of an aezeed also has the disadvantage that the wallet's
     * birthday is not known as that is an information that's only encoded in the
     * aezeed, not the xprv. Therefore a birthday needs to be specified in
     * extended_master_key_birthday_timestamp or a "safe" default value will be
     * used.
     *
     * @generated from field: string extended_master_key = 7;
     */
    extendedMasterKey: string;
    /**
     *
     * extended_master_key_birthday_timestamp is the optional unix timestamp in
     * seconds to use as the wallet's birthday when using an extended master key
     * to restore the wallet. lnd will only start scanning for funds in blocks that
     * are after the birthday which can speed up the process significantly. If the
     * birthday is not known, this should be left at its default value of 0 in
     * which case lnd will start scanning from the first SegWit block (481824 on
     * mainnet).
     *
     * @generated from field: uint64 extended_master_key_birthday_timestamp = 8;
     */
    extendedMasterKeyBirthdayTimestamp: bigint;
    /**
     *
     * watch_only is the third option of initializing a wallet: by importing
     * account xpubs only and therefore creating a watch-only wallet that does not
     * contain any private keys. That means the wallet won't be able to sign for
     * any of the keys and _needs_ to be run with a remote signer that has the
     * corresponding private keys and can serve signing RPC requests.
     *
     * @generated from field: lnrpc.WatchOnly watch_only = 9;
     */
    watchOnly?: WatchOnly;
    /**
     *
     * macaroon_root_key is an optional 32 byte macaroon root key that can be
     * provided when initializing the wallet rather than letting lnd generate one
     * on its own.
     *
     * @generated from field: bytes macaroon_root_key = 10;
     */
    macaroonRootKey: Uint8Array;
};
/**
 * Describes the message lnrpc.InitWalletRequest.
 * Use `create(InitWalletRequestSchema)` to create a new message.
 */
export declare const InitWalletRequestSchema: GenMessage<InitWalletRequest>;
/**
 * @generated from message lnrpc.InitWalletResponse
 */
export type InitWalletResponse = Message<"lnrpc.InitWalletResponse"> & {
    /**
     *
     * The binary serialized admin macaroon that can be used to access the daemon
     * after creating the wallet. If the stateless_init parameter was set to true,
     * this is the ONLY copy of the macaroon and MUST be stored safely by the
     * caller. Otherwise a copy of this macaroon is also persisted on disk by the
     * daemon, together with other macaroon files.
     *
     * @generated from field: bytes admin_macaroon = 1;
     */
    adminMacaroon: Uint8Array;
};
/**
 * Describes the message lnrpc.InitWalletResponse.
 * Use `create(InitWalletResponseSchema)` to create a new message.
 */
export declare const InitWalletResponseSchema: GenMessage<InitWalletResponse>;
/**
 * @generated from message lnrpc.WatchOnly
 */
export type WatchOnly = Message<"lnrpc.WatchOnly"> & {
    /**
     *
     * The unix timestamp in seconds of when the master key was created. lnd will
     * only start scanning for funds in blocks that are after the birthday which
     * can speed up the process significantly. If the birthday is not known, this
     * should be left at its default value of 0 in which case lnd will start
     * scanning from the first SegWit block (481824 on mainnet).
     *
     * @generated from field: uint64 master_key_birthday_timestamp = 1;
     */
    masterKeyBirthdayTimestamp: bigint;
    /**
     *
     * The fingerprint of the root key (also known as the key with derivation path
     * m/) from which the account public keys were derived from. This may be
     * required by some hardware wallets for proper identification and signing. The
     * bytes must be in big-endian order.
     *
     * @generated from field: bytes master_key_fingerprint = 2;
     */
    masterKeyFingerprint: Uint8Array;
    /**
     *
     * The list of accounts to import. There _must_ be an account for all of lnd's
     * main key scopes: BIP49/BIP84 (m/49'/0'/0', m/84'/0'/0', note that the
     * coin type is always 0, even for testnet/regtest) and lnd's internal key
     * scope (m/1017'/<coin_type>'/<account>'), where account is the key family as
     * defined in `keychain/derivation.go` (currently indices 0 to 9).
     *
     * @generated from field: repeated lnrpc.WatchOnlyAccount accounts = 3;
     */
    accounts: WatchOnlyAccount[];
};
/**
 * Describes the message lnrpc.WatchOnly.
 * Use `create(WatchOnlySchema)` to create a new message.
 */
export declare const WatchOnlySchema: GenMessage<WatchOnly>;
/**
 * @generated from message lnrpc.WatchOnlyAccount
 */
export type WatchOnlyAccount = Message<"lnrpc.WatchOnlyAccount"> & {
    /**
     *
     * Purpose is the first number in the derivation path, must be either 49, 84
     * or 1017.
     *
     * @generated from field: uint32 purpose = 1;
     */
    purpose: number;
    /**
     *
     * Coin type is the second number in the derivation path, this is _always_ 0
     * for purposes 49 and 84. It only needs to be set to 1 for purpose 1017 on
     * testnet or regtest.
     *
     * @generated from field: uint32 coin_type = 2;
     */
    coinType: number;
    /**
     *
     * Account is the third number in the derivation path. For purposes 49 and 84
     * at least the default account (index 0) needs to be created but optional
     * additional accounts are allowed. For purpose 1017 there needs to be exactly
     * one account for each of the key families defined in `keychain/derivation.go`
     * (currently indices 0 to 9)
     *
     * @generated from field: uint32 account = 3;
     */
    account: number;
    /**
     *
     * The extended public key at depth 3 for the given account.
     *
     * @generated from field: string xpub = 4;
     */
    xpub: string;
};
/**
 * Describes the message lnrpc.WatchOnlyAccount.
 * Use `create(WatchOnlyAccountSchema)` to create a new message.
 */
export declare const WatchOnlyAccountSchema: GenMessage<WatchOnlyAccount>;
/**
 * @generated from message lnrpc.UnlockWalletRequest
 */
export type UnlockWalletRequest = Message<"lnrpc.UnlockWalletRequest"> & {
    /**
     *
     * wallet_password should be the current valid passphrase for the daemon. This
     * will be required to decrypt on-disk material that the daemon requires to
     * function properly. When using REST, this field must be encoded as base64.
     *
     * @generated from field: bytes wallet_password = 1;
     */
    walletPassword: Uint8Array;
    /**
     *
     * recovery_window is an optional argument specifying the address lookahead
     * when restoring a wallet seed. The recovery window applies to each
     * individual branch of the BIP44 derivation paths. Supplying a recovery
     * window of zero indicates that no addresses should be recovered, such after
     * the first initialization of the wallet.
     *
     * @generated from field: int32 recovery_window = 2;
     */
    recoveryWindow: number;
    /**
     *
     * channel_backups is an optional argument that allows clients to recover the
     * settled funds within a set of channels. This should be populated if the
     * user was unable to close out all channels and sweep funds before partial or
     * total data loss occurred. If specified, then after on-chain recovery of
     * funds, lnd begin to carry out the data loss recovery protocol in order to
     * recover the funds in each channel from a remote force closed transaction.
     *
     * @generated from field: lnrpc.ChanBackupSnapshot channel_backups = 3;
     */
    channelBackups?: ChanBackupSnapshot;
    /**
     *
     * stateless_init is an optional argument instructing the daemon NOT to create
     * any *.macaroon files in its file system.
     *
     * @generated from field: bool stateless_init = 4;
     */
    statelessInit: boolean;
};
/**
 * Describes the message lnrpc.UnlockWalletRequest.
 * Use `create(UnlockWalletRequestSchema)` to create a new message.
 */
export declare const UnlockWalletRequestSchema: GenMessage<UnlockWalletRequest>;
/**
 * @generated from message lnrpc.UnlockWalletResponse
 */
export type UnlockWalletResponse = Message<"lnrpc.UnlockWalletResponse"> & {};
/**
 * Describes the message lnrpc.UnlockWalletResponse.
 * Use `create(UnlockWalletResponseSchema)` to create a new message.
 */
export declare const UnlockWalletResponseSchema: GenMessage<UnlockWalletResponse>;
/**
 * @generated from message lnrpc.ChangePasswordRequest
 */
export type ChangePasswordRequest = Message<"lnrpc.ChangePasswordRequest"> & {
    /**
     *
     * current_password should be the current valid passphrase used to unlock the
     * daemon. When using REST, this field must be encoded as base64.
     *
     * @generated from field: bytes current_password = 1;
     */
    currentPassword: Uint8Array;
    /**
     *
     * new_password should be the new passphrase that will be needed to unlock the
     * daemon. When using REST, this field must be encoded as base64.
     *
     * @generated from field: bytes new_password = 2;
     */
    newPassword: Uint8Array;
    /**
     *
     * stateless_init is an optional argument instructing the daemon NOT to create
     * any *.macaroon files in its filesystem. If this parameter is set, then the
     * admin macaroon returned in the response MUST be stored by the caller of the
     * RPC as otherwise all access to the daemon will be lost!
     *
     * @generated from field: bool stateless_init = 3;
     */
    statelessInit: boolean;
    /**
     *
     * new_macaroon_root_key is an optional argument instructing the daemon to
     * rotate the macaroon root key when set to true. This will invalidate all
     * previously generated macaroons.
     *
     * @generated from field: bool new_macaroon_root_key = 4;
     */
    newMacaroonRootKey: boolean;
};
/**
 * Describes the message lnrpc.ChangePasswordRequest.
 * Use `create(ChangePasswordRequestSchema)` to create a new message.
 */
export declare const ChangePasswordRequestSchema: GenMessage<ChangePasswordRequest>;
/**
 * @generated from message lnrpc.ChangePasswordResponse
 */
export type ChangePasswordResponse = Message<"lnrpc.ChangePasswordResponse"> & {
    /**
     *
     * The binary serialized admin macaroon that can be used to access the daemon
     * after rotating the macaroon root key. If both the stateless_init and
     * new_macaroon_root_key parameter were set to true, this is the ONLY copy of
     * the macaroon that was created from the new root key and MUST be stored
     * safely by the caller. Otherwise a copy of this macaroon is also persisted on
     * disk by the daemon, together with other macaroon files.
     *
     * @generated from field: bytes admin_macaroon = 1;
     */
    adminMacaroon: Uint8Array;
};
/**
 * Describes the message lnrpc.ChangePasswordResponse.
 * Use `create(ChangePasswordResponseSchema)` to create a new message.
 */
export declare const ChangePasswordResponseSchema: GenMessage<ChangePasswordResponse>;
/**
 * WalletUnlocker is a service that is used to set up a wallet password for
 * lnd at first startup, and unlock a previously set up wallet.
 *
 * @generated from service lnrpc.WalletUnlocker
 */
export declare const WalletUnlocker: GenService<{
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
     * @generated from rpc lnrpc.WalletUnlocker.GenSeed
     */
    genSeed: {
        methodKind: "unary";
        input: typeof GenSeedRequestSchema;
        output: typeof GenSeedResponseSchema;
    };
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
     * @generated from rpc lnrpc.WalletUnlocker.InitWallet
     */
    initWallet: {
        methodKind: "unary";
        input: typeof InitWalletRequestSchema;
        output: typeof InitWalletResponseSchema;
    };
    /**
     * lncli: `unlock`
     * UnlockWallet is used at startup of lnd to provide a password to unlock
     * the wallet database.
     *
     * @generated from rpc lnrpc.WalletUnlocker.UnlockWallet
     */
    unlockWallet: {
        methodKind: "unary";
        input: typeof UnlockWalletRequestSchema;
        output: typeof UnlockWalletResponseSchema;
    };
    /**
     * lncli: `changepassword`
     * ChangePassword changes the password of the encrypted wallet. This will
     * automatically unlock the wallet database if successful.
     *
     * @generated from rpc lnrpc.WalletUnlocker.ChangePassword
     */
    changePassword: {
        methodKind: "unary";
        input: typeof ChangePasswordRequestSchema;
        output: typeof ChangePasswordResponseSchema;
    };
}>;
export declare const file_stateservice: GenFile;
/**
 * @generated from message lnrpc.SubscribeStateRequest
 */
export type SubscribeStateRequest = Message<"lnrpc.SubscribeStateRequest"> & {};
/**
 * Describes the message lnrpc.SubscribeStateRequest.
 * Use `create(SubscribeStateRequestSchema)` to create a new message.
 */
export declare const SubscribeStateRequestSchema: GenMessage<SubscribeStateRequest>;
/**
 * @generated from message lnrpc.SubscribeStateResponse
 */
export type SubscribeStateResponse = Message<"lnrpc.SubscribeStateResponse"> & {
    /**
     * @generated from field: lnrpc.WalletState state = 1;
     */
    state: WalletState;
};
/**
 * Describes the message lnrpc.SubscribeStateResponse.
 * Use `create(SubscribeStateResponseSchema)` to create a new message.
 */
export declare const SubscribeStateResponseSchema: GenMessage<SubscribeStateResponse>;
/**
 * @generated from message lnrpc.GetStateRequest
 */
export type GetStateRequest = Message<"lnrpc.GetStateRequest"> & {};
/**
 * Describes the message lnrpc.GetStateRequest.
 * Use `create(GetStateRequestSchema)` to create a new message.
 */
export declare const GetStateRequestSchema: GenMessage<GetStateRequest>;
/**
 * @generated from message lnrpc.GetStateResponse
 */
export type GetStateResponse = Message<"lnrpc.GetStateResponse"> & {
    /**
     * @generated from field: lnrpc.WalletState state = 1;
     */
    state: WalletState;
};
/**
 * Describes the message lnrpc.GetStateResponse.
 * Use `create(GetStateResponseSchema)` to create a new message.
 */
export declare const GetStateResponseSchema: GenMessage<GetStateResponse>;
/**
 * @generated from enum lnrpc.WalletState
 */
export declare enum WalletState {
    /**
     * NON_EXISTING means that the wallet has not yet been initialized.
     *
     * @generated from enum value: NON_EXISTING = 0;
     */
    NON_EXISTING = 0,
    /**
     * LOCKED means that the wallet is locked and requires a password to unlock.
     *
     * @generated from enum value: LOCKED = 1;
     */
    LOCKED = 1,
    /**
     * UNLOCKED means that the wallet was unlocked successfully, but RPC server
     * isn't ready.
     *
     * @generated from enum value: UNLOCKED = 2;
     */
    UNLOCKED = 2,
    /**
     * RPC_ACTIVE means that the lnd server is active but not fully ready for
     * calls.
     *
     * @generated from enum value: RPC_ACTIVE = 3;
     */
    RPC_ACTIVE = 3,
    /**
     * SERVER_ACTIVE means that the lnd server is ready to accept calls.
     *
     * @generated from enum value: SERVER_ACTIVE = 4;
     */
    SERVER_ACTIVE = 4,
    /**
     * WAITING_TO_START means that node is waiting to become the leader in a
     * cluster and is not started yet.
     *
     * @generated from enum value: WAITING_TO_START = 255;
     */
    WAITING_TO_START = 255
}
/**
 * Describes the enum lnrpc.WalletState.
 */
export declare const WalletStateSchema: GenEnum<WalletState>;
/**
 * State service is a always running service that exposes the current state of
 * the wallet and RPC server.
 *
 * @generated from service lnrpc.State
 */
export declare const State: GenService<{
    /**
     * SubscribeState subscribes to the state of the wallet. The current wallet
     * state will always be delivered immediately.
     *
     * @generated from rpc lnrpc.State.SubscribeState
     */
    subscribeState: {
        methodKind: "server_streaming";
        input: typeof SubscribeStateRequestSchema;
        output: typeof SubscribeStateResponseSchema;
    };
    /**
     * GetState returns the current wallet state without streaming further
     * changes.
     *
     * @generated from rpc lnrpc.State.GetState
     */
    getState: {
        methodKind: "unary";
        input: typeof GetStateRequestSchema;
        output: typeof GetStateResponseSchema;
    };
}>;
//# sourceMappingURL=lightning_pb.d.ts.map