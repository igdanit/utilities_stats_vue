
/**
 * Wrapper for built-in fetch() function with retry ability.
 * Request will be repeated when status code not 2xx.
 */
export async function retryFetch(retryCount: number, ...fetchParams: Parameters<typeof fetch>): Promise<Response> {
    let response = await fetch(...fetchParams);
    retryCount = retryCount <= 1 ? 0: retryCount-1;
    for (let i = 0; i < retryCount; ++i) {
        response = await fetch(...fetchParams);
        if (response.ok) break // Redirect ????
    }
    return response
}


export function createBearerToken(token: string): string {
    return `Bearer ${token}`
}