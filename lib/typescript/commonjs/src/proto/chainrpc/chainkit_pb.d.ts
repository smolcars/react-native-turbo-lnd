import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file chainrpc/chainkit.proto.
 */
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
//# sourceMappingURL=chainkit_pb.d.ts.map