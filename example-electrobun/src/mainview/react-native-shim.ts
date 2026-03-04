export type TurboModule = unknown;

export const NativeModules: Record<string, unknown> = {};

export const Platform = {
  OS: "web",
  select<T>(
    options: { web?: T; default?: T } & Record<string, T | undefined>
  ): T | undefined {
    return options.web ?? options.default;
  },
};

export const TurboModuleRegistry = {
  get(_name: string): null {
    return null;
  },
  getEnforcing(name: string): never {
    throw new Error(
      `TurboModule "${name}" is unavailable in react-native web shim.`
    );
  },
};

const ReactNativeShim = {
  NativeModules,
  Platform,
  TurboModuleRegistry,
};

export default ReactNativeShim;
