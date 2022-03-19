/* eslint-disable */
import { ClaimRecord, actionFromJSON, actionToJSON, } from "../../../clan/claim/v1beta1/claim_record";
import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "../../../clan/claim/v1beta1/params";
import { ClaimEthRecord } from "../../../clan/claim/v1beta1/claim_eth_record";
export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";
const baseQueryModuleAccountBalanceRequest = {};
export const QueryModuleAccountBalanceRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryModuleAccountBalanceRequest,
        };
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
    fromJSON(_) {
        const message = {
            ...baseQueryModuleAccountBalanceRequest,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseQueryModuleAccountBalanceRequest,
        };
        return message;
    },
};
const baseQueryModuleAccountBalanceResponse = {};
export const QueryModuleAccountBalanceResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.moduleAccountBalance) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryModuleAccountBalanceResponse,
        };
        message.moduleAccountBalance = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.moduleAccountBalance.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryModuleAccountBalanceResponse,
        };
        message.moduleAccountBalance = [];
        if (object.moduleAccountBalance !== undefined &&
            object.moduleAccountBalance !== null) {
            for (const e of object.moduleAccountBalance) {
                message.moduleAccountBalance.push(Coin.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.moduleAccountBalance) {
            obj.moduleAccountBalance = message.moduleAccountBalance.map((e) => e ? Coin.toJSON(e) : undefined);
        }
        else {
            obj.moduleAccountBalance = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryModuleAccountBalanceResponse,
        };
        message.moduleAccountBalance = [];
        if (object.moduleAccountBalance !== undefined &&
            object.moduleAccountBalance !== null) {
            for (const e of object.moduleAccountBalance) {
                message.moduleAccountBalance.push(Coin.fromPartial(e));
            }
        }
        return message;
    },
};
const baseQueryParamsRequest = {};
export const QueryParamsRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsRequest };
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
    fromJSON(_) {
        const message = { ...baseQueryParamsRequest };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryParamsRequest };
        return message;
    },
};
const baseQueryParamsResponse = {};
export const QueryParamsResponse = {
    encode(message, writer = Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsResponse };
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
    fromJSON(object) {
        const message = { ...baseQueryParamsResponse };
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromJSON(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryParamsResponse };
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromPartial(object.params);
        }
        else {
            message.params = undefined;
        }
        return message;
    },
};
const baseQueryClaimRecordRequest = { address: "" };
export const QueryClaimRecordRequest = {
    encode(message, writer = Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClaimRecordRequest,
        };
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
    fromJSON(object) {
        const message = {
            ...baseQueryClaimRecordRequest,
        };
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClaimRecordRequest,
        };
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        return message;
    },
};
const baseQueryClaimRecordResponse = {};
export const QueryClaimRecordResponse = {
    encode(message, writer = Writer.create()) {
        if (message.claimRecord !== undefined) {
            ClaimRecord.encode(message.claimRecord, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClaimRecordResponse,
        };
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
    fromJSON(object) {
        const message = {
            ...baseQueryClaimRecordResponse,
        };
        if (object.claimRecord !== undefined && object.claimRecord !== null) {
            message.claimRecord = ClaimRecord.fromJSON(object.claimRecord);
        }
        else {
            message.claimRecord = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.claimRecord !== undefined &&
            (obj.claimRecord = message.claimRecord
                ? ClaimRecord.toJSON(message.claimRecord)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClaimRecordResponse,
        };
        if (object.claimRecord !== undefined && object.claimRecord !== null) {
            message.claimRecord = ClaimRecord.fromPartial(object.claimRecord);
        }
        else {
            message.claimRecord = undefined;
        }
        return message;
    },
};
const baseQueryClaimableForActionRequest = { address: "", action: 0 };
export const QueryClaimableForActionRequest = {
    encode(message, writer = Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.action !== 0) {
            writer.uint32(16).int32(message.action);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClaimableForActionRequest,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.action = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryClaimableForActionRequest,
        };
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        if (object.action !== undefined && object.action !== null) {
            message.action = actionFromJSON(object.action);
        }
        else {
            message.action = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.action !== undefined && (obj.action = actionToJSON(message.action));
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClaimableForActionRequest,
        };
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        if (object.action !== undefined && object.action !== null) {
            message.action = object.action;
        }
        else {
            message.action = 0;
        }
        return message;
    },
};
const baseQueryClaimableForActionResponse = {};
export const QueryClaimableForActionResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.coins) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClaimableForActionResponse,
        };
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
    fromJSON(object) {
        const message = {
            ...baseQueryClaimableForActionResponse,
        };
        message.coins = [];
        if (object.coins !== undefined && object.coins !== null) {
            for (const e of object.coins) {
                message.coins.push(Coin.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.coins) {
            obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
        }
        else {
            obj.coins = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClaimableForActionResponse,
        };
        message.coins = [];
        if (object.coins !== undefined && object.coins !== null) {
            for (const e of object.coins) {
                message.coins.push(Coin.fromPartial(e));
            }
        }
        return message;
    },
};
const baseQueryTotalClaimableRequest = { address: "" };
export const QueryTotalClaimableRequest = {
    encode(message, writer = Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryTotalClaimableRequest,
        };
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
    fromJSON(object) {
        const message = {
            ...baseQueryTotalClaimableRequest,
        };
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryTotalClaimableRequest,
        };
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        return message;
    },
};
const baseQueryTotalClaimableResponse = {};
export const QueryTotalClaimableResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.coins) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryTotalClaimableResponse,
        };
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
    fromJSON(object) {
        const message = {
            ...baseQueryTotalClaimableResponse,
        };
        message.coins = [];
        if (object.coins !== undefined && object.coins !== null) {
            for (const e of object.coins) {
                message.coins.push(Coin.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.coins) {
            obj.coins = message.coins.map((e) => (e ? Coin.toJSON(e) : undefined));
        }
        else {
            obj.coins = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryTotalClaimableResponse,
        };
        message.coins = [];
        if (object.coins !== undefined && object.coins !== null) {
            for (const e of object.coins) {
                message.coins.push(Coin.fromPartial(e));
            }
        }
        return message;
    },
};
const baseQueryClaimEthRecordRequest = { address: "" };
export const QueryClaimEthRecordRequest = {
    encode(message, writer = Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClaimEthRecordRequest,
        };
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
    fromJSON(object) {
        const message = {
            ...baseQueryClaimEthRecordRequest,
        };
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClaimEthRecordRequest,
        };
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        return message;
    },
};
const baseQueryClaimEthRecordResponse = {};
export const QueryClaimEthRecordResponse = {
    encode(message, writer = Writer.create()) {
        if (message.ClaimEthRecord !== undefined) {
            ClaimEthRecord.encode(message.ClaimEthRecord, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseQueryClaimEthRecordResponse,
        };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.ClaimEthRecord = ClaimEthRecord.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = {
            ...baseQueryClaimEthRecordResponse,
        };
        if (object.ClaimEthRecord !== undefined && object.ClaimEthRecord !== null) {
            message.ClaimEthRecord = ClaimEthRecord.fromJSON(object.ClaimEthRecord);
        }
        else {
            message.ClaimEthRecord = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.ClaimEthRecord !== undefined &&
            (obj.ClaimEthRecord = message.ClaimEthRecord
                ? ClaimEthRecord.toJSON(message.ClaimEthRecord)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseQueryClaimEthRecordResponse,
        };
        if (object.ClaimEthRecord !== undefined && object.ClaimEthRecord !== null) {
            message.ClaimEthRecord = ClaimEthRecord.fromPartial(object.ClaimEthRecord);
        }
        else {
            message.ClaimEthRecord = undefined;
        }
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    ModuleAccountBalance(request) {
        const data = QueryModuleAccountBalanceRequest.encode(request).finish();
        const promise = this.rpc.request("ClanNetwork.clannetwork.claim.v1beta1.Query", "ModuleAccountBalance", data);
        return promise.then((data) => QueryModuleAccountBalanceResponse.decode(new Reader(data)));
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("ClanNetwork.clannetwork.claim.v1beta1.Query", "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
    }
    ClaimRecord(request) {
        const data = QueryClaimRecordRequest.encode(request).finish();
        const promise = this.rpc.request("ClanNetwork.clannetwork.claim.v1beta1.Query", "ClaimRecord", data);
        return promise.then((data) => QueryClaimRecordResponse.decode(new Reader(data)));
    }
    ClaimableForAction(request) {
        const data = QueryClaimableForActionRequest.encode(request).finish();
        const promise = this.rpc.request("ClanNetwork.clannetwork.claim.v1beta1.Query", "ClaimableForAction", data);
        return promise.then((data) => QueryClaimableForActionResponse.decode(new Reader(data)));
    }
    TotalClaimable(request) {
        const data = QueryTotalClaimableRequest.encode(request).finish();
        const promise = this.rpc.request("ClanNetwork.clannetwork.claim.v1beta1.Query", "TotalClaimable", data);
        return promise.then((data) => QueryTotalClaimableResponse.decode(new Reader(data)));
    }
    ClaimEthRecord(request) {
        const data = QueryClaimEthRecordRequest.encode(request).finish();
        const promise = this.rpc.request("ClanNetwork.clannetwork.claim.v1beta1.Query", "ClaimEthRecord", data);
        return promise.then((data) => QueryClaimEthRecordResponse.decode(new Reader(data)));
    }
}
