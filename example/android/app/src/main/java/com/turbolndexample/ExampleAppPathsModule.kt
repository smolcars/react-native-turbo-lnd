package com.turbolndexample

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.turbolndexample.specs.NativeExampleAppPathsSpec
import java.io.File

@ReactModule(name = NativeExampleAppPathsSpec.NAME)
class ExampleAppPathsModule(reactContext: ReactApplicationContext) :
    NativeExampleAppPathsSpec(reactContext) {

  override fun getLndDirectory(): String {
    val primaryDirectory = File(reactApplicationContext.filesDir, "lnd")
    if (ensureDirectory(primaryDirectory)) {
      return primaryDirectory.absolutePath
    }

    val fallbackDirectory = File(reactApplicationContext.cacheDir, "react-native-turbo-lnd/lnd")
    if (ensureDirectory(fallbackDirectory)) {
      return fallbackDirectory.absolutePath
    }

    throw IllegalStateException("Unable to create lnd directory")
  }

  private fun ensureDirectory(directory: File): Boolean {
    return directory.isDirectory || directory.mkdirs()
  }
}
