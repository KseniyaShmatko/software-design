export class Studio {
    constructor (
        readonly id: number,
        readonly name: string,
        readonly founder: string,
        readonly country: string,
        readonly foundation: Date,
        readonly photo: string,
    ) {}
}