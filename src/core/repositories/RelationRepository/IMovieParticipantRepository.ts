import { MovieParticipant } from "../../models/Relation/MovieParticipant";
import { AddMovieParticipantDto, UpdateMovieParticipantDto} from "./MovieParticipantDto";
import { Repository } from "../IRepository";

export interface MovieParticipantRepository extends Repository<MovieParticipant, AddMovieParticipantDto> {
    getByMovieId(movie_id: number): Promise<MovieParticipant[]>;
    getByParticipantId(participant_id: number): Promise<MovieParticipant[]>;
    update(dto: UpdateMovieParticipantDto, id: number): Promise<MovieParticipant>;
}