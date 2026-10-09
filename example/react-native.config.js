const path = require("path");
const pak = require("../package.json");

module.exports = {
  ...(process.env.REACT_NATIVE_PLATFORM === "macos"
    ? {
        reactNativePath: path.dirname(
          require.resolve("react-native-macos/package.json")
        ),
      }
    : {}),
  dependencies: {
    [pak.name]: {
      root: path.join(__dirname, ".."),
    },
  },
};
