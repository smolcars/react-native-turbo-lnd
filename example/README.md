This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
bun run start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
bun run android
```

### For iOS

```bash
bun run ios
```

### For macOS

The macOS example uses React Native macOS 0.83.0 and the current SwiftUI template.
It requires macOS 14 or newer and Xcode. Download `liblnd-macos.zip` from the
[matching library release](https://github.com/smolcars/react-native-turbo-lnd/releases)
and extract its `Lndmobile.xcframework` into the repository's `macos/` directory.
Then run from the repository root:

```bash
bun install
bun run generate-bindings
pod install --project-directory=example/macos
```

From `example/`, start Metro with `bun run start:macos`, then run `bun run macos`
in another terminal. To build a standalone Release app, run `bun run build:macos`.

macOS uses Hermes and the New Architecture. The CLI and Metro configuration select
`react-native-macos` for macOS. The `react-macos` alias supplies React 19.2.0,
matching its renderer; Android, iOS, and Windows use the existing React Native
0.84.1 and React 19.2.3 dependencies. Bun may report the macOS package's React
Native peer mismatch because these platform versions share a workspace.

The macOS example stores its node in
`~/Library/Application Support/org.reactjs.native.TurboLndExample/lnd/`, keeping
its regtest configuration separate from a standalone node's `lnd.conf`.

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
