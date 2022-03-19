/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "../../../clan/claim/v1beta1/params";
import { ClaimRecord } from "../../../clan/claim/v1beta1/claim_record";
import { ClaimEthRecord } from "../../../clan/claim/v1beta1/claim_eth_record";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";

/** GenesisState defines the claim module's genesis state. */
export interface GenesisState {
  /** balance of the claim module's account */
  moduleAccountBalance: Coin | undefined;
  /** params defines all the parameters of the module. */
  params: Params | undefined;
  /** list of claim records, one for every airdrop recipient */
  claimRecords: ClaimRecord[];
  /** list of claim records, one for every airdrop recipient */
  claimEthRecords: ClaimEthRecord[];
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.moduleAccountBalance !== undefined) {
      Coin.encode(
        message.moduleAccountBalance,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.claimRecords) {
      ClaimRecord.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.claimEthRecords) {
      ClaimEthRecord.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.claimRecords = [];
    message.claimEthRecords = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moduleAccountBalance = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 3:
          message.claimRecords.push(
            ClaimRecord.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.claimEthRecords.push(
            ClaimEthRecord.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.claimRecords = [];
    message.claimEthRecords = [];
    if (
      object.moduleAccountBalance !== undefined &&
      object.moduleAccountBalance !== null
    ) {
      message.moduleAccountBalance = Coin.fromJSON(object.moduleAccountBalance);
    } else {
      message.moduleAccountBalance = undefined;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.claimRecords !== undefined && object.claimRecords !== null) {
      for (const e of object.claimRecords) {
        message.claimRecords.push(ClaimRecord.fromJSON(e));
      }
    }
    if (
      object.claimEthRecords !== undefined &&
      object.claimEthRecords !== null
    ) {
      for (const e of object.claimEthRecords) {
        message.claimEthRecords.push(ClaimEthRecord.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.moduleAccountBalance !== undefined &&
      (obj.moduleAccountBalance = message.moduleAccountBalance
        ? Coin.toJSON(message.moduleAccountBalance)
        : undefined);
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.claimRecords) {
      obj.claimRecords = message.claimRecords.map((e) =>
        e ? ClaimRecord.toJSON(e) : undefined
      );
    } else {
      obj.claimRecords = [];
    }
    if (message.claimEthRecords) {
      obj.claimEthRecords = message.claimEthRecords.map((e) =>
        e ? ClaimEthRecord.toJSON(e) : undefined
      );
    } else {
      obj.claimEthRecords = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.claimRecords = [];
    message.claimEthRecords = [];
    if (
      object.moduleAccountBalance !== undefined &&
      object.moduleAccountBalance !== null
    ) {
      message.moduleAccountBalance = Coin.fromPartial(
        object.moduleAccountBalance
      );
    } else {
      message.moduleAccountBalance = undefined;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.claimRecords !== undefined && object.claimRecords !== null) {
      for (const e of object.claimRecords) {
        message.claimRecords.push(ClaimRecord.fromPartial(e));
      }
    }
    if (
      object.claimEthRecords !== undefined &&
      object.claimEthRecords !== null
    ) {
      for (const e of object.claimEthRecords) {
        message.claimEthRecords.push(ClaimEthRecord.fromPartial(e));
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
