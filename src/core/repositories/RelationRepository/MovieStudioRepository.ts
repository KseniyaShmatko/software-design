import { MovieStudio } from "../../models/Relation/MovieStudio";
import { AddMovieStudioDto } from "./MovieStudioDto";
import { MovieStudioRepository } from "./IMovieStudioRepository";
import { MovieStudioDB } from "../../../infrastructure/db/entities/entities";

class MovieStudioRepositorySQL implements MovieStudioRepository {
    async getById(id: number): Promise<MovieStudio | null> {
        try {
            const movieStudioModel = await MovieStudioDB.findByPk(id);
            if (movieStudioModel) {
                const movieStudioData = movieStudioModel.toJSON();
                return new MovieStudio(movieStudioData.id, movieStudioData.movie_id, movieStudioData.studio_id);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting movieStudio by ID:", error);
            throw new Error("Failed to get movieStudio by ID");
        }
    }

    async getAll(): Promise<MovieStudio[]> {
        try {
            const movieStudiosModels = await MovieStudioDB.findAll();
            const movieStudiosData = movieStudiosModels.map(movieStudioModel => movieStudioModel.toJSON());
            const movieStudios = movieStudiosData.map(movieStudioData => new MovieStudio(movieStudioData.id, movieStudioData.movie_id, movieStudioData.studio_id));
            return movieStudios;
        } catch (error) {
            console.error("Error occurred while getting all movieStudios:", error);
            throw new Error("Failed to get all movieStudios");
        }
    }

    async add(dto: AddMovieStudioDto): Promise<MovieStudio> {
        try {
            const { movie_id, studio_id } = dto;
            const movieStudioModel = await MovieStudioDB.create({ movie_id, studio_id });
            const movieStudio = movieStudioModel.toJSON();
            return new MovieStudio(movieStudio.id, movieStudio.movie_id, movieStudio.studio_id);
        } catch (error) {
            console.error("Error occurred while adding movieStudio:", error);
            throw new Error("Failed to add movieStudio");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await MovieStudioDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting movieStudio:", error);
            throw new Error("Failed to delete movieStudio");
        }
    }

    async getByMovieId(id: number): Promise<MovieStudio[]> {
        try {
            const movieStudiosModels = await MovieStudioDB.findAll({ where: { movie_id: id } });
            const movieStudiosData = movieStudiosModels.map(movieStudioModel => movieStudioModel.toJSON());
            const movieStudios = movieStudiosData.map(movieStudioData => new MovieStudio(movieStudioData.id, movieStudioData.movie_id, movieStudioData.studio_id));
            return movieStudios;
        } catch (error) {
            console.error("Error occurred while getting movieStudios by movie ID:", error);
            throw new Error("Failed to get movieStudios by movie ID");
        }
    }

    async getByStudioId(id: number): Promise<MovieStudio[]> {
        try {
            const movieStudiosModels = await MovieStudioDB.findAll({ where: { studio_id: id } });
            const movieStudiosData = movieStudiosModels.map(movieStudioModel => movieStudioModel.toJSON());
            const movieStudios = movieStudiosData.map(movieStudioData => new MovieStudio(movieStudioData.id, movieStudioData.movie_id, movieStudioData.studio_id));
            return movieStudios;
        } catch (error) {
            console.error("Error occurred while getting movieStudios by movie ID:", error);
            throw new Error("Failed to get movieStudios by movie ID");
        }
    }
}

export const movieStudioRepositorySQL = new MovieStudioRepositorySQL();
