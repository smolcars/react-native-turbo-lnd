import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file wtclientrpc/wtclient.proto.
 */
export declare const file_wtclientrpc_wtclient: GenFile;
/**
 * @generated from message wtclientrpc.AddTowerRequest
 */
export type AddTowerRequest = Message<"wtclientrpc.AddTowerRequest"> & {
    /**
     * The identifying public key of the watchtower to add.
     *
     * @generated from field: bytes pubkey = 1;
     */
    pubkey: Uint8Array;
    /**
     * A network address the watchtower is reachable over.
     *
     * @generated from field: string address = 2;
     */
    address: string;
};
/**
 * Describes the message wtclientrpc.AddTowerRequest.
 * Use `create(AddTowerRequestSchema)` to create a new message.
 */
export declare const AddTowerRequestSchema: GenMessage<AddTowerRequest>;
/**
 * @generated from message wtclientrpc.AddTowerResponse
 */
export type AddTowerResponse = Message<"wtclientrpc.AddTowerResponse"> & {};
/**
 * Describes the message wtclientrpc.AddTowerResponse.
 * Use `create(AddTowerResponseSchema)` to create a new message.
 */
export declare const AddTowerResponseSchema: GenMessage<AddTowerResponse>;
/**
 * @generated from message wtclientrpc.RemoveTowerRequest
 */
export type RemoveTowerRequest = Message<"wtclientrpc.RemoveTowerRequest"> & {
    /**
     * The identifying public key of the watchtower to remove.
     *
     * @generated from field: bytes pubkey = 1;
     */
    pubkey: Uint8Array;
    /**
     *
     * If set, then the record for this address will be removed, indicating that is
     * is stale. Otherwise, the watchtower will no longer be used for future
     * session negotiations and backups.
     *
     * @generated from field: string address = 2;
     */
    address: string;
};
/**
 * Describes the message wtclientrpc.RemoveTowerRequest.
 * Use `create(RemoveTowerRequestSchema)` to create a new message.
 */
export declare const RemoveTowerRequestSchema: GenMessage<RemoveTowerRequest>;
/**
 * @generated from message wtclientrpc.RemoveTowerResponse
 */
export type RemoveTowerResponse = Message<"wtclientrpc.RemoveTowerResponse"> & {};
/**
 * Describes the message wtclientrpc.RemoveTowerResponse.
 * Use `create(RemoveTowerResponseSchema)` to create a new message.
 */
export declare const RemoveTowerResponseSchema: GenMessage<RemoveTowerResponse>;
/**
 * @generated from message wtclientrpc.DeactivateTowerRequest
 */
export type DeactivateTowerRequest = Message<"wtclientrpc.DeactivateTowerRequest"> & {
    /**
     * The identifying public key of the watchtower to deactivate.
     *
     * @generated from field: bytes pubkey = 1;
     */
    pubkey: Uint8Array;
};
/**
 * Describes the message wtclientrpc.DeactivateTowerRequest.
 * Use `create(DeactivateTowerRequestSchema)` to create a new message.
 */
export declare const DeactivateTowerRequestSchema: GenMessage<DeactivateTowerRequest>;
/**
 * @generated from message wtclientrpc.DeactivateTowerResponse
 */
export type DeactivateTowerResponse = Message<"wtclientrpc.DeactivateTowerResponse"> & {
    /**
     * A string describing the action that took place.
     *
     * @generated from field: string status = 1;
     */
    status: string;
};
/**
 * Describes the message wtclientrpc.DeactivateTowerResponse.
 * Use `create(DeactivateTowerResponseSchema)` to create a new message.
 */
export declare const DeactivateTowerResponseSchema: GenMessage<DeactivateTowerResponse>;
/**
 * @generated from message wtclientrpc.TerminateSessionRequest
 */
