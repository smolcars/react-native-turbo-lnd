declare module "bun:ffi" {
  export type Pointer = number | bigint;

  export class CString {
    constructor(ptr: Pointer);
    toString(): string;
  }

  export class JSCallback {
    constructor(
      callback: (...args: any[]) => any,
      options: { args: string[]; returns: string; threadsafe?: boolean }
    );
    ptr: Pointer;
    close(): void;
  }

  export function dlopen<TSymbols>(
    path: string,
    symbols: TSymbols
  ): {
    symbols: {
      [K in keyof TSymbols]: (...args: any[]) => any;
    };
    close(): void;
  };

  export function ptr(value: ArrayBuffer): Pointer;
  export function toArrayBuffer(
    ptr: Pointer,
    offset: number,
    length: number
  ): ArrayBuffer;
}
