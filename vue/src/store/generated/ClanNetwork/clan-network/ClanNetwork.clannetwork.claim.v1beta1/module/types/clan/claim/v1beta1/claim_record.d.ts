import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";
export declare enum Action {
    ActionInitialClaim = 0,
    ActionVote = 1,
    ActionDelegateStake = 2,
    TBD1 = 3,
    TBD2 = 4,
    UNRECOGNIZED = -1
}
export declare function actionFromJSON(object: any): Action;
export declare function actionToJSON(object: Action): string;
export interface ClaimRecord {
    /** address of claim user */
    address: string;
    /** total initial claimable amount for the user */
    initialClaimableAmount: Coin[];
    /**
     * true if action is completed
     * index of bool in array refers to action enum #
     */
    actionCompleted: boolean[];
}
export declare const ClaimRecord: {
    encode(message: ClaimRecord, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): ClaimRecord;
    fromJSON(object: any): ClaimRecord;
    toJSON(message: ClaimRecord): unknown;
    fromPartial(object: DeepPartial<ClaimRecord>): ClaimRecord;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
