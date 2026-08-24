# TurboLnd Electrobun Example

This app is part of the root Bun workspace. Install dependencies from the repository root so it resolves the local `react-native-turbo-lnd` package through the workspace instead of relative source imports.

## Getting Started

Run these commands from the repository root:

```powershell
bun install
$env:TURBOLND_ELECTROBUN_BACKEND = "bunffi"
bun run --cwd example-electrobun dev
```

Electrobun 2 prepares its Hutch devkit on the first run. The environment
variable is inherited by the Bun main process and selects TurboLnd's
`bun:ffi` backend. Omit it (or set it to `napi`) to use the N-API backend.

For HMR:

```powershell
bun run --cwd example-electrobun dev:hmr
```

For a release build:

```powershell
bun run --cwd example-electrobun build:canary
```
