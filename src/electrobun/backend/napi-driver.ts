import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type {
  OnErrorCallback,
  OnResponseCallback,
  ProtobufBase64,
  UnsubscribeFromStream,
  WriteableStream,
} from "../../core/NativeTurboLnd";
import type { ElectrobunBackendDriver, ElectrobunMethodLists } from "./types";

const NAPI_ADDON_FILENAME = "turbolnd_electrobun_napi.node";
const DEFAULT_PARENT_SEARCH_DEPTH = 8;
const NAPI_ADDON_OVERRIDE_ENV_VAR = "TURBOLND_ELECTROBUN_NAPI_ADDON_PATH";
const NAPI_PREBUILD_DIRNAME = "electrobun-napi";

const requireFromHere = createRequire(import.meta.url);
const moduleDir = path.dirname(fileURLToPath(import.meta.url));

function getLndLibraryFilename(): string {
  switch (process.platform) {
    case "win32":
      return "liblnd.dll";
    case "linux":
      return "liblnd.so";
    case "darwin":
      return "liblnd.dylib";
    default:
      throw new Error(`Unsupported platform for liblnd: ${process.platform}`);
  }
}

const LND_DLL_FILENAME = getLndLibraryFilename();

type DllResolution = {
  path: string | null;
  checked: string[];
};

type NapiAddonResolution = {
  path: string | null;
  checked: string[];
};

type CreateNapiDriverParams<
  UnaryMethod extends string,
  ServerStreamMethod extends string,
  BidiStreamMethod extends string,
> = ElectrobunMethodLists<UnaryMethod, ServerStreamMethod, BidiStreamMethod>;

type NapiAddon = {
  describeAddon(): unknown;
  initialize(
    liblndPath: string,
    methods: {
      unaryMethods: string[];
      serverStreamMethods: string[];
      bidiStreamMethods: string[];
    }
  ): {
    backend: string;
    libraryPath: string;
    unaryMethodCount: number;
    serverStreamMethodCount: number;
    bidiStreamMethodCount: number;
  };
  start(args: string): Promise<string>;
  invokeUnary(method: string, payload: Buffer): Promise<Buffer>;
  openServerStream(
    method: string,
    payload: Buffer,
    onData: (payload: Buffer) => void,
    onError: (message: string) => void
  ): number;
  closeServerStream(id: number): void;
  openBidiStream(
    method: string,
    onData: (payload: Buffer) => void,
    onError: (message: string) => void
  ): number;
  sendBidiStream(id: number, payload: Buffer): boolean;
  stopBidiStream(id: number): boolean;
};

type NapiDriverResult<
  UnaryMethod extends string,
  ServerStreamMethod extends string,
  BidiStreamMethod extends string,
> = {
  driver: ElectrobunBackendDriver<
    UnaryMethod,
    ServerStreamMethod,
    BidiStreamMethod
  >;
  resolvedDllPath: string;
  resolvedAddonPath: string;
};

function decodeBase64(payload: ProtobufBase64): Buffer {
  if (payload === "") {
    return Buffer.alloc(0);
  }

  return Buffer.from(payload, "base64");
}

function encodeBase64(payload: Uint8Array): ProtobufBase64 {
  return Buffer.from(payload).toString("base64");
}

function resolveLndDllPath(): DllResolution {
  const checked: string[] = [];
  const seen = new Set<string>();
  const checkCandidate = (candidatePath: string): string | null => {
    const absolutePath = path.resolve(candidatePath);
    if (seen.has(absolutePath)) {
      return null;
    }

    seen.add(absolutePath);
    checked.push(absolutePath);
    return existsSync(absolutePath) ? absolutePath : null;
  };

  const execDir = path.dirname(process.execPath);
  const candidatePaths = [
    path.join(process.cwd(), LND_DLL_FILENAME),
    path.join(execDir, LND_DLL_FILENAME),
    path.join(execDir, "..", "Resources", "app", LND_DLL_FILENAME),
    path.join(execDir, "..", "Resources", LND_DLL_FILENAME),
  ];

  for (const candidatePath of candidatePaths) {
    const foundPath = checkCandidate(candidatePath);
    if (foundPath !== null) {
      return { path: foundPath, checked };
    }
  }

  let currentDir = process.cwd();
  for (let level = 0; level < DEFAULT_PARENT_SEARCH_DEPTH; level += 1) {
    const foundPath = checkCandidate(path.join(currentDir, LND_DLL_FILENAME));
    if (foundPath !== null) {
      return { path: foundPath, checked };
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }

    currentDir = parentDir;
  }

  return { path: null, checked };
}

