#include "pch.h"

#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#include "ReactPackageProvider.g.cpp"
#endif

#include "..\..\cpp\TurboLndModule.h"
#include <TurboModuleProvider.h>

using namespace winrt::Microsoft::ReactNative;

namespace winrt::ReactNativeTurboLnd::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
  AddTurboModuleProvider<::facebook::react::TurboLndModule>(packageBuilder, L"TurboLndModuleCxx");
}

} // namespace winrt::ReactNativeTurboLnd::implementation
