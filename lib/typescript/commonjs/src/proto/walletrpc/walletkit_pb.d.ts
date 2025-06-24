import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import type { CoinSelectionStrategy, OutPoint, TransactionDetails, TransactionSchema as TransactionSchema$1, Utxo } from "../lightning_pb";
import type { KeyDescriptorSchema, KeyLocatorSchema, TxOut } from "../signrpc/signer_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file walletrpc/walletkit.proto.
 */
export declare const file_walletrpc_walletkit: GenFile;
/**
 * @generated from message walletrpc.ListUnspentRequest
 */
export type ListUnspentRequest = Message<"walletrpc.ListUnspentRequest"> & {
    /**
     * The minimum number of confirmations to be included.
     *
     * @generated from field: int32 min_confs = 1;
     */
    minConfs: number;
    /**
     * The maximum number of confirmations to be included.
     *
     * @generated from field: int32 max_confs = 2;
     */
    maxConfs: number;
    /**
     * An optional filter to only include outputs belonging to an account.
     *
     * @generated from field: string account = 3;
     */
    account: string;
    /**
     *
     * When min_confs and max_confs are zero, setting false implicitly
     * overrides max_confs to be MaxInt32, otherwise max_confs remains
     * zero. An error is returned if the value is true and both min_confs
     * and max_confs are non-zero. (default: false)
     *
     * @generated from field: bool unconfirmed_only = 4;
     */
    unconfirmedOnly: boolean;
};
/**
 * Describes the message walletrpc.ListUnspentRequest.
 * Use `create(ListUnspentRequestSchema)` to create a new message.
 */
export declare const ListUnspentRequestSchema: GenMessage<ListUnspentRequest>;
/**
 * @generated from message walletrpc.ListUnspentResponse
 */
export type ListUnspentResponse = Message<"walletrpc.ListUnspentResponse"> & {
    /**
     * A list of utxos satisfying the specified number of confirmations.
     *
     * @generated from field: repeated lnrpc.Utxo utxos = 1;
     */
    utxos: Utxo[];
};
/**
 * Describes the message walletrpc.ListUnspentResponse.
 * Use `create(ListUnspentResponseSchema)` to create a new message.
 */
export declare const ListUnspentResponseSchema: GenMessage<ListUnspentResponse>;
/**
 * @generated from message walletrpc.LeaseOutputRequest
 */
export type LeaseOutputRequest = Message<"walletrpc.LeaseOutputRequest"> & {
    /**
     *
     * An ID of 32 random bytes that must be unique for each distinct application
     * using this RPC which will be used to bound the output lease to.
     *
     * @generated from field: bytes id = 1;
     */
    id: Uint8Array;
    /**
     * The identifying outpoint of the output being leased.
     *
     * @generated from field: lnrpc.OutPoint outpoint = 2;
     */
    outpoint?: OutPoint;
    /**
     * The time in seconds before the lock expires. If set to zero, the default
     * lock duration is used.
     *
     * @generated from field: uint64 expiration_seconds = 3;
     */
    expirationSeconds: bigint;
};
/**
 * Describes the message walletrpc.LeaseOutputRequest.
 * Use `create(LeaseOutputRequestSchema)` to create a new message.
 */
export declare const LeaseOutputRequestSchema: GenMessage<LeaseOutputRequest>;
/**
 * @generated from message walletrpc.LeaseOutputResponse
 */
export type LeaseOutputResponse = Message<"walletrpc.LeaseOutputResponse"> & {
    /**
     *
     * The absolute expiration of the output lease represented as a unix timestamp.
     *
     * @generated from field: uint64 expiration = 1;
     */
    expiration: bigint;
};
/**
 * Describes the message walletrpc.LeaseOutputResponse.
 * Use `create(LeaseOutputResponseSchema)` to create a new message.
 */
export declare const LeaseOutputResponseSchema: GenMessage<LeaseOutputResponse>;
/**
 * @generated from message walletrpc.ReleaseOutputRequest
 */
export type ReleaseOutputRequest = Message<"walletrpc.ReleaseOutputRequest"> & {
    /**
     * The unique ID that was used to lock the output.
     *
     * @generated from field: bytes id = 1;
     */
    id: Uint8Array;
    /**
     * The identifying outpoint of the output being released.
     *
     * @generated from field: lnrpc.OutPoint outpoint = 2;
     */
    outpoint?: OutPoint;
};
/**
 * Describes the message walletrpc.ReleaseOutputRequest.
 * Use `create(ReleaseOutputRequestSchema)` to create a new message.
 */
export declare const ReleaseOutputRequestSchema: GenMessage<ReleaseOutputRequest>;
/**
 * @generated from message walletrpc.ReleaseOutputResponse
 */
export type ReleaseOutputResponse = Message<"walletrpc.ReleaseOutputResponse"> & {};
/**
 * Describes the message walletrpc.ReleaseOutputResponse.
 * Use `create(ReleaseOutputResponseSchema)` to create a new message.
 */
export declare const ReleaseOutputResponseSchema: GenMessage<ReleaseOutputResponse>;
/**
 * @generated from message walletrpc.KeyReq
 */
export type KeyReq = Message<"walletrpc.KeyReq"> & {
    /**
     *
     * Is the key finger print of the root pubkey that this request is targeting.
     * This allows the WalletKit to possibly serve out keys for multiple HD chains
     * via public derivation.
     *
     * @generated from field: int32 key_finger_print = 1;
     */
    keyFingerPrint: number;
    /**
     *
     * The target key family to derive a key from. In other contexts, this is
     * known as the "account".
     *
     * @generated from field: int32 key_family = 2;
     */
    keyFamily: number;
};
/**
 * Describes the message walletrpc.KeyReq.
 * Use `create(KeyReqSchema)` to create a new message.
 */
export declare const KeyReqSchema: GenMessage<KeyReq>;
/**
 * @generated from message walletrpc.AddrRequest
 */
export type AddrRequest = Message<"walletrpc.AddrRequest"> & {
    /**
     *
     * The name of the account to retrieve the next address of. If empty, the
     * default wallet account is used.
     *
     * @generated from field: string account = 1;
     */
    account: string;
    /**
     *
     * The type of address to derive.
     *
     * @generated from field: walletrpc.AddressType type = 2;
     */
    type: AddressType;
    /**
     *
     * Whether a change address should be derived.
     *
     * @generated from field: bool change = 3;
     */
    change: boolean;
};
/**
 * Describes the message walletrpc.AddrRequest.
 * Use `create(AddrRequestSchema)` to create a new message.
 */
export declare const AddrRequestSchema: GenMessage<AddrRequest>;
/**
 * @generated from message walletrpc.AddrResponse
 */
export type AddrResponse = Message<"walletrpc.AddrResponse"> & {
    /**
     *
     * The address encoded using a bech32 format.
     *
     * @generated from field: string addr = 1;
     */
    addr: string;
};
/**
 * Describes the message walletrpc.AddrResponse.
 * Use `create(AddrResponseSchema)` to create a new message.
 */
export declare const AddrResponseSchema: GenMessage<AddrResponse>;
/**
 * @generated from message walletrpc.Account
 */
export type Account = Message<"walletrpc.Account"> & {
    /**
     * The name used to identify the account.
     *
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * The type of addresses the account supports.
     *
     * @generated from field: walletrpc.AddressType address_type = 2;
     */
    addressType: AddressType;
    /**
     *
     * The public key backing the account that all keys are derived from
     * represented as an extended key. This will always be empty for the default
     * imported account in which single public keys are imported into.
     *
     * @generated from field: string extended_public_key = 3;
     */
    extendedPublicKey: string;
    /**
     *
     * The fingerprint of the root key from which the account public key was
     * derived from. This will always be zero for the default imported account in
     * which single public keys are imported into. The bytes are in big-endian
     * order.
     *
     * @generated from field: bytes master_key_fingerprint = 4;
     */
    masterKeyFingerprint: Uint8Array;
    /**
     *
     * The derivation path corresponding to the account public key. This will
     * always be empty for the default imported account in which single public keys
     * are imported into.
     *
     * @generated from field: string derivation_path = 5;
     */
    derivationPath: string;
    /**
     *
     * The number of keys derived from the external branch of the account public
     * key. This will always be zero for the default imported account in which
     * single public keys are imported into.
     *
     * @generated from field: uint32 external_key_count = 6;
     */
    externalKeyCount: number;
    /**
     *
     * The number of keys derived from the internal branch of the account public
     * key. This will always be zero for the default imported account in which
     * single public keys are imported into.
     *
     * @generated from field: uint32 internal_key_count = 7;
     */
    internalKeyCount: number;
    /**
     * Whether the wallet stores private keys for the account.
     *
     * @generated from field: bool watch_only = 8;
     */
    watchOnly: boolean;
};
/**
 * Describes the message walletrpc.Account.
 * Use `create(AccountSchema)` to create a new message.
 */
export declare const AccountSchema: GenMessage<Account>;
/**
 * @generated from message walletrpc.AddressProperty
 */
export type AddressProperty = Message<"walletrpc.AddressProperty"> & {
    /**
     *
     * The address encoded using the appropriate format depending on the
     * address type (base58, bech32, bech32m).
     *
     * Note that lnd's internal/custom keys for channels and other
     * functionality are derived from the same scope. Since they
     * aren't really used as addresses and will never have an
     * on-chain balance, we'll show the public key instead (only if
     * the show_custom_accounts flag is provided).
     *
     * @generated from field: string address = 1;
     */
    address: string;
    /**
     * Denotes if the address is a change address.
     *
     * @generated from field: bool is_internal = 2;
     */
    isInternal: boolean;
    /**
     * The balance of the address.
     *
     * @generated from field: int64 balance = 3;
     */
    balance: bigint;
    /**
     * The full derivation path of the address. This will be empty for imported
     * addresses.
     *
     * @generated from field: string derivation_path = 4;
     */
    derivationPath: string;
    /**
     * The public key of the address. This will be empty for imported addresses.
     *
     * @generated from field: bytes public_key = 5;
     */
    publicKey: Uint8Array;
};
/**
 * Describes the message walletrpc.AddressProperty.
 * Use `create(AddressPropertySchema)` to create a new message.
 */
export declare const AddressPropertySchema: GenMessage<AddressProperty>;
/**
 * @generated from message walletrpc.AccountWithAddresses
 */
export type AccountWithAddresses = Message<"walletrpc.AccountWithAddresses"> & {
    /**
     * The name used to identify the account.
     *
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * The type of addresses the account supports.
     *
     * @generated from field: walletrpc.AddressType address_type = 2;
     */
    addressType: AddressType;
    /**
     *
     * The derivation path corresponding to the account public key. This will
     * always be empty for the default imported account in which single public keys
     * are imported into.
     *
     * @generated from field: string derivation_path = 3;
     */
    derivationPath: string;
    /**
     *
     * List of address, its type internal/external & balance.
     * Note that the order of addresses will be random and not according to the
     * derivation index, since that information is not stored by the underlying
     * wallet.
     *
     * @generated from field: repeated walletrpc.AddressProperty addresses = 4;
     */
    addresses: AddressProperty[];
};
/**
 * Describes the message walletrpc.AccountWithAddresses.
 * Use `create(AccountWithAddressesSchema)` to create a new message.
 */
export declare const AccountWithAddressesSchema: GenMessage<AccountWithAddresses>;
/**
 * @generated from message walletrpc.ListAccountsRequest
 */
export type ListAccountsRequest = Message<"walletrpc.ListAccountsRequest"> & {
    /**
     * An optional filter to only return accounts matching this name.
     *
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * An optional filter to only return accounts matching this address type.
     *
     * @generated from field: walletrpc.AddressType address_type = 2;
     */
    addressType: AddressType;
};
/**
 * Describes the message walletrpc.ListAccountsRequest.
 * Use `create(ListAccountsRequestSchema)` to create a new message.
 */
export declare const ListAccountsRequestSchema: GenMessage<ListAccountsRequest>;
/**
 * @generated from message walletrpc.ListAccountsResponse
 */
export type ListAccountsResponse = Message<"walletrpc.ListAccountsResponse"> & {
    /**
     * @generated from field: repeated walletrpc.Account accounts = 1;
     */
    accounts: Account[];
};
/**
 * Describes the message walletrpc.ListAccountsResponse.
 * Use `create(ListAccountsResponseSchema)` to create a new message.
 */
export declare const ListAccountsResponseSchema: GenMessage<ListAccountsResponse>;
/**
 * @generated from message walletrpc.RequiredReserveRequest
 */
export type RequiredReserveRequest = Message<"walletrpc.RequiredReserveRequest"> & {
    /**
     * The number of additional channels the user would like to open.
     *
     * @generated from field: uint32 additional_public_channels = 1;
     */
    additionalPublicChannels: number;
};
/**
 * Describes the message walletrpc.RequiredReserveRequest.
 * Use `create(RequiredReserveRequestSchema)` to create a new message.
 */
export declare const RequiredReserveRequestSchema: GenMessage<RequiredReserveRequest>;
/**
 * @generated from message walletrpc.RequiredReserveResponse
 */
export type RequiredReserveResponse = Message<"walletrpc.RequiredReserveResponse"> & {
    /**
     * The amount of reserve required.
     *
     * @generated from field: int64 required_reserve = 1;
     */
    requiredReserve: bigint;
};
/**
 * Describes the message walletrpc.RequiredReserveResponse.
 * Use `create(RequiredReserveResponseSchema)` to create a new message.
 */
export declare const RequiredReserveResponseSchema: GenMessage<RequiredReserveResponse>;
/**
 * @generated from message walletrpc.ListAddressesRequest
 */
export type ListAddressesRequest = Message<"walletrpc.ListAddressesRequest"> & {
    /**
     * An optional filter to only return addresses matching this account.
     *
     * @generated from field: string account_name = 1;
     */
    accountName: string;
    /**
     * An optional flag to return LND's custom accounts (Purpose=1017)
     * public key along with other addresses.
     *
     * @generated from field: bool show_custom_accounts = 2;
     */
    showCustomAccounts: boolean;
};
/**
 * Describes the message walletrpc.ListAddressesRequest.
 * Use `create(ListAddressesRequestSchema)` to create a new message.
 */
export declare const ListAddressesRequestSchema: GenMessage<ListAddressesRequest>;
/**
 * @generated from message walletrpc.ListAddressesResponse
 */
export type ListAddressesResponse = Message<"walletrpc.ListAddressesResponse"> & {
    /**
     * A list of all the accounts and their addresses.
     *
     * @generated from field: repeated walletrpc.AccountWithAddresses account_with_addresses = 1;
     */
    accountWithAddresses: AccountWithAddresses[];
};
/**
 * Describes the message walletrpc.ListAddressesResponse.
 * Use `create(ListAddressesResponseSchema)` to create a new message.
 */
export declare const ListAddressesResponseSchema: GenMessage<ListAddressesResponse>;
/**
 * @generated from message walletrpc.GetTransactionRequest
 */
export type GetTransactionRequest = Message<"walletrpc.GetTransactionRequest"> & {
    /**
     * The txid of the transaction.
     *
     * @generated from field: string txid = 1;
     */
    txid: string;
};
/**
 * Describes the message walletrpc.GetTransactionRequest.
 * Use `create(GetTransactionRequestSchema)` to create a new message.
 */
export declare const GetTransactionRequestSchema: GenMessage<GetTransactionRequest>;
/**
 * @generated from message walletrpc.SignMessageWithAddrRequest
 */
export type SignMessageWithAddrRequest = Message<"walletrpc.SignMessageWithAddrRequest"> & {
    /**
     * The message to be signed. When using REST, this field must be encoded as
     * base64.
     *
     * @generated from field: bytes msg = 1;
     */
    msg: Uint8Array;
    /**
     * The address which will be used to look up the private key and sign the
     * corresponding message.
     *
     * @generated from field: string addr = 2;
     */
    addr: string;
};
/**
 * Describes the message walletrpc.SignMessageWithAddrRequest.
 * Use `create(SignMessageWithAddrRequestSchema)` to create a new message.
 */
export declare const SignMessageWithAddrRequestSchema: GenMessage<SignMessageWithAddrRequest>;
/**
 * @generated from message walletrpc.SignMessageWithAddrResponse
 */
export type SignMessageWithAddrResponse = Message<"walletrpc.SignMessageWithAddrResponse"> & {
    /**
     * The compact ECDSA signature for the given message encoded in base64.
     *
     * @generated from field: string signature = 1;
     */
    signature: string;
};
/**
 * Describes the message walletrpc.SignMessageWithAddrResponse.
 * Use `create(SignMessageWithAddrResponseSchema)` to create a new message.
 */
export declare const SignMessageWithAddrResponseSchema: GenMessage<SignMessageWithAddrResponse>;
/**
 * @generated from message walletrpc.VerifyMessageWithAddrRequest
 */
export type VerifyMessageWithAddrRequest = Message<"walletrpc.VerifyMessageWithAddrRequest"> & {
    /**
     * The message to be signed. When using REST, this field must be encoded as
     * base64.
     *
     * @generated from field: bytes msg = 1;
     */
    msg: Uint8Array;
    /**
     * The compact ECDSA signature to be verified over the given message
     * ecoded in base64.
     *
     * @generated from field: string signature = 2;
     */
    signature: string;
    /**
     * The address which will be used to look up the public key and verify the
     * the signature.
     *
     * @generated from field: string addr = 3;
     */
    addr: string;
};
/**
 * Describes the message walletrpc.VerifyMessageWithAddrRequest.
 * Use `create(VerifyMessageWithAddrRequestSchema)` to create a new message.
 */
export declare const VerifyMessageWithAddrRequestSchema: GenMessage<VerifyMessageWithAddrRequest>;
/**
 * @generated from message walletrpc.VerifyMessageWithAddrResponse
 */
export type VerifyMessageWithAddrResponse = Message<"walletrpc.VerifyMessageWithAddrResponse"> & {
    /**
     * Whether the signature was valid over the given message.
     *
     * @generated from field: bool valid = 1;
     */
    valid: boolean;
    /**
     * The pubkey recovered from the signature.
     *
     * @generated from field: bytes pubkey = 2;
     */
    pubkey: Uint8Array;
};
/**
 * Describes the message walletrpc.VerifyMessageWithAddrResponse.
 * Use `create(VerifyMessageWithAddrResponseSchema)` to create a new message.
 */
export declare const VerifyMessageWithAddrResponseSchema: GenMessage<VerifyMessageWithAddrResponse>;
/**
 * @generated from message walletrpc.ImportAccountRequest
 */
export type ImportAccountRequest = Message<"walletrpc.ImportAccountRequest"> & {
    /**
     * A name to identify the account with.
     *
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     *
     * A public key that corresponds to a wallet account represented as an extended
     * key. It must conform to a derivation path of the form
     * m/purpose'/coin_type'/account'.
     *
     * @generated from field: string extended_public_key = 2;
     */
    extendedPublicKey: string;
    /**
     *
     * The fingerprint of the root key (also known as the key with derivation path
     * m/) from which the account public key was derived from. This may be required
     * by some hardware wallets for proper identification and signing. The bytes
     * must be in big-endian order.
     *
     * @generated from field: bytes master_key_fingerprint = 3;
     */
    masterKeyFingerprint: Uint8Array;
    /**
     *
     * An address type is only required when the extended account public key has a
     * legacy version (xpub, tpub, etc.), such that the wallet cannot detect what
     * address scheme it belongs to.
     *
     * @generated from field: walletrpc.AddressType address_type = 4;
     */
    addressType: AddressType;
    /**
     *
     * Whether a dry run should be attempted when importing the account. This
     * serves as a way to confirm whether the account is being imported correctly
     * by returning the first N addresses for the external and internal branches of
     * the account. If these addresses match as expected, then it should be safe to
     * import the account as is.
     *
     * @generated from field: bool dry_run = 5;
     */
    dryRun: boolean;
};
/**
 * Describes the message walletrpc.ImportAccountRequest.
 * Use `create(ImportAccountRequestSchema)` to create a new message.
 */
export declare const ImportAccountRequestSchema: GenMessage<ImportAccountRequest>;
/**
 * @generated from message walletrpc.ImportAccountResponse
 */
export type ImportAccountResponse = Message<"walletrpc.ImportAccountResponse"> & {
    /**
     * The details of the imported account.
     *
     * @generated from field: walletrpc.Account account = 1;
     */
    account?: Account;
    /**
     *
     * The first N addresses that belong to the external branch of the account.
     * The external branch is typically used for external non-change addresses.
     * These are only returned if a dry run was specified within the request.
     *
     * @generated from field: repeated string dry_run_external_addrs = 2;
     */
    dryRunExternalAddrs: string[];
    /**
     *
     * The first N addresses that belong to the internal branch of the account.
     * The internal branch is typically used for change addresses. These are only
     * returned if a dry run was specified within the request.
     *
     * @generated from field: repeated string dry_run_internal_addrs = 3;
     */
    dryRunInternalAddrs: string[];
};
/**
 * Describes the message walletrpc.ImportAccountResponse.
 * Use `create(ImportAccountResponseSchema)` to create a new message.
 */
export declare const ImportAccountResponseSchema: GenMessage<ImportAccountResponse>;
/**
 * @generated from message walletrpc.ImportPublicKeyRequest
 */
export type ImportPublicKeyRequest = Message<"walletrpc.ImportPublicKeyRequest"> & {
    /**
     * A compressed public key represented as raw bytes.
     *
     * @generated from field: bytes public_key = 1;
     */
    publicKey: Uint8Array;
    /**
     * The type of address that will be generated from the public key.
     *
     * @generated from field: walletrpc.AddressType address_type = 2;
     */
    addressType: AddressType;
};
/**
 * Describes the message walletrpc.ImportPublicKeyRequest.
 * Use `create(ImportPublicKeyRequestSchema)` to create a new message.
 */
export declare const ImportPublicKeyRequestSchema: GenMessage<ImportPublicKeyRequest>;
/**
 * @generated from message walletrpc.ImportPublicKeyResponse
 */
export type ImportPublicKeyResponse = Message<"walletrpc.ImportPublicKeyResponse"> & {};
/**
 * Describes the message walletrpc.ImportPublicKeyResponse.
 * Use `create(ImportPublicKeyResponseSchema)` to create a new message.
 */
export declare const ImportPublicKeyResponseSchema: GenMessage<ImportPublicKeyResponse>;
/**
 * @generated from message walletrpc.ImportTapscriptRequest
 */
export type ImportTapscriptRequest = Message<"walletrpc.ImportTapscriptRequest"> & {
    /**
     *
     * The internal public key, serialized as 32-byte x-only public key.
     *
     * @generated from field: bytes internal_public_key = 1;
     */
    internalPublicKey: Uint8Array;
    /**
     * @generated from oneof walletrpc.ImportTapscriptRequest.script
     */
    script: {
        /**
         *
         * The full script tree with all individual leaves is known and the root
         * hash can be constructed from the full tree directly.
         *
         * @generated from field: walletrpc.TapscriptFullTree full_tree = 2;
         */
        value: TapscriptFullTree;
        case: "fullTree";
    } | {
        /**
         *
         * Only a single script leaf is known. To construct the root hash, the full
         * inclusion proof must also be provided.
         *
         * @generated from field: walletrpc.TapscriptPartialReveal partial_reveal = 3;
         */
        value: TapscriptPartialReveal;
        case: "partialReveal";
    } | {
        /**
         *
         * Only the root hash of the Taproot script tree (or other form of Taproot
         * commitment) is known.
         *
         * @generated from field: bytes root_hash_only = 4;
         */
        value: Uint8Array;
        case: "rootHashOnly";
    } | {
        /**
         *
         * Only the final, tweaked Taproot key is known and no additional
         * information about the internal key or type of tweak that was used to
         * derive it. When this is set, the wallet treats the key in
         * internal_public_key as the Taproot key directly. This can be useful for
         * tracking arbitrary Taproot outputs without the goal of ever being able
         * to spend from them through the internal wallet.
         *
         * @generated from field: bool full_key_only = 5;
         */
        value: boolean;
        case: "fullKeyOnly";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message walletrpc.ImportTapscriptRequest.
 * Use `create(ImportTapscriptRequestSchema)` to create a new message.
 */
export declare const ImportTapscriptRequestSchema: GenMessage<ImportTapscriptRequest>;
/**
 * @generated from message walletrpc.TapscriptFullTree
 */
export type TapscriptFullTree = Message<"walletrpc.TapscriptFullTree"> & {
    /**
     *
     * The complete, ordered list of all tap leaves of the tree.
     *
     * @generated from field: repeated walletrpc.TapLeaf all_leaves = 1;
     */
    allLeaves: TapLeaf[];
};
/**
 * Describes the message walletrpc.TapscriptFullTree.
 * Use `create(TapscriptFullTreeSchema)` to create a new message.
 */
export declare const TapscriptFullTreeSchema: GenMessage<TapscriptFullTree>;
/**
 * @generated from message walletrpc.TapLeaf
 */
export type TapLeaf = Message<"walletrpc.TapLeaf"> & {
    /**
     * The leaf version. Should be 0xc0 (192) in case of a SegWit v1 script.
     *
     * @generated from field: uint32 leaf_version = 1;
     */
    leafVersion: number;
    /**
     * The script of the tap leaf.
     *
     * @generated from field: bytes script = 2;
     */
    script: Uint8Array;
};
/**
 * Describes the message walletrpc.TapLeaf.
 * Use `create(TapLeafSchema)` to create a new message.
 */
export declare const TapLeafSchema: GenMessage<TapLeaf>;
/**
 * @generated from message walletrpc.TapscriptPartialReveal
 */
export type TapscriptPartialReveal = Message<"walletrpc.TapscriptPartialReveal"> & {
    /**
     * The tap leaf that is known and will be revealed.
     *
     * @generated from field: walletrpc.TapLeaf revealed_leaf = 1;
     */
    revealedLeaf?: TapLeaf;
    /**
     * The BIP-0341 serialized inclusion proof that is required to prove that
     * the revealed leaf is part of the tree. This contains 0..n blocks of 32
     * bytes. If the tree only contained a single leaf (which is the revealed
     * leaf), this can be empty.
     *
     * @generated from field: bytes full_inclusion_proof = 2;
     */
    fullInclusionProof: Uint8Array;
};
/**
 * Describes the message walletrpc.TapscriptPartialReveal.
 * Use `create(TapscriptPartialRevealSchema)` to create a new message.
 */
export declare const TapscriptPartialRevealSchema: GenMessage<TapscriptPartialReveal>;
/**
 * @generated from message walletrpc.ImportTapscriptResponse
 */
export type ImportTapscriptResponse = Message<"walletrpc.ImportTapscriptResponse"> & {
    /**
     *
     * The resulting pay-to-Taproot address that represents the imported internal
     * key with the script committed to it.
     *
     * @generated from field: string p2tr_address = 1;
     */
    p2trAddress: string;
};
/**
 * Describes the message walletrpc.ImportTapscriptResponse.
 * Use `create(ImportTapscriptResponseSchema)` to create a new message.
 */
export declare const ImportTapscriptResponseSchema: GenMessage<ImportTapscriptResponse>;
/**
 * @generated from message walletrpc.Transaction
 */
export type Transaction = Message<"walletrpc.Transaction"> & {
    /**
     *
     * The raw serialized transaction. Despite the field name, this does need to be
     * specified in raw bytes (or base64 encoded when using REST) and not in hex.
     * To not break existing software, the field can't simply be renamed.
     *
     * @generated from field: bytes tx_hex = 1;
     */
    txHex: Uint8Array;
    /**
     *
     * An optional label to save with the transaction. Limited to 500 characters.
     *
     * @generated from field: string label = 2;
     */
    label: string;
};
/**
 * Describes the message walletrpc.Transaction.
 * Use `create(TransactionSchema)` to create a new message.
 */
export declare const TransactionSchema: GenMessage<Transaction>;
/**
 * @generated from message walletrpc.PublishResponse
 */
export type PublishResponse = Message<"walletrpc.PublishResponse"> & {
    /**
     *
     * If blank, then no error occurred and the transaction was successfully
     * published. If not the empty string, then a string representation of the
     * broadcast error.
     *
     * TODO(roasbeef): map to a proper enum type
     *
     * @generated from field: string publish_error = 1;
     */
    publishError: string;
};
/**
 * Describes the message walletrpc.PublishResponse.
 * Use `create(PublishResponseSchema)` to create a new message.
 */
export declare const PublishResponseSchema: GenMessage<PublishResponse>;
/**
 * @generated from message walletrpc.RemoveTransactionResponse
 */
export type RemoveTransactionResponse = Message<"walletrpc.RemoveTransactionResponse"> & {
    /**
     * The status of the remove transaction operation.
     *
     * @generated from field: string status = 1;
     */
    status: string;
};
/**
 * Describes the message walletrpc.RemoveTransactionResponse.
 * Use `create(RemoveTransactionResponseSchema)` to create a new message.
 */
export declare const RemoveTransactionResponseSchema: GenMessage<RemoveTransactionResponse>;
/**
 * @generated from message walletrpc.SendOutputsRequest
 */
export type SendOutputsRequest = Message<"walletrpc.SendOutputsRequest"> & {
    /**
     *
     * The number of satoshis per kilo weight that should be used when crafting
     * this transaction.
     *
     * @generated from field: int64 sat_per_kw = 1;
     */
    satPerKw: bigint;
    /**
     *
     * A slice of the outputs that should be created in the transaction produced.
     *
     * @generated from field: repeated signrpc.TxOut outputs = 2;
     */
    outputs: TxOut[];
    /**
     * An optional label for the transaction, limited to 500 characters.
     *
     * @generated from field: string label = 3;
     */
    label: string;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the transaction must satisfy.
     *
     * @generated from field: int32 min_confs = 4;
     */
    minConfs: number;
    /**
     * Whether unconfirmed outputs should be used as inputs for the transaction.
     *
     * @generated from field: bool spend_unconfirmed = 5;
     */
    spendUnconfirmed: boolean;
    /**
     * The strategy to use for selecting coins during sending the outputs.
     *
     * @generated from field: lnrpc.CoinSelectionStrategy coin_selection_strategy = 6;
     */
    coinSelectionStrategy: CoinSelectionStrategy;
};
/**
 * Describes the message walletrpc.SendOutputsRequest.
 * Use `create(SendOutputsRequestSchema)` to create a new message.
 */
export declare const SendOutputsRequestSchema: GenMessage<SendOutputsRequest>;
/**
 * @generated from message walletrpc.SendOutputsResponse
 */
export type SendOutputsResponse = Message<"walletrpc.SendOutputsResponse"> & {
    /**
     *
     * The serialized transaction sent out on the network.
     *
     * @generated from field: bytes raw_tx = 1;
     */
    rawTx: Uint8Array;
};
/**
 * Describes the message walletrpc.SendOutputsResponse.
 * Use `create(SendOutputsResponseSchema)` to create a new message.
 */
export declare const SendOutputsResponseSchema: GenMessage<SendOutputsResponse>;
/**
 * @generated from message walletrpc.EstimateFeeRequest
 */
export type EstimateFeeRequest = Message<"walletrpc.EstimateFeeRequest"> & {
    /**
     *
     * The number of confirmations to shoot for when estimating the fee.
     *
     * @generated from field: int32 conf_target = 1;
     */
    confTarget: number;
};
/**
 * Describes the message walletrpc.EstimateFeeRequest.
 * Use `create(EstimateFeeRequestSchema)` to create a new message.
 */
export declare const EstimateFeeRequestSchema: GenMessage<EstimateFeeRequest>;
/**
 * @generated from message walletrpc.EstimateFeeResponse
 */
export type EstimateFeeResponse = Message<"walletrpc.EstimateFeeResponse"> & {
    /**
     *
     * The amount of satoshis per kw that should be used in order to reach the
     * confirmation target in the request.
     *
     * @generated from field: int64 sat_per_kw = 1;
     */
    satPerKw: bigint;
    /**
     * The current minimum relay fee based on our chain backend in sat/kw.
     *
     * @generated from field: int64 min_relay_fee_sat_per_kw = 2;
     */
    minRelayFeeSatPerKw: bigint;
};
/**
 * Describes the message walletrpc.EstimateFeeResponse.
 * Use `create(EstimateFeeResponseSchema)` to create a new message.
 */
export declare const EstimateFeeResponseSchema: GenMessage<EstimateFeeResponse>;
/**
 * @generated from message walletrpc.PendingSweep
 */
export type PendingSweep = Message<"walletrpc.PendingSweep"> & {
    /**
     * The outpoint of the output we're attempting to sweep.
     *
     * @generated from field: lnrpc.OutPoint outpoint = 1;
     */
    outpoint?: OutPoint;
    /**
     * The witness type of the output we're attempting to sweep.
     *
     * @generated from field: walletrpc.WitnessType witness_type = 2;
     */
    witnessType: WitnessType;
    /**
     * The value of the output we're attempting to sweep.
     *
     * @generated from field: uint32 amount_sat = 3;
     */
    amountSat: number;
    /**
     *
     * Deprecated, use sat_per_vbyte.
     * The fee rate we'll use to sweep the output, expressed in sat/vbyte. The fee
     * rate is only determined once a sweeping transaction for the output is
     * created, so it's possible for this to be 0 before this.
     *
     * @generated from field: uint32 sat_per_byte = 4 [deprecated = true];
     * @deprecated
     */
    satPerByte: number;
    /**
     * The number of broadcast attempts we've made to sweep the output.
     *
     * @generated from field: uint32 broadcast_attempts = 5;
     */
    broadcastAttempts: number;
    /**
     *
     * Deprecated.
     * The next height of the chain at which we'll attempt to broadcast the
     * sweep transaction of the output.
     *
     * @generated from field: uint32 next_broadcast_height = 6 [deprecated = true];
     * @deprecated
     */
    nextBroadcastHeight: number;
    /**
     *
     * Deprecated, use immediate.
     * Whether this input must be force-swept. This means that it is swept
     * immediately.
     *
     * @generated from field: bool force = 7 [deprecated = true];
     * @deprecated
     */
    force: boolean;
    /**
     *
     * Deprecated, use deadline.
     * The requested confirmation target for this output, which is the deadline
     * used by the sweeper.
     *
     * @generated from field: uint32 requested_conf_target = 8 [deprecated = true];
     * @deprecated
     */
    requestedConfTarget: number;
    /**
     * Deprecated, use requested_sat_per_vbyte.
     * The requested fee rate, expressed in sat/vbyte, for this output.
     *
     * @generated from field: uint32 requested_sat_per_byte = 9 [deprecated = true];
     * @deprecated
     */
    requestedSatPerByte: number;
    /**
     *
     * The current fee rate we'll use to sweep the output, expressed in sat/vbyte.
     * The fee rate is only determined once a sweeping transaction for the output
     * is created, so it's possible for this to be 0 before this.
     *
     * @generated from field: uint64 sat_per_vbyte = 10;
     */
    satPerVbyte: bigint;
    /**
     * The requested starting fee rate, expressed in sat/vbyte, for this
     * output. When not requested, this field will be 0.
     *
     * @generated from field: uint64 requested_sat_per_vbyte = 11;
     */
    requestedSatPerVbyte: bigint;
    /**
     *
     * Whether this input will be swept immediately.
     *
     * @generated from field: bool immediate = 12;
     */
    immediate: boolean;
    /**
     *
     * The budget for this sweep, expressed in satoshis. This is the maximum amount
     * that can be spent as fees to sweep this output.
     *
     * @generated from field: uint64 budget = 13;
     */
    budget: bigint;
    /**
     *
     * The deadline height used for this output when perform fee bumping.
     *
     * @generated from field: uint32 deadline_height = 14;
     */
    deadlineHeight: number;
};
/**
 * Describes the message walletrpc.PendingSweep.
 * Use `create(PendingSweepSchema)` to create a new message.
 */
export declare const PendingSweepSchema: GenMessage<PendingSweep>;
/**
 * @generated from message walletrpc.PendingSweepsRequest
 */
export type PendingSweepsRequest = Message<"walletrpc.PendingSweepsRequest"> & {};
/**
 * Describes the message walletrpc.PendingSweepsRequest.
 * Use `create(PendingSweepsRequestSchema)` to create a new message.
 */
export declare const PendingSweepsRequestSchema: GenMessage<PendingSweepsRequest>;
/**
 * @generated from message walletrpc.PendingSweepsResponse
 */
export type PendingSweepsResponse = Message<"walletrpc.PendingSweepsResponse"> & {
    /**
     *
     * The set of outputs currently being swept by lnd's central batching engine.
     *
     * @generated from field: repeated walletrpc.PendingSweep pending_sweeps = 1;
     */
    pendingSweeps: PendingSweep[];
};
/**
 * Describes the message walletrpc.PendingSweepsResponse.
 * Use `create(PendingSweepsResponseSchema)` to create a new message.
 */
export declare const PendingSweepsResponseSchema: GenMessage<PendingSweepsResponse>;
/**
 * @generated from message walletrpc.BumpFeeRequest
 */
export type BumpFeeRequest = Message<"walletrpc.BumpFeeRequest"> & {
    /**
     * The input we're attempting to bump the fee of.
     *
     * @generated from field: lnrpc.OutPoint outpoint = 1;
     */
    outpoint?: OutPoint;
    /**
     * Optional. The deadline in number of blocks that the input should be spent
     * within. When not set, for new inputs, the default value (1008) is used;
     * for existing inputs, their current values will be retained.
     *
     * @generated from field: uint32 target_conf = 2;
     */
    targetConf: number;
    /**
     *
     * Deprecated, use sat_per_vbyte.
     * The fee rate, expressed in sat/vbyte, that should be used to spend the input
     * with.
     *
     * @generated from field: uint32 sat_per_byte = 3 [deprecated = true];
     * @deprecated
     */
    satPerByte: number;
    /**
     *
     * Deprecated, use immediate.
     * Whether this input must be force-swept. This means that it is swept
     * immediately.
     *
     * @generated from field: bool force = 4 [deprecated = true];
     * @deprecated
     */
    force: boolean;
    /**
     *
     * Optional. The starting fee rate, expressed in sat/vbyte, that will be used
     * to spend the input with initially. This value will be used by the sweeper's
     * fee function as its starting fee rate. When not set, the sweeper will use
     * the estimated fee rate using the `target_conf` as the starting fee rate.
     *
     * @generated from field: uint64 sat_per_vbyte = 5;
     */
    satPerVbyte: bigint;
    /**
     *
     * Optional. Whether this input will be swept immediately. When set to true,
     * the sweeper will sweep this input without waiting for the next batch.
     *
     * @generated from field: bool immediate = 6;
     */
    immediate: boolean;
    /**
     *
     * Optional. The max amount in sats that can be used as the fees. Setting this
     * value greater than the input's value may result in CPFP - one or more wallet
     * utxos will be used to pay the fees specified by the budget. If not set, for
     * new inputs, by default 50% of the input's value will be treated as the
     * budget for fee bumping; for existing inputs, their current budgets will be
     * retained.
     *
     * @generated from field: uint64 budget = 7;
     */
    budget: bigint;
};
/**
 * Describes the message walletrpc.BumpFeeRequest.
 * Use `create(BumpFeeRequestSchema)` to create a new message.
 */
export declare const BumpFeeRequestSchema: GenMessage<BumpFeeRequest>;
/**
 * @generated from message walletrpc.BumpFeeResponse
 */
export type BumpFeeResponse = Message<"walletrpc.BumpFeeResponse"> & {
    /**
     * The status of the bump fee operation.
     *
     * @generated from field: string status = 1;
     */
    status: string;
};
/**
 * Describes the message walletrpc.BumpFeeResponse.
 * Use `create(BumpFeeResponseSchema)` to create a new message.
 */
export declare const BumpFeeResponseSchema: GenMessage<BumpFeeResponse>;
/**
 * @generated from message walletrpc.ListSweepsRequest
 */
export type ListSweepsRequest = Message<"walletrpc.ListSweepsRequest"> & {
    /**
     *
     * Retrieve the full sweep transaction details. If false, only the sweep txids
     * will be returned. Note that some sweeps that LND publishes will have been
     * replaced-by-fee, so will not be included in this output.
     *
     * @generated from field: bool verbose = 1;
     */
    verbose: boolean;
    /**
     *
     * The start height to use when fetching sweeps. If not specified (0), the
     * result will start from the earliest sweep. If set to -1 the result will
     * only include unconfirmed sweeps (at the time of the call).
     *
     * @generated from field: int32 start_height = 2;
     */
    startHeight: number;
};
/**
 * Describes the message walletrpc.ListSweepsRequest.
 * Use `create(ListSweepsRequestSchema)` to create a new message.
 */
export declare const ListSweepsRequestSchema: GenMessage<ListSweepsRequest>;
/**
 * @generated from message walletrpc.ListSweepsResponse
 */
export type ListSweepsResponse = Message<"walletrpc.ListSweepsResponse"> & {
    /**
     * @generated from oneof walletrpc.ListSweepsResponse.sweeps
     */
    sweeps: {
        /**
         * @generated from field: lnrpc.TransactionDetails transaction_details = 1;
         */
        value: TransactionDetails;
        case: "transactionDetails";
    } | {
        /**
         * @generated from field: walletrpc.ListSweepsResponse.TransactionIDs transaction_ids = 2;
         */
        value: ListSweepsResponse_TransactionIDs;
        case: "transactionIds";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message walletrpc.ListSweepsResponse.
 * Use `create(ListSweepsResponseSchema)` to create a new message.
 */
export declare const ListSweepsResponseSchema: GenMessage<ListSweepsResponse>;
/**
 * @generated from message walletrpc.ListSweepsResponse.TransactionIDs
 */
export type ListSweepsResponse_TransactionIDs = Message<"walletrpc.ListSweepsResponse.TransactionIDs"> & {
    /**
     *
     * Reversed, hex-encoded string representing the transaction ids of the
     * sweeps that our node has broadcast. Note that these transactions may
     * not have confirmed yet, we record sweeps on broadcast, not confirmation.
     *
     * @generated from field: repeated string transaction_ids = 1;
     */
    transactionIds: string[];
};
/**
 * Describes the message walletrpc.ListSweepsResponse.TransactionIDs.
 * Use `create(ListSweepsResponse_TransactionIDsSchema)` to create a new message.
 */
export declare const ListSweepsResponse_TransactionIDsSchema: GenMessage<ListSweepsResponse_TransactionIDs>;
/**
 * @generated from message walletrpc.LabelTransactionRequest
 */
export type LabelTransactionRequest = Message<"walletrpc.LabelTransactionRequest"> & {
    /**
     * The txid of the transaction to label. Note: When using gRPC, the bytes
     * must be in little-endian (reverse) order.
     *
     * @generated from field: bytes txid = 1;
     */
    txid: Uint8Array;
    /**
     * The label to add to the transaction, limited to 500 characters.
     *
     * @generated from field: string label = 2;
     */
    label: string;
    /**
     * Whether to overwrite the existing label, if it is present.
     *
     * @generated from field: bool overwrite = 3;
     */
    overwrite: boolean;
};
/**
 * Describes the message walletrpc.LabelTransactionRequest.
 * Use `create(LabelTransactionRequestSchema)` to create a new message.
 */
export declare const LabelTransactionRequestSchema: GenMessage<LabelTransactionRequest>;
/**
 * @generated from message walletrpc.LabelTransactionResponse
 */
export type LabelTransactionResponse = Message<"walletrpc.LabelTransactionResponse"> & {};
/**
 * Describes the message walletrpc.LabelTransactionResponse.
 * Use `create(LabelTransactionResponseSchema)` to create a new message.
 */
export declare const LabelTransactionResponseSchema: GenMessage<LabelTransactionResponse>;
/**
 * @generated from message walletrpc.FundPsbtRequest
 */
export type FundPsbtRequest = Message<"walletrpc.FundPsbtRequest"> & {
    /**
     * @generated from oneof walletrpc.FundPsbtRequest.template
     */
    template: {
        /**
         *
         * Use an existing PSBT packet as the template for the funded PSBT.
         *
         * The packet must contain at least one non-dust output. If one or more
         * inputs are specified, no coin selection is performed. In that case every
         * input must be an UTXO known to the wallet that has not been locked
         * before. The sum of all inputs must be sufficiently greater than the sum
         * of all outputs to pay a miner fee with the specified fee rate. A change
         * output is added to the PSBT if necessary.
         *
         * @generated from field: bytes psbt = 1;
         */
        value: Uint8Array;
        case: "psbt";
    } | {
        /**
         *
         * Use the outputs and optional inputs from this raw template.
         *
         * @generated from field: walletrpc.TxTemplate raw = 2;
         */
        value: TxTemplate;
        case: "raw";
    } | {
        /**
         *
         * Use an existing PSBT packet as the template for the funded PSBT.
         *
         * The difference to the pure PSBT template above is that coin selection is
         * performed even if inputs are specified. The output amounts are summed up
         * and used as the target amount for coin selection. A change output must
         * either already exist in the PSBT and be marked as such, otherwise a new
         * change output of the specified output type will be added. Any inputs
         * already specified in the PSBT must already be locked (if they belong to
         * this node), only newly added inputs will be locked by this RPC.
         *
         * In case the sum of the already provided inputs exceeds the required
         * output amount, no new coins are selected. Instead only the fee and
         * change amount calculation is performed (e.g. a change output is added if
         * requested or the change is added to the specified existing change
         * output, given there is any non-dust change). This can be identified by
         * the returned locked UTXOs being empty.
         *
         * @generated from field: walletrpc.PsbtCoinSelect coin_select = 9;
         */
        value: PsbtCoinSelect;
        case: "coinSelect";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     * @generated from oneof walletrpc.FundPsbtRequest.fees
     */
    fees: {
        /**
         *
         * The target number of blocks that the transaction should be confirmed in.
         *
         * @generated from field: uint32 target_conf = 3;
         */
        value: number;
        case: "targetConf";
    } | {
        /**
         *
         * The fee rate, expressed in sat/vbyte, that should be used to spend the
         * input with.
         *
         * @generated from field: uint64 sat_per_vbyte = 4;
         */
        value: bigint;
        case: "satPerVbyte";
    } | {
        case: undefined;
        value?: undefined;
    };
    /**
     *
     * The name of the account to fund the PSBT with. If empty, the default wallet
     * account is used.
     *
     * @generated from field: string account = 5;
     */
    account: string;
    /**
     * The minimum number of confirmations each one of your outputs used for
     * the transaction must satisfy.
     *
     * @generated from field: int32 min_confs = 6;
     */
    minConfs: number;
    /**
     * Whether unconfirmed outputs should be used as inputs for the transaction.
     *
     * @generated from field: bool spend_unconfirmed = 7;
     */
    spendUnconfirmed: boolean;
    /**
     * The address type for the change. If empty, P2WPKH addresses will be used
     * for default accounts and single imported public keys. For custom
     * accounts, no change type should be provided as the coin selection key
     * scope will always be used to generate the change address.
     *
     * @generated from field: walletrpc.ChangeAddressType change_type = 8;
     */
    changeType: ChangeAddressType;
    /**
     * The strategy to use for selecting coins during funding the PSBT.
     *
     * @generated from field: lnrpc.CoinSelectionStrategy coin_selection_strategy = 10;
     */
    coinSelectionStrategy: CoinSelectionStrategy;
};
/**
 * Describes the message walletrpc.FundPsbtRequest.
 * Use `create(FundPsbtRequestSchema)` to create a new message.
 */
export declare const FundPsbtRequestSchema: GenMessage<FundPsbtRequest>;
/**
 * @generated from message walletrpc.FundPsbtResponse
 */
export type FundPsbtResponse = Message<"walletrpc.FundPsbtResponse"> & {
    /**
     *
     * The funded but not yet signed PSBT packet.
     *
     * @generated from field: bytes funded_psbt = 1;
     */
    fundedPsbt: Uint8Array;
    /**
     *
     * The index of the added change output or -1 if no change was left over.
     *
     * @generated from field: int32 change_output_index = 2;
     */
    changeOutputIndex: number;
    /**
     *
     * The list of lock leases that were acquired for the inputs in the funded PSBT
     * packet. Only inputs added to the PSBT by this RPC are locked, inputs that
     * were already present in the PSBT are not locked.
     *
     * @generated from field: repeated walletrpc.UtxoLease locked_utxos = 3;
     */
    lockedUtxos: UtxoLease[];
};
/**
 * Describes the message walletrpc.FundPsbtResponse.
 * Use `create(FundPsbtResponseSchema)` to create a new message.
 */
export declare const FundPsbtResponseSchema: GenMessage<FundPsbtResponse>;
/**
 * @generated from message walletrpc.TxTemplate
 */
export type TxTemplate = Message<"walletrpc.TxTemplate"> & {
    /**
     *
     * An optional list of inputs to use. Every input must be an UTXO known to the
     * wallet that has not been locked before. The sum of all inputs must be
     * sufficiently greater than the sum of all outputs to pay a miner fee with the
     * fee rate specified in the parent message.
     *
     * If no inputs are specified, coin selection will be performed instead and
     * inputs of sufficient value will be added to the resulting PSBT.
     *
     * @generated from field: repeated lnrpc.OutPoint inputs = 1;
     */
    inputs: OutPoint[];
    /**
     *
     * A map of all addresses and the amounts to send to in the funded PSBT.
     *
     * @generated from field: map<string, uint64> outputs = 2;
     */
    outputs: {
        [key: string]: bigint;
    };
};
/**
 * Describes the message walletrpc.TxTemplate.
 * Use `create(TxTemplateSchema)` to create a new message.
 */
export declare const TxTemplateSchema: GenMessage<TxTemplate>;
/**
 * @generated from message walletrpc.PsbtCoinSelect
 */
export type PsbtCoinSelect = Message<"walletrpc.PsbtCoinSelect"> & {
    /**
     *
     * The template to use for the funded PSBT. The template must contain at least
     * one non-dust output. The amount to be funded is calculated by summing up the
     * amounts of all outputs in the template, subtracting all the input values of
     * the already specified inputs. The change value is added to the output that
     * is marked as such (or a new change output is added if none is marked). For
     * the input amount calculation to be correct, the template must have the
     * WitnessUtxo field set for all inputs. Any inputs already specified in the
     * PSBT must already be locked (if they belong to this node), only newly added
     * inputs will be locked by this RPC.
     *
     * @generated from field: bytes psbt = 1;
     */
    psbt: Uint8Array;
    /**
     * @generated from oneof walletrpc.PsbtCoinSelect.change_output
     */
    changeOutput: {
        /**
         *
         * Use the existing output within the template PSBT with the specified
         * index as the change output. Any leftover change will be added to the
         * already specified amount of that output. To add a new change output to
         * the PSBT, set the "add" field below instead. The type of change output
         * added is defined by change_type in the parent message.
         *
         * @generated from field: int32 existing_output_index = 2;
         */
        value: number;
        case: "existingOutputIndex";
    } | {
        /**
         *
         * Add a new change output to the PSBT using the change_type specified in
         * the parent message.
         *
         * @generated from field: bool add = 3;
         */
        value: boolean;
        case: "add";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message walletrpc.PsbtCoinSelect.
 * Use `create(PsbtCoinSelectSchema)` to create a new message.
 */
export declare const PsbtCoinSelectSchema: GenMessage<PsbtCoinSelect>;
/**
 * @generated from message walletrpc.UtxoLease
 */
export type UtxoLease = Message<"walletrpc.UtxoLease"> & {
    /**
     *
     * A 32 byte random ID that identifies the lease.
     *
     * @generated from field: bytes id = 1;
     */
    id: Uint8Array;
    /**
     * The identifying outpoint of the output being leased.
     *
     * @generated from field: lnrpc.OutPoint outpoint = 2;
     */
    outpoint?: OutPoint;
    /**
     *
     * The absolute expiration of the output lease represented as a unix timestamp.
     *
     * @generated from field: uint64 expiration = 3;
     */
    expiration: bigint;
    /**
     *
     * The public key script of the leased output.
     *
     * @generated from field: bytes pk_script = 4;
     */
    pkScript: Uint8Array;
    /**
     *
     * The value of the leased output in satoshis.
     *
     * @generated from field: uint64 value = 5;
     */
    value: bigint;
};
/**
 * Describes the message walletrpc.UtxoLease.
 * Use `create(UtxoLeaseSchema)` to create a new message.
 */
export declare const UtxoLeaseSchema: GenMessage<UtxoLease>;
/**
 * @generated from message walletrpc.SignPsbtRequest
 */
export type SignPsbtRequest = Message<"walletrpc.SignPsbtRequest"> & {
    /**
     *
     * The PSBT that should be signed. The PSBT must contain all required inputs,
     * outputs, UTXO data and custom fields required to identify the signing key.
     *
     * @generated from field: bytes funded_psbt = 1;
     */
    fundedPsbt: Uint8Array;
};
/**
 * Describes the message walletrpc.SignPsbtRequest.
 * Use `create(SignPsbtRequestSchema)` to create a new message.
 */
export declare const SignPsbtRequestSchema: GenMessage<SignPsbtRequest>;
/**
 * @generated from message walletrpc.SignPsbtResponse
 */
export type SignPsbtResponse = Message<"walletrpc.SignPsbtResponse"> & {
    /**
     * The signed transaction in PSBT format.
     *
     * @generated from field: bytes signed_psbt = 1;
     */
    signedPsbt: Uint8Array;
    /**
     * The indices of signed inputs.
     *
     * @generated from field: repeated uint32 signed_inputs = 2;
     */
    signedInputs: number[];
};
/**
 * Describes the message walletrpc.SignPsbtResponse.
 * Use `create(SignPsbtResponseSchema)` to create a new message.
 */
export declare const SignPsbtResponseSchema: GenMessage<SignPsbtResponse>;
/**
 * @generated from message walletrpc.FinalizePsbtRequest
 */
export type FinalizePsbtRequest = Message<"walletrpc.FinalizePsbtRequest"> & {
    /**
     *
     * A PSBT that should be signed and finalized. The PSBT must contain all
     * required inputs, outputs, UTXO data and partial signatures of all other
     * signers.
     *
     * @generated from field: bytes funded_psbt = 1;
     */
    fundedPsbt: Uint8Array;
    /**
     *
     * The name of the account to finalize the PSBT with. If empty, the default
     * wallet account is used.
     *
     * @generated from field: string account = 5;
     */
    account: string;
};
/**
 * Describes the message walletrpc.FinalizePsbtRequest.
 * Use `create(FinalizePsbtRequestSchema)` to create a new message.
 */
export declare const FinalizePsbtRequestSchema: GenMessage<FinalizePsbtRequest>;
/**
 * @generated from message walletrpc.FinalizePsbtResponse
 */
export type FinalizePsbtResponse = Message<"walletrpc.FinalizePsbtResponse"> & {
    /**
     * The fully signed and finalized transaction in PSBT format.
     *
     * @generated from field: bytes signed_psbt = 1;
     */
    signedPsbt: Uint8Array;
    /**
     * The fully signed and finalized transaction in the raw wire format.
     *
     * @generated from field: bytes raw_final_tx = 2;
     */
    rawFinalTx: Uint8Array;
};
/**
 * Describes the message walletrpc.FinalizePsbtResponse.
 * Use `create(FinalizePsbtResponseSchema)` to create a new message.
 */
export declare const FinalizePsbtResponseSchema: GenMessage<FinalizePsbtResponse>;
/**
 * @generated from message walletrpc.ListLeasesRequest
 */
export type ListLeasesRequest = Message<"walletrpc.ListLeasesRequest"> & {};
/**
 * Describes the message walletrpc.ListLeasesRequest.
 * Use `create(ListLeasesRequestSchema)` to create a new message.
 */
export declare const ListLeasesRequestSchema: GenMessage<ListLeasesRequest>;
/**
 * @generated from message walletrpc.ListLeasesResponse
 */
export type ListLeasesResponse = Message<"walletrpc.ListLeasesResponse"> & {
    /**
     * The list of currently leased utxos.
     *
     * @generated from field: repeated walletrpc.UtxoLease locked_utxos = 1;
     */
    lockedUtxos: UtxoLease[];
};
/**
 * Describes the message walletrpc.ListLeasesResponse.
 * Use `create(ListLeasesResponseSchema)` to create a new message.
 */
export declare const ListLeasesResponseSchema: GenMessage<ListLeasesResponse>;
/**
 * @generated from enum walletrpc.AddressType
 */
export declare enum AddressType {
    /**
     * @generated from enum value: UNKNOWN = 0;
     */
    UNKNOWN = 0,
    /**
     * @generated from enum value: WITNESS_PUBKEY_HASH = 1;
     */
    WITNESS_PUBKEY_HASH = 1,
    /**
     * @generated from enum value: NESTED_WITNESS_PUBKEY_HASH = 2;
     */
    NESTED_WITNESS_PUBKEY_HASH = 2,
    /**
     * @generated from enum value: HYBRID_NESTED_WITNESS_PUBKEY_HASH = 3;
     */
    HYBRID_NESTED_WITNESS_PUBKEY_HASH = 3,
    /**
     * @generated from enum value: TAPROOT_PUBKEY = 4;
     */
    TAPROOT_PUBKEY = 4
}
/**
 * Describes the enum walletrpc.AddressType.
 */
export declare const AddressTypeSchema: GenEnum<AddressType>;
/**
 * @generated from enum walletrpc.WitnessType
 */
export declare enum WitnessType {
    /**
     * @generated from enum value: UNKNOWN_WITNESS = 0;
     */
    UNKNOWN_WITNESS = 0,
    /**
     *
     * A witness that allows us to spend the output of a commitment transaction
     * after a relative lock-time lockout.
     *
     * @generated from enum value: COMMITMENT_TIME_LOCK = 1;
     */
    COMMITMENT_TIME_LOCK = 1,
    /**
     *
     * A witness that allows us to spend a settled no-delay output immediately on a
     * counterparty's commitment transaction.
     *
     * @generated from enum value: COMMITMENT_NO_DELAY = 2;
     */
    COMMITMENT_NO_DELAY = 2,
    /**
     *
     * A witness that allows us to sweep the settled output of a malicious
     * counterparty's who broadcasts a revoked commitment transaction.
     *
     * @generated from enum value: COMMITMENT_REVOKE = 3;
     */
    COMMITMENT_REVOKE = 3,
    /**
     *
     * A witness that allows us to sweep an HTLC which we offered to the remote
     * party in the case that they broadcast a revoked commitment state.
     *
     * @generated from enum value: HTLC_OFFERED_REVOKE = 4;
     */
    HTLC_OFFERED_REVOKE = 4,
    /**
     *
     * A witness that allows us to sweep an HTLC output sent to us in the case that
     * the remote party broadcasts a revoked commitment state.
     *
     * @generated from enum value: HTLC_ACCEPTED_REVOKE = 5;
     */
    HTLC_ACCEPTED_REVOKE = 5,
    /**
     *
     * A witness that allows us to sweep an HTLC output that we extended to a
     * party, but was never fulfilled.  This HTLC output isn't directly on the
     * commitment transaction, but is the result of a confirmed second-level HTLC
     * transaction. As a result, we can only spend this after a CSV delay.
     *
     * @generated from enum value: HTLC_OFFERED_TIMEOUT_SECOND_LEVEL = 6;
     */
    HTLC_OFFERED_TIMEOUT_SECOND_LEVEL = 6,
    /**
     *
     * A witness that allows us to sweep an HTLC output that was offered to us, and
     * for which we have a payment preimage. This HTLC output isn't directly on our
     * commitment transaction, but is the result of confirmed second-level HTLC
     * transaction. As a result, we can only spend this after a CSV delay.
     *
     * @generated from enum value: HTLC_ACCEPTED_SUCCESS_SECOND_LEVEL = 7;
     */
    HTLC_ACCEPTED_SUCCESS_SECOND_LEVEL = 7,
    /**
     *
     * A witness that allows us to sweep an HTLC that we offered to the remote
     * party which lies in the commitment transaction of the remote party. We can
     * spend this output after the absolute CLTV timeout of the HTLC as passed.
     *
     * @generated from enum value: HTLC_OFFERED_REMOTE_TIMEOUT = 8;
     */
    HTLC_OFFERED_REMOTE_TIMEOUT = 8,
    /**
     *
     * A witness that allows us to sweep an HTLC that was offered to us by the
     * remote party. We use this witness in the case that the remote party goes to
     * chain, and we know the pre-image to the HTLC. We can sweep this without any
     * additional timeout.
     *
     * @generated from enum value: HTLC_ACCEPTED_REMOTE_SUCCESS = 9;
     */
    HTLC_ACCEPTED_REMOTE_SUCCESS = 9,
    /**
     *
     * A witness that allows us to sweep an HTLC from the remote party's commitment
     * transaction in the case that the broadcast a revoked commitment, but then
     * also immediately attempt to go to the second level to claim the HTLC.
     *
     * @generated from enum value: HTLC_SECOND_LEVEL_REVOKE = 10;
     */
    HTLC_SECOND_LEVEL_REVOKE = 10,
    /**
     *
     * A witness type that allows us to spend a regular p2wkh output that's sent to
     * an output which is under complete control of the backing wallet.
     *
     * @generated from enum value: WITNESS_KEY_HASH = 11;
     */
    WITNESS_KEY_HASH = 11,
    /**
     *
     * A witness type that allows us to sweep an output that sends to a nested P2SH
     * script that pays to a key solely under our control.
     *
     * @generated from enum value: NESTED_WITNESS_KEY_HASH = 12;
     */
    NESTED_WITNESS_KEY_HASH = 12,
    /**
     *
     * A witness type that allows us to spend our anchor on the commitment
     * transaction.
     *
     * @generated from enum value: COMMITMENT_ANCHOR = 13;
     */
    COMMITMENT_ANCHOR = 13,
    /**
     *
     * A witness type that is similar to the COMMITMENT_NO_DELAY type,
     * but it omits the tweak that randomizes the key we need to
     * spend with a channel peer supplied set of randomness.
     *
     * @generated from enum value: COMMITMENT_NO_DELAY_TWEAKLESS = 14;
     */
    COMMITMENT_NO_DELAY_TWEAKLESS = 14,
    /**
     *
     * A witness type that allows us to spend our output on the counterparty's
     * commitment transaction after a confirmation.
     *
     * @generated from enum value: COMMITMENT_TO_REMOTE_CONFIRMED = 15;
     */
    COMMITMENT_TO_REMOTE_CONFIRMED = 15,
    /**
     *
     * A witness type that allows us to sweep an HTLC output that we extended
     * to a party, but was never fulfilled. This _is_ the HTLC output directly
     * on our commitment transaction, and the input to the second-level HTLC
     * timeout transaction. It can only be spent after CLTV expiry, and
     * commitment confirmation.
     *
     * @generated from enum value: HTLC_OFFERED_TIMEOUT_SECOND_LEVEL_INPUT_CONFIRMED = 16;
     */
    HTLC_OFFERED_TIMEOUT_SECOND_LEVEL_INPUT_CONFIRMED = 16,
    /**
     *
     * A witness type that allows us to sweep an HTLC output that was offered
     * to us, and for which we have a payment preimage. This _is_ the HTLC
     * output directly on our commitment transaction, and the input to the
     * second-level HTLC success transaction. It can only be spent after the
     * commitment has confirmed.
     *
     * @generated from enum value: HTLC_ACCEPTED_SUCCESS_SECOND_LEVEL_INPUT_CONFIRMED = 17;
     */
    HTLC_ACCEPTED_SUCCESS_SECOND_LEVEL_INPUT_CONFIRMED = 17,
    /**
     *
     * A witness type that allows us to spend our output on our local
     * commitment transaction after a relative and absolute lock-time lockout as
     * part of the script enforced lease commitment type.
     *
     * @generated from enum value: LEASE_COMMITMENT_TIME_LOCK = 18;
     */
    LEASE_COMMITMENT_TIME_LOCK = 18,
    /**
     *
     * A witness type that allows us to spend our output on the counterparty's
     * commitment transaction after a confirmation and absolute locktime as part
     * of the script enforced lease commitment type.
     *
     * @generated from enum value: LEASE_COMMITMENT_TO_REMOTE_CONFIRMED = 19;
     */
    LEASE_COMMITMENT_TO_REMOTE_CONFIRMED = 19,
    /**
     *
     * A witness type that allows us to sweep an HTLC output that we extended
     * to a party, but was never fulfilled. This HTLC output isn't directly on
     * the commitment transaction, but is the result of a confirmed second-level
     * HTLC transaction. As a result, we can only spend this after a CSV delay
     * and CLTV locktime as part of the script enforced lease commitment type.
     *
     * @generated from enum value: LEASE_HTLC_OFFERED_TIMEOUT_SECOND_LEVEL = 20;
     */
    LEASE_HTLC_OFFERED_TIMEOUT_SECOND_LEVEL = 20,
    /**
     *
     * A witness type that allows us to sweep an HTLC output that was offered
     * to us, and for which we have a payment preimage. This HTLC output isn't
     * directly on our commitment transaction, but is the result of confirmed
     * second-level HTLC transaction. As a result, we can only spend this after
     * a CSV delay and CLTV locktime as part of the script enforced lease
     * commitment type.
     *
     * @generated from enum value: LEASE_HTLC_ACCEPTED_SUCCESS_SECOND_LEVEL = 21;
     */
    LEASE_HTLC_ACCEPTED_SUCCESS_SECOND_LEVEL = 21,
    /**
     *
     * A witness type that allows us to spend a regular p2tr output that's sent
     * to an output which is under complete control of the backing wallet.
     *
     * @generated from enum value: TAPROOT_PUB_KEY_SPEND = 22;
     */
    TAPROOT_PUB_KEY_SPEND = 22,
    /**
     *
     * A witness type that allows us to spend our settled local commitment after a
     * CSV delay when we force close the channel.
     *
     * @generated from enum value: TAPROOT_LOCAL_COMMIT_SPEND = 23;
     */
    TAPROOT_LOCAL_COMMIT_SPEND = 23,
    /**
     *
     * A witness type that allows us to spend our settled local commitment after
     * a CSV delay when the remote party has force closed the channel.
     *
     * @generated from enum value: TAPROOT_REMOTE_COMMIT_SPEND = 24;
     */
    TAPROOT_REMOTE_COMMIT_SPEND = 24,
    /**
     *
     * A witness type that we'll use for spending our own anchor output.
     *
     * @generated from enum value: TAPROOT_ANCHOR_SWEEP_SPEND = 25;
     */
    TAPROOT_ANCHOR_SWEEP_SPEND = 25,
    /**
     *
     * A witness that allows us to timeout an HTLC we offered to the remote party
     * on our commitment transaction. We use this when we need to go on chain to
     * time out an HTLC.
     *
     * @generated from enum value: TAPROOT_HTLC_OFFERED_TIMEOUT_SECOND_LEVEL = 26;
     */
    TAPROOT_HTLC_OFFERED_TIMEOUT_SECOND_LEVEL = 26,
    /**
     *
     * A witness type that allows us to sweep an HTLC we accepted on our commitment
     * transaction after we go to the second level on chain.
     *
     * @generated from enum value: TAPROOT_HTLC_ACCEPTED_SUCCESS_SECOND_LEVEL = 27;
     */
    TAPROOT_HTLC_ACCEPTED_SUCCESS_SECOND_LEVEL = 27,
    /**
     *
     * A witness that allows us to sweep an HTLC on the revoked transaction of the
     * remote party that goes to the second level.
     *
     * @generated from enum value: TAPROOT_HTLC_SECOND_LEVEL_REVOKE = 28;
     */
    TAPROOT_HTLC_SECOND_LEVEL_REVOKE = 28,
    /**
     *
     * A witness that allows us to sweep an HTLC sent to us by the remote party
     * in the event that they broadcast a revoked state.
     *
     * @generated from enum value: TAPROOT_HTLC_ACCEPTED_REVOKE = 29;
     */
    TAPROOT_HTLC_ACCEPTED_REVOKE = 29,
    /**
     *
     * A witness that allows us to sweep an HTLC we offered to the remote party if
     * they broadcast a revoked commitment.
     *
     * @generated from enum value: TAPROOT_HTLC_OFFERED_REVOKE = 30;
     */
    TAPROOT_HTLC_OFFERED_REVOKE = 30,
    /**
     *
     * A witness that allows us to sweep an HTLC we offered to the remote party
     * that lies on the commitment transaction for the remote party. We can spend
     * this output after the absolute CLTV timeout of the HTLC as passed.
     *
     * @generated from enum value: TAPROOT_HTLC_OFFERED_REMOTE_TIMEOUT = 31;
     */
    TAPROOT_HTLC_OFFERED_REMOTE_TIMEOUT = 31,
    /**
     *
     * A witness type that allows us to sign the second level HTLC timeout
     * transaction when spending from an HTLC residing on our local commitment
     * transaction.
     * This is used by the sweeper to re-sign inputs if it needs to aggregate
     * several second level HTLCs.
     *
     * @generated from enum value: TAPROOT_HTLC_LOCAL_OFFERED_TIMEOUT = 32;
     */
    TAPROOT_HTLC_LOCAL_OFFERED_TIMEOUT = 32,
    /**
     *
     * A witness that allows us to sweep an HTLC that was offered to us by the
     * remote party for a taproot channels. We use this witness in the case that
     * the remote party goes to chain, and we know the pre-image to the HTLC. We
     * can sweep this without any additional timeout.
     *
     * @generated from enum value: TAPROOT_HTLC_ACCEPTED_REMOTE_SUCCESS = 33;
     */
    TAPROOT_HTLC_ACCEPTED_REMOTE_SUCCESS = 33,
    /**
     *
     * A witness type that allows us to sweep the HTLC offered to us on our local
     * commitment transaction. We'll use this when we need to go on chain to sweep
     * the HTLC. In this case, this is the second level HTLC success transaction.
     *
     * @generated from enum value: TAPROOT_HTLC_ACCEPTED_LOCAL_SUCCESS = 34;
     */
    TAPROOT_HTLC_ACCEPTED_LOCAL_SUCCESS = 34,
    /**
     *
     * A witness that allows us to sweep the settled output of a malicious
     * counterparty's who broadcasts a revoked taproot commitment transaction.
     *
     * @generated from enum value: TAPROOT_COMMITMENT_REVOKE = 35;
     */
    TAPROOT_COMMITMENT_REVOKE = 35
}
/**
 * Describes the enum walletrpc.WitnessType.
 */
export declare const WitnessTypeSchema: GenEnum<WitnessType>;
/**
 * The possible change address types for default accounts and single imported
 * public keys. By default, P2WPKH will be used. We don't provide the
 * possibility to choose P2PKH as it is a legacy key scope, nor NP2WPKH as
 * no key scope permits to do so. For custom accounts, no change type should
 * be provided as the coin selection key scope will always be used to generate
 * the change address.
 *
 * @generated from enum walletrpc.ChangeAddressType
 */
export declare enum ChangeAddressType {
    /**
     * CHANGE_ADDRESS_TYPE_UNSPECIFIED indicates that no change address type is
     * provided. We will then use P2WPKH address type for change (BIP0084 key
     * scope).
     *
     * @generated from enum value: CHANGE_ADDRESS_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * CHANGE_ADDRESS_TYPE_P2TR indicates to use P2TR address for change output
     * (BIP0086 key scope).
     *
     * @generated from enum value: CHANGE_ADDRESS_TYPE_P2TR = 1;
     */
    P2TR = 1
}
/**
 * Describes the enum walletrpc.ChangeAddressType.
 */
export declare const ChangeAddressTypeSchema: GenEnum<ChangeAddressType>;
/**
 * WalletKit is a service that gives access to the core functionalities of the
 * daemon's wallet.
 *
 * @generated from service walletrpc.WalletKit
 */
export declare const WalletKit: GenService<{
    /**
     *
     * ListUnspent returns a list of all utxos spendable by the wallet with a
     * number of confirmations between the specified minimum and maximum. By
     * default, all utxos are listed. To list only the unconfirmed utxos, set
     * the unconfirmed_only to true.
     *
     * @generated from rpc walletrpc.WalletKit.ListUnspent
     */
    listUnspent: {
        methodKind: "unary";
        input: typeof ListUnspentRequestSchema;
        output: typeof ListUnspentResponseSchema;
    };
    /**
     * lncli: `wallet leaseoutput`
     * LeaseOutput locks an output to the given ID, preventing it from being
     * available for any future coin selection attempts. The absolute time of the
     * lock's expiration is returned. The expiration of the lock can be extended by
     * successive invocations of this RPC. Outputs can be unlocked before their
     * expiration through `ReleaseOutput`.
     *
     * @generated from rpc walletrpc.WalletKit.LeaseOutput
     */
    leaseOutput: {
        methodKind: "unary";
        input: typeof LeaseOutputRequestSchema;
        output: typeof LeaseOutputResponseSchema;
    };
    /**
     * lncli: `wallet releaseoutput`
     * ReleaseOutput unlocks an output, allowing it to be available for coin
     * selection if it remains unspent. The ID should match the one used to
     * originally lock the output.
     *
     * @generated from rpc walletrpc.WalletKit.ReleaseOutput
     */
    releaseOutput: {
        methodKind: "unary";
        input: typeof ReleaseOutputRequestSchema;
        output: typeof ReleaseOutputResponseSchema;
    };
    /**
     * lncli: `wallet listleases`
     * ListLeases lists all currently locked utxos.
     *
     * @generated from rpc walletrpc.WalletKit.ListLeases
     */
    listLeases: {
        methodKind: "unary";
        input: typeof ListLeasesRequestSchema;
        output: typeof ListLeasesResponseSchema;
    };
    /**
     *
     * DeriveNextKey attempts to derive the *next* key within the key family
     * (account in BIP43) specified. This method should return the next external
     * child within this branch.
     *
     * @generated from rpc walletrpc.WalletKit.DeriveNextKey
     */
    deriveNextKey: {
        methodKind: "unary";
        input: typeof KeyReqSchema;
        output: typeof KeyDescriptorSchema;
    };
    /**
     *
     * DeriveKey attempts to derive an arbitrary key specified by the passed
     * KeyLocator.
     *
     * @generated from rpc walletrpc.WalletKit.DeriveKey
     */
    deriveKey: {
        methodKind: "unary";
        input: typeof KeyLocatorSchema;
        output: typeof KeyDescriptorSchema;
    };
    /**
     *
     * NextAddr returns the next unused address within the wallet.
     *
     * @generated from rpc walletrpc.WalletKit.NextAddr
     */
    nextAddr: {
        methodKind: "unary";
        input: typeof AddrRequestSchema;
        output: typeof AddrResponseSchema;
    };
    /**
     * lncli: `wallet gettx`
     * GetTransaction returns details for a transaction found in the wallet.
     *
     * @generated from rpc walletrpc.WalletKit.GetTransaction
     */
    getTransaction: {
        methodKind: "unary";
        input: typeof GetTransactionRequestSchema;
        output: typeof TransactionSchema$1;
    };
    /**
     * lncli: `wallet accounts list`
     * ListAccounts retrieves all accounts belonging to the wallet by default. A
     * name and key scope filter can be provided to filter through all of the
     * wallet accounts and return only those matching.
     *
     * @generated from rpc walletrpc.WalletKit.ListAccounts
     */
    listAccounts: {
        methodKind: "unary";
        input: typeof ListAccountsRequestSchema;
        output: typeof ListAccountsResponseSchema;
    };
    /**
     * lncli: `wallet requiredreserve`
     * RequiredReserve returns the minimum amount of satoshis that should be kept
     * in the wallet in order to fee bump anchor channels if necessary. The value
     * scales with the number of public anchor channels but is capped at a maximum.
     *
     * @generated from rpc walletrpc.WalletKit.RequiredReserve
     */
    requiredReserve: {
        methodKind: "unary";
        input: typeof RequiredReserveRequestSchema;
        output: typeof RequiredReserveResponseSchema;
    };
    /**
     * lncli: `wallet addresses list`
     * ListAddresses retrieves all the addresses along with their balance. An
     * account name filter can be provided to filter through all of the
     * wallet accounts and return the addresses of only those matching.
     *
     * @generated from rpc walletrpc.WalletKit.ListAddresses
     */
    listAddresses: {
        methodKind: "unary";
        input: typeof ListAddressesRequestSchema;
        output: typeof ListAddressesResponseSchema;
    };
    /**
     * lncli: `wallet addresses signmessage`
     * SignMessageWithAddr returns the compact signature (base64 encoded) created
     * with the private key of the provided address. This requires the address
     * to be solely based on a public key lock (no scripts). Obviously the internal
     * lnd wallet has to possess the private key of the address otherwise
     * an error is returned.
     *
     * This method aims to provide full compatibility with the bitcoin-core and
     * btcd implementation. Bitcoin-core's algorithm is not specified in a
     * BIP and only applicable for legacy addresses. This method enhances the
     * signing for additional address types: P2WKH, NP2WKH, P2TR.
     * For P2TR addresses this represents a special case. ECDSA is used to create
     * a compact signature which makes the public key of the signature recoverable.
     *
     * @generated from rpc walletrpc.WalletKit.SignMessageWithAddr
     */
    signMessageWithAddr: {
        methodKind: "unary";
        input: typeof SignMessageWithAddrRequestSchema;
        output: typeof SignMessageWithAddrResponseSchema;
    };
    /**
     * lncli: `wallet addresses verifymessage`
     * VerifyMessageWithAddr returns the validity and the recovered public key of
     * the provided compact signature (base64 encoded). The verification is
     * twofold. First the validity of the signature itself is checked and then
     * it is verified that the recovered public key of the signature equals
     * the public key of the provided address. There is no dependence on the
     * private key of the address therefore also external addresses are allowed
     * to verify signatures.
     * Supported address types are P2PKH, P2WKH, NP2WKH, P2TR.
     *
     * This method is the counterpart of the related signing method
     * (SignMessageWithAddr) and aims to provide full compatibility to
     * bitcoin-core's implementation. Although bitcoin-core/btcd only provide
     * this functionality for legacy addresses this function enhances it to
     * the address types: P2PKH, P2WKH, NP2WKH, P2TR.
     *
     * The verification for P2TR addresses is a special case and requires the
     * ECDSA compact signature to compare the reovered public key to the internal
     * taproot key. The compact ECDSA signature format was used because there
     * are still no known compact signature schemes for schnorr signatures.
     *
     * @generated from rpc walletrpc.WalletKit.VerifyMessageWithAddr
     */
    verifyMessageWithAddr: {
        methodKind: "unary";
        input: typeof VerifyMessageWithAddrRequestSchema;
        output: typeof VerifyMessageWithAddrResponseSchema;
    };
    /**
     * lncli: `wallet accounts import`
     * ImportAccount imports an account backed by an account extended public key.
     * The master key fingerprint denotes the fingerprint of the root key
     * corresponding to the account public key (also known as the key with
     * derivation path m/). This may be required by some hardware wallets for
     * proper identification and signing.
     *
     * The address type can usually be inferred from the key's version, but may be
     * required for certain keys to map them into the proper scope.
     *
     * For BIP-0044 keys, an address type must be specified as we intend to not
     * support importing BIP-0044 keys into the wallet using the legacy
     * pay-to-pubkey-hash (P2PKH) scheme. A nested witness address type will force
     * the standard BIP-0049 derivation scheme, while a witness address type will
     * force the standard BIP-0084 derivation scheme.
     *
     * For BIP-0049 keys, an address type must also be specified to make a
     * distinction between the standard BIP-0049 address schema (nested witness
     * pubkeys everywhere) and our own BIP-0049Plus address schema (nested pubkeys
     * externally, witness pubkeys internally).
     *
     * NOTE: Events (deposits/spends) for keys derived from an account will only be
     * detected by lnd if they happen after the import. Rescans to detect past
     * events will be supported later on.
     *
     * @generated from rpc walletrpc.WalletKit.ImportAccount
     */
    importAccount: {
        methodKind: "unary";
        input: typeof ImportAccountRequestSchema;
        output: typeof ImportAccountResponseSchema;
    };
    /**
     * lncli: `wallet accounts import-pubkey`
     * ImportPublicKey imports a public key as watch-only into the wallet. The
     * public key is converted into a simple address of the given type and that
     * address script is watched on chain. For Taproot keys, this will only watch
     * the BIP-0086 style output script. Use ImportTapscript for more advanced key
     * spend or script spend outputs.
     *
     * NOTE: Events (deposits/spends) for a key will only be detected by lnd if
     * they happen after the import. Rescans to detect past events will be
     * supported later on.
     *
     * @generated from rpc walletrpc.WalletKit.ImportPublicKey
     */
    importPublicKey: {
        methodKind: "unary";
        input: typeof ImportPublicKeyRequestSchema;
        output: typeof ImportPublicKeyResponseSchema;
    };
    /**
     *
     * ImportTapscript imports a Taproot script and internal key and adds the
     * resulting Taproot output key as a watch-only output script into the wallet.
     * For BIP-0086 style Taproot keys (no root hash commitment and no script spend
     * path) use ImportPublicKey.
     *
     * NOTE: Events (deposits/spends) for a key will only be detected by lnd if
     * they happen after the import. Rescans to detect past events will be
     * supported later on.
     *
     * NOTE: Taproot keys imported through this RPC currently _cannot_ be used for
     * funding PSBTs. Only tracking the balance and UTXOs is currently supported.
     *
     * @generated from rpc walletrpc.WalletKit.ImportTapscript
     */
    importTapscript: {
        methodKind: "unary";
        input: typeof ImportTapscriptRequestSchema;
        output: typeof ImportTapscriptResponseSchema;
    };
    /**
     * lncli: `wallet publishtx`
     * PublishTransaction attempts to publish the passed transaction to the
     * network. Once this returns without an error, the wallet will continually
     * attempt to re-broadcast the transaction on start up, until it enters the
     * chain.
     *
     * @generated from rpc walletrpc.WalletKit.PublishTransaction
     */
    publishTransaction: {
        methodKind: "unary";
        input: typeof TransactionSchema;
        output: typeof PublishResponseSchema;
    };
    /**
     * lncli: `wallet removetx`
     * RemoveTransaction attempts to remove the provided transaction from the
     * internal transaction store of the wallet.
     *
     * @generated from rpc walletrpc.WalletKit.RemoveTransaction
     */
    removeTransaction: {
        methodKind: "unary";
        input: typeof GetTransactionRequestSchema;
        output: typeof RemoveTransactionResponseSchema;
    };
    /**
     *
     * SendOutputs is similar to the existing sendmany call in Bitcoind, and
     * allows the caller to create a transaction that sends to several outputs at
     * once. This is ideal when wanting to batch create a set of transactions.
     *
     * @generated from rpc walletrpc.WalletKit.SendOutputs
     */
    sendOutputs: {
        methodKind: "unary";
        input: typeof SendOutputsRequestSchema;
        output: typeof SendOutputsResponseSchema;
    };
    /**
     *
     * EstimateFee attempts to query the internal fee estimator of the wallet to
     * determine the fee (in sat/kw) to attach to a transaction in order to
     * achieve the confirmation target.
     *
     * @generated from rpc walletrpc.WalletKit.EstimateFee
     */
    estimateFee: {
        methodKind: "unary";
        input: typeof EstimateFeeRequestSchema;
        output: typeof EstimateFeeResponseSchema;
    };
    /**
     * lncli: `pendingsweeps`
     * PendingSweeps returns lists of on-chain outputs that lnd is currently
     * attempting to sweep within its central batching engine. Outputs with similar
     * fee rates are batched together in order to sweep them within a single
     * transaction.
     *
     * NOTE: Some of the fields within PendingSweepsRequest are not guaranteed to
     * remain supported. This is an advanced API that depends on the internals of
     * the UtxoSweeper, so things may change.
     *
     * @generated from rpc walletrpc.WalletKit.PendingSweeps
     */
    pendingSweeps: {
        methodKind: "unary";
        input: typeof PendingSweepsRequestSchema;
        output: typeof PendingSweepsResponseSchema;
    };
    /**
     * lncli: `wallet bumpfee`
     * BumpFee is an endpoint that allows users to interact with lnd's sweeper
     * directly. It takes an outpoint from an unconfirmed transaction and sends it
     * to the sweeper for potential fee bumping. Depending on whether the outpoint
     * has been registered in the sweeper (an existing input, e.g., an anchor
     * output) or not (a new input, e.g., an unconfirmed wallet utxo), this will
     * either be an RBF or CPFP attempt.
     *
     * When receiving an input, lnd’s sweeper needs to understand its time
     * sensitivity to make economical fee bumps - internally a fee function is
     * created using the deadline and budget to guide the process. When the
     * deadline is approaching, the fee function will increase the fee rate and
     * perform an RBF.
     *
     * When a force close happens, all the outputs from the force closing
     * transaction will be registered in the sweeper. The sweeper will then handle
     * the creation, publish, and fee bumping of the sweeping transactions.
     * Everytime a new block comes in, unless the sweeping transaction is
     * confirmed, an RBF is attempted. To interfere with this automatic process,
     * users can use BumpFee to specify customized fee rate, budget, deadline, and
     * whether the sweep should happen immediately. It's recommended to call
     * `ListSweeps` to understand the shape of the existing sweeping transaction
     * first - depending on the number of inputs in this transaction, the RBF
     * requirements can be quite different.
     *
     * This RPC also serves useful when wanting to perform a Child-Pays-For-Parent
     * (CPFP), where the child transaction pays for its parent's fee. This can be
     * done by specifying an outpoint within the low fee transaction that is under
     * the control of the wallet.
     *
     * @generated from rpc walletrpc.WalletKit.BumpFee
     */
    bumpFee: {
        methodKind: "unary";
        input: typeof BumpFeeRequestSchema;
        output: typeof BumpFeeResponseSchema;
    };
    /**
     * lncli: `wallet listsweeps`
     * ListSweeps returns a list of the sweep transactions our node has produced.
     * Note that these sweeps may not be confirmed yet, as we record sweeps on
     * broadcast, not confirmation.
     *
     * @generated from rpc walletrpc.WalletKit.ListSweeps
     */
    listSweeps: {
        methodKind: "unary";
        input: typeof ListSweepsRequestSchema;
        output: typeof ListSweepsResponseSchema;
    };
    /**
     * lncli: `wallet labeltx`
     * LabelTransaction adds a label to a transaction. If the transaction already
     * has a label the call will fail unless the overwrite bool is set. This will
     * overwrite the existing transaction label. Labels must not be empty, and
     * cannot exceed 500 characters.
     *
     * @generated from rpc walletrpc.WalletKit.LabelTransaction
     */
    labelTransaction: {
        methodKind: "unary";
        input: typeof LabelTransactionRequestSchema;
        output: typeof LabelTransactionResponseSchema;
    };
    /**
     * lncli: `wallet psbt fund`
     * FundPsbt creates a fully populated PSBT that contains enough inputs to fund
     * the outputs specified in the template. There are three ways a user can
     * specify what we call the template (a list of inputs and outputs to use in
     * the PSBT): Either as a PSBT packet directly with no coin selection (using
     * the legacy "psbt" field), a PSBT with advanced coin selection support (using
     * the new "coin_select" field) or as a raw RPC message (using the "raw"
     * field).
     * The legacy "psbt" and "raw" modes, the following restrictions apply:
     * 1. If there are no inputs specified in the template, coin selection is
     * performed automatically.
     * 2. If the template does contain any inputs, it is assumed that full
     * coin selection happened externally and no additional inputs are added. If
     * the specified inputs aren't enough to fund the outputs with the given fee
     * rate, an error is returned.
     *
     * The new "coin_select" mode does not have these restrictions and allows the
     * user to specify a PSBT with inputs and outputs and still perform coin
     * selection on top of that.
     * For all modes this RPC requires any inputs that are specified to be locked
     * by the user (if they belong to this node in the first place).
     *
     * After either selecting or verifying the inputs, all input UTXOs are locked
     * with an internal app ID.
     *
     * NOTE: If this method returns without an error, it is the caller's
     * responsibility to either spend the locked UTXOs (by finalizing and then
     * publishing the transaction) or to unlock/release the locked UTXOs in case of
     * an error on the caller's side.
     *
     * @generated from rpc walletrpc.WalletKit.FundPsbt
     */
    fundPsbt: {
        methodKind: "unary";
        input: typeof FundPsbtRequestSchema;
        output: typeof FundPsbtResponseSchema;
    };
    /**
     *
     * SignPsbt expects a partial transaction with all inputs and outputs fully
     * declared and tries to sign all unsigned inputs that have all required fields
     * (UTXO information, BIP32 derivation information, witness or sig scripts)
     * set.
     * If no error is returned, the PSBT is ready to be given to the next signer or
     * to be finalized if lnd was the last signer.
     *
     * NOTE: This RPC only signs inputs (and only those it can sign), it does not
     * perform any other tasks (such as coin selection, UTXO locking or
     * input/output/fee value validation, PSBT finalization). Any input that is
     * incomplete will be skipped.
     *
     * @generated from rpc walletrpc.WalletKit.SignPsbt
     */
    signPsbt: {
        methodKind: "unary";
        input: typeof SignPsbtRequestSchema;
        output: typeof SignPsbtResponseSchema;
    };
    /**
     * lncli: `wallet psbt finalize`
     * FinalizePsbt expects a partial transaction with all inputs and outputs fully
     * declared and tries to sign all inputs that belong to the wallet. Lnd must be
     * the last signer of the transaction. That means, if there are any unsigned
     * non-witness inputs or inputs without UTXO information attached or inputs
     * without witness data that do not belong to lnd's wallet, this method will
     * fail. If no error is returned, the PSBT is ready to be extracted and the
     * final TX within to be broadcast.
     *
     * NOTE: This method does NOT publish the transaction once finalized. It is the
     * caller's responsibility to either publish the transaction on success or
     * unlock/release any locked UTXOs in case of an error in this method.
     *
     * @generated from rpc walletrpc.WalletKit.FinalizePsbt
     */
    finalizePsbt: {
        methodKind: "unary";
        input: typeof FinalizePsbtRequestSchema;
        output: typeof FinalizePsbtResponseSchema;
    };
}>;
//# sourceMappingURL=walletkit_pb.d.ts.map