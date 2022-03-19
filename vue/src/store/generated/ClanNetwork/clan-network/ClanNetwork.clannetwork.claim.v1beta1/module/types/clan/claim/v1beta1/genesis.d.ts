import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "../../../clan/claim/v1beta1/params";
import { ClaimRecord } from "../../../clan/claim/v1beta1/claim_record";
import { ClaimEthRecord } from "../../../clan/claim/v1beta1/claim_eth_record";
import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";
/** GenesisState defines the claim module's genesis state. */
export interface GenesisState {
    /** balance of the claim module's account */
    moduleAccountBalance: Coin | undefined;
    /** params defines all the parameters of the module. */
    params: Params | undefined;
    /** list of claim records, one for every airdrop recipient */
    claimRecords: ClaimRecord[];
    /** list of claim records, one for every airdrop recipient */
    claimEthRecords: ClaimEthRecord[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial(object: DeepPartial<GenesisState>): GenesisState;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
