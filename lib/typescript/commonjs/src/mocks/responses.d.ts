import { type Channel, type Peer, AddressType } from "../proto/lightning_pb";
export declare const mockGetInfoResponse: import("../proto/lightning_pb").GetInfoResponse;
export declare const mockChannels: Channel[];
export declare const mockPeers: Peer[];
export declare const mockWalletBalance: import("../proto/lightning_pb").WalletBalanceResponse;
export declare const generateMockAddress: (type: AddressType) => string;
export declare const mockChannelBalanceResponse: import("../proto/lightning_pb").ChannelBalanceResponse;
export declare const generateMockTxid: () => string;
export declare const mockPendingChannelsResponse: import("../proto/lightning_pb").PendingChannelsResponse;
//# sourceMappingURL=responses.d.ts.map