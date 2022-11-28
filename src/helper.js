import axios from 'axios';

export function reactiveToPlain(obj) {
    for (let prop of Object.keys(obj)) {
        if (obj[prop] instanceof Object) {
            obj[prop] = obj[prop].value
        }
    }
    return obj
}  

export function getHash(hashable) {
    return hashable
}

export function extractJWTfromLocalStorage() {
    return window.ex
}

export function attachJWTtoAxios(JWTkey) {
    const axiosInstance = axios.create()
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage[JWTkey]}`

    return axiosInstance
}

export function extractUserIDfromJWT() {
    const payload = getJWTpayload(extractJWT('access_token'));
    return payload.sub
}

function extractJWT(key) {
    return window.localStorage[key]
}

function getJWTpayload(jwt, decoded = true) {
    let payload = jwt.split('.')[1];
    if (decoded) {
        payload = JSON.parse(atob(payload));
    }
    return payload
}