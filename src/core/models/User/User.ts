export class User {
    constructor (
        readonly id: number,
        readonly name: string,
        readonly surname: string,
        readonly registration: Date,
        readonly login: string,
        readonly password: string,
        readonly role: string,
    ) {}
}