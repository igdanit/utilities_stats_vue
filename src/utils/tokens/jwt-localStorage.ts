import CONSTANTS from '../../constants';

/**
 * Delete jwt from window.localStorage
 */
export function deleteAccessToken(): void {
    window.localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
}

/**
 * @returns jwt token or null
 */
export function extractAccessToken(): string | null {
    return window.localStorage.getItem(CONSTANTS.ACCESS_TOKEN)
}