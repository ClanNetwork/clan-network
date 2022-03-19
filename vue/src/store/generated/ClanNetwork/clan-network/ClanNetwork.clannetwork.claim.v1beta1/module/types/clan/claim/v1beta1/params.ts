/* eslint-disable */
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Duration } from "../../../google/protobuf/duration";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";

/** Params defines the claim module's parameters. */
export interface Params {
  airdropEnabled: boolean;
  airdropStartTime: Date | undefined;
  durationUntilDecay: Duration | undefined;
  durationOfDecay: Duration | undefined;
  /** denom of claimable asset */
  claimDenom: string;
}

const baseParams: object = { airdropEnabled: false, claimDenom: "" };

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.airdropEnabled === true) {
      writer.uint32(8).bool(message.airdropEnabled);
    }
    if (message.airdropStartTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.airdropStartTime),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.durationUntilDecay !== undefined) {
      Duration.encode(
        message.durationUntilDecay,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.durationOfDecay !== undefined) {
      Duration.encode(
        message.durationOfDecay,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.claimDenom !== "") {
      writer.uint32(42).string(message.claimDenom);
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
          message.airdropEnabled = reader.bool();
          break;
        case 2:
          message.airdropStartTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.durationUntilDecay = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.durationOfDecay = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.claimDenom = reader.string();
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
    if (object.airdropEnabled !== undefined && object.airdropEnabled !== null) {
      message.airdropEnabled = Boolean(object.airdropEnabled);
    } else {
      message.airdropEnabled = false;
    }
    if (
      object.airdropStartTime !== undefined &&
      object.airdropStartTime !== null
    ) {
      message.airdropStartTime = fromJsonTimestamp(object.airdropStartTime);
    } else {
      message.airdropStartTime = undefined;
    }
    if (
      object.durationUntilDecay !== undefined &&
      object.durationUntilDecay !== null
    ) {
      message.durationUntilDecay = Duration.fromJSON(object.durationUntilDecay);
    } else {
      message.durationUntilDecay = undefined;
    }
    if (
      object.durationOfDecay !== undefined &&
      object.durationOfDecay !== null
    ) {
      message.durationOfDecay = Duration.fromJSON(object.durationOfDecay);
    } else {
      message.durationOfDecay = undefined;
    }
    if (object.claimDenom !== undefined && object.claimDenom !== null) {
      message.claimDenom = String(object.claimDenom);
    } else {
      message.claimDenom = "";
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.airdropEnabled !== undefined &&
      (obj.airdropEnabled = message.airdropEnabled);
    message.airdropStartTime !== undefined &&
      (obj.airdropStartTime =
        message.airdropStartTime !== undefined
          ? message.airdropStartTime.toISOString()
          : null);
    message.durationUntilDecay !== undefined &&
      (obj.durationUntilDecay = message.durationUntilDecay
        ? Duration.toJSON(message.durationUntilDecay)
        : undefined);
    message.durationOfDecay !== undefined &&
      (obj.durationOfDecay = message.durationOfDecay
        ? Duration.toJSON(message.durationOfDecay)
        : undefined);
    message.claimDenom !== undefined && (obj.claimDenom = message.claimDenom);
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (object.airdropEnabled !== undefined && object.airdropEnabled !== null) {
      message.airdropEnabled = object.airdropEnabled;
    } else {
      message.airdropEnabled = false;
    }
    if (
      object.airdropStartTime !== undefined &&
      object.airdropStartTime !== null
    ) {
      message.airdropStartTime = object.airdropStartTime;
    } else {
      message.airdropStartTime = undefined;
    }
    if (
      object.durationUntilDecay !== undefined &&
      object.durationUntilDecay !== null
    ) {
      message.durationUntilDecay = Duration.fromPartial(
        object.durationUntilDecay
      );
    } else {
      message.durationUntilDecay = undefined;
    }
    if (
      object.durationOfDecay !== undefined &&
      object.durationOfDecay !== null
    ) {
      message.durationOfDecay = Duration.fromPartial(object.durationOfDecay);
    } else {
      message.durationOfDecay = undefined;
    }
    if (object.claimDenom !== undefined && object.claimDenom !== null) {
      message.claimDenom = object.claimDenom;
    } else {
      message.claimDenom = "";
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
