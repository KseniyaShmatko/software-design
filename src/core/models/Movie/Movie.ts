export class Movie {
    constructor (
        readonly id: number,
        readonly name: string,
        readonly description: string,
        readonly country: string,
        readonly release: Date,
        readonly photo: string,
        readonly trailer: string,
    ) {}
}