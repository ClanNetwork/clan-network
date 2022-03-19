import { Writer, Reader } from "protobufjs/minimal";
import { PublicKey } from "../../tendermint/crypto/keys";
export declare const protobufPackage = "tendermint.types";
export interface ValidatorSet {
    validators: Validator[];
    proposer: Validator | undefined;
    total_voting_power: number;
}
export interface Validator {
    address: Uint8Array;
    pub_key: PublicKey | undefined;
    voting_power: number;
    proposer_priority: number;
}
export interface SimpleValidator {
    pub_key: PublicKey | undefined;
    voting_power: number;
}
export declare const ValidatorSet: {
    encode(message: ValidatorSet, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): ValidatorSet;
    fromJSON(object: any): ValidatorSet;
    toJSON(message: ValidatorSet): unknown;
    fromPartial(object: DeepPartial<ValidatorSet>): ValidatorSet;
};
export declare const Validator: {
    encode(message: Validator, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): Validator;
    fromJSON(object: any): Validator;
    toJSON(message: Validator): unknown;
    fromPartial(object: DeepPartial<Validator>): Validator;
};
export declare const SimpleValidator: {
    encode(message: SimpleValidator, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): SimpleValidator;
    fromJSON(object: any): SimpleValidator;
    toJSON(message: SimpleValidator): unknown;
    fromPartial(object: DeepPartial<SimpleValidator>): SimpleValidator;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
