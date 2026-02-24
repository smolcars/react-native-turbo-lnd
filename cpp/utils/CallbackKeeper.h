#pragma once

#include <mutex>
#include <map>
#include <string>

class CallbackKeeper {
public:
    static CallbackKeeper& getInstance() {
        static CallbackKeeper instance;
        return instance;
    }

    struct CallbackPair {
        std::shared_ptr<facebook::react::AsyncCallback<std::string>> onResponse;
        std::shared_ptr<facebook::react::AsyncCallback<std::string>> onError;
    };

    uint64_t addCallbacks(std::shared_ptr<facebook::react::AsyncCallback<std::string>> onResponse,
                          std::shared_ptr<facebook::react::AsyncCallback<std::string>> onError) {
        std::lock_guard<std::mutex> lock(mutex_);
        uint64_t id = nextId_++;
        callbacks_[id] = {onResponse, onError};
        return id;
    }

    void invokeResponseCallback(uint64_t id, const std::string& data) {
        // falafel will send an "EOF" message when the stream is stopped
        // Ignore this error message
        // if (data == "EOF") {
        //     return
        // }

        std::lock_guard<std::mutex> lock(mutex_);
        auto it = callbacks_.find(id);
        if (it != callbacks_.end() && it->second.onResponse) {
            it->second.onResponse->call(data);
        }
    }

    void invokeErrorCallback(uint64_t id, const std::string& error) {
        std::lock_guard<std::mutex> lock(mutex_);
        auto it = callbacks_.find(id);
        if (it != callbacks_.end() && it->second.onError) {
            it->second.onError->call(error);
        }
    }

    void removeCallbacks(uint64_t id) {
        std::lock_guard<std::mutex> lock(mutex_);
        callbacks_.erase(id);
    }

private:
    CallbackKeeper() : nextId_(1) {}
    std::mutex mutex_;
    std::map<uint64_t, CallbackPair> callbacks_;
    uint64_t nextId_;
};
