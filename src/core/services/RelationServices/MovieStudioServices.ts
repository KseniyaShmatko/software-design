import { MovieStudioRepository } from "../../repositories/RelationRepository/IMovieStudioRepository";
import { movieStudioRepositorySQL } from "../../repositories/RelationRepository/MovieStudioRepository";
import { AddMovieStudioDto } from "../../repositories/RelationRepository/MovieStudioDto";
import logger from '../../logger';

class MovieStudioService {
    constructor (readonly movieStudioRepository: MovieStudioRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting movieStudio by id: ${id}`, 'MovieStudioService');
            return await this.movieStudioRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting movieStudio by id: ${error}`, 'MovieStudioService');
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            logger.info(`Getting movieStudios by movie_id: ${movie_id}`, 'MovieStudioService');
            return await this.movieStudioRepository.getByMovieId(movie_id);
        } catch (error) {
            logger.error(`Error getting movieStudios by movie_id: ${error}`, 'MovieStudioService');
            return null;
        }
    }

    async getByStudioId(studio_id: number) {
        try {
            logger.info(`Getting movieStudios by studio_id: ${studio_id}`, 'MovieStudioService');
            return await this.movieStudioRepository.getByStudioId(studio_id);
        } catch (error) {
            logger.error(`Error getting movieStudios by studio_id: ${error}`, 'MovieStudioService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all movieStudios`, 'MovieStudioService');
            return await this.movieStudioRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all movieStudios: ${error}`, 'MovieStudioService');
            return null;
        }
    }

    async add(dto: AddMovieStudioDto) {
        try {
            logger.info(`Adding movieStudio`, 'MovieStudioService');
            return await this.movieStudioRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding movieStudio: ${error}`, 'MovieStudioService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting movieStudio: ${id}`, 'MovieStudioService');
            await this.movieStudioRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting movieStudio: ${error}`, 'MovieStudioService');
            return null;
        }
    }
};

const movieStudioService = new MovieStudioService(movieStudioRepositorySQL);
export { movieStudioService, MovieStudioService };