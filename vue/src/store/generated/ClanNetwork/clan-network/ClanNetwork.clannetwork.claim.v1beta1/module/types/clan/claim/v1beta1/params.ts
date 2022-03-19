/* eslint-disable */
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Duration } from "../../../google/protobuf/duration";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";

/** Params defines the claim module's parameters. */
export interface Params {
  airdrop_enabled: boolean;
  airdrop_start_time: Date | undefined;
  duration_until_decay: Duration | undefined;
  duration_of_decay: Duration | undefined;
  /** denom of claimable asset */
  claim_denom: string;
}

const baseParams: object = { airdrop_enabled: false, claim_denom: "" };

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.airdrop_enabled === true) {
      writer.uint32(8).bool(message.airdrop_enabled);
    }
    if (message.airdrop_start_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.airdrop_start_time),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.duration_until_decay !== undefined) {
      Duration.encode(
        message.duration_until_decay,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.duration_of_decay !== undefined) {
      Duration.encode(
        message.duration_of_decay,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.claim_denom !== "") {
      writer.uint32(42).string(message.claim_denom);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.airdrop_enabled = reader.bool();
          break;
        case 2:
          message.airdrop_start_time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.duration_until_decay = Duration.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.duration_of_decay = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.claim_denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    if (
      object.airdrop_enabled !== undefined &&
      object.airdrop_enabled !== null
    ) {
      message.airdrop_enabled = Boolean(object.airdrop_enabled);
    } else {
      message.airdrop_enabled = false;
    }
    if (
      object.airdrop_start_time !== undefined &&
      object.airdrop_start_time !== null
    ) {
      message.airdrop_start_time = fromJsonTimestamp(object.airdrop_start_time);
    } else {
      message.airdrop_start_time = undefined;
    }
    if (
      object.duration_until_decay !== undefined &&
      object.duration_until_decay !== null
    ) {
      message.duration_until_decay = Duration.fromJSON(
        object.duration_until_decay
      );
    } else {
      message.duration_until_decay = undefined;
    }
    if (
      object.duration_of_decay !== undefined &&
      object.duration_of_decay !== null
    ) {
      message.duration_of_decay = Duration.fromJSON(object.duration_of_decay);
    } else {
      message.duration_of_decay = undefined;
    }
    if (object.claim_denom !== undefined && object.claim_denom !== null) {
      message.claim_denom = String(object.claim_denom);
    } else {
      message.claim_denom = "";
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.airdrop_enabled !== undefined &&
      (obj.airdrop_enabled = message.airdrop_enabled);
    message.airdrop_start_time !== undefined &&
      (obj.airdrop_start_time =
        message.airdrop_start_time !== undefined
          ? message.airdrop_start_time.toISOString()
          : null);
    message.duration_until_decay !== undefined &&
      (obj.duration_until_decay = message.duration_until_decay
        ? Duration.toJSON(message.duration_until_decay)
        : undefined);
    message.duration_of_decay !== undefined &&
      (obj.duration_of_decay = message.duration_of_decay
        ? Duration.toJSON(message.duration_of_decay)
        : undefined);
    message.claim_denom !== undefined &&
      (obj.claim_denom = message.claim_denom);
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (
      object.airdrop_enabled !== undefined &&
      object.airdrop_enabled !== null
    ) {
      message.airdrop_enabled = object.airdrop_enabled;
    } else {
      message.airdrop_enabled = false;
    }
    if (
      object.airdrop_start_time !== undefined &&
      object.airdrop_start_time !== null
    ) {
      message.airdrop_start_time = object.airdrop_start_time;
    } else {
      message.airdrop_start_time = undefined;
    }
    if (
      object.duration_until_decay !== undefined &&
      object.duration_until_decay !== null
    ) {
      message.duration_until_decay = Duration.fromPartial(
        object.duration_until_decay
      );
    } else {
      message.duration_until_decay = undefined;
    }
    if (
      object.duration_of_decay !== undefined &&
      object.duration_of_decay !== null
    ) {
      message.duration_of_decay = Duration.fromPartial(
        object.duration_of_decay
      );
    } else {
      message.duration_of_decay = undefined;
    }
    if (object.claim_denom !== undefined && object.claim_denom !== null) {
      message.claim_denom = object.claim_denom;
    } else {
      message.claim_denom = "";
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}
