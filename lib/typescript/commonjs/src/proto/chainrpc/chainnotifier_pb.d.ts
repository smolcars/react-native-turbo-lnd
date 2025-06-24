import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file chainrpc/chainnotifier.proto.
 */
export declare const file_chainrpc_chainnotifier: GenFile;
/**
 * @generated from message chainrpc.ConfRequest
 */
export type ConfRequest = Message<"chainrpc.ConfRequest"> & {
    /**
     *
     * The transaction hash for which we should request a confirmation notification
     * for. If set to a hash of all zeros, then the confirmation notification will
     * be requested for the script instead.
     *
     * @generated from field: bytes txid = 1;
     */
    txid: Uint8Array;
    /**
     *
     * An output script within a transaction with the hash above which will be used
     * by light clients to match block filters. If the transaction hash is set to a
     * hash of all zeros, then a confirmation notification will be requested for
     * this script instead.
     *
     * @generated from field: bytes script = 2;
     */
    script: Uint8Array;
    /**
     *
     * The number of desired confirmations the transaction/output script should
     * reach before dispatching a confirmation notification.
     *
     * @generated from field: uint32 num_confs = 3;
     */
    numConfs: number;
    /**
     *
     * The earliest height in the chain for which the transaction/output script
     * could have been included in a block. This should in most cases be set to the
     * broadcast height of the transaction/output script.
     *
     * @generated from field: uint32 height_hint = 4;
     */
    heightHint: number;
    /**
     *
     * If true, then the block that mines the specified txid/script will be
     * included in eventual the notification event.
     *
     * @generated from field: bool include_block = 5;
     */
    includeBlock: boolean;
};
/**
 * Describes the message chainrpc.ConfRequest.
 * Use `create(ConfRequestSchema)` to create a new message.
 */
export declare const ConfRequestSchema: GenMessage<ConfRequest>;
/**
 * @generated from message chainrpc.ConfDetails
 */
export type ConfDetails = Message<"chainrpc.ConfDetails"> & {
    /**
     * The raw bytes of the confirmed transaction.
     *
     * @generated from field: bytes raw_tx = 1;
     */
    rawTx: Uint8Array;
    /**
     * The hash of the block in which the confirmed transaction was included in.
     *
     * @generated from field: bytes block_hash = 2;
     */
    blockHash: Uint8Array;
    /**
     * The height of the block in which the confirmed transaction was included
     * in.
     *
     * @generated from field: uint32 block_height = 3;
     */
    blockHeight: number;
    /**
     * The index of the confirmed transaction within the block.
     *
     * @generated from field: uint32 tx_index = 4;
     */
    txIndex: number;
    /**
     *
     * The raw bytes of the block that mined the transaction. Only included if
     * include_block was set in the request.
     *
     * @generated from field: bytes raw_block = 5;
     */
    rawBlock: Uint8Array;
};
/**
 * Describes the message chainrpc.ConfDetails.
 * Use `create(ConfDetailsSchema)` to create a new message.
 */
export declare const ConfDetailsSchema: GenMessage<ConfDetails>;
/**
 * TODO(wilmer): need to know how the client will use this first.
 *
 * @generated from message chainrpc.Reorg
 */
export type Reorg = Message<"chainrpc.Reorg"> & {};
/**
 * Describes the message chainrpc.Reorg.
 * Use `create(ReorgSchema)` to create a new message.
 */
export declare const ReorgSchema: GenMessage<Reorg>;
/**
 * @generated from message chainrpc.ConfEvent
 */
