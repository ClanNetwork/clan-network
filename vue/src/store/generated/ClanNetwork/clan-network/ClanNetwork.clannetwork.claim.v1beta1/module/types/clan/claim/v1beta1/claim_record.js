/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Writer, Reader } from "protobufjs/minimal";
export const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";
export var Action;
(function (Action) {
    Action[Action["ActionInitialClaim"] = 0] = "ActionInitialClaim";
    Action[Action["ActionVote"] = 1] = "ActionVote";
    Action[Action["ActionDelegateStake"] = 2] = "ActionDelegateStake";
    Action[Action["TBD1"] = 3] = "TBD1";
    Action[Action["TBD2"] = 4] = "TBD2";
    Action[Action["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Action || (Action = {}));
export function actionFromJSON(object) {
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
export function actionToJSON(object) {
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
const baseClaimRecord = { address: "", actionCompleted: false };
export const ClaimRecord = {
    encode(message, writer = Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        for (const v of message.initialClaimableAmount) {
            Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        writer.uint32(26).fork();
        for (const v of message.actionCompleted) {
            writer.bool(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseClaimRecord };
        message.initialClaimableAmount = [];
        message.actionCompleted = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.initialClaimableAmount.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.actionCompleted.push(reader.bool());
                        }
                    }
                    else {
                        message.actionCompleted.push(reader.bool());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseClaimRecord };
        message.initialClaimableAmount = [];
        message.actionCompleted = [];
        if (object.address !== undefined && object.address !== null) {
            message.address = String(object.address);
        }
        else {
            message.address = "";
        }
        if (object.initialClaimableAmount !== undefined &&
            object.initialClaimableAmount !== null) {
            for (const e of object.initialClaimableAmount) {
                message.initialClaimableAmount.push(Coin.fromJSON(e));
            }
        }
        if (object.actionCompleted !== undefined &&
            object.actionCompleted !== null) {
            for (const e of object.actionCompleted) {
                message.actionCompleted.push(Boolean(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        if (message.initialClaimableAmount) {
            obj.initialClaimableAmount = message.initialClaimableAmount.map((e) => e ? Coin.toJSON(e) : undefined);
        }
        else {
            obj.initialClaimableAmount = [];
        }
        if (message.actionCompleted) {
            obj.actionCompleted = message.actionCompleted.map((e) => e);
        }
        else {
            obj.actionCompleted = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseClaimRecord };
        message.initialClaimableAmount = [];
        message.actionCompleted = [];
        if (object.address !== undefined && object.address !== null) {
            message.address = object.address;
        }
        else {
            message.address = "";
        }
        if (object.initialClaimableAmount !== undefined &&
            object.initialClaimableAmount !== null) {
            for (const e of object.initialClaimableAmount) {
                message.initialClaimableAmount.push(Coin.fromPartial(e));
            }
        }
        if (object.actionCompleted !== undefined &&
            object.actionCompleted !== null) {
            for (const e of object.actionCompleted) {
                message.actionCompleted.push(e);
            }
        }
        return message;
    },
};
