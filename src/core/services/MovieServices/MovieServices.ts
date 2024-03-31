import { MovieRepository } from "../../repositories/MovieRepository/IMovieRepository";
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

    async getAll() {
        try {
            return await this.movieRepository.getAll();
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