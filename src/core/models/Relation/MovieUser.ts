export class MovieUser {
    constructor (
        readonly id: number,
        readonly movie_id: number,
        readonly user_id: number,
        readonly mark: boolean,
    ) {}
}