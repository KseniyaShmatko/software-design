import { MovieGenreRepository } from "../../repositories/RelationRepository/IMovieGenreRepository";
import { movieGenreRepositorySQL } from "../../repositories/RelationRepository/MovieGenreRepository";
import { AddMovieGenreDto } from "../../repositories/RelationRepository/MovieGenreDto";
import logger from '../../logger';

class MovieGenreService {
    constructor (readonly movieGenreRepository: MovieGenreRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting movieGenre by id: ${id}`, 'MovieGenreService');
            return await this.movieGenreRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting movieGenre by id: ${error}`, 'MovieGenreService');
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            logger.info(`Getting movieGenres by movie_id: ${movie_id}`, 'MovieGenreService');
            return await this.movieGenreRepository.getByMovieId(movie_id);
        } catch (error) {
            logger.error(`Error getting movieGenres by movie_id: ${error}`, 'MovieGenreService');
            return null;
        }
    }

    async getByGenreId(genre_id: number) {
        try {
            logger.info(`Getting movieGenres by genre_id: ${genre_id}`, 'MovieGenreService');
            return await this.movieGenreRepository.getByGenreId(genre_id);
        } catch (error) {
            logger.error(`Error getting movieGenres by genre_id: ${error}`, 'MovieGenreService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all movieGenres`, 'MovieGenreService');
            return await this.movieGenreRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all movieGenres: ${error}`, 'MovieGenreService');
            return null;
        }
    }

    async add(dto: AddMovieGenreDto) {
        try {
            logger.info(`Adding movieGenre`, 'MovieGenreService');
            return await this.movieGenreRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding movieGenre: ${error}`, 'MovieGenreService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting movieGenre: ${id}`, 'MovieGenreService');
            await this.movieGenreRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting movieGenre: ${error}`, 'MovieGenreService');
            return null;
        }
    }
};

const movieGenreService = new MovieGenreService(movieGenreRepositorySQL);
export { movieGenreService, MovieGenreService };