#pragma once

#include <node_api.h>

#include <atomic>
#include <cstdint>
#include <mutex>
#include <string>
#include <unordered_map>

#include "dynamic_library.h"
#include "liblnd_types.h"
#include "method_dispatch.h"

struct StartEvent {
  bool success;
  std::string message;
};

struct UnaryEvent {
  bool success;
  std::string payload;
};

enum class StreamEventType {
  Data,
  Error,
};

struct StreamEvent {
  StreamEventType type;
  std::string payload;
};

struct StartPromiseBridge {
  napi_env env;
  napi_deferred deferred;
  napi_threadsafe_function tsfn;
  LndFreeFn lnd_free;
  std::atomic_bool settled{false};
};

struct UnaryPromiseBridge {
  napi_env env;
  napi_deferred deferred;
  napi_threadsafe_function tsfn;
  LndFreeFn lnd_free;
  std::atomic_bool settled{false};
};

struct ServerStreamSubscription {
  napi_env env;
  napi_threadsafe_function tsfn;
  napi_ref on_data_ref = nullptr;
  napi_ref on_error_ref = nullptr;
  LndFreeFn lnd_free;
  std::atomic_bool active{true};
  uint32_t id;
};

struct BidiStreamSubscription {
  napi_env env;
  napi_threadsafe_function tsfn;
  napi_ref on_data_ref = nullptr;
  napi_ref on_error_ref = nullptr;
  LndFreeFn lnd_free;
  std::atomic_bool active{true};
  std::atomic_bool stop_requested{false};
  uint32_t id;
  uintptr_t stream_ptr = 0;
};

struct AddonState {
  std::mutex mutex;
  bool initialized = false;
  std::string library_path;
  DynamicLibrary library;
  StartFn start = nullptr;
  LndFreeFn lnd_free = nullptr;
  SendStreamFn send_stream = nullptr;
  StopStreamFn stop_stream = nullptr;
  MethodDispatchTables dispatch;
  uint32_t next_server_stream_id = 1;
  uint32_t next_bidi_stream_id = 1;
  std::unordered_map<uint32_t, ServerStreamSubscription*> server_streams;
  std::unordered_map<uint32_t, BidiStreamSubscription*> bidi_streams;
  size_t configured_unary_method_count = 0;
  size_t configured_server_stream_method_count = 0;
  size_t configured_bidi_stream_method_count = 0;
};

extern AddonState g_state;
