import type { ElectrobunBackendName } from "./types";

export const ELECTROBUN_BACKEND_ENV_VAR = "TURBOLND_ELECTROBUN_BACKEND";
export const DEFAULT_ELECTROBUN_BACKEND: ElectrobunBackendName = "napi";

export function resolveConfiguredElectrobunBackend(): ElectrobunBackendName {
  const configuredBackend = process.env[ELECTROBUN_BACKEND_ENV_VAR]?.trim();
  if (!configuredBackend) {
    return DEFAULT_ELECTROBUN_BACKEND;
  }

  const normalizedBackend = configuredBackend.toLowerCase();
  if (normalizedBackend === "bunffi" || normalizedBackend === "napi") {
    return normalizedBackend;
  }

  throw new Error(
    [
      `Invalid ${ELECTROBUN_BACKEND_ENV_VAR} value "${configuredBackend}".`,
      'Supported backends: "bunffi", "napi".',
    ].join(" ")
  );
}

export function logSelectedElectrobunBackend(
  backendName: ElectrobunBackendName
) {
  console.info(`[react-native-turbo-lnd] Electrobun backend: ${backendName}`);
}
