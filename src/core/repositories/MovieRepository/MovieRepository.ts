import { Movie } from "../../models/Movie/Movie";
import { AddMovieDto, UpdateMovieDto } from "./MovieDto";
import { MovieRepository } from "./IMovieRepository";
import { MovieDB } from "../../../infrastructure/db/entities/entities";

class MovieRepositorySQL implements MovieRepository {
    async getById(id: number): Promise<Movie | null> {
        try {
            const movieModel = await MovieDB.findOne({ where: { id } });
            if (movieModel) {
                const movieData = movieModel.toJSON();
                return new Movie(movieData.id, movieData.name, movieData.description, movieData.country, movieData.release, movieData.photo, movieData.trailer);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting movie by ID:", error);
            throw new Error("Failed to get movie by ID");
        }
    }

    async getAll(): Promise<Movie[]> {
        try {
            const moviesModels = await MovieDB.findAll();
            const moviesData = moviesModels.map(movieModel => movieModel.toJSON());
            const movies = moviesData.map(movieData => new Movie(movieData.id, movieData.name, movieData.description, movieData.country, movieData.release, movieData.photo, movieData.trailer));
            return movies;
        } catch (error) {
            console.error("Error occurred while getting all movies:", error);
            throw new Error("Failed to get all movies");
        }
    }

    async add(dto: AddMovieDto): Promise<Movie> {
        try {
            const { name, description, country, release, photo, trailer } = dto;
            const movieModel = await MovieDB.create({ name, description, country, release, photo, trailer });
            const movie = movieModel.toJSON();
            return new Movie(movie.id, movie.name, movie.description, movie.country, movie.release, movie.photo, movie.trailer);
        } catch (error) {
            console.error("Error occurred while adding movie:", error);
            throw new Error("Failed to add movie");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await MovieDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting movie:", error);
            throw new Error("Failed to delete movie");
        }
    }

    async getByName(name: string): Promise<Movie | null> {
        try {
            const movieModel = await MovieDB.findOne({ where: { name } });
            if (movieModel) {
                const movie = movieModel.toJSON();
                return new Movie(movie.id, movie.name, movie.description, movie.country, movie.release, movie.photo, movie.trailer);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting movie by name:", error);
            throw new Error("Failed to get movie by name");
        }
    }

    async update(dto: UpdateMovieDto, id: number): Promise<Movie> {
        try {
            const searchedMovie = await MovieDB.findByPk(id);
            if (!searchedMovie) {
                throw new Error("Movie not found");
            }
            await MovieDB.update(dto, { where: { id: id } });
            const updatedMovieModel = await MovieDB.findByPk(id);
            const updatedMovie = updatedMovieModel?.toJSON();
            return new Movie(updatedMovie.id, updatedMovie.name, updatedMovie.description, updatedMovie.country, updatedMovie.release, updatedMovie.photo, updatedMovie.trailer);
        } catch (error) {
            console.error("Error occurred while updating movie:", error);
            throw new Error("Failed to update movie");
        }
    }
}

export const movieRepositorySQL = new MovieRepositorySQL();
