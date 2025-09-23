import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file neutrinorpc/neutrino.proto.
 */
export declare const file_neutrinorpc_neutrino: GenFile;
/**
 * @generated from message neutrinorpc.StatusRequest
 */
export type StatusRequest = Message<"neutrinorpc.StatusRequest"> & {};
/**
 * Describes the message neutrinorpc.StatusRequest.
 * Use `create(StatusRequestSchema)` to create a new message.
 */
export declare const StatusRequestSchema: GenMessage<StatusRequest>;
/**
 * @generated from message neutrinorpc.StatusResponse
 */
export type StatusResponse = Message<"neutrinorpc.StatusResponse"> & {
    /**
     * Indicates whether the neutrino backend is active or not.
     *
     * @generated from field: bool active = 1;
     */
    active: boolean;
    /**
     * Is fully synced.
     *
     * @generated from field: bool synced = 2;
     */
    synced: boolean;
    /**
     * Best block height.
     *
     * @generated from field: int32 block_height = 3;
     */
    blockHeight: number;
    /**
     * Best block hash.
     *
     * @generated from field: string block_hash = 4;
     */
    blockHash: string;
    /**
     * Connected peers.
     *
     * @generated from field: repeated string peers = 5;
     */
    peers: string[];
};
/**
 * Describes the message neutrinorpc.StatusResponse.
 * Use `create(StatusResponseSchema)` to create a new message.
 */
export declare const StatusResponseSchema: GenMessage<StatusResponse>;
/**
 * @generated from message neutrinorpc.AddPeerRequest
 */
export type AddPeerRequest = Message<"neutrinorpc.AddPeerRequest"> & {
    /**
     * Peer to add.
     *
     * @generated from field: string peer_addrs = 1;
     */
    peerAddrs: string;
};
/**
 * Describes the message neutrinorpc.AddPeerRequest.
 * Use `create(AddPeerRequestSchema)` to create a new message.
 */
export declare const AddPeerRequestSchema: GenMessage<AddPeerRequest>;
/**
 * @generated from message neutrinorpc.AddPeerResponse
 */
export type AddPeerResponse = Message<"neutrinorpc.AddPeerResponse"> & {};
/**
 * Describes the message neutrinorpc.AddPeerResponse.
 * Use `create(AddPeerResponseSchema)` to create a new message.
 */
export declare const AddPeerResponseSchema: GenMessage<AddPeerResponse>;
/**
 * @generated from message neutrinorpc.DisconnectPeerRequest
 */
export type DisconnectPeerRequest = Message<"neutrinorpc.DisconnectPeerRequest"> & {
    /**
     * Peer to disconnect.
     *
     * @generated from field: string peer_addrs = 1;
     */
    peerAddrs: string;
};
/**
 * Describes the message neutrinorpc.DisconnectPeerRequest.
 * Use `create(DisconnectPeerRequestSchema)` to create a new message.
 */
export declare const DisconnectPeerRequestSchema: GenMessage<DisconnectPeerRequest>;
/**
 * @generated from message neutrinorpc.DisconnectPeerResponse
 */
export type DisconnectPeerResponse = Message<"neutrinorpc.DisconnectPeerResponse"> & {};
/**
 * Describes the message neutrinorpc.DisconnectPeerResponse.
 * Use `create(DisconnectPeerResponseSchema)` to create a new message.
 */
export declare const DisconnectPeerResponseSchema: GenMessage<DisconnectPeerResponse>;
/**
 * @generated from message neutrinorpc.IsBannedRequest
 */
export type IsBannedRequest = Message<"neutrinorpc.IsBannedRequest"> & {
    /**
     * Peer to lookup.
     *
     * @generated from field: string peer_addrs = 1;
     */
    peerAddrs: string;
};
/**
 * Describes the message neutrinorpc.IsBannedRequest.
 * Use `create(IsBannedRequestSchema)` to create a new message.
 */
