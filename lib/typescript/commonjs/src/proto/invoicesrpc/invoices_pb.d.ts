import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Invoice, InvoiceSchema, RouteHint } from "../lightning_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file invoicesrpc/invoices.proto.
 */
export declare const file_invoicesrpc_invoices: GenFile;
/**
 * @generated from message invoicesrpc.CancelInvoiceMsg
 */
export type CancelInvoiceMsg = Message<"invoicesrpc.CancelInvoiceMsg"> & {
    /**
     * Hash corresponding to the (hold) invoice to cancel. When using
     * REST, this field must be encoded as base64.
     *
     * @generated from field: bytes payment_hash = 1;
     */
    paymentHash: Uint8Array;
};
/**
 * Describes the message invoicesrpc.CancelInvoiceMsg.
 * Use `create(CancelInvoiceMsgSchema)` to create a new message.
 */
export declare const CancelInvoiceMsgSchema: GenMessage<CancelInvoiceMsg>;
/**
 * @generated from message invoicesrpc.CancelInvoiceResp
 */
export type CancelInvoiceResp = Message<"invoicesrpc.CancelInvoiceResp"> & {};
/**
 * Describes the message invoicesrpc.CancelInvoiceResp.
 * Use `create(CancelInvoiceRespSchema)` to create a new message.
 */
export declare const CancelInvoiceRespSchema: GenMessage<CancelInvoiceResp>;
/**
 * @generated from message invoicesrpc.AddHoldInvoiceRequest
 */
export type AddHoldInvoiceRequest = Message<"invoicesrpc.AddHoldInvoiceRequest"> & {
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
     * The hash of the preimage
     *
     * @generated from field: bytes hash = 2;
     */
    hash: Uint8Array;
    /**
     *
     * The value of this invoice in satoshis
     *
     * The fields value and value_msat are mutually exclusive.
     *
     * @generated from field: int64 value = 3;
     */
    value: bigint;
    /**
     *
     * The value of this invoice in millisatoshis
     *
     * The fields value and value_msat are mutually exclusive.
     *
     * @generated from field: int64 value_msat = 10;
     */
    valueMsat: bigint;
    /**
     *
     * Hash (SHA-256) of a description of the payment. Used if the description of
     * payment (memo) is too long to naturally fit within the description field
     * of an encoded payment request.
     *
     * @generated from field: bytes description_hash = 4;
     */
    descriptionHash: Uint8Array;
    /**
     * Payment request expiry time in seconds. Default is 86400 (24 hours).
     *
     * @generated from field: int64 expiry = 5;
     */
    expiry: bigint;
    /**
     * Fallback on-chain address.
     *
     * @generated from field: string fallback_addr = 6;
     */
    fallbackAddr: string;
    /**
     * Delta to use for the time-lock of the CLTV extended to the final hop.
     *
     * @generated from field: uint64 cltv_expiry = 7;
     */
    cltvExpiry: bigint;
    /**
     *
     * Route hints that can each be individually used to assist in reaching the
     * invoice's destination.
     *
     * @generated from field: repeated lnrpc.RouteHint route_hints = 8;
     */
    routeHints: RouteHint[];
    /**
     * Whether this invoice should include routing hints for private channels.
     *
     * @generated from field: bool private = 9;
     */
    private: boolean;
};
/**
 * Describes the message invoicesrpc.AddHoldInvoiceRequest.
 * Use `create(AddHoldInvoiceRequestSchema)` to create a new message.
 */
export declare const AddHoldInvoiceRequestSchema: GenMessage<AddHoldInvoiceRequest>;
/**
 * @generated from message invoicesrpc.AddHoldInvoiceResp
 */
