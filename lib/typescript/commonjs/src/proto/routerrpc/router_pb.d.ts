import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { AliasMap, ChannelPoint, Failure, Failure_FailureCode, FeatureBit, HTLCAttempt, HTLCAttemptSchema, PaymentFailureReason, PaymentSchema, Route, RouteHint } from "../lightning_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file routerrpc/router.proto.
 */
export declare const file_routerrpc_router: GenFile;
/**
 * @generated from message routerrpc.SendPaymentRequest
 */
export type SendPaymentRequest = Message<"routerrpc.SendPaymentRequest"> & {
    /**
     * The identity pubkey of the payment recipient
     *
     * @generated from field: bytes dest = 1;
     */
    dest: Uint8Array;
    /**
     *
     * Number of satoshis to send.
     *
     * The fields amt and amt_msat are mutually exclusive.
     *
     * @generated from field: int64 amt = 2;
     */
    amt: bigint;
    /**
     * The hash to use within the payment's HTLC
     *
     * @generated from field: bytes payment_hash = 3;
     */
    paymentHash: Uint8Array;
    /**
     *
     * The CLTV delta from the current height that should be used to set the
     * timelock for the final hop.
     *
     * @generated from field: int32 final_cltv_delta = 4;
     */
    finalCltvDelta: number;
    /**
     *
     * A bare-bones invoice for a payment within the Lightning Network.  With the
     * details of the invoice, the sender has all the data necessary to send a
     * payment to the recipient. The amount in the payment request may be zero. In
     * that case it is required to set the amt field as well. If no payment request
     * is specified, the following fields are required: dest, amt and payment_hash.
     *
     * @generated from field: string payment_request = 5;
     */
    paymentRequest: string;
    /**
     *
     * An upper limit on the amount of time we should spend when attempting to
     * fulfill the payment. This is expressed in seconds. If we cannot make a
     * successful payment within this time frame, an error will be returned.
     * This field must be non-zero.
     *
     * @generated from field: int32 timeout_seconds = 6;
     */
    timeoutSeconds: number;
    /**
     *
     * The maximum number of satoshis that will be paid as a fee of the payment.
     * If this field is left to the default value of 0, only zero-fee routes will
     * be considered. This usually means single hop routes connecting directly to
     * the destination. To send the payment without a fee limit, use max int here.
     *
     * The fields fee_limit_sat and fee_limit_msat are mutually exclusive.
     *
     * @generated from field: int64 fee_limit_sat = 7;
     */
    feeLimitSat: bigint;
    /**
     *
     * Deprecated, use outgoing_chan_ids. The channel id of the channel that must
     * be taken to the first hop. If zero, any channel may be used (unless
     * outgoing_chan_ids are set).
     *
     * @generated from field: uint64 outgoing_chan_id = 8 [jstype = JS_STRING, deprecated = true];
     * @deprecated
     */
    outgoingChanId: string;
    /**
     *
     * An optional maximum total time lock for the route. This should not
     * exceed lnd's `--max-cltv-expiry` setting. If zero, then the value of
     * `--max-cltv-expiry` is enforced.
     *
     * @generated from field: int32 cltv_limit = 9;
     */
    cltvLimit: number;
    /**
     *
     * Optional route hints to reach the destination through private channels.
     *
     * @generated from field: repeated lnrpc.RouteHint route_hints = 10;
     */
    routeHints: RouteHint[];
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
     *
     * Number of millisatoshis to send.
     *
     * The fields amt and amt_msat are mutually exclusive.
     *
     * @generated from field: int64 amt_msat = 12;
     */
    amtMsat: bigint;
    /**
     *
     * The maximum number of millisatoshis that will be paid as a fee of the
     * payment. If this field is left to the default value of 0, only zero-fee
     * routes will be considered. This usually means single hop routes connecting
     * directly to the destination. To send the payment without a fee limit, use
     * max int here.
     *
     * The fields fee_limit_sat and fee_limit_msat are mutually exclusive.
     *
     * @generated from field: int64 fee_limit_msat = 13;
     */
    feeLimitMsat: bigint;
    /**
     *
     * The pubkey of the last hop of the route. If empty, any hop may be used.
     *
     * @generated from field: bytes last_hop_pubkey = 14;
     */
    lastHopPubkey: Uint8Array;
    /**
     * If set, circular payments to self are permitted.
     *
     * @generated from field: bool allow_self_payment = 15;
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
     * @generated from field: repeated lnrpc.FeatureBit dest_features = 16;
     */
    destFeatures: FeatureBit[];
    /**
     *
     * The maximum number of partial payments that may be use to complete the full
     * amount.
     *
     * @generated from field: uint32 max_parts = 17;
     */
    maxParts: number;
    /**
     *
     * If set, only the final payment update is streamed back. Intermediate updates
     * that show which htlcs are still in flight are suppressed.
     *
     * @generated from field: bool no_inflight_updates = 18;
     */
    noInflightUpdates: boolean;
    /**
     *
     * The channel ids of the channels are allowed for the first hop. If empty,
     * any channel may be used.
     *
     * @generated from field: repeated uint64 outgoing_chan_ids = 19;
     */
    outgoingChanIds: bigint[];
    /**
     *
     * An optional payment addr to be included within the last hop of the route.
     * This is also called payment secret in specifications (e.g. BOLT 11).
     *
     * @generated from field: bytes payment_addr = 20;
     */
    paymentAddr: Uint8Array;
    /**
     *
     * The largest payment split that should be attempted when making a payment if
     * splitting is necessary. Setting this value will effectively cause lnd to
     * split more aggressively, vs only when it thinks it needs to. Note that this
     * value is in milli-satoshis.
     *
     * @generated from field: uint64 max_shard_size_msat = 21;
     */
    maxShardSizeMsat: bigint;
    /**
     *
     * If set, an AMP-payment will be attempted.
     *
     * @generated from field: bool amp = 22;
     */
    amp: boolean;
    /**
     *
     * The time preference for this payment. Set to -1 to optimize for fees
     * only, to 1 to optimize for reliability only or a value inbetween for a mix.
     *
     * @generated from field: double time_pref = 23;
     */
    timePref: number;
    /**
     *
     * If set, the payment loop can be interrupted by manually canceling the
     * payment context, even before the payment timeout is reached. Note that the
     * payment may still succeed after cancellation, as in-flight attempts can
     * still settle afterwards. Canceling will only prevent further attempts from
     * being sent.
     *
     * @generated from field: bool cancelable = 24;
     */
    cancelable: boolean;
    /**
     *
     * An optional field that can be used to pass an arbitrary set of TLV records
     * to the first hop peer of this payment. This can be used to pass application
     * specific data during the payment attempt. Record types are required to be in
     * the custom range >= 65536. When using REST, the values must be encoded as
     * base64.
     *
     * @generated from field: map<uint64, bytes> first_hop_custom_records = 25;
     */
    firstHopCustomRecords: {
        [key: string]: Uint8Array;
    };
};
/**
 * Describes the message routerrpc.SendPaymentRequest.
 * Use `create(SendPaymentRequestSchema)` to create a new message.
 */
export declare const SendPaymentRequestSchema: GenMessage<SendPaymentRequest>;
/**
 * @generated from message routerrpc.TrackPaymentRequest
 */
export type TrackPaymentRequest = Message<"routerrpc.TrackPaymentRequest"> & {
    /**
     * The hash of the payment to look up.
     *
     * @generated from field: bytes payment_hash = 1;
     */
    paymentHash: Uint8Array;
    /**
     *
     * If set, only the final payment update is streamed back. Intermediate updates
     * that show which htlcs are still in flight are suppressed.
     *
     * @generated from field: bool no_inflight_updates = 2;
     */
    noInflightUpdates: boolean;
};
/**
 * Describes the message routerrpc.TrackPaymentRequest.
 * Use `create(TrackPaymentRequestSchema)` to create a new message.
 */
export declare const TrackPaymentRequestSchema: GenMessage<TrackPaymentRequest>;
/**
 * @generated from message routerrpc.TrackPaymentsRequest
 */
export type TrackPaymentsRequest = Message<"routerrpc.TrackPaymentsRequest"> & {
    /**
     *
     * If set, only the final payment updates are streamed back. Intermediate
     * updates that show which htlcs are still in flight are suppressed.
     *
     * @generated from field: bool no_inflight_updates = 1;
     */
    noInflightUpdates: boolean;
};
/**
 * Describes the message routerrpc.TrackPaymentsRequest.
 * Use `create(TrackPaymentsRequestSchema)` to create a new message.
 */
