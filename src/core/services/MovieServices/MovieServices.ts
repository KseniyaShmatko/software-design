import { MovieRepository, MovieCategories } from "../../repositories/MovieRepository/IMovieRepository";
import { movieRepositorySQL } from "../../repositories/MovieRepository/MovieRepository";
import { AddMovieDto, UpdateMovieDto } from "../../repositories/MovieRepository/MovieDto";
import logger from '../../logger';

class MovieService {
    constructor (readonly movieRepository: MovieRepository) {};

    async getById(id: number) {
        try {
            logger.info(`Getting movie by id: ${id}`, 'MovieService');
            return await this.movieRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting movie by id: ${error}`, 'MovieService');
            return null;
        }
    }

    async getByName(name: string) {
        try {
            logger.info(`Getting movie by name: ${name}`, 'MovieService');
            return await this.movieRepository.getByName(name);
        } catch (error) {
            logger.error(`Error getting movie by name: ${error}`, 'MovieService');
            return null;
        }
    }

    async getAll(): Promise<MovieCategories | null> {
        try {
            const allMovies = await this.movieRepository.getAll();
            if (!allMovies) return null;

            const currentDate = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

            const movieCategories: MovieCategories = {
                upcoming: [],
                lastMonth: [],
                lastYear: [],
                other: []
            };

            allMovies.forEach(movie => {
                const releaseDate = new Date(movie.release);
                if (releaseDate > currentDate) {
                    movieCategories.upcoming.push(movie);
                } else if (releaseDate > oneMonthAgo) {
                    movieCategories.lastMonth.push(movie);
                } else if (releaseDate > oneYearAgo) {
                    movieCategories.lastYear.push(movie);
                } else {
                    movieCategories.other.push(movie);
                }
            });
            logger.info(`Getting all movies`, 'MovieService');
            return movieCategories;
        } catch (error) {
            logger.error(`Error getting all movies: ${error}`, 'MovieService');
            return null;
        }
    }

    async add(dto: AddMovieDto) {
        try {
            logger.info(`Adding movie`, 'MovieService');
            return await this.movieRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding movie: ${error}`, 'MovieService');
            return null;
        }
    }

    async update(dto: UpdateMovieDto, id: number) {
        try {
            logger.info(`Updating movie: ${id}`, 'MovieService');
            return await this.movieRepository.update(dto, id);
        } catch (error) {
            logger.error(`Error updating movie: ${error}`, 'MovieService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting movie: ${id}`, 'MovieService');
            await this.movieRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting movie: ${error}`, 'MovieService');
            return null;
        }
    }
};

const movieService = new MovieService(movieRepositorySQL);
export { movieService, MovieService };