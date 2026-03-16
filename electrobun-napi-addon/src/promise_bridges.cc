#include "promise_bridges.h"

#include <memory>
#include <string>
#include <utility>

#include "addon_state.h"
#include "napi_utils.h"

void finalize_start_bridge(napi_env, void* finalize_data, void*) {
  delete static_cast<StartPromiseBridge*>(finalize_data);
}

void call_start_js(napi_env env, napi_value, void* context, void* data) {
  auto* bridge = static_cast<StartPromiseBridge*>(context);
  std::unique_ptr<StartEvent> event(static_cast<StartEvent*>(data));

  if (env == nullptr) {
    return;
  }

  if (event->success) {
    napi_value empty = nullptr;
    napi_create_string_utf8(env, "", 0, &empty);
    napi_resolve_deferred(env, bridge->deferred, empty);
    return;
  }

  napi_value message = make_string(env, event->message);
  napi_value error = nullptr;
  napi_create_error(env, nullptr, message, &error);
  napi_reject_deferred(env, bridge->deferred, error);
}

void on_start_response(void* context, const char* data, int) {
  auto* bridge = static_cast<StartPromiseBridge*>(context);
  if (data != nullptr) {
    bridge->lnd_free(const_cast<char*>(data));
  }

  if (bridge->settled.exchange(true)) {
    return;
  }

  auto* event = new StartEvent{true, ""};
  napi_call_threadsafe_function(bridge->tsfn, event, napi_tsfn_blocking);
  napi_release_threadsafe_function(bridge->tsfn, napi_tsfn_release);
}

void on_start_error(void* context, const char* error_ptr) {
  auto* bridge = static_cast<StartPromiseBridge*>(context);
  std::string message =
    error_ptr != nullptr ? std::string(error_ptr) : "Unknown lnd start error.";
  if (error_ptr != nullptr) {
    bridge->lnd_free(const_cast<char*>(error_ptr));
  }

  if (bridge->settled.exchange(true)) {
    return;
  }

  auto* event = new StartEvent{false, std::move(message)};
  napi_call_threadsafe_function(bridge->tsfn, event, napi_tsfn_blocking);
  napi_release_threadsafe_function(bridge->tsfn, napi_tsfn_release);
}

void finalize_unary_bridge(napi_env, void* finalize_data, void*) {
  delete static_cast<UnaryPromiseBridge*>(finalize_data);
}

void call_unary_js(napi_env env, napi_value, void* context, void* data) {
  auto* bridge = static_cast<UnaryPromiseBridge*>(context);
  std::unique_ptr<UnaryEvent> event(static_cast<UnaryEvent*>(data));

  if (env == nullptr) {
    return;
  }

  if (event->success) {
    napi_value buffer = nullptr;
    void* copied_data = nullptr;
    napi_create_buffer_copy(
      env,
      event->payload.size(),
      event->payload.data(),
      &copied_data,
      &buffer
    );
    napi_resolve_deferred(env, bridge->deferred, buffer);
    return;
  }

  napi_value message = make_string(env, event->payload);
  napi_value error = nullptr;
  napi_create_error(env, nullptr, message, &error);
  napi_reject_deferred(env, bridge->deferred, error);
}

void on_unary_response(void* context, const char* data, int length) {
  auto* bridge = static_cast<UnaryPromiseBridge*>(context);
  std::string payload;
  if (length > 0 && data != nullptr) {
    payload.assign(data, static_cast<size_t>(length));
  }
  if (data != nullptr) {
    bridge->lnd_free(const_cast<char*>(data));
  }

  if (bridge->settled.exchange(true)) {
    return;
  }

  auto* event = new UnaryEvent{true, std::move(payload)};
  napi_call_threadsafe_function(bridge->tsfn, event, napi_tsfn_blocking);
  napi_release_threadsafe_function(bridge->tsfn, napi_tsfn_release);
}

void on_unary_error(void* context, const char* error_ptr) {
  auto* bridge = static_cast<UnaryPromiseBridge*>(context);
  std::string message =
    error_ptr != nullptr ? std::string(error_ptr) : "Unknown unary error.";
  if (error_ptr != nullptr) {
    bridge->lnd_free(const_cast<char*>(error_ptr));
  }

  if (bridge->settled.exchange(true)) {
    return;
  }

  auto* event = new UnaryEvent{false, std::move(message)};
  napi_call_threadsafe_function(bridge->tsfn, event, napi_tsfn_blocking);
  napi_release_threadsafe_function(bridge->tsfn, napi_tsfn_release);
}
