import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import { logSelectedElectrobunBackend } from "../src/electrobun/backend/select-driver";

describe("logSelectedElectrobunBackend", () => {
  const originalInfo = console.info;
  const originalWarn = console.warn;

  let infoMessages: unknown[][];
  let warnMessages: unknown[][];

  beforeEach(() => {
    infoMessages = [];
    warnMessages = [];
    console.info = ((...args: unknown[]) => {
      infoMessages.push(args);
    }) as typeof console.info;
    console.warn = ((...args: unknown[]) => {
      warnMessages.push(args);
    }) as typeof console.warn;
  });

  afterEach(() => {
    console.info = originalInfo;
    console.warn = originalWarn;
  });

  test("logs a stability warning for the bunffi backend", () => {
    logSelectedElectrobunBackend("bunffi");

    expect(infoMessages).toEqual([
      ["[react-native-turbo-lnd] Electrobun backend: bunffi"],
    ]);
    expect(warnMessages).toEqual([
      [
        "[react-native-turbo-lnd] Electrobun bunffi backend is experimental and not stable yet. Prefer TURBOLND_ELECTROBUN_BACKEND=napi for the more stable backend.",
      ],
    ]);
  });

  test("does not warn for the napi backend", () => {
    logSelectedElectrobunBackend("napi");

    expect(infoMessages).toEqual([
      ["[react-native-turbo-lnd] Electrobun backend: napi"],
    ]);
    expect(warnMessages).toHaveLength(0);
  });
});
