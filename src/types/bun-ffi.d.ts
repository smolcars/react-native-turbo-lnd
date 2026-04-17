declare module "bun:ffi" {
  export type Pointer = number | bigint;

  export class CString {
    constructor(pointer: Pointer);
    toString(): string;
  }

  export class JSCallback {
    constructor(
      callback: (...args: any[]) => unknown,
      options: {
        args: readonly string[];
        returns: string;
        threadsafe?: boolean;
      }
    );

    ptr: Pointer | null;
    close(): void;
  }

  export const suffix: string;

  export function dlopen<Symbols>(
    path: string,
    symbols: Record<string, { args: readonly string[]; returns: string }>
  ): {
    symbols: Symbols;
  };

  export function ptr(value: ArrayBufferLike): Pointer;

  export function toArrayBuffer(
    pointer: Pointer,
    byteOffset?: number,
    byteLength?: number
  ): ArrayBuffer;
}
