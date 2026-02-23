#pragma once

#include <cstdint>
#include <map>
#include <memory>
#include <mutex>
#include <string>
#include <utility>

#include <react/bridging/Promise.h>

template <typename TResponse, typename TError = std::string>
class CallbackKeeper {
public:
  using ResponseCallback = facebook::react::AsyncCallback<TResponse>;
  using ErrorCallback = facebook::react::AsyncCallback<TError>;

  struct CallbackPair {
    std::shared_ptr<ResponseCallback> onResponse;
    std::shared_ptr<ErrorCallback> onError;
  };

  static CallbackKeeper& getInstance() {
    static CallbackKeeper instance;
    return instance;
  }

  uint64_t addCallbacks(
      std::shared_ptr<ResponseCallback> onResponse,
      std::shared_ptr<ErrorCallback> onError) {
    std::lock_guard<std::mutex> lock(mutex_);
    uint64_t id = nextId_++;
    callbacks_[id] = {std::move(onResponse), std::move(onError)};
    return id;
  }

  template <typename TData>
  void invokeResponseCallback(uint64_t id, TData&& data) {
    // falafel will send an "EOF" message when the stream is stopped
    // Ignore this error message
    // if (data == "EOF") {
    //     return
    // }

    std::lock_guard<std::mutex> lock(mutex_);
    auto it = callbacks_.find(id);
    if (it != callbacks_.end() && it->second.onResponse) {
      it->second.onResponse->call(TResponse(std::forward<TData>(data)));
    }
  }

  template <typename TErr>
  void invokeErrorCallback(uint64_t id, TErr&& error) {
    std::lock_guard<std::mutex> lock(mutex_);
    auto it = callbacks_.find(id);
    if (it != callbacks_.end() && it->second.onError) {
      it->second.onError->call(TError(std::forward<TErr>(error)));
    }
  }

  void removeCallbacks(uint64_t id) {
    std::lock_guard<std::mutex> lock(mutex_);
    callbacks_.erase(id);
  }

private:
  // NOTE: Start from 2^32 in order circumvent go runtime checks for bad
  // pointers. Setting it to an inaccessible range will cause a crash when we
  // move it over to Go as a `void*` in `CCallback`:
  // `runtime: bad pointer in frame main.getInfo at 0x14000879dd8: 0x2`
  CallbackKeeper() : nextId_(1ULL << 32) {} // Start from 2^32

  std::mutex mutex_;
  std::map<uint64_t, CallbackPair> callbacks_;
  uint64_t nextId_;
};
