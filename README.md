# react-native-turbo-lnd

A pure C++-only TurboModule for [lnd](https://github.com/lightningnetwork/lnd).

Easily embed and interact with the Lightning Network client lnd inside an
app with a convenient API. This lib uses lnd's
[falafel](https://github.com/lightninglabs/falafel) bindings in order to run
lnd embedded inside an app.

- ⚡️ Runs [lnd](https://github.com/lightningnetwork/lnd) embedded inside your
  app

- 🕺 Epic [C++ TurboModule](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/turbo-modules-xplat.md)
  bindings for interacting with lnd, sharing the same source-code for all
  platforms

- 🤯 Convenient and simple API for all lnd gRPC methods and server/bidi streams

- 🤓 Type-safety and auto-complete for all protobufs, using
  [protobuf-es](https://github.com/bufbuild/protobuf-es)

- 📦 Unopinionated core bindings for other protobuf libraries. Zero dependencies

- 👷‍♂️ Provide your own lnd binaries, or use our prebuilt ones

### Platform support:

```
✅ Android
✅ iOS
✅ macOS
✅ Windows
🤨 Electrobun (Windows, Linux, macOS) [WIP]
🚫 Web
✅ Jest mocks (all gRPC methods not yet mocked)
```

An opinionated API `react-native-turbo-lnd` using protobuf-es bindings is
provided for lnd's protobufs, giving auto-complete and type-safety for all
protobufs and gRPC methods.

An unopinionated core API `react-native-turbo-lnd/core` to lnd's falafel
bindings is also available if you want to use another protobuf library.
This API let's you send and receive protobufs as base64-encoded strings,
which you can then encode/decode yourself.

> [!NOTE]
> We currently use an out-of-tree fork of lnd for building the binaries, which can be found
> [here](https://github.com/hsjoberg/lnd/tree/cgo).
> This is because the official lnd repository does not yet support using falafel bindings with cgo.
> Once/if the official lnd repository supports building with cgo, we will switch to using the
> official lnd repository. This fork also has a few minor patches that is being used in
> [Blixt Wallet](https://github.com/BlixtWallet/blixt-wallet).

## Installation

This lib requires
[new architecture](https://reactnative.dev/docs/the-new-architecture/landing-page)
enabled in your app. It will not work on the old architecture and there are no
plans to support it.

1. Install the package:

| npm                                  | yarn                              |
| ------------------------------------ | --------------------------------- |
| `npm install react-native-turbo-lnd` | `yarn add react-native-turbo-lnd` |

If you wish to use the protobuf-es bindings:

| npm                              | yarn                          |
| -------------------------------- | ----------------------------- |
| `npm install @bufbuild/protobuf` | `yarn add @bufbuild/protobuf` |

If you wish to use the Electrobun entrypoints (`react-native-turbo-lnd/electrobun/*`):

| npm                     | yarn                 |
| ----------------------- | -------------------- |
| `npm install electrobun` | `yarn add electrobun` |

For custom app-level Electrobun RPC methods/messages, use:

- `react-native-turbo-lnd/electrobun/view` for typed LND RPC methods.
- `react-native-turbo-lnd/electrobun/custom-rpc` for transport helpers
  (`invokeElectrobunRequest`, `sendElectrobunMessage`).

2. Download the lnd binaries automatically using a convenience script from the root of your project:

```sh
node node_modules/react-native-turbo-lnd/fetch-lnd.js
```

By default the convenience script fetches the Android and iOS binaries into
package-owned paths under `node_modules/react-native-turbo-lnd`.
You can override that with `--targets=...`, for example:

```sh
node node_modules/react-native-turbo-lnd/fetch-lnd.js --targets=android,ios,macos,windows
```

Supported targets are `android`, `ios`, `macos`, and `windows`. If you wish to
download the binaries manually, follow the instructions below.

### Android:

Download the latest `liblnd-android.zip` from [hsjoberg/react-native-turbo-lnd/releases](https://github.com/hsjoberg/react-native-turbo-lnd/releases)
containing lnd `.so` binaries. Place the shared libraries in
`<project root>/node_modules/react-native-turbo-lnd/android/src/main/jniLibs`.
The structure should look like this:

```
node_modules/react-native-turbo-lnd/android/src/main/jniLibs
├── arm64-v8a
│   └── liblnd.so
├── armeabi-v7a
│   └── liblnd.so
├── x86
│   └── liblnd.so
└── x86_64
    └── liblnd.so
```

This package now ships a real Android library module, so the package-owned
`android/src/main/jniLibs` directory is what gets bundled into the APK.

The Android `liblnd.h` headers are already checked into this repo under
`node_modules/react-native-turbo-lnd/cpp/liblnd` and are not part of the
downloaded artifact installation step.

CMake will by default look for the files in
`../android/src/main/jniLibs`, starting from
`<project root>/node_modules/react-native-turbo-lnd/cpp`.

If you have another structure or wish to customize it, you can pass in
`-DLND_JNILIBS_PATH` to CMake. For example from your app/build.gradle:

```
defaultConfig {
  // Other configs

  externalNativeBuild {
      cmake {
          arguments "-DLND_JNILIBS_PATH=/your/path/here"
      }
  }
}
```

### iOS/macOS:

Download the latest `liblnd-{ios|mac}.zip` file from
[hsjoberg/react-native-turbo-lnd/releases](https://github.com/hsjoberg/react-native-turbo-lnd/releases)
and unzip it. Then rename `liblnd-fat.a` to `liblnd.a` and place it in
`<project root>/node_modules/react-native-turbo-lnd/{ios|macos}/liblnd.a`.
Then rerun `pod install` so CocoaPods picks up the vendored archive
automatically.

### Windows:

Download or build `liblnd.dll`.

Place it in the package-owned Windows folder:

```text
<project root>/node_modules/react-native-turbo-lnd/windows/liblnd.dll
```

The autolinked `react-native-turbo-lnd` project will search upward from both
the consuming solution and the package's own Windows project for `liblnd.dll`,
generate an import library from it during the Windows build, link that
generated import library, and stage `liblnd.dll` for deployment. By default
the generated `.def`/`.lib` artifacts are written under the consuming app's
`windows/generated-liblnd` directory.

If your workspace layout is unusual, you can override the paths explicitly in
MSBuild with `LndDllPath`. If you already have a known-good import library and
want to use that instead, you can also set `LndImportLibPath` explicitly. When
`LndImportLibPath` is set, the build skips import-library generation from
`liblnd.dll`; if you also want the DLL copied into the app output, keep
`LndDllPath` set as well.

3. Done!

## Usage

```TSX
import { Button, View } from "react-native";
import { start, getInfo } from "react-native-turbo-lnd";

export default function App() {
  const onPressStart = async () => {
    await start(
      `--lnddir="<TODO>" --noseedbackup --nolisten --bitcoin.active --bitcoin.mainnet --bitcoin.node=neutrino --feeurl="https://nodes.lightning.computer/fees/v1/btc-fee-estimates.json" --routing.assumechanvalid --tlsdisableautofill --neutrino.connect=192.168.10.120:19444`
    );
  }

  const onPressGetInfo = async () => {
    const info = await getInfo({});
    console.log("syncedToChain", info.syncedToChain);
  }

  return (
    <View>
      <Button title="start" onPress={onPressStart} />
      <Button title="getInfo" onPress={onPressGetInfo} />
    </View>
  )
}

```

## Building your own lnd binaries

> [!NOTE]
> If you wish to compile your own lnd binaries, you can follow the instructions
> [here](https://github.com/hsjoberg/lnd/tree/cgo/mobile#cgo-build).

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
