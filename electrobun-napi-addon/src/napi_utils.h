#pragma once

#include <node_api.h>

#include <string>
#include <utility>
#include <vector>

inline napi_value make_string(napi_env env, const char* value) {
  napi_value result = nullptr;
  napi_create_string_utf8(env, value, NAPI_AUTO_LENGTH, &result);
  return result;
}

inline napi_value make_string(napi_env env, const std::string& value) {
  napi_value result = nullptr;
  napi_create_string_utf8(env, value.c_str(), value.size(), &result);
  return result;
}

inline napi_value make_uint32(napi_env env, uint32_t value) {
  napi_value result = nullptr;
  napi_create_uint32(env, value, &result);
  return result;
}

inline void throw_error(napi_env env, const std::string& message) {
  napi_throw_error(env, nullptr, message.c_str());
}

inline bool get_string_arg(
  napi_env env,
  napi_value value,
  std::string* out,
  const char* field_name
) {
  size_t size = 0;
  napi_status status =
    napi_get_value_string_utf8(env, value, nullptr, 0, &size);
  if (status != napi_ok) {
    throw_error(env, std::string("Expected string for ") + field_name + ".");
    return false;
  }

  out->resize(size);
  status = napi_get_value_string_utf8(
    env,
    value,
    out->data(),
    out->size() + 1,
    &size
  );
  if (status != napi_ok) {
    throw_error(
      env,
      std::string("Failed to read string for ") + field_name + "."
    );
    return false;
  }

  return true;
}

inline bool get_buffer_arg(
  napi_env env,
  napi_value value,
  std::string* out,
  const char* field_name
) {
  bool is_buffer = false;
  napi_status status = napi_is_buffer(env, value, &is_buffer);
  if (status != napi_ok || !is_buffer) {
    throw_error(env, std::string("Expected Buffer for ") + field_name + ".");
    return false;
  }

  void* data = nullptr;
  size_t length = 0;
  status = napi_get_buffer_info(env, value, &data, &length);
  if (status != napi_ok) {
    throw_error(
      env,
      std::string("Failed to read Buffer for ") + field_name + "."
    );
    return false;
  }

  out->assign(static_cast<const char*>(data), length);
  return true;
}

inline bool get_string_array_arg(
  napi_env env,
  napi_value value,
  std::vector<std::string>* out,
  const char* field_name
) {
  bool is_array = false;
  if (napi_is_array(env, value, &is_array) != napi_ok || !is_array) {
    throw_error(
      env,
      std::string("Expected string[] for ") + field_name + "."
    );
    return false;
  }

  uint32_t length = 0;
  if (napi_get_array_length(env, value, &length) != napi_ok) {
    throw_error(
      env,
      std::string("Failed to read array length for ") + field_name + "."
    );
    return false;
  }

  out->clear();
  out->reserve(length);
  for (uint32_t index = 0; index < length; index++) {
    napi_value entry = nullptr;
    if (napi_get_element(env, value, index, &entry) != napi_ok) {
      throw_error(
        env,
        std::string("Failed to read element from ") + field_name + "."
      );
      return false;
    }

    std::string method_name;
    if (!get_string_arg(env, entry, &method_name, field_name)) {
      return false;
    }
    out->push_back(std::move(method_name));
  }

  return true;
}
