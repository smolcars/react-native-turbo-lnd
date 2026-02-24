#pragma once

#ifdef __ANDROID__

#include <jni.h>

#include "liblnd.h"
#include "utils/log.h"

extern "C" JNIEXPORT void JNICALL
Java_jnibinding_Jni_performOperation(JNIEnv* env, jobject /* this */, jobject callback) {
   // Get the callback class
   jclass callbackClass = env->GetObjectClass(callback);

   // Get the method ID for the onResult method
   jmethodID onResultMethod = env->GetMethodID(callbackClass, "onResult", "(Ljava/lang/String;)V");

   // Create a simple result string
   jstring result = env->NewStringUTF("Hello from C++! 1234");


    CCallback ccallback = {
        .onResponse = [](void* context, const char* data, int length) {
            TURBOLND_LOG_INFO("onResponse");
        },
        .onError = [](void* context, const char* error) {
            TURBOLND_LOG_INFO("onError");
            TURBOLND_LOG_INFO(error);
        },
        .responseContext = nullptr,
        .errorContext = nullptr
    };

    char* args = "--lnddir=\"/data/user/0/com.turbolndexample/files/\" --noseedbackup --nolisten --bitcoin.active --bitcoin.regtest --bitcoin.node=neutrino --feeurl=\"https://nodes.lightning.computer/fees/v1/btc-fee-estimates.json\" --routing.assumechanvalid --tlsdisableautofill --db.bolt.auto-compact --db.bolt.auto-compact-min-age=0 --neutrino.connect=192.168.10.120:19444";

    // ::start(args, ccallback);

    // Call the callback method
    env->CallVoidMethod(callback, onResultMethod, result);

    // Clean up
    env->DeleteLocalRef(result);
}

// extern "C" JNIEXPORT void JNICALL
// Java_jnibinding_Jni_performOperation(JNIEnv* env, jobject /* this */, jobject callback) {
//    // Get the callback class
//    jclass callbackClass = env->GetObjectClass(callback);

//    // Get the method ID for the onResult method
//    jmethodID onResultMethod = env->GetMethodID(callbackClass, "onResult", "(Ljava/lang/String;)V");

//    // Create a simple result string
//    jstring result = env->NewStringUTF("Hello from C++! 1234");

//    // Call the callback method
//    env->CallVoidMethod(callback, onResultMethod, result);

//    // Clean up
//    env->DeleteLocalRef(result);
// }

#endif
