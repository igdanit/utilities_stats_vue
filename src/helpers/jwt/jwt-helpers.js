import { attachJWTtoAxios,saveJWTasACCESS_TOKEN } from './jwt-localStorage'
import CONSTANTS from "../../constants";

// Request decorator. Send request to reload JWT from original request.
export function updateJWT(func = ()=>{}) {

    return async function(...args) {
        const axios = attachJWTtoAxios(CONSTANTS.ACCESS_TOKEN_NAME);
        const response = await axios.get('/api/auth/update-jwt');
        saveJWTasACCESS_TOKEN(response.data.access_token)
        func(...args)
    }
}

export async function isJWTvalid() {
    const axios = attachJWTtoAxios(CONSTANTS.ACCESS_TOKEN_NAME);
    const response = await axios.get('api/auth/update-jwt')
}