import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Version } from "../verrpc/verrpc_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file lnclipb/lncli.proto.
 */
export declare const file_lnclipb_lncli: GenFile;
/**
 * @generated from message lnclipb.VersionResponse
 */
export type VersionResponse = Message<"lnclipb.VersionResponse"> & {
    /**
     * The version information for lncli.
     *
     * @generated from field: verrpc.Version lncli = 1;
     */
    lncli?: Version;
    /**
     * The version information for lnd.
     *
     * @generated from field: verrpc.Version lnd = 2;
     */
    lnd?: Version;
};
/**
 * Describes the message lnclipb.VersionResponse.
 * Use `create(VersionResponseSchema)` to create a new message.
 */
export declare const VersionResponseSchema: GenMessage<VersionResponse>;
//# sourceMappingURL=lncli_pb.d.ts.map