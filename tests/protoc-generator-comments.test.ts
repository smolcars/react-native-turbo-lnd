import { describe, expect, test } from "bun:test";
import { extractMethodComments } from "../protoc-generator/extract-method-comments";

describe("extractMethodComments", () => {
  test("associates a block comment only with the following RPC", () => {
    const comments = extractMethodComments(`
      service Router {
        /*
        DeleteForwardingHistory deletes forwarding history.
        */
        rpc DeleteForwardingHistory (DeleteRequest) returns (DeleteResponse);
      }

      message InterceptRequest {
        /*
        The key of this forwarded HTLC.
        */
        bytes incoming_circuit_key = 1;
      }
    `);

    expect(comments).toEqual({
      DeleteForwardingHistory:
        "DeleteForwardingHistory deletes forwarding history.",
    });
  });

  test("allows blank lines between a method comment and its RPC", () => {
    const comments = extractMethodComments(`
      /*
      Track a payment.
      */

      rpc TrackPayment (TrackRequest) returns (TrackResponse);
    `);

    expect(comments.TrackPayment).toBe("Track a payment.");
  });
});
