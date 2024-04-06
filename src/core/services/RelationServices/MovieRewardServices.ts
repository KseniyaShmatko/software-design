import { MovieRewardRepository } from "../../repositories/RelationRepository/IMovieRewardRepository";
import { movieRewardRepositorySQL } from "../../repositories/RelationRepository/MovieRewardRepository";
import { AddMovieRewardDto } from "../../repositories/RelationRepository/MovieRewardDto";

class MovieRewardService {
    constructor (readonly movieRewardRepository: MovieRewardRepository ) {}

    async getById(id: number) {
        try {
            return await this.movieRewardRepository.getById(id);
        } catch (error) {
            console.error(`Error getting movieReward by id: ${error}`);
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            return await this.movieRewardRepository.getByMovieId(movie_id);
        } catch (error) {
            console.error(`Error getting movieRewards by movie_id: ${error}`);
            return null;
        }
    }

    async getByRewardId(reward_id: number) {
        try {
            return await this.movieRewardRepository.getByRewardId(reward_id);
        } catch (error) {
            console.error(`Error getting movieRewards by reward_id: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.movieRewardRepository.getAll();
        } catch (error) {
            console.error(`Error getting all movieRewards: ${error}`);
            return null;
        }
    }

    async add(dto: AddMovieRewardDto) {
        try {
            return await this.movieRewardRepository.add(dto);
        } catch (error) {
            console.error(`Error adding movieReward: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.movieRewardRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting movieReward: ${error}`);
            return null;
        }
    }
};

const movieRewardService = new MovieRewardService(movieRewardRepositorySQL);
export { movieRewardService, MovieRewardService };