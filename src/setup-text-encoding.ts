import { configureTextEncoding } from "@bufbuild/protobuf/wire";

import { FastTextEncoder } from "./third-party/fast-text-encoding/o-encoder";
import { FastTextDecoder } from "./third-party/fast-text-encoding/o-decoder";

const te = new FastTextEncoder();
const td = new FastTextDecoder();

configureTextEncoding({
  encodeUtf8: te.encode as (str: string) => Uint8Array<ArrayBuffer>,
  decodeUtf8: td.decode as (data: Uint8Array) => string,

  checkUtf8: (text: string) => {
    // Follows https://github.com/bufbuild/protobuf-es/blob/c307207d2b9d4370367bbed82c0384662199ae63/packages/protobuf/src/wire/text-encoding.ts#L60-L66
    try {
      encodeURIComponent(text);
      return true;
    } catch {
      return false;
    }
  },
});