export type TerminateSessionRequest = Message<"wtclientrpc.TerminateSessionRequest"> & {
    /**
     * The ID of the session that should be terminated.
     *
     * @generated from field: bytes session_id = 1;
     */
    sessionId: Uint8Array;
};
/**
 * Describes the message wtclientrpc.TerminateSessionRequest.
 * Use `create(TerminateSessionRequestSchema)` to create a new message.
 */
export declare const TerminateSessionRequestSchema: GenMessage<TerminateSessionRequest>;
/**
 * @generated from message wtclientrpc.TerminateSessionResponse
 */
export type TerminateSessionResponse = Message<"wtclientrpc.TerminateSessionResponse"> & {
    /**
     * A string describing the action that took place.
     *
     * @generated from field: string status = 1;
     */
    status: string;
};
/**
 * Describes the message wtclientrpc.TerminateSessionResponse.
 * Use `create(TerminateSessionResponseSchema)` to create a new message.
 */
export declare const TerminateSessionResponseSchema: GenMessage<TerminateSessionResponse>;
/**
 * @generated from message wtclientrpc.GetTowerInfoRequest
 */
export type GetTowerInfoRequest = Message<"wtclientrpc.GetTowerInfoRequest"> & {
    /**
     * The identifying public key of the watchtower to retrieve information for.
     *
     * @generated from field: bytes pubkey = 1;
     */
    pubkey: Uint8Array;
    /**
     * Whether we should include sessions with the watchtower in the response.
     *
     * @generated from field: bool include_sessions = 2;
     */
    includeSessions: boolean;
    /**
     * Whether to exclude exhausted sessions in the response info. This option
     * is only meaningful if include_sessions is true.
     *
     * @generated from field: bool exclude_exhausted_sessions = 3;
     */
    excludeExhaustedSessions: boolean;
};
/**
 * Describes the message wtclientrpc.GetTowerInfoRequest.
 * Use `create(GetTowerInfoRequestSchema)` to create a new message.
 */
export declare const GetTowerInfoRequestSchema: GenMessage<GetTowerInfoRequest>;
/**
 * @generated from message wtclientrpc.TowerSession
 */
export type TowerSession = Message<"wtclientrpc.TowerSession"> & {
    /**
     *
     * The total number of successful backups that have been made to the
     * watchtower session.
     *
     * @generated from field: uint32 num_backups = 1;
     */
    numBackups: number;
    /**
     *
     * The total number of backups in the session that are currently pending to be
     * acknowledged by the watchtower.
     *
     * @generated from field: uint32 num_pending_backups = 2;
     */
    numPendingBackups: number;
    /**
     * The maximum number of backups allowed by the watchtower session.
     *
     * @generated from field: uint32 max_backups = 3;
     */
    maxBackups: number;
    /**
     *
     * Deprecated, use sweep_sat_per_vbyte.
     * The fee rate, in satoshis per vbyte, that will be used by the watchtower for
     * the justice transaction in the event of a channel breach.
     *
     * @generated from field: uint32 sweep_sat_per_byte = 4 [deprecated = true];
     * @deprecated
     */
    sweepSatPerByte: number;
    /**
     *
     * The fee rate, in satoshis per vbyte, that will be used by the watchtower for
     * the justice transaction in the event of a channel breach.
     *
     * @generated from field: uint32 sweep_sat_per_vbyte = 5;
     */
    sweepSatPerVbyte: number;
    /**
     *
     * The ID of the session.
     *
     * @generated from field: bytes id = 6;
     */
    id: Uint8Array;
};
/**
 * Describes the message wtclientrpc.TowerSession.
 * Use `create(TowerSessionSchema)` to create a new message.
 */
export declare const TowerSessionSchema: GenMessage<TowerSession>;
/**
 * @generated from message wtclientrpc.Tower
 */
