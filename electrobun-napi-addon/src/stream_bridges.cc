#include "stream_bridges.h"

#include <memory>
#include <string>
#include <utility>

#include "addon_state.h"
#include "napi_utils.h"

bool is_eof_error(const std::string& message) {
  if (message == "EOF") {
    return true;
  }

  return message.find("EOF") != std::string::npos;
}

void finalize_server_stream(napi_env env, void* finalize_data, void*) {
  auto* subscription = static_cast<ServerStreamSubscription*>(finalize_data);
  if (env != nullptr) {
    if (subscription->on_data_ref != nullptr) {
      napi_delete_reference(env, subscription->on_data_ref);
    }
    if (subscription->on_error_ref != nullptr) {
      napi_delete_reference(env, subscription->on_error_ref);
    }
  }
  delete subscription;
}

void finalize_bidi_stream(napi_env env, void* finalize_data, void*) {
  auto* subscription = static_cast<BidiStreamSubscription*>(finalize_data);
  if (env != nullptr) {
    if (subscription->on_data_ref != nullptr) {
      napi_delete_reference(env, subscription->on_data_ref);
    }
    if (subscription->on_error_ref != nullptr) {
      napi_delete_reference(env, subscription->on_error_ref);
    }
  }
  delete subscription;
}

void call_server_stream_js(napi_env env, napi_value, void* context, void* data) {
  auto* subscription = static_cast<ServerStreamSubscription*>(context);
  std::unique_ptr<StreamEvent> event(static_cast<StreamEvent*>(data));

  if (env == nullptr || !subscription->active.load()) {
    return;
  }

  napi_value callback = nullptr;
  if (event->type == StreamEventType::Data) {
    napi_get_reference_value(env, subscription->on_data_ref, &callback);
  } else {
    napi_get_reference_value(env, subscription->on_error_ref, &callback);
  }

  if (callback == nullptr) {
    return;
  }

  napi_value global = nullptr;
  napi_get_global(env, &global);

  napi_value argv[1] = {nullptr};
  if (event->type == StreamEventType::Data) {
    void* copied_data = nullptr;
    napi_create_buffer_copy(
      env,
      event->payload.size(),
      event->payload.data(),
      &copied_data,
      &argv[0]
    );
  } else {
    argv[0] = make_string(env, event->payload);
  }

  napi_value ignored = nullptr;
  napi_call_function(env, global, callback, 1, argv, &ignored);
}

void call_bidi_stream_js(napi_env env, napi_value, void* context, void* data) {
  auto* subscription = static_cast<BidiStreamSubscription*>(context);
  std::unique_ptr<StreamEvent> event(static_cast<StreamEvent*>(data));

  if (env == nullptr || !subscription->active.load()) {
    return;
  }

  napi_value callback = nullptr;
  if (event->type == StreamEventType::Data) {
    napi_get_reference_value(env, subscription->on_data_ref, &callback);
  } else {
    napi_get_reference_value(env, subscription->on_error_ref, &callback);
  }

  if (callback == nullptr) {
    return;
  }

  napi_value global = nullptr;
  napi_get_global(env, &global);

  napi_value argv[1] = {nullptr};
  if (event->type == StreamEventType::Data) {
    void* copied_data = nullptr;
    napi_create_buffer_copy(
      env,
      event->payload.size(),
      event->payload.data(),
      &copied_data,
      &argv[0]
    );
  } else {
    argv[0] = make_string(env, event->payload);
  }

  napi_value ignored = nullptr;
  napi_call_function(env, global, callback, 1, argv, &ignored);
}

void on_server_stream_response(void* context, const char* data, int length) {
  auto* subscription = static_cast<ServerStreamSubscription*>(context);
  if (data != nullptr && !subscription->active.load()) {
    subscription->lnd_free(const_cast<char*>(data));
    return;
  }

  std::string payload;
  if (length > 0 && data != nullptr) {
    payload.assign(data, static_cast<size_t>(length));
  }
  if (data != nullptr) {
    subscription->lnd_free(const_cast<char*>(data));
  }

  if (!subscription->active.load()) {
    return;
  }

  auto* event = new StreamEvent{StreamEventType::Data, std::move(payload)};
  const napi_status status = napi_call_threadsafe_function(
    subscription->tsfn,
    event,
    napi_tsfn_blocking
  );
  if (status != napi_ok) {
    delete event;
  }
}

void on_server_stream_error(void* context, const char* error_ptr) {
  auto* subscription = static_cast<ServerStreamSubscription*>(context);
  std::string message =
    error_ptr != nullptr ? std::string(error_ptr)
                         : "Unknown server stream error.";
  if (error_ptr != nullptr) {
    subscription->lnd_free(const_cast<char*>(error_ptr));
  }

  if (!subscription->active.load()) {
    return;
  }

  subscription->active.store(false);
  if (is_eof_error(message)) {
    return;
  }

  auto* event = new StreamEvent{StreamEventType::Error, std::move(message)};
  const napi_status status = napi_call_threadsafe_function(
    subscription->tsfn,
    event,
    napi_tsfn_blocking
  );
  if (status != napi_ok) {
    delete event;
  }
}

void on_bidi_stream_response(void* context, const char* data, int length) {
  auto* subscription = static_cast<BidiStreamSubscription*>(context);
  if (data != nullptr && !subscription->active.load()) {
    subscription->lnd_free(const_cast<char*>(data));
    return;
  }

  std::string payload;
  if (length > 0 && data != nullptr) {
    payload.assign(data, static_cast<size_t>(length));
  }
  if (data != nullptr) {
    subscription->lnd_free(const_cast<char*>(data));
  }

  if (!subscription->active.load()) {
    return;
  }

  auto* event = new StreamEvent{StreamEventType::Data, std::move(payload)};
  const napi_status status = napi_call_threadsafe_function(
    subscription->tsfn,
    event,
    napi_tsfn_blocking
  );
  if (status != napi_ok) {
    delete event;
  }
}

void on_bidi_stream_error(void* context, const char* error_ptr) {
  auto* subscription = static_cast<BidiStreamSubscription*>(context);
  std::string message =
    error_ptr != nullptr ? std::string(error_ptr) : "Unknown bidi stream error.";
  if (error_ptr != nullptr) {
    subscription->lnd_free(const_cast<char*>(error_ptr));
  }

  if (!subscription->active.load()) {
    return;
  }

  subscription->active.store(false);
  if (subscription->stop_requested.load() && is_eof_error(message)) {
    return;
  }

  auto* event = new StreamEvent{StreamEventType::Error, std::move(message)};
  const napi_status status = napi_call_threadsafe_function(
    subscription->tsfn,
    event,
    napi_tsfn_blocking
  );
  if (status != napi_ok) {
    delete event;
  }
}
