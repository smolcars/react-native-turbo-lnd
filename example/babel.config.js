const path = require("path");
const pak = require("../package.json");
const packageSrcRoot = path.join(__dirname, "..", "src");

module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".tsx", ".ts", ".js", ".json"],
        alias: {
          [`${pak.name}/protos`]: path.join(packageSrcRoot, "proto"),
          [`${pak.name}/core`]: path.join(
            packageSrcRoot,
            "core",
            "NativeTurboLnd"
          ),
          [pak.name]: packageSrcRoot,
        },
      },
    ],
  ],
};
