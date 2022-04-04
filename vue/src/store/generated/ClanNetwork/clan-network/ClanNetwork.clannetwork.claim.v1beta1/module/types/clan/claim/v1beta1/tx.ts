/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";

export interface MsgInitialClaim {
  creator: string;
  /** the tx containing what is needed to claim - if it is the same as creator there is not need for pubkey / signature */
  signed: string;
  signature: string;
}

export interface MsgInitialClaimResponse {
  claimed_amount: Coin[];
}

export interface MsgClaimAddressSigned {
  value: string;
}

export interface MsgClaimForEthAddress {
  creator: string;
  message: string;
  signature: string;
}

export interface MsgClaimForEthAddressResponse {
  claimed_amount: Coin[];
}

const baseMsgInitialClaim: object = { creator: "", signed: "", signature: "" };

export const MsgInitialClaim = {
  encode(message: MsgInitialClaim, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.signed !== "") {
      writer.uint32(18).string(message.signed);
    }
    if (message.signature !== "") {
      writer.uint32(26).string(message.signature);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgInitialClaim {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgInitialClaim } as MsgInitialClaim;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.signed = reader.string();
          break;
        case 3:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInitialClaim {
    const message = { ...baseMsgInitialClaim } as MsgInitialClaim;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.signed !== undefined && object.signed !== null) {
      message.signed = String(object.signed);
    } else {
      message.signed = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = String(object.signature);
    } else {
      message.signature = "";
    }
    return message;
  },

  toJSON(message: MsgInitialClaim): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.signed !== undefined && (obj.signed = message.signed);
    message.signature !== undefined && (obj.signature = message.signature);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgInitialClaim>): MsgInitialClaim {
    const message = { ...baseMsgInitialClaim } as MsgInitialClaim;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.signed !== undefined && object.signed !== null) {
      message.signed = object.signed;
    } else {
      message.signed = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    } else {
      message.signature = "";
    }
    return message;
  },
};

const baseMsgInitialClaimResponse: object = {};

export const MsgInitialClaimResponse = {
  encode(
    message: MsgInitialClaimResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.claimed_amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgInitialClaimResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgInitialClaimResponse,
    } as MsgInitialClaimResponse;
    message.claimed_amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claimed_amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInitialClaimResponse {
    const message = {
      ...baseMsgInitialClaimResponse,
    } as MsgInitialClaimResponse;
    message.claimed_amount = [];
    if (object.claimed_amount !== undefined && object.claimed_amount !== null) {
      for (const e of object.claimed_amount) {
        message.claimed_amount.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgInitialClaimResponse): unknown {
    const obj: any = {};
    if (message.claimed_amount) {
      obj.claimed_amount = message.claimed_amount.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.claimed_amount = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgInitialClaimResponse>
  ): MsgInitialClaimResponse {
    const message = {
      ...baseMsgInitialClaimResponse,
    } as MsgInitialClaimResponse;
    message.claimed_amount = [];
    if (object.claimed_amount !== undefined && object.claimed_amount !== null) {
      for (const e of object.claimed_amount) {
        message.claimed_amount.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMsgClaimAddressSigned: object = { value: "" };

export const MsgClaimAddressSigned = {
  encode(
    message: MsgClaimAddressSigned,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimAddressSigned {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaimAddressSigned } as MsgClaimAddressSigned;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimAddressSigned {
    const message = { ...baseMsgClaimAddressSigned } as MsgClaimAddressSigned;
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: MsgClaimAddressSigned): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgClaimAddressSigned>
  ): MsgClaimAddressSigned {
    const message = { ...baseMsgClaimAddressSigned } as MsgClaimAddressSigned;
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
};

const baseMsgClaimForEthAddress: object = {
  creator: "",
  message: "",
  signature: "",
};

export const MsgClaimForEthAddress = {
  encode(
    message: MsgClaimForEthAddress,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.signature !== "") {
      writer.uint32(26).string(message.signature);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgClaimForEthAddress {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaimForEthAddress } as MsgClaimForEthAddress;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.signature = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimForEthAddress {
    const message = { ...baseMsgClaimForEthAddress } as MsgClaimForEthAddress;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = String(object.signature);
    } else {
      message.signature = "";
    }
    return message;
  },

  toJSON(message: MsgClaimForEthAddress): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.message !== undefined && (obj.message = message.message);
    message.signature !== undefined && (obj.signature = message.signature);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgClaimForEthAddress>
  ): MsgClaimForEthAddress {
    const message = { ...baseMsgClaimForEthAddress } as MsgClaimForEthAddress;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    } else {
      message.signature = "";
    }
    return message;
  },
};

const baseMsgClaimForEthAddressResponse: object = {};

export const MsgClaimForEthAddressResponse = {
  encode(
    message: MsgClaimForEthAddressResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.claimed_amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgClaimForEthAddressResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgClaimForEthAddressResponse,
    } as MsgClaimForEthAddressResponse;
    message.claimed_amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claimed_amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgClaimForEthAddressResponse {
    const message = {
      ...baseMsgClaimForEthAddressResponse,
    } as MsgClaimForEthAddressResponse;
    message.claimed_amount = [];
    if (object.claimed_amount !== undefined && object.claimed_amount !== null) {
      for (const e of object.claimed_amount) {
        message.claimed_amount.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgClaimForEthAddressResponse): unknown {
    const obj: any = {};
    if (message.claimed_amount) {
      obj.claimed_amount = message.claimed_amount.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.claimed_amount = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgClaimForEthAddressResponse>
  ): MsgClaimForEthAddressResponse {
    const message = {
      ...baseMsgClaimForEthAddressResponse,
    } as MsgClaimForEthAddressResponse;
    message.claimed_amount = [];
    if (object.claimed_amount !== undefined && object.claimed_amount !== null) {
      for (const e of object.claimed_amount) {
        message.claimed_amount.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  InitialClaim(request: MsgInitialClaim): Promise<MsgInitialClaimResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  ClaimForEthAddress(
    request: MsgClaimForEthAddress
  ): Promise<MsgClaimForEthAddressResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  InitialClaim(request: MsgInitialClaim): Promise<MsgInitialClaimResponse> {
    const data = MsgInitialClaim.encode(request).finish();
    const promise = this.rpc.request(
      "ClanNetwork.clannetwork.claim.v1beta1.Msg",
      "InitialClaim",
      data
    );
    return promise.then((data) =>
      MsgInitialClaimResponse.decode(new Reader(data))
    );
  }

  ClaimForEthAddress(
    request: MsgClaimForEthAddress
  ): Promise<MsgClaimForEthAddressResponse> {
    const data = MsgClaimForEthAddress.encode(request).finish();
    const promise = this.rpc.request(
      "ClanNetwork.clannetwork.claim.v1beta1.Msg",
      "ClaimForEthAddress",
      data
    );
    return promise.then((data) =>
      MsgClaimForEthAddressResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
