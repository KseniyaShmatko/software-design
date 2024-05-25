import { MovieUserRepository } from "../../repositories/RelationRepository/IMovieUserRepository";
import { movieUserRepositorySQL } from "../../repositories/RelationRepository/MovieUserRepository";
import { AddMovieUserDto, UpdateMovieUserDto } from "../../repositories/RelationRepository/MovieUserDto";
import logger from '../../logger';

class MovieUserService {
    constructor (readonly movieUserRepository: MovieUserRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting movieUser by id: ${id}`, 'MovieUserService');
            return await this.movieUserRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting movieUser by id: ${error}`, 'MovieUserService');
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            logger.info(`Getting movieUsers by movie_id: ${movie_id}`, 'MovieUserService');
            return await this.movieUserRepository.getByMovieId(movie_id);
        } catch (error) {
            logger.error(`Error getting movieUsers by movie_id: ${error}`, 'MovieUserService');
            return null;
        }
    }

    async getByUserId(user_id: number) {
        try {
            logger.info(`Getting movieUsers by user_id: ${user_id}`, 'MovieUserService');
            return await this.movieUserRepository.getByUserId(user_id);
        } catch (error) {
            logger.error(`Error getting movieUsers by user_id: ${error}`, 'MovieUserService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all movieUsers`, 'MovieUserService');
            return await this.movieUserRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all movieUsers: ${error}`, 'MovieUserService');
            return null;
        }
    }

    async add(dto: AddMovieUserDto) {
        try {
            logger.info(`Adding movieUser`, 'MovieUserService');
            return await this.movieUserRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding movieUser: ${error}`, 'MovieUserService');
            return null;
        }
    }
    
    async update(dto: UpdateMovieUserDto, id: number) {
        try {
            logger.info(`Updating movieUser: ${id}`, 'MovieUserService');
            return await this.movieUserRepository.update(dto, id);
        } catch (error) {
            logger.error(`Error updating movieUser: ${error}`, 'MovieUserService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting movieUser: ${id}`, 'MovieUserService');
            await this.movieUserRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting movieUser: ${error}`, 'MovieUserService');
            return null;
        }
    }

    // async getMarks(id: number) {
    //     try {

    //         // const averageRating = await this.movieUserRepository.getMark(id);
    //         // if (averageRating === null) {
    //         //     return null;
    //         // }
    //         // const waitingPercentage = averageRating * 100;
    //         // logger.info(`Getting marks movie: ${id}`, 'MovieUserService');
    //         // return waitingPercentage;
    //         // const movieUsers = await this.movieUserRepository.getByMovieId(id);

    //         // if (!movieUsers || movieUsers.length === 0) {
    //         //     return null;
    //         // }
    //         // return movieUsers;
            
    //     } catch (error) {
    //         logger.error(`Error getting marks movie: ${error}`, 'MovieUserService');
    //         return null;
    //     }
    // }

    async getMarks(id: number) {
        try {
            const movieUsers = await this.movieUserRepository.getByMovieId(id);

            if (!movieUsers || movieUsers.length === 0) {
                return null;
            }

            const waitingCount = movieUsers.filter(movieUser => movieUser.mark).length;

            const totalCount = movieUsers.length;

            const waitingPercentage = (waitingCount / totalCount) * 100;
            logger.info(`Getting marks movie: ${id}`, 'MovieUserService');
            return waitingPercentage;
            
        } catch (error) {
            logger.error(`Error getting marks movie: ${error}`, 'MovieUserService');
            return null;
        }
    }
};

const movieUserService = new MovieUserService(movieUserRepositorySQL);
export { movieUserService, MovieUserService };