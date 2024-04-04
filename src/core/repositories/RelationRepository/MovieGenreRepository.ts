import { MovieGenre } from "../../models/Relation/MovieGenre";
import { AddMovieGenreDto } from "./MovieGenreDto";
import { MovieGenreRepository } from "./IMovieGenreRepository";
import { MovieGenreDB } from "../../../infrastructure/db/entities/entities";

class MovieGenreRepositorySQL implements MovieGenreRepository {
    async getById(id: number): Promise<MovieGenre | null> {
        try {
            const movieGenreModel = await MovieGenreDB.findByPk(id);
            if (movieGenreModel) {
                const movieGenreData = movieGenreModel.toJSON();
                return new MovieGenre(movieGenreData.id, movieGenreData.movie_id, movieGenreData.genre_id);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting movieGenre by ID:", error);
            throw new Error("Failed to get movieGenre by ID");
        }
    }

    async getAll(): Promise<MovieGenre[]> {
        try {
            const movieGenresModels = await MovieGenreDB.findAll();
            const movieGenresData = movieGenresModels.map(movieGenreModel => movieGenreModel.toJSON());
            const movieGenres = movieGenresData.map(movieGenreData => new MovieGenre(movieGenreData.id, movieGenreData.movie_id, movieGenreData.genre_id));
            return movieGenres;
        } catch (error) {
            console.error("Error occurred while getting all movieGenres:", error);
            throw new Error("Failed to get all movieGenres");
        }
    }

    async add(dto: AddMovieGenreDto): Promise<MovieGenre> {
        try {
            const { movie_id, genre_id } = dto;
            const movieGenreModel = await MovieGenreDB.create({ movie_id, genre_id });
            const movieGenre = movieGenreModel.toJSON();
            return new MovieGenre(movieGenre.id, movieGenre.movie_id, movieGenre.genre_id);
        } catch (error) {
            console.error("Error occurred while adding movieGenre:", error);
            throw new Error("Failed to add movieGenre");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await MovieGenreDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting movieGenre:", error);
            throw new Error("Failed to delete movieGenre");
        }
    }

    async getByMovieId(id: number): Promise<MovieGenre[]> {
        try {
            const movieGenresModels = await MovieGenreDB.findAll({ where: { movie_id: id } });
            const movieGenresData = movieGenresModels.map(movieGenreModel => movieGenreModel.toJSON());
            const movieGenres = movieGenresData.map(movieGenreData => new MovieGenre(movieGenreData.id, movieGenreData.movie_id, movieGenreData.genre_id));
            return movieGenres;
        } catch (error) {
            console.error("Error occurred while getting movieGenres by movie ID:", error);
            throw new Error("Failed to get movieGenres by movie ID");
        }
    }

    async getByGenreId(id: number): Promise<MovieGenre[]> {
        try {
            const movieGenresModels = await MovieGenreDB.findAll({ where: { genre_id: id } });
            const movieGenresData = movieGenresModels.map(movieGenreModel => movieGenreModel.toJSON());
            const movieGenres = movieGenresData.map(movieGenreData => new MovieGenre(movieGenreData.id, movieGenreData.movie_id, movieGenreData.genre_id));
            return movieGenres;
        } catch (error) {
            console.error("Error occurred while getting movieGenres by movie ID:", error);
            throw new Error("Failed to get movieGenres by movie ID");
        }
    }
}

export const movieGenreRepositorySQL = new MovieGenreRepositorySQL();
