#pragma once

#include <jsi/jsi.h>
#include <react/bridging/Uint8Array.h>

#include "CallbackKeeper.h"

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
        if (count < 1 || !arguments[0].isObject()) {
            throw jsi::JSError(runtime, "send method expects a Uint8Array argument");
        }

        auto typedArray = arguments[0].asObject(runtime);
        if (!typedArray.hasProperty(runtime, "buffer") ||
            !typedArray.hasProperty(runtime, "byteOffset") ||
            !typedArray.hasProperty(runtime, "byteLength")) {
            throw jsi::JSError(runtime, "send method expects an ArrayBufferView/Uint8Array");
        }

        auto bufferValue = typedArray.getProperty(runtime, "buffer");
        if (!bufferValue.isObject()) {
            throw jsi::JSError(runtime, "Invalid typed array buffer");
        }

        auto bufferObject = bufferValue.asObject(runtime);
        auto arrayBuffer = bufferObject.getArrayBuffer(runtime);
        auto byteOffsetValue = typedArray.getProperty(runtime, "byteOffset");
        auto byteLengthValue = typedArray.getProperty(runtime, "byteLength");

        if (!byteOffsetValue.isNumber() || !byteLengthValue.isNumber()) {
            throw jsi::JSError(runtime, "Invalid typed array offsets");
        }

        size_t byteOffset = static_cast<size_t>(byteOffsetValue.asNumber());
        size_t byteLength = static_cast<size_t>(byteLengthValue.asNumber());

        if (byteOffset + byteLength > arrayBuffer.size(runtime)) {
            throw jsi::JSError(runtime, "Typed array out of bounds");
        }

        std::string payload(
            reinterpret_cast<const char*>(arrayBuffer.data(runtime) + byteOffset),
            byteLength);

        int sendResult = SendStreamC(streamPtr, payload.data(), static_cast<int>(payload.size()));
        return jsi::Value(sendResult == 0);
    }

    jsi::Value stop(jsi::Runtime& runtime, const jsi::Value& thisValue, const jsi::Value* arguments, size_t count) {
        // Lnd sends `rpc error: code = Unknown desc = EOF` when the stream is stopped
        // But we'll remove the callback before, so the user won't get it
        CallbackKeeper<facebook::react::Uint8Array>::getInstance().removeCallbacks(recvrStreamId);

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