export declare const TrackPaymentsRequestSchema: GenMessage<TrackPaymentsRequest>;
/**
 * @generated from message routerrpc.RouteFeeRequest
 */
export type RouteFeeRequest = Message<"routerrpc.RouteFeeRequest"> & {
    /**
     *
     * The destination one wishes to obtain a routing fee quote to. If set, this
     * parameter requires the amt_sat parameter also to be set. This parameter
     * combination triggers a graph based routing fee estimation as opposed to a
     * payment probe based estimate in case a payment request is provided. The
     * graph based estimation is an algorithm that is executed on the in memory
     * graph. Hence its runtime is significantly shorter than a payment probe
     * estimation that sends out actual payments to the network.
     *
     * @generated from field: bytes dest = 1;
     */
    dest: Uint8Array;
    /**
     *
     * The amount one wishes to send to the target destination. It is only to be
     * used in combination with the dest parameter.
     *
     * @generated from field: int64 amt_sat = 2;
     */
    amtSat: bigint;
    /**
     *
     * A payment request of the target node that the route fee request is intended
     * for. Its parameters are input to probe payments that estimate routing fees.
     * The timeout parameter can be specified to set a maximum time on the probing
     * attempt. Cannot be used in combination with dest and amt_sat.
     *
     * @generated from field: string payment_request = 3;
     */
    paymentRequest: string;
    /**
     *
     * A user preference of how long a probe payment should maximally be allowed to
     * take, denoted in seconds. The probing payment loop is aborted if this
     * timeout is reached. Note that the probing process itself can take longer
     * than the timeout if the HTLC becomes delayed or stuck. Canceling the context
     * of this call will not cancel the payment loop, the duration is only
     * controlled by the timeout parameter.
     *
     * @generated from field: uint32 timeout = 4;
     */
    timeout: number;
};
/**
 * Describes the message routerrpc.RouteFeeRequest.
 * Use `create(RouteFeeRequestSchema)` to create a new message.
 */
export declare const RouteFeeRequestSchema: GenMessage<RouteFeeRequest>;
/**
 * @generated from message routerrpc.RouteFeeResponse
 */
export type RouteFeeResponse = Message<"routerrpc.RouteFeeResponse"> & {
    /**
     *
     * A lower bound of the estimated fee to the target destination within the
     * network, expressed in milli-satoshis.
     *
     * @generated from field: int64 routing_fee_msat = 1;
     */
    routingFeeMsat: bigint;
    /**
     *
     * An estimate of the worst case time delay that can occur. Note that callers
     * will still need to factor in the final CLTV delta of the last hop into this
     * value.
     *
     * @generated from field: int64 time_lock_delay = 2;
     */
    timeLockDelay: bigint;
    /**
     *
     * An indication whether a probing payment succeeded or whether and why it
     * failed. FAILURE_REASON_NONE indicates success.
     *
     * @generated from field: lnrpc.PaymentFailureReason failure_reason = 5;
     */
    failureReason: PaymentFailureReason;
};
/**
 * Describes the message routerrpc.RouteFeeResponse.
 * Use `create(RouteFeeResponseSchema)` to create a new message.
 */
export declare const RouteFeeResponseSchema: GenMessage<RouteFeeResponse>;
/**
 * @generated from message routerrpc.SendToRouteRequest
 */
export type SendToRouteRequest = Message<"routerrpc.SendToRouteRequest"> & {
    /**
     * The payment hash to use for the HTLC.
     *
     * @generated from field: bytes payment_hash = 1;
     */
    paymentHash: Uint8Array;
    /**
     * Route that should be used to attempt to complete the payment.
     *
     * @generated from field: lnrpc.Route route = 2;
     */
    route?: Route;
    /**
     *
     * Whether the payment should be marked as failed when a temporary error is
     * returned from the given route. Set it to true so the payment won't be
     * failed unless a terminal error is occurred, such as payment timeout, no
     * routes, incorrect payment details, or insufficient funds.
     *
     * @generated from field: bool skip_temp_err = 3;
     */
    skipTempErr: boolean;
    /**
     *
     * An optional field that can be used to pass an arbitrary set of TLV records
     * to the first hop peer of this payment. This can be used to pass application
     * specific data during the payment attempt. Record types are required to be in
     * the custom range >= 65536. When using REST, the values must be encoded as
     * base64.
     *
     * @generated from field: map<uint64, bytes> first_hop_custom_records = 4;
     */
    firstHopCustomRecords: {
        [key: string]: Uint8Array;
    };
};
/**
 * Describes the message routerrpc.SendToRouteRequest.
 * Use `create(SendToRouteRequestSchema)` to create a new message.
 */
export declare const SendToRouteRequestSchema: GenMessage<SendToRouteRequest>;
/**
 * @generated from message routerrpc.SendToRouteResponse
 */
export type SendToRouteResponse = Message<"routerrpc.SendToRouteResponse"> & {
    /**
     * The preimage obtained by making the payment.
     *
     * @generated from field: bytes preimage = 1;
     */
    preimage: Uint8Array;
    /**
     * The failure message in case the payment failed.
     *
     * @generated from field: lnrpc.Failure failure = 2;
     */
    failure?: Failure;
};
/**
 * Describes the message routerrpc.SendToRouteResponse.
 * Use `create(SendToRouteResponseSchema)` to create a new message.
 */
export declare const SendToRouteResponseSchema: GenMessage<SendToRouteResponse>;
/**
 * @generated from message routerrpc.ResetMissionControlRequest
 */
export type ResetMissionControlRequest = Message<"routerrpc.ResetMissionControlRequest"> & {};
/**
 * Describes the message routerrpc.ResetMissionControlRequest.
 * Use `create(ResetMissionControlRequestSchema)` to create a new message.
 */
export declare const ResetMissionControlRequestSchema: GenMessage<ResetMissionControlRequest>;
/**
 * @generated from message routerrpc.ResetMissionControlResponse
 */
export type ResetMissionControlResponse = Message<"routerrpc.ResetMissionControlResponse"> & {};
/**
 * Describes the message routerrpc.ResetMissionControlResponse.
 * Use `create(ResetMissionControlResponseSchema)` to create a new message.
 */
export declare const ResetMissionControlResponseSchema: GenMessage<ResetMissionControlResponse>;
/**
 * @generated from message routerrpc.QueryMissionControlRequest
 */
export type QueryMissionControlRequest = Message<"routerrpc.QueryMissionControlRequest"> & {};
/**
 * Describes the message routerrpc.QueryMissionControlRequest.
 * Use `create(QueryMissionControlRequestSchema)` to create a new message.
 */
export declare const QueryMissionControlRequestSchema: GenMessage<QueryMissionControlRequest>;
/**
 * QueryMissionControlResponse contains mission control state.
 *
 * @generated from message routerrpc.QueryMissionControlResponse
 */
export type QueryMissionControlResponse = Message<"routerrpc.QueryMissionControlResponse"> & {
    /**
     * Node pair-level mission control state.
     *
     * @generated from field: repeated routerrpc.PairHistory pairs = 2;
     */
    pairs: PairHistory[];
};
/**
 * Describes the message routerrpc.QueryMissionControlResponse.
 * Use `create(QueryMissionControlResponseSchema)` to create a new message.
 */
export declare const QueryMissionControlResponseSchema: GenMessage<QueryMissionControlResponse>;
/**
 * @generated from message routerrpc.XImportMissionControlRequest
 */
export type XImportMissionControlRequest = Message<"routerrpc.XImportMissionControlRequest"> & {
    /**
     * Node pair-level mission control state to be imported.
     *
     * @generated from field: repeated routerrpc.PairHistory pairs = 1;
     */
    pairs: PairHistory[];
    /**
     * Whether to force override MC pair history. Note that even with force
     * override the failure pair is imported before the success pair and both
     * still clamp existing failure/success amounts.
     *
     * @generated from field: bool force = 2;
     */
    force: boolean;
};
/**
 * Describes the message routerrpc.XImportMissionControlRequest.
 * Use `create(XImportMissionControlRequestSchema)` to create a new message.
 */
export declare const XImportMissionControlRequestSchema: GenMessage<XImportMissionControlRequest>;
/**
 * @generated from message routerrpc.XImportMissionControlResponse
 */
export type XImportMissionControlResponse = Message<"routerrpc.XImportMissionControlResponse"> & {};
/**
 * Describes the message routerrpc.XImportMissionControlResponse.
 * Use `create(XImportMissionControlResponseSchema)` to create a new message.
 */
