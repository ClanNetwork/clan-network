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
export var TypesBlockIDFlag;
(function (TypesBlockIDFlag) {
    TypesBlockIDFlag["BLOCK_ID_FLAG_UNKNOWN"] = "BLOCK_ID_FLAG_UNKNOWN";
    TypesBlockIDFlag["BLOCK_ID_FLAG_ABSENT"] = "BLOCK_ID_FLAG_ABSENT";
    TypesBlockIDFlag["BLOCK_ID_FLAG_COMMIT"] = "BLOCK_ID_FLAG_COMMIT";
    TypesBlockIDFlag["BLOCK_ID_FLAG_NIL"] = "BLOCK_ID_FLAG_NIL";
})(TypesBlockIDFlag || (TypesBlockIDFlag = {}));
/**
* SignedMsgType is a type of signed message in the consensus.

 - SIGNED_MSG_TYPE_PREVOTE: Votes
 - SIGNED_MSG_TYPE_PROPOSAL: Proposals
*/
export var TypesSignedMsgType;
(function (TypesSignedMsgType) {
    TypesSignedMsgType["SIGNED_MSG_TYPE_UNKNOWN"] = "SIGNED_MSG_TYPE_UNKNOWN";
    TypesSignedMsgType["SIGNED_MSG_TYPE_PREVOTE"] = "SIGNED_MSG_TYPE_PREVOTE";
    TypesSignedMsgType["SIGNED_MSG_TYPE_PRECOMMIT"] = "SIGNED_MSG_TYPE_PRECOMMIT";
    TypesSignedMsgType["SIGNED_MSG_TYPE_PROPOSAL"] = "SIGNED_MSG_TYPE_PROPOSAL";
})(TypesSignedMsgType || (TypesSignedMsgType = {}));
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
 * @title cosmos/base/tendermint/v1beta1/query.proto
 * @version version not set
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetLatestBlock
         * @summary GetLatestBlock returns the latest block.
         * @request GET:/cosmos/base/tendermint/v1beta1/blocks/latest
         */
        this.serviceGetLatestBlock = (params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/blocks/latest`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetBlockByHeight
         * @summary GetBlockByHeight queries block for given height.
         * @request GET:/cosmos/base/tendermint/v1beta1/blocks/{height}
         */
        this.serviceGetBlockByHeight = (height, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/blocks/${height}`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetNodeInfo
         * @summary GetNodeInfo queries the current node info.
         * @request GET:/cosmos/base/tendermint/v1beta1/node_info
         */
        this.serviceGetNodeInfo = (params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/node_info`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetSyncing
         * @summary GetSyncing queries node syncing.
         * @request GET:/cosmos/base/tendermint/v1beta1/syncing
         */
        this.serviceGetSyncing = (params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/syncing`,
            method: "GET",
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetLatestValidatorSet
         * @summary GetLatestValidatorSet queries latest validator-set.
         * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/latest
         */
        this.serviceGetLatestValidatorSet = (query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/validatorsets/latest`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetValidatorSetByHeight
         * @summary GetValidatorSetByHeight queries validator-set at a given height.
         * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/{height}
         */
        this.serviceGetValidatorSetByHeight = (height, query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/validatorsets/${height}`,
            method: "GET",
            query: query,
            format: "json",
            ...params,
        });
    }
}
