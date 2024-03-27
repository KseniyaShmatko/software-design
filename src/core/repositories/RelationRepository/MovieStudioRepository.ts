import { MovieStudio } from "../../models/Relation/MovieStudio";
import { AddMovieStudioDto } from "./MovieStudioDto";
import { Repository } from "../Repository";

export interface MovieStudioRepository extends Repository<MovieStudio, AddMovieStudioDto> {
    getByMovieId(movie_id: number): MovieStudio[];
    getByStudioId(studio_id: number): MovieStudio[];
}