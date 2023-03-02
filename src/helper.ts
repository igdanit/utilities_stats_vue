
export function getHash(hashable: Hashable): Hashable {
    return hashable 
}

type Hashable = 
    | string

// // Collection of VUE refs. Which contains only one true value.
// export function truthSpring() {
//     return new Proxy({}, {
//         get(target, prop, receiver) {
//             return target[prop];
//         },

//         set(target, prop, value) {
//             if (!value) throw new Error("Only true value allowed.");

//             // Check whether property already exist.
//             if (!target[prop]) {target[prop]=value};

//             const keys = Reflect.ownKeys(target);
//             keys.forEach((propertyKey) => {
//                 const ref = target[propertyKey];
//                 ref.value = false;
//             });
//             const ref = target[prop];
//             ref.value = true;
//         }
//     })
// }
