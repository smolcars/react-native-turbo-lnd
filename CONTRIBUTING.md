# Contributing

Contributions are always welcome, no matter how large or small!

## Development workflow

This project is a monorepo managed using [Bun workspaces](https://bun.sh/docs/install/workspaces). It contains the following packages:

- The library package in the root directory.
- An example app in the `example/` directory.
- The code generator package in the `protoc-generator/` directory.

To get started with the project, run `bun install` in the root directory to install the required dependencies for each package:

```sh
bun install
```

Most files are generated using the protoc plugin in the `protoc-generator` folder, and they're tagged with a notice in the top.

In order to generate these files, you need [protoc](https://github.com/protocolbuffers/protobuf/releases/tag/v28.0) installed and in your `PATH`.

Once you have protoc, run `bun run generate-bindings` in the root directory.

> Since the project relies on Bun workspaces, use Bun commands for development.

The [example app](/example/) demonstrates usage of the library. You need to run it to test any changes you make.

It is configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the example app.

To make changes to the C++ and Typescript code, you can either editor the generated files in `cpp/` and `src/` respectively. You you will then need
to make the same changes in `protoc-generator/`. You can also just directly edit the generator if it's a smaller change.

You can use various commands from the root directory to work with the project.

To start the packager:

```sh
bun run example start
```

To run the example app on Android:

```sh
bun run example android
```

To run the example app on iOS:

```sh
bun run example ios
```

To confirm that the app is running with the new architecture, you can check the Metro logs for a message like this:

```sh
Running "TurboLndExample" with {"fabric":true,"initialProps":{"concurrentRoot":true},"rootTag":1}
```

Note the `"fabric":true` and `"concurrentRoot":true` properties.

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
bun run typecheck
bun run lint
```

To fix formatting errors, run the following:

```sh
bun run lint --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
bun run release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

- `bun install`: setup project by installing dependencies.
- `bun run typecheck`: type-check files with TypeScript.
- `bun run lint`: lint files with ESLint.
- `bun run test`: run unit tests with Jest.
- `bun run generate-bindings`: Generate C++ and TypeScript bindings for `cpp/`, `src/index.ts`, `src/mock.ts`, `src/core/NativeTurboLnd.ts`, and `src/proto/**`.
- `bun run generate-codegen-specs`: Generate TurboModule codegen specs
- `bun run bob`: build the library using `react-native-builder-bob`.
- `bun run build`: generate lnd bindings & C++ TurboModule codegen and build the library using `react-native-builder-bob`.
- `bun run example start`: start the Metro server for the example app.
- `bun run example android`: run the example app on Android.
- `bun run example ios`: run the example app on iOS.



### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
