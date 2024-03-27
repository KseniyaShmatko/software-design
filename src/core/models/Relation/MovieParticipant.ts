export class MovieParticipant {
    constructor (
        readonly id: number,
        readonly movie_id: number,
        readonly participant_id: number,
        readonly role: string,
    ) {}
}