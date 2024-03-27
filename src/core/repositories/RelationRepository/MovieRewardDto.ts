export class MovieRewardDto {
    constructor(
        readonly movie_id: number,
        readonly reward_id: number,
    ) {}
}

export class AddMovieRewardDto extends MovieRewardDto {
    constructor(movieReward: MovieRewardDto) {
        super(movieReward.movie_id, movieReward.reward_id);
    }
}