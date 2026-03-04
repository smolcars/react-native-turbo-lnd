import { create, fromBinary, toBinary, toJson } from "@bufbuild/protobuf";
import { base64Decode, base64Encode } from "@bufbuild/protobuf/wire";
import { useEffect, useRef, useState } from "react";
import * as TurboLndElectrobunView from "../../../src/electrobun/view";
import TurboLndElectrobunViewCore from "../../../src/electrobun/view-core";
import {
  ChannelEventUpdateSchema,
  GetInfoRequestSchema,
  GetInfoResponseSchema,
  PeerEventSchema,
  TransactionSchema,
  WalletState,
} from "../../../src/proto/lightning_pb";
import { examplePing, sendExampleLog } from "./example-rpc";

const DEFAULT_START_ARGS = [
  "--lnddir=.lnd-mobile",
  "--noseedbackup",
  "--nolisten",
  "--bitcoin.active",
  "--bitcoin.regtest",
  "--bitcoin.node=neutrino",
  '--feeurl="https://nodes.lightning.computer/fees/v1/btc-fee-estimates.json"',
  "--routing.assumechanvalid",
  "--tlsdisableautofill",
  "--db.bolt.auto-compact",
  "--db.bolt.auto-compact-min-age=0",
  "--neutrino.connect=192.168.10.120:19444",
].join(" ");

