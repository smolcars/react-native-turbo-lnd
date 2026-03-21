
/*
 * This file is auto-generated from a NativeModule spec file in js.
 *
 * This is a C++ Spec class that should be used with MakeTurboModuleProvider to register native modules
 * in a way that also verifies at compile time that the native module matches the interface required
 * by the TurboModule JS spec.
 */
#pragma once
// clang-format off


#include <NativeModules.h>
#include <tuple>

namespace ReactNativeTurboLndExampleCodegen {

struct ExampleAppPathsSpec : winrt::Microsoft::ReactNative::TurboModuleSpec {
  static constexpr auto methods = std::tuple{
      SyncMethod<std::string() noexcept>{0, L"getLndDirectory"},
  };

  template <class TModule>
  static constexpr void ValidateModule() noexcept {
    constexpr auto methodCheckResults = CheckMethods<TModule, ExampleAppPathsSpec>();

    REACT_SHOW_METHOD_SPEC_ERRORS(
          0,
          "getLndDirectory",
          "    REACT_SYNC_METHOD(getLndDirectory) std::string getLndDirectory() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(getLndDirectory) static std::string getLndDirectory() noexcept { /* implementation */ }\n");
  }
};

} // namespace ReactNativeTurboLndExampleCodegen
