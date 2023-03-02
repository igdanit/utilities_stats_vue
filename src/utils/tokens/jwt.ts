import { InvalidJWTError } from "./exceptions";
import type { JSONObject } from "../../types/json";
import { Base64URLtoBase64, type Base64URL } from "../converters";


export class JWT<T extends JSONObject, V extends JSONObject> implements IJWT<T> {

    protected readonly _payload: Base64URL;
    protected readonly _headers: Base64URL;
    protected readonly _signature: Base64URL;
    protected _payloadObj: T;
    protected _headersObj: V;

    constructor(protected _token: string) {
        this.validation(_token);
        [this._headers, this._payload, this._signature] = _token.split('.')
        this._payloadObj = JSON.parse(atob(Base64URLtoBase64(this._payload)));
        this._headersObj = JSON.parse(atob(Base64URLtoBase64(this._headers)));
    }

    // Validate JWT
    validation(token: string) {
        if (token === '') throw new InvalidJWTError(`JWT=${token} can't be empty`)
        
        const jwtClaims: string[] = token.split('.');
        if (jwtClaims.length != 3) throw new InvalidJWTError(`Invalid JWT=${token}`)
    }

    get value(): string {
        return this._token
    }

    get payload(): T {
        return this._payloadObj
    }
    
    get headers(): V {
        return this._headersObj
    }

    get signature(): Base64URL {
        return this._signature
    }

}

export interface IToken {
    readonly value: string
}

// Due to RFC7519(p.6 ch.3) JWT Claims represents by JSON object.
//   "The JSON object consists of zero or more name/value pairs 
//   (or members), where the names are strings and the values 
//   are arbitrary JSON values"
interface IJWT<T> extends IToken {
    readonly headers: JSONObject,
    readonly payload: JSONObject,
    readonly signature: string
}

export interface IJWTPayload {
    sub: number, // UserID
    iat: number, // Issued at, seconds of Unix epoch
    ext: number // Expiration at, seconds of Unix epoch
}

export interface IJWTHeaders {
    alg: string,
    typ: "JWT"
}