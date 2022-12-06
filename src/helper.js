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


// Collection of VUE refs. Which contains only one true value.
export function truthSpring() {
    return new Proxy({}, {
        get(target, prop, receiver) {
            return target[prop];
        },

        set(target, prop, value) {
            if (!value) throw new Error("Only true value allowed.");

            // Check whether property already exist.
            if (!target[prop]) {target[prop]=value};

            const keys = Reflect.ownKeys(target);
            keys.forEach((propertyKey) => {
                const ref = target[propertyKey];
                ref.value = false;
            });
            const ref = target[prop];
            ref.value = true;
        }
    })
}
