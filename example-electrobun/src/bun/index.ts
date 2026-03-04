import { BrowserWindow, Updater } from "electrobun/bun";
import { defineTurboLndElectrobunRPCForExample } from "./rpc";

const DEV_SERVER_PORT = 5173;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

async function getMainViewUrl(): Promise<string> {
  const channel = await Updater.localInfo.channel();
  if (channel === "dev") {
    try {
      await fetch(DEV_SERVER_URL, { method: "HEAD" });
      console.log(`HMR enabled: Using Vite dev server at ${DEV_SERVER_URL}`);
      return DEV_SERVER_URL;
    } catch {
      console.log(
        "Vite dev server not running. Run 'bun run dev:hmr' for HMR support."
      );
    }
  }

  return "views://mainview/index.html";
}

const url = await getMainViewUrl();
const appRpc = defineTurboLndElectrobunRPCForExample();

// eslint-disable-next-line no-new
new BrowserWindow({
  title: "TurboLnd Electrobun Example",
  url,
  rpc: appRpc,
  frame: {
    width: 1080,
    height: 760,
    x: 200,
    y: 200,
  },
});

console.log("TurboLnd Electrobun example started");
