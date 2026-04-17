import * as wasmRuntime from "../wasm-runtime/index.web";
import { createBrowserTurboLnd } from "./createBrowserTurboLnd";

export default createBrowserTurboLnd(wasmRuntime);