export declare const IsBannedRequestSchema: GenMessage<IsBannedRequest>;
/**
 * @generated from message neutrinorpc.IsBannedResponse
 */
export type IsBannedResponse = Message<"neutrinorpc.IsBannedResponse"> & {
    /**
     * @generated from field: bool banned = 1;
     */
    banned: boolean;
};
/**
 * Describes the message neutrinorpc.IsBannedResponse.
 * Use `create(IsBannedResponseSchema)` to create a new message.
 */
export declare const IsBannedResponseSchema: GenMessage<IsBannedResponse>;
/**
 * @generated from message neutrinorpc.GetBlockHeaderRequest
 */
export type GetBlockHeaderRequest = Message<"neutrinorpc.GetBlockHeaderRequest"> & {
    /**
     * Block hash in hex notation.
     *
     * @generated from field: string hash = 1;
     */
    hash: string;
};
/**
 * Describes the message neutrinorpc.GetBlockHeaderRequest.
 * Use `create(GetBlockHeaderRequestSchema)` to create a new message.
 */
export declare const GetBlockHeaderRequestSchema: GenMessage<GetBlockHeaderRequest>;
/**
 * @generated from message neutrinorpc.GetBlockHeaderResponse
 */
export type GetBlockHeaderResponse = Message<"neutrinorpc.GetBlockHeaderResponse"> & {
    /**
     * The block hash (same as provided).
     *
     * @generated from field: string hash = 1;
     */
    hash: string;
    /**
     * The number of confirmations.
     *
     * @generated from field: int64 confirmations = 2;
     */
    confirmations: bigint;
    /**
     * The block size excluding witness data.
     *
     * @generated from field: int64 stripped_size = 3;
     */
    strippedSize: bigint;
    /**
     * The block size (bytes).
     *
     * @generated from field: int64 size = 4;
     */
    size: bigint;
    /**
     * The block weight as defined in BIP 141.
     *
     * @generated from field: int64 weight = 5;
     */
    weight: bigint;
    /**
     * The block height or index.
     *
     * @generated from field: int32 height = 6;
     */
    height: number;
    /**
     * The block version.
     *
     * @generated from field: int32 version = 7;
     */
    version: number;
    /**
     * The block version.
     *
     * @generated from field: string version_hex = 8;
     */
    versionHex: string;
    /**
     * The merkle root.
     *
     * @generated from field: string merkleroot = 9;
     */
    merkleroot: string;
    /**
     * The block time in seconds since epoch (Jan 1 1970 GMT).
     *
     * @generated from field: int64 time = 10;
     */
    time: bigint;
    /**
     * The nonce.
     *
     * @generated from field: uint32 nonce = 11;
     */
    nonce: number;
    /**
     * The bits in hex notation.
     *
     * @generated from field: string bits = 12;
     */
    bits: string;
    /**
     * The number of transactions in the block.
     *
     * @generated from field: int32 ntx = 13;
     */
    ntx: number;
    /**
     * The hash of the previous block.
     *
     * @generated from field: string previous_block_hash = 14;
     */
    previousBlockHash: string;
    /**
     * The raw hex of the block.
     *
     * @generated from field: bytes raw_hex = 15;
     */
    rawHex: Uint8Array;
};
/**
 * Describes the message neutrinorpc.GetBlockHeaderResponse.
 * Use `create(GetBlockHeaderResponseSchema)` to create a new message.
 */
export declare const GetBlockHeaderResponseSchema: GenMessage<GetBlockHeaderResponse>;
/**
 * @generated from message neutrinorpc.GetBlockRequest
 */
export type GetBlockRequest = Message<"neutrinorpc.GetBlockRequest"> & {
    /**
     * Block hash in hex notation.
     *
     * @generated from field: string hash = 1;
     */
    hash: string;
};
/**
 * Describes the message neutrinorpc.GetBlockRequest.
 * Use `create(GetBlockRequestSchema)` to create a new message.
 */
export declare const GetBlockRequestSchema: GenMessage<GetBlockRequest>;
/**
 * @generated from message neutrinorpc.GetBlockResponse
 */
export type GetBlockResponse = Message<"neutrinorpc.GetBlockResponse"> & {
    /**
     * The block hash (same as provided).
     *
     * @generated from field: string hash = 1;
     */
    hash: string;
    /**
     * The number of confirmations.
     *
     * @generated from field: int64 confirmations = 2;
     */
    confirmations: bigint;
    /**
     * The block size excluding witness data.
     *
     * @generated from field: int64 stripped_size = 3;
     */
    strippedSize: bigint;
    /**
     * The block size (bytes).
     *
     * @generated from field: int64 size = 4;
     */
    size: bigint;
    /**
     * The block weight as defined in BIP 141.
     *
     * @generated from field: int64 weight = 5;
     */
    weight: bigint;
    /**
     * The block height or index.
     *
     * @generated from field: int32 height = 6;
     */
    height: number;
    /**
     * The block version.
     *
     * @generated from field: int32 version = 7;
     */
    version: number;
    /**
     * The block version.
     *
     * @generated from field: string version_hex = 8;
     */
    versionHex: string;
    /**
     * The merkle root.
     *
     * @generated from field: string merkleroot = 9;
     */
    merkleroot: string;
    /**
     * List of transaction ids.
     *
     * @generated from field: repeated string tx = 10;
     */
    tx: string[];
    /**
     * The block time in seconds since epoch (Jan 1 1970 GMT).
     *
     * @generated from field: int64 time = 11;
     */
    time: bigint;
    /**
     * The nonce.
     *
     * @generated from field: uint32 nonce = 12;
     */
    nonce: number;
    /**
     * The bits in hex notation.
     *
     * @generated from field: string bits = 13;
     */
    bits: string;
    /**
     * The number of transactions in the block.
     *
     * @generated from field: int32 ntx = 14;
     */
    ntx: number;
    /**
     * The hash of the previous block.
     *
     * @generated from field: string previous_block_hash = 15;
     */
    previousBlockHash: string;
    /**
     * The raw hex of the block.
     *
     * @generated from field: bytes raw_hex = 16;
     */
    rawHex: Uint8Array;
};
/**
 * Describes the message neutrinorpc.GetBlockResponse.
 * Use `create(GetBlockResponseSchema)` to create a new message.
 */
export declare const GetBlockResponseSchema: GenMessage<GetBlockResponse>;
/**
 * @generated from message neutrinorpc.GetCFilterRequest
 */
export type GetCFilterRequest = Message<"neutrinorpc.GetCFilterRequest"> & {
    /**
     * Block hash in hex notation.
     *
     * @generated from field: string hash = 1;
     */
    hash: string;
};
/**
 * Describes the message neutrinorpc.GetCFilterRequest.
 * Use `create(GetCFilterRequestSchema)` to create a new message.
 */
export declare const GetCFilterRequestSchema: GenMessage<GetCFilterRequest>;
/**
 * @generated from message neutrinorpc.GetCFilterResponse
 */
export type GetCFilterResponse = Message<"neutrinorpc.GetCFilterResponse"> & {
    /**
     * GCS filter.
     *
     * @generated from field: bytes filter = 1;
     */
    filter: Uint8Array;
};
/**
 * Describes the message neutrinorpc.GetCFilterResponse.
 * Use `create(GetCFilterResponseSchema)` to create a new message.
 */
export declare const GetCFilterResponseSchema: GenMessage<GetCFilterResponse>;
/**
 * @generated from message neutrinorpc.GetBlockHashRequest
 */
export type GetBlockHashRequest = Message<"neutrinorpc.GetBlockHashRequest"> & {
    /**
     * The block height or index.
     *
     * @generated from field: int32 height = 1;
     */
    height: number;
};
/**
 * Describes the message neutrinorpc.GetBlockHashRequest.
 * Use `create(GetBlockHashRequestSchema)` to create a new message.
 */