function walletStateToLabel(state: WalletState): string {
  switch (state) {
    case WalletState.NON_EXISTING:
      return "NON_EXISTING";
    case WalletState.LOCKED:
      return "LOCKED";
    case WalletState.UNLOCKED:
      return "UNLOCKED";
    case WalletState.RPC_ACTIVE:
      return "RPC_ACTIVE";
    case WalletState.SERVER_ACTIVE:
      return "SERVER_ACTIVE";
    case WalletState.WAITING_TO_START:
      return "WAITING_TO_START";
    default:
      return `UNKNOWN(${state})`;
  }
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function formatUnknownPayload(payload: unknown): string {
  try {
    return JSON.stringify(payload);
  } catch {
    return String(payload);
  }
}

async function getCurrentWalletState(): Promise<WalletState> {
  const response = await TurboLndElectrobunView.getState({});
  return response.state;
}

type ChannelAcceptorStream = ReturnType<
  typeof TurboLndElectrobunView.channelAcceptor
>;

function App() {
  const [startArgs, setStartArgs] = useState(DEFAULT_START_ARGS);
  const [logLines, setLogLines] = useState<string[]>([]);

  const stateSubscriptionRef = useRef<(() => void) | null>(null);
  const channelAcceptorRef = useRef<ChannelAcceptorStream | null>(null);

  const appendLog = (line: string) => {
    setLogLines((prev) => {
      const next = [`${new Date().toISOString()} ${line}`, ...prev];
      return next.slice(0, 120);
    });
  };

  useEffect(() => {
    return () => {
      stateSubscriptionRef.current?.();
      stateSubscriptionRef.current = null;
      channelAcceptorRef.current?.close();
      channelAcceptorRef.current = null;
    };
  }, []);

  const handleStart = async () => {
    appendLog("start() requested");

    try {
      await TurboLndElectrobunView.start(startArgs);
      appendLog("start() completed");
    } catch (error) {
      appendLog(`start() failed: ${toErrorMessage(error)}`);
    }
  };

  const handleGetInfo = async () => {
    appendLog("getInfo() requested");

    try {
      const state = await getCurrentWalletState();
      if (
        state !== WalletState.RPC_ACTIVE &&
        state !== WalletState.SERVER_ACTIVE
      ) {
        appendLog(
          `getInfo() skipped: wallet state is ${walletStateToLabel(state)} (wait for RPC_ACTIVE/SERVER_ACTIVE)`
        );
        return;
      }

      const request = create(GetInfoRequestSchema, {});
      const requestB64 = base64Encode(toBinary(GetInfoRequestSchema, request));
      const responseB64 = await TurboLndElectrobunViewCore.getInfo(requestB64);
      const response = fromBinary(
        GetInfoResponseSchema,
        base64Decode(responseB64)
      );

      appendLog(
        `getInfo(): alias=${response.alias}, pubkey=${response.identityPubkey}, blockHeight=${response.blockHeight}`
      );
    } catch (error) {
      appendLog(`getInfo() failed: ${toErrorMessage(error)}`);
    }
  };

  const handleGetInfoBenchmark = async () => {
    appendLog("getInfoBenchmark() requested");

    try {
      const state = await getCurrentWalletState();
      if (
        state !== WalletState.RPC_ACTIVE &&
        state !== WalletState.SERVER_ACTIVE
      ) {
        appendLog(
          `getInfoBenchmark() skipped: wallet state is ${walletStateToLabel(state)} (wait for RPC_ACTIVE/SERVER_ACTIVE)`
        );
        return;
      }

      const startTime = performance.now();
      const request = create(GetInfoRequestSchema, {});
      const requestB64 = base64Encode(toBinary(GetInfoRequestSchema, request));
      for (let i = 0; i < 100; i++) {
        const responseB64 =
          await TurboLndElectrobunViewCore.getInfo(requestB64);
        fromBinary(GetInfoResponseSchema, base64Decode(responseB64));
      }
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      appendLog(`getInfoBenchmark() completed in ${executionTime}ms`);
    } catch (error) {
      appendLog(`getInfoBenchmark() failed: ${toErrorMessage(error)}`);
    }
  };

  const handleSubscribeState = () => {
    // if (stateSubscriptionRef.current !== null) {
    //   appendLog("subscribeState(): already subscribed");
    //   return;
    // }

    stateSubscriptionRef.current = TurboLndElectrobunView.subscribeState(
      {},
      (response) => {
        appendLog(`subscribeState(): ${walletStateToLabel(response.state)}`);
      },
      (error) => {
        appendLog(`subscribeState() error: ${error}`);
      }
    );

    appendLog("subscribeState(): subscribed");
  };

  const handleUnsubscribeState = () => {
    if (stateSubscriptionRef.current === null) {
      appendLog("subscribeState(): no active subscription");
      return;
    }

    stateSubscriptionRef.current();
    stateSubscriptionRef.current = null;
    appendLog("subscribeState(): unsubscribed");
  };

  const handleOpenChannelAcceptor = () => {
    if (channelAcceptorRef.current !== null) {
      appendLog("channelAcceptor(): already open");
      return;
    }

    channelAcceptorRef.current = TurboLndElectrobunView.channelAcceptor(
      (_response) => {
        appendLog("channelAcceptor(): data received");
      },
      (error) => {
        appendLog(`channelAcceptor() error: ${error}`);
      }
    );

    appendLog("channelAcceptor(): opened");
  };

  const handleStopChannelAcceptor = () => {
    if (channelAcceptorRef.current === null) {
      appendLog("channelAcceptor(): no active stream");
      return;
    }

    channelAcceptorRef.current.close();
    channelAcceptorRef.current = null;
    appendLog("channelAcceptor(): stopped");
  };

  const handleExamplePing = async () => {
    appendLog("__ExamplePing() requested");
    try {
      const response = await examplePing();
      appendLog(`__ExamplePing() response: ${formatUnknownPayload(response)}`);
    } catch (error) {
      appendLog(`__ExamplePing() failed: ${toErrorMessage(error)}`);
    }
  };

  const handleExampleLog = () => {
    const payload = {
      source: "mainview",
      event: "button_click",
      at: Date.now(),
    };
    try {
      sendExampleLog(payload);
      appendLog(`__ExampleLog() sent: ${formatUnknownPayload(payload)}`);
    } catch (error) {
      appendLog(`__ExampleLog() failed: ${toErrorMessage(error)}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-amber-300">
          TurboLnd Electrobun Example
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Backend: `src/electrobun/bun.ts` + `bun-rpc.ts` | Frontend:
          `src/electrobun/view.ts`
        </p>

        <div className="mt-6 rounded-lg border border-slate-700 bg-slate-900 p-4">
          <label
            className="mb-2 block text-sm font-medium text-slate-200"
            htmlFor="start-args"
          >
            start(args)
          </label>
          <textarea
            id="start-args"
            value={startArgs}
            onChange={(event) => setStartArgs(event.target.value)}
            rows={6}
            className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none ring-amber-400 focus:ring"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleStart}
              className="rounded bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Start
            </button>
            <button
              type="button"
              onClick={handleGetInfo}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              GetInfo
            </button>
            <button
              type="button"
              onClick={handleGetInfoBenchmark}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              GetInfo x 100 bench
            </button>

            <button
              type="button"
              onClick={() => {
                try {
                  TurboLndElectrobunView.subscribeState(
                    {},
                    (state) => {
                      appendLog(
                        `subscribeState(): ${walletStateToLabel(state.state)}`
                      );
                    },
                    (err) => {
                      appendLog(`subscribeState() error: ${err}`);
                    }
                  );
                  appendLog("subscribeState(): subscribed");

                  TurboLndElectrobunView.subscribePeerEvents(
                    {},
                    (state) => {
                      appendLog(
                        `subscribePeerEvents(): ${toJson(PeerEventSchema, state)}`
                      );
                    },
                    (err) => {
                      appendLog(`subscribePeerEvents() error: ${err}`);
                    }
                  );
                  appendLog("subscribePeerEvents(): subscribed");

                  TurboLndElectrobunView.subscribeChannelEvents(
                    {},
                    (state) => {
                      appendLog(
                        `subscribeChannelEvents(): ${toJson(ChannelEventUpdateSchema, state)}`
                      );
                    },
                    (err) => {
                      appendLog(`subscribeChannelEvents() error: ${err}`);
                    }
                  );
                  appendLog("subscribeChannelEvents(): subscribed");

                  TurboLndElectrobunView.subscribeTransactions(
                    {},
                    (state) => {
                      appendLog(
                        `subscribeTransactions(): ${toJson(TransactionSchema, state)}`
                      );
                    },
                    (err) => {
                      appendLog(`subscribeTransactions() error: ${err}`);
                    }
                  );
                  appendLog("subscribeTransactions(): subscribed");

                  appendLog("Done");
                } catch (error) {
                  appendLog(`SUBS threw: ${toErrorMessage(error)}`);
                }
              }}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              SUBS
            </button>

            <button
              type="button"
              onClick={handleSubscribeState}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold"
            >
              SubscribeState
            </button>
            <button
              type="button"
              onClick={handleUnsubscribeState}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold"
            >
              UnsubscribeState
            </button>
            <button
              type="button"
              onClick={handleOpenChannelAcceptor}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold"
            >
              OpenChannelAcceptor
            </button>
            <button
              type="button"
              onClick={handleExamplePing}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold"
            >
              ExamplePing
            </button>
            <button
              type="button"
              onClick={handleExampleLog}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold"
            >
              ExampleLog
            </button>
            <button
              type="button"
              onClick={handleStopChannelAcceptor}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold"
            >
              StopChannelAcceptor
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-slate-700 bg-slate-900 p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
            Log
          </h2>
          <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap rounded bg-slate-950 p-3 text-xs text-emerald-300">
            {logLines.length === 0 ? "No logs yet." : logLines.join("\n")}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
