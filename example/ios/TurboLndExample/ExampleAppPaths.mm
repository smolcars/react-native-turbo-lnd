#import <Foundation/Foundation.h>
#import <TargetConditionals.h>

#import <React/RCTBridgeModule.h>
#import <ReactCommon/RCTTurboModule.h>

#if __has_include(<ReactCodegen/TurboLndExampleSpec/TurboLndExampleSpec.h>)
#import <ReactCodegen/TurboLndExampleSpec/TurboLndExampleSpec.h>
#else
#error "Missing generated TurboLndExampleSpec header. Run iOS codegen/pod install and ensure ReactCodegen exposes TurboLndExampleSpec."
#endif

@interface ExampleAppPaths : NSObject <NativeExampleAppPathsSpec>
@end

@implementation ExampleAppPaths

RCT_EXPORT_MODULE(ExampleAppPaths)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeExampleAppPathsSpecJSI>(params);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getLndDirectory)
{
  NSFileManager *fileManager = NSFileManager.defaultManager;
  NSString *libraryDirectory =
      NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES).firstObject;
  NSString *applicationSupportDirectory =
      [libraryDirectory stringByAppendingPathComponent:@"Application Support"];
#if TARGET_OS_OSX
  // macOS Application Support is shared with standalone lnd installations.
  // Keep the example's config and wallet under its own application identifier.
  NSString *applicationIdentifier =
      NSBundle.mainBundle.bundleIdentifier ?: @"react-native-turbo-lnd-example";
  applicationSupportDirectory =
      [applicationSupportDirectory stringByAppendingPathComponent:applicationIdentifier];
#endif
  NSString *primaryPath =
      [applicationSupportDirectory stringByAppendingPathComponent:@"lnd"];

  NSError *error = nil;
  if ([fileManager createDirectoryAtPath:primaryPath withIntermediateDirectories:YES attributes:nil error:&error]) {
    return primaryPath;
  }

  NSString *fallbackPath =
      [NSTemporaryDirectory() stringByAppendingPathComponent:@"react-native-turbo-lnd/lnd"];
  error = nil;
  [fileManager createDirectoryAtPath:fallbackPath withIntermediateDirectories:YES attributes:nil error:&error];
  return fallbackPath;
}

@end
