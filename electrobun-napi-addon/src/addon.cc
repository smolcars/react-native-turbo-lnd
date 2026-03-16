#include <node_api.h>

#include "addon_api.h"

NAPI_MODULE_INIT() {
  napi_property_descriptor descriptors[] = {
    {
      "describeAddon",
      nullptr,
      describe_addon,
      nullptr,
      nullptr,
      nullptr,
      napi_default,
      nullptr,
    },
    {
      "initialize",
      nullptr,
      initialize,
      nullptr,
      nullptr,
      nullptr,
      napi_default,
      nullptr,
    },
    {"start", nullptr, start_lnd, nullptr, nullptr, nullptr, napi_default, nullptr},
    {
      "invokeUnary",
      nullptr,
      invoke_unary,
      nullptr,
      nullptr,
      nullptr,
      napi_default,
      nullptr,
    },
    {
      "openServerStream",
      nullptr,
      open_server_stream,
      nullptr,
      nullptr,
      nullptr,
      napi_default,
      nullptr,
    },
    {
      "closeServerStream",
      nullptr,
      close_server_stream,
      nullptr,
      nullptr,
      nullptr,
      napi_default,
      nullptr,
    },
    {
      "openBidiStream",
      nullptr,
      open_bidi_stream,
      nullptr,
      nullptr,
      nullptr,
      napi_default,
      nullptr,
    },
    {
      "sendBidiStream",
      nullptr,
      send_bidi_stream,
      nullptr,
      nullptr,
      nullptr,
      napi_default,
      nullptr,
    },
    {
      "stopBidiStream",
      nullptr,
      stop_bidi_stream,
      nullptr,
      nullptr,
      nullptr,
      napi_default,
      nullptr,
    },
  };

  napi_define_properties(
    env,
    exports,
    sizeof(descriptors) / sizeof(descriptors[0]),
    descriptors
  );

  return exports;
}
