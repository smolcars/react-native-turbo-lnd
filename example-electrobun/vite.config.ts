import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  root: "src/mainview",
  resolve: {
    alias: [
      {
        find: /^react-native$/,
        replacement: resolve(__dirname, "src/mainview/react-native-shim.ts"),
      },
      {
        find: /^react-native\/.+$/,
        replacement: resolve(__dirname, "src/mainview/react-native-shim.ts"),
      },
      {
        find: "../core/NativeTurboLnd",
        replacement: resolve(
          __dirname,
          "src/mainview/native-turbo-lnd-core-shim.ts"
        ),
      },
      {
        find: /^electrobun\/view$/,
        replacement: resolve(
          __dirname,
          "node_modules/electrobun/dist/api/browser/index.ts"
        ),
      },
    ],
  },
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
