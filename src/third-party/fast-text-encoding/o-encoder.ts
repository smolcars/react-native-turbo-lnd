import { encodeBuffer } from "./buffer";
import { encodeFallback } from "./lowlevel";
import { maybeThrowFailedToOption } from "./shared";
import { hasBufferFrom } from "./support";

export var encodeImpl = hasBufferFrom ? encodeBuffer : encodeFallback;

export class FastTextEncoder {
  public encoding: string;

  constructor() {
    // This does not accept an encoding, and always uses UTF-8:
    //   https://www.w3.org/TR/encoding/#dom-textencoder
    this.encoding = "utf-8";
  }

  /**
   * @param {string} string
   * @param {{stream: boolean}=} options
   * @return {Uint8Array}
   */
  encode(string: string, options?: { stream: boolean }): Uint8Array {
    maybeThrowFailedToOption(options?.stream, "encode", "stream");
    return encodeImpl(string) as Uint8Array;
  }
}
