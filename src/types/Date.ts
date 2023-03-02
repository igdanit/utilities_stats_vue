
interface IDate {
    day: number,
    month: number,
    year: number
}


export class DateOnly implements IDate{
    public day: number
    public month: number
    public year: number

    constructor(date: Date) {
        this.day = date.getDate()
        this.month = date.getMonth() + 1 // January gives 0
        this.year = date.getFullYear()
    }
}