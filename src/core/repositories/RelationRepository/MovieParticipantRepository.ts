import { MovieParticipant } from "../../models/Relation/MovieParticipant";
import { AddMovieParticipantDto, UpdateMovieParticipantDto } from "./MovieParticipantDto";
import { MovieParticipantRepository } from "./IMovieParticipantRepository";
import { MovieParticipantDB } from "../../../infrastructure/db/entities/entities";

class MovieParticipantRepositorySQL implements MovieParticipantRepository {
    async getById(id: number): Promise<MovieParticipant | null> {
        try {
            const movieParticipantModel = await MovieParticipantDB.findByPk(id);
            if (movieParticipantModel) {
                const movieParticipantData = movieParticipantModel.toJSON();
                return new MovieParticipant(movieParticipantData.id, movieParticipantData.movie_id, movieParticipantData.participant_id, movieParticipantData.role);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting movieParticipant by ID:", error);
            throw new Error("Failed to get movieParticipant by ID");
        }
    }

    async getAll(): Promise<MovieParticipant[]> {
        try {
            const movieParticipantsModels = await MovieParticipantDB.findAll();
            const movieParticipantsData = movieParticipantsModels.map(movieParticipantModel => movieParticipantModel.toJSON());
            const movieParticipants = movieParticipantsData.map(movieParticipantData => new MovieParticipant(movieParticipantData.id, movieParticipantData.movie_id, movieParticipantData.participant_id, movieParticipantData.role));
            return movieParticipants;
        } catch (error) {
            console.error("Error occurred while getting all movieParticipants:", error);
            throw new Error("Failed to get all movieParticipants");
        }
    }

    async add(dto: AddMovieParticipantDto): Promise<MovieParticipant> {
        try {
            const { movie_id, participant_id, role } = dto;
            const movieParticipantModel = await MovieParticipantDB.create({ movie_id, participant_id, role });
            const movieParticipant = movieParticipantModel.toJSON();
            return new MovieParticipant(movieParticipant.id, movieParticipant.movie_id, movieParticipant.participant_id, movieParticipant.role);
        } catch (error) {
            console.error("Error occurred while adding movieParticipant:", error);
            throw new Error("Failed to add movieParticipant");
        }
    }

    async update(dto: UpdateMovieParticipantDto, id: number): Promise<MovieParticipant> {
        try {
            const searchedMovieParticipant = await MovieParticipantDB.findByPk(id);
            if (!searchedMovieParticipant) {
                throw new Error("MovieParticipant not found");
            }
            await MovieParticipantDB.update(dto, { where: { id: id } });
            const updatedMovieParticipantModel = await MovieParticipantDB.findByPk(id);
            const updatedMovieParticipant = updatedMovieParticipantModel?.toJSON();
            return new MovieParticipant(updatedMovieParticipant.id, updatedMovieParticipant.movie_id, updatedMovieParticipant.participant_id, updatedMovieParticipant.role);
        } catch (error) {
            console.error("Error occurred while updating movieParticipant:", error);
            throw new Error("Failed to update movieParticipant");
        }
    }
    
    async delete(id: number): Promise<void> {
        try {
            await MovieParticipantDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting movieParticipant:", error);
            throw new Error("Failed to delete movieParticipant");
        }
    }

    async getByMovieId(id: number): Promise<MovieParticipant[]> {
        try {
            const movieParticipantsModels = await MovieParticipantDB.findAll({ where: { movie_id: id } });
            const movieParticipantsData = movieParticipantsModels.map(movieParticipantModel => movieParticipantModel.toJSON());
            const movieParticipants = movieParticipantsData.map(movieParticipantData => new MovieParticipant(movieParticipantData.id, movieParticipantData.movie_id, movieParticipantData.participant_id, movieParticipantData.role));
            return movieParticipants;
        } catch (error) {
            console.error("Error occurred while getting movieParticipants by movie ID:", error);
            throw new Error("Failed to get movieParticipants by movie ID");
        }
    }

    async getByParticipantId(id: number): Promise<MovieParticipant[]> {
        try {
            const movieParticipantsModels = await MovieParticipantDB.findAll({ where: { movieParticipant_id: id } });
            const movieParticipantsData = movieParticipantsModels.map(movieParticipantModel => movieParticipantModel.toJSON());
            const movieParticipants = movieParticipantsData.map(movieParticipantData => new MovieParticipant(movieParticipantData.id, movieParticipantData.movie_id, movieParticipantData.participant_id, movieParticipantData.role));
            return movieParticipants;
        } catch (error) {
            console.error("Error occurred while getting movieParticipants by movie ID:", error);
            throw new Error("Failed to get movieParticipants by movie ID");
        }
    }
}

export const movieParticipantRepositorySQL = new MovieParticipantRepositorySQL();
