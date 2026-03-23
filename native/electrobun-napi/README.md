Prebuilt Electrobun Node-API binaries live here.

Layout:

- `win32-x64/turbolnd_electrobun_napi.node`
- `darwin-arm64/turbolnd_electrobun_napi.node`
- `linux-x64/turbolnd_electrobun_napi.node`

The filename stays constant. Platform and architecture are encoded in the parent
directory name.

To sync the current machine's local build into this layout:

```bash
bun run build-napi-prebuild
```

Runtime notes:

- The N-API addon dynamically loads `liblnd` at runtime.
- Windows uses `liblnd.dll`.
- Linux uses `liblnd.so`.
- macOS uses `liblnd.dylib`.
- The static `liblnd-fat.a` archive used by the React Native Apple targets is
  not sufficient for the N-API or Bun FFI runtimes on macOS.
