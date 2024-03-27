export class MovieGenreDto {
    constructor(
        readonly movie_id: number,
        readonly genre_id: number,
    ) {}
}

export class AddMovieGenreDto extends MovieGenreDto {
    constructor(movieGenre: MovieGenreDto) {
        super(movieGenre.movie_id, movieGenre.genre_id);
    }
}