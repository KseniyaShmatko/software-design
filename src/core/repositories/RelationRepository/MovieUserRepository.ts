import { MovieUser } from "../../models/Relation/MovieUser";
import { AddMovieUserDto, UpdateMovieUserDto} from "./MovieUserDto";
import { Repository } from "../Repository";

export interface MovieUserRepository extends Repository<MovieUser, AddMovieUserDto> {
    getByMovieId(movie_id: number): MovieUser[];
    getByUserId(user_id: number): MovieUser[];
    update(dto: UpdateMovieUserDto): MovieUser;
}