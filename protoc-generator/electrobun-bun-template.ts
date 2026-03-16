/* eslint-disable */

export type BuildElectrobunBunParams = {
  contributorNotice: string;
  unaryMethods: string[];
  serverStreamingMethods: string[];
  bidiStreamingMethods: string[];
};

function buildMethodArray(
  constantName: string,
  methods: string[],
  exported = false
): string {
  const exportKeyword = exported ? "export " : "";
  if (methods.length === 0) {
    return `${exportKeyword}const ${constantName} = [] as const;`;
  }

  return `${exportKeyword}const ${constantName} = [\n${methods
    .map((method) => `  "${method}",`)
    .join("\n")}\n] as const;`;
}

export function buildElectrobunBun({
  contributorNotice,
  unaryMethods,
  serverStreamingMethods,
  bidiStreamingMethods,
}: BuildElectrobunBunParams): string {
  return `${contributorNotice}
/* eslint-disable */
import type { Spec } from "../core/NativeTurboLnd";
import { createElectrobunBackend } from "./backend/create-backend";
import { createBunffiDriver } from "./backend/bunffi-driver";
import { createNapiDriver } from "./backend/napi-driver";
import {
  logSelectedElectrobunBackend,
  resolveConfiguredElectrobunBackend,
} from "./backend/select-driver";
import type {
  ElectrobunBackendDriver,
  ElectrobunBackendName,
  ElectrobunMethodLists,
} from "./backend/types";

${buildMethodArray("ELECTROBUN_UNARY_METHODS", unaryMethods, true)}
${buildMethodArray(
  "ELECTROBUN_SERVER_STREAM_METHODS",
  serverStreamingMethods,
  true
)}
${buildMethodArray("ELECTROBUN_BIDI_STREAM_METHODS", bidiStreamingMethods, true)}

type ElectrobunUnaryMethod = (typeof ELECTROBUN_UNARY_METHODS)[number];
type ElectrobunServerStreamMethod =
  (typeof ELECTROBUN_SERVER_STREAM_METHODS)[number];
type ElectrobunBidiStreamMethod = (typeof ELECTROBUN_BIDI_STREAM_METHODS)[number];

type TurboLndElectrobunDriver = ElectrobunBackendDriver<
  ElectrobunUnaryMethod,
  ElectrobunServerStreamMethod,
  ElectrobunBidiStreamMethod
>;

const electrobunMethods = {
  unaryMethods: ELECTROBUN_UNARY_METHODS,
  serverStreamMethods: ELECTROBUN_SERVER_STREAM_METHODS,
  bidiStreamMethods: ELECTROBUN_BIDI_STREAM_METHODS,
} satisfies ElectrobunMethodLists<
  ElectrobunUnaryMethod,
  ElectrobunServerStreamMethod,
  ElectrobunBidiStreamMethod
>;

function selectElectrobunBackend(): {
  name: ElectrobunBackendName;
  driver: TurboLndElectrobunDriver;
  resolvedDllPath: string;
} {
  const backendName = resolveConfiguredElectrobunBackend();

  switch (backendName) {
    case "bunffi": {
      const bunffiBackend = createBunffiDriver(electrobunMethods);
      return {
        name: backendName,
        driver: bunffiBackend.driver,
        resolvedDllPath: bunffiBackend.resolvedDllPath,
      };
    }
    case "napi": {
      const napiBackend = createNapiDriver(electrobunMethods);
      return {
        name: backendName,
        driver: napiBackend.driver,
        resolvedDllPath: napiBackend.resolvedDllPath,
      };
    }
  }
}

const selectedBackend = selectElectrobunBackend();
logSelectedElectrobunBackend(selectedBackend.name);

export const resolvedDllPath = selectedBackend.resolvedDllPath;

const TurboLndElectrobunBackend = createElectrobunBackend({
  driver: selectedBackend.driver,
  methods: electrobunMethods,
}) satisfies Spec;

export default TurboLndElectrobunBackend;
`;
}
