import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
export declare const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";
export interface MsgInitialClaim {
    creator: string;
}
export interface MsgInitialClaimResponse {
    claimedAmount: Coin[];
}
export interface MsgClaimFroEthAddress {
    creator: string;
    message: string;
    signature: string;
}
export interface MsgClaimFroEthAddressResponse {
    claimedAmount: Coin[];
}
export declare const MsgInitialClaim: {
    encode(message: MsgInitialClaim, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgInitialClaim;
    fromJSON(object: any): MsgInitialClaim;
    toJSON(message: MsgInitialClaim): unknown;
    fromPartial(object: DeepPartial<MsgInitialClaim>): MsgInitialClaim;
};
export declare const MsgInitialClaimResponse: {
    encode(message: MsgInitialClaimResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgInitialClaimResponse;
    fromJSON(object: any): MsgInitialClaimResponse;
    toJSON(message: MsgInitialClaimResponse): unknown;
    fromPartial(object: DeepPartial<MsgInitialClaimResponse>): MsgInitialClaimResponse;
};
export declare const MsgClaimFroEthAddress: {
    encode(message: MsgClaimFroEthAddress, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgClaimFroEthAddress;
    fromJSON(object: any): MsgClaimFroEthAddress;
    toJSON(message: MsgClaimFroEthAddress): unknown;
    fromPartial(object: DeepPartial<MsgClaimFroEthAddress>): MsgClaimFroEthAddress;
};
export declare const MsgClaimFroEthAddressResponse: {
    encode(message: MsgClaimFroEthAddressResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgClaimFroEthAddressResponse;
    fromJSON(object: any): MsgClaimFroEthAddressResponse;
    toJSON(message: MsgClaimFroEthAddressResponse): unknown;
    fromPartial(object: DeepPartial<MsgClaimFroEthAddressResponse>): MsgClaimFroEthAddressResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    InitialClaim(request: MsgInitialClaim): Promise<MsgInitialClaimResponse>;
    /** this line is used by starport scaffolding # proto/tx/rpc */
    ClaimFroEthAddress(request: MsgClaimFroEthAddress): Promise<MsgClaimFroEthAddressResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    InitialClaim(request: MsgInitialClaim): Promise<MsgInitialClaimResponse>;
    ClaimFroEthAddress(request: MsgClaimFroEthAddress): Promise<MsgClaimFroEthAddressResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
