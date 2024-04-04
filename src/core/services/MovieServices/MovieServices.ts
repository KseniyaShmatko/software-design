import { MovieRepository, MovieCategories } from "../../repositories/MovieRepository/IMovieRepository";
import { movieRepositorySQL } from "../../repositories/MovieRepository/MovieRepository";
import { AddMovieDto, UpdateMovieDto } from "../../repositories/MovieRepository/MovieDto";

class MovieService {
    constructor (readonly movieRepository: MovieRepository) {};

    async getById(id: number) {
        try {
            return await this.movieRepository.getById(id);
        } catch (error) {
            console.error(`Error getting movie by id: ${error}`);
            return null;
        }
    }

    async getByName(name: string) {
        try {
            return await this.movieRepository.getByName(name);
        } catch (error) {
            console.error(`Error getting movie by name: ${error}`);
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

            return movieCategories;
        } catch (error) {
            console.error(`Error getting all movies: ${error}`);
            return null;
        }
    }

    async add(dto: AddMovieDto) {
        try {
            return await this.movieRepository.add(dto);
        } catch (error) {
            console.error(`Error adding movie: ${error}`);
            return null;
        }
    }

    async update(dto: UpdateMovieDto, id: number) {
        try {
            return await this.movieRepository.update(dto, id);
        } catch (error) {
            console.error(`Error updating movie: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.movieRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting movie: ${error}`);
            return null;
        }
    }
};

const movieService = new MovieService(movieRepositorySQL);
export { movieService, MovieService };