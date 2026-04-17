import * as wasmRuntime from "../wasm-runtime/index.js";
import { createBrowserTurboLnd } from "./createBrowserTurboLnd";

export default createBrowserTurboLnd(wasmRuntime);
