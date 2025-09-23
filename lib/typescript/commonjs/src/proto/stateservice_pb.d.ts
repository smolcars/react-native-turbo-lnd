import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file stateservice.proto.
 */
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
//# sourceMappingURL=stateservice_pb.d.ts.map