export type Tower = Message<"wtclientrpc.Tower"> & {
    /**
     * The identifying public key of the watchtower.
     *
     * @generated from field: bytes pubkey = 1;
     */
    pubkey: Uint8Array;
    /**
     * The list of addresses the watchtower is reachable over.
     *
     * @generated from field: repeated string addresses = 2;
     */
    addresses: string[];
    /**
     * Deprecated, use the active_session_candidate field under the
     * correct identifier in the client_type map.
     * Whether the watchtower is currently a candidate for new sessions.
     *
     * @generated from field: bool active_session_candidate = 3 [deprecated = true];
     * @deprecated
     */
    activeSessionCandidate: boolean;
    /**
     * Deprecated, use the num_sessions field under the correct identifier
     * in the client_type map.
     * The number of sessions that have been negotiated with the watchtower.
     *
     * @generated from field: uint32 num_sessions = 4 [deprecated = true];
     * @deprecated
     */
    numSessions: number;
    /**
     * Deprecated, use the sessions field under the correct identifier in the
     * client_type map.
     * The list of sessions that have been negotiated with the watchtower.
     *
     * @generated from field: repeated wtclientrpc.TowerSession sessions = 5 [deprecated = true];
     * @deprecated
     */
    sessions: TowerSession[];
    /**
     * A list sessions held with the tower.
     *
     * @generated from field: repeated wtclientrpc.TowerSessionInfo session_info = 6;
     */
    sessionInfo: TowerSessionInfo[];
};
/**
 * Describes the message wtclientrpc.Tower.
 * Use `create(TowerSchema)` to create a new message.
 */
export declare const TowerSchema: GenMessage<Tower>;
/**
 * @generated from message wtclientrpc.TowerSessionInfo
 */
export type TowerSessionInfo = Message<"wtclientrpc.TowerSessionInfo"> & {
    /**
     * Whether the watchtower is currently a candidate for new sessions.
     *
     * @generated from field: bool active_session_candidate = 1;
     */
    activeSessionCandidate: boolean;
    /**
     * The number of sessions that have been negotiated with the watchtower.
     *
     * @generated from field: uint32 num_sessions = 2;
     */
    numSessions: number;
    /**
     * The list of sessions that have been negotiated with the watchtower.
     *
     * @generated from field: repeated wtclientrpc.TowerSession sessions = 3;
     */
    sessions: TowerSession[];
    /**
     * The session's policy type.
     *
     * @generated from field: wtclientrpc.PolicyType policy_type = 4;
     */
    policyType: PolicyType;
};
/**
 * Describes the message wtclientrpc.TowerSessionInfo.
 * Use `create(TowerSessionInfoSchema)` to create a new message.
 */
export declare const TowerSessionInfoSchema: GenMessage<TowerSessionInfo>;
/**
 * @generated from message wtclientrpc.ListTowersRequest
 */
export type ListTowersRequest = Message<"wtclientrpc.ListTowersRequest"> & {
    /**
     * Whether we should include sessions with the watchtower in the response.
     *
     * @generated from field: bool include_sessions = 1;
     */
    includeSessions: boolean;
    /**
     * Whether to exclude exhausted sessions in the response info. This option
     * is only meaningful if include_sessions is true.
     *
     * @generated from field: bool exclude_exhausted_sessions = 2;
     */
    excludeExhaustedSessions: boolean;
};
/**
 * Describes the message wtclientrpc.ListTowersRequest.
 * Use `create(ListTowersRequestSchema)` to create a new message.
 */
export declare const ListTowersRequestSchema: GenMessage<ListTowersRequest>;
/**
 * @generated from message wtclientrpc.ListTowersResponse
 */
export type ListTowersResponse = Message<"wtclientrpc.ListTowersResponse"> & {
    /**
     * The list of watchtowers available for new backups.
     *
     * @generated from field: repeated wtclientrpc.Tower towers = 1;
     */
    towers: Tower[];
};
/**
 * Describes the message wtclientrpc.ListTowersResponse.
 * Use `create(ListTowersResponseSchema)` to create a new message.
 */
