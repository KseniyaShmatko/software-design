import { MovieUser } from "../../models/Relation/MovieUser";
import { AddMovieUserDto, UpdateMovieUserDto} from "./MovieUserDto";
import { Repository } from "../IRepository";

export interface MovieUserRepository extends Repository<MovieUser, AddMovieUserDto> {
    getByMovieId(movie_id: number): Promise<MovieUser[]>;
    getByUserId(user_id: number): Promise<MovieUser[]>;
    update(dto: UpdateMovieUserDto, id: number): Promise<MovieUser>;
    // getMark(id: number): Promise<number | null>;
}