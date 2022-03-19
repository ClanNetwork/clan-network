import { Writer, Reader } from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.p2p";
export interface NetAddress {
    id: string;
    ip: string;
    port: number;
}
export interface ProtocolVersion {
    p2p: number;
    block: number;
    app: number;
}
export interface DefaultNodeInfo {
    protocol_version: ProtocolVersion | undefined;
    default_node_id: string;
    listen_addr: string;
    network: string;
    version: string;
    channels: Uint8Array;
    moniker: string;
    other: DefaultNodeInfoOther | undefined;
}
export interface DefaultNodeInfoOther {
    tx_index: string;
    rpc_address: string;
}
export declare const NetAddress: {
    encode(message: NetAddress, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): NetAddress;
    fromJSON(object: any): NetAddress;
    toJSON(message: NetAddress): unknown;
    fromPartial(object: DeepPartial<NetAddress>): NetAddress;
};
export declare const ProtocolVersion: {
    encode(message: ProtocolVersion, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): ProtocolVersion;
    fromJSON(object: any): ProtocolVersion;
    toJSON(message: ProtocolVersion): unknown;
    fromPartial(object: DeepPartial<ProtocolVersion>): ProtocolVersion;
};
export declare const DefaultNodeInfo: {
    encode(message: DefaultNodeInfo, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): DefaultNodeInfo;
    fromJSON(object: any): DefaultNodeInfo;
    toJSON(message: DefaultNodeInfo): unknown;
    fromPartial(object: DeepPartial<DefaultNodeInfo>): DefaultNodeInfo;
};
export declare const DefaultNodeInfoOther: {
    encode(message: DefaultNodeInfoOther, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): DefaultNodeInfoOther;
    fromJSON(object: any): DefaultNodeInfoOther;
    toJSON(message: DefaultNodeInfoOther): unknown;
    fromPartial(object: DeepPartial<DefaultNodeInfoOther>): DefaultNodeInfoOther;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