export type AddHoldInvoiceResp = Message<"invoicesrpc.AddHoldInvoiceResp"> & {
    /**
     *
     * A bare-bones invoice for a payment within the Lightning Network. With the
     * details of the invoice, the sender has all the data necessary to send a
     * payment to the recipient.
     *
     * @generated from field: string payment_request = 1;
     */
    paymentRequest: string;
    /**
     *
     * The "add" index of this invoice. Each newly created invoice will increment
     * this index making it monotonically increasing. Callers to the
     * SubscribeInvoices call can use this to instantly get notified of all added
     * invoices with an add_index greater than this one.
     *
     * @generated from field: uint64 add_index = 2;
     */
    addIndex: bigint;
    /**
     *
     * The payment address of the generated invoice. This is also called
     * the payment secret in specifications (e.g. BOLT 11). This value should
     * be used in all payments for this invoice as we require it for end to end
     * security.
     *
     * @generated from field: bytes payment_addr = 3;
     */
    paymentAddr: Uint8Array;
};
/**
 * Describes the message invoicesrpc.AddHoldInvoiceResp.
 * Use `create(AddHoldInvoiceRespSchema)` to create a new message.
 */
export declare const AddHoldInvoiceRespSchema: GenMessage<AddHoldInvoiceResp>;
/**
 * @generated from message invoicesrpc.SettleInvoiceMsg
 */
export type SettleInvoiceMsg = Message<"invoicesrpc.SettleInvoiceMsg"> & {
    /**
     * Externally discovered pre-image that should be used to settle the hold
     * invoice.
     *
     * @generated from field: bytes preimage = 1;
     */
    preimage: Uint8Array;
};
/**
 * Describes the message invoicesrpc.SettleInvoiceMsg.
 * Use `create(SettleInvoiceMsgSchema)` to create a new message.
 */
export declare const SettleInvoiceMsgSchema: GenMessage<SettleInvoiceMsg>;
/**
 * @generated from message invoicesrpc.SettleInvoiceResp
 */
export type SettleInvoiceResp = Message<"invoicesrpc.SettleInvoiceResp"> & {};
/**
 * Describes the message invoicesrpc.SettleInvoiceResp.
 * Use `create(SettleInvoiceRespSchema)` to create a new message.
 */
export declare const SettleInvoiceRespSchema: GenMessage<SettleInvoiceResp>;
/**
 * @generated from message invoicesrpc.SubscribeSingleInvoiceRequest
 */
export type SubscribeSingleInvoiceRequest = Message<"invoicesrpc.SubscribeSingleInvoiceRequest"> & {
    /**
     * Hash corresponding to the (hold) invoice to subscribe to. When using
     * REST, this field must be encoded as base64url.
     *
     * @generated from field: bytes r_hash = 2;
     */
    rHash: Uint8Array;
};
/**
 * Describes the message invoicesrpc.SubscribeSingleInvoiceRequest.
 * Use `create(SubscribeSingleInvoiceRequestSchema)` to create a new message.
 */
export declare const SubscribeSingleInvoiceRequestSchema: GenMessage<SubscribeSingleInvoiceRequest>;
/**
 * @generated from message invoicesrpc.LookupInvoiceMsg
 */
