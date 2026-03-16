#pragma once

#include <string>
#include <unordered_map>
#include <vector>

#include "liblnd_types.h"

struct AddonState;

struct MethodDispatchTables {
  std::unordered_map<std::string, UnaryMethodFn> unary;
  std::unordered_map<std::string, ServerStreamMethodFn> server_stream;
  std::unordered_map<std::string, BidiStreamMethodFn> bidi_stream;
};

bool initialize_dispatch_tables(
  AddonState& state,
  const std::vector<std::string>& unary_methods,
  const std::vector<std::string>& server_stream_methods,
  const std::vector<std::string>& bidi_stream_methods,
  std::string* error
);