export declare const ListTowersResponseSchema: GenMessage<ListTowersResponse>;
/**
 * @generated from message wtclientrpc.StatsRequest
 */
export type StatsRequest = Message<"wtclientrpc.StatsRequest"> & {};
/**
 * Describes the message wtclientrpc.StatsRequest.
 * Use `create(StatsRequestSchema)` to create a new message.
 */
export declare const StatsRequestSchema: GenMessage<StatsRequest>;
/**
 * @generated from message wtclientrpc.StatsResponse
 */
export type StatsResponse = Message<"wtclientrpc.StatsResponse"> & {
    /**
     *
     * The total number of backups made to all active and exhausted watchtower
     * sessions.
     *
     * @generated from field: uint32 num_backups = 1;
     */
    numBackups: number;
    /**
     *
     * The total number of backups that are pending to be acknowledged by all
     * active and exhausted watchtower sessions.
     *
     * @generated from field: uint32 num_pending_backups = 2;
     */
    numPendingBackups: number;
    /**
     *
     * The total number of backups that all active and exhausted watchtower
     * sessions have failed to acknowledge.
     *
     * @generated from field: uint32 num_failed_backups = 3;
     */
    numFailedBackups: number;
    /**
     * The total number of new sessions made to watchtowers.
     *
     * @generated from field: uint32 num_sessions_acquired = 4;
     */
    numSessionsAcquired: number;
    /**
     * The total number of watchtower sessions that have been exhausted.
     *
     * @generated from field: uint32 num_sessions_exhausted = 5;
     */
    numSessionsExhausted: number;
};
/**
 * Describes the message wtclientrpc.StatsResponse.
 * Use `create(StatsResponseSchema)` to create a new message.
 */
export declare const StatsResponseSchema: GenMessage<StatsResponse>;
/**
 * @generated from message wtclientrpc.PolicyRequest
 */
export type PolicyRequest = Message<"wtclientrpc.PolicyRequest"> & {
    /**
     *
     * The client type from which to retrieve the active offering policy.
     *
     * @generated from field: wtclientrpc.PolicyType policy_type = 1;
     */
    policyType: PolicyType;
};
/**
 * Describes the message wtclientrpc.PolicyRequest.
 * Use `create(PolicyRequestSchema)` to create a new message.
 */
export declare const PolicyRequestSchema: GenMessage<PolicyRequest>;
/**
 * @generated from message wtclientrpc.PolicyResponse
 */
export type PolicyResponse = Message<"wtclientrpc.PolicyResponse"> & {
    /**
     *
     * The maximum number of updates each session we negotiate with watchtowers
     * should allow.
     *
     * @generated from field: uint32 max_updates = 1;
     */
    maxUpdates: number;
    /**
     *
     * Deprecated, use sweep_sat_per_vbyte.
     * The fee rate, in satoshis per vbyte, that will be used by watchtowers for
     * justice transactions in response to channel breaches.
     *
     * @generated from field: uint32 sweep_sat_per_byte = 2 [deprecated = true];
     * @deprecated
     */
    sweepSatPerByte: number;
    /**
     *
     * The fee rate, in satoshis per vbyte, that will be used by watchtowers for
     * justice transactions in response to channel breaches.
     *
     * @generated from field: uint32 sweep_sat_per_vbyte = 3;
     */
    sweepSatPerVbyte: number;
};
/**
 * Describes the message wtclientrpc.PolicyResponse.
 * Use `create(PolicyResponseSchema)` to create a new message.
 */
export declare const PolicyResponseSchema: GenMessage<PolicyResponse>;
/**
 * @generated from enum wtclientrpc.PolicyType
 */
export declare enum PolicyType {
    /**
     * Selects the policy from the legacy tower client.
     *
     * @generated from enum value: LEGACY = 0;
     */
    LEGACY = 0,
    /**
     * Selects the policy from the anchor tower client.
     *
     * @generated from enum value: ANCHOR = 1;
     */
    ANCHOR = 1,
    /**
     * Selects the policy from the taproot tower client.
     *
     * @generated from enum value: TAPROOT = 2;
     */
    TAPROOT = 2
}
/**
 * Describes the enum wtclientrpc.PolicyType.
 */
