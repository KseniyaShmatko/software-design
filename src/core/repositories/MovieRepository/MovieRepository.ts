import { Movie } from "../../models/Movie/Movie";
import { AddMovieDto, UpdateMovieDto } from "./MovieDto";
import { Repository } from "../Repository";

export interface MovieRepository extends Repository<Movie, AddMovieDto>{
    getByName(name: string): Movie | null;
    update(dto: UpdateMovieDto): Movie;
    delete(id: number): void;
}
