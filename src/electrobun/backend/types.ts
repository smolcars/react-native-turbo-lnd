import type {
  OnErrorCallback,
  OnResponseCallback,
  ProtobufBase64,
  Spec,
  UnsubscribeFromStream,
  WriteableStream,
} from "../../core/NativeTurboLnd";

export type ElectrobunBackendName = "bunffi" | "napi";

export type ElectrobunMethodLists<
  UnaryMethod extends string,
  ServerStreamMethod extends string,
  BidiStreamMethod extends string,
> = {
  unaryMethods: readonly UnaryMethod[];
  serverStreamMethods: readonly ServerStreamMethod[];
  bidiStreamMethods: readonly BidiStreamMethod[];
};

export type ElectrobunBackendDriver<
  UnaryMethod extends string,
  ServerStreamMethod extends string,
  BidiStreamMethod extends string,
> = {
  start(args: string): Promise<string>;
  invokeUnary(
    method: UnaryMethod,
    request: ProtobufBase64
  ): Promise<ProtobufBase64>;
  openServerStream(
    method: ServerStreamMethod,
    data: ProtobufBase64,
    onResponse: OnResponseCallback,
    onError: OnErrorCallback
  ): UnsubscribeFromStream;
  openBidiStream(
    method: BidiStreamMethod,
    onResponse: OnResponseCallback,
    onError: OnErrorCallback
  ): WriteableStream;
};

export type ElectrobunBackendSpec<
  UnaryMethod extends string,
  ServerStreamMethod extends string,
  BidiStreamMethod extends string,
> = Pick<Spec, "start"> &
  Record<UnaryMethod, (data: ProtobufBase64) => Promise<ProtobufBase64>> &
  Record<
    ServerStreamMethod,
    (
      data: ProtobufBase64,
      onResponse: OnResponseCallback,
      onError: OnErrorCallback
    ) => UnsubscribeFromStream
  > &
  Record<
    BidiStreamMethod,
    (
      onResponse: OnResponseCallback,
      onError: OnErrorCallback
    ) => WriteableStream
  >;