export declare const PolicyTypeSchema: GenEnum<PolicyType>;
/**
 * WatchtowerClient is a service that grants access to the watchtower client
 * functionality of the daemon.
 *
 * @generated from service wtclientrpc.WatchtowerClient
 */
export declare const WatchtowerClient: GenService<{
    /**
     * lncli: `wtclient add`
     * AddTower adds a new watchtower reachable at the given address and
     * considers it for new sessions. If the watchtower already exists, then
     * any new addresses included will be considered when dialing it for
     * session negotiations and backups.
     *
     * @generated from rpc wtclientrpc.WatchtowerClient.AddTower
     */
    addTower: {
        methodKind: "unary";
        input: typeof AddTowerRequestSchema;
        output: typeof AddTowerResponseSchema;
    };
    /**
     * lncli: `wtclient remove`
     * RemoveTower removes a watchtower from being considered for future session
     * negotiations and from being used for any subsequent backups until it's added
     * again. If an address is provided, then this RPC only serves as a way of
     * removing the address from the watchtower instead.
     *
     * @generated from rpc wtclientrpc.WatchtowerClient.RemoveTower
     */
    removeTower: {
        methodKind: "unary";
        input: typeof RemoveTowerRequestSchema;
        output: typeof RemoveTowerResponseSchema;
    };
    /**
     * lncli: `wtclient deactivate`
     * DeactivateTower sets the given tower's status to inactive so that it
     * is not considered for session negotiation. Its sessions will also not
     * be used while the tower is inactive.
     *
     * @generated from rpc wtclientrpc.WatchtowerClient.DeactivateTower
     */
    deactivateTower: {
        methodKind: "unary";
        input: typeof DeactivateTowerRequestSchema;
        output: typeof DeactivateTowerResponseSchema;
    };
    /**
     * lncli: `wtclient session terminate`
     * Terminate terminates the given session and marks it as terminal so that
     * it is not used for backups anymore.
     *
     * @generated from rpc wtclientrpc.WatchtowerClient.TerminateSession
     */
    terminateSession: {
        methodKind: "unary";
        input: typeof TerminateSessionRequestSchema;
        output: typeof TerminateSessionResponseSchema;
    };
    /**
     * lncli: `wtclient towers`
     * ListTowers returns the list of watchtowers registered with the client.
     *
     * @generated from rpc wtclientrpc.WatchtowerClient.ListTowers
     */
    listTowers: {
        methodKind: "unary";
        input: typeof ListTowersRequestSchema;
        output: typeof ListTowersResponseSchema;
    };
    /**
     * lncli: `wtclient tower`
     * GetTowerInfo retrieves information for a registered watchtower.
     *
     * @generated from rpc wtclientrpc.WatchtowerClient.GetTowerInfo
     */
    getTowerInfo: {
        methodKind: "unary";
        input: typeof GetTowerInfoRequestSchema;
        output: typeof TowerSchema;
    };
    /**
     * lncli: `wtclient stats`
     * Stats returns the in-memory statistics of the client since startup.
     *
     * @generated from rpc wtclientrpc.WatchtowerClient.Stats
     */
    stats: {
        methodKind: "unary";
        input: typeof StatsRequestSchema;
        output: typeof StatsResponseSchema;
    };
    /**
     * lncli: `wtclient policy`
     * Policy returns the active watchtower client policy configuration.
     *
     * @generated from rpc wtclientrpc.WatchtowerClient.Policy
     */
    policy: {
        methodKind: "unary";
        input: typeof PolicyRequestSchema;
        output: typeof PolicyResponseSchema;
    };
}>;
//# sourceMappingURL=wtclient_pb.d.ts.map