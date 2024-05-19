import { MovieParticipantRepository } from "../../repositories/RelationRepository/IMovieParticipantRepository";
import { movieParticipantRepositorySQL } from "../../repositories/RelationRepository/MovieParticipantRepository";
import { AddMovieParticipantDto, UpdateMovieParticipantDto } from "../../repositories/RelationRepository/MovieParticipantDto";
import logger from '../../logger';

class MovieParticipantService {
    constructor (readonly movieParticipantRepository: MovieParticipantRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting movieParticipant by id: ${id}`, 'MovieParticipantService');
            return await this.movieParticipantRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting movieParticipant by id: ${error}`, 'MovieParticipantService');
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            logger.info(`Getting movieParticipants by movie_id: ${movie_id}`, 'MovieParticipantService');
            return await this.movieParticipantRepository.getByMovieId(movie_id);
        } catch (error) {
            logger.error(`Error getting movieParticipants by movie_id: ${error}`, 'MovieParticipantService');
            return null;
        }
    }

    async getByParticipantId(participant_id: number) {
        try {
            logger.info(`Getting movieParticipants by participant_id: ${participant_id}`, 'MovieParticipantService');
            return await this.movieParticipantRepository.getByParticipantId(participant_id);
        } catch (error) {
            logger.error(`Error getting movieParticipants by participant_id: ${error}`, 'MovieParticipantService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all movieParticipants`, 'MovieParticipantService');
            return await this.movieParticipantRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all movieParticipants: ${error}`, 'MovieParticipantService');
            return null;
        }
    }

    async add(dto: AddMovieParticipantDto) {
        try {
            logger.info(`Adding movieParticipant`, 'MovieParticipantService');
            return await this.movieParticipantRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding movieParticipant: ${error}`, 'MovieParticipantService');
            return null;
        }
    }
    
    async update(dto: UpdateMovieParticipantDto, id: number) {
        try {
            logger.info(`Updating movieParticipant: ${id}`, 'MovieParticipantService');
            return await this.movieParticipantRepository.update(dto, id);
        } catch (error) {
            logger.error(`Error updating movieParticipant: ${error}`, 'MovieParticipantService');
            return null;
        }
    }


    async delete(id: number) {
        try {
            logger.info(`Deleting movieParticipant: ${id}`, 'MovieParticipantService');
            await this.movieParticipantRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting movieParticipant: ${error}`, 'MovieParticipantService');
            return null;
        }
    }
};

const movieParticipantService = new MovieParticipantService(movieParticipantRepositorySQL);
export { movieParticipantService, MovieParticipantService };