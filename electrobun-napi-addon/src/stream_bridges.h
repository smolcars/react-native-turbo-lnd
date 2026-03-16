#pragma once

#include <node_api.h>

#include <string>

bool is_eof_error(const std::string& message);

void finalize_server_stream(napi_env env, void* finalize_data, void* hint);
void call_server_stream_js(
  napi_env env,
  napi_value js_cb,
  void* context,
  void* data
);
void on_server_stream_response(void* context, const char* data, int length);
void on_server_stream_error(void* context, const char* error_ptr);

void finalize_bidi_stream(napi_env env, void* finalize_data, void* hint);
void call_bidi_stream_js(
  napi_env env,
  napi_value js_cb,
  void* context,
  void* data
);
void on_bidi_stream_response(void* context, const char* data, int length);
void on_bidi_stream_error(void* context, const char* error_ptr);
