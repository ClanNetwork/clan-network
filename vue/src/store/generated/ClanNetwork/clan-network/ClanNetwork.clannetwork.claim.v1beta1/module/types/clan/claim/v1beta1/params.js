/* eslint-disable */
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Duration } from "../../../google/protobuf/duration";
import { Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";
const baseParams = { airdropEnabled: false, claimDenom: "" };
export const Params = {
    encode(message, writer = Writer.create()) {
        if (message.airdropEnabled === true) {
            writer.uint32(8).bool(message.airdropEnabled);
        }
        if (message.airdropStartTime !== undefined) {
            Timestamp.encode(toTimestamp(message.airdropStartTime), writer.uint32(18).fork()).ldelim();
        }
        if (message.durationUntilDecay !== undefined) {
            Duration.encode(message.durationUntilDecay, writer.uint32(26).fork()).ldelim();
        }
        if (message.durationOfDecay !== undefined) {
            Duration.encode(message.durationOfDecay, writer.uint32(34).fork()).ldelim();
        }
        if (message.claimDenom !== "") {
            writer.uint32(42).string(message.claimDenom);
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
                    message.airdropEnabled = reader.bool();
                    break;
                case 2:
                    message.airdropStartTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.durationUntilDecay = Duration.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.durationOfDecay = Duration.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.claimDenom = reader.string();
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
        if (object.airdropEnabled !== undefined && object.airdropEnabled !== null) {
            message.airdropEnabled = Boolean(object.airdropEnabled);
        }
        else {
            message.airdropEnabled = false;
        }
        if (object.airdropStartTime !== undefined &&
            object.airdropStartTime !== null) {
            message.airdropStartTime = fromJsonTimestamp(object.airdropStartTime);
        }
        else {
            message.airdropStartTime = undefined;
        }
        if (object.durationUntilDecay !== undefined &&
            object.durationUntilDecay !== null) {
            message.durationUntilDecay = Duration.fromJSON(object.durationUntilDecay);
        }
        else {
            message.durationUntilDecay = undefined;
        }
        if (object.durationOfDecay !== undefined &&
            object.durationOfDecay !== null) {
            message.durationOfDecay = Duration.fromJSON(object.durationOfDecay);
        }
        else {
            message.durationOfDecay = undefined;
        }
        if (object.claimDenom !== undefined && object.claimDenom !== null) {
            message.claimDenom = String(object.claimDenom);
        }
        else {
            message.claimDenom = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.airdropEnabled !== undefined &&
            (obj.airdropEnabled = message.airdropEnabled);
        message.airdropStartTime !== undefined &&
            (obj.airdropStartTime =
                message.airdropStartTime !== undefined
                    ? message.airdropStartTime.toISOString()
                    : null);
        message.durationUntilDecay !== undefined &&
            (obj.durationUntilDecay = message.durationUntilDecay
                ? Duration.toJSON(message.durationUntilDecay)
                : undefined);
        message.durationOfDecay !== undefined &&
            (obj.durationOfDecay = message.durationOfDecay
                ? Duration.toJSON(message.durationOfDecay)
                : undefined);
        message.claimDenom !== undefined && (obj.claimDenom = message.claimDenom);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseParams };
        if (object.airdropEnabled !== undefined && object.airdropEnabled !== null) {
            message.airdropEnabled = object.airdropEnabled;
        }
        else {
            message.airdropEnabled = false;
        }
        if (object.airdropStartTime !== undefined &&
            object.airdropStartTime !== null) {
            message.airdropStartTime = object.airdropStartTime;
        }
        else {
            message.airdropStartTime = undefined;
        }
        if (object.durationUntilDecay !== undefined &&
            object.durationUntilDecay !== null) {
            message.durationUntilDecay = Duration.fromPartial(object.durationUntilDecay);
        }
        else {
            message.durationUntilDecay = undefined;
        }
        if (object.durationOfDecay !== undefined &&
            object.durationOfDecay !== null) {
            message.durationOfDecay = Duration.fromPartial(object.durationOfDecay);
        }
        else {
            message.durationOfDecay = undefined;
        }
        if (object.claimDenom !== undefined && object.claimDenom !== null) {
            message.claimDenom = object.claimDenom;
        }
        else {
            message.claimDenom = "";
        }
        return message;
    },
};
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(Timestamp.fromJSON(o));
    }
}
