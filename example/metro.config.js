const fs = require("fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withMetroConfig } = require("react-native-monorepo-config");
const pack = require("../package.json");

const root = path.resolve(__dirname, "..");
const modules = Object.keys({ ...pack.peerDependencies });
const rnwPath = fs.realpathSync(
  path.resolve(require.resolve("react-native-windows/package.json"), "..")
);
const packageRequire = createRequire(path.join(__dirname, "package.json"));
const resolvePackageDir = (name) => {
  try {
    return fs.realpathSync(
      path.dirname(packageRequire.resolve(`${name}/package.json`))
    );
  } catch (error) {
    // Some packages do not export ./package.json. Fall back to the resolved
    // entrypoint and walk upward until we find the owning package.json.
  }

  try {
    let dir = path.dirname(packageRequire.resolve(name));

    while (dir !== path.dirname(dir)) {
      const packageJsonPath = path.join(dir, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        const candidate = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
        if (candidate.name === name) {
          return fs.realpathSync(dir);
        }
      }
      dir = path.dirname(dir);
    }
  } catch (error) {
    // Fall through to node_modules probing below.
  }

  const fallback = [__dirname, root]
    .map((baseDir) => path.join(baseDir, "node_modules", name))
    .find((dir) => fs.existsSync(dir));

  if (fallback) {
    return fs.realpathSync(fallback);
  }

  throw new Error(`Unable to resolve package directory for '${name}'`);
};
const escapePathForRegex = (filePath) =>
  filePath
    .split(/[/\\]+/)
    .map((segment) => segment.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&"))
    .join(String.raw`[/\\]`);

const baseConfig = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  dirname: __dirname,
});
const resolverPlatforms = Array.from(
  new Set([...(baseConfig.resolver?.platforms ?? []), "windows"])
);
const existingBlockList = Array.isArray(baseConfig.resolver?.blockList)
  ? baseConfig.resolver.blockList
  : baseConfig.resolver?.blockList
    ? [baseConfig.resolver.blockList]
    : [];
const defaultResolveRequest =
  baseConfig.resolver?.resolveRequest ??
  ((context, moduleName, platform) =>
    context.resolveRequest(context, moduleName, platform));

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    platforms: resolverPlatforms,
    blockList: [
      ...existingBlockList,
      new RegExp(
        `^${escapePathForRegex(path.resolve(__dirname, "windows"))}(?:[/\\\\].*)?$`
      ),
      new RegExp(
        `^${escapePathForRegex(path.join(rnwPath, "build"))}(?:[/\\\\].*)?$`
      ),
      new RegExp(
        `^${escapePathForRegex(path.join(rnwPath, "target"))}(?:[/\\\\].*)?$`
      ),
      /.*\.ProjectImports\.zip/,
    ],
    extraNodeModules: {
      ...(baseConfig.resolver?.extraNodeModules ?? {}),
      ...modules.reduce((acc, name) => {
        acc[name] = resolvePackageDir(name);
        return acc;
      }, {}),
      [pack.name]: root,
      "react-native-windows": rnwPath,
    },
    resolveRequest: (context, moduleName, platform) => {
      if (platform === "windows") {
        if (moduleName === "react-native") {
          return defaultResolveRequest(
            context,
            "react-native-windows",
            platform
          );
        }

        if (moduleName.startsWith("react-native/")) {
          const windowsModuleName = `react-native-windows/${moduleName.slice(
            "react-native/".length
          )}`;

          try {
            return defaultResolveRequest(context, windowsModuleName, platform);
          } catch (error) {
            // Fall through to stock React Native when RNW does not override a file.
          }
        }
      }

      return defaultResolveRequest(context, moduleName, platform);
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: { experimentalImportSupport: false, inlineRequires: true },
    }),
  },
};

module.exports = mergeConfig(baseConfig, config);
