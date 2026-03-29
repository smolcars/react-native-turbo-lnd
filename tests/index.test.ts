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

  test("decodePayReq should decode a mock-created invoice", async () => {
    const { addInvoice, decodePayReq } = await import("../src/mock");

    const response = await addInvoice({
      memo: "Decode invoice",
      value: BigInt(1234),
      expiry: BigInt(1800),
      fallbackAddr: "bc1qexamplefallback",
      cltvExpiry: BigInt(40),
    });

    const payReq = await decodePayReq({
      payReq: response.paymentRequest,
    });

    expect(payReq.paymentHash).toBe(
      Buffer.from(response.rHash).toString("hex")
    );
    expect(payReq.numSatoshis).toBe(BigInt(1234));
    expect(payReq.numMsat).toBe(BigInt(1234000));
    expect(payReq.description).toBe("Decode invoice");
    expect(payReq.expiry).toBe(BigInt(1800));
    expect(payReq.fallbackAddr).toBe("bc1qexamplefallback");
    expect(payReq.cltvExpiry).toBe(BigInt(40));
    expect(payReq.paymentAddr).toEqual(response.paymentAddr);
  });

  test("decodePayReq should decode a real bolt11 payment request", async () => {
    const { decodePayReq } = await import("../src/mock");

    const payReqString =
      "lnbc20u1p3y0x3hpp5743k2g0fsqqxj7n8qzuhns5gmkk4djeejk3wkp64ppevgekvc0jsdqcve5kzar2v9nr5gpqd4hkuetesp5ez2g297jduwc20t6lmqlsg3man0vf2jfd8ar9fh8fhn2g8yttfkqxqy9gcqcqzys9qrsgqrzjqtx3k77yrrav9hye7zar2rtqlfkytl094dsp0ms5majzth6gt7ca6uhdkxl983uywgqqqqlgqqqvx5qqjqrzjqd98kxkpyw0l9tyy8r8q57k7zpy9zjmh6sez752wj6gcumqnj3yxzhdsmg6qq56utgqqqqqqqqqqqeqqjq7jd56882gtxhrjm03c93aacyfy306m4fq0tskf83c0nmet8zc2lxyyg3saz8x6vwcp26xnrlagf9semau3qm2glysp7sv95693fphvsp54l567";

    const payReq = await decodePayReq({
      payReq: payReqString,
    });

    expect(payReq.paymentHash).toBe(
      "f5636521e98000697a6700b979c288ddad56cb3995a2eb07550872c466ccc3e5"
    );
    expect(payReq.numSatoshis).toBe(BigInt(2000));
    expect(payReq.numMsat).toBe(BigInt(2000000));
    expect(payReq.timestamp).toBe(BigInt(1648859703));
    expect(payReq.expiry).toBe(BigInt(172800));
    expect(payReq.description).toBe("fiatjaf:  money");
    expect(payReq.cltvExpiry).toBe(BigInt(144));
    expect(payReq.paymentAddr).toEqual(
      Buffer.from(
        "c8948517d26f1d853d7afec1f8223becdec4aa4969fa32a6e74de6a41c8b5a6c",
        "hex"
      )
    );
    expect(payReq.routeHints.length).toBeGreaterThan(0);
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
