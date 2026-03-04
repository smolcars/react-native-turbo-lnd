export type ProtobufBase64 = string;
export type OnResponseCallback = (data: ProtobufBase64) => void;
export type OnErrorCallback = (error: string) => void;
export type UnsubscribeFromStream = () => void;

export interface WriteableStream {
  send: (data: ProtobufBase64) => boolean;
  stop: () => boolean;
}

export type Spec = Record<string, unknown>;

const NativeTurboLndCoreShim = {};
export default NativeTurboLndCoreShim;
