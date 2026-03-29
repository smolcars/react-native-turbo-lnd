/* eslint-disable no-bitwise */
// Derived from the MIT-licensed light-bolt11-decoder project:
// https://github.com/nbd-wtf/light-bolt11-decoder

const UTF8_DECODER = new TextDecoder();
const BECH32_CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const BECH32_GENERATORS = [
  0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3,
];

const FEATUREBIT_ORDER = [
  "option_data_loss_protect",
  "initial_routing_sync",
  "option_upfront_shutdown_script",
  "gossip_queries",
  "var_onion_optin",
  "gossip_queries_ex",
  "option_static_remotekey",
  "payment_secret",
  "basic_mpp",
  "option_support_large_channel",
] as const;

const TAGCODES = {
  payment_hash: 1,
  payment_secret: 16,
  description: 13,
  payee: 19,
  description_hash: 23,
  expiry: 6,
  min_final_cltv_expiry: 24,
  route_hint: 3,
  feature_bits: 5,
} as const;

const TAG_NAMES: Record<string, string> = {};
for (const [name, code] of Object.entries(TAGCODES)) {
  TAG_NAMES[String(code)] = name;
}

const DIVISORS = {
  m: 1_000n,
  u: 1_000_000n,
  n: 1_000_000_000n,
  p: 1_000_000_000_000n,
} as const;

const MAX_MILLISATS = 2_100_000_000_000_000_000n;
const MILLISATS_PER_BTC = 100_000_000_000n;

export type DecodedRouteHint = {
  pubkey: string;
  shortChannelId: string;
  feeBaseMsat: number;
  feeProportionalMillionths: number;
  cltvExpiryDelta: number;
};

export type DecodedFeatureBits = Record<number, "required" | "supported">;

export type DecodedBolt11 = {
  payee?: string;
  paymentHash?: string;
  paymentSecret?: string;
  description?: string;
  descriptionHash?: string;
  expiry?: number;
  minFinalCltvExpiry?: number;
  routeHints: DecodedRouteHint[][];
  featureBits: DecodedFeatureBits;
  millisatoshis?: string;
  timestamp: number;
};

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

function bech32Polymod(values: number[]): number {
  let chk = 1;

  for (const value of values) {
    const top = chk >> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ value;

    for (let i = 0; i < BECH32_GENERATORS.length; i += 1) {
      if ((top >> i) & 1) {
        chk ^= BECH32_GENERATORS[i]!;
      }
    }
  }

  return chk;
}

function bech32HrpExpand(hrp: string): number[] {
  const values: number[] = [];

  for (let i = 0; i < hrp.length; i += 1) {
    values.push(hrp.charCodeAt(i) >> 5);
  }

  values.push(0);

  for (let i = 0; i < hrp.length; i += 1) {
    values.push(hrp.charCodeAt(i) & 31);
  }

  return values;
}

function verifyBech32Checksum(hrp: string, data: number[]): boolean {
  return bech32Polymod([...bech32HrpExpand(hrp), ...data]) === 1;
}

function decodeBech32(input: string): { prefix: string; words: number[] } {
  if (input.length < 8) {
    throw new Error("Invalid bech32 string");
  }

  const hasLower = input !== input.toUpperCase();
  const hasUpper = input !== input.toLowerCase();
  if (hasLower && hasUpper) {
    throw new Error("Mixed-case bech32 string");
  }

  const normalized = input.toLowerCase();
  const separatorIndex = normalized.lastIndexOf("1");
  if (separatorIndex <= 0 || separatorIndex + 7 > normalized.length) {
    throw new Error("Invalid bech32 separator position");
  }

  const prefix = normalized.slice(0, separatorIndex);
  const dataPart = normalized.slice(separatorIndex + 1);
  const words: number[] = [];

  for (const char of dataPart) {
    const index = BECH32_CHARSET.indexOf(char);
    if (index === -1) {
      throw new Error(`Invalid bech32 character: ${char}`);
    }
    words.push(index);
  }

  if (!verifyBech32Checksum(prefix, words)) {
    throw new Error("Invalid bech32 checksum");
  }

  return {
    prefix,
    words: words.slice(0, -6),
  };
}

function convertBits(
  data: number[],
  fromBits: number,
  toBits: number,
  pad: boolean
): Uint8Array {
  let acc = 0;
  let bits = 0;
  const maxv = (1 << toBits) - 1;
  const result: number[] = [];

  for (const value of data) {
    if (value < 0 || value >> fromBits !== 0) {
      throw new Error("Invalid value for convertBits");
    }

    acc = (acc << fromBits) | value;
    bits += fromBits;

    while (bits >= toBits) {
      bits -= toBits;
      result.push((acc >> bits) & maxv);
    }
  }

  if (pad) {
    if (bits > 0) {
      result.push((acc << (toBits - bits)) & maxv);
    }
  } else if (bits >= fromBits || ((acc << (toBits - bits)) & maxv) !== 0) {
    throw new Error("Invalid bech32 data padding");
  }

  return Uint8Array.from(result);
}

function fromWords(words: number[]): Uint8Array {
  return convertBits(words, 5, 8, false);
}

function wordsToIntBE(words: number[]): number {
  return words
    .slice()
    .reverse()
    .reduce((total, item, index) => total + item * Math.pow(32, index), 0);
}

function parseRouteHint(words: number[]): DecodedRouteHint[] {
  const routes: DecodedRouteHint[] = [];
  let buffer = fromWords(words);

  while (buffer.length >= 51) {
    routes.push({
      pubkey: bytesToHex(buffer.slice(0, 33)),
      shortChannelId: bytesToHex(buffer.slice(33, 41)),
      feeBaseMsat: Number.parseInt(bytesToHex(buffer.slice(41, 45)), 16),
      feeProportionalMillionths: Number.parseInt(
        bytesToHex(buffer.slice(45, 49)),
        16
      ),
      cltvExpiryDelta: Number.parseInt(bytesToHex(buffer.slice(49, 51)), 16),
    });

    buffer = buffer.slice(51);
  }

  return routes;
}

function parseFeatureBits(words: number[]): DecodedFeatureBits {
  const bools = words
    .slice()
    .reverse()
    .map((word) => [
      !!(word & 0b1),
      !!(word & 0b10),
      !!(word & 0b100),
      !!(word & 0b1000),
      !!(word & 0b10000),
    ])
    .flat();

  const features: DecodedFeatureBits = {};

  FEATUREBIT_ORDER.forEach((_, index) => {
    const requiredBit = index * 2;
    const supportedBit = requiredBit + 1;

    if (bools[requiredBit]) {
      features[requiredBit] = "required";
    } else if (bools[supportedBit]) {
      features[supportedBit] = "supported";
    }
  });

  for (let bit = FEATUREBIT_ORDER.length * 2; bit < bools.length; bit += 1) {
    if (bools[bit]) {
      features[bit] = bit % 2 === 0 ? "required" : "supported";
    }
  }

  return features;
}

function hrpToMillisat(hrpString: string): string {
  let divisor: keyof typeof DIVISORS | undefined;
  let value = hrpString;

  if (/^[munp]$/.test(hrpString.slice(-1))) {
    divisor = hrpString.slice(-1) as keyof typeof DIVISORS;
    value = hrpString.slice(0, -1);
  } else if (/^[^munp0-9]$/.test(hrpString.slice(-1))) {
    throw new Error("Not a valid multiplier for the amount");
  }

  if (!/^\d+$/.test(value)) {
    throw new Error("Not a valid human readable amount");
  }

  const valueBigInt = BigInt(value);
  const millisatoshis = divisor
    ? (valueBigInt * MILLISATS_PER_BTC) / DIVISORS[divisor]
    : valueBigInt * MILLISATS_PER_BTC;

  if (
    (divisor === "p" && valueBigInt % 10n !== 0n) ||
    millisatoshis > MAX_MILLISATS
  ) {
    throw new Error("Amount is outside of valid range");
  }

  return millisatoshis.toString();
}

export function decodeBolt11(paymentRequest: string): DecodedBolt11 {
  if (typeof paymentRequest !== "string") {
    throw new Error("Lightning Payment Request must be string");
  }

  if (paymentRequest.slice(0, 2).toLowerCase() !== "ln") {
    throw new Error("Not a proper lightning payment request");
  }

  const decoded = decodeBech32(paymentRequest);
  let words = decoded.words.slice();

  if (words.length < 111) {
    throw new Error("Invalid lightning payment request");
  }

  words = words.slice(0, -104);

  let prefixMatches = decoded.prefix.match(/^ln(\S+?)(\d*)([a-zA-Z]?)$/);
  if (prefixMatches && !prefixMatches[2]) {
    prefixMatches = decoded.prefix.match(/^ln(\S+)$/);
  }
  if (!prefixMatches) {
    throw new Error("Not a proper lightning payment request");
  }

  const bech32Prefix = prefixMatches[1] ?? "";
  if (!["bc", "tb", "tbs", "bcrt", "sb"].includes(bech32Prefix)) {
    throw new Error("Unknown coin bech32 prefix");
  }

  const amountSuffix = prefixMatches.length > 3 ? (prefixMatches[3] ?? "") : "";
  const millisatoshis = prefixMatches[2]
    ? hrpToMillisat(`${prefixMatches[2]}${amountSuffix}`)
    : undefined;

  const timestamp = wordsToIntBE(words.slice(0, 7));
  words = words.slice(7);

  const result: DecodedBolt11 = {
    timestamp,
    millisatoshis,
    routeHints: [],
    featureBits: {},
  };

  while (words.length > 0) {
    const tagCode = String(words[0]);
    words = words.slice(1);

    const tagLength = wordsToIntBE(words.slice(0, 2));
    words = words.slice(2);

    const tagWords = words.slice(0, tagLength);
    words = words.slice(tagLength);

    switch (TAG_NAMES[tagCode]) {
      case "payment_hash":
        result.paymentHash = bytesToHex(fromWords(tagWords));
        break;
      case "payment_secret":
        result.paymentSecret = bytesToHex(fromWords(tagWords));
        break;
      case "description":
        result.description = UTF8_DECODER.decode(fromWords(tagWords));
        break;
      case "payee":
        result.payee = bytesToHex(fromWords(tagWords));
        break;
      case "description_hash":
        result.descriptionHash = bytesToHex(fromWords(tagWords));
        break;
      case "expiry":
        result.expiry = wordsToIntBE(tagWords);
        break;
      case "min_final_cltv_expiry":
        result.minFinalCltvExpiry = wordsToIntBE(tagWords);
        break;
      case "route_hint":
        result.routeHints.push(parseRouteHint(tagWords));
        break;
      case "feature_bits":
        result.featureBits = parseFeatureBits(tagWords);
        break;
      default:
        break;
    }
  }

  return result;
}
