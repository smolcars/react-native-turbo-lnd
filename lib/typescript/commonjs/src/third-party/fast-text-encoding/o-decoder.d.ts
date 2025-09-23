export declare class FastTextDecoder {
    encoding: string;
    fatal: boolean;
    ignoreBOM: boolean;
    constructor(utfLabel?: string, options?: {
        fatal: boolean;
    });
    decode(buffer: ArrayBuffer | ArrayBufferView, options?: {
        stream: boolean;
    }): string;
}
//# sourceMappingURL=o-decoder.d.ts.map