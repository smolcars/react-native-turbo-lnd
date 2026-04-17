# TurboLnd WebAssembly Runtime

This document describes the browser runtime used by
`react-native-turbo-lnd` on web.

## Status

Web support is functional, but it is not currently a serious production target.

Use it with caution:

- the browser runtime is useful for experiments, demos, and controlled app
  environments
- persistence is ultimately controlled by the browser, not by `lnd`
- you should not assume browser-stored node data is as durable as native app
  storage

If you expose this to real users, make backup expectations explicit. Browsers
can clear persisted data due to user action, site-data clearing, profile
resets, private/incognito mode, storage pressure, browser policy, or browser
bugs.

That means wallet and node data stored under browser OPFS should be treated as
recoverable cache/state, not as the only copy you care about.

The current web backend is intentionally narrow:

- Web Worker only
- OPFS-backed filesystem only
- `lndmobile.wasm` plus `wasm_exec.js`
- no direct/main-thread runtime mode

The goal is to run the same embedded `lnd` bindings in the browser while
keeping the runtime predictable enough for real use.

## Bundler Support

- Vite / Webpack: primary browser targets
- Metro / Expo Web: supported only with additional static-asset config

The reason for the split is runtime packaging:

- the Vite/Webpack browser path uses normal ESM/module-relative asset
  resolution
- the Metro-safe path avoids `import.meta` and instead loads worker/runtime
  pieces from plain URLs

So Metro web support currently depends on the consuming app exposing a stable
asset base for those files.

## Loading The Runtime

Install the wasm assets first:

```sh
node node_modules/react-native-turbo-lnd/fetch-lnd.js --targets=web
```

Then load the wasm runtime before calling the normal TurboLnd API:

```ts
import { loadWasmRuntime } from "react-native-turbo-lnd/wasm-load";
import { getInfo, start } from "react-native-turbo-lnd";

await loadWasmRuntime();
await start(
  `--lnddir="/lnd/" --noseedbackup --nolisten --bitcoin.active --bitcoin.mainnet --bitcoin.node=neutrino --norest --no-rest-tls --nobootstrap --no-macaroons --rpclisten=127.0.0.1:10009 --restlisten=127.0.0.1:8080 --tor.socks=127.0.0.1:9050 --tor.control=127.0.0.1:9051`
);

const info = await getInfo({});
```

If the wasm assets are missing, `loadWasmRuntime()` fails with a clear error
instead of letting `start()` fail later.

If you are building the wasm artifact manually instead of using
`fetch-lnd.js --targets=web`:

