Prebuilt desktop Node-API binaries live here under the generic `native/napi`
package path.

Layout:

- `win32-x64/turbolnd_napi.node`
- `darwin-arm64/turbolnd_napi.node`
- `linux-x64/turbolnd_napi.node`

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
- The static `Lndmobile.xcframework` bundle used by the React Native Apple targets is
  not sufficient for the N-API or Bun FFI runtimes on macOS.

Release artifact notes:

- `liblnd-windows.zip` contains the Windows desktop DLL and is shared with the
  React Native Windows flow.
- `liblnd-linux.zip` contains the Linux desktop shared library.
- `liblnd-macos-dylib.zip` contains the macOS desktop shared library.
- `liblnd-macos.zip` contains the static Apple XCFramework for the React Native
  Apple/macOS targets and cannot be loaded directly by the desktop N-API or
  Bun FFI runtimes.
