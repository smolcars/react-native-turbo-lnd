"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodeImpl = exports.FastTextEncoder = void 0;
var _buffer = require("./buffer.js");
var _lowlevel = require("./lowlevel.js");
var _shared = require("./shared.js");
var _support = require("./support.js");
var encodeImpl = exports.encodeImpl = _support.hasBufferFrom ? _buffer.encodeBuffer : _lowlevel.encodeFallback;
class FastTextEncoder {
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
  encode(string, options) {
    (0, _shared.maybeThrowFailedToOption)(options?.stream, "encode", "stream");
    return encodeImpl(string);
  }
}
exports.FastTextEncoder = FastTextEncoder;
//# sourceMappingURL=o-encoder.js.map