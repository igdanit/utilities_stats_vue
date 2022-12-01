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


