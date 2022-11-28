interface IAddress {
    address: string,
    id: number
}

interface ISelect {
    data: string,
    id: number
}

export class Address implements ISelect, IAddress {
    constructor(public address: string, public readonly id: number) {}

    get data() {
        return this.address
    }

    set data(newAddress: string) {
        this.address = newAddress;
    }
}