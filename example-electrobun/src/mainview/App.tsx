import { create, toBinary, toJson } from "@bufbuild/protobuf";
import { base64Encode } from "@bufbuild/protobuf/wire";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  start,
  subscribeState,
  channelAcceptor,
  subscribePeerEvents,
  subscribeChannelEvents,
  subscribeTransactions,
  getState,
  getInfo,
} from "react-native-turbo-lnd";
import type { UnsubscribeFromStream } from "react-native-turbo-lnd/core";

import {
  ChannelEventUpdateSchema,
  GetInfoRequestSchema,
  PeerEventSchema,
  TransactionSchema,
  WalletState,
} from "react-native-turbo-lnd/protos/lightning_pb";
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
const DEFAULT_STRESS_CYCLES = "20";
const DEFAULT_STRESS_SUBS_PER_METHOD = "12";
const DEFAULT_STRESS_REQUEST_BURST = "24";
const DEFAULT_STRESS_HOLD_MS = "250";

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

function parseBoundedInteger(
  input: string,
  fallback: number,
  min: number,
  max: number
): number {
  const parsed = Number.parseInt(input, 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, parsed));
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getCurrentWalletState(): Promise<WalletState> {
  const response = await getState({});
  return response.state;
}

type ChannelAcceptorStream = ReturnType<typeof channelAcceptor>;

