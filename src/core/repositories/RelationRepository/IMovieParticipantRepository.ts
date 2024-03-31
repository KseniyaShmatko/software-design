import { MovieParticipant } from "../../models/Relation/MovieParticipant";
import { AddMovieParticipantDto, UpdateMovieParticipantDto} from "./MovieParticipantDto";
import { Repository } from "../IRepository";

export interface MovieParticipantRepository extends Repository<MovieParticipant, AddMovieParticipantDto> {
    getByMovieId(movie_id: number): MovieParticipant[];
    getByParticipantId(participant_id: number): MovieParticipant[];
    update(dto: UpdateMovieParticipantDto): MovieParticipant;
}