import { MovieGenre } from "../../models/Relation/MovieGenre";
import { AddMovieGenreDto } from "./MovieGenreDto";
import { Repository } from "../IRepository";

export interface MovieGenreRepository extends Repository<MovieGenre, AddMovieGenreDto> {
    getByMovieId(movie_id: number): Promise<MovieGenre[]>;
    getByGenreId(genre_id: number): Promise<MovieGenre[]>;
}