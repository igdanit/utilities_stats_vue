export class Singleton {
    private static _instance: any;

    protected constructor(...args: any[]) {}

    static instance(...args: any[]) {
        if (this._instance === undefined) {
            this._instance = new this(...args);
        }
    }
}