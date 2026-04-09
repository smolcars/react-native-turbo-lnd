import type { ElectrobunConfig } from "electrobun";

const NAPI_ADDON_FILENAME = "turbolnd_napi.node";

function isNapiBackendEnabled(): boolean {
  return process.env.TURBOLND_ELECTROBUN_BACKEND === "napi";
}

function getNapiAddonCachePath(): string {
  return `node_modules/.electrobun-cache/electrobun-napi-addon/${process.platform}-${process.arch}/${NAPI_ADDON_FILENAME}`;
}

const napiAddonCopy = isNapiBackendEnabled()
  ? {
      [getNapiAddonCachePath()]: `bun/${NAPI_ADDON_FILENAME}`,
    }
  : {};

export default {
  app: {
    name: "react-tailwind-vite",
    identifier: "reacttailwindvite.electrobun.dev",
    version: "0.0.1",
  },
  build: {
    // Vite builds to dist/, we copy from there
    copy: {
      "dist/index.html": "views/mainview/index.html",
      "dist/assets": "views/mainview/assets",
      ...napiAddonCopy,
    },
    // Ignore Vite output in watch mode — HMR handles view rebuilds separately
    watchIgnore: ["dist/**"],
    mac: {
      bundleCEF: false,
    },
    linux: {
      bundleCEF: false,
    },
    win: {
      bundleCEF: false,
    },
  },
} satisfies ElectrobunConfig;
