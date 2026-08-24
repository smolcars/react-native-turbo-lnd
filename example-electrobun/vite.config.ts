import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { electrobunViteAliases } from "./.hutch/devkit/api/config/electrobun-vite";

export default defineConfig({
  plugins: [react()],
  root: "src/mainview",
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: [
      ...electrobunViteAliases(resolve(__dirname, ".hutch/devkit")),
      {
        find: /^react-native-turbo-lnd$/,
        replacement: "react-native-turbo-lnd/electrobun/view",
      },
      {
        find: /^react-native-turbo-lnd\/core$/,
        replacement: "react-native-turbo-lnd/electrobun/view-core",
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
