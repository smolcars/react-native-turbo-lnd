import type {
  OnErrorCallback,
  OnResponseCallback,
  ProtobufBase64,
} from "../../core/NativeTurboLnd";
import type {
  ElectrobunBackendDriver,
  ElectrobunBackendSpec,
  ElectrobunMethodLists,
} from "./types";

export function createElectrobunBackend<
  UnaryMethod extends string,
  ServerStreamMethod extends string,
  BidiStreamMethod extends string,
>({
  driver,
  methods,
}: {
  driver: ElectrobunBackendDriver<
    UnaryMethod,
    ServerStreamMethod,
    BidiStreamMethod
  >;
  methods: ElectrobunMethodLists<
    UnaryMethod,
    ServerStreamMethod,
    BidiStreamMethod
  >;
}): ElectrobunBackendSpec<UnaryMethod, ServerStreamMethod, BidiStreamMethod> {
  const unaryEntries = methods.unaryMethods.map(
    (method) =>
      [
        method,
        (data: ProtobufBase64) => driver.invokeUnary(method, data),
      ] as const
  );

  const serverStreamEntries = methods.serverStreamMethods.map(
    (method) =>
      [
        method,
        (
          data: ProtobufBase64,
          onResponse: OnResponseCallback,
          onError: OnErrorCallback
        ) => driver.openServerStream(method, data, onResponse, onError),
      ] as const
  );

  const bidiEntries = methods.bidiStreamMethods.map(
    (method) =>
      [
        method,
        (onResponse: OnResponseCallback, onError: OnErrorCallback) =>
          driver.openBidiStream(method, onResponse, onError),
      ] as const
  );

  return {
    start: driver.start,
    ...Object.fromEntries(unaryEntries),
    ...Object.fromEntries(serverStreamEntries),
    ...Object.fromEntries(bidiEntries),
  } as ElectrobunBackendSpec<UnaryMethod, ServerStreamMethod, BidiStreamMethod>;
}
