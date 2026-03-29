import { beforeEach, describe, expect, test } from "bun:test";

import { Invoice_InvoiceState, WalletState } from "../src/proto/lightning_pb";

describe("TurboLnd mock", () => {
  beforeEach(() => {
    (globalThis as { fakelnd?: boolean }).fakelnd = true;
  });

  test("getState should return LOCKED state", async () => {
    const { getState } = await import("../src/mock");

    const state = await getState({});

    expect(state.state).toBe(WalletState.LOCKED);
  });

  test("subscribeState should initially return LOCKED state", async () => {
    const { subscribeState } = await import("../src/mock");

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timed out waiting for subscribeState response"));
      }, 1000);

      subscribeState(
        "" as any,
        (state: any) => {
          clearTimeout(timeout);
          expect(state.state).toBe(WalletState.LOCKED);
          resolve();
        },
        (error: string) => {
          clearTimeout(timeout);
          reject(new Error(error));
        }
      );
    });
  });

  test("addInvoice should emit the created invoice to subscribeInvoices", async () => {
    const { addInvoice, subscribeInvoices } = await import("../src/mock");

    const invoicePromise = new Promise<any>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timed out waiting for subscribeInvoices response"));
      }, 1000);

      let unsubscribe = () => {};
      unsubscribe = subscribeInvoices(
        {},
        (invoice: any) => {
          clearTimeout(timeout);
          unsubscribe();
          resolve(invoice);
        },
        (error: string) => {
          clearTimeout(timeout);
          unsubscribe();
          reject(new Error(error));
        }
      );
    });

    const response = await addInvoice({
      memo: "Mock invoice",
      value: BigInt(2100),
    });
    const invoice = await invoicePromise;

    expect(response.addIndex > 0n).toBe(true);
    expect(response.paymentRequest.length).toBeGreaterThan(0);
    expect(response.rHash.length).toBe(32);
    expect(invoice.memo).toBe("Mock invoice");
    expect(invoice.value).toBe(BigInt(2100));
    expect(invoice.addIndex).toBe(response.addIndex);
    expect(invoice.rHash).toEqual(response.rHash);
    expect(invoice.state).toBe(Invoice_InvoiceState.OPEN);
  });

  test("lookupInvoice should return the created invoice by rHash", async () => {
    const { addInvoice, lookupInvoice } = await import("../src/mock");

    const response = await addInvoice({
      memo: "Lookup invoice",
      valueMsat: BigInt(42000),
      expiry: BigInt(3600),
    });

    const invoice = await lookupInvoice({
      rHash: response.rHash,
    });

    expect(invoice.memo).toBe("Lookup invoice");
    expect(invoice.rHash).toEqual(response.rHash);
    expect(invoice.paymentRequest).toBe(response.paymentRequest);
    expect(invoice.value).toBe(BigInt(42));
    expect(invoice.valueMsat).toBe(BigInt(42000));
    expect(invoice.expiry).toBe(BigInt(3600));
    expect(invoice.addIndex).toBe(response.addIndex);
    expect(invoice.state).toBe(Invoice_InvoiceState.OPEN);
  });

  test("deleteCanceledInvoice should match lnd validation and errors", async () => {
    const { addInvoice, deleteCanceledInvoice } = await import("../src/mock");

    const response = await addInvoice({
      memo: "Delete invoice",
      value: BigInt(1000),
    });
    const invoiceHash = Buffer.from(response.rHash).toString("hex");

    await expect(deleteCanceledInvoice({})).rejects.toThrow(
      "invoice hash must be provided"
    );
    await expect(
      deleteCanceledInvoice({
        invoiceHash: "bb02fbfa62983b6b62",
      })
    ).rejects.toThrow("invalid hash string length");
    await expect(
      deleteCanceledInvoice({
        invoiceHash:
          "bb02fbfa62983b6b621376bf8230732dd3a6dcea9f5df803c0935ae6ce7440dg",
      })
    ).rejects.toThrow("encoding/hex: invalid byte");
    await expect(
      deleteCanceledInvoice({
        invoiceHash,
      })
    ).rejects.toThrow("invoice not canceled");
    await expect(
      deleteCanceledInvoice({
        invoiceHash: "ab".repeat(32),
      })
    ).rejects.toThrow("unable to locate invoice");
  });
});
