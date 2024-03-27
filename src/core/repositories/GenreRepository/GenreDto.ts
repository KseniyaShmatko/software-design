export class GenreDto {
    constructor(
        readonly name: string,
        readonly description: string,
    ) {}
}

export class AddGenreDto extends GenreDto {
    constructor(genreDto: GenreDto) {
        super(genreDto.name, genreDto.description);
    }
}

export class UpdateGenreDto extends GenreDto {
    constructor(genreDto: GenreDto) {
        super(genreDto.name, genreDto.description);
    }
}