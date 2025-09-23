/**
 * This is a horrible hack which works in some old browsers. We can tell them to decode bytes via
 * sync XHR.
 *
 * Throws if fails. Should be wrapped in something to check that.
 *
 * @param {Uint8Array} bytes
 * @return {string}
 */
export declare function decodeSyncXHR(bytes: Uint8Array): string;
//# sourceMappingURL=xhr.d.ts.map