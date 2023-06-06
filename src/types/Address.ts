export interface IAddress {
    id: number,
    address: string,
    userID: number
}

export type AddressID = string;

// interface ISelect {
//     data: string,
//     id: number
// }

// interface IAddresseList {

//     delete(id: number): void;

//     push(address: IAddress): void;
// }

// export class Address implements ISelect, IAddress {
//     constructor(public address: string, public readonly id: number, readonly userID: number) {}

//     get data() {
//         return this.address
//     }

//     set data(newAddress: string) {
//         this.address = newAddress;
//     }
// }

// export class AddressesList implements IAddresseList{

//     public addressList: Map<number, Address>;

//     constructor() {
//         this.addressList = new Map();
//     }

//     delete(id: number): void {
//         if (this.addressList.size === 0) throw new Error(`${this} doesn't have any value`);
//         if (!this.addressList.delete(id)) throw new Error(`${id} key-value pair doesn't exist`);
//     }

//     push(address: Address) {
//         this.addressList.set(address.id, address);
//     }

//     values() {
//         return this.addressList.values()
//     }


//     get [Symbol.toStringTag]() {
//         return 'AddressesList'
//     }
// }