function App() {
  const [startArgs, setStartArgs] = useState(DEFAULT_START_ARGS);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [stressCyclesInput, setStressCyclesInput] = useState(
    DEFAULT_STRESS_CYCLES
  );
  const [stressSubsPerMethodInput, setStressSubsPerMethodInput] = useState(
    DEFAULT_STRESS_SUBS_PER_METHOD
  );
  const [stressRequestBurstInput, setStressRequestBurstInput] = useState(
    DEFAULT_STRESS_REQUEST_BURST
  );
  const [stressHoldMsInput, setStressHoldMsInput] = useState(
    DEFAULT_STRESS_HOLD_MS
  );
  const [stressRunning, setStressRunning] = useState(false);

  const stateSubscriptionRef = useRef<(() => void) | null>(null);
  const channelAcceptorRef = useRef<ChannelAcceptorStream | null>(null);
  const stressSubscriptionsRef = useRef<UnsubscribeFromStream[]>([]);
  const stressRunningRef = useRef(false);
  const stressCancelRequestedRef = useRef(false);

  const appendLog = (line: string) => {
    setLogLines((prev) => {
      const next = [`${new Date().toISOString()} ${line}`, ...prev];
      return next.slice(0, 120);
    });
  };

  type StressStats = {
    startSucceeded: number;
    startFailed: number;
    subscriptionsOpened: number;
    subscriptionsClosed: number;
    subscriptionOpenErrors: number;
    subscriptionCloseErrors: number;
    subscriptionCallbackErrors: number;
    subscriptionDataEvents: number;
    requestSucceeded: number;
    requestFailed: number;
    requestSkipped: number;
  };
  type StressSubscriptionMode = "all" | "stateOnly" | "txOnly";

  function stressModeToLabel(mode: StressSubscriptionMode): string {
    switch (mode) {
      case "stateOnly":
        return "stateOnly";
      case "txOnly":
        return "txOnly";
      default:
        return "all";
    }
  }

  const closeStressSubscriptions = useCallback(
    (stats?: StressStats): number => {
      const subscriptions = stressSubscriptionsRef.current.splice(0);
      for (const unsubscribe of subscriptions) {
        try {
          unsubscribe();
          if (stats) {
            stats.subscriptionsClosed += 1;
          }
        } catch {
          if (stats) {
            stats.subscriptionCloseErrors += 1;
          }
        }
      }

      return subscriptions.length;
    },
    []
  );

  useEffect(() => {
    return () => {
      stateSubscriptionRef.current?.();
      stateSubscriptionRef.current = null;
      channelAcceptorRef.current?.close();
      channelAcceptorRef.current = null;
      stressCancelRequestedRef.current = true;
      closeStressSubscriptions();
    };
  }, [closeStressSubscriptions]);

  const handleStart = async () => {
    appendLog("start() requested");

    try {
      await start(startArgs);
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
      const response = await getInfo({});

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
      for (let i = 0; i < 100; i++) {
        await getInfo({});
      }
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      appendLog(`getInfoBenchmark() completed in ${executionTime}ms`);
    } catch (error) {
      appendLog(`getInfoBenchmark() failed: ${toErrorMessage(error)}`);
    }
  };

  const handleSubscribeState = () => {
    if (stateSubscriptionRef.current !== null) {
      appendLog("subscribeState(): already subscribed");
      return;
    }

    stateSubscriptionRef.current = subscribeState(
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

    channelAcceptorRef.current = channelAcceptor(
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

  const handleSpamSubscribeTransactions = () => {
    const count = parseBoundedInteger(stressSubsPerMethodInput, 12, 1, 500);

    appendLog(
      `spamSubscribeTransactions(): opening ${count} native subscribeTransactions streams`
    );

    for (let i = 0; i < count; i += 1) {
      try {
        const unsubscribe = subscribeTransactions(
          {},
          (_transaction) => {
            appendLog(`spamSubscribeTransactions()[${i}] data received`);
          },
          (error) => {
            appendLog(`spamSubscribeTransactions()[${i}] error: ${error}`);
          }
        );
        stressSubscriptionsRef.current.push(unsubscribe);
      } catch (error) {
        appendLog(
          `spamSubscribeTransactions()[${i}] threw: ${toErrorMessage(error)}`
        );
        break;
      }
    }

    appendLog(
      `spamSubscribeTransactions(): active=${stressSubscriptionsRef.current.length}`
    );
  };

  const handleCloseSpammedSubscriptions = () => {
    const closed = closeStressSubscriptions();
    appendLog(`spamSubscribeTransactions(): closed ${closed} subscriptions`);
  };

  const runSubscriptionStress = async (
    includeStart: boolean,
    mode: StressSubscriptionMode
  ) => {
    if (stressRunningRef.current) {
      appendLog("stressSubscriptions(): already running");
      return;
    }

    const cycles = parseBoundedInteger(stressCyclesInput, 20, 1, 500);
    const subsPerMethod = parseBoundedInteger(
      stressSubsPerMethodInput,
      12,
      1,
      250
    );
    const requestBurst = parseBoundedInteger(
      stressRequestBurstInput,
      24,
      0,
      500
    );
    const holdMs = parseBoundedInteger(stressHoldMsInput, 250, 1, 10_000);
    const stats: StressStats = {
      startSucceeded: 0,
      startFailed: 0,
      subscriptionsOpened: 0,
      subscriptionsClosed: 0,
      subscriptionOpenErrors: 0,
      subscriptionCloseErrors: 0,
      subscriptionCallbackErrors: 0,
      subscriptionDataEvents: 0,
      requestSucceeded: 0,
      requestFailed: 0,
      requestSkipped: 0,
    };

    stressRunningRef.current = true;
    stressCancelRequestedRef.current = false;
    setStressRunning(true);
    closeStressSubscriptions();
    appendLog(
      `stressSubscriptions(): start mode=${stressModeToLabel(mode)} includeStart=${includeStart} cycles=${cycles} subsPerMethod=${subsPerMethod} requestBurst=${requestBurst} holdMs=${holdMs}`
    );

    const recordDataEvent = () => {
      stats.subscriptionDataEvents += 1;
    };
    const recordSubscriptionError = () => {
      stats.subscriptionCallbackErrors += 1;
    };

    const openSubscriptionWave = () => {
      for (let i = 0; i < subsPerMethod; i += 1) {
        if (mode === "all" || mode === "stateOnly") {
          try {
            const unsubscribe = subscribeState(
              {},
              recordDataEvent,
              recordSubscriptionError
            );
            stressSubscriptionsRef.current.push(unsubscribe);
            stats.subscriptionsOpened += 1;
          } catch {
            stats.subscriptionOpenErrors += 1;
          }
        }

        if (mode === "all") {
          try {
            const unsubscribe = subscribePeerEvents(
              {},
              recordDataEvent,
              recordSubscriptionError
            );
            stressSubscriptionsRef.current.push(unsubscribe);
            stats.subscriptionsOpened += 1;
          } catch {
            stats.subscriptionOpenErrors += 1;
          }

          try {
            const unsubscribe = subscribeChannelEvents(
              {},
              recordDataEvent,
              recordSubscriptionError
            );
            stressSubscriptionsRef.current.push(unsubscribe);
            stats.subscriptionsOpened += 1;
          } catch {
            stats.subscriptionOpenErrors += 1;
          }
        }

        if (mode === "all" || mode === "txOnly") {
          try {
            const unsubscribe = subscribeTransactions(
              {},
              recordDataEvent,
              recordSubscriptionError
            );
            stressSubscriptionsRef.current.push(unsubscribe);
            stats.subscriptionsOpened += 1;
          } catch {
            stats.subscriptionOpenErrors += 1;
          }
        }
      }
    };

    const runRequestBurst = async () => {
      const requestMessage = create(GetInfoRequestSchema, {});
      const requestB64 = base64Encode(
        toBinary(GetInfoRequestSchema, requestMessage)
      );

      const tasks = Array.from({ length: requestBurst }, async () => {
        try {
          const state = await getCurrentWalletState();
          if (
            state === WalletState.RPC_ACTIVE ||
            state === WalletState.SERVER_ACTIVE
          ) {
            await TurboLndElectrobunViewCore.getInfo(requestB64);
          } else {
            stats.requestSkipped += 1;
          }

          await examplePing();
          stats.requestSucceeded += 1;
        } catch {
          stats.requestFailed += 1;
        }
      });

      await Promise.all(tasks);
    };

    let startPromise: Promise<void> | null = null;

    try {
      if (includeStart) {
        startPromise = (async () => {
          try {
            await start(startArgs);
            stats.startSucceeded += 1;
          } catch (error) {
            stats.startFailed += 1;
            appendLog(
              `stressSubscriptions(): start failed: ${toErrorMessage(error)}`
            );
          }
        })();
      }

      for (let cycle = 1; cycle <= cycles; cycle += 1) {
        if (stressCancelRequestedRef.current) {
          break;
        }

        openSubscriptionWave();
        await runRequestBurst();
        await sleep(holdMs);
        closeStressSubscriptions(stats);

        appendLog(
          `stressSubscriptions(): cycle ${cycle}/${cycles} active=${stressSubscriptionsRef.current.length} opened=${stats.subscriptionsOpened} reqOk=${stats.requestSucceeded} reqFail=${stats.requestFailed} subErr=${stats.subscriptionCallbackErrors}`
        );
      }

      if (startPromise) {
        await startPromise;
      }
    } finally {
      closeStressSubscriptions(stats);
      const cancelled = stressCancelRequestedRef.current;
      stressCancelRequestedRef.current = false;
      stressRunningRef.current = false;
      setStressRunning(false);
      appendLog(
        `stressSubscriptions(): ${cancelled ? "cancelled" : "completed"} startOk=${stats.startSucceeded} startFail=${stats.startFailed} opened=${stats.subscriptionsOpened} closed=${stats.subscriptionsClosed} openErr=${stats.subscriptionOpenErrors} closeErr=${stats.subscriptionCloseErrors} subErr=${stats.subscriptionCallbackErrors} data=${stats.subscriptionDataEvents} reqOk=${stats.requestSucceeded} reqFail=${stats.requestFailed} reqSkipped=${stats.requestSkipped}`
      );
    }
  };

  const handleStressSubscriptions = () => {
    void runSubscriptionStress(false, "all");
  };

  const handleStressStartAndSubscriptions = () => {
    void runSubscriptionStress(true, "all");
  };

  const handleStressStateOnly = () => {
    void runSubscriptionStress(false, "stateOnly");
  };

  const handleStressTransactionsOnly = () => {
    void runSubscriptionStress(false, "txOnly");
  };

  const handleStopStress = () => {
    if (!stressRunningRef.current) {
      appendLog("stressSubscriptions(): no active run");
      return;
    }

    stressCancelRequestedRef.current = true;
    const closed = closeStressSubscriptions();
    appendLog(
      `stressSubscriptions(): stop requested, force-closed ${closed} active subscriptions`
    );
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
                  subscribeState(
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

                  subscribePeerEvents(
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

                  subscribeChannelEvents(
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

                  subscribeTransactions(
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
              onClick={handleSpamSubscribeTransactions}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold"
            >
              SpamTxSubs
            </button>
            <button
              type="button"
              onClick={handleCloseSpammedSubscriptions}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold"
            >
              CloseSpamSubs
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

        <div className="mt-6 rounded-lg border border-amber-700 bg-slate-900 p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-300">
            Stress Harness
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs text-slate-300">
              Cycles
              <input
                value={stressCyclesInput}
                onChange={(event) => setStressCyclesInput(event.target.value)}
                className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 outline-none ring-amber-400 focus:ring"
              />
            </label>
            <label className="text-xs text-slate-300">
              Subs/Method
              <input
                value={stressSubsPerMethodInput}
                onChange={(event) =>
                  setStressSubsPerMethodInput(event.target.value)
                }
                className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 outline-none ring-amber-400 focus:ring"
              />
            </label>
            <label className="text-xs text-slate-300">
              Request Burst
              <input
                value={stressRequestBurstInput}
                onChange={(event) =>
                  setStressRequestBurstInput(event.target.value)
                }
                className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 outline-none ring-amber-400 focus:ring"
              />
            </label>
            <label className="text-xs text-slate-300">
              Hold Ms
              <input
                value={stressHoldMsInput}
                onChange={(event) => setStressHoldMsInput(event.target.value)}
                className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 outline-none ring-amber-400 focus:ring"
              />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={stressRunning}
              onClick={handleStressSubscriptions}
              className="rounded bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Stress Subs
            </button>
            <button
              type="button"
              disabled={stressRunning}
              onClick={handleStressStartAndSubscriptions}
              className="rounded bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Stress Start+Subs
            </button>
            <button
              type="button"
              disabled={stressRunning}
              onClick={handleStressStateOnly}
              className="rounded bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Stress State Only
            </button>
            <button
              type="button"
              disabled={stressRunning}
              onClick={handleStressTransactionsOnly}
              className="rounded bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Stress Tx Only
            </button>
            <button
              type="button"
              onClick={handleStopStress}
              className="rounded bg-slate-700 px-4 py-2 text-sm font-semibold"
            >
              Stop Stress
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
