#pragma once

#include <cstdint>

using ResponseFunc = void (*)(void* context, const char* data, int length);
using ErrorFunc = void (*)(void* context, const char* error);

struct CCallback {
  ResponseFunc onResponse;
  ErrorFunc onError;
  void* responseContext;
  void* errorContext;
};

struct CRecvStream {
  ResponseFunc onResponse;
  ErrorFunc onError;
  void* responseContext;
  void* errorContext;
};

using StartFn = void (*)(char* args, CCallback callback);
using LndFreeFn = void (*)(void* ptr);
using UnaryMethodFn = void (*)(char* data, int length, CCallback callback);
using ServerStreamMethodFn = void (*)(char* data, int length, CRecvStream stream);
using BidiStreamMethodFn = uintptr_t (*)(CRecvStream stream);
using SendStreamFn = int (*)(uintptr_t streamPtr, char* data, int length);
using StopStreamFn = int (*)(uintptr_t streamPtr);
