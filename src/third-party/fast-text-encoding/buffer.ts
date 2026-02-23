declare const Buffer: any;

/**
 * @param {Uint8Array} bytes
 * @param {string} encoding
 * @return {string}
 */
export function decodeBuffer(bytes: Uint8Array, encoding: string) {
  /** @type {Buffer} */
  var b;
  if (Buffer.isBuffer(bytes)) {
    // @ts-ignore
    b = bytes;
  } else {
    b = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  }
  return b.toString(/** @type {BufferEncoding} */ encoding as any);
}

/**
 * @param {string} string
 * @return {Uint8Array}
 */
export var encodeBuffer = (string: string) => Buffer.from(string);
