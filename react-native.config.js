// https://github.com/react-native-community/cli/blob/main/docs/dependencies.md

module.exports = {
  dependency: {
    platforms: {
      /**
       * @type {import("@react-native-community/cli-types").IOSDependencyParams}
       */
      ios: {},
      /**
       * @type {import("@react-native-community/cli-types").AndroidDependencyParams}
       */
      android: {
        packageImportPath:
          "import com.reactnativeturbolnd.TurboLndPackage;",
        packageInstance: "new TurboLndPackage()",
        cmakeListsPath: "../cpp/build/generated/source/codegen/jni/CMakeLists.txt",
        cxxModuleCMakeListsModuleName: "TurboLnd",
        cxxModuleCMakeListsPath: "../cpp/CMakeLists.txt",
        cxxModuleHeaderName: "TurboLndModule",
        sourceDir: "android",
      },
      windows: {},
    },
  },
};
