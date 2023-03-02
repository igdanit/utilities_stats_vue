import { Singleton } from "../patterns";
import type { IToken } from "./jwt";


export class TokenService extends Singleton implements ITokenService {
    protected readonly tokensCollection: Map<string, IToken>

    protected constructor() {
        super();
        this.tokensCollection = new Map();
    }
    
    getToken(tokenName: string) {
        return this.tokensCollection.get(tokenName) || null
    }

    setToken(tokenName: string, token: IToken) {
        this.tokensCollection.set(tokenName, token);
    }

}

export type TokenID = string

export interface ITokenService {
    getToken(token: TokenID): IToken | null,
    setToken(tokenName: TokenID, token: IToken): void,
}

export function updateStorage(tokenName: string, token: string): void {
        window.localStorage.setItem(tokenName, token)
    }