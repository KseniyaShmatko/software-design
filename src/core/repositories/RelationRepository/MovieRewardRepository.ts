import { MovieReward } from "../../models/Relation/MovieReward";
import { AddMovieRewardDto } from "./MovieRewardDto";
import { MovieRewardRepository } from "./IMovieRewardRepository";
import { MovieRewardDB } from "../../../infrastructure/db/entities/entities";

class MovieRewardRepositorySQL implements MovieRewardRepository {
    async getById(id: number): Promise<MovieReward | null> {
        try {
            const movieRewardModel = await MovieRewardDB.findByPk(id);
            if (movieRewardModel) {
                const movieRewardData = movieRewardModel.toJSON();
                return new MovieReward(movieRewardData.id, movieRewardData.movie_id, movieRewardData.reward_id);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting movieReward by ID:", error);
            throw new Error("Failed to get movieReward by ID");
        }
    }

    async getAll(): Promise<MovieReward[]> {
        try {
            const movieRewardsModels = await MovieRewardDB.findAll();
            const movieRewardsData = movieRewardsModels.map(movieRewardModel => movieRewardModel.toJSON());
            const movieRewards = movieRewardsData.map(movieRewardData => new MovieReward(movieRewardData.id, movieRewardData.movie_id, movieRewardData.reward_id));
            return movieRewards;
        } catch (error) {
            console.error("Error occurred while getting all movieRewards:", error);
            throw new Error("Failed to get all movieRewards");
        }
    }

    async add(dto: AddMovieRewardDto): Promise<MovieReward> {
        try {
            const { movie_id, reward_id } = dto;
            const movieRewardModel = await MovieRewardDB.create({ movie_id, reward_id });
            const movieReward = movieRewardModel.toJSON();
            return new MovieReward(movieReward.id, movieReward.movie_id, movieReward.reward_id);
        } catch (error) {
            console.error("Error occurred while adding movieReward:", error);
            throw new Error("Failed to add movieReward");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await MovieRewardDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting movieReward:", error);
            throw new Error("Failed to delete movieReward");
        }
    }

    async getByMovieId(id: number): Promise<MovieReward[]> {
        try {
            const movieRewardsModels = await MovieRewardDB.findAll({ where: { movie_id: id } });
            const movieRewardsData = movieRewardsModels.map(movieRewardModel => movieRewardModel.toJSON());
            const movieRewards = movieRewardsData.map(movieRewardData => new MovieReward(movieRewardData.id, movieRewardData.movie_id, movieRewardData.reward_id));
            return movieRewards;
        } catch (error) {
            console.error("Error occurred while getting movieRewards by movie ID:", error);
            throw new Error("Failed to get movieRewards by movie ID");
        }
    }

    async getByRewardId(id: number): Promise<MovieReward[]> {
        try {
            const movieRewardsModels = await MovieRewardDB.findAll({ where: { reward_id: id } });
            const movieRewardsData = movieRewardsModels.map(movieRewardModel => movieRewardModel.toJSON());
            const movieRewards = movieRewardsData.map(movieRewardData => new MovieReward(movieRewardData.id, movieRewardData.movie_id, movieRewardData.reward_id));
            return movieRewards;
        } catch (error) {
            console.error("Error occurred while getting movieRewards by movie ID:", error);
            throw new Error("Failed to get movieRewards by movie ID");
        }
    }
}

export const movieRewardRepositorySQL = new MovieRewardRepositorySQL();
