#pragma once

#include <string>

#ifdef _WIN32
#include <windows.h>
#else
#include <dlfcn.h>
#endif

struct DynamicLibrary {
#ifdef _WIN32
  HMODULE handle = nullptr;
#else
  void* handle = nullptr;
#endif

  bool load(const std::string& path, std::string* error) {
    close();
#ifdef _WIN32
    handle = LoadLibraryA(path.c_str());
    if (handle == nullptr) {
      if (error != nullptr) {
        *error = "LoadLibraryA failed";
      }
      return false;
    }
#else
    handle = dlopen(path.c_str(), RTLD_NOW);
    if (handle == nullptr) {
      if (error != nullptr) {
        *error = dlerror();
      }
      return false;
    }
#endif
    return true;
  }

  void* resolve(const char* symbol, std::string* error) const {
#ifdef _WIN32
    auto resolved = reinterpret_cast<void*>(GetProcAddress(handle, symbol));
    if (resolved == nullptr && error != nullptr) {
      *error = std::string("GetProcAddress failed for ") + symbol;
    }
    return resolved;
#else
    dlerror();
    void* resolved = dlsym(handle, symbol);
    if (resolved == nullptr && error != nullptr) {
      const char* dl_error = dlerror();
      *error =
        dl_error != nullptr ? dl_error
                            : std::string("dlsym failed for ") + symbol;
    }
    return resolved;
#endif
  }

  void close() {
#ifdef _WIN32
    if (handle != nullptr) {
      FreeLibrary(handle);
      handle = nullptr;
    }
#else
    if (handle != nullptr) {
      dlclose(handle);
      handle = nullptr;
    }
#endif
  }

  ~DynamicLibrary() { close(); }
};

template <typename Fn>
bool resolve_required_symbol(
  const DynamicLibrary& library,
  const char* symbol_name,
  Fn* destination,
  std::string* error
) {
  void* symbol = library.resolve(symbol_name, error);
  if (symbol == nullptr) {
    return false;
  }

  *destination = reinterpret_cast<Fn>(symbol);
  return true;
}
