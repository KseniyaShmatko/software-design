import { MovieStudio } from "../../models/Relation/MovieStudio";
import { AddMovieStudioDto } from "./MovieStudioDto";
import { Repository } from "../IRepository";

export interface MovieStudioRepository extends Repository<MovieStudio, AddMovieStudioDto> {
    getByMovieId(movie_id: number): Promise<MovieStudio[]>;
    getByStudioId(studio_id: number): Promise<MovieStudio[]>;
}