export type ConfEvent = Message<"chainrpc.ConfEvent"> & {
    /**
     * @generated from oneof chainrpc.ConfEvent.event
     */
    event: {
        /**
         *
         * An event that includes the confirmation details of the request
         * (txid/ouput script).
         *
         * @generated from field: chainrpc.ConfDetails conf = 1;
         */
        value: ConfDetails;
        case: "conf";
    } | {
        /**
         *
         * An event send when the transaction of the request is reorged out of the
         * chain.
         *
         * @generated from field: chainrpc.Reorg reorg = 2;
         */
        value: Reorg;
        case: "reorg";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message chainrpc.ConfEvent.
 * Use `create(ConfEventSchema)` to create a new message.
 */
export declare const ConfEventSchema: GenMessage<ConfEvent>;
/**
 * @generated from message chainrpc.Outpoint
 */
export type Outpoint = Message<"chainrpc.Outpoint"> & {
    /**
     * The hash of the transaction.
     *
     * @generated from field: bytes hash = 1;
     */
    hash: Uint8Array;
    /**
     * The index of the output within the transaction.
     *
     * @generated from field: uint32 index = 2;
     */
    index: number;
};
/**
 * Describes the message chainrpc.Outpoint.
 * Use `create(OutpointSchema)` to create a new message.
 */
export declare const OutpointSchema: GenMessage<Outpoint>;
/**
 * @generated from message chainrpc.SpendRequest
 */
export type SpendRequest = Message<"chainrpc.SpendRequest"> & {
    /**
     *
     * The outpoint for which we should request a spend notification for. If set to
     * a zero outpoint, then the spend notification will be requested for the
     * script instead. A zero or nil outpoint is not supported for Taproot spends
     * because the output script cannot reliably be computed from the witness alone
     * and the spent output script is not always available in the rescan context.
     * So an outpoint must _always_ be specified when registering a spend
     * notification for a Taproot output.
     *
     * @generated from field: chainrpc.Outpoint outpoint = 1;
     */
    outpoint?: Outpoint;
    /**
     *
     * The output script for the outpoint above. This will be used by light clients
     * to match block filters. If the outpoint is set to a zero outpoint, then a
     * spend notification will be requested for this script instead.
     *
     * @generated from field: bytes script = 2;
     */
    script: Uint8Array;
    /**
     *
     * The earliest height in the chain for which the outpoint/output script could
     * have been spent. This should in most cases be set to the broadcast height of
     * the outpoint/output script.
     *
     * @generated from field: uint32 height_hint = 3;
     */
    heightHint: number;
};
/**
 * Describes the message chainrpc.SpendRequest.
 * Use `create(SpendRequestSchema)` to create a new message.
 */
export declare const SpendRequestSchema: GenMessage<SpendRequest>;
/**
 * @generated from message chainrpc.SpendDetails
 */
export type SpendDetails = Message<"chainrpc.SpendDetails"> & {
    /**
     * The outpoint was that spent.
     *
     * @generated from field: chainrpc.Outpoint spending_outpoint = 1;
     */
    spendingOutpoint?: Outpoint;
    /**
     * The raw bytes of the spending transaction.
     *
     * @generated from field: bytes raw_spending_tx = 2;
     */
    rawSpendingTx: Uint8Array;
    /**
     * The hash of the spending transaction.
     *
     * @generated from field: bytes spending_tx_hash = 3;
     */
    spendingTxHash: Uint8Array;
    /**
     * The input of the spending transaction that fulfilled the spend request.
     *
     * @generated from field: uint32 spending_input_index = 4;
     */
    spendingInputIndex: number;
    /**
     * The height at which the spending transaction was included in a block.
     *
     * @generated from field: uint32 spending_height = 5;
     */
    spendingHeight: number;
};
/**
 * Describes the message chainrpc.SpendDetails.
 * Use `create(SpendDetailsSchema)` to create a new message.
 */
export declare const SpendDetailsSchema: GenMessage<SpendDetails>;
/**
 * @generated from message chainrpc.SpendEvent
 */
export type SpendEvent = Message<"chainrpc.SpendEvent"> & {
    /**
     * @generated from oneof chainrpc.SpendEvent.event
     */
    event: {
        /**
         *
         * An event that includes the details of the spending transaction of the
         * request (outpoint/output script).
         *
         * @generated from field: chainrpc.SpendDetails spend = 1;
         */
        value: SpendDetails;
        case: "spend";
    } | {
        /**
         *
         * An event sent when the spending transaction of the request was
         * reorged out of the chain.
         *
         * @generated from field: chainrpc.Reorg reorg = 2;
         */
        value: Reorg;
        case: "reorg";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message chainrpc.SpendEvent.
 * Use `create(SpendEventSchema)` to create a new message.
 */
export declare const SpendEventSchema: GenMessage<SpendEvent>;
/**
 * @generated from message chainrpc.BlockEpoch
 */
export type BlockEpoch = Message<"chainrpc.BlockEpoch"> & {
    /**
     * The hash of the block.
     *
     * @generated from field: bytes hash = 1;
     */
    hash: Uint8Array;
    /**
     * The height of the block.
     *
     * @generated from field: uint32 height = 2;
     */
    height: number;
};
/**
 * Describes the message chainrpc.BlockEpoch.
 * Use `create(BlockEpochSchema)` to create a new message.
 */
export declare const BlockEpochSchema: GenMessage<BlockEpoch>;
/**
 * ChainNotifier is a service that can be used to get information about the
 * chain backend by registering notifiers for chain events.
 *
 * @generated from service chainrpc.ChainNotifier
 */
export declare const ChainNotifier: GenService<{
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
     * @generated from rpc chainrpc.ChainNotifier.RegisterConfirmationsNtfn
     */
    registerConfirmationsNtfn: {
        methodKind: "server_streaming";
        input: typeof ConfRequestSchema;
        output: typeof ConfEventSchema;
    };
    /**
     *
     * RegisterSpendNtfn is a synchronous response-streaming RPC that registers an
     * intent for a client to be notification once a spend request has been spent
     * by a transaction that has confirmed on-chain.
     *
     * A client can specify whether the spend request should be for a particular
     * outpoint  or for an output script by specifying a zero outpoint.
     *
     * @generated from rpc chainrpc.ChainNotifier.RegisterSpendNtfn
     */
    registerSpendNtfn: {
        methodKind: "server_streaming";
        input: typeof SpendRequestSchema;
        output: typeof SpendEventSchema;
    };
    /**
     *
     * RegisterBlockEpochNtfn is a synchronous response-streaming RPC that
     * registers an intent for a client to be notified of blocks in the chain. The
     * stream will return a hash and height tuple of a block for each new/stale
     * block in the chain. It is the client's responsibility to determine whether
     * the tuple returned is for a new or stale block in the chain.
     *
     * A client can also request a historical backlog of blocks from a particular
     * point. This allows clients to be idempotent by ensuring that they do not
     * missing processing a single block within the chain.
     *
     * @generated from rpc chainrpc.ChainNotifier.RegisterBlockEpochNtfn
     */
    registerBlockEpochNtfn: {
        methodKind: "server_streaming";
        input: typeof BlockEpochSchema;
        output: typeof BlockEpochSchema;
    };
}>;
export declare const file_chainrpc_chainkit: GenFile;
/**
 * @generated from message chainrpc.GetBlockRequest
 */
export type GetBlockRequest = Message<"chainrpc.GetBlockRequest"> & {
    /**
     * The hash of the requested block.
     *
     * @generated from field: bytes block_hash = 1;
     */
    blockHash: Uint8Array;
};
/**
 * Describes the message chainrpc.GetBlockRequest.
 * Use `create(GetBlockRequestSchema)` to create a new message.
 */
export declare const GetBlockRequestSchema: GenMessage<GetBlockRequest>;
/**
 * TODO(ffranr): The neutrino GetBlock response includes many
 * additional helpful fields. Consider adding them here also.
 *
 * @generated from message chainrpc.GetBlockResponse
 */
export type GetBlockResponse = Message<"chainrpc.GetBlockResponse"> & {
    /**
     * The raw bytes of the requested block.
     *
     * @generated from field: bytes raw_block = 1;
     */
    rawBlock: Uint8Array;
};
/**
 * Describes the message chainrpc.GetBlockResponse.
 * Use `create(GetBlockResponseSchema)` to create a new message.
 */
export declare const GetBlockResponseSchema: GenMessage<GetBlockResponse>;
/**
 * @generated from message chainrpc.GetBlockHeaderRequest
 */
export type GetBlockHeaderRequest = Message<"chainrpc.GetBlockHeaderRequest"> & {
    /**
     * The hash of the block with the requested header.
     *
     * @generated from field: bytes block_hash = 1;
     */
    blockHash: Uint8Array;
};
/**
 * Describes the message chainrpc.GetBlockHeaderRequest.
 * Use `create(GetBlockHeaderRequestSchema)` to create a new message.
 */
export declare const GetBlockHeaderRequestSchema: GenMessage<GetBlockHeaderRequest>;
/**
 * @generated from message chainrpc.GetBlockHeaderResponse
 */
export type GetBlockHeaderResponse = Message<"chainrpc.GetBlockHeaderResponse"> & {
    /**
     * The header of the block with the requested hash.
     *
     * @generated from field: bytes raw_block_header = 1;
     */
    rawBlockHeader: Uint8Array;
};
/**
 * Describes the message chainrpc.GetBlockHeaderResponse.
 * Use `create(GetBlockHeaderResponseSchema)` to create a new message.
 */
export declare const GetBlockHeaderResponseSchema: GenMessage<GetBlockHeaderResponse>;
/**
 * @generated from message chainrpc.GetBestBlockRequest
 */
export type GetBestBlockRequest = Message<"chainrpc.GetBestBlockRequest"> & {};
/**
 * Describes the message chainrpc.GetBestBlockRequest.
 * Use `create(GetBestBlockRequestSchema)` to create a new message.
 */
export declare const GetBestBlockRequestSchema: GenMessage<GetBestBlockRequest>;
/**
 * @generated from message chainrpc.GetBestBlockResponse
 */
export type GetBestBlockResponse = Message<"chainrpc.GetBestBlockResponse"> & {
    /**
     * The hash of the best block.
     *
     * @generated from field: bytes block_hash = 1;
     */
    blockHash: Uint8Array;
    /**
     * The height of the best block.
     *
     * @generated from field: int32 block_height = 2;
     */
    blockHeight: number;
};
/**
 * Describes the message chainrpc.GetBestBlockResponse.
 * Use `create(GetBestBlockResponseSchema)` to create a new message.
 */
export declare const GetBestBlockResponseSchema: GenMessage<GetBestBlockResponse>;
/**
 * @generated from message chainrpc.GetBlockHashRequest
 */
export type GetBlockHashRequest = Message<"chainrpc.GetBlockHashRequest"> & {
    /**
     * Block height of the target best chain block.
     *
     * @generated from field: int64 block_height = 1;
     */
    blockHeight: bigint;
};
/**
 * Describes the message chainrpc.GetBlockHashRequest.
 * Use `create(GetBlockHashRequestSchema)` to create a new message.
 */
export declare const GetBlockHashRequestSchema: GenMessage<GetBlockHashRequest>;
/**
 * @generated from message chainrpc.GetBlockHashResponse
 */
export type GetBlockHashResponse = Message<"chainrpc.GetBlockHashResponse"> & {
    /**
     * The hash of the best block at the specified height.
     *
     * @generated from field: bytes block_hash = 1;
     */
    blockHash: Uint8Array;
};
/**
 * Describes the message chainrpc.GetBlockHashResponse.
 * Use `create(GetBlockHashResponseSchema)` to create a new message.
 */
export declare const GetBlockHashResponseSchema: GenMessage<GetBlockHashResponse>;
/**
 * ChainKit is a service that can be used to get information from the
 * chain backend.
 *
 * @generated from service chainrpc.ChainKit
 */
export declare const ChainKit: GenService<{
    /**
     * lncli: `chain getblock`
     * GetBlock returns a block given the corresponding block hash.
     *
     * @generated from rpc chainrpc.ChainKit.GetBlock
     */
    getBlock: {
        methodKind: "unary";
        input: typeof GetBlockRequestSchema;
        output: typeof GetBlockResponseSchema;
    };
    /**
     * lncli: `chain getblockheader`
     * GetBlockHeader returns a block header with a particular block hash.
     *
     * @generated from rpc chainrpc.ChainKit.GetBlockHeader
     */
    getBlockHeader: {
        methodKind: "unary";
        input: typeof GetBlockHeaderRequestSchema;
        output: typeof GetBlockHeaderResponseSchema;
    };
    /**
     * lncli: `chain getbestblock`
     * GetBestBlock returns the block hash and current height from the valid
     * most-work chain.
     *
     * @generated from rpc chainrpc.ChainKit.GetBestBlock
     */
    getBestBlock: {
        methodKind: "unary";
        input: typeof GetBestBlockRequestSchema;
        output: typeof GetBestBlockResponseSchema;
    };
    /**
     * lncli: `chain getblockhash`
     * GetBlockHash returns the hash of the block in the best blockchain
     * at the given height.
     *
     * @generated from rpc chainrpc.ChainKit.GetBlockHash
     */
    getBlockHash: {
        methodKind: "unary";
        input: typeof GetBlockHashRequestSchema;
        output: typeof GetBlockHashResponseSchema;
    };
}>;
//# sourceMappingURL=chainnotifier_pb.d.ts.map