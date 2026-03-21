#import <Foundation/Foundation.h>

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
  NSString *primaryPath =
      [[libraryDirectory stringByAppendingPathComponent:@"Application Support"] stringByAppendingPathComponent:@"lnd"];

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
