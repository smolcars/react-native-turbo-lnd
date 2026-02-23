import { decodeBuffer } from "./buffer";
import { decodeFallback } from "./lowlevel";
import { failedToString, maybeThrowFailedToOption } from "./shared";
import { hasBufferFrom } from "./support";
import { decodeSyncXHR } from "./xhr";

declare const Buffer: any;

const trySyncXHR =
  !hasBufferFrom &&
  typeof Blob === "function" &&
  typeof URL === "function" &&
  typeof URL.createObjectURL === "function";
const validUtfLabels = ["utf-8", "utf8", "unicode-1-1-utf-8"];

let decodeImpl: (bytes: Uint8Array, encoding: string) => string =
  decodeFallback;
if (hasBufferFrom) {
  decodeImpl = decodeBuffer;
} else if (trySyncXHR) {
  (decodeImpl as any) = (string: string) => {
    try {
      return decodeSyncXHR(string as any);
    } catch (e) {
      return decodeFallback(string as any);
    }
  };
}

const ctorString = `construct 'TextDecoder'`;
const errorPrefix = `${failedToString} ${ctorString}: the `;

export class FastTextDecoder {
  encoding: string;
  fatal: boolean;
  ignoreBOM: boolean;

  constructor(utfLabel: string = "utf-8", options?: { fatal: boolean }) {
    maybeThrowFailedToOption(options?.fatal, ctorString, "fatal");

    let ok: boolean;
    if (hasBufferFrom) {
      ok = Buffer.isEncoding(utfLabel);
    } else {
      ok = validUtfLabels.indexOf(utfLabel.toLowerCase()) !== -1;
    }
    if (!ok) {
      throw new RangeError(
        `${errorPrefix} encoding label provided ('${utfLabel}') is invalid.`
      );
    }

    this.encoding = utfLabel;
    this.fatal = false;
    this.ignoreBOM = false;
  }

  decode(
    buffer: ArrayBuffer | ArrayBufferView,
    options?: { stream: boolean }
  ): string {
    maybeThrowFailedToOption(options?.stream, "decode", "stream");

    let bytes: Uint8Array;

    if (buffer instanceof Uint8Array) {
      bytes = buffer;
    } else if ((buffer as any).buffer instanceof ArrayBuffer) {
      bytes = new Uint8Array((buffer as ArrayBufferView).buffer);
    } else {
      bytes = new Uint8Array(buffer as ArrayBuffer);
    }

    return decodeImpl(bytes, this.encoding);
  }
}