export declare const XImportMissionControlResponseSchema: GenMessage<XImportMissionControlResponse>;
/**
 * PairHistory contains the mission control state for a particular node pair.
 *
 * @generated from message routerrpc.PairHistory
 */
export type PairHistory = Message<"routerrpc.PairHistory"> & {
    /**
     * The source node pubkey of the pair.
     *
     * @generated from field: bytes node_from = 1;
     */
    nodeFrom: Uint8Array;
    /**
     * The destination node pubkey of the pair.
     *
     * @generated from field: bytes node_to = 2;
     */
    nodeTo: Uint8Array;
    /**
     * @generated from field: routerrpc.PairData history = 7;
     */
    history?: PairData;
};
/**
 * Describes the message routerrpc.PairHistory.
 * Use `create(PairHistorySchema)` to create a new message.
 */
export declare const PairHistorySchema: GenMessage<PairHistory>;
/**
 * @generated from message routerrpc.PairData
 */
export type PairData = Message<"routerrpc.PairData"> & {
    /**
     * Time of last failure.
     *
     * @generated from field: int64 fail_time = 1;
     */
    failTime: bigint;
    /**
     *
     * Lowest amount that failed to forward rounded to whole sats. This may be
     * set to zero if the failure is independent of amount.
     *
     * @generated from field: int64 fail_amt_sat = 2;
     */
    failAmtSat: bigint;
    /**
     *
     * Lowest amount that failed to forward in millisats. This may be
     * set to zero if the failure is independent of amount.
     *
     * @generated from field: int64 fail_amt_msat = 4;
     */
    failAmtMsat: bigint;
    /**
     * Time of last success.
     *
     * @generated from field: int64 success_time = 5;
     */
    successTime: bigint;
    /**
     * Highest amount that we could successfully forward rounded to whole sats.
     *
     * @generated from field: int64 success_amt_sat = 6;
     */
    successAmtSat: bigint;
    /**
     * Highest amount that we could successfully forward in millisats.
     *
     * @generated from field: int64 success_amt_msat = 7;
     */
    successAmtMsat: bigint;
};
/**
 * Describes the message routerrpc.PairData.
 * Use `create(PairDataSchema)` to create a new message.
 */
export declare const PairDataSchema: GenMessage<PairData>;
/**
 * @generated from message routerrpc.GetMissionControlConfigRequest
 */
export type GetMissionControlConfigRequest = Message<"routerrpc.GetMissionControlConfigRequest"> & {};
/**
 * Describes the message routerrpc.GetMissionControlConfigRequest.
 * Use `create(GetMissionControlConfigRequestSchema)` to create a new message.
 */
export declare const GetMissionControlConfigRequestSchema: GenMessage<GetMissionControlConfigRequest>;
/**
 * @generated from message routerrpc.GetMissionControlConfigResponse
 */
export type GetMissionControlConfigResponse = Message<"routerrpc.GetMissionControlConfigResponse"> & {
    /**
     *
     * Mission control's currently active config.
     *
     * @generated from field: routerrpc.MissionControlConfig config = 1;
     */
    config?: MissionControlConfig;
};
/**
 * Describes the message routerrpc.GetMissionControlConfigResponse.
 * Use `create(GetMissionControlConfigResponseSchema)` to create a new message.
 */
export declare const GetMissionControlConfigResponseSchema: GenMessage<GetMissionControlConfigResponse>;
/**
 * @generated from message routerrpc.SetMissionControlConfigRequest
 */
export type SetMissionControlConfigRequest = Message<"routerrpc.SetMissionControlConfigRequest"> & {
    /**
     *
     * The config to set for mission control. Note that all values *must* be set,
     * because the full config will be applied.
     *
     * @generated from field: routerrpc.MissionControlConfig config = 1;
     */
    config?: MissionControlConfig;
};
/**
 * Describes the message routerrpc.SetMissionControlConfigRequest.
 * Use `create(SetMissionControlConfigRequestSchema)` to create a new message.
 */
export declare const SetMissionControlConfigRequestSchema: GenMessage<SetMissionControlConfigRequest>;
/**
 * @generated from message routerrpc.SetMissionControlConfigResponse
 */
export type SetMissionControlConfigResponse = Message<"routerrpc.SetMissionControlConfigResponse"> & {};
/**
 * Describes the message routerrpc.SetMissionControlConfigResponse.
 * Use `create(SetMissionControlConfigResponseSchema)` to create a new message.
 */
export declare const SetMissionControlConfigResponseSchema: GenMessage<SetMissionControlConfigResponse>;
/**
 * @generated from message routerrpc.MissionControlConfig
 */
