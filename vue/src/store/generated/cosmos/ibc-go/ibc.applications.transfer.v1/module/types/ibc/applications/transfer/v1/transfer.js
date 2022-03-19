/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "ibc.applications.transfer.v1";
const baseDenomTrace = { path: "", base_denom: "" };
export const DenomTrace = {
    encode(message, writer = Writer.create()) {
        if (message.path !== "") {
            writer.uint32(10).string(message.path);
        }
        if (message.base_denom !== "") {
            writer.uint32(18).string(message.base_denom);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseDenomTrace };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.path = reader.string();
                    break;
                case 2:
                    message.base_denom = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseDenomTrace };
        if (object.path !== undefined && object.path !== null) {
            message.path = String(object.path);
        }
        else {
            message.path = "";
        }
        if (object.base_denom !== undefined && object.base_denom !== null) {
            message.base_denom = String(object.base_denom);
        }
        else {
            message.base_denom = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.path !== undefined && (obj.path = message.path);
        message.base_denom !== undefined && (obj.base_denom = message.base_denom);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseDenomTrace };
        if (object.path !== undefined && object.path !== null) {
            message.path = object.path;
        }
        else {
            message.path = "";
        }
        if (object.base_denom !== undefined && object.base_denom !== null) {
            message.base_denom = object.base_denom;
        }
        else {
            message.base_denom = "";
        }
        return message;
    },
};
const baseParams = { send_enabled: false, receive_enabled: false };
export const Params = {
    encode(message, writer = Writer.create()) {
        if (message.send_enabled === true) {
            writer.uint32(8).bool(message.send_enabled);
        }
        if (message.receive_enabled === true) {
            writer.uint32(16).bool(message.receive_enabled);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseParams };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.send_enabled = reader.bool();
                    break;
                case 2:
                    message.receive_enabled = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseParams };
        if (object.send_enabled !== undefined && object.send_enabled !== null) {
            message.send_enabled = Boolean(object.send_enabled);
        }
        else {
            message.send_enabled = false;
        }
        if (object.receive_enabled !== undefined &&
            object.receive_enabled !== null) {
            message.receive_enabled = Boolean(object.receive_enabled);
        }
        else {
            message.receive_enabled = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.send_enabled !== undefined &&
            (obj.send_enabled = message.send_enabled);
        message.receive_enabled !== undefined &&
            (obj.receive_enabled = message.receive_enabled);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseParams };
        if (object.send_enabled !== undefined && object.send_enabled !== null) {
            message.send_enabled = object.send_enabled;
        }
        else {
            message.send_enabled = false;
        }
        if (object.receive_enabled !== undefined &&
            object.receive_enabled !== null) {
            message.receive_enabled = object.receive_enabled;
        }
        else {
            message.receive_enabled = false;
        }
        return message;
    },
};
