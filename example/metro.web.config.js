const fs = require("fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withMetroConfig } = require("react-native-monorepo-config");
const pack = require("../package.json");

const root = path.resolve(__dirname, "..");
const metroWebHtmlPath = path.resolve(__dirname, "index.metro.html");
const publicRoot = path.resolve(__dirname, "public");
const packageVendorRoot = path.resolve(root, "vendor");
const packageWasmRuntimeRoot = path.resolve(root, "lib", "module", "wasm-runtime");
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

const getContentType = (filePath) => {
  switch (path.extname(filePath).toLowerCase()) {
    case ".js":
      return "application/javascript; charset=UTF-8";
    case ".wasm":
      return "application/wasm";
    default:
      return "application/octet-stream";
  }
};

const baseConfig = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  dirname: __dirname,
});
const resolverAssetExts = Array.from(
  new Set([...(baseConfig.resolver?.assetExts ?? []), "wasm"])
);
const resolverPlatforms = Array.from(
  new Set([...(baseConfig.resolver?.platforms ?? []), "web", "windows"])
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

const config = {
  resolver: {
    assetExts: resolverAssetExts,
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
      if (platform === "web" && moduleName === "react-native") {
        return defaultResolveRequest(context, "react-native-web", platform);
      }

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
  server: {
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
        res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

        const requestPath = req.url?.split("?")[0];
        if (requestPath?.startsWith("/vendor/")) {
          const relativePath = requestPath.replace(/^\/+/, "");
          const vendorFileName = path.basename(relativePath);
          const candidatePaths = [
            path.join(publicRoot, relativePath),
            path.join(
              packageVendorRoot,
              relativePath.replace(/^vendor[/\\]/, "")
            ),
            path.join(packageWasmRuntimeRoot, vendorFileName),
            path.join(packageWasmRuntimeRoot, "assets", vendorFileName),
          ];

          for (const filePath of candidatePaths) {
            if (fs.existsSync(filePath)) {
              res.setHeader("Content-Type", getContentType(filePath));
              res.end(fs.readFileSync(filePath));
              return;
            }
          }
        }

        if (requestPath === "/metro-web" || requestPath === "/metro-web/") {
          res.setHeader("Content-Type", "text/html; charset=UTF-8");
          res.end(fs.readFileSync(metroWebHtmlPath));
          return;
        }

        return middleware(req, res, next);
      };
    },
  },
};

module.exports = mergeConfig(baseConfig, config);
