/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
/**
* BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC method.

 - BROADCAST_MODE_UNSPECIFIED: zero-value for mode ordering
 - BROADCAST_MODE_BLOCK: BROADCAST_MODE_BLOCK defines a tx broadcasting mode where the client waits for
the tx to be committed in a block.
 - BROADCAST_MODE_SYNC: BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits for
a CheckTx execution response only.
 - BROADCAST_MODE_ASYNC: BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client returns
immediately.
*/
export var V1Beta1BroadcastMode;
(function (V1Beta1BroadcastMode) {
    V1Beta1BroadcastMode["BROADCAST_MODE_UNSPECIFIED"] = "BROADCAST_MODE_UNSPECIFIED";
    V1Beta1BroadcastMode["BROADCAST_MODE_BLOCK"] = "BROADCAST_MODE_BLOCK";
    V1Beta1BroadcastMode["BROADCAST_MODE_SYNC"] = "BROADCAST_MODE_SYNC";
    V1Beta1BroadcastMode["BROADCAST_MODE_ASYNC"] = "BROADCAST_MODE_ASYNC";
})(V1Beta1BroadcastMode || (V1Beta1BroadcastMode = {}));
/**
* - ORDER_BY_UNSPECIFIED: ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults to ASC in this case.
 - ORDER_BY_ASC: ORDER_BY_ASC defines ascending order
 - ORDER_BY_DESC: ORDER_BY_DESC defines descending order
*/
export var V1Beta1OrderBy;
(function (V1Beta1OrderBy) {
    V1Beta1OrderBy["ORDER_BY_UNSPECIFIED"] = "ORDER_BY_UNSPECIFIED";
    V1Beta1OrderBy["ORDER_BY_ASC"] = "ORDER_BY_ASC";
    V1Beta1OrderBy["ORDER_BY_DESC"] = "ORDER_BY_DESC";
})(V1Beta1OrderBy || (V1Beta1OrderBy = {}));
/**
* SignMode represents a signing mode with its own security guarantees.

 - SIGN_MODE_UNSPECIFIED: SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
rejected
 - SIGN_MODE_DIRECT: SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
verified with raw bytes from Tx
 - SIGN_MODE_TEXTUAL: SIGN_MODE_TEXTUAL is a future signing mode that will verify some
human-readable textual representation on top of the binary representation
from SIGN_MODE_DIRECT
 - SIGN_MODE_LEGACY_AMINO_JSON: SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
Amino JSON and will be removed in the future
*/
export var V1Beta1SignMode;
(function (V1Beta1SignMode) {
    V1Beta1SignMode["SIGN_MODE_UNSPECIFIED"] = "SIGN_MODE_UNSPECIFIED";
    V1Beta1SignMode["SIGN_MODE_DIRECT"] = "SIGN_MODE_DIRECT";
    V1Beta1SignMode["SIGN_MODE_TEXTUAL"] = "SIGN_MODE_TEXTUAL";
    V1Beta1SignMode["SIGN_MODE_LEGACY_AMINO_JSON"] = "SIGN_MODE_LEGACY_AMINO_JSON";
})(V1Beta1SignMode || (V1Beta1SignMode = {}));
export var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType || (ContentType = {}));
export class HttpClient {
    constructor(apiConfig = {}) {
        this.baseUrl = "";
        this.securityData = null;
        this.securityWorker = null;
        this.abortControllers = new Map();
        this.baseApiParams = {
            credentials: "same-origin",
            headers: {},
            redirect: "follow",
            referrerPolicy: "no-referrer",
        };
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.contentFormatters = {
            [ContentType.Json]: (input) => input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
            [ContentType.FormData]: (input) => Object.keys(input || {}).reduce((data, key) => {
                data.append(key, input[key]);
                return data;
            }, new FormData()),
            [ContentType.UrlEncoded]: (input) => this.toQueryString(input),
        };
        this.createAbortSignal = (cancelToken) => {
            if (this.abortControllers.has(cancelToken)) {
                const abortController = this.abortControllers.get(cancelToken);
                if (abortController) {
                    return abortController.signal;
                }
                return void 0;
            }
            const abortController = new AbortController();
            this.abortControllers.set(cancelToken, abortController);
            return abortController.signal;
        };
        this.abortRequest = (cancelToken) => {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                abortController.abort();
                this.abortControllers.delete(cancelToken);
            }
        };
        this.request = ({ body, secure, path, type, query, format = "json", baseUrl, cancelToken, ...params }) => {
            const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const queryString = query && this.toQueryString(query);
            const payloadFormatter = this.contentFormatters[type || ContentType.Json];
            return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
                ...requestParams,
                headers: {
                    ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
                    ...(requestParams.headers || {}),
                },
                signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
                body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
            }).then(async (response) => {
                const r = response;
                r.data = null;
                r.error = null;
                const data = await response[format]()
                    .then((data) => {
                    if (r.ok) {
                        r.data = data;
                    }
                    else {
                        r.error = data;
                    }
                    return r;
                })
                    .catch((e) => {
                    r.error = e;
                    return r;
                });
                if (cancelToken) {
                    this.abortControllers.delete(cancelToken);
                }
                if (!response.ok)
                    throw data;
                return data;
            });
        };
        Object.assign(this, apiConfig);
    }
    addQueryParam(query, key) {
        const value = query[key];
        return (encodeURIComponent(key) +
            "=" +
            encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`));
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => typeof query[key] === "object" && !Array.isArray(query[key])
            ? this.toQueryString(query[key])
            : this.addQueryParam(query, key))
            .join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    mergeRequestParams(params1, params2) {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }
}
/**
 * @title cosmos/tx/v1beta1/service.proto
 * @version version not set
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Service
         * @name ServiceSimulate
         * @summary Simulate simulates executing a transaction for estimating gas usage.
         * @request POST:/cosmos/tx/v1beta1/simulate
         */
        this.serviceSimulate = (body, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/simulate`,
            method: "POST",
            body: body,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetTxsEvent
         * @summary GetTxsEvent fetches txs by event.
         * @request GET:/cosmos/tx/v1beta1/txs
         */
        this.serviceGetTxsEvent = (query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/txs`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceBroadcastTx
         * @summary BroadcastTx broadcast transaction.
         * @request POST:/cosmos/tx/v1beta1/txs
         */
        this.serviceBroadcastTx = (body, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/txs`,
            method: "POST",
            body: body,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetTx
         * @summary GetTx fetches a tx by hash.
         * @request GET:/cosmos/tx/v1beta1/txs/{hash}
         */
        this.serviceGetTx = (hash, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/txs/${hash}`,
            method: "GET",
            format: "json",
            ...params,
        });
    }
}
