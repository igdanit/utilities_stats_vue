import axios from 'axios';
import CONSTANTS from '../../constants';

export function attachJWTtoAxios(JWTkey = CONSTANTS.ACCESS_TOKEN_NAME) {
    const axiosInstance = axios.create()
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage[JWTkey]}`

    return axiosInstance
}

export function deleteJWT() {
    window.localStorage.removeItem(CONSTANTS.ACCESS_TOKEN_NAME);
}

export function extractUserIDfromJWT() {
    const payload = getJWTpayload(extractJWT(CONSTANTS.ACCESS_TOKEN_NAME));
    return payload.sub
}

function extractJWT(key) {
    return window.localStorage.getItem(key)
}

function getJWTpayload(jwt, decoded = true) {
    let payload = jwt.split('.')[1];
    if (decoded) {
        payload = JSON.parse(atob(payload));
    }
    return payload
}

function saveJWTtoLocalStorage(alias, jwt) {
    window.localStorage.setItem(alias, jwt)
}

export function saveJWTasACCESS_TOKEN(jwt) {
    saveJWTtoLocalStorage(CONSTANTS.ACCESS_TOKEN_NAME, jwt)
}