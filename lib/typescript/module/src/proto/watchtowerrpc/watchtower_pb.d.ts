import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file watchtowerrpc/watchtower.proto.
 */
export declare const file_watchtowerrpc_watchtower: GenFile;
/**
 * @generated from message watchtowerrpc.GetInfoRequest
 */
export type GetInfoRequest = Message<"watchtowerrpc.GetInfoRequest"> & {};
/**
 * Describes the message watchtowerrpc.GetInfoRequest.
 * Use `create(GetInfoRequestSchema)` to create a new message.
 */
export declare const GetInfoRequestSchema: GenMessage<GetInfoRequest>;
/**
 * @generated from message watchtowerrpc.GetInfoResponse
 */
export type GetInfoResponse = Message<"watchtowerrpc.GetInfoResponse"> & {
    /**
     * The public key of the watchtower.
     *
     * @generated from field: bytes pubkey = 1;
     */
    pubkey: Uint8Array;
    /**
     * The listening addresses of the watchtower.
     *
     * @generated from field: repeated string listeners = 2;
     */
    listeners: string[];
    /**
     * The URIs of the watchtower.
     *
     * @generated from field: repeated string uris = 3;
     */
    uris: string[];
};
/**
 * Describes the message watchtowerrpc.GetInfoResponse.
 * Use `create(GetInfoResponseSchema)` to create a new message.
 */
export declare const GetInfoResponseSchema: GenMessage<GetInfoResponse>;
/**
 * Watchtower is a service that grants access to the watchtower server
 * functionality of the daemon.
 *
 * @generated from service watchtowerrpc.Watchtower
 */
export declare const Watchtower: GenService<{
    /**
     * lncli: `tower info`
     * GetInfo returns general information concerning the companion watchtower
     * including its public key and URIs where the server is currently
     * listening for clients.
     *
     * @generated from rpc watchtowerrpc.Watchtower.GetInfo
     */
    getInfo: {
        methodKind: "unary";
        input: typeof GetInfoRequestSchema;
        output: typeof GetInfoResponseSchema;
    };
}>;
//# sourceMappingURL=watchtower_pb.d.ts.map