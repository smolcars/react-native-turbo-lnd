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
