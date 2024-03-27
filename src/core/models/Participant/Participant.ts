export class Participant {
    constructor (
        readonly id: number,
        readonly name: string,
        readonly surname: string,
        readonly birth: Date,
        readonly death: Date | null,
        readonly photo: string,
    ) {}
}