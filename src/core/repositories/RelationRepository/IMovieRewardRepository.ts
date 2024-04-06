import { MovieReward } from "../../models/Relation/MovieReward";
import { AddMovieRewardDto } from "./MovieRewardDto";
import { Repository } from "../IRepository";

export interface MovieRewardRepository extends Repository<MovieReward, AddMovieRewardDto> {
    getByMovieId(movie_id: number): Promise<MovieReward[]>;
    getByRewardId(reward_id: number): Promise<MovieReward[]>;
}