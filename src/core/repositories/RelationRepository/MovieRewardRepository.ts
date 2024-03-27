import { MovieReward } from "../../models/Relation/MovieReward";
import { AddMovieRewardDto } from "./MovieRewardDto";
import { Repository } from "../Repository";

export interface MovieRewardRepository extends Repository<MovieReward, AddMovieRewardDto> {
    getByMovieId(movie_id: number): MovieReward[];
    getByRewardId(reward_id: number): MovieReward[];
}