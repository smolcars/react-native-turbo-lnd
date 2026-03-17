import type { ElectrobunBackendName } from "./types";

export const ELECTROBUN_BACKEND_ENV_VAR = "TURBOLND_ELECTROBUN_BACKEND";
export const DEFAULT_ELECTROBUN_BACKEND: ElectrobunBackendName = "napi";
const ELECTROBUN_LOG_PREFIX = "[react-native-turbo-lnd]";

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
  console.info(`${ELECTROBUN_LOG_PREFIX} Electrobun backend: ${backendName}`);

  if (backendName === "bunffi") {
    console.warn(
      [
        `${ELECTROBUN_LOG_PREFIX} Electrobun bunffi backend is experimental`,
        "and not stable yet.",
        `Prefer ${ELECTROBUN_BACKEND_ENV_VAR}=napi for the more stable backend.`,
      ].join(" ")
    );
  }
}
