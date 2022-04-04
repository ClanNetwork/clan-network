/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";

export enum Action {
  ActionInitialClaim = 0,
  ActionVote = 1,
  ActionDelegateStake = 2,
  TBD1 = 3,
  TBD2 = 4,
  UNRECOGNIZED = -1,
}

export function actionFromJSON(object: any): Action {
  switch (object) {
    case 0:
    case "ActionInitialClaim":
      return Action.ActionInitialClaim;
    case 1:
    case "ActionVote":
      return Action.ActionVote;
    case 2:
    case "ActionDelegateStake":
      return Action.ActionDelegateStake;
    case 3:
    case "TBD1":
      return Action.TBD1;
    case 4:
    case "TBD2":
      return Action.TBD2;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Action.UNRECOGNIZED;
  }
}

export function actionToJSON(object: Action): string {
  switch (object) {
    case Action.ActionInitialClaim:
      return "ActionInitialClaim";
    case Action.ActionVote:
      return "ActionVote";
    case Action.ActionDelegateStake:
      return "ActionDelegateStake";
    case Action.TBD1:
      return "TBD1";
    case Action.TBD2:
      return "TBD2";
    default:
      return "UNKNOWN";
  }
}

export interface ActionRecord {
  /** address of action user */
  address: string;
  claim_addresses: string[];
  /**
   * true if action is completed
   * index of bool in array refers to action enum #
   */
  action_completed: boolean[];
}

const baseActionRecord: object = {
  address: "",
  claim_addresses: "",
  action_completed: false,
};

export const ActionRecord = {
  encode(message: ActionRecord, writer: Writer = Writer.create()): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.claim_addresses) {
      writer.uint32(18).string(v!);
    }
    writer.uint32(26).fork();
    for (const v of message.action_completed) {
      writer.bool(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ActionRecord {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseActionRecord } as ActionRecord;
    message.claim_addresses = [];
    message.action_completed = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.claim_addresses.push(reader.string());
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.action_completed.push(reader.bool());
            }
          } else {
            message.action_completed.push(reader.bool());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActionRecord {
    const message = { ...baseActionRecord } as ActionRecord;
    message.claim_addresses = [];
    message.action_completed = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (
      object.claim_addresses !== undefined &&
      object.claim_addresses !== null
    ) {
      for (const e of object.claim_addresses) {
        message.claim_addresses.push(String(e));
      }
    }
    if (
      object.action_completed !== undefined &&
      object.action_completed !== null
    ) {
      for (const e of object.action_completed) {
        message.action_completed.push(Boolean(e));
      }
    }
    return message;
  },

  toJSON(message: ActionRecord): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.claim_addresses) {
      obj.claim_addresses = message.claim_addresses.map((e) => e);
    } else {
      obj.claim_addresses = [];
    }
    if (message.action_completed) {
      obj.action_completed = message.action_completed.map((e) => e);
    } else {
      obj.action_completed = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<ActionRecord>): ActionRecord {
    const message = { ...baseActionRecord } as ActionRecord;
    message.claim_addresses = [];
    message.action_completed = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (
      object.claim_addresses !== undefined &&
      object.claim_addresses !== null
    ) {
      for (const e of object.claim_addresses) {
        message.claim_addresses.push(e);
      }
    }
    if (
      object.action_completed !== undefined &&
      object.action_completed !== null
    ) {
      for (const e of object.action_completed) {
        message.action_completed.push(e);
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