function resolveNapiAddonPath(): NapiAddonResolution {
  const checked: string[] = [];
  const seen = new Set<string>();
  const checkCandidate = (candidatePath: string): string | null => {
    const absolutePath = path.resolve(candidatePath);
    if (seen.has(absolutePath)) {
      return null;
    }

    seen.add(absolutePath);
    checked.push(absolutePath);
    return existsSync(absolutePath) ? absolutePath : null;
  };

  const overridePath = process.env[NAPI_ADDON_OVERRIDE_ENV_VAR]?.trim();
  if (overridePath) {
    const overrideMatch = checkCandidate(overridePath);
    if (overrideMatch !== null) {
      return { path: overrideMatch, checked };
    }
  }

  const platformArchDir = `${process.platform}-${process.arch}`;
  const execDir = path.dirname(process.execPath);
  const packagedCandidatePaths = [
    path.join(execDir, "..", "Resources", "app", "bun", NAPI_ADDON_FILENAME),
    path.join(execDir, "..", "Resources", "app", NAPI_ADDON_FILENAME),
    path.join(execDir, "..", "Resources", NAPI_ADDON_FILENAME),
  ];

  for (const candidatePath of packagedCandidatePaths) {
    const packagedMatch = checkCandidate(candidatePath);
    if (packagedMatch !== null) {
      return { path: packagedMatch, checked };
    }
  }

  const packagedPrebuildSuffix = path.join(
    "native",
    NAPI_PREBUILD_DIRNAME,
    platformArchDir,
    NAPI_ADDON_FILENAME
  );
  const workspaceBuildSuffix = path.join(
    "electrobun-napi-addon",
    "build",
    "Release",
    NAPI_ADDON_FILENAME
  );

  const searchBaseDirs = [moduleDir, process.cwd()];

  for (const baseDir of searchBaseDirs) {
    let currentDir = baseDir;
    for (let level = 0; level < DEFAULT_PARENT_SEARCH_DEPTH; level += 1) {
      const packagedPrebuildMatch = checkCandidate(
        path.join(currentDir, packagedPrebuildSuffix)
      );
      if (packagedPrebuildMatch !== null) {
        return { path: packagedPrebuildMatch, checked };
      }

      const workspaceBuildMatch = checkCandidate(
        path.join(currentDir, workspaceBuildSuffix)
      );
      if (workspaceBuildMatch !== null) {
        return { path: workspaceBuildMatch, checked };
      }

      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) {
        break;
      }

      currentDir = parentDir;
    }
  }

  return { path: null, checked };
}

let initializedAddon: NapiAddon | null = null;
let cachedResolvedDllPath: string | null = null;
let cachedResolvedAddonPath: string | null = null;

function getInitializedAddon(): {
  addon: NapiAddon;
  resolvedDllPath: string;
  resolvedAddonPath: string;
} | null {
  if (
    initializedAddon !== null &&
    cachedResolvedDllPath !== null &&
    cachedResolvedAddonPath !== null
  ) {
    return {
      addon: initializedAddon,
      resolvedDllPath: cachedResolvedDllPath,
      resolvedAddonPath: cachedResolvedAddonPath,
    };
  }

  return null;
}

export function createNapiDriver<
  UnaryMethod extends string,
  ServerStreamMethod extends string,
  BidiStreamMethod extends string,
>({
  unaryMethods,
  serverStreamMethods,
  bidiStreamMethods,
}: CreateNapiDriverParams<
  UnaryMethod,
  ServerStreamMethod,
  BidiStreamMethod
>): NapiDriverResult<UnaryMethod, ServerStreamMethod, BidiStreamMethod> {
  const cachedAddon = getInitializedAddon();
  let initialized = cachedAddon;
  if (initialized === null) {
    const dllResolution = resolveLndDllPath();
    if (dllResolution.path === null) {
      throw new Error(
        [
          "Unable to find the liblnd shared library for the N-API Electrobun backend.",
          `cwd=${process.cwd()}`,
          `execPath=${process.execPath}`,
          "Checked paths:",
          ...dllResolution.checked.map((entry) => `  - ${entry}`),
        ].join("\n")
      );
    }

    const addonResolution = resolveNapiAddonPath();
    if (addonResolution.path === null) {
      throw new Error(
        [
          "Unable to find the Electrobun N-API addon.",
          `Set ${NAPI_ADDON_OVERRIDE_ENV_VAR} to override the addon path.`,
          "Checked paths:",
          ...addonResolution.checked.map((entry) => `  - ${entry}`),
        ].join("\n")
      );
    }

    const addon = requireFromHere(addonResolution.path) as NapiAddon;
    addon.initialize(dllResolution.path, {
      unaryMethods: [...unaryMethods],
      serverStreamMethods: [...serverStreamMethods],
      bidiStreamMethods: [...bidiStreamMethods],
    });

    initializedAddon = addon;
    cachedResolvedDllPath = dllResolution.path;
    cachedResolvedAddonPath = addonResolution.path;
    initialized = {
      addon,
      resolvedDllPath: dllResolution.path,
      resolvedAddonPath: addonResolution.path,
    };
  }

  const driver: ElectrobunBackendDriver<
    UnaryMethod,
    ServerStreamMethod,
    BidiStreamMethod
  > = {
    async start(args: string): Promise<string> {
      return initialized.addon.start(args);
    },
    async invokeUnary(
      method: UnaryMethod,
      request: ProtobufBase64
    ): Promise<ProtobufBase64> {
      const response = await initialized.addon.invokeUnary(
        method,
        decodeBase64(request)
      );
      return encodeBase64(response);
    },
    openServerStream(
      method: ServerStreamMethod,
      data: ProtobufBase64,
      onResponse: OnResponseCallback,
      onError: OnErrorCallback
    ): UnsubscribeFromStream {
      const subscriptionId = initialized.addon.openServerStream(
        method,
        decodeBase64(data),
        (payload) => {
          onResponse(encodeBase64(payload));
        },
        onError
      );

      return () => {
        initialized.addon.closeServerStream(subscriptionId);
      };
    },
    openBidiStream(
      method: BidiStreamMethod,
      onResponse: OnResponseCallback,
      onError: OnErrorCallback
    ): WriteableStream {
      const subscriptionId = initialized.addon.openBidiStream(
        method,
        (payload) => {
          onResponse(encodeBase64(payload));
        },
        onError
      );

      return {
        send(dataB64: ProtobufBase64): boolean {
          return initialized.addon.sendBidiStream(
            subscriptionId,
            decodeBase64(dataB64)
          );
        },
        stop(): boolean {
          return initialized.addon.stopBidiStream(subscriptionId);
        },
      };
    },
  };

  return {
    driver,
    resolvedDllPath: initialized.resolvedDllPath,
    resolvedAddonPath: initialized.resolvedAddonPath,
  };
}