export type LookupInvoiceMsg = Message<"invoicesrpc.LookupInvoiceMsg"> & {
    /**
     * @generated from oneof invoicesrpc.LookupInvoiceMsg.invoice_ref
     */
    invoiceRef: {
        /**
         * When using REST, this field must be encoded as base64.
         *
         * @generated from field: bytes payment_hash = 1;
         */
        value: Uint8Array;
        case: "paymentHash";
    } | {
        /**
         * @generated from field: bytes payment_addr = 2;
         */
        value: Uint8Array;
        case: "paymentAddr";
    } | {
        /**
         * @generated from field: bytes set_id = 3;
         */
        value: Uint8Array;
        case: "setId";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * @generated from field: invoicesrpc.LookupModifier lookup_modifier = 4;
     */
    lookupModifier: LookupModifier;
};
/**
 * Describes the message invoicesrpc.LookupInvoiceMsg.
 * Use `create(LookupInvoiceMsgSchema)` to create a new message.
 */
export declare const LookupInvoiceMsgSchema: GenMessage<LookupInvoiceMsg>;
/**
 * CircuitKey is a unique identifier for an HTLC.
 *
 * @generated from message invoicesrpc.CircuitKey
 */
export type CircuitKey = Message<"invoicesrpc.CircuitKey"> & {
    /**
     * The id of the channel that the is part of this circuit.
     *
     * @generated from field: uint64 chan_id = 1;
     */
    chanId: bigint;
    /**
     * The index of the incoming htlc in the incoming channel.
     *
     * @generated from field: uint64 htlc_id = 2;
     */
    htlcId: bigint;
};
/**
 * Describes the message invoicesrpc.CircuitKey.
 * Use `create(CircuitKeySchema)` to create a new message.
 */
export declare const CircuitKeySchema: GenMessage<CircuitKey>;
/**
 * @generated from message invoicesrpc.HtlcModifyRequest
 */
export type HtlcModifyRequest = Message<"invoicesrpc.HtlcModifyRequest"> & {
    /**
     * The invoice the intercepted HTLC is attempting to settle. The HTLCs in
     * the invoice are only HTLCs that have already been accepted or settled,
     * not including the current intercepted HTLC.
     *
     * @generated from field: lnrpc.Invoice invoice = 1;
     */
    invoice?: Invoice;
    /**
     * The unique identifier of the HTLC of this intercepted HTLC.
     *
     * @generated from field: invoicesrpc.CircuitKey exit_htlc_circuit_key = 2;
     */
    exitHtlcCircuitKey?: CircuitKey;
    /**
     * The amount in milli-satoshi that the exit HTLC is attempting to pay.
     *
     * @generated from field: uint64 exit_htlc_amt = 3;
     */
    exitHtlcAmt: bigint;
    /**
     * The absolute expiry height of the exit HTLC.
     *
     * @generated from field: uint32 exit_htlc_expiry = 4;
     */
    exitHtlcExpiry: number;
    /**
     * The current block height.
     *
     * @generated from field: uint32 current_height = 5;
     */
    currentHeight: number;
    /**
     * The wire message custom records of the exit HTLC.
     *
     * @generated from field: map<uint64, bytes> exit_htlc_wire_custom_records = 6;
     */
    exitHtlcWireCustomRecords: {
        [key: string]: Uint8Array;
    };
};
/**
 * Describes the message invoicesrpc.HtlcModifyRequest.
 * Use `create(HtlcModifyRequestSchema)` to create a new message.
 */
export declare const HtlcModifyRequestSchema: GenMessage<HtlcModifyRequest>;
/**
 * @generated from message invoicesrpc.HtlcModifyResponse
 */
export type HtlcModifyResponse = Message<"invoicesrpc.HtlcModifyResponse"> & {
    /**
     * The circuit key of the HTLC that the client wants to modify.
     *
     * @generated from field: invoicesrpc.CircuitKey circuit_key = 1;
     */
    circuitKey?: CircuitKey;
    /**
     * The modified amount in milli-satoshi that the exit HTLC is paying. This
     * value can be different from the actual on-chain HTLC amount, in case the
     * HTLC carries other valuable items, as can be the case with custom channel
     * types.
     *
     * @generated from field: optional uint64 amt_paid = 2;
     */
    amtPaid?: bigint;
    /**
     * This flag indicates whether the HTLCs associated with the invoices should
     * be cancelled. The interceptor client may set this field if some
     * unexpected behavior is encountered. Setting this will ignore the amt_paid
     * field.
     *
     * @generated from field: bool cancel_set = 3;
     */
    cancelSet: boolean;
};
/**
 * Describes the message invoicesrpc.HtlcModifyResponse.
 * Use `create(HtlcModifyResponseSchema)` to create a new message.
 */
export declare const HtlcModifyResponseSchema: GenMessage<HtlcModifyResponse>;
/**
 * @generated from enum invoicesrpc.LookupModifier
 */
export declare enum LookupModifier {
    /**
     * The default look up modifier, no look up behavior is changed.
     *
     * @generated from enum value: DEFAULT = 0;
     */
    DEFAULT = 0,
    /**
     *
     * Indicates that when a look up is done based on a set_id, then only that set
     * of HTLCs related to that set ID should be returned.
     *
     * @generated from enum value: HTLC_SET_ONLY = 1;
     */
    HTLC_SET_ONLY = 1,
    /**
     *
     * Indicates that when a look up is done using a payment_addr, then no HTLCs
     * related to the payment_addr should be returned. This is useful when one
     * wants to be able to obtain the set of associated setIDs with a given
     * invoice, then look up the sub-invoices "projected" by that set ID.
     *
     * @generated from enum value: HTLC_SET_BLANK = 2;
     */
    HTLC_SET_BLANK = 2
}
/**
 * Describes the enum invoicesrpc.LookupModifier.
 */
export declare const LookupModifierSchema: GenEnum<LookupModifier>;
/**
 * Invoices is a service that can be used to create, accept, settle and cancel
 * invoices.
 *
 * @generated from service invoicesrpc.Invoices
 */
export declare const Invoices: GenService<{
    /**
     *
     * SubscribeSingleInvoice returns a uni-directional stream (server -> client)
     * to notify the client of state transitions of the specified invoice.
     * Initially the current invoice state is always sent out.
     *
     * @generated from rpc invoicesrpc.Invoices.SubscribeSingleInvoice
     */
    subscribeSingleInvoice: {
        methodKind: "server_streaming";
        input: typeof SubscribeSingleInvoiceRequestSchema;
        output: typeof InvoiceSchema;
    };
    /**
     * lncli: `cancelinvoice`
     * CancelInvoice cancels a currently open invoice. If the invoice is already
     * canceled, this call will succeed. If the invoice is already settled, it will
     * fail.
     *
     * @generated from rpc invoicesrpc.Invoices.CancelInvoice
     */
    cancelInvoice: {
        methodKind: "unary";
        input: typeof CancelInvoiceMsgSchema;
        output: typeof CancelInvoiceRespSchema;
    };
    /**
     * lncli: `addholdinvoice`
     * AddHoldInvoice creates a hold invoice. It ties the invoice to the hash
     * supplied in the request.
     *
     * @generated from rpc invoicesrpc.Invoices.AddHoldInvoice
     */
    addHoldInvoice: {
        methodKind: "unary";
        input: typeof AddHoldInvoiceRequestSchema;
        output: typeof AddHoldInvoiceRespSchema;
    };
    /**
     * lncli: `settleinvoice`
     * SettleInvoice settles an accepted invoice. If the invoice is already
     * settled, this call will succeed.
     *
     * @generated from rpc invoicesrpc.Invoices.SettleInvoice
     */
    settleInvoice: {
        methodKind: "unary";
        input: typeof SettleInvoiceMsgSchema;
        output: typeof SettleInvoiceRespSchema;
    };
    /**
     *
     * LookupInvoiceV2 attempts to look up at invoice. An invoice can be referenced
     * using either its payment hash, payment address, or set ID.
     *
     * @generated from rpc invoicesrpc.Invoices.LookupInvoiceV2
     */
    lookupInvoiceV2: {
        methodKind: "unary";
        input: typeof LookupInvoiceMsgSchema;
        output: typeof InvoiceSchema;
    };
    /**
     *
     * HtlcModifier is a bidirectional streaming RPC that allows a client to
     * intercept and modify the HTLCs that attempt to settle the given invoice. The
     * server will send HTLCs of invoices to the client and the client can modify
     * some aspects of the HTLC in order to pass the invoice acceptance tests.
     *
     * @generated from rpc invoicesrpc.Invoices.HtlcModifier
     */
    htlcModifier: {
        methodKind: "bidi_streaming";
        input: typeof HtlcModifyResponseSchema;
        output: typeof HtlcModifyRequestSchema;
    };
}>;
//# sourceMappingURL=invoices_pb.d.ts.map