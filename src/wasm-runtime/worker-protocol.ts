export type RequestMessage =
  | { type: "setConsoleMirroring"; requestId: number; enabled: boolean }
  | { type: "load"; requestId: number; assetBaseUrl?: string }
  | { type: "start"; requestId: number; extraArgs: string }
  | {
      type: "invokeRpc";
      requestId: number;
      method: string;
      requestBytes: Uint8Array;
    }
  | {
      type: "openServerStream";
      requestId: number;
      streamId: number;
      method: string;
      requestBytes: Uint8Array;
    }
  | {
      type: "openBidiStream";
      requestId: number;
      streamId: number;
      method: string;
    }
  | {
      type: "streamSend";
      requestId: number;
      streamId: number;
      requestBytes: Uint8Array;
    }
  | {
      type: "streamStop";
      requestId: number;
      streamId: number;
    };

export type ResponseMessage =
  | {
      type: "response";
      requestId: number;
      success: true;
      result?: unknown;
    }
  | {
      type: "response";
      requestId: number;
      success: false;
      error: string;
    }
  | {
      type: "streamData";
      streamId: number;
      responseBytes: Uint8Array;
    }
  | {
      type: "streamError";
      streamId: number;
      error: string;
    }
  | {
      type: "stdoutBatch";
      lines: string[];
    };
