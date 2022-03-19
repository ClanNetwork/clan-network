import { Action, ClaimRecord } from "../../../clan/claim/v1beta1/claim_record";
import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Params } from "../../../clan/claim/v1beta1/params";
import { ClaimEthRecord } from "../../../clan/claim/v1beta1/claim_eth_record";
export declare const protobufPackage = "ClanNetwork.clannetwork.claim.v1beta1";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryModuleAccountBalanceRequest {
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryModuleAccountBalanceResponse {
    /** params defines the parameters of the module. */
    moduleAccountBalance: Coin[];
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params defines the parameters of the module. */
    params: Params | undefined;
}
export interface QueryClaimRecordRequest {
    address: string;
}
export interface QueryClaimRecordResponse {
    claimRecord: ClaimRecord | undefined;
}
export interface QueryClaimableForActionRequest {
    address: string;
    action: Action;
}
export interface QueryClaimableForActionResponse {
    coins: Coin[];
}
export interface QueryTotalClaimableRequest {
    address: string;
}
export interface QueryTotalClaimableResponse {
    coins: Coin[];
}
export interface QueryClaimEthRecordRequest {
    address: string;
}
export interface QueryClaimEthRecordResponse {
    ClaimEthRecord: ClaimEthRecord | undefined;
}
export declare const QueryModuleAccountBalanceRequest: {
    encode(_: QueryModuleAccountBalanceRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryModuleAccountBalanceRequest;
    fromJSON(_: any): QueryModuleAccountBalanceRequest;
    toJSON(_: QueryModuleAccountBalanceRequest): unknown;
    fromPartial(_: DeepPartial<QueryModuleAccountBalanceRequest>): QueryModuleAccountBalanceRequest;
};
export declare const QueryModuleAccountBalanceResponse: {
    encode(message: QueryModuleAccountBalanceResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryModuleAccountBalanceResponse;
    fromJSON(object: any): QueryModuleAccountBalanceResponse;
    toJSON(message: QueryModuleAccountBalanceResponse): unknown;
    fromPartial(object: DeepPartial<QueryModuleAccountBalanceResponse>): QueryModuleAccountBalanceResponse;
};
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse;
};
export declare const QueryClaimRecordRequest: {
    encode(message: QueryClaimRecordRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryClaimRecordRequest;
    fromJSON(object: any): QueryClaimRecordRequest;
    toJSON(message: QueryClaimRecordRequest): unknown;
    fromPartial(object: DeepPartial<QueryClaimRecordRequest>): QueryClaimRecordRequest;
};
export declare const QueryClaimRecordResponse: {
    encode(message: QueryClaimRecordResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryClaimRecordResponse;
    fromJSON(object: any): QueryClaimRecordResponse;
    toJSON(message: QueryClaimRecordResponse): unknown;
    fromPartial(object: DeepPartial<QueryClaimRecordResponse>): QueryClaimRecordResponse;
};
export declare const QueryClaimableForActionRequest: {
    encode(message: QueryClaimableForActionRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryClaimableForActionRequest;
    fromJSON(object: any): QueryClaimableForActionRequest;
    toJSON(message: QueryClaimableForActionRequest): unknown;
    fromPartial(object: DeepPartial<QueryClaimableForActionRequest>): QueryClaimableForActionRequest;
};
export declare const QueryClaimableForActionResponse: {
    encode(message: QueryClaimableForActionResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryClaimableForActionResponse;
    fromJSON(object: any): QueryClaimableForActionResponse;
    toJSON(message: QueryClaimableForActionResponse): unknown;
    fromPartial(object: DeepPartial<QueryClaimableForActionResponse>): QueryClaimableForActionResponse;
};
export declare const QueryTotalClaimableRequest: {
    encode(message: QueryTotalClaimableRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryTotalClaimableRequest;
    fromJSON(object: any): QueryTotalClaimableRequest;
    toJSON(message: QueryTotalClaimableRequest): unknown;
    fromPartial(object: DeepPartial<QueryTotalClaimableRequest>): QueryTotalClaimableRequest;
};
export declare const QueryTotalClaimableResponse: {
    encode(message: QueryTotalClaimableResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryTotalClaimableResponse;
    fromJSON(object: any): QueryTotalClaimableResponse;
    toJSON(message: QueryTotalClaimableResponse): unknown;
    fromPartial(object: DeepPartial<QueryTotalClaimableResponse>): QueryTotalClaimableResponse;
};
export declare const QueryClaimEthRecordRequest: {
    encode(message: QueryClaimEthRecordRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryClaimEthRecordRequest;
    fromJSON(object: any): QueryClaimEthRecordRequest;
    toJSON(message: QueryClaimEthRecordRequest): unknown;
    fromPartial(object: DeepPartial<QueryClaimEthRecordRequest>): QueryClaimEthRecordRequest;
};
export declare const QueryClaimEthRecordResponse: {
    encode(message: QueryClaimEthRecordResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryClaimEthRecordResponse;
    fromJSON(object: any): QueryClaimEthRecordResponse;
    toJSON(message: QueryClaimEthRecordResponse): unknown;
    fromPartial(object: DeepPartial<QueryClaimEthRecordResponse>): QueryClaimEthRecordResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    ModuleAccountBalance(request: QueryModuleAccountBalanceRequest): Promise<QueryModuleAccountBalanceResponse>;
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    ClaimRecord(request: QueryClaimRecordRequest): Promise<QueryClaimRecordResponse>;
    ClaimableForAction(request: QueryClaimableForActionRequest): Promise<QueryClaimableForActionResponse>;
    TotalClaimable(request: QueryTotalClaimableRequest): Promise<QueryTotalClaimableResponse>;
    /** Queries a ClaimEthRecord by index. */
    ClaimEthRecord(request: QueryClaimEthRecordRequest): Promise<QueryClaimEthRecordResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    ModuleAccountBalance(request: QueryModuleAccountBalanceRequest): Promise<QueryModuleAccountBalanceResponse>;
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    ClaimRecord(request: QueryClaimRecordRequest): Promise<QueryClaimRecordResponse>;
    ClaimableForAction(request: QueryClaimableForActionRequest): Promise<QueryClaimableForActionResponse>;
    TotalClaimable(request: QueryTotalClaimableRequest): Promise<QueryTotalClaimableResponse>;
    ClaimEthRecord(request: QueryClaimEthRecordRequest): Promise<QueryClaimEthRecordResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