1. use the wasm-enabled lnd branch at
   [github.com/hsjoberg/lnd/tree/wasm](https://github.com/hsjoberg/lnd/tree/wasm)
2. build it with `make wasm`
3. take the outputs from `wasm/build/`:
   - `lndmobile.wasm`
   - `wasm_exec.js`
4. copy them into TurboLnd's `vendor/lnd-wasm/` directory

## Asset Loading By Environment

### Vite / Webpack

For Vite/Webpack-style ESM bundlers, the package runtime resolves its own JS
worker/runtime files relative to the package build.

The only external files you need to provide are the downloaded LND wasm
artifacts:

- `vendor/lnd-wasm/lndmobile.wasm`
- `vendor/lnd-wasm/wasm_exec.js`

That is what `fetch-lnd.js --targets=web` installs.

### Metro / Expo Web

For Metro web, the package uses a Metro-safe runtime path which loads browser
worker/runtime files from a plain URL base instead of relying on
module-relative `import.meta` asset resolution.

That means the app must expose all of these URLs:

- `/vendor/lnd-wasm/lndmobile.wasm`
- `/vendor/lnd-wasm/wasm_exec.js`
- `/vendor/lnd-wasm/wasm-worker.web.js`
- `/vendor/lnd-wasm/wasm-worker-core.js`
- `/vendor/lnd-wasm/fs_backends.js`
- `/vendor/lnd-wasm/fs_opfs_backend.js`

In the package build, those runtime JS files come from:

- `lib/module/wasm-runtime/wasm-worker.web.js`
- `lib/module/wasm-runtime/wasm-worker-core.js`
- `lib/module/wasm-runtime/assets/fs_backends.js`
- `lib/module/wasm-runtime/assets/fs_opfs_backend.js`

The example app does this with custom Metro middleware. A normal Expo/Metro web
app needs equivalent setup if it wants to use the browser wasm backend.

If you want a different base URL, set these before calling
`loadWasmRuntime()`:

```ts
(globalThis as any).__lndWasmAssetBaseUrl = "/your-static-base/lnd-wasm/";
(globalThis as any).__lndWasmWorkerUrl =
  "/your-static-base/lnd-wasm/wasm-worker.web.js";
```

Those overrides only change where the browser runtime looks for its fetched
assets. They do not change the public TurboLnd API.

## Browser Start Args

The browser runtime is not the same as native mobile or desktop. In practice
you should use browser-safe startup flags and avoid options that rely on host
OS behavior.

A typical browser setup looks like:

```text
--lnddir="/lnd/"
--noseedbackup
--nolisten
--bitcoin.active
--bitcoin.node=neutrino
--bitcoin.mainnet
--norest
--no-rest-tls
--nobootstrap
--no-macaroons
--rpclisten=127.0.0.1:10009
--restlisten=127.0.0.1:8080
--tor.socks=127.0.0.1:9050
--tor.control=127.0.0.1:9051
```

Notes:

- Prefer `127.0.0.1` instead of `localhost` for browser-local listen and Tor
  addresses.
- The browser transport currently plugs into `lnd` through the same `tor.Net`
  interface used by the embedded/mobile path, so the Tor transport addresses
  still need to be set to browser-safe loopback values even if you are not
  using a real local Tor daemon in the browser.
- `--db.bolt.auto-compact` should currently not be enabled on web.
  The compaction path still hits a disk-space probe that is not supported in
  WebAssembly.

## WebSocket Transport

Browser wasm cannot open raw TCP sockets directly. The web runtime solves that
by installing a WebSocket-backed `tor.Net` implementation inside the wasm
backend.

That means peer addresses are still configured as normal `host:port` values in
your `lnd` args or RPC requests, but the browser runtime converts them to
WebSocket endpoints internally.

### Port Mapping

For browser peer transport, the runtime adds `2000` to the configured TCP port
to derive the WebSocket proxy port.

Examples:

- Lightning peer `127.0.0.1:9735` becomes `ws://127.0.0.1:11735`
- Neutrino peer `127.0.0.1:19444` becomes `ws://127.0.0.1:21444`
- `europe.blixtwallet.com:8333` becomes `ws://europe.blixtwallet.com:10333`

This is the same rule used by the wasm demo in the main `lnd` repo.

### Recommended Proxy Setup

The easiest starting point is usually `websockify`.

Examples:

```sh
# Lightning peer traffic
websockify 11735 127.0.0.1:9735

# Neutrino peer traffic
websockify 21444 127.0.0.1:19444
```

With that setup:

- configure the actual peer/listener in `lnd` as `127.0.0.1:9735`
- the browser runtime automatically maps it to `ws://127.0.0.1:11735`

And similarly:

- configure the Neutrino peer as `127.0.0.1:19444`
- the browser runtime automatically maps it to `ws://127.0.0.1:21444`

You can use another WebSocket proxy if you want. The important part is that
the proxy endpoint follows the `port + 2000` rule expected by the runtime.

### `ws://` vs `wss://`

Scheme selection follows the page origin:

- page loaded over `http:` uses `ws://`
- page loaded over `https:` uses `wss://`

So if your app is hosted over HTTPS, the WebSocket proxy also needs to be
available over `wss://`. Otherwise the browser blocks the connection as mixed
content.

## OPFS Storage Model

On web, `lnd` still opens normal paths such as:

- `/lnd/data/graph/mainnet/channel.db`
- `/lnd/data/chain/bitcoin/mainnet/neutrino.db`
- `/lnd/logs/bitcoin/mainnet/lnd.log`

In `js/wasm`, Go routes filesystem operations through `globalThis.fs` from
`wasm_exec.js`. TurboLnd provides that `fs` implementation in the runtime and
backs it with OPFS.

So the storage path is:

1. `lnd` uses normal Go file APIs.
2. Go `js/wasm` forwards those operations to `globalThis.fs`.
3. TurboLnd's browser runtime maps those operations to OPFS.

This means the browser keeps real persistent files under the logical `/lnd/...`
paths exposed to Go.

## Persistence And Backups

The OPFS-backed files are real browser-persisted files from the runtime's point
of view, including:

- `channel.db`
- `wallet.db`
- `neutrino.db`
- header files and log files

But browser persistence is still weaker than native app storage.

Developers should assume users can lose browser-stored data unexpectedly and
plan around that:

- do not treat browser storage as the only durable backup
- make seed handling and SCB/channel backup strategy explicit
- make it easy to export or recreate important state
- be especially careful if testing channels or real funds on web

Today, web should be treated as experimental unless your app environment is
tightly controlled and you fully understand the storage tradeoffs.

## Sync OPFS Access

When the runtime is running in a dedicated Web Worker, the OPFS backend uses
`FileSystemSyncAccessHandle` when available.

That is the important fast path for browser performance:

- offset-based reads and writes
- no full-file JS buffering for normal worker OPFS access
- much better behavior for append-heavy workloads such as Neutrino header files

For testing, you can disable that sync-access path before loading the runtime:

```ts
(globalThis as any).__lndWasmDisableOPFSSyncAccess = true;
```

That forces the slower async OPFS path and is mainly useful for debugging or
comparisons.

## OPFS Limitations

There are still browser-specific filesystem limitations to keep in mind.

### Rename Is Not Metadata-Only

The current OPFS backend does not have a cheap metadata-only `rename()` path.
It currently copies the source entry to the destination and then deletes the
source.

That means large renames are much more expensive than on native filesystems.

### Auto-Compaction

Bolt auto-compaction currently fails on web because the shared compaction path
checks free disk space first, and that disk-space probe is not currently
supported in WebAssembly.

### Worker Requirement

The current TurboLnd web backend is designed around a dedicated Web Worker plus
OPFS. It does not expose the old direct/main-thread wasm runtime.

## Logging And Inspector Output

The wasm runtime captures stdout and stderr from Go, but it does not mirror
those logs into the browser inspector console by default.

To enable inspector console logging, set this flag before calling
`loadWasmRuntime()`:

```ts
(globalThis as any).__lndWasmMirrorStdoutToConsole = true;
```

This only affects console mirroring. It does not change the public TurboLnd API.

## Asset Layout

For published package usage, `fetch-lnd.js --targets=web` installs:

- `vendor/lnd-wasm/lndmobile.wasm`
- `vendor/lnd-wasm/wasm_exec.js`

The rest of the browser runtime stays inside the package source/build output.

For local repo development, the example app may also vendor local copies of the
same wasm assets under its own `public/vendor/lnd-wasm` directory so Vite and
Metro web can load them without going through GitHub release downloads.
