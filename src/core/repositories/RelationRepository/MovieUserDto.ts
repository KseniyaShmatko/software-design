export class MovieUserDto {
    constructor(
        readonly mark: boolean,
    ) {}
}

export class AddMovieUserDto extends MovieUserDto {
    readonly movie_id: number;
    readonly user_id: number;
    constructor(movieUser: MovieUserDto, movie_id: number, user_id: number) {
        super(movieUser.mark);
        this.movie_id = movie_id;
        this.user_id = user_id;
    }
}

export class UpdateMovieUserDto extends MovieUserDto {
    constructor(movieUser: MovieUserDto) {
        super(movieUser.mark);
    }
}