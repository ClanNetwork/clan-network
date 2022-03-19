/* eslint-disable */
import {
  Action,
  ClaimRecord,
  actionFromJSON,
  actionToJSON,
} from "../../../clan/claim/v1beta1/claim_record";
import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "../../../clan/claim/v1beta1/params";
import { ClaimEthRecord } from "../../../clan/claim/v1beta1/claim_eth_record";

export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryModuleAccountBalanceRequest {}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryModuleAccountBalanceResponse {
  /** params defines the parameters of the module. */
  moduleAccountBalance: Coin[];
}

/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}

export interface QueryClaimRecordRequest {
  address: string;
}

export interface QueryClaimRecordResponse {
  claimRecord: ClaimRecord | undefined;
}

export interface QueryClaimableForActionRequest {
  address: string;
  action: Action;
}

export interface QueryClaimableForActionResponse {
  coins: Coin[];
}

export interface QueryTotalClaimableRequest {
  address: string;
}

export interface QueryTotalClaimableResponse {
  coins: Coin[];
}

export interface QueryClaimEthRecordRequest {
  address: string;
}

export interface QueryClaimEthRecordResponse {
  ClaimEthRecord: ClaimEthRecord | undefined;
}

const baseQueryModuleAccountBalanceRequest: object = {};

export const QueryModuleAccountBalanceRequest = {
  encode(
    _: QueryModuleAccountBalanceRequest,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryModuleAccountBalanceRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryModuleAccountBalanceRequest,
    } as QueryModuleAccountBalanceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryModuleAccountBalanceRequest {
    const message = {
      ...baseQueryModuleAccountBalanceRequest,
    } as QueryModuleAccountBalanceRequest;
    return message;
  },

  toJSON(_: QueryModuleAccountBalanceRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryModuleAccountBalanceRequest>
  ): QueryModuleAccountBalanceRequest {
    const message = {
      ...baseQueryModuleAccountBalanceRequest,
    } as QueryModuleAccountBalanceRequest;
    return message;
  },
};

const baseQueryModuleAccountBalanceResponse: object = {};

export const QueryModuleAccountBalanceResponse = {
  encode(
    message: QueryModuleAccountBalanceResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.moduleAccountBalance) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryModuleAccountBalanceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryModuleAccountBalanceResponse,
    } as QueryModuleAccountBalanceResponse;
    message.moduleAccountBalance = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moduleAccountBalance.push(
            Coin.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryModuleAccountBalanceResponse {
    const message = {
      ...baseQueryModuleAccountBalanceResponse,
    } as QueryModuleAccountBalanceResponse;
    message.moduleAccountBalance = [];
    if (
      object.moduleAccountBalance !== undefined &&
      object.moduleAccountBalance !== null
    ) {
      for (const e of object.moduleAccountBalance) {
        message.moduleAccountBalance.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryModuleAccountBalanceResponse): unknown {
    const obj: any = {};
    if (message.moduleAccountBalance) {
      obj.moduleAccountBalance = message.moduleAccountBalance.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.moduleAccountBalance = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryModuleAccountBalanceResponse>
  ): QueryModuleAccountBalanceResponse {
    const message = {
      ...baseQueryModuleAccountBalanceResponse,
    } as QueryModuleAccountBalanceResponse;
    message.moduleAccountBalance = [];
    if (
      object.moduleAccountBalance !== undefined &&
      object.moduleAccountBalance !== null
    ) {
      for (const e of object.moduleAccountBalance) {
        message.moduleAccountBalance.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryClaimRecordRequest: object = { address: "" };

export const QueryClaimRecordRequest = {
  encode(
    message: QueryClaimRecordRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryClaimRecordRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryClaimRecordRequest,
    } as QueryClaimRecordRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClaimRecordRequest {
    const message = {
      ...baseQueryClaimRecordRequest,
    } as QueryClaimRecordRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryClaimRecordRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryClaimRecordRequest>
  ): QueryClaimRecordRequest {
    const message = {
      ...baseQueryClaimRecordRequest,
    } as QueryClaimRecordRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryClaimRecordResponse: object = {};

export const QueryClaimRecordResponse = {
  encode(
    message: QueryClaimRecordResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.claimRecord !== undefined) {
      ClaimRecord.encode(
        message.claimRecord,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryClaimRecordResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryClaimRecordResponse,
    } as QueryClaimRecordResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.claimRecord = ClaimRecord.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClaimRecordResponse {
    const message = {
      ...baseQueryClaimRecordResponse,
    } as QueryClaimRecordResponse;
    if (object.claimRecord !== undefined && object.claimRecord !== null) {
      message.claimRecord = ClaimRecord.fromJSON(object.claimRecord);
    } else {
      message.claimRecord = undefined;
    }
    return message;
  },

  toJSON(message: QueryClaimRecordResponse): unknown {
    const obj: any = {};
    message.claimRecord !== undefined &&
      (obj.claimRecord = message.claimRecord
        ? ClaimRecord.toJSON(message.claimRecord)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryClaimRecordResponse>
  ): QueryClaimRecordResponse {
    const message = {
      ...baseQueryClaimRecordResponse,
    } as QueryClaimRecordResponse;
    if (object.claimRecord !== undefined && object.claimRecord !== null) {
      message.claimRecord = ClaimRecord.fromPartial(object.claimRecord);
    } else {
      message.claimRecord = undefined;
    }
    return message;
  },
};

const baseQueryClaimableForActionRequest: object = { address: "", action: 0 };

export const QueryClaimableForActionRequest = {
  encode(
    message: QueryClaimableForActionRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.action !== 0) {
      writer.uint32(16).int32(message.action);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryClaimableForActionRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryClaimableForActionRequest,
    } as QueryClaimableForActionRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.action = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClaimableForActionRequest {
    const message = {
      ...baseQueryClaimableForActionRequest,
    } as QueryClaimableForActionRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = actionFromJSON(object.action);
    } else {
      message.action = 0;
    }
    return message;
  },

  toJSON(message: QueryClaimableForActionRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.action !== undefined && (obj.action = actionToJSON(message.action));
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryClaimableForActionRequest>
  ): QueryClaimableForActionRequest {
    const message = {
      ...baseQueryClaimableForActionRequest,
    } as QueryClaimableForActionRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.action !== undefined && object.action !== null) {
      message.action = object.action;
    } else {
      message.action = 0;
    }
    return message;
  },
};

const baseQueryClaimableForActionResponse: object = {};

export const QueryClaimableForActionResponse = {
  encode(
    message: QueryClaimableForActionResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryClaimableForActionResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryClaimableForActionResponse,
    } as QueryClaimableForActionResponse;
    message.coins = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClaimableForActionResponse {
    const message = {
      ...baseQueryClaimableForActionResponse,
    } as QueryClaimableForActionResponse;
    message.coins = [];
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryClaimableForActionResponse): unknown {
    const obj: any = {};
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.coins = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryClaimableForActionResponse>
  ): QueryClaimableForActionResponse {
    const message = {
      ...baseQueryClaimableForActionResponse,
    } as QueryClaimableForActionResponse;
    message.coins = [];
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryTotalClaimableRequest: object = { address: "" };

export const QueryTotalClaimableRequest = {
  encode(
    message: QueryTotalClaimableRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryTotalClaimableRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryTotalClaimableRequest,
    } as QueryTotalClaimableRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalClaimableRequest {
    const message = {
      ...baseQueryTotalClaimableRequest,
    } as QueryTotalClaimableRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryTotalClaimableRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTotalClaimableRequest>
  ): QueryTotalClaimableRequest {
    const message = {
      ...baseQueryTotalClaimableRequest,
    } as QueryTotalClaimableRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryTotalClaimableResponse: object = {};

export const QueryTotalClaimableResponse = {
  encode(
    message: QueryTotalClaimableResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryTotalClaimableResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryTotalClaimableResponse,
    } as QueryTotalClaimableResponse;
    message.coins = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalClaimableResponse {
    const message = {
      ...baseQueryTotalClaimableResponse,
    } as QueryTotalClaimableResponse;
    message.coins = [];
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryTotalClaimableResponse): unknown {
    const obj: any = {};
    if (message.coins) {
      obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.coins = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTotalClaimableResponse>
  ): QueryTotalClaimableResponse {
    const message = {
      ...baseQueryTotalClaimableResponse,
    } as QueryTotalClaimableResponse;
    message.coins = [];
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryClaimEthRecordRequest: object = { address: "" };

export const QueryClaimEthRecordRequest = {
  encode(
    message: QueryClaimEthRecordRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryClaimEthRecordRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryClaimEthRecordRequest,
    } as QueryClaimEthRecordRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClaimEthRecordRequest {
    const message = {
      ...baseQueryClaimEthRecordRequest,
    } as QueryClaimEthRecordRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: QueryClaimEthRecordRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryClaimEthRecordRequest>
  ): QueryClaimEthRecordRequest {
    const message = {
      ...baseQueryClaimEthRecordRequest,
    } as QueryClaimEthRecordRequest;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

const baseQueryClaimEthRecordResponse: object = {};

export const QueryClaimEthRecordResponse = {
  encode(
    message: QueryClaimEthRecordResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.ClaimEthRecord !== undefined) {
      ClaimEthRecord.encode(
        message.ClaimEthRecord,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryClaimEthRecordResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryClaimEthRecordResponse,
    } as QueryClaimEthRecordResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ClaimEthRecord = ClaimEthRecord.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryClaimEthRecordResponse {
    const message = {
      ...baseQueryClaimEthRecordResponse,
    } as QueryClaimEthRecordResponse;
    if (object.ClaimEthRecord !== undefined && object.ClaimEthRecord !== null) {
      message.ClaimEthRecord = ClaimEthRecord.fromJSON(object.ClaimEthRecord);
    } else {
      message.ClaimEthRecord = undefined;
    }
    return message;
  },

  toJSON(message: QueryClaimEthRecordResponse): unknown {
    const obj: any = {};
    message.ClaimEthRecord !== undefined &&
      (obj.ClaimEthRecord = message.ClaimEthRecord
        ? ClaimEthRecord.toJSON(message.ClaimEthRecord)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryClaimEthRecordResponse>
  ): QueryClaimEthRecordResponse {
    const message = {
      ...baseQueryClaimEthRecordResponse,
    } as QueryClaimEthRecordResponse;
    if (object.ClaimEthRecord !== undefined && object.ClaimEthRecord !== null) {
      message.ClaimEthRecord = ClaimEthRecord.fromPartial(
        object.ClaimEthRecord
      );
    } else {
      message.ClaimEthRecord = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  ModuleAccountBalance(
    request: QueryModuleAccountBalanceRequest
  ): Promise<QueryModuleAccountBalanceResponse>;
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  ClaimRecord(
    request: QueryClaimRecordRequest
  ): Promise<QueryClaimRecordResponse>;
  ClaimableForAction(
    request: QueryClaimableForActionRequest
  ): Promise<QueryClaimableForActionResponse>;
  TotalClaimable(
    request: QueryTotalClaimableRequest
  ): Promise<QueryTotalClaimableResponse>;
  /** Queries a ClaimEthRecord by index. */
  ClaimEthRecord(
    request: QueryClaimEthRecordRequest
  ): Promise<QueryClaimEthRecordResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  ModuleAccountBalance(
    request: QueryModuleAccountBalanceRequest
  ): Promise<QueryModuleAccountBalanceResponse> {
    const data = QueryModuleAccountBalanceRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ClanNetwork.clannetwork.claim.v1beta1.Query",
      "ModuleAccountBalance",
      data
    );
    return promise.then((data) =>
      QueryModuleAccountBalanceResponse.decode(new Reader(data))
    );
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ClanNetwork.clannetwork.claim.v1beta1.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  ClaimRecord(
    request: QueryClaimRecordRequest
  ): Promise<QueryClaimRecordResponse> {
    const data = QueryClaimRecordRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ClanNetwork.clannetwork.claim.v1beta1.Query",
      "ClaimRecord",
      data
    );
    return promise.then((data) =>
      QueryClaimRecordResponse.decode(new Reader(data))
    );
  }

  ClaimableForAction(
    request: QueryClaimableForActionRequest
  ): Promise<QueryClaimableForActionResponse> {
    const data = QueryClaimableForActionRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ClanNetwork.clannetwork.claim.v1beta1.Query",
      "ClaimableForAction",
      data
    );
    return promise.then((data) =>
      QueryClaimableForActionResponse.decode(new Reader(data))
    );
  }

  TotalClaimable(
    request: QueryTotalClaimableRequest
  ): Promise<QueryTotalClaimableResponse> {
    const data = QueryTotalClaimableRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ClanNetwork.clannetwork.claim.v1beta1.Query",
      "TotalClaimable",
      data
    );
    return promise.then((data) =>
      QueryTotalClaimableResponse.decode(new Reader(data))
    );
  }

  ClaimEthRecord(
    request: QueryClaimEthRecordRequest
  ): Promise<QueryClaimEthRecordResponse> {
    const data = QueryClaimEthRecordRequest.encode(request).finish();
    const promise = this.rpc.request(
      "ClanNetwork.clannetwork.claim.v1beta1.Query",
      "ClaimEthRecord",
      data
    );
    return promise.then((data) =>
      QueryClaimEthRecordResponse.decode(new Reader(data))
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
