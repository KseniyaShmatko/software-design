import { MovieGenreRepository } from "../../repositories/RelationRepository/IMovieGenreRepository";
import { AddMovieGenreDto } from "../../repositories/RelationRepository/MovieGenreDto";

export class MovieGenreService {
    constructor (readonly movieGenreRepository: MovieGenreRepository ) {}

    async getById(id: number) {
        try {
            return await this.movieGenreRepository.getById(id);
        } catch (error) {
            console.error(`Error getting movieGenre by id: ${error}`);
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            return await this.movieGenreRepository.getByMovieId(movie_id);
        } catch (error) {
            console.error(`Error getting movieGenres by movie_id: ${error}`);
            return null;
        }
    }

    async getByGenreId(genre_id: number) {
        try {
            return await this.movieGenreRepository.getByGenreId(genre_id);
        } catch (error) {
            console.error(`Error getting movieGenres by genre_id: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.movieGenreRepository.getAll();
        } catch (error) {
            console.error(`Error getting all movieGenres: ${error}`);
            return null;
        }
    }

    async add(dto: AddMovieGenreDto) {
        try {
            return await this.movieGenreRepository.add(dto);
        } catch (error) {
            console.error(`Error adding movieGenre: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.movieGenreRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting movieGenre: ${error}`);
            return null;
        }
    }
};