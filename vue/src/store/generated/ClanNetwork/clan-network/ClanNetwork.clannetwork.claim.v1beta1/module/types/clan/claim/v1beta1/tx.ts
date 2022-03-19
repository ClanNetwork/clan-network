/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";

export interface MsgInitialClaim {
  creator: string;
}

export interface MsgInitialClaimResponse {
  claimed_amount: Coin[];
}

export interface MsgClaimFroEthAddress {
  creator: string;
  message: string;
  signature: string;
}

export interface MsgClaimFroEthAddressResponse {
  claimed_amount: Coin[];
}

const baseMsgInitialClaim: object = { creator: "" };

export const MsgInitialClaim = {
  encode(message: MsgInitialClaim, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
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
    return message;
  },

  toJSON(message: MsgInitialClaim): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgInitialClaim>): MsgInitialClaim {
    const message = { ...baseMsgInitialClaim } as MsgInitialClaim;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
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

const baseMsgClaimFroEthAddress: object = {
  creator: "",
  message: "",
  signature: "",
};

export const MsgClaimFroEthAddress = {
  encode(
    message: MsgClaimFroEthAddress,
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

  decode(input: Reader | Uint8Array, length?: number): MsgClaimFroEthAddress {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgClaimFroEthAddress } as MsgClaimFroEthAddress;
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

  fromJSON(object: any): MsgClaimFroEthAddress {
    const message = { ...baseMsgClaimFroEthAddress } as MsgClaimFroEthAddress;
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

  toJSON(message: MsgClaimFroEthAddress): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.message !== undefined && (obj.message = message.message);
    message.signature !== undefined && (obj.signature = message.signature);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgClaimFroEthAddress>
  ): MsgClaimFroEthAddress {
    const message = { ...baseMsgClaimFroEthAddress } as MsgClaimFroEthAddress;
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

const baseMsgClaimFroEthAddressResponse: object = {};

export const MsgClaimFroEthAddressResponse = {
  encode(
    message: MsgClaimFroEthAddressResponse,
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
  ): MsgClaimFroEthAddressResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgClaimFroEthAddressResponse,
    } as MsgClaimFroEthAddressResponse;
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

  fromJSON(object: any): MsgClaimFroEthAddressResponse {
    const message = {
      ...baseMsgClaimFroEthAddressResponse,
    } as MsgClaimFroEthAddressResponse;
    message.claimed_amount = [];
    if (object.claimed_amount !== undefined && object.claimed_amount !== null) {
      for (const e of object.claimed_amount) {
        message.claimed_amount.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgClaimFroEthAddressResponse): unknown {
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
    object: DeepPartial<MsgClaimFroEthAddressResponse>
  ): MsgClaimFroEthAddressResponse {
    const message = {
      ...baseMsgClaimFroEthAddressResponse,
    } as MsgClaimFroEthAddressResponse;
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
  ClaimFroEthAddress(
    request: MsgClaimFroEthAddress
  ): Promise<MsgClaimFroEthAddressResponse>;
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

  ClaimFroEthAddress(
    request: MsgClaimFroEthAddress
  ): Promise<MsgClaimFroEthAddressResponse> {
    const data = MsgClaimFroEthAddress.encode(request).finish();
    const promise = this.rpc.request(
      "ClanNetwork.clannetwork.claim.v1beta1.Msg",
      "ClaimFroEthAddress",
      data
    );
    return promise.then((data) =>
      MsgClaimFroEthAddressResponse.decode(new Reader(data))
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
