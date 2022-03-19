/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";
const baseMsgInitialClaim = { creator: "" };
export const MsgInitialClaim = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgInitialClaim };
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
    fromJSON(object) {
        const message = { ...baseMsgInitialClaim };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgInitialClaim };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        return message;
    },
};
const baseMsgInitialClaimResponse = {};
export const MsgInitialClaimResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.claimedAmount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgInitialClaimResponse,
        };
        message.claimedAmount = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.claimedAmount.push(Coin.decode(reader, reader.uint32()));
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
            ...baseMsgInitialClaimResponse,
        };
        message.claimedAmount = [];
        if (object.claimedAmount !== undefined && object.claimedAmount !== null) {
            for (const e of object.claimedAmount) {
                message.claimedAmount.push(Coin.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.claimedAmount) {
            obj.claimedAmount = message.claimedAmount.map((e) => e ? Coin.toJSON(e) : undefined);
        }
        else {
            obj.claimedAmount = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgInitialClaimResponse,
        };
        message.claimedAmount = [];
        if (object.claimedAmount !== undefined && object.claimedAmount !== null) {
            for (const e of object.claimedAmount) {
                message.claimedAmount.push(Coin.fromPartial(e));
            }
        }
        return message;
    },
};
const baseMsgClaimFroEthAddress = {
    creator: "",
    message: "",
    signature: "",
};
export const MsgClaimFroEthAddress = {
    encode(message, writer = Writer.create()) {
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
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgClaimFroEthAddress };
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
    fromJSON(object) {
        const message = { ...baseMsgClaimFroEthAddress };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.message !== undefined && object.message !== null) {
            message.message = String(object.message);
        }
        else {
            message.message = "";
        }
        if (object.signature !== undefined && object.signature !== null) {
            message.signature = String(object.signature);
        }
        else {
            message.signature = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.message !== undefined && (obj.message = message.message);
        message.signature !== undefined && (obj.signature = message.signature);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgClaimFroEthAddress };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.message !== undefined && object.message !== null) {
            message.message = object.message;
        }
        else {
            message.message = "";
        }
        if (object.signature !== undefined && object.signature !== null) {
            message.signature = object.signature;
        }
        else {
            message.signature = "";
        }
        return message;
    },
};
const baseMsgClaimFroEthAddressResponse = {};
export const MsgClaimFroEthAddressResponse = {
    encode(message, writer = Writer.create()) {
        for (const v of message.claimedAmount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgClaimFroEthAddressResponse,
        };
        message.claimedAmount = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.claimedAmount.push(Coin.decode(reader, reader.uint32()));
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
            ...baseMsgClaimFroEthAddressResponse,
        };
        message.claimedAmount = [];
        if (object.claimedAmount !== undefined && object.claimedAmount !== null) {
            for (const e of object.claimedAmount) {
                message.claimedAmount.push(Coin.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.claimedAmount) {
            obj.claimedAmount = message.claimedAmount.map((e) => e ? Coin.toJSON(e) : undefined);
        }
        else {
            obj.claimedAmount = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = {
            ...baseMsgClaimFroEthAddressResponse,
        };
        message.claimedAmount = [];
        if (object.claimedAmount !== undefined && object.claimedAmount !== null) {
            for (const e of object.claimedAmount) {
                message.claimedAmount.push(Coin.fromPartial(e));
            }
        }
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    InitialClaim(request) {
        const data = MsgInitialClaim.encode(request).finish();
        const promise = this.rpc.request("ClanNetwork.clannetwork.claim.v1beta1.Msg", "InitialClaim", data);
        return promise.then((data) => MsgInitialClaimResponse.decode(new Reader(data)));
    }
    ClaimFroEthAddress(request) {
        const data = MsgClaimFroEthAddress.encode(request).finish();
        const promise = this.rpc.request("ClanNetwork.clannetwork.claim.v1beta1.Msg", "ClaimFroEthAddress", data);
        return promise.then((data) => MsgClaimFroEthAddressResponse.decode(new Reader(data)));
    }
}