export type MissionControlConfig = Message<"routerrpc.MissionControlConfig"> & {
    /**
     *
     * Deprecated, use AprioriParameters. The amount of time mission control will
     * take to restore a penalized node or channel back to 50% success probability,
     * expressed in seconds. Setting this value to a higher value will penalize
     * failures for longer, making mission control less likely to route through
     * nodes and channels that we have previously recorded failures for.
     *
     * @generated from field: uint64 half_life_seconds = 1 [deprecated = true];
     * @deprecated
     */
    halfLifeSeconds: bigint;
    /**
     *
     * Deprecated, use AprioriParameters. The probability of success mission
     * control should assign to hop in a route where it has no other information
     * available. Higher values will make mission control more willing to try hops
     * that we have no information about, lower values will discourage trying these
     * hops.
     *
     * @generated from field: float hop_probability = 2 [deprecated = true];
     * @deprecated
     */
    hopProbability: number;
    /**
     *
     * Deprecated, use AprioriParameters. The importance that mission control
     * should place on historical results, expressed as a value in [0;1]. Setting
     * this value to 1 will ignore all historical payments and just use the hop
     * probability to assess the probability of success for each hop. A zero value
     * ignores hop probability completely and relies entirely on historical
     * results, unless none are available.
     *
     * @generated from field: float weight = 3 [deprecated = true];
     * @deprecated
     */
    weight: number;
    /**
     *
     * The maximum number of payment results that mission control will store.
     *
     * @generated from field: uint32 maximum_payment_results = 4;
     */
    maximumPaymentResults: number;
    /**
     *
     * The minimum time that must have passed since the previously recorded failure
     * before we raise the failure amount.
     *
     * @generated from field: uint64 minimum_failure_relax_interval = 5;
     */
    minimumFailureRelaxInterval: bigint;
    /**
     *
     * ProbabilityModel defines which probability estimator should be used in
     * pathfinding. Note that the bimodal estimator is experimental.
     *
     * @generated from field: routerrpc.MissionControlConfig.ProbabilityModel model = 6;
     */
    model: MissionControlConfig_ProbabilityModel;
    /**
     *
     * EstimatorConfig is populated dependent on the estimator type.
     *
     * @generated from oneof routerrpc.MissionControlConfig.EstimatorConfig
     */
    EstimatorConfig: {
        /**
         * @generated from field: routerrpc.AprioriParameters apriori = 7;
         */
        value: AprioriParameters;
        case: "apriori";
    } | {
        /**
         * @generated from field: routerrpc.BimodalParameters bimodal = 8;
         */
        value: BimodalParameters;
        case: "bimodal";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message routerrpc.MissionControlConfig.
 * Use `create(MissionControlConfigSchema)` to create a new message.
 */
export declare const MissionControlConfigSchema: GenMessage<MissionControlConfig>;
/**
 * @generated from enum routerrpc.MissionControlConfig.ProbabilityModel
 */
export declare enum MissionControlConfig_ProbabilityModel {
    /**
     * @generated from enum value: APRIORI = 0;
     */
    APRIORI = 0,
    /**
     * @generated from enum value: BIMODAL = 1;
     */
    BIMODAL = 1
}
/**
 * Describes the enum routerrpc.MissionControlConfig.ProbabilityModel.
 */
export declare const MissionControlConfig_ProbabilityModelSchema: GenEnum<MissionControlConfig_ProbabilityModel>;
/**
 * @generated from message routerrpc.BimodalParameters
 */
export type BimodalParameters = Message<"routerrpc.BimodalParameters"> & {
    /**
     *
     * NodeWeight defines how strongly other previous forwardings on channels of a
     * router should be taken into account when computing a channel's probability
     * to route. The allowed values are in the range [0, 1], where a value of 0
     * means that only direct information about a channel is taken into account.
     *
     * @generated from field: double node_weight = 1;
     */
    nodeWeight: number;
    /**
     *
     * ScaleMsat describes the scale over which channels statistically have some
     * liquidity left. The value determines how quickly the bimodal distribution
     * drops off from the edges of a channel. A larger value (compared to typical
     * channel capacities) means that the drop off is slow and that channel
     * balances are distributed more uniformly. A small value leads to the
     * assumption of very unbalanced channels.
     *
     * @generated from field: uint64 scale_msat = 2;
     */
    scaleMsat: bigint;
    /**
     *
     * DecayTime describes the information decay of knowledge about previous
     * successes and failures in channels. The smaller the decay time, the quicker
     * we forget about past forwardings.
     *
     * @generated from field: uint64 decay_time = 3;
     */
    decayTime: bigint;
};
/**
 * Describes the message routerrpc.BimodalParameters.
 * Use `create(BimodalParametersSchema)` to create a new message.
 */
export declare const BimodalParametersSchema: GenMessage<BimodalParameters>;
/**
 * @generated from message routerrpc.AprioriParameters
 */
export type AprioriParameters = Message<"routerrpc.AprioriParameters"> & {
    /**
     *
     * The amount of time mission control will take to restore a penalized node
     * or channel back to 50% success probability, expressed in seconds. Setting
     * this value to a higher value will penalize failures for longer, making
     * mission control less likely to route through nodes and channels that we
     * have previously recorded failures for.
     *
     * @generated from field: uint64 half_life_seconds = 1;
     */
    halfLifeSeconds: bigint;
    /**
     *
     * The probability of success mission control should assign to hop in a route
     * where it has no other information available. Higher values will make mission
     * control more willing to try hops that we have no information about, lower
     * values will discourage trying these hops.
     *
     * @generated from field: double hop_probability = 2;
     */
    hopProbability: number;
    /**
     *
     * The importance that mission control should place on historical results,
     * expressed as a value in [0;1]. Setting this value to 1 will ignore all
     * historical payments and just use the hop probability to assess the
     * probability of success for each hop. A zero value ignores hop probability
     * completely and relies entirely on historical results, unless none are
     * available.
     *
     * @generated from field: double weight = 3;
     */
    weight: number;
    /**
     *
     * The fraction of a channel's capacity that we consider to have liquidity. For
     * amounts that come close to or exceed the fraction, an additional penalty is
     * applied. A value of 1.0 disables the capacity factor. Allowed values are in
     * [0.75, 1.0].
     *
     * @generated from field: double capacity_fraction = 4;
     */
    capacityFraction: number;
};
/**
 * Describes the message routerrpc.AprioriParameters.
 * Use `create(AprioriParametersSchema)` to create a new message.
 */
export declare const AprioriParametersSchema: GenMessage<AprioriParameters>;
/**
 * @generated from message routerrpc.QueryProbabilityRequest
 */
export type QueryProbabilityRequest = Message<"routerrpc.QueryProbabilityRequest"> & {
    /**
     * The source node pubkey of the pair.
     *
     * @generated from field: bytes from_node = 1;
     */
    fromNode: Uint8Array;
    /**
     * The destination node pubkey of the pair.
     *
     * @generated from field: bytes to_node = 2;
     */
    toNode: Uint8Array;
    /**
     * The amount for which to calculate a probability.
     *
     * @generated from field: int64 amt_msat = 3;
     */
    amtMsat: bigint;
};
/**
 * Describes the message routerrpc.QueryProbabilityRequest.
 * Use `create(QueryProbabilityRequestSchema)` to create a new message.
 */
export declare const QueryProbabilityRequestSchema: GenMessage<QueryProbabilityRequest>;
/**
 * @generated from message routerrpc.QueryProbabilityResponse
 */
export type QueryProbabilityResponse = Message<"routerrpc.QueryProbabilityResponse"> & {
    /**
     * The success probability for the requested pair.
     *
     * @generated from field: double probability = 1;
     */
    probability: number;
    /**
     * The historical data for the requested pair.
     *
     * @generated from field: routerrpc.PairData history = 2;
     */
    history?: PairData;
};
/**
 * Describes the message routerrpc.QueryProbabilityResponse.
 * Use `create(QueryProbabilityResponseSchema)` to create a new message.
 */
export declare const QueryProbabilityResponseSchema: GenMessage<QueryProbabilityResponse>;
/**
 * @generated from message routerrpc.BuildRouteRequest
 */
export type BuildRouteRequest = Message<"routerrpc.BuildRouteRequest"> & {
    /**
     *
     * The amount to send expressed in msat. If set to zero, the minimum routable
     * amount is used.
     *
     * @generated from field: int64 amt_msat = 1;
     */
    amtMsat: bigint;
    /**
     *
     * CLTV delta from the current height that should be used for the timelock
     * of the final hop
     *
     * @generated from field: int32 final_cltv_delta = 2;
     */
    finalCltvDelta: number;
    /**
     *
     * The channel id of the channel that must be taken to the first hop. If zero,
     * any channel may be used.
     *
     * @generated from field: uint64 outgoing_chan_id = 3 [jstype = JS_STRING];
     */
    outgoingChanId: string;
    /**
     *
     * A list of hops that defines the route. This does not include the source hop
     * pubkey.
     *
     * @generated from field: repeated bytes hop_pubkeys = 4;
     */
    hopPubkeys: Uint8Array[];
    /**
     *
     * An optional payment addr to be included within the last hop of the route.
     * This is also called payment secret in specifications (e.g. BOLT 11).
     *
     * @generated from field: bytes payment_addr = 5;
     */
    paymentAddr: Uint8Array;
    /**
     *
     * An optional field that can be used to pass an arbitrary set of TLV records
     * to the first hop peer of this payment. This can be used to pass application
     * specific data during the payment attempt. Record types are required to be in
     * the custom range >= 65536. When using REST, the values must be encoded as
     * base64.
     *
     * @generated from field: map<uint64, bytes> first_hop_custom_records = 6;
     */
    firstHopCustomRecords: {
        [key: string]: Uint8Array;
    };
};
/**
 * Describes the message routerrpc.BuildRouteRequest.
 * Use `create(BuildRouteRequestSchema)` to create a new message.
 */
export declare const BuildRouteRequestSchema: GenMessage<BuildRouteRequest>;
/**
 * @generated from message routerrpc.BuildRouteResponse
 */
export type BuildRouteResponse = Message<"routerrpc.BuildRouteResponse"> & {
    /**
     *
     * Fully specified route that can be used to execute the payment.
     *
     * @generated from field: lnrpc.Route route = 1;
     */
    route?: Route;
};
/**
 * Describes the message routerrpc.BuildRouteResponse.
 * Use `create(BuildRouteResponseSchema)` to create a new message.
 */
export declare const BuildRouteResponseSchema: GenMessage<BuildRouteResponse>;
/**
 * @generated from message routerrpc.SubscribeHtlcEventsRequest
 */
export type SubscribeHtlcEventsRequest = Message<"routerrpc.SubscribeHtlcEventsRequest"> & {};
/**
 * Describes the message routerrpc.SubscribeHtlcEventsRequest.
 * Use `create(SubscribeHtlcEventsRequestSchema)` to create a new message.
 */
export declare const SubscribeHtlcEventsRequestSchema: GenMessage<SubscribeHtlcEventsRequest>;
/**
 *
 * HtlcEvent contains the htlc event that was processed. These are served on a
 * best-effort basis; events are not persisted, delivery is not guaranteed
 * (in the event of a crash in the switch, forward events may be lost) and
 * some events may be replayed upon restart. Events consumed from this package
 * should be de-duplicated by the htlc's unique combination of incoming and
 * outgoing channel id and htlc id. [EXPERIMENTAL]
 *
 * @generated from message routerrpc.HtlcEvent
 */
export type HtlcEvent = Message<"routerrpc.HtlcEvent"> & {
    /**
     *
     * The short channel id that the incoming htlc arrived at our node on. This
     * value is zero for sends.
     *
     * @generated from field: uint64 incoming_channel_id = 1;
     */
    incomingChannelId: bigint;
    /**
     *
     * The short channel id that the outgoing htlc left our node on. This value
     * is zero for receives.
     *
     * @generated from field: uint64 outgoing_channel_id = 2;
     */
    outgoingChannelId: bigint;
    /**
     *
     * Incoming id is the index of the incoming htlc in the incoming channel.
     * This value is zero for sends.
     *
     * @generated from field: uint64 incoming_htlc_id = 3;
     */
    incomingHtlcId: bigint;
    /**
     *
     * Outgoing id is the index of the outgoing htlc in the outgoing channel.
     * This value is zero for receives.
     *
     * @generated from field: uint64 outgoing_htlc_id = 4;
     */
    outgoingHtlcId: bigint;
    /**
     *
     * The time in unix nanoseconds that the event occurred.
     *
     * @generated from field: uint64 timestamp_ns = 5;
     */
    timestampNs: bigint;
    /**
     *
     * The event type indicates whether the htlc was part of a send, receive or
     * forward.
     *
     * @generated from field: routerrpc.HtlcEvent.EventType event_type = 6;
     */
    eventType: HtlcEvent_EventType;
    /**
     * @generated from oneof routerrpc.HtlcEvent.event
     */
    event: {
        /**
         * @generated from field: routerrpc.ForwardEvent forward_event = 7;
         */
        value: ForwardEvent;
        case: "forwardEvent";
    } | {
        /**
         * @generated from field: routerrpc.ForwardFailEvent forward_fail_event = 8;
         */
        value: ForwardFailEvent;
        case: "forwardFailEvent";
    } | {
        /**
         * @generated from field: routerrpc.SettleEvent settle_event = 9;
         */
        value: SettleEvent;
        case: "settleEvent";
    } | {
        /**
         * @generated from field: routerrpc.LinkFailEvent link_fail_event = 10;
         */
        value: LinkFailEvent;
        case: "linkFailEvent";
    } | {
        /**
         * @generated from field: routerrpc.SubscribedEvent subscribed_event = 11;
         */
        value: SubscribedEvent;
        case: "subscribedEvent";
    } | {
        /**
         * @generated from field: routerrpc.FinalHtlcEvent final_htlc_event = 12;
         */
        value: FinalHtlcEvent;
        case: "finalHtlcEvent";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message routerrpc.HtlcEvent.
 * Use `create(HtlcEventSchema)` to create a new message.
 */
export declare const HtlcEventSchema: GenMessage<HtlcEvent>;
/**
 * @generated from enum routerrpc.HtlcEvent.EventType
 */
export declare enum HtlcEvent_EventType {
    /**
     * @generated from enum value: UNKNOWN = 0;
     */
    UNKNOWN = 0,
    /**
     * @generated from enum value: SEND = 1;
     */
    SEND = 1,
    /**
     * @generated from enum value: RECEIVE = 2;
     */
    RECEIVE = 2,
    /**
     * @generated from enum value: FORWARD = 3;
     */
    FORWARD = 3
}
/**
 * Describes the enum routerrpc.HtlcEvent.EventType.
 */
export declare const HtlcEvent_EventTypeSchema: GenEnum<HtlcEvent_EventType>;
/**
 * @generated from message routerrpc.HtlcInfo
 */
export type HtlcInfo = Message<"routerrpc.HtlcInfo"> & {
    /**
     * The timelock on the incoming htlc.
     *
     * @generated from field: uint32 incoming_timelock = 1;
     */
    incomingTimelock: number;
    /**
     * The timelock on the outgoing htlc.
     *
     * @generated from field: uint32 outgoing_timelock = 2;
     */
    outgoingTimelock: number;
    /**
     * The amount of the incoming htlc.
     *
     * @generated from field: uint64 incoming_amt_msat = 3;
     */
    incomingAmtMsat: bigint;
    /**
     * The amount of the outgoing htlc.
     *
     * @generated from field: uint64 outgoing_amt_msat = 4;
     */
    outgoingAmtMsat: bigint;
};
/**
 * Describes the message routerrpc.HtlcInfo.
 * Use `create(HtlcInfoSchema)` to create a new message.
 */
export declare const HtlcInfoSchema: GenMessage<HtlcInfo>;
/**
 * @generated from message routerrpc.ForwardEvent
 */
export type ForwardEvent = Message<"routerrpc.ForwardEvent"> & {
    /**
     * Info contains details about the htlc that was forwarded.
     *
     * @generated from field: routerrpc.HtlcInfo info = 1;
     */
    info?: HtlcInfo;
};
/**
 * Describes the message routerrpc.ForwardEvent.
 * Use `create(ForwardEventSchema)` to create a new message.
 */
export declare const ForwardEventSchema: GenMessage<ForwardEvent>;
/**
 * @generated from message routerrpc.ForwardFailEvent
 */
export type ForwardFailEvent = Message<"routerrpc.ForwardFailEvent"> & {};
/**
 * Describes the message routerrpc.ForwardFailEvent.
 * Use `create(ForwardFailEventSchema)` to create a new message.
 */
export declare const ForwardFailEventSchema: GenMessage<ForwardFailEvent>;
/**
 * @generated from message routerrpc.SettleEvent
 */
export type SettleEvent = Message<"routerrpc.SettleEvent"> & {
    /**
     * The revealed preimage.
     *
     * @generated from field: bytes preimage = 1;
     */
    preimage: Uint8Array;
};
/**
 * Describes the message routerrpc.SettleEvent.
 * Use `create(SettleEventSchema)` to create a new message.
 */
export declare const SettleEventSchema: GenMessage<SettleEvent>;
/**
 * @generated from message routerrpc.FinalHtlcEvent
 */
export type FinalHtlcEvent = Message<"routerrpc.FinalHtlcEvent"> & {
    /**
     * @generated from field: bool settled = 1;
     */
    settled: boolean;
    /**
     * @generated from field: bool offchain = 2;
     */
    offchain: boolean;
};
/**
 * Describes the message routerrpc.FinalHtlcEvent.
 * Use `create(FinalHtlcEventSchema)` to create a new message.
 */
export declare const FinalHtlcEventSchema: GenMessage<FinalHtlcEvent>;
/**
 * @generated from message routerrpc.SubscribedEvent
 */
export type SubscribedEvent = Message<"routerrpc.SubscribedEvent"> & {};
/**
 * Describes the message routerrpc.SubscribedEvent.
 * Use `create(SubscribedEventSchema)` to create a new message.
 */
export declare const SubscribedEventSchema: GenMessage<SubscribedEvent>;
/**
 * @generated from message routerrpc.LinkFailEvent
 */
export type LinkFailEvent = Message<"routerrpc.LinkFailEvent"> & {
    /**
     * Info contains details about the htlc that we failed.
     *
     * @generated from field: routerrpc.HtlcInfo info = 1;
     */
    info?: HtlcInfo;
    /**
     * FailureCode is the BOLT error code for the failure.
     *
     * @generated from field: lnrpc.Failure.FailureCode wire_failure = 2;
     */
    wireFailure: Failure_FailureCode;
    /**
     *
     * FailureDetail provides additional information about the reason for the
     * failure. This detail enriches the information provided by the wire message
     * and may be 'no detail' if the wire message requires no additional metadata.
     *
     * @generated from field: routerrpc.FailureDetail failure_detail = 3;
     */
    failureDetail: FailureDetail;
    /**
     * A string representation of the link failure.
     *
     * @generated from field: string failure_string = 4;
     */
    failureString: string;
};
/**
 * Describes the message routerrpc.LinkFailEvent.
 * Use `create(LinkFailEventSchema)` to create a new message.
 */
export declare const LinkFailEventSchema: GenMessage<LinkFailEvent>;
/**
 * @generated from message routerrpc.PaymentStatus
 */
export type PaymentStatus = Message<"routerrpc.PaymentStatus"> & {
    /**
     * Current state the payment is in.
     *
     * @generated from field: routerrpc.PaymentState state = 1;
     */
    state: PaymentState;
    /**
     *
     * The pre-image of the payment when state is SUCCEEDED.
     *
     * @generated from field: bytes preimage = 2;
     */
    preimage: Uint8Array;
    /**
     *
     * The HTLCs made in attempt to settle the payment [EXPERIMENTAL].
     *
     * @generated from field: repeated lnrpc.HTLCAttempt htlcs = 4;
     */
    htlcs: HTLCAttempt[];
};
/**
 * Describes the message routerrpc.PaymentStatus.
 * Use `create(PaymentStatusSchema)` to create a new message.
 */
export declare const PaymentStatusSchema: GenMessage<PaymentStatus>;
/**
 * @generated from message routerrpc.CircuitKey
 */
export type CircuitKey = Message<"routerrpc.CircuitKey"> & {
    /**
     * / The id of the channel that the is part of this circuit.
     *
     * @generated from field: uint64 chan_id = 1;
     */
    chanId: bigint;
    /**
     * / The index of the incoming htlc in the incoming channel.
     *
     * @generated from field: uint64 htlc_id = 2;
     */
    htlcId: bigint;
};
/**
 * Describes the message routerrpc.CircuitKey.
 * Use `create(CircuitKeySchema)` to create a new message.
 */
export declare const CircuitKeySchema: GenMessage<CircuitKey>;
/**
 * @generated from message routerrpc.ForwardHtlcInterceptRequest
 */
export type ForwardHtlcInterceptRequest = Message<"routerrpc.ForwardHtlcInterceptRequest"> & {
    /**
     *
     * The key of this forwarded htlc. It defines the incoming channel id and
     * the index in this channel.
     *
     * @generated from field: routerrpc.CircuitKey incoming_circuit_key = 1;
     */
    incomingCircuitKey?: CircuitKey;
    /**
     * The incoming htlc amount.
     *
     * @generated from field: uint64 incoming_amount_msat = 5;
     */
    incomingAmountMsat: bigint;
    /**
     * The incoming htlc expiry.
     *
     * @generated from field: uint32 incoming_expiry = 6;
     */
    incomingExpiry: number;
    /**
     *
     * The htlc payment hash. This value is not guaranteed to be unique per
     * request.
     *
     * @generated from field: bytes payment_hash = 2;
     */
    paymentHash: Uint8Array;
    /**
     * The requested outgoing channel id for this forwarded htlc. Because of
     * non-strict forwarding, this isn't necessarily the channel over which the
     * packet will be forwarded eventually. A different channel to the same peer
     * may be selected as well.
     *
     * @generated from field: uint64 outgoing_requested_chan_id = 7;
     */
    outgoingRequestedChanId: bigint;
    /**
     * The outgoing htlc amount.
     *
     * @generated from field: uint64 outgoing_amount_msat = 3;
     */
    outgoingAmountMsat: bigint;
    /**
     * The outgoing htlc expiry.
     *
     * @generated from field: uint32 outgoing_expiry = 4;
     */
    outgoingExpiry: number;
    /**
     * Any custom records that were present in the payload.
     *
     * @generated from field: map<uint64, bytes> custom_records = 8;
     */
    customRecords: {
        [key: string]: Uint8Array;
    };
    /**
     * The onion blob for the next hop
     *
     * @generated from field: bytes onion_blob = 9;
     */
    onionBlob: Uint8Array;
    /**
     * The block height at which this htlc will be auto-failed to prevent the
     * channel from force-closing.
     *
     * @generated from field: int32 auto_fail_height = 10;
     */
    autoFailHeight: number;
    /**
     * The custom records of the peer's incoming p2p wire message.
     *
     * @generated from field: map<uint64, bytes> in_wire_custom_records = 11;
     */
    inWireCustomRecords: {
        [key: string]: Uint8Array;
    };
};
/**
 * Describes the message routerrpc.ForwardHtlcInterceptRequest.
 * Use `create(ForwardHtlcInterceptRequestSchema)` to create a new message.
 */
export declare const ForwardHtlcInterceptRequestSchema: GenMessage<ForwardHtlcInterceptRequest>;
/**
 * *
 * ForwardHtlcInterceptResponse enables the caller to resolve a previously hold
 * forward. The caller can choose either to:
 * - `Resume`: Execute the default behavior (usually forward).
 * - `ResumeModified`: Execute the default behavior (usually forward) with HTLC
 * field modifications.
 * - `Reject`: Fail the htlc backwards.
 * - `Settle`: Settle this htlc with a given preimage.
 *
 * @generated from message routerrpc.ForwardHtlcInterceptResponse
 */
export type ForwardHtlcInterceptResponse = Message<"routerrpc.ForwardHtlcInterceptResponse"> & {
    /**
     * *
     * The key of this forwarded htlc. It defines the incoming channel id and
     * the index in this channel.
     *
     * @generated from field: routerrpc.CircuitKey incoming_circuit_key = 1;
     */
    incomingCircuitKey?: CircuitKey;
    /**
     * The resolve action for this intercepted htlc.
     *
     * @generated from field: routerrpc.ResolveHoldForwardAction action = 2;
     */
    action: ResolveHoldForwardAction;
    /**
     * The preimage in case the resolve action is Settle.
     *
     * @generated from field: bytes preimage = 3;
     */
    preimage: Uint8Array;
    /**
     * Encrypted failure message in case the resolve action is Fail.
     *
     * If failure_message is specified, the failure_code field must be set
     * to zero.
     *
     * @generated from field: bytes failure_message = 4;
     */
    failureMessage: Uint8Array;
    /**
     * Return the specified failure code in case the resolve action is Fail. The
     * message data fields are populated automatically.
     *
     * If a non-zero failure_code is specified, failure_message must not be set.
     *
     * For backwards-compatibility reasons, TEMPORARY_CHANNEL_FAILURE is the
     * default value for this field.
     *
     * @generated from field: lnrpc.Failure.FailureCode failure_code = 5;
     */
    failureCode: Failure_FailureCode;
    /**
     * The amount that was set on the p2p wire message of the incoming HTLC.
     * This field is ignored if the action is not RESUME_MODIFIED or the amount
     * is zero.
     *
     * @generated from field: uint64 in_amount_msat = 6;
     */
    inAmountMsat: bigint;
    /**
     * The amount to set on the p2p wire message of the resumed HTLC. This field
     * is ignored if the action is not RESUME_MODIFIED or the amount is zero.
     *
     * @generated from field: uint64 out_amount_msat = 7;
     */
    outAmountMsat: bigint;
    /**
     * Any custom records that should be set on the p2p wire message message of
     * the resumed HTLC. This field is ignored if the action is not
     * RESUME_MODIFIED.
     *
     * @generated from field: map<uint64, bytes> out_wire_custom_records = 8;
     */
    outWireCustomRecords: {
        [key: string]: Uint8Array;
    };
};
/**
 * Describes the message routerrpc.ForwardHtlcInterceptResponse.
 * Use `create(ForwardHtlcInterceptResponseSchema)` to create a new message.
 */
export declare const ForwardHtlcInterceptResponseSchema: GenMessage<ForwardHtlcInterceptResponse>;
/**
 * @generated from message routerrpc.UpdateChanStatusRequest
 */
export type UpdateChanStatusRequest = Message<"routerrpc.UpdateChanStatusRequest"> & {
    /**
     * @generated from field: lnrpc.ChannelPoint chan_point = 1;
     */
    chanPoint?: ChannelPoint;
    /**
     * @generated from field: routerrpc.ChanStatusAction action = 2;
     */
    action: ChanStatusAction;
};
/**
 * Describes the message routerrpc.UpdateChanStatusRequest.
 * Use `create(UpdateChanStatusRequestSchema)` to create a new message.
 */
export declare const UpdateChanStatusRequestSchema: GenMessage<UpdateChanStatusRequest>;
/**
 * @generated from message routerrpc.UpdateChanStatusResponse
 */
export type UpdateChanStatusResponse = Message<"routerrpc.UpdateChanStatusResponse"> & {};
/**
 * Describes the message routerrpc.UpdateChanStatusResponse.
 * Use `create(UpdateChanStatusResponseSchema)` to create a new message.
 */
export declare const UpdateChanStatusResponseSchema: GenMessage<UpdateChanStatusResponse>;
/**
 * @generated from message routerrpc.AddAliasesRequest
 */
export type AddAliasesRequest = Message<"routerrpc.AddAliasesRequest"> & {
    /**
     * @generated from field: repeated lnrpc.AliasMap alias_maps = 1;
     */
    aliasMaps: AliasMap[];
};
/**
 * Describes the message routerrpc.AddAliasesRequest.
 * Use `create(AddAliasesRequestSchema)` to create a new message.
 */
export declare const AddAliasesRequestSchema: GenMessage<AddAliasesRequest>;
/**
 * @generated from message routerrpc.AddAliasesResponse
 */
export type AddAliasesResponse = Message<"routerrpc.AddAliasesResponse"> & {
    /**
     * @generated from field: repeated lnrpc.AliasMap alias_maps = 1;
     */
    aliasMaps: AliasMap[];
};
/**
 * Describes the message routerrpc.AddAliasesResponse.
 * Use `create(AddAliasesResponseSchema)` to create a new message.
 */
export declare const AddAliasesResponseSchema: GenMessage<AddAliasesResponse>;
/**
 * @generated from message routerrpc.DeleteAliasesRequest
 */
export type DeleteAliasesRequest = Message<"routerrpc.DeleteAliasesRequest"> & {
    /**
     * @generated from field: repeated lnrpc.AliasMap alias_maps = 1;
     */
    aliasMaps: AliasMap[];
};
/**
 * Describes the message routerrpc.DeleteAliasesRequest.
 * Use `create(DeleteAliasesRequestSchema)` to create a new message.
 */
export declare const DeleteAliasesRequestSchema: GenMessage<DeleteAliasesRequest>;
/**
 * @generated from message routerrpc.DeleteAliasesResponse
 */
export type DeleteAliasesResponse = Message<"routerrpc.DeleteAliasesResponse"> & {
    /**
     * @generated from field: repeated lnrpc.AliasMap alias_maps = 1;
     */
    aliasMaps: AliasMap[];
};
/**
 * Describes the message routerrpc.DeleteAliasesResponse.
 * Use `create(DeleteAliasesResponseSchema)` to create a new message.
 */
export declare const DeleteAliasesResponseSchema: GenMessage<DeleteAliasesResponse>;
/**
 * @generated from enum routerrpc.FailureDetail
 */
export declare enum FailureDetail {
    /**
     * @generated from enum value: UNKNOWN = 0;
     */
    UNKNOWN = 0,
    /**
     * @generated from enum value: NO_DETAIL = 1;
     */
    NO_DETAIL = 1,
    /**
     * @generated from enum value: ONION_DECODE = 2;
     */
    ONION_DECODE = 2,
    /**
     * @generated from enum value: LINK_NOT_ELIGIBLE = 3;
     */
    LINK_NOT_ELIGIBLE = 3,
    /**
     * @generated from enum value: ON_CHAIN_TIMEOUT = 4;
     */
    ON_CHAIN_TIMEOUT = 4,
    /**
     * @generated from enum value: HTLC_EXCEEDS_MAX = 5;
     */
    HTLC_EXCEEDS_MAX = 5,
    /**
     * @generated from enum value: INSUFFICIENT_BALANCE = 6;
     */
    INSUFFICIENT_BALANCE = 6,
    /**
     * @generated from enum value: INCOMPLETE_FORWARD = 7;
     */
    INCOMPLETE_FORWARD = 7,
    /**
     * @generated from enum value: HTLC_ADD_FAILED = 8;
     */
    HTLC_ADD_FAILED = 8,
    /**
     * @generated from enum value: FORWARDS_DISABLED = 9;
     */
    FORWARDS_DISABLED = 9,
    /**
     * @generated from enum value: INVOICE_CANCELED = 10;
     */
    INVOICE_CANCELED = 10,
    /**
     * @generated from enum value: INVOICE_UNDERPAID = 11;
     */
    INVOICE_UNDERPAID = 11,
    /**
     * @generated from enum value: INVOICE_EXPIRY_TOO_SOON = 12;
     */
    INVOICE_EXPIRY_TOO_SOON = 12,
    /**
     * @generated from enum value: INVOICE_NOT_OPEN = 13;
     */
    INVOICE_NOT_OPEN = 13,
    /**
     * @generated from enum value: MPP_INVOICE_TIMEOUT = 14;
     */
    MPP_INVOICE_TIMEOUT = 14,
    /**
     * @generated from enum value: ADDRESS_MISMATCH = 15;
     */
    ADDRESS_MISMATCH = 15,
    /**
     * @generated from enum value: SET_TOTAL_MISMATCH = 16;
     */
    SET_TOTAL_MISMATCH = 16,
    /**
     * @generated from enum value: SET_TOTAL_TOO_LOW = 17;
     */
    SET_TOTAL_TOO_LOW = 17,
    /**
     * @generated from enum value: SET_OVERPAID = 18;
     */
    SET_OVERPAID = 18,
    /**
     * @generated from enum value: UNKNOWN_INVOICE = 19;
     */
    UNKNOWN_INVOICE = 19,
    /**
     * @generated from enum value: INVALID_KEYSEND = 20;
     */
    INVALID_KEYSEND = 20,
    /**
     * @generated from enum value: MPP_IN_PROGRESS = 21;
     */
    MPP_IN_PROGRESS = 21,
    /**
     * @generated from enum value: CIRCULAR_ROUTE = 22;
     */
    CIRCULAR_ROUTE = 22
}
/**
 * Describes the enum routerrpc.FailureDetail.
 */
export declare const FailureDetailSchema: GenEnum<FailureDetail>;
/**
 * @generated from enum routerrpc.PaymentState
 */
export declare enum PaymentState {
    /**
     *
     * Payment is still in flight.
     *
     * @generated from enum value: IN_FLIGHT = 0;
     */
    IN_FLIGHT = 0,
    /**
     *
     * Payment completed successfully.
     *
     * @generated from enum value: SUCCEEDED = 1;
     */
    SUCCEEDED = 1,
    /**
     *
     * There are more routes to try, but the payment timeout was exceeded.
     *
     * @generated from enum value: FAILED_TIMEOUT = 2;
     */
    FAILED_TIMEOUT = 2,
    /**
     *
     * All possible routes were tried and failed permanently. Or were no
     * routes to the destination at all.
     *
     * @generated from enum value: FAILED_NO_ROUTE = 3;
     */
    FAILED_NO_ROUTE = 3,
    /**
     *
     * A non-recoverable error has occurred.
     *
     * @generated from enum value: FAILED_ERROR = 4;
     */
    FAILED_ERROR = 4,
    /**
     *
     * Payment details incorrect (unknown hash, invalid amt or
     * invalid final cltv delta)
     *
     * @generated from enum value: FAILED_INCORRECT_PAYMENT_DETAILS = 5;
     */
    FAILED_INCORRECT_PAYMENT_DETAILS = 5,
    /**
     *
     * Insufficient local balance.
     *
     * @generated from enum value: FAILED_INSUFFICIENT_BALANCE = 6;
     */
    FAILED_INSUFFICIENT_BALANCE = 6
}
/**
 * Describes the enum routerrpc.PaymentState.
 */
export declare const PaymentStateSchema: GenEnum<PaymentState>;
/**
 * @generated from enum routerrpc.ResolveHoldForwardAction
 */
export declare enum ResolveHoldForwardAction {
    /**
     * SETTLE is an action that is used to settle an HTLC instead of forwarding
     * it.
     *
     * @generated from enum value: SETTLE = 0;
     */
    SETTLE = 0,
    /**
     * FAIL is an action that is used to fail an HTLC backwards.
     *
     * @generated from enum value: FAIL = 1;
     */
    FAIL = 1,
    /**
     * RESUME is an action that is used to resume a forward HTLC.
     *
     * @generated from enum value: RESUME = 2;
     */
    RESUME = 2,
    /**
     * RESUME_MODIFIED is an action that is used to resume a hold forward HTLC
     * with modifications specified during interception.
     *
     * @generated from enum value: RESUME_MODIFIED = 3;
     */
    RESUME_MODIFIED = 3
}
/**
 * Describes the enum routerrpc.ResolveHoldForwardAction.
 */
export declare const ResolveHoldForwardActionSchema: GenEnum<ResolveHoldForwardAction>;
/**
 * @generated from enum routerrpc.ChanStatusAction
 */
export declare enum ChanStatusAction {
    /**
     * @generated from enum value: ENABLE = 0;
     */
    ENABLE = 0,
    /**
     * @generated from enum value: DISABLE = 1;
     */
    DISABLE = 1,
    /**
     * @generated from enum value: AUTO = 2;
     */
    AUTO = 2
}
/**
 * Describes the enum routerrpc.ChanStatusAction.
 */
export declare const ChanStatusActionSchema: GenEnum<ChanStatusAction>;
/**
 * Router is a service that offers advanced interaction with the router
 * subsystem of the daemon.
 *
 * @generated from service routerrpc.Router
 */
export declare const Router: GenService<{
    /**
     *
     * SendPaymentV2 attempts to route a payment described by the passed
     * PaymentRequest to the final destination. The call returns a stream of
     * payment updates. When using this RPC, make sure to set a fee limit, as the
     * default routing fee limit is 0 sats. Without a non-zero fee limit only
     * routes without fees will be attempted which often fails with
     * FAILURE_REASON_NO_ROUTE.
     *
     * @generated from rpc routerrpc.Router.SendPaymentV2
     */
    sendPaymentV2: {
        methodKind: "server_streaming";
        input: typeof SendPaymentRequestSchema;
        output: typeof PaymentSchema;
    };
    /**
     * lncli: `trackpayment`
     * TrackPaymentV2 returns an update stream for the payment identified by the
     * payment hash.
     *
     * @generated from rpc routerrpc.Router.TrackPaymentV2
     */
    trackPaymentV2: {
        methodKind: "server_streaming";
        input: typeof TrackPaymentRequestSchema;
        output: typeof PaymentSchema;
    };
    /**
     *
     * TrackPayments returns an update stream for every payment that is not in a
     * terminal state. Note that if payments are in-flight while starting a new
     * subscription, the start of the payment stream could produce out-of-order
     * and/or duplicate events. In order to get updates for every in-flight
     * payment attempt make sure to subscribe to this method before initiating any
     * payments.
     *
     * @generated from rpc routerrpc.Router.TrackPayments
     */
    trackPayments: {
        methodKind: "server_streaming";
        input: typeof TrackPaymentsRequestSchema;
        output: typeof PaymentSchema;
    };
    /**
     *
     * EstimateRouteFee allows callers to obtain a lower bound w.r.t how much it
     * may cost to send an HTLC to the target end destination.
     *
     * @generated from rpc routerrpc.Router.EstimateRouteFee
     */
    estimateRouteFee: {
        methodKind: "unary";
        input: typeof RouteFeeRequestSchema;
        output: typeof RouteFeeResponseSchema;
    };
    /**
     *
     * Deprecated, use SendToRouteV2. SendToRoute attempts to make a payment via
     * the specified route. This method differs from SendPayment in that it
     * allows users to specify a full route manually. This can be used for
     * things like rebalancing, and atomic swaps. It differs from the newer
     * SendToRouteV2 in that it doesn't return the full HTLC information.
     *
     * @generated from rpc routerrpc.Router.SendToRoute
     * @deprecated
     */
    sendToRoute: {
        methodKind: "unary";
        input: typeof SendToRouteRequestSchema;
        output: typeof SendToRouteResponseSchema;
    };
    /**
     *
     * SendToRouteV2 attempts to make a payment via the specified route. This
     * method differs from SendPayment in that it allows users to specify a full
     * route manually. This can be used for things like rebalancing, and atomic
     * swaps.
     *
     * @generated from rpc routerrpc.Router.SendToRouteV2
     */
    sendToRouteV2: {
        methodKind: "unary";
        input: typeof SendToRouteRequestSchema;
        output: typeof HTLCAttemptSchema;
    };
    /**
     * lncli: `resetmc`
     * ResetMissionControl clears all mission control state and starts with a clean
     * slate.
     *
     * @generated from rpc routerrpc.Router.ResetMissionControl
     */
    resetMissionControl: {
        methodKind: "unary";
        input: typeof ResetMissionControlRequestSchema;
        output: typeof ResetMissionControlResponseSchema;
    };
    /**
     * lncli: `querymc`
     * QueryMissionControl exposes the internal mission control state to callers.
     * It is a development feature.
     *
     * @generated from rpc routerrpc.Router.QueryMissionControl
     */
    queryMissionControl: {
        methodKind: "unary";
        input: typeof QueryMissionControlRequestSchema;
        output: typeof QueryMissionControlResponseSchema;
    };
    /**
     * lncli: `importmc`
     * XImportMissionControl is an experimental API that imports the state provided
     * to the internal mission control's state, using all results which are more
     * recent than our existing values. These values will only be imported
     * in-memory, and will not be persisted across restarts.
     *
     * @generated from rpc routerrpc.Router.XImportMissionControl
     */
    xImportMissionControl: {
        methodKind: "unary";
        input: typeof XImportMissionControlRequestSchema;
        output: typeof XImportMissionControlResponseSchema;
    };
    /**
     * lncli: `getmccfg`
     * GetMissionControlConfig returns mission control's current config.
     *
     * @generated from rpc routerrpc.Router.GetMissionControlConfig
     */
    getMissionControlConfig: {
        methodKind: "unary";
        input: typeof GetMissionControlConfigRequestSchema;
        output: typeof GetMissionControlConfigResponseSchema;
    };
    /**
     * lncli: `setmccfg`
     * SetMissionControlConfig will set mission control's config, if the config
     * provided is valid.
     *
     * @generated from rpc routerrpc.Router.SetMissionControlConfig
     */
    setMissionControlConfig: {
        methodKind: "unary";
        input: typeof SetMissionControlConfigRequestSchema;
        output: typeof SetMissionControlConfigResponseSchema;
    };
    /**
     * lncli: `queryprob`
     * Deprecated. QueryProbability returns the current success probability
     * estimate for a given node pair and amount. The call returns a zero success
     * probability if no channel is available or if the amount violates min/max
     * HTLC constraints.
     *
     * @generated from rpc routerrpc.Router.QueryProbability
     */
    queryProbability: {
        methodKind: "unary";
        input: typeof QueryProbabilityRequestSchema;
        output: typeof QueryProbabilityResponseSchema;
    };
    /**
     * lncli: `buildroute`
     * BuildRoute builds a fully specified route based on a list of hop public
     * keys. It retrieves the relevant channel policies from the graph in order to
     * calculate the correct fees and time locks.
     * Note that LND will use its default final_cltv_delta if no value is supplied.
     * Make sure to add the correct final_cltv_delta depending on the invoice
     * restriction. Moreover the caller has to make sure to provide the
     * payment_addr if the route is paying an invoice which signaled it.
     *
     * @generated from rpc routerrpc.Router.BuildRoute
     */
    buildRoute: {
        methodKind: "unary";
        input: typeof BuildRouteRequestSchema;
        output: typeof BuildRouteResponseSchema;
    };
    /**
     *
     * SubscribeHtlcEvents creates a uni-directional stream from the server to
     * the client which delivers a stream of htlc events.
     *
     * @generated from rpc routerrpc.Router.SubscribeHtlcEvents
     */
    subscribeHtlcEvents: {
        methodKind: "server_streaming";
        input: typeof SubscribeHtlcEventsRequestSchema;
        output: typeof HtlcEventSchema;
    };
    /**
     *
     * Deprecated, use SendPaymentV2. SendPayment attempts to route a payment
     * described by the passed PaymentRequest to the final destination. The call
     * returns a stream of payment status updates.
     *
     * @generated from rpc routerrpc.Router.SendPayment
     * @deprecated
     */
    sendPayment: {
        methodKind: "server_streaming";
        input: typeof SendPaymentRequestSchema;
        output: typeof PaymentStatusSchema;
    };
    /**
     *
     * Deprecated, use TrackPaymentV2. TrackPayment returns an update stream for
     * the payment identified by the payment hash.
     *
     * @generated from rpc routerrpc.Router.TrackPayment
     * @deprecated
     */
    trackPayment: {
        methodKind: "server_streaming";
        input: typeof TrackPaymentRequestSchema;
        output: typeof PaymentStatusSchema;
    };
    /**
     * *
     * HtlcInterceptor dispatches a bi-directional streaming RPC in which
     * Forwarded HTLC requests are sent to the client and the client responds with
     * a boolean that tells LND if this htlc should be intercepted.
     * In case of interception, the htlc can be either settled, cancelled or
     * resumed later by using the ResolveHoldForward endpoint.
     *
     * @generated from rpc routerrpc.Router.HtlcInterceptor
     */
    htlcInterceptor: {
        methodKind: "bidi_streaming";
        input: typeof ForwardHtlcInterceptResponseSchema;
        output: typeof ForwardHtlcInterceptRequestSchema;
    };
    /**
     * lncli: `updatechanstatus`
     * UpdateChanStatus attempts to manually set the state of a channel
     * (enabled, disabled, or auto). A manual "disable" request will cause the
     * channel to stay disabled until a subsequent manual request of either
     * "enable" or "auto".
     *
     * @generated from rpc routerrpc.Router.UpdateChanStatus
     */
    updateChanStatus: {
        methodKind: "unary";
        input: typeof UpdateChanStatusRequestSchema;
        output: typeof UpdateChanStatusResponseSchema;
    };
    /**
     *
     * XAddLocalChanAliases is an experimental API that creates a set of new
     * channel SCID alias mappings. The final total set of aliases in the manager
     * after the add operation is returned. This is only a locally stored alias,
     * and will not be communicated to the channel peer via any message. Therefore,
     * routing over such an alias will only work if the peer also calls this same
     * RPC on their end. If an alias already exists, an error is returned
     *
     * @generated from rpc routerrpc.Router.XAddLocalChanAliases
     */
    xAddLocalChanAliases: {
        methodKind: "unary";
        input: typeof AddAliasesRequestSchema;
        output: typeof AddAliasesResponseSchema;
    };
    /**
     *
     * XDeleteLocalChanAliases is an experimental API that deletes a set of alias
     * mappings. The final total set of aliases in the manager after the delete
     * operation is returned. The deletion will not be communicated to the channel
     * peer via any message.
     *
     * @generated from rpc routerrpc.Router.XDeleteLocalChanAliases
     */
    xDeleteLocalChanAliases: {
        methodKind: "unary";
        input: typeof DeleteAliasesRequestSchema;
        output: typeof DeleteAliasesResponseSchema;
    };
}>;
//# sourceMappingURL=router_pb.d.ts.map