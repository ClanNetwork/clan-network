/* eslint-disable */
import { Timestamp } from "../../google/protobuf/timestamp";
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Proof } from "../../tendermint/crypto/proof";
import { Consensus } from "../../tendermint/version/types";
import { ValidatorSet } from "../../tendermint/types/validator";
export const protobufPackage = "tendermint.types";
/** BlockIdFlag indicates which BlcokID the signature is for */
export var BlockIDFlag;
(function (BlockIDFlag) {
    BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_UNKNOWN"] = 0] = "BLOCK_ID_FLAG_UNKNOWN";
    BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_ABSENT"] = 1] = "BLOCK_ID_FLAG_ABSENT";
    BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_COMMIT"] = 2] = "BLOCK_ID_FLAG_COMMIT";
    BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_NIL"] = 3] = "BLOCK_ID_FLAG_NIL";
    BlockIDFlag[BlockIDFlag["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(BlockIDFlag || (BlockIDFlag = {}));
export function blockIDFlagFromJSON(object) {
    switch (object) {
        case 0:
        case "BLOCK_ID_FLAG_UNKNOWN":
            return BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN;
        case 1:
        case "BLOCK_ID_FLAG_ABSENT":
            return BlockIDFlag.BLOCK_ID_FLAG_ABSENT;
        case 2:
        case "BLOCK_ID_FLAG_COMMIT":
            return BlockIDFlag.BLOCK_ID_FLAG_COMMIT;
        case 3:
        case "BLOCK_ID_FLAG_NIL":
            return BlockIDFlag.BLOCK_ID_FLAG_NIL;
        case -1:
        case "UNRECOGNIZED":
        default:
            return BlockIDFlag.UNRECOGNIZED;
    }
}
export function blockIDFlagToJSON(object) {
    switch (object) {
        case BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN:
            return "BLOCK_ID_FLAG_UNKNOWN";
        case BlockIDFlag.BLOCK_ID_FLAG_ABSENT:
            return "BLOCK_ID_FLAG_ABSENT";
        case BlockIDFlag.BLOCK_ID_FLAG_COMMIT:
            return "BLOCK_ID_FLAG_COMMIT";
        case BlockIDFlag.BLOCK_ID_FLAG_NIL:
            return "BLOCK_ID_FLAG_NIL";
        default:
            return "UNKNOWN";
    }
}
/** SignedMsgType is a type of signed message in the consensus. */
export var SignedMsgType;
(function (SignedMsgType) {
    SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_UNKNOWN"] = 0] = "SIGNED_MSG_TYPE_UNKNOWN";
    /** SIGNED_MSG_TYPE_PREVOTE - Votes */
    SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_PREVOTE"] = 1] = "SIGNED_MSG_TYPE_PREVOTE";
    SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_PRECOMMIT"] = 2] = "SIGNED_MSG_TYPE_PRECOMMIT";
    /** SIGNED_MSG_TYPE_PROPOSAL - Proposals */
    SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_PROPOSAL"] = 32] = "SIGNED_MSG_TYPE_PROPOSAL";
    SignedMsgType[SignedMsgType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(SignedMsgType || (SignedMsgType = {}));
export function signedMsgTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "SIGNED_MSG_TYPE_UNKNOWN":
            return SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN;
        case 1:
        case "SIGNED_MSG_TYPE_PREVOTE":
            return SignedMsgType.SIGNED_MSG_TYPE_PREVOTE;
        case 2:
        case "SIGNED_MSG_TYPE_PRECOMMIT":
            return SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT;
        case 32:
        case "SIGNED_MSG_TYPE_PROPOSAL":
            return SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL;
        case -1:
        case "UNRECOGNIZED":
        default:
            return SignedMsgType.UNRECOGNIZED;
    }
}
export function signedMsgTypeToJSON(object) {
    switch (object) {
        case SignedMsgType.SIGNED_MSG_TYPE_UNKNOWN:
            return "SIGNED_MSG_TYPE_UNKNOWN";
        case SignedMsgType.SIGNED_MSG_TYPE_PREVOTE:
            return "SIGNED_MSG_TYPE_PREVOTE";
        case SignedMsgType.SIGNED_MSG_TYPE_PRECOMMIT:
            return "SIGNED_MSG_TYPE_PRECOMMIT";
        case SignedMsgType.SIGNED_MSG_TYPE_PROPOSAL:
            return "SIGNED_MSG_TYPE_PROPOSAL";
        default:
            return "UNKNOWN";
    }
}
const basePartSetHeader = { total: 0 };
export const PartSetHeader = {
    encode(message, writer = Writer.create()) {
        if (message.total !== 0) {
            writer.uint32(8).uint32(message.total);
        }
        if (message.hash.length !== 0) {
            writer.uint32(18).bytes(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...basePartSetHeader };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.total = reader.uint32();
                    break;
                case 2:
                    message.hash = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...basePartSetHeader };
        if (object.total !== undefined && object.total !== null) {
            message.total = Number(object.total);
        }
        else {
            message.total = 0;
        }
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = bytesFromBase64(object.hash);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.total !== undefined && (obj.total = message.total);
        message.hash !== undefined &&
            (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...basePartSetHeader };
        if (object.total !== undefined && object.total !== null) {
            message.total = object.total;
        }
        else {
            message.total = 0;
        }
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = object.hash;
        }
        else {
            message.hash = new Uint8Array();
        }
        return message;
    },
};
const basePart = { index: 0 };
export const Part = {
    encode(message, writer = Writer.create()) {
        if (message.index !== 0) {
            writer.uint32(8).uint32(message.index);
        }
        if (message.bytes.length !== 0) {
            writer.uint32(18).bytes(message.bytes);
        }
        if (message.proof !== undefined) {
            Proof.encode(message.proof, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...basePart };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.uint32();
                    break;
                case 2:
                    message.bytes = reader.bytes();
                    break;
                case 3:
                    message.proof = Proof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...basePart };
        if (object.index !== undefined && object.index !== null) {
            message.index = Number(object.index);
        }
        else {
            message.index = 0;
        }
        if (object.bytes !== undefined && object.bytes !== null) {
            message.bytes = bytesFromBase64(object.bytes);
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = Proof.fromJSON(object.proof);
        }
        else {
            message.proof = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined && (obj.index = message.index);
        message.bytes !== undefined &&
            (obj.bytes = base64FromBytes(message.bytes !== undefined ? message.bytes : new Uint8Array()));
        message.proof !== undefined &&
            (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...basePart };
        if (object.index !== undefined && object.index !== null) {
            message.index = object.index;
        }
        else {
            message.index = 0;
        }
        if (object.bytes !== undefined && object.bytes !== null) {
            message.bytes = object.bytes;
        }
        else {
            message.bytes = new Uint8Array();
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = Proof.fromPartial(object.proof);
        }
        else {
            message.proof = undefined;
        }
        return message;
    },
};
const baseBlockID = {};
export const BlockID = {
    encode(message, writer = Writer.create()) {
        if (message.hash.length !== 0) {
            writer.uint32(10).bytes(message.hash);
        }
        if (message.part_set_header !== undefined) {
            PartSetHeader.encode(message.part_set_header, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseBlockID };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.bytes();
                    break;
                case 2:
                    message.part_set_header = PartSetHeader.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseBlockID };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = bytesFromBase64(object.hash);
        }
        if (object.part_set_header !== undefined &&
            object.part_set_header !== null) {
            message.part_set_header = PartSetHeader.fromJSON(object.part_set_header);
        }
        else {
            message.part_set_header = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined &&
            (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()));
        message.part_set_header !== undefined &&
            (obj.part_set_header = message.part_set_header
                ? PartSetHeader.toJSON(message.part_set_header)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseBlockID };
        if (object.hash !== undefined && object.hash !== null) {
            message.hash = object.hash;
        }
        else {
            message.hash = new Uint8Array();
        }
        if (object.part_set_header !== undefined &&
            object.part_set_header !== null) {
            message.part_set_header = PartSetHeader.fromPartial(object.part_set_header);
        }
        else {
            message.part_set_header = undefined;
        }
        return message;
    },
};
const baseHeader = { chain_id: "", height: 0 };
export const Header = {
    encode(message, writer = Writer.create()) {
        if (message.version !== undefined) {
            Consensus.encode(message.version, writer.uint32(10).fork()).ldelim();
        }
        if (message.chain_id !== "") {
            writer.uint32(18).string(message.chain_id);
        }
        if (message.height !== 0) {
            writer.uint32(24).int64(message.height);
        }
        if (message.time !== undefined) {
            Timestamp.encode(toTimestamp(message.time), writer.uint32(34).fork()).ldelim();
        }
        if (message.last_block_id !== undefined) {
            BlockID.encode(message.last_block_id, writer.uint32(42).fork()).ldelim();
        }
        if (message.last_commit_hash.length !== 0) {
            writer.uint32(50).bytes(message.last_commit_hash);
        }
        if (message.data_hash.length !== 0) {
            writer.uint32(58).bytes(message.data_hash);
        }
        if (message.validators_hash.length !== 0) {
            writer.uint32(66).bytes(message.validators_hash);
        }
        if (message.next_validators_hash.length !== 0) {
            writer.uint32(74).bytes(message.next_validators_hash);
        }
        if (message.consensus_hash.length !== 0) {
            writer.uint32(82).bytes(message.consensus_hash);
        }
        if (message.app_hash.length !== 0) {
            writer.uint32(90).bytes(message.app_hash);
        }
        if (message.last_results_hash.length !== 0) {
            writer.uint32(98).bytes(message.last_results_hash);
        }
        if (message.evidence_hash.length !== 0) {
            writer.uint32(106).bytes(message.evidence_hash);
        }
        if (message.proposer_address.length !== 0) {
            writer.uint32(114).bytes(message.proposer_address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseHeader };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.version = Consensus.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.chain_id = reader.string();
                    break;
                case 3:
                    message.height = longToNumber(reader.int64());
                    break;
                case 4:
                    message.time = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.last_block_id = BlockID.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.last_commit_hash = reader.bytes();
                    break;
                case 7:
                    message.data_hash = reader.bytes();
                    break;
                case 8:
                    message.validators_hash = reader.bytes();
                    break;
                case 9:
                    message.next_validators_hash = reader.bytes();
                    break;
                case 10:
                    message.consensus_hash = reader.bytes();
                    break;
                case 11:
                    message.app_hash = reader.bytes();
                    break;
                case 12:
                    message.last_results_hash = reader.bytes();
                    break;
                case 13:
                    message.evidence_hash = reader.bytes();
                    break;
                case 14:
                    message.proposer_address = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseHeader };
        if (object.version !== undefined && object.version !== null) {
            message.version = Consensus.fromJSON(object.version);
        }
        else {
            message.version = undefined;
        }
        if (object.chain_id !== undefined && object.chain_id !== null) {
            message.chain_id = String(object.chain_id);
        }
        else {
            message.chain_id = "";
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = Number(object.height);
        }
        else {
            message.height = 0;
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = fromJsonTimestamp(object.time);
        }
        else {
            message.time = undefined;
        }
        if (object.last_block_id !== undefined && object.last_block_id !== null) {
            message.last_block_id = BlockID.fromJSON(object.last_block_id);
        }
        else {
            message.last_block_id = undefined;
        }
        if (object.last_commit_hash !== undefined &&
            object.last_commit_hash !== null) {
            message.last_commit_hash = bytesFromBase64(object.last_commit_hash);
        }
        if (object.data_hash !== undefined && object.data_hash !== null) {
            message.data_hash = bytesFromBase64(object.data_hash);
        }
        if (object.validators_hash !== undefined &&
            object.validators_hash !== null) {
            message.validators_hash = bytesFromBase64(object.validators_hash);
        }
        if (object.next_validators_hash !== undefined &&
            object.next_validators_hash !== null) {
            message.next_validators_hash = bytesFromBase64(object.next_validators_hash);
        }
        if (object.consensus_hash !== undefined && object.consensus_hash !== null) {
            message.consensus_hash = bytesFromBase64(object.consensus_hash);
        }
        if (object.app_hash !== undefined && object.app_hash !== null) {
            message.app_hash = bytesFromBase64(object.app_hash);
        }
        if (object.last_results_hash !== undefined &&
            object.last_results_hash !== null) {
            message.last_results_hash = bytesFromBase64(object.last_results_hash);
        }
        if (object.evidence_hash !== undefined && object.evidence_hash !== null) {
            message.evidence_hash = bytesFromBase64(object.evidence_hash);
        }
        if (object.proposer_address !== undefined &&
            object.proposer_address !== null) {
            message.proposer_address = bytesFromBase64(object.proposer_address);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.version !== undefined &&
            (obj.version = message.version
                ? Consensus.toJSON(message.version)
                : undefined);
        message.chain_id !== undefined && (obj.chain_id = message.chain_id);
        message.height !== undefined && (obj.height = message.height);
        message.time !== undefined &&
            (obj.time =
                message.time !== undefined ? message.time.toISOString() : null);
        message.last_block_id !== undefined &&
            (obj.last_block_id = message.last_block_id
                ? BlockID.toJSON(message.last_block_id)
                : undefined);
        message.last_commit_hash !== undefined &&
            (obj.last_commit_hash = base64FromBytes(message.last_commit_hash !== undefined
                ? message.last_commit_hash
                : new Uint8Array()));
        message.data_hash !== undefined &&
            (obj.data_hash = base64FromBytes(message.data_hash !== undefined ? message.data_hash : new Uint8Array()));
        message.validators_hash !== undefined &&
            (obj.validators_hash = base64FromBytes(message.validators_hash !== undefined
                ? message.validators_hash
                : new Uint8Array()));
        message.next_validators_hash !== undefined &&
            (obj.next_validators_hash = base64FromBytes(message.next_validators_hash !== undefined
                ? message.next_validators_hash
                : new Uint8Array()));
        message.consensus_hash !== undefined &&
            (obj.consensus_hash = base64FromBytes(message.consensus_hash !== undefined
                ? message.consensus_hash
                : new Uint8Array()));
        message.app_hash !== undefined &&
            (obj.app_hash = base64FromBytes(message.app_hash !== undefined ? message.app_hash : new Uint8Array()));
        message.last_results_hash !== undefined &&
            (obj.last_results_hash = base64FromBytes(message.last_results_hash !== undefined
                ? message.last_results_hash
                : new Uint8Array()));
        message.evidence_hash !== undefined &&
            (obj.evidence_hash = base64FromBytes(message.evidence_hash !== undefined
                ? message.evidence_hash
                : new Uint8Array()));
        message.proposer_address !== undefined &&
            (obj.proposer_address = base64FromBytes(message.proposer_address !== undefined
                ? message.proposer_address
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseHeader };
        if (object.version !== undefined && object.version !== null) {
            message.version = Consensus.fromPartial(object.version);
        }
        else {
            message.version = undefined;
        }
        if (object.chain_id !== undefined && object.chain_id !== null) {
            message.chain_id = object.chain_id;
        }
        else {
            message.chain_id = "";
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = object.height;
        }
        else {
            message.height = 0;
        }
        if (object.time !== undefined && object.time !== null) {
            message.time = object.time;
        }
        else {
            message.time = undefined;
        }
        if (object.last_block_id !== undefined && object.last_block_id !== null) {
            message.last_block_id = BlockID.fromPartial(object.last_block_id);
        }
        else {
            message.last_block_id = undefined;
        }
        if (object.last_commit_hash !== undefined &&
            object.last_commit_hash !== null) {
            message.last_commit_hash = object.last_commit_hash;
        }
        else {
            message.last_commit_hash = new Uint8Array();
        }
        if (object.data_hash !== undefined && object.data_hash !== null) {
            message.data_hash = object.data_hash;
        }
        else {
            message.data_hash = new Uint8Array();
        }
        if (object.validators_hash !== undefined &&
            object.validators_hash !== null) {
            message.validators_hash = object.validators_hash;
        }
        else {
            message.validators_hash = new Uint8Array();
        }
        if (object.next_validators_hash !== undefined &&
            object.next_validators_hash !== null) {
            message.next_validators_hash = object.next_validators_hash;
        }
        else {
            message.next_validators_hash = new Uint8Array();
        }
        if (object.consensus_hash !== undefined && object.consensus_hash !== null) {
            message.consensus_hash = object.consensus_hash;
        }
        else {
            message.consensus_hash = new Uint8Array();
        }
        if (object.app_hash !== undefined && object.app_hash !== null) {
            message.app_hash = object.app_hash;
        }
        else {
            message.app_hash = new Uint8Array();
        }
        if (object.last_results_hash !== undefined &&
            object.last_results_hash !== null) {
            message.last_results_hash = object.last_results_hash;
        }
        else {
            message.last_results_hash = new Uint8Array();
        }
        if (object.evidence_hash !== undefined && object.evidence_hash !== null) {
            message.evidence_hash = object.evidence_hash;
        }
        else {
            message.evidence_hash = new Uint8Array();
        }
        if (object.proposer_address !== undefined &&
            object.proposer_address !== null) {
            message.proposer_address = object.proposer_address;
        }
        else {
            message.proposer_address = new Uint8Array();
        }
        return message;
    },
};
const baseData = {};
export const Data = {
    encode(message, writer = Writer.create()) {
        for (const v of message.txs) {
            writer.uint32(10).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseData };
        message.txs = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txs.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseData };
        message.txs = [];
        if (object.txs !== undefined && object.txs !== null) {
            for (const e of object.txs) {
                message.txs.push(bytesFromBase64(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.txs) {
            obj.txs = message.txs.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.txs = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseData };
        message.txs = [];
        if (object.txs !== undefined && object.txs !== null) {
            for (const e of object.txs) {
                message.txs.push(e);
            }
        }
        return message;
    },
};
const baseVote = { type: 0, height: 0, round: 0, validator_index: 0 };
export const Vote = {
    encode(message, writer = Writer.create()) {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.height !== 0) {
            writer.uint32(16).int64(message.height);
        }
        if (message.round !== 0) {
            writer.uint32(24).int32(message.round);
        }
        if (message.block_id !== undefined) {
            BlockID.encode(message.block_id, writer.uint32(34).fork()).ldelim();
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(42).fork()).ldelim();
        }
        if (message.validator_address.length !== 0) {
            writer.uint32(50).bytes(message.validator_address);
        }
        if (message.validator_index !== 0) {
            writer.uint32(56).int32(message.validator_index);
        }
        if (message.signature.length !== 0) {
            writer.uint32(66).bytes(message.signature);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseVote };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.height = longToNumber(reader.int64());
                    break;
                case 3:
                    message.round = reader.int32();
                    break;
                case 4:
                    message.block_id = BlockID.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.validator_address = reader.bytes();
                    break;
                case 7:
                    message.validator_index = reader.int32();
                    break;
                case 8:
                    message.signature = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseVote };
        if (object.type !== undefined && object.type !== null) {
            message.type = signedMsgTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = Number(object.height);
        }
        else {
            message.height = 0;
        }
        if (object.round !== undefined && object.round !== null) {
            message.round = Number(object.round);
        }
        else {
            message.round = 0;
        }
        if (object.block_id !== undefined && object.block_id !== null) {
            message.block_id = BlockID.fromJSON(object.block_id);
        }
        else {
            message.block_id = undefined;
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = fromJsonTimestamp(object.timestamp);
        }
        else {
            message.timestamp = undefined;
        }
        if (object.validator_address !== undefined &&
            object.validator_address !== null) {
            message.validator_address = bytesFromBase64(object.validator_address);
        }
        if (object.validator_index !== undefined &&
            object.validator_index !== null) {
            message.validator_index = Number(object.validator_index);
        }
        else {
            message.validator_index = 0;
        }
        if (object.signature !== undefined && object.signature !== null) {
            message.signature = bytesFromBase64(object.signature);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.type !== undefined &&
            (obj.type = signedMsgTypeToJSON(message.type));
        message.height !== undefined && (obj.height = message.height);
        message.round !== undefined && (obj.round = message.round);
        message.block_id !== undefined &&
            (obj.block_id = message.block_id
                ? BlockID.toJSON(message.block_id)
                : undefined);
        message.timestamp !== undefined &&
            (obj.timestamp =
                message.timestamp !== undefined
                    ? message.timestamp.toISOString()
                    : null);
        message.validator_address !== undefined &&
            (obj.validator_address = base64FromBytes(message.validator_address !== undefined
                ? message.validator_address
                : new Uint8Array()));
        message.validator_index !== undefined &&
            (obj.validator_index = message.validator_index);
        message.signature !== undefined &&
            (obj.signature = base64FromBytes(message.signature !== undefined ? message.signature : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseVote };
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = object.height;
        }
        else {
            message.height = 0;
        }
        if (object.round !== undefined && object.round !== null) {
            message.round = object.round;
        }
        else {
            message.round = 0;
        }
        if (object.block_id !== undefined && object.block_id !== null) {
            message.block_id = BlockID.fromPartial(object.block_id);
        }
        else {
            message.block_id = undefined;
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = object.timestamp;
        }
        else {
            message.timestamp = undefined;
        }
        if (object.validator_address !== undefined &&
            object.validator_address !== null) {
            message.validator_address = object.validator_address;
        }
        else {
            message.validator_address = new Uint8Array();
        }
        if (object.validator_index !== undefined &&
            object.validator_index !== null) {
            message.validator_index = object.validator_index;
        }
        else {
            message.validator_index = 0;
        }
        if (object.signature !== undefined && object.signature !== null) {
            message.signature = object.signature;
        }
        else {
            message.signature = new Uint8Array();
        }
        return message;
    },
};
const baseCommit = { height: 0, round: 0 };
export const Commit = {
    encode(message, writer = Writer.create()) {
        if (message.height !== 0) {
            writer.uint32(8).int64(message.height);
        }
        if (message.round !== 0) {
            writer.uint32(16).int32(message.round);
        }
        if (message.block_id !== undefined) {
            BlockID.encode(message.block_id, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.signatures) {
            CommitSig.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseCommit };
        message.signatures = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = longToNumber(reader.int64());
                    break;
                case 2:
                    message.round = reader.int32();
                    break;
                case 3:
                    message.block_id = BlockID.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.signatures.push(CommitSig.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseCommit };
        message.signatures = [];
        if (object.height !== undefined && object.height !== null) {
            message.height = Number(object.height);
        }
        else {
            message.height = 0;
        }
        if (object.round !== undefined && object.round !== null) {
            message.round = Number(object.round);
        }
        else {
            message.round = 0;
        }
        if (object.block_id !== undefined && object.block_id !== null) {
            message.block_id = BlockID.fromJSON(object.block_id);
        }
        else {
            message.block_id = undefined;
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(CommitSig.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.height !== undefined && (obj.height = message.height);
        message.round !== undefined && (obj.round = message.round);
        message.block_id !== undefined &&
            (obj.block_id = message.block_id
                ? BlockID.toJSON(message.block_id)
                : undefined);
        if (message.signatures) {
            obj.signatures = message.signatures.map((e) => e ? CommitSig.toJSON(e) : undefined);
        }
        else {
            obj.signatures = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseCommit };
        message.signatures = [];
        if (object.height !== undefined && object.height !== null) {
            message.height = object.height;
        }
        else {
            message.height = 0;
        }
        if (object.round !== undefined && object.round !== null) {
            message.round = object.round;
        }
        else {
            message.round = 0;
        }
        if (object.block_id !== undefined && object.block_id !== null) {
            message.block_id = BlockID.fromPartial(object.block_id);
        }
        else {
            message.block_id = undefined;
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(CommitSig.fromPartial(e));
            }
        }
        return message;
    },
};
const baseCommitSig = { block_id_flag: 0 };
export const CommitSig = {
    encode(message, writer = Writer.create()) {
        if (message.block_id_flag !== 0) {
            writer.uint32(8).int32(message.block_id_flag);
        }
        if (message.validator_address.length !== 0) {
            writer.uint32(18).bytes(message.validator_address);
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
        }
        if (message.signature.length !== 0) {
            writer.uint32(34).bytes(message.signature);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseCommitSig };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.block_id_flag = reader.int32();
                    break;
                case 2:
                    message.validator_address = reader.bytes();
                    break;
                case 3:
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.signature = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseCommitSig };
        if (object.block_id_flag !== undefined && object.block_id_flag !== null) {
            message.block_id_flag = blockIDFlagFromJSON(object.block_id_flag);
        }
        else {
            message.block_id_flag = 0;
        }
        if (object.validator_address !== undefined &&
            object.validator_address !== null) {
            message.validator_address = bytesFromBase64(object.validator_address);
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = fromJsonTimestamp(object.timestamp);
        }
        else {
            message.timestamp = undefined;
        }
        if (object.signature !== undefined && object.signature !== null) {
            message.signature = bytesFromBase64(object.signature);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.block_id_flag !== undefined &&
            (obj.block_id_flag = blockIDFlagToJSON(message.block_id_flag));
        message.validator_address !== undefined &&
            (obj.validator_address = base64FromBytes(message.validator_address !== undefined
                ? message.validator_address
                : new Uint8Array()));
        message.timestamp !== undefined &&
            (obj.timestamp =
                message.timestamp !== undefined
                    ? message.timestamp.toISOString()
                    : null);
        message.signature !== undefined &&
            (obj.signature = base64FromBytes(message.signature !== undefined ? message.signature : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseCommitSig };
        if (object.block_id_flag !== undefined && object.block_id_flag !== null) {
            message.block_id_flag = object.block_id_flag;
        }
        else {
            message.block_id_flag = 0;
        }
        if (object.validator_address !== undefined &&
            object.validator_address !== null) {
            message.validator_address = object.validator_address;
        }
        else {
            message.validator_address = new Uint8Array();
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = object.timestamp;
        }
        else {
            message.timestamp = undefined;
        }
        if (object.signature !== undefined && object.signature !== null) {
            message.signature = object.signature;
        }
        else {
            message.signature = new Uint8Array();
        }
        return message;
    },
};
const baseProposal = { type: 0, height: 0, round: 0, pol_round: 0 };
export const Proposal = {
    encode(message, writer = Writer.create()) {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.height !== 0) {
            writer.uint32(16).int64(message.height);
        }
        if (message.round !== 0) {
            writer.uint32(24).int32(message.round);
        }
        if (message.pol_round !== 0) {
            writer.uint32(32).int32(message.pol_round);
        }
        if (message.block_id !== undefined) {
            BlockID.encode(message.block_id, writer.uint32(42).fork()).ldelim();
        }
        if (message.timestamp !== undefined) {
            Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(50).fork()).ldelim();
        }
        if (message.signature.length !== 0) {
            writer.uint32(58).bytes(message.signature);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseProposal };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.height = longToNumber(reader.int64());
                    break;
                case 3:
                    message.round = reader.int32();
                    break;
                case 4:
                    message.pol_round = reader.int32();
                    break;
                case 5:
                    message.block_id = BlockID.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.signature = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseProposal };
        if (object.type !== undefined && object.type !== null) {
            message.type = signedMsgTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = Number(object.height);
        }
        else {
            message.height = 0;
        }
        if (object.round !== undefined && object.round !== null) {
            message.round = Number(object.round);
        }
        else {
            message.round = 0;
        }
        if (object.pol_round !== undefined && object.pol_round !== null) {
            message.pol_round = Number(object.pol_round);
        }
        else {
            message.pol_round = 0;
        }
        if (object.block_id !== undefined && object.block_id !== null) {
            message.block_id = BlockID.fromJSON(object.block_id);
        }
        else {
            message.block_id = undefined;
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = fromJsonTimestamp(object.timestamp);
        }
        else {
            message.timestamp = undefined;
        }
        if (object.signature !== undefined && object.signature !== null) {
            message.signature = bytesFromBase64(object.signature);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.type !== undefined &&
            (obj.type = signedMsgTypeToJSON(message.type));
        message.height !== undefined && (obj.height = message.height);
        message.round !== undefined && (obj.round = message.round);
        message.pol_round !== undefined && (obj.pol_round = message.pol_round);
        message.block_id !== undefined &&
            (obj.block_id = message.block_id
                ? BlockID.toJSON(message.block_id)
                : undefined);
        message.timestamp !== undefined &&
            (obj.timestamp =
                message.timestamp !== undefined
                    ? message.timestamp.toISOString()
                    : null);
        message.signature !== undefined &&
            (obj.signature = base64FromBytes(message.signature !== undefined ? message.signature : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseProposal };
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = object.height;
        }
        else {
            message.height = 0;
        }
        if (object.round !== undefined && object.round !== null) {
            message.round = object.round;
        }
        else {
            message.round = 0;
        }
        if (object.pol_round !== undefined && object.pol_round !== null) {
            message.pol_round = object.pol_round;
        }
        else {
            message.pol_round = 0;
        }
        if (object.block_id !== undefined && object.block_id !== null) {
            message.block_id = BlockID.fromPartial(object.block_id);
        }
        else {
            message.block_id = undefined;
        }
        if (object.timestamp !== undefined && object.timestamp !== null) {
            message.timestamp = object.timestamp;
        }
        else {
            message.timestamp = undefined;
        }
        if (object.signature !== undefined && object.signature !== null) {
            message.signature = object.signature;
        }
        else {
            message.signature = new Uint8Array();
        }
        return message;
    },
};
const baseSignedHeader = {};
export const SignedHeader = {
    encode(message, writer = Writer.create()) {
        if (message.header !== undefined) {
            Header.encode(message.header, writer.uint32(10).fork()).ldelim();
        }
        if (message.commit !== undefined) {
            Commit.encode(message.commit, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseSignedHeader };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.header = Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.commit = Commit.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseSignedHeader };
        if (object.header !== undefined && object.header !== null) {
            message.header = Header.fromJSON(object.header);
        }
        else {
            message.header = undefined;
        }
        if (object.commit !== undefined && object.commit !== null) {
            message.commit = Commit.fromJSON(object.commit);
        }
        else {
            message.commit = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.header !== undefined &&
            (obj.header = message.header ? Header.toJSON(message.header) : undefined);
        message.commit !== undefined &&
            (obj.commit = message.commit ? Commit.toJSON(message.commit) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseSignedHeader };
        if (object.header !== undefined && object.header !== null) {
            message.header = Header.fromPartial(object.header);
        }
        else {
            message.header = undefined;
        }
        if (object.commit !== undefined && object.commit !== null) {
            message.commit = Commit.fromPartial(object.commit);
        }
        else {
            message.commit = undefined;
        }
        return message;
    },
};
const baseLightBlock = {};
export const LightBlock = {
    encode(message, writer = Writer.create()) {
        if (message.signed_header !== undefined) {
            SignedHeader.encode(message.signed_header, writer.uint32(10).fork()).ldelim();
        }
        if (message.validator_set !== undefined) {
            ValidatorSet.encode(message.validator_set, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseLightBlock };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signed_header = SignedHeader.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.validator_set = ValidatorSet.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseLightBlock };
        if (object.signed_header !== undefined && object.signed_header !== null) {
            message.signed_header = SignedHeader.fromJSON(object.signed_header);
        }
        else {
            message.signed_header = undefined;
        }
        if (object.validator_set !== undefined && object.validator_set !== null) {
            message.validator_set = ValidatorSet.fromJSON(object.validator_set);
        }
        else {
            message.validator_set = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.signed_header !== undefined &&
            (obj.signed_header = message.signed_header
                ? SignedHeader.toJSON(message.signed_header)
                : undefined);
        message.validator_set !== undefined &&
            (obj.validator_set = message.validator_set
                ? ValidatorSet.toJSON(message.validator_set)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseLightBlock };
        if (object.signed_header !== undefined && object.signed_header !== null) {
            message.signed_header = SignedHeader.fromPartial(object.signed_header);
        }
        else {
            message.signed_header = undefined;
        }
        if (object.validator_set !== undefined && object.validator_set !== null) {
            message.validator_set = ValidatorSet.fromPartial(object.validator_set);
        }
        else {
            message.validator_set = undefined;
        }
        return message;
    },
};
const baseBlockMeta = { block_size: 0, num_txs: 0 };
export const BlockMeta = {
    encode(message, writer = Writer.create()) {
        if (message.block_id !== undefined) {
            BlockID.encode(message.block_id, writer.uint32(10).fork()).ldelim();
        }
        if (message.block_size !== 0) {
            writer.uint32(16).int64(message.block_size);
        }
        if (message.header !== undefined) {
            Header.encode(message.header, writer.uint32(26).fork()).ldelim();
        }
        if (message.num_txs !== 0) {
            writer.uint32(32).int64(message.num_txs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseBlockMeta };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.block_id = BlockID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.block_size = longToNumber(reader.int64());
                    break;
                case 3:
                    message.header = Header.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.num_txs = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseBlockMeta };
        if (object.block_id !== undefined && object.block_id !== null) {
            message.block_id = BlockID.fromJSON(object.block_id);
        }
        else {
            message.block_id = undefined;
        }
        if (object.block_size !== undefined && object.block_size !== null) {
            message.block_size = Number(object.block_size);
        }
        else {
            message.block_size = 0;
        }
        if (object.header !== undefined && object.header !== null) {
            message.header = Header.fromJSON(object.header);
        }
        else {
            message.header = undefined;
        }
        if (object.num_txs !== undefined && object.num_txs !== null) {
            message.num_txs = Number(object.num_txs);
        }
        else {
            message.num_txs = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.block_id !== undefined &&
            (obj.block_id = message.block_id
                ? BlockID.toJSON(message.block_id)
                : undefined);
        message.block_size !== undefined && (obj.block_size = message.block_size);
        message.header !== undefined &&
            (obj.header = message.header ? Header.toJSON(message.header) : undefined);
        message.num_txs !== undefined && (obj.num_txs = message.num_txs);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseBlockMeta };
        if (object.block_id !== undefined && object.block_id !== null) {
            message.block_id = BlockID.fromPartial(object.block_id);
        }
        else {
            message.block_id = undefined;
        }
        if (object.block_size !== undefined && object.block_size !== null) {
            message.block_size = object.block_size;
        }
        else {
            message.block_size = 0;
        }
        if (object.header !== undefined && object.header !== null) {
            message.header = Header.fromPartial(object.header);
        }
        else {
            message.header = undefined;
        }
        if (object.num_txs !== undefined && object.num_txs !== null) {
            message.num_txs = object.num_txs;
        }
        else {
            message.num_txs = 0;
        }
        return message;
    },
};
const baseTxProof = {};
export const TxProof = {
    encode(message, writer = Writer.create()) {
        if (message.root_hash.length !== 0) {
            writer.uint32(10).bytes(message.root_hash);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (message.proof !== undefined) {
            Proof.encode(message.proof, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTxProof };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.root_hash = reader.bytes();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                case 3:
                    message.proof = Proof.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseTxProof };
        if (object.root_hash !== undefined && object.root_hash !== null) {
            message.root_hash = bytesFromBase64(object.root_hash);
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = Proof.fromJSON(object.proof);
        }
        else {
            message.proof = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.root_hash !== undefined &&
            (obj.root_hash = base64FromBytes(message.root_hash !== undefined ? message.root_hash : new Uint8Array()));
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.proof !== undefined &&
            (obj.proof = message.proof ? Proof.toJSON(message.proof) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseTxProof };
        if (object.root_hash !== undefined && object.root_hash !== null) {
            message.root_hash = object.root_hash;
        }
        else {
            message.root_hash = new Uint8Array();
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = new Uint8Array();
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = Proof.fromPartial(object.proof);
        }
        else {
            message.proof = undefined;
        }
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
const atob = globalThis.atob ||
    ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa ||
    ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (let i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(""));
}
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
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
