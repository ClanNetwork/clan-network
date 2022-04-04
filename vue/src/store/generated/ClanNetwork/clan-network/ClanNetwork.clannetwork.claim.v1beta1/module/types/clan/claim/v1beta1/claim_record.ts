/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";

export interface ClaimRecord {
  /** address of claim user */
  claim_address: string;
  clan_address: string;
  /** total initial claimable amount for the user */
  initial_claimable_amount: Coin[];
  /**
   * true if action is claimed
   * index of bool in array refers to action enum #
   */
  action_claimed: boolean[];
}

const baseClaimRecord: object = {
  claim_address: "",
  clan_address: "",
  action_claimed: false,
};

export const ClaimRecord = {
  encode(message: ClaimRecord, writer: Writer = Writer.create()): Writer {
    if (message.claim_address !== "") {
      writer.uint32(10).string(message.claim_address);
    }
    if (message.clan_address !== "") {
      writer.uint32(18).string(message.clan_address);
    }
    for (const v of message.initial_claimable_amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).fork();
    for (const v of message.action_claimed) {
      writer.bool(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ClaimRecord {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClaimRecord } as ClaimRecord;
    message.initial_claimable_amount = [];
    message.action_claimed = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claim_address = reader.string();
          break;
        case 2:
          message.clan_address = reader.string();
          break;
        case 3:
          message.initial_claimable_amount.push(
            Coin.decode(reader, reader.uint32())
          );
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.action_claimed.push(reader.bool());
            }
          } else {
            message.action_claimed.push(reader.bool());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClaimRecord {
    const message = { ...baseClaimRecord } as ClaimRecord;
    message.initial_claimable_amount = [];
    message.action_claimed = [];
    if (object.claim_address !== undefined && object.claim_address !== null) {
      message.claim_address = String(object.claim_address);
    } else {
      message.claim_address = "";
    }
    if (object.clan_address !== undefined && object.clan_address !== null) {
      message.clan_address = String(object.clan_address);
    } else {
      message.clan_address = "";
    }
    if (
      object.initial_claimable_amount !== undefined &&
      object.initial_claimable_amount !== null
    ) {
      for (const e of object.initial_claimable_amount) {
        message.initial_claimable_amount.push(Coin.fromJSON(e));
      }
    }
    if (object.action_claimed !== undefined && object.action_claimed !== null) {
      for (const e of object.action_claimed) {
        message.action_claimed.push(Boolean(e));
      }
    }
    return message;
  },

  toJSON(message: ClaimRecord): unknown {
    const obj: any = {};
    message.claim_address !== undefined &&
      (obj.claim_address = message.claim_address);
    message.clan_address !== undefined &&
      (obj.clan_address = message.clan_address);
    if (message.initial_claimable_amount) {
      obj.initial_claimable_amount = message.initial_claimable_amount.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.initial_claimable_amount = [];
    }
    if (message.action_claimed) {
      obj.action_claimed = message.action_claimed.map((e) => e);
    } else {
      obj.action_claimed = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ClaimRecord>): ClaimRecord {
    const message = { ...baseClaimRecord } as ClaimRecord;
    message.initial_claimable_amount = [];
    message.action_claimed = [];
    if (object.claim_address !== undefined && object.claim_address !== null) {
      message.claim_address = object.claim_address;
    } else {
      message.claim_address = "";
    }
    if (object.clan_address !== undefined && object.clan_address !== null) {
      message.clan_address = object.clan_address;
    } else {
      message.clan_address = "";
    }
    if (
      object.initial_claimable_amount !== undefined &&
      object.initial_claimable_amount !== null
    ) {
      for (const e of object.initial_claimable_amount) {
        message.initial_claimable_amount.push(Coin.fromPartial(e));
      }
    }
    if (object.action_claimed !== undefined && object.action_claimed !== null) {
      for (const e of object.action_claimed) {
        message.action_claimed.push(e);
      }
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
