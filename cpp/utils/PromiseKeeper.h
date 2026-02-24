#pragma once

#include <mutex>
#include <map>
#include <string>

class PromiseKeeper {
public:
    static PromiseKeeper& getInstance() {
        static PromiseKeeper instance;
        return instance;
    }

    uint64_t addPromise(std::shared_ptr<facebook::react::AsyncPromise<std::string>> promise) {
        std::lock_guard<std::mutex> lock(mutex_);
        uint64_t id = nextId_++;
        promises_[id] = promise;
        return id;
    }

    void resolvePromise(uint64_t id, std::string value) {
        std::lock_guard<std::mutex> lock(mutex_);
        auto it = promises_.find(id);
        if (it != promises_.end()) {
            it->second->resolve(std::move(value));
            promises_.erase(it);
        }
    }

    void rejectPromise(uint64_t id, std::string error) {
        std::lock_guard<std::mutex> lock(mutex_);
        auto it = promises_.find(id);
        if (it != promises_.end()) {
            it->second->reject(std::move(error));
            promises_.erase(it);
        }
    }

private:

    PromiseKeeper() : nextId_(1) {}
    std::mutex mutex_;
    std::map<uint64_t, std::shared_ptr<facebook::react::AsyncPromise<std::string>>> promises_;
    uint64_t nextId_;
};
