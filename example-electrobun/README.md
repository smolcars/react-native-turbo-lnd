# TurboLnd Electrobun Example

This app is part of the root Bun workspace. Install dependencies from the repository root so it resolves the local `react-native-turbo-lnd` package through the workspace instead of relative source imports.

## Getting Started

Run these commands from the repository root:

```bash
bun install
bun run --cwd example-electrobun dev
```

For HMR:

```bash
bun run --cwd example-electrobun dev:hmr
```

For a release build:

```bash
bun run --cwd example-electrobun build:canary
```
