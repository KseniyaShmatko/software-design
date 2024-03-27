export class MovieStudioDto {
    constructor(
        readonly movie_id: number,
        readonly studio_id: number,
    ) {}
}

export class AddMovieStudioDto extends MovieStudioDto {
    constructor(movieStudio: MovieStudioDto) {
        super(movieStudio.movie_id, movieStudio.studio_id);
    }
}