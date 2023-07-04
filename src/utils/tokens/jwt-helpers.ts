import { updateStorage, type ITokenService, type TokenID } from "./service.token";
import { createBearerToken, retryFetch } from "../../http";
import TOKENS from "../../constants";

import type { IToken } from "./jwt";


/**
 * Send request to API for updated accessToken. 
 */
export async function updateAccessToken(token: IToken, retryCount: number = 3): Promise<Response> {
    return await retryFetch(
        retryCount,
        '/api/v1/auth/update-jwt',
        {
            method: 'GET',
            credentials: "same-origin", // Default value
            headers: {
                Authorization: createBearerToken(token.value)
            },
        }
    )
}

/**
 * Wrapper for request function.
 * Will update accessToken, if token exist, and send request concurrently.
 */
export function attachUpdateAccessToken(tokenService: ITokenService, tokenName: TokenID, retryCount: number = 3) {
    return function (func: Function) { // func is request function
        return async function(...args: any[]) { // args is request function args
            const token = tokenService.getToken(tokenName);
            if (token !== null) {
                updateAccessToken(token, retryCount) // Don't await. Make execution ahead
                .then(async (res) => {
                    if (res.ok) updateStorage(TOKENS.ACCESS_TOKEN, (await res.json()).accessToken)
                })
            } 
            return await func(...args)
        }
    }
}

export async function isAccessTokenValid(token: IToken) {
    const response = await updateAccessToken(token);
    if (response.status === 400) return true;
    return false;
}