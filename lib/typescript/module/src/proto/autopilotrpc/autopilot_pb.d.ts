import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file autopilotrpc/autopilot.proto.
 */
export declare const file_autopilotrpc_autopilot: GenFile;
/**
 * @generated from message autopilotrpc.StatusRequest
 */
export type StatusRequest = Message<"autopilotrpc.StatusRequest"> & {};
/**
 * Describes the message autopilotrpc.StatusRequest.
 * Use `create(StatusRequestSchema)` to create a new message.
 */
export declare const StatusRequestSchema: GenMessage<StatusRequest>;
/**
 * @generated from message autopilotrpc.StatusResponse
 */
export type StatusResponse = Message<"autopilotrpc.StatusResponse"> & {
    /**
     * Indicates whether the autopilot is active or not.
     *
     * @generated from field: bool active = 1;
     */
    active: boolean;
};
/**
 * Describes the message autopilotrpc.StatusResponse.
 * Use `create(StatusResponseSchema)` to create a new message.
 */
export declare const StatusResponseSchema: GenMessage<StatusResponse>;
/**
 * @generated from message autopilotrpc.ModifyStatusRequest
 */
export type ModifyStatusRequest = Message<"autopilotrpc.ModifyStatusRequest"> & {
    /**
     * Whether the autopilot agent should be enabled or not.
     *
     * @generated from field: bool enable = 1;
     */
    enable: boolean;
};
/**
 * Describes the message autopilotrpc.ModifyStatusRequest.
 * Use `create(ModifyStatusRequestSchema)` to create a new message.
 */
export declare const ModifyStatusRequestSchema: GenMessage<ModifyStatusRequest>;
/**
 * @generated from message autopilotrpc.ModifyStatusResponse
 */
export type ModifyStatusResponse = Message<"autopilotrpc.ModifyStatusResponse"> & {};
/**
 * Describes the message autopilotrpc.ModifyStatusResponse.
 * Use `create(ModifyStatusResponseSchema)` to create a new message.
 */
export declare const ModifyStatusResponseSchema: GenMessage<ModifyStatusResponse>;
/**
 * @generated from message autopilotrpc.QueryScoresRequest
 */
export type QueryScoresRequest = Message<"autopilotrpc.QueryScoresRequest"> & {
    /**
     * @generated from field: repeated string pubkeys = 1;
     */
    pubkeys: string[];
    /**
     * If set, we will ignore the local channel state when calculating scores.
     *
     * @generated from field: bool ignore_local_state = 2;
     */
    ignoreLocalState: boolean;
};
/**
 * Describes the message autopilotrpc.QueryScoresRequest.
 * Use `create(QueryScoresRequestSchema)` to create a new message.
 */
export declare const QueryScoresRequestSchema: GenMessage<QueryScoresRequest>;
/**
 * @generated from message autopilotrpc.QueryScoresResponse
 */
export type QueryScoresResponse = Message<"autopilotrpc.QueryScoresResponse"> & {
    /**
     * @generated from field: repeated autopilotrpc.QueryScoresResponse.HeuristicResult results = 1;
     */
    results: QueryScoresResponse_HeuristicResult[];
};
/**
 * Describes the message autopilotrpc.QueryScoresResponse.
 * Use `create(QueryScoresResponseSchema)` to create a new message.
 */
export declare const QueryScoresResponseSchema: GenMessage<QueryScoresResponse>;
/**
 * @generated from message autopilotrpc.QueryScoresResponse.HeuristicResult
 */
export type QueryScoresResponse_HeuristicResult = Message<"autopilotrpc.QueryScoresResponse.HeuristicResult"> & {
    /**
     * @generated from field: string heuristic = 1;
     */
    heuristic: string;
    /**
     * @generated from field: map<string, double> scores = 2;
     */
    scores: {
        [key: string]: number;
    };
};
/**
 * Describes the message autopilotrpc.QueryScoresResponse.HeuristicResult.
 * Use `create(QueryScoresResponse_HeuristicResultSchema)` to create a new message.
 */
export declare const QueryScoresResponse_HeuristicResultSchema: GenMessage<QueryScoresResponse_HeuristicResult>;
/**
 * @generated from message autopilotrpc.SetScoresRequest
 */
export type SetScoresRequest = Message<"autopilotrpc.SetScoresRequest"> & {
    /**
     * The name of the heuristic to provide scores to.
     *
     * @generated from field: string heuristic = 1;
     */
    heuristic: string;
    /**
     *
     * A map from hex-encoded public keys to scores. Scores must be in the range
     * [0.0, 1.0].
     *
     * @generated from field: map<string, double> scores = 2;
     */
    scores: {
        [key: string]: number;
    };
};
/**
 * Describes the message autopilotrpc.SetScoresRequest.
 * Use `create(SetScoresRequestSchema)` to create a new message.
 */
export declare const SetScoresRequestSchema: GenMessage<SetScoresRequest>;
/**
 * @generated from message autopilotrpc.SetScoresResponse
 */
export type SetScoresResponse = Message<"autopilotrpc.SetScoresResponse"> & {};
/**
 * Describes the message autopilotrpc.SetScoresResponse.
 * Use `create(SetScoresResponseSchema)` to create a new message.
 */
export declare const SetScoresResponseSchema: GenMessage<SetScoresResponse>;
/**
 * Autopilot is a service that can be used to get information about the current
 * state of the daemon's autopilot agent, and also supply it with information
 * that can be used when deciding where to open channels.
 *
 * @generated from service autopilotrpc.Autopilot
 */
export declare const Autopilot: GenService<{
    /**
     *
     * Status returns whether the daemon's autopilot agent is active.
     *
     * @generated from rpc autopilotrpc.Autopilot.Status
     */
    status: {
        methodKind: "unary";
        input: typeof StatusRequestSchema;
        output: typeof StatusResponseSchema;
    };
    /**
     *
     * ModifyStatus is used to modify the status of the autopilot agent, like
     * enabling or disabling it.
     *
     * @generated from rpc autopilotrpc.Autopilot.ModifyStatus
     */
    modifyStatus: {
        methodKind: "unary";
        input: typeof ModifyStatusRequestSchema;
        output: typeof ModifyStatusResponseSchema;
    };
    /**
     *
     * QueryScores queries all available autopilot heuristics, in addition to any
     * active combination of these heruristics, for the scores they would give to
     * the given nodes.
     *
     * @generated from rpc autopilotrpc.Autopilot.QueryScores
     */
    queryScores: {
        methodKind: "unary";
        input: typeof QueryScoresRequestSchema;
        output: typeof QueryScoresResponseSchema;
    };
    /**
     *
     * SetScores attempts to set the scores used by the running autopilot agent,
     * if the external scoring heuristic is enabled.
     *
     * @generated from rpc autopilotrpc.Autopilot.SetScores
     */
    setScores: {
        methodKind: "unary";
        input: typeof SetScoresRequestSchema;
        output: typeof SetScoresResponseSchema;
    };
}>;
//# sourceMappingURL=autopilot_pb.d.ts.map