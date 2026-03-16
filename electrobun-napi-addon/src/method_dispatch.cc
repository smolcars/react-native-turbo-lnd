#include "method_dispatch.h"

#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

#include "addon_state.h"
#include "dynamic_library.h"

namespace {

template <typename Fn>
bool resolve_method_set(
  const DynamicLibrary& library,
  const std::vector<std::string>& methods,
  std::unordered_map<std::string, Fn>* destination,
  std::string* error
) {
  destination->clear();
  destination->reserve(methods.size());

  for (const auto& method : methods) {
    Fn resolved = nullptr;
    if (!resolve_required_symbol(library, method.c_str(), &resolved, error)) {
      return false;
    }
    destination->emplace(method, resolved);
  }

  return true;
}

} // namespace

bool initialize_dispatch_tables(
  AddonState& state,
  const std::vector<std::string>& unary_methods,
  const std::vector<std::string>& server_stream_methods,
  const std::vector<std::string>& bidi_stream_methods,
  std::string* error
) {
  state.dispatch.unary.clear();
  state.dispatch.server_stream.clear();
  state.dispatch.bidi_stream.clear();
  if (!resolve_method_set(
        state.library,
        unary_methods,
        &state.dispatch.unary,
        error
      )) {
    return false;
  }
  if (!resolve_method_set(
        state.library,
        server_stream_methods,
        &state.dispatch.server_stream,
        error
      )) {
    return false;
  }
  if (!resolve_method_set(
        state.library,
        bidi_stream_methods,
        &state.dispatch.bidi_stream,
        error
      )) {
    return false;
  }

  state.configured_unary_method_count = unary_methods.size();
  state.configured_server_stream_method_count = server_stream_methods.size();
  state.configured_bidi_stream_method_count = bidi_stream_methods.size();
  return true;
}
