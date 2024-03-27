export class MovieParticipantDto {
    constructor(
        readonly role: string,
    ) {}
}

export class AddMovieParticipantDto extends MovieParticipantDto {
    readonly movie_id: number;
    readonly participant_id: number;
    constructor(movieParticipant: MovieParticipantDto, movie_id: number, participant_id: number) {
        super(movieParticipant.role);
        this.movie_id = movie_id;
        this.participant_id = participant_id;
    }
}

export class UpdateMovieParticipantDto extends MovieParticipantDto {
    constructor(movieParticipant: MovieParticipantDto) {
        super(movieParticipant.role);
    }
}