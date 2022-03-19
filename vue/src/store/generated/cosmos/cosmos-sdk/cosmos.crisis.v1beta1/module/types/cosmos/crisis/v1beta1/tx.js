/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
export const protobufPackage = "cosmos.crisis.v1beta1";
const baseMsgVerifyInvariant = {
    sender: "",
    invariant_module_name: "",
    invariant_route: "",
};
export const MsgVerifyInvariant = {
    encode(message, writer = Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.invariant_module_name !== "") {
            writer.uint32(18).string(message.invariant_module_name);
        }
        if (message.invariant_route !== "") {
            writer.uint32(26).string(message.invariant_route);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgVerifyInvariant };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.invariant_module_name = reader.string();
                    break;
                case 3:
                    message.invariant_route = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgVerifyInvariant };
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = "";
        }
        if (object.invariant_module_name !== undefined &&
            object.invariant_module_name !== null) {
            message.invariant_module_name = String(object.invariant_module_name);
        }
        else {
            message.invariant_module_name = "";
        }
        if (object.invariant_route !== undefined &&
            object.invariant_route !== null) {
            message.invariant_route = String(object.invariant_route);
        }
        else {
            message.invariant_route = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.invariant_module_name !== undefined &&
            (obj.invariant_module_name = message.invariant_module_name);
        message.invariant_route !== undefined &&
            (obj.invariant_route = message.invariant_route);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgVerifyInvariant };
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = "";
        }
        if (object.invariant_module_name !== undefined &&
            object.invariant_module_name !== null) {
            message.invariant_module_name = object.invariant_module_name;
        }
        else {
            message.invariant_module_name = "";
        }
        if (object.invariant_route !== undefined &&
            object.invariant_route !== null) {
            message.invariant_route = object.invariant_route;
        }
        else {
            message.invariant_route = "";
        }
        return message;
    },
};
const baseMsgVerifyInvariantResponse = {};
export const MsgVerifyInvariantResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = {
            ...baseMsgVerifyInvariantResponse,
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
            ...baseMsgVerifyInvariantResponse,
        };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = {
            ...baseMsgVerifyInvariantResponse,
        };
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    VerifyInvariant(request) {
        const data = MsgVerifyInvariant.encode(request).finish();
        const promise = this.rpc.request("cosmos.crisis.v1beta1.Msg", "VerifyInvariant", data);
        return promise.then((data) => MsgVerifyInvariantResponse.decode(new Reader(data)));
    }
}
