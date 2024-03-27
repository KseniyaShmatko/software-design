export class Comment {
    constructor (
        readonly id: number,
        readonly content: string,
        readonly date: Date,
        readonly movie_id: number,
        readonly user_id: number,
    ) {}
}