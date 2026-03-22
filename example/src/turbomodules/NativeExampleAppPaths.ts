import { TurboModuleRegistry, type TurboModule } from "react-native";

export interface Spec extends TurboModule {
  getLndDirectory(): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>("ExampleAppPaths");
