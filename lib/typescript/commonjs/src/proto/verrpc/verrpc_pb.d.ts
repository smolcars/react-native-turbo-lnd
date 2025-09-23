import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file verrpc/verrpc.proto.
 */
export declare const file_verrpc_verrpc: GenFile;
/**
 * @generated from message verrpc.VersionRequest
 */
export type VersionRequest = Message<"verrpc.VersionRequest"> & {};
/**
 * Describes the message verrpc.VersionRequest.
 * Use `create(VersionRequestSchema)` to create a new message.
 */
export declare const VersionRequestSchema: GenMessage<VersionRequest>;
/**
 * @generated from message verrpc.Version
 */
export type Version = Message<"verrpc.Version"> & {
    /**
     * A verbose description of the daemon's commit.
     *
     * @generated from field: string commit = 1;
     */
    commit: string;
    /**
     * The SHA1 commit hash that the daemon is compiled with.
     *
     * @generated from field: string commit_hash = 2;
     */
    commitHash: string;
    /**
     * The semantic version.
     *
     * @generated from field: string version = 3;
     */
    version: string;
    /**
     * The major application version.
     *
     * @generated from field: uint32 app_major = 4;
     */
    appMajor: number;
    /**
     * The minor application version.
     *
     * @generated from field: uint32 app_minor = 5;
     */
    appMinor: number;
    /**
     * The application patch number.
     *
     * @generated from field: uint32 app_patch = 6;
     */
    appPatch: number;
    /**
     * The application pre-release modifier, possibly empty.
     *
     * @generated from field: string app_pre_release = 7;
     */
    appPreRelease: string;
    /**
     * The list of build tags that were supplied during compilation.
     *
     * @generated from field: repeated string build_tags = 8;
     */
    buildTags: string[];
    /**
     * The version of go that compiled the executable.
     *
     * @generated from field: string go_version = 9;
     */
    goVersion: string;
};
/**
 * Describes the message verrpc.Version.
 * Use `create(VersionSchema)` to create a new message.
 */
export declare const VersionSchema: GenMessage<Version>;
/**
 * Versioner is a service that can be used to get information about the version
 * and build information of the running daemon.
 *
 * @generated from service verrpc.Versioner
 */
export declare const Versioner: GenService<{
    /**
     * lncli: `version`
     * GetVersion returns the current version and build information of the running
     * daemon.
     *
     * @generated from rpc verrpc.Versioner.GetVersion
     */
    getVersion: {
        methodKind: "unary";
        input: typeof VersionRequestSchema;
        output: typeof VersionSchema;
    };
}>;
//# sourceMappingURL=verrpc_pb.d.ts.map