import { MovieStudioRepository } from "../../repositories/RelationRepository/MovieStudioRepository";
import { AddMovieStudioDto } from "../../repositories/RelationRepository/MovieStudioDto";

export class MovieStudioService {
    constructor (readonly movieStudioRepository: MovieStudioRepository ) {}

    async getById(id: number) {
        try {
            return await this.movieStudioRepository.getById(id);
        } catch (error) {
            console.error(`Error getting movieStudio by id: ${error}`);
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            return await this.movieStudioRepository.getByMovieId(movie_id);
        } catch (error) {
            console.error(`Error getting movieStudios by movie_id: ${error}`);
            return null;
        }
    }

    async getByStudioId(studio_id: number) {
        try {
            return await this.movieStudioRepository.getByStudioId(studio_id);
        } catch (error) {
            console.error(`Error getting movieStudios by studio_id: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.movieStudioRepository.getAll();
        } catch (error) {
            console.error(`Error getting all movieStudios: ${error}`);
            return null;
        }
    }

    async add(dto: AddMovieStudioDto) {
        try {
            return await this.movieStudioRepository.add(dto);
        } catch (error) {
            console.error(`Error adding movieStudio: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.movieStudioRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting movieStudio: ${error}`);
            return null;
        }
    }
};