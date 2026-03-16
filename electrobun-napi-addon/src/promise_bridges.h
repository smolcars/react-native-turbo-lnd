#pragma once

#include <node_api.h>

void finalize_start_bridge(napi_env env, void* finalize_data, void* hint);
void call_start_js(napi_env env, napi_value js_cb, void* context, void* data);
void on_start_response(void* context, const char* data, int length);
void on_start_error(void* context, const char* error_ptr);

void finalize_unary_bridge(napi_env env, void* finalize_data, void* hint);
void call_unary_js(napi_env env, napi_value js_cb, void* context, void* data);
void on_unary_response(void* context, const char* data, int length);
void on_unary_error(void* context, const char* error_ptr);
