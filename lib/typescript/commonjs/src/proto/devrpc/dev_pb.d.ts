import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { ChannelGraphSchema } from "../lightning_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file devrpc/dev.proto.
 */
export declare const file_devrpc_dev: GenFile;
/**
 * @generated from message devrpc.ImportGraphResponse
 */
export type ImportGraphResponse = Message<"devrpc.ImportGraphResponse"> & {};
/**
 * Describes the message devrpc.ImportGraphResponse.
 * Use `create(ImportGraphResponseSchema)` to create a new message.
 */
export declare const ImportGraphResponseSchema: GenMessage<ImportGraphResponse>;
/**
 * @generated from service devrpc.Dev
 */
export declare const Dev: GenService<{
    /**
     *
     * ImportGraph imports a ChannelGraph into the graph database. Should only be
     * used for development.
     *
     * @generated from rpc devrpc.Dev.ImportGraph
     */
    importGraph: {
        methodKind: "unary";
        input: typeof ChannelGraphSchema;
        output: typeof ImportGraphResponseSchema;
    };
}>;
//# sourceMappingURL=dev_pb.d.ts.map