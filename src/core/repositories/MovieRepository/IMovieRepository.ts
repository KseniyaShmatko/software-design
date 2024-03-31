import { Movie } from "../../models/Movie/Movie";
import { AddMovieDto, UpdateMovieDto } from "./MovieDto";
import { Repository } from "../IRepository";

export interface MovieRepository extends Repository<Movie, AddMovieDto>{
    getByName(name: string): Promise<Movie | null>;
    update(dto: UpdateMovieDto, id: number): Promise<Movie>;
}