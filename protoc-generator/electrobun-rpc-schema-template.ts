/* eslint-disable */

export type BuildElectrobunRpcSchemaParams = {
  contributorNotice: string;
  unaryMethods: string[];
  serverStreamingMethods: string[];
  bidiStreamingMethods: string[];
};

function buildStringUnionType(typeName: string, values: string[]): string {
  if (values.length === 0) {
    return `export type ${typeName} = never;`;
  }

  return `export type ${typeName} =\n${values
    .map((value) => `  | "${value}"`)
    .join("\n")};`;
}

export function buildElectrobunRpcSchema({
  contributorNotice,
  unaryMethods,
  serverStreamingMethods,
  bidiStreamingMethods,
}: BuildElectrobunRpcSchemaParams): string {
  return `${contributorNotice}
/* eslint-disable */
${buildStringUnionType("TurboLndElectrobunUnaryMethod", unaryMethods)}

${buildStringUnionType(
  "TurboLndElectrobunServerStreamMethod",
  serverStreamingMethods
)}

${buildStringUnionType("TurboLndElectrobunBidiStreamMethod", bidiStreamingMethods)}

export type TurboLndElectrobunRpcSchema = {
  bun: {
    requests: {
      __TurboLndStart: {
        params: string;
        response: string;
      };
      __TurboLndUnary: {
        params: {
          method: TurboLndElectrobunUnaryMethod;
          data: string;
        };
        response: {
          data: string;
        };
      };
      __TurboLndOpenServerStream: {
        params: {
          method: TurboLndElectrobunServerStreamMethod;
          data: string;
        };
        response: {
          subscriptionId: string;
        };
      };
      __TurboLndCloseServerStream: {
        params: {
          subscriptionId: string;
        };
        response: {
          removed: boolean;
        };
      };
      __TurboLndOpenBidiStream: {
        params: {
          method: TurboLndElectrobunBidiStreamMethod;
        };
        response: {
          subscriptionId: string;
        };
      };
      __TurboLndSendBidiStream: {
        params: {
          subscriptionId: string;
          data: string;
        };
        response: {
          sent: boolean;
        };
      };
      __TurboLndStopBidiStream: {
        params: {
          subscriptionId: string;
        };
        response: {
          stopped: boolean;
        };
      };
    };
    messages: {};
  };
  webview: {
    requests: {};
    messages: {
      __TurboLndStreamEvent: {
        subscriptionId: string;
        type: "data" | "error" | "end";
        data?: string;
        error?: string;
      };
    };
  };
};
`;
}
