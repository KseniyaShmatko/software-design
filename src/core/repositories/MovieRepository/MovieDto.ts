export class MovieDto {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly country: string,
        readonly release: Date,
        readonly photo: string,
        readonly trailer: string
    ) {}
}

export class AddMovieDto extends MovieDto {
    constructor(movieDto: MovieDto) {
        super(movieDto.name, movieDto.description, movieDto.country, movieDto.release, movieDto.photo, movieDto.trailer);
    }
}

export class UpdateMovieDto extends MovieDto {
    constructor(movieDto: MovieDto) {
        super(movieDto.name, movieDto.description, movieDto.country, movieDto.release, movieDto.photo, movieDto.trailer);
    }
}