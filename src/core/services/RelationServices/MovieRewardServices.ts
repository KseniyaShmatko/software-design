import { MovieRewardRepository } from "../../repositories/RelationRepository/IMovieRewardRepository";
import { movieRewardRepositorySQL } from "../../repositories/RelationRepository/MovieRewardRepository";
import { AddMovieRewardDto } from "../../repositories/RelationRepository/MovieRewardDto";
import logger from '../../logger';

class MovieRewardService {
    constructor (readonly movieRewardRepository: MovieRewardRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting movieReward by id: ${id}`, 'MovieRewardService');
            return await this.movieRewardRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting movieReward by id: ${error}`, 'MovieRewardService');
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            logger.info(`Getting movieRewards by movie_id: ${movie_id}`, 'MovieRewardService');
            return await this.movieRewardRepository.getByMovieId(movie_id);
        } catch (error) {
            logger.error(`Error getting movieRewards by movie_id: ${error}`, 'MovieRewardService');
            return null;
        }
    }

    async getByRewardId(reward_id: number) {
        try {
            logger.info(`Getting movieRewards by reward_id: ${reward_id}`, 'MovieRewardService');
            return await this.movieRewardRepository.getByRewardId(reward_id);
        } catch (error) {
            logger.error(`Error getting movieRewards by reward_id: ${error}`, 'MovieRewardService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all movieRewards`, 'MovieRewardService');
            return await this.movieRewardRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all movieRewards: ${error}`, 'MovieRewardService');
            return null;
        }
    }

    async add(dto: AddMovieRewardDto) {
        try {
            logger.info(`Adding movieReward`, 'MovieRewardService');
            return await this.movieRewardRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding movieReward: ${error}`, 'MovieRewardService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting movieReward: ${id}`, 'MovieRewardService');
            await this.movieRewardRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting movieReward: ${error}`, 'MovieRewardService');
            return null;
        }
    }
};

const movieRewardService = new MovieRewardService(movieRewardRepositorySQL);
export { movieRewardService, MovieRewardService };