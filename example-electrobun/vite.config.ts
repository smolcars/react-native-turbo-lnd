import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  root: "src/mainview",
  resolve: {
    alias: [
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