export declare const GetBlockHashRequestSchema: GenMessage<GetBlockHashRequest>;
/**
 * @generated from message neutrinorpc.GetBlockHashResponse
 */
export type GetBlockHashResponse = Message<"neutrinorpc.GetBlockHashResponse"> & {
    /**
     * The block hash.
     *
     * @generated from field: string hash = 1;
     */
    hash: string;
};
/**
 * Describes the message neutrinorpc.GetBlockHashResponse.
 * Use `create(GetBlockHashResponseSchema)` to create a new message.
 */
export declare const GetBlockHashResponseSchema: GenMessage<GetBlockHashResponse>;
/**
 * NeutrinoKit is a service that can be used to get information about the
 * current state of the neutrino instance, fetch blocks and add/remove peers.
 *
 * @generated from service neutrinorpc.NeutrinoKit
 */
export declare const NeutrinoKit: GenService<{
    /**
     *
     * Status returns the status of the light client neutrino instance,
     * along with height and hash of the best block, and a list of connected
     * peers.
     *
     * @generated from rpc neutrinorpc.NeutrinoKit.Status
     */
    status: {
        methodKind: "unary";
        input: typeof StatusRequestSchema;
        output: typeof StatusResponseSchema;
    };
    /**
     *
     * AddPeer adds a new peer that has already been connected to the server.
     *
     * @generated from rpc neutrinorpc.NeutrinoKit.AddPeer
     */
    addPeer: {
        methodKind: "unary";
        input: typeof AddPeerRequestSchema;
        output: typeof AddPeerResponseSchema;
    };
    /**
     *
     * DisconnectPeer disconnects a peer by target address. Both outbound and
     * inbound nodes will be searched for the target node. An error message will
     * be returned if the peer was not found.
     *
     * @generated from rpc neutrinorpc.NeutrinoKit.DisconnectPeer
     */
    disconnectPeer: {
        methodKind: "unary";
        input: typeof DisconnectPeerRequestSchema;
        output: typeof DisconnectPeerResponseSchema;
    };
    /**
     *
     * IsBanned returns true if the peer is banned, otherwise false.
     *
     * @generated from rpc neutrinorpc.NeutrinoKit.IsBanned
     */
    isBanned: {
        methodKind: "unary";
        input: typeof IsBannedRequestSchema;
        output: typeof IsBannedResponseSchema;
    };
    /**
     *
     * GetBlockHeader returns a block header with a particular block hash.
     *
     * @generated from rpc neutrinorpc.NeutrinoKit.GetBlockHeader
     */
    getBlockHeader: {
        methodKind: "unary";
        input: typeof GetBlockHeaderRequestSchema;
        output: typeof GetBlockHeaderResponseSchema;
    };
    /**
     *
     * GetBlock returns a block with a particular block hash.
     *
     * @generated from rpc neutrinorpc.NeutrinoKit.GetBlock
     */
    getBlock: {
        methodKind: "unary";
        input: typeof GetBlockRequestSchema;
        output: typeof GetBlockResponseSchema;
    };
    /**
     *
     * GetCFilter returns a compact filter from a block.
     *
     * @generated from rpc neutrinorpc.NeutrinoKit.GetCFilter
     */
    getCFilter: {
        methodKind: "unary";
        input: typeof GetCFilterRequestSchema;
        output: typeof GetCFilterResponseSchema;
    };
    /**
     *
     * Deprecated, use chainrpc.GetBlockHash instead.
     * GetBlockHash returns the header hash of a block at a given height.
     *
     * @generated from rpc neutrinorpc.NeutrinoKit.GetBlockHash
     * @deprecated
     */
    getBlockHash: {
        methodKind: "unary";
        input: typeof GetBlockHashRequestSchema;
        output: typeof GetBlockHashResponseSchema;
    };
}>;
//# sourceMappingURL=neutrino_pb.d.ts.map