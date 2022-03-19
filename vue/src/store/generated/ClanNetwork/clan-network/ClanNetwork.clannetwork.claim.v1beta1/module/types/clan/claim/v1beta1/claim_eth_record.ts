/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";

export interface ClaimEthRecord {
  /** address of claim user */
  address: string;
  /** total initial claimable amount for the user */
  initial_claimable_amount: Coin[];
  /** true if action is completed */
  completed: boolean;
}

const baseClaimEthRecord: object = { address: "", completed: false };

export const ClaimEthRecord = {
  encode(message: ClaimEthRecord, writer: Writer = Writer.create()): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.initial_claimable_amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.completed === true) {
      writer.uint32(24).bool(message.completed);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ClaimEthRecord {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClaimEthRecord } as ClaimEthRecord;
    message.initial_claimable_amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.initial_claimable_amount.push(
            Coin.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.completed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClaimEthRecord {
    const message = { ...baseClaimEthRecord } as ClaimEthRecord;
    message.initial_claimable_amount = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (
      object.initial_claimable_amount !== undefined &&
      object.initial_claimable_amount !== null
    ) {
      for (const e of object.initial_claimable_amount) {
        message.initial_claimable_amount.push(Coin.fromJSON(e));
      }
    }
    if (object.completed !== undefined && object.completed !== null) {
      message.completed = Boolean(object.completed);
    } else {
      message.completed = false;
    }
    return message;
  },

  toJSON(message: ClaimEthRecord): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.initial_claimable_amount) {
      obj.initial_claimable_amount = message.initial_claimable_amount.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.initial_claimable_amount = [];
    }
    message.completed !== undefined && (obj.completed = message.completed);
    return obj;
  },

  fromPartial(object: DeepPartial<ClaimEthRecord>): ClaimEthRecord {
    const message = { ...baseClaimEthRecord } as ClaimEthRecord;
    message.initial_claimable_amount = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (
      object.initial_claimable_amount !== undefined &&
      object.initial_claimable_amount !== null
    ) {
      for (const e of object.initial_claimable_amount) {
        message.initial_claimable_amount.push(Coin.fromPartial(e));
      }
    }
    if (object.completed !== undefined && object.completed !== null) {
      message.completed = object.completed;
    } else {
      message.completed = false;
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
