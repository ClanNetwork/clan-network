export interface ProtobufAny {
    "@type"?: string;
}
export interface RpcStatus {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: ProtobufAny[];
}
export declare enum V1Beta1Action {
    ActionInitialClaim = "ActionInitialClaim",
    ActionVote = "ActionVote",
    ActionDelegateStake = "ActionDelegateStake",
    TBD1 = "TBD1",
    TBD2 = "TBD2"
}
export interface V1Beta1ClaimEthRecord {
    address?: string;
    initialClaimableAmount?: V1Beta1Coin[];
    completed?: boolean;
}
export interface V1Beta1ClaimRecord {
    address?: string;
    initialClaimableAmount?: V1Beta1Coin[];
    actionCompleted?: boolean[];
}
/**
* Coin defines a token with a denomination and an amount.

NOTE: The amount field is an Int which implements the custom method
signatures required by gogoproto.
*/
export interface V1Beta1Coin {
    denom?: string;
    amount?: string;
}
export interface V1Beta1MsgClaimFroEthAddressResponse {
    claimedAmount?: V1Beta1Coin[];
}
export interface V1Beta1MsgInitialClaimResponse {
    claimedAmount?: V1Beta1Coin[];
}
/**
 * Params defines the claim module's parameters.
 */
export interface V1Beta1Params {
    airdropEnabled?: boolean;
    /** @format date-time */
    airdropStartTime?: string;
    durationUntilDecay?: string;
    durationOfDecay?: string;
    claimDenom?: string;
}
export interface V1Beta1QueryClaimEthRecordResponse {
    ClaimEthRecord?: V1Beta1ClaimEthRecord;
}
export interface V1Beta1QueryClaimRecordResponse {
    claimRecord?: V1Beta1ClaimRecord;
}
export interface V1Beta1QueryClaimableForActionResponse {
    coins?: V1Beta1Coin[];
}
/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface V1Beta1QueryModuleAccountBalanceResponse {
    /** params defines the parameters of the module. */
    moduleAccountBalance?: V1Beta1Coin[];
}
/**
 * QueryParamsResponse is the response type for the Query/Params RPC method.
 */
export interface V1Beta1QueryParamsResponse {
    /** params defines the parameters of the module. */
    params?: V1Beta1Params;
}
export interface V1Beta1QueryTotalClaimableResponse {
    coins?: V1Beta1Coin[];
}
export declare type QueryParamsType = Record<string | number, any>;
export declare type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: keyof Omit<Body, "body" | "bodyUsed">;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}
export declare type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
declare type CancelToken = Symbol | string | number;
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    private securityData;
    private securityWorker;
    private abortControllers;
    private baseApiParams;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType) => void;
    private addQueryParam;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    private contentFormatters;
    private mergeRequestParams;
    private createAbortSignal;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title clan/claim/v1beta1/claim_eth_record.proto
 * @version version not set
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryClaimEthRecord
     * @summary Queries a ClaimEthRecord by index.
     * @request GET:/clan/claim/v1beta1/claim_eth_record/{address}
     */
    queryClaimEthRecord: (address: string, params?: RequestParams) => Promise<HttpResponse<V1Beta1QueryClaimEthRecordResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryClaimRecord
     * @request GET:/clan/claim/v1beta1/claim_record/{address}
     */
    queryClaimRecord: (address: string, params?: RequestParams) => Promise<HttpResponse<V1Beta1QueryClaimRecordResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryClaimableForAction
     * @request GET:/clan/claim/v1beta1/claimable_for_action/{address}/{action}
     */
    queryClaimableForAction: (address: string, action: "ActionInitialClaim" | "ActionVote" | "ActionDelegateStake" | "TBD1" | "TBD2", params?: RequestParams) => Promise<HttpResponse<V1Beta1QueryClaimableForActionResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryModuleAccountBalance
     * @request GET:/clan/claim/v1beta1/module_account_balance
     */
    queryModuleAccountBalance: (params?: RequestParams) => Promise<HttpResponse<V1Beta1QueryModuleAccountBalanceResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/clan/claim/v1beta1/params
     */
    queryParams: (params?: RequestParams) => Promise<HttpResponse<V1Beta1QueryParamsResponse, RpcStatus>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryTotalClaimable
     * @request GET:/clan/claim/v1beta1/total_claimable/{address}
     */
    queryTotalClaimable: (address: string, params?: RequestParams) => Promise<HttpResponse<V1Beta1QueryTotalClaimableResponse, RpcStatus>>;
}
export {};
