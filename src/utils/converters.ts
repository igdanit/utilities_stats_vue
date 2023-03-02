export type Base64URL = string;
export type Base64 = string;

export function Base64URLtoBase64(data: Base64URL): Base64 {
    return data.replace(/-/g, '+').replace(/_/, '/') 
}