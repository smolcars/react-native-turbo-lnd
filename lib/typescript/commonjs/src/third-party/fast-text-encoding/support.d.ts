export declare var hasBufferFrom: false | {
    (arrayBuffer: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>, byteOffset?: number, length?: number): Buffer;
    (data: Uint8Array | ReadonlyArray<number>): Buffer;
    (data: WithImplicitCoercion<Uint8Array | ReadonlyArray<number> | string>): Buffer;
    (str: WithImplicitCoercion<string> | {
        [Symbol.toPrimitive](hint: "string"): string;
    }, encoding?: BufferEncoding): Buffer;
};
//# sourceMappingURL=support.d.ts.map