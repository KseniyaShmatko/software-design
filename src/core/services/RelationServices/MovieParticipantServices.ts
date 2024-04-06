import { MovieParticipantRepository } from "../../repositories/RelationRepository/IMovieParticipantRepository";
import { movieParticipantRepositorySQL } from "../../repositories/RelationRepository/MovieParticipantRepository";
import { AddMovieParticipantDto, UpdateMovieParticipantDto } from "../../repositories/RelationRepository/MovieParticipantDto";

class MovieParticipantService {
    constructor (readonly movieParticipantRepository: MovieParticipantRepository ) {}

    async getById(id: number) {
        try {
            return await this.movieParticipantRepository.getById(id);
        } catch (error) {
            console.error(`Error getting movieParticipant by id: ${error}`);
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            return await this.movieParticipantRepository.getByMovieId(movie_id);
        } catch (error) {
            console.error(`Error getting movieParticipants by movie_id: ${error}`);
            return null;
        }
    }

    async getByParticipantId(participant_id: number) {
        try {
            return await this.movieParticipantRepository.getByParticipantId(participant_id);
        } catch (error) {
            console.error(`Error getting movieParticipants by participant_id: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.movieParticipantRepository.getAll();
        } catch (error) {
            console.error(`Error getting all movieParticipants: ${error}`);
            return null;
        }
    }

    async add(dto: AddMovieParticipantDto) {
        try {
            return await this.movieParticipantRepository.add(dto);
        } catch (error) {
            console.error(`Error adding movieParticipant: ${error}`);
            return null;
        }
    }
    
    async update(dto: UpdateMovieParticipantDto, id: number) {
        try {
            return await this.movieParticipantRepository.update(dto, id);
        } catch (error) {
            console.error(`Error updating movieParticipant: ${error}`);
            return null;
        }
    }


    async delete(id: number) {
        try {
            await this.movieParticipantRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting movieParticipant: ${error}`);
            return null;
        }
    }
};

const movieParticipantService = new MovieParticipantService(movieParticipantRepositorySQL);
export { movieParticipantService, MovieParticipantService };