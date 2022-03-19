import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";
export interface ClaimEthRecord {
    /** address of claim user */
    address: string;
    /** total initial claimable amount for the user */
    initialClaimableAmount: Coin[];
    /** true if action is completed */
    completed: boolean;
}
export declare const ClaimEthRecord: {
    encode(message: ClaimEthRecord, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): ClaimEthRecord;
    fromJSON(object: any): ClaimEthRecord;
    toJSON(message: ClaimEthRecord): unknown;
    fromPartial(object: DeepPartial<ClaimEthRecord>): ClaimEthRecord;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
