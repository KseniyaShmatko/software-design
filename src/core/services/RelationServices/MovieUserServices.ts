import { MovieUserRepository } from "../../repositories/RelationRepository/IMovieUserRepository";
import { AddMovieUserDto, UpdateMovieUserDto } from "../../repositories/RelationRepository/MovieUserDto";

export class MovieUserService {
    constructor (readonly movieUserRepository: MovieUserRepository ) {}

    async getById(id: number) {
        try {
            return await this.movieUserRepository.getById(id);
        } catch (error) {
            console.error(`Error getting movieUser by id: ${error}`);
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            return await this.movieUserRepository.getByMovieId(movie_id);
        } catch (error) {
            console.error(`Error getting movieUsers by movie_id: ${error}`);
            return null;
        }
    }

    async getByUserId(user_id: number) {
        try {
            return await this.movieUserRepository.getByUserId(user_id);
        } catch (error) {
            console.error(`Error getting movieUsers by user_id: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.movieUserRepository.getAll();
        } catch (error) {
            console.error(`Error getting all movieUsers: ${error}`);
            return null;
        }
    }

    async add(dto: AddMovieUserDto) {
        try {
            return await this.movieUserRepository.add(dto);
        } catch (error) {
            console.error(`Error adding movieUser: ${error}`);
            return null;
        }
    }
    
    async update(dto: UpdateMovieUserDto) {
        try {
            return await this.movieUserRepository.update(dto);
        } catch (error) {
            console.error(`Error updating movieUser: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.movieUserRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting movieUser: ${error}`);
            return null;
        }
    }

    async getMarks(id: number) {
        try {
            const movieUsers = await this.movieUserRepository.getByMovieId(id);

            if (!movieUsers || movieUsers.length === 0) {
                return null;
            }

            const waitingCount = movieUsers.filter(movieUser => movieUser.mark).length;

            const totalCount = movieUsers.length;

            const waitingPercentage = (waitingCount / totalCount) * 100;

            return waitingPercentage;
            
        } catch (error) {
            console.error(`Error getting marks movie: ${error}`);
            return null;
        }
    }
};
