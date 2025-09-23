import { encodeFallback } from "./lowlevel";
export declare var encodeImpl: ((string: string) => Buffer) | typeof encodeFallback;
export declare class FastTextEncoder {
    encoding: string;
    constructor();
    /**
     * @param {string} string
     * @param {{stream: boolean}=} options
     * @return {Uint8Array}
     */
    encode(string: string, options?: {
        stream: boolean;
    }): Uint8Array;
}
//# sourceMappingURL=o-encoder.d.ts.map