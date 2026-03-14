import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const lintedFiles = [
  "fetch-lnd.js",
  "src/*.ts",
  "src/*.tsx",
  "src/core/**/*.{js,ts,tsx}",
  "src/electrobun/**/*.{js,ts,tsx}",
  "src/mocks/**/*.{js,ts,tsx}",
  "src/proto/**/*.{js,ts,tsx}",
  "tests/**/*.{js,ts,tsx}",
  "scripts/**/*.{js,ts,tsx}",
  "protoc-generator/*.ts",
  "protoc-generator/protos/**/*.{js,ts,tsx}",
  "example/src/**/*.{js,ts,tsx}",
  "example-electrobun/electrobun.config.ts",
  "example-electrobun/postcss.config.js",
  "example-electrobun/tailwind.config.js",
  "example-electrobun/vite.config.ts",
  "example-electrobun/src/**/*.{js,ts,tsx}",
  "example-electrobun/scripts/**/*.{js,ts,tsx}",
];

const compatConfigs = fixupConfigRules(
  compat.extends("@react-native", "prettier")
).map((config) => ({
  ...config,
  files: lintedFiles,
}));

export default defineConfig([
  {
    ignores: [
      "**/node_modules/**",
      "**/lib/**",
      "**/dist/**",
      "**/build/**",
      "**/artifacts/**",
      "**/.cache/**",
      "**/coverage/**",
      "src/third-party/**",
      "protoc-generator/build/**",
      "example/.bundle/**",
      "example-electron/.webpack/**",
      "example-electron/out/**",
    ],
  },
  ...compatConfigs,
  {
    files: lintedFiles,
    plugins: { prettier },
    rules: {
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error",
      "eslint-comments/no-unlimited-disable": "off",
    },
  },
]);
