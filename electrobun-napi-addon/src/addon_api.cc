#include "addon_api.h"

#include <string>
#include <utility>
#include <vector>

#include "addon_state.h"
#include "dynamic_library.h"
#include "napi_utils.h"
#include "promise_bridges.h"
#include "stream_bridges.h"

AddonState g_state;

namespace {

bool ensure_initialized(napi_env env) {
  std::lock_guard<std::mutex> lock(g_state.mutex);
  if (!g_state.initialized) {
    throw_error(
      env,
      "N-API addon is not initialized. Call initialize(path) first."
    );
    return false;
  }

  return true;
}

napi_value make_init_result(napi_env env) {
  napi_value result = nullptr;
  napi_create_object(env, &result);
  napi_set_named_property(env, result, "backend", make_string(env, "napi"));
  napi_set_named_property(
    env,
    result,
    "libraryPath",
    make_string(env, g_state.library_path)
  );
  napi_set_named_property(
    env,
    result,
    "unaryMethodCount",
    make_uint32(env, static_cast<uint32_t>(g_state.configured_unary_method_count))
  );
  napi_set_named_property(
    env,
    result,
    "serverStreamMethodCount",
    make_uint32(
      env,
      static_cast<uint32_t>(g_state.configured_server_stream_method_count)
    )
  );
  napi_set_named_property(
    env,
    result,
    "bidiStreamMethodCount",
    make_uint32(
      env,
      static_cast<uint32_t>(g_state.configured_bidi_stream_method_count)
    )
  );
  return result;
}

} // namespace

napi_value initialize(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value argv[2] = {nullptr};
  napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);
  if (argc != 2) {
    throw_error(env, "initialize expects liblndPath and method lists.");
    return nullptr;
  }

  std::string library_path;
  if (!get_string_arg(env, argv[0], &library_path, "liblndPath")) {
    return nullptr;
  }

  napi_valuetype methods_type = napi_undefined;
  if (napi_typeof(env, argv[1], &methods_type) != napi_ok ||
      methods_type != napi_object) {
    throw_error(
      env,
      "initialize expects a method list object as the second argument."
    );
    return nullptr;
  }

  napi_value unary_methods_value = nullptr;
  napi_value server_stream_methods_value = nullptr;
  napi_value bidi_stream_methods_value = nullptr;
  if (napi_get_named_property(
        env,
        argv[1],
        "unaryMethods",
        &unary_methods_value
      ) != napi_ok ||
      napi_get_named_property(
        env,
        argv[1],
        "serverStreamMethods",
        &server_stream_methods_value
      ) != napi_ok ||
      napi_get_named_property(
        env,
        argv[1],
        "bidiStreamMethods",
        &bidi_stream_methods_value
      ) != napi_ok) {
    throw_error(env, "initialize failed to read method list properties.");
    return nullptr;
  }

  std::vector<std::string> unary_methods;
  std::vector<std::string> server_stream_methods;
  std::vector<std::string> bidi_stream_methods;
  if (!get_string_array_arg(
        env,
        unary_methods_value,
        &unary_methods,
        "unaryMethods"
      ) ||
      !get_string_array_arg(
        env,
        server_stream_methods_value,
        &server_stream_methods,
        "serverStreamMethods"
      ) ||
      !get_string_array_arg(
        env,
        bidi_stream_methods_value,
        &bidi_stream_methods,
        "bidiStreamMethods"
      )) {
    return nullptr;
  }

  std::lock_guard<std::mutex> lock(g_state.mutex);
  if (g_state.initialized && g_state.library_path == library_path) {
    return make_init_result(env);
  }

  g_state.library.close();
  g_state.dispatch = {};
  g_state.start = nullptr;
  g_state.lnd_free = nullptr;
  g_state.send_stream = nullptr;
  g_state.stop_stream = nullptr;
  g_state.initialized = false;
  g_state.library_path.clear();
  g_state.server_streams.clear();
  g_state.bidi_streams.clear();
  g_state.configured_unary_method_count = 0;
  g_state.configured_server_stream_method_count = 0;
  g_state.configured_bidi_stream_method_count = 0;

  std::string error;
  if (!g_state.library.load(library_path, &error)) {
    throw_error(env, std::string("Failed to load liblnd: ") + error);
    return nullptr;
  }

  if (!resolve_required_symbol(g_state.library, "start", &g_state.start, &error) ||
      !resolve_required_symbol(
        g_state.library,
        "lndFree",
        &g_state.lnd_free,
        &error
      ) ||
      !resolve_required_symbol(
        g_state.library,
        "SendStreamC",
        &g_state.send_stream,
        &error
      ) ||
      !resolve_required_symbol(
        g_state.library,
        "StopStreamC",
        &g_state.stop_stream,
        &error
      ) ||
      !initialize_dispatch_tables(
        g_state,
        unary_methods,
        server_stream_methods,
        bidi_stream_methods,
        &error
      )) {
    g_state.library.close();
    throw_error(
      env,
      std::string("Failed to resolve liblnd symbols: ") + error
    );
    return nullptr;
  }

  g_state.initialized = true;
  g_state.library_path = library_path;
  return make_init_result(env);
}

napi_value describe_addon(napi_env env, napi_callback_info) {
  napi_value result = nullptr;
  napi_create_object(env, &result);
  napi_set_named_property(env, result, "backend", make_string(env, "napi"));
  napi_set_named_property(
    env,
    result,
    "dispatch",
    make_string(env, "resolved-at-initialize")
  );
  napi_set_named_property(
    env,
    result,
    "unaryMethodCount",
    make_uint32(env, static_cast<uint32_t>(g_state.configured_unary_method_count))
  );
  napi_set_named_property(
    env,
    result,
    "serverStreamMethodCount",
    make_uint32(
      env,
      static_cast<uint32_t>(g_state.configured_server_stream_method_count)
    )
  );
  napi_set_named_property(
    env,
    result,
    "bidiStreamMethodCount",
    make_uint32(
      env,
      static_cast<uint32_t>(g_state.configured_bidi_stream_method_count)
    )
  );
  return result;
}

napi_value start_lnd(napi_env env, napi_callback_info info) {
  if (!ensure_initialized(env)) {
    return nullptr;
  }

  size_t argc = 1;
  napi_value argv[1] = {nullptr};
  napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);
  if (argc != 1) {
    throw_error(env, "start expects args: string.");
    return nullptr;
  }

  std::string args;
  if (!get_string_arg(env, argv[0], &args, "args")) {
    return nullptr;
  }

  auto* bridge = new StartPromiseBridge{};
  bridge->env = env;
  bridge->lnd_free = g_state.lnd_free;

  napi_value promise = nullptr;
  napi_create_promise(env, &bridge->deferred, &promise);

  napi_value resource_name = make_string(env, "TurboLndNapiStart");
  napi_create_threadsafe_function(
    env,
    nullptr,
    nullptr,
    resource_name,
    0,
    1,
    bridge,
    finalize_start_bridge,
    bridge,
    call_start_js,
    &bridge->tsfn
  );

  CCallback callback = {
    .onResponse = &on_start_response,
    .onError = &on_start_error,
    .responseContext = bridge,
    .errorContext = bridge,
  };

  g_state.start(const_cast<char*>(args.c_str()), callback);
  return promise;
}

napi_value invoke_unary(napi_env env, napi_callback_info info) {
  if (!ensure_initialized(env)) {
    return nullptr;
  }

  size_t argc = 2;
  napi_value argv[2] = {nullptr};
  napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);
  if (argc != 2) {
    throw_error(env, "invokeUnary expects method: string and payload: Buffer.");
    return nullptr;
  }

  std::string method;
  if (!get_string_arg(env, argv[0], &method, "method")) {
    return nullptr;
  }

  std::string payload;
  if (!get_buffer_arg(env, argv[1], &payload, "payload")) {
    return nullptr;
  }

  UnaryMethodFn unary_method = nullptr;
  {
    std::lock_guard<std::mutex> lock(g_state.mutex);
    const auto iterator = g_state.dispatch.unary.find(method);
    if (iterator == g_state.dispatch.unary.end()) {
      throw_error(
        env,
        std::string("Unary method not implemented in N-API addon: ") + method
      );
      return nullptr;
    }
    unary_method = iterator->second;
  }

  auto* bridge = new UnaryPromiseBridge{};
  bridge->env = env;
  bridge->lnd_free = g_state.lnd_free;

  napi_value promise = nullptr;
  napi_create_promise(env, &bridge->deferred, &promise);

  napi_value resource_name = make_string(env, "TurboLndNapiUnary");
  napi_create_threadsafe_function(
    env,
    nullptr,
    nullptr,
    resource_name,
    0,
    1,
    bridge,
    finalize_unary_bridge,
    bridge,
    call_unary_js,
    &bridge->tsfn
  );

  CCallback callback = {
    .onResponse = &on_unary_response,
    .onError = &on_unary_error,
    .responseContext = bridge,
    .errorContext = bridge,
  };

  unary_method(
    const_cast<char*>(payload.data()),
    static_cast<int>(payload.size()),
    callback
  );
  return promise;
}

napi_value open_server_stream(napi_env env, napi_callback_info info) {
  if (!ensure_initialized(env)) {
    return nullptr;
  }

  size_t argc = 4;
  napi_value argv[4] = {nullptr};
  napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);
  if (argc != 4) {
    throw_error(
      env,
      "openServerStream expects method, payload, onData, onError."
    );
    return nullptr;
  }

  std::string method;
  if (!get_string_arg(env, argv[0], &method, "method")) {
    return nullptr;
  }

  std::string payload;
  if (!get_buffer_arg(env, argv[1], &payload, "payload")) {
    return nullptr;
  }

  ServerStreamMethodFn stream_method = nullptr;
  {
    std::lock_guard<std::mutex> lock(g_state.mutex);
    const auto iterator = g_state.dispatch.server_stream.find(method);
    if (iterator == g_state.dispatch.server_stream.end()) {
      throw_error(
        env,
        std::string("Server stream method not implemented in N-API addon: ") +
          method
      );
      return nullptr;
    }
    stream_method = iterator->second;
  }

  auto* subscription = new ServerStreamSubscription{};
  subscription->env = env;
  subscription->lnd_free = g_state.lnd_free;
  subscription->active.store(true);

  {
    std::lock_guard<std::mutex> lock(g_state.mutex);
    subscription->id = g_state.next_server_stream_id++;
  }

  napi_valuetype on_data_type = napi_undefined;
  napi_valuetype on_error_type = napi_undefined;
  napi_typeof(env, argv[2], &on_data_type);
  napi_typeof(env, argv[3], &on_error_type);
  if (on_data_type != napi_function || on_error_type != napi_function) {
    delete subscription;
    throw_error(env, "openServerStream expects function callbacks.");
    return nullptr;
  }

  napi_create_reference(env, argv[2], 1, &subscription->on_data_ref);
  napi_create_reference(env, argv[3], 1, &subscription->on_error_ref);

  napi_value resource_name = make_string(env, "TurboLndNapiServerStream");
  napi_create_threadsafe_function(
    env,
    nullptr,
    nullptr,
    resource_name,
    0,
    1,
    subscription,
    finalize_server_stream,
    subscription,
    call_server_stream_js,
    &subscription->tsfn
  );
  napi_unref_threadsafe_function(env, subscription->tsfn);

  {
    std::lock_guard<std::mutex> lock(g_state.mutex);
    g_state.server_streams.emplace(subscription->id, subscription);
  }

  CRecvStream stream = {
    .onResponse = &on_server_stream_response,
    .onError = &on_server_stream_error,
    .responseContext = subscription,
    .errorContext = subscription,
  };

  stream_method(
    const_cast<char*>(payload.data()),
    static_cast<int>(payload.size()),
    stream
  );

  return make_uint32(env, subscription->id);
}

napi_value close_server_stream(napi_env env, napi_callback_info info) {
  if (!ensure_initialized(env)) {
    return nullptr;
  }

  size_t argc = 1;
  napi_value argv[1] = {nullptr};
  napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);
  if (argc != 1) {
    throw_error(env, "closeServerStream expects an id.");
    return nullptr;
  }

  uint32_t id = 0;
  if (napi_get_value_uint32(env, argv[0], &id) != napi_ok) {
    throw_error(env, "closeServerStream expected a numeric id.");
    return nullptr;
  }

  ServerStreamSubscription* subscription = nullptr;
  {
    std::lock_guard<std::mutex> lock(g_state.mutex);
    const auto iterator = g_state.server_streams.find(id);
    if (iterator != g_state.server_streams.end()) {
      subscription = iterator->second;
      g_state.server_streams.erase(iterator);
    }
  }

  if (subscription) {
    subscription->active.store(false);
  }

  napi_value result = nullptr;
  napi_get_undefined(env, &result);
  return result;
}

napi_value open_bidi_stream(napi_env env, napi_callback_info info) {
  if (!ensure_initialized(env)) {
    return nullptr;
  }

  size_t argc = 3;
  napi_value argv[3] = {nullptr};
  napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);
  if (argc != 3) {
    throw_error(env, "openBidiStream expects method, onData, onError.");
    return nullptr;
  }

  std::string method;
  if (!get_string_arg(env, argv[0], &method, "method")) {
    return nullptr;
  }

  BidiStreamMethodFn stream_method = nullptr;
  {
    std::lock_guard<std::mutex> lock(g_state.mutex);
    const auto iterator = g_state.dispatch.bidi_stream.find(method);
    if (iterator == g_state.dispatch.bidi_stream.end()) {
      throw_error(
        env,
        std::string("Bidi stream method not implemented in N-API addon: ") +
          method
      );
      return nullptr;
    }
    stream_method = iterator->second;
  }

  auto* subscription = new BidiStreamSubscription{};
  subscription->env = env;
  subscription->lnd_free = g_state.lnd_free;
  subscription->active.store(true);
  subscription->stop_requested.store(false);

  {
    std::lock_guard<std::mutex> lock(g_state.mutex);
    subscription->id = g_state.next_bidi_stream_id++;
  }

  napi_valuetype on_data_type = napi_undefined;
  napi_valuetype on_error_type = napi_undefined;
  napi_typeof(env, argv[1], &on_data_type);
  napi_typeof(env, argv[2], &on_error_type);
  if (on_data_type != napi_function || on_error_type != napi_function) {
    delete subscription;
    throw_error(env, "openBidiStream expects function callbacks.");
    return nullptr;
  }

  napi_create_reference(env, argv[1], 1, &subscription->on_data_ref);
  napi_create_reference(env, argv[2], 1, &subscription->on_error_ref);

  napi_value resource_name = make_string(env, "TurboLndNapiBidiStream");
  napi_create_threadsafe_function(
    env,
    nullptr,
    nullptr,
    resource_name,
    0,
    1,
    subscription,
    finalize_bidi_stream,
    subscription,
    call_bidi_stream_js,
    &subscription->tsfn
  );
  napi_unref_threadsafe_function(env, subscription->tsfn);

  CRecvStream stream = {
    .onResponse = &on_bidi_stream_response,
    .onError = &on_bidi_stream_error,
    .responseContext = subscription,
    .errorContext = subscription,
  };

  subscription->stream_ptr = stream_method(stream);
  if (subscription->stream_ptr == 0) {
    subscription->active.store(false);
    throw_error(
      env,
      std::string(method) + " returned an invalid stream pointer."
    );
    return nullptr;
  }

  {
    std::lock_guard<std::mutex> lock(g_state.mutex);
    g_state.bidi_streams.emplace(subscription->id, subscription);
  }

  return make_uint32(env, subscription->id);
}

napi_value send_bidi_stream(napi_env env, napi_callback_info info) {
  if (!ensure_initialized(env)) {
    return nullptr;
  }

  size_t argc = 2;
  napi_value argv[2] = {nullptr};
  napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);
  if (argc != 2) {
    throw_error(env, "sendBidiStream expects an id and payload buffer.");
    return nullptr;
  }

  uint32_t id = 0;
  if (napi_get_value_uint32(env, argv[0], &id) != napi_ok) {
    throw_error(env, "sendBidiStream expected a numeric id.");
    return nullptr;
  }

  std::string payload;
  if (!get_buffer_arg(env, argv[1], &payload, "payload")) {
    return nullptr;
  }

  BidiStreamSubscription* subscription = nullptr;
  {
    std::lock_guard<std::mutex> lock(g_state.mutex);
    const auto iterator = g_state.bidi_streams.find(id);
    if (iterator != g_state.bidi_streams.end()) {
      subscription = iterator->second;
    }
  }

  bool sent = false;
  if (subscription != nullptr &&
      subscription->active.load() &&
      !subscription->stop_requested.load()) {
    sent = g_state.send_stream(
      subscription->stream_ptr,
      const_cast<char*>(payload.data()),
      static_cast<int>(payload.size())
    ) == 0;
  }

  napi_value result = nullptr;
  napi_get_boolean(env, sent, &result);
  return result;
}

napi_value stop_bidi_stream(napi_env env, napi_callback_info info) {
  if (!ensure_initialized(env)) {
    return nullptr;
  }

  size_t argc = 1;
  napi_value argv[1] = {nullptr};
  napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);
  if (argc != 1) {
    throw_error(env, "stopBidiStream expects an id.");
    return nullptr;
  }

  uint32_t id = 0;
  if (napi_get_value_uint32(env, argv[0], &id) != napi_ok) {
    throw_error(env, "stopBidiStream expected a numeric id.");
    return nullptr;
  }

  BidiStreamSubscription* subscription = nullptr;
  {
    std::lock_guard<std::mutex> lock(g_state.mutex);
    const auto iterator = g_state.bidi_streams.find(id);
    if (iterator != g_state.bidi_streams.end()) {
      subscription = iterator->second;
      g_state.bidi_streams.erase(iterator);
    }
  }

  bool stopped = false;
  if (subscription != nullptr && !subscription->stop_requested.exchange(true)) {
    if (subscription->active.exchange(false)) {
      stopped = g_state.stop_stream(subscription->stream_ptr) == 0;
    }
  } else if (subscription != nullptr) {
    stopped = true;
  }

  napi_value result = nullptr;
  napi_get_boolean(env, stopped, &result);
  return result;
}
