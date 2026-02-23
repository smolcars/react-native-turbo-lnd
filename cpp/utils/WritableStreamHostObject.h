#pragma once

#include <climits>
#include <jsi/jsi.h>

#include "base64.hpp"

using namespace facebook;

// WritableStreamHostObject is a JSI HostObject that allows JS-side to send back
// responses for a bidirectional gRPC stream.
class WritableStreamHostObject : public jsi::HostObject {
private:
    uintptr_t streamPtr;
    uint64_t recvrStreamId;

public:
    WritableStreamHostObject(uintptr_t ptr, uint64_t recvrStreamId) : streamPtr(ptr), recvrStreamId(recvrStreamId) {}

    jsi::Value send(jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* arguments, size_t count) {
        if (count < 1 || !arguments[0].isString()) {
            throw jsi::JSError(runtime, "send method expects a base64 encoded string argument");
        }

        std::string base64Data = arguments[0].asString(runtime).utf8(runtime);
        std::string decodedData = base64::from_base64(base64Data);
        if (decodedData.size() > static_cast<size_t>(INT_MAX)) {
            throw jsi::JSError(runtime, "send payload too large");
        }

        int sendResult = SendStreamC(streamPtr, decodedData.data(), static_cast<int>(decodedData.size()));
        return jsi::Value(sendResult == 0);
    }

    jsi::Value stop(jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* arguments, size_t count) {
        // Lnd sends `rpc error: code = Unknown desc = EOF` when the stream is stopped
        // But we'll remove the callback before, so the user won't get it
        CallbackKeeper::getInstance().removeCallbacks(recvrStreamId);

        int stopResult = StopStreamC(streamPtr);
        return jsi::Value(stopResult == 0);
    }

    std::vector<jsi::PropNameID> getPropertyNames(jsi::Runtime& rt) override {
        std::vector<jsi::PropNameID> result;
        result.push_back(jsi::PropNameID::forAscii(rt, "send"));
        result.push_back(jsi::PropNameID::forAscii(rt, "stop"));
        return result;
    }

    jsi::Value get(jsi::Runtime& rt, const jsi::PropNameID& pid) override {
        auto name = pid.utf8(rt);
        if (name == "send") {
            return jsi::Function::createFromHostFunction(rt, pid, 1, [this](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* arguments, size_t count) {
                return this->send(runtime, thisValue, arguments, count);
            });
        } else if (name == "stop") {
            return jsi::Function::createFromHostFunction(rt, pid, 0, [this](jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* arguments, size_t count) {
                return this->stop(runtime, thisValue, arguments, count);
            });
        }
        return jsi::Value::undefined();
    }
};
