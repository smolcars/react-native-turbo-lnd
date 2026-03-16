#pragma once

#include <node_api.h>

napi_value initialize(napi_env env, napi_callback_info info);
napi_value describe_addon(napi_env env, napi_callback_info info);
napi_value start_lnd(napi_env env, napi_callback_info info);
napi_value invoke_unary(napi_env env, napi_callback_info info);
napi_value open_server_stream(napi_env env, napi_callback_info info);
napi_value close_server_stream(napi_env env, napi_callback_info info);
napi_value open_bidi_stream(napi_env env, napi_callback_info info);
napi_value send_bidi_stream(napi_env env, napi_callback_info info);
napi_value stop_bidi_stream(napi_env env, napi_callback_info info);
