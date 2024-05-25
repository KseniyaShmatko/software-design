import { MovieUser } from "../../models/Relation/MovieUser";
import { AddMovieUserDto, UpdateMovieUserDto } from "./MovieUserDto";
import { MovieUserRepository } from "./IMovieUserRepository";
import { MovieUserDB } from "../../../infrastructure/db/entities/entities";

class MovieUserRepositorySQL implements MovieUserRepository {
    async getById(id: number): Promise<MovieUser | null> {
        try {
            const movieUserModel = await MovieUserDB.findByPk(id);
            if (movieUserModel) {
                const movieUserData = movieUserModel.toJSON();
                return new MovieUser(movieUserData.id, movieUserData.movie_id, movieUserData.user_id, movieUserData.mark);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting movieUser by ID:", error);
            throw new Error("Failed to get movieUser by ID");
        }
    }

    async getAll(): Promise<MovieUser[]> {
        try {
            const movieUsersModels = await MovieUserDB.findAll();
            const movieUsersData = movieUsersModels.map(movieUserModel => movieUserModel.toJSON());
            const movieUsers = movieUsersData.map(movieUserData => new MovieUser(movieUserData.id, movieUserData.movie_id, movieUserData.user_id, movieUserData.mark));
            return movieUsers;
        } catch (error) {
            console.error("Error occurred while getting all movieUsers:", error);
            throw new Error("Failed to get all movieUsers");
        }
    }

    async add(dto: AddMovieUserDto): Promise<MovieUser> {
        try {
            const { movie_id, user_id, mark } = dto;
            const movieUserModel = await MovieUserDB.create({ movie_id, user_id, mark });
            const movieUser = movieUserModel.toJSON();
            return new MovieUser(movieUser.id, movieUser.movie_id, movieUser.user_id, movieUser.mark);
        } catch (error) {
            console.error("Error occurred while adding movieUser:", error);
            throw new Error("Failed to add movieUser");
        }
    }

    async update(dto: UpdateMovieUserDto, id: number): Promise<MovieUser> {
        try {
            const searchedMovieUser = await MovieUserDB.findByPk(id);
            if (!searchedMovieUser) {
                throw new Error("MovieUser not found");
            }
            await MovieUserDB.update(dto, { where: { id: id } });
            const updatedMovieUserModel = await MovieUserDB.findByPk(id);
            const updatedMovieUser = updatedMovieUserModel?.toJSON();
            return new MovieUser(updatedMovieUser.id, updatedMovieUser.movie_id, updatedMovieUser.user_id, updatedMovieUser.mark);
        } catch (error) {
            console.error("Error occurred while updating movieUser:", error);
            throw new Error("Failed to update movieUser");
        }
    }
    
    async delete(id: number): Promise<void> {
        try {
            await MovieUserDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting movieUser:", error);
            throw new Error("Failed to delete movieUser");
        }
    }

    async getByMovieId(id: number): Promise<MovieUser[]> {
        try {
            const movieUsersModels = await MovieUserDB.findAll({ where: { movie_id: id } });
            const movieUsersData = movieUsersModels.map(movieUserModel => movieUserModel.toJSON());
            const movieUsers = movieUsersData.map(movieUserData => new MovieUser(movieUserData.id, movieUserData.movie_id, movieUserData.user_id, movieUserData.mark));
            return movieUsers;
        } catch (error) {
            console.error("Error occurred while getting movieUsers by movie ID:", error);
            throw new Error("Failed to get movieUsers by movie ID");
        }
    }

    // async getMark(id: number): Promise<number | null> {
    //     try {
    //         if (!MovieUserDB.sequelize) {
    //             throw new Error('Sequelize instance is not initialized');
    //         }
    
    //         const [result]: [any[], any] = await MovieUserDB.sequelize.query(
    //             `SELECT 
    //                 (COUNT(*) FILTER (WHERE mark = TRUE) * 100) / COUNT(*) AS positive_percentage
    //             FROM 
    //                 movie_users
    //             WHERE
    //                 movie_id = :id`, {
    //             replacements: { id },
    //             type: 'SELECT' // Указываем тип запроса
    //         });
    //         console.log(result);
    //         const positivePercentage: number = parseInt(result?.[0]?.positive_percentage) ?? null;
    //         return positivePercentage;
    //     } catch (error) {
    //         console.error("Error occurred while getting movieUsers by movie ID:", error);
    //         throw new Error("Failed to get movieUsers by movie ID");
    //     }
    // }

    async getByUserId(id: number): Promise<MovieUser[]> {
        try {
            const movieUsersModels = await MovieUserDB.findAll({ where: { user_id: id } });
            const movieUsersData = movieUsersModels.map(movieUserModel => movieUserModel.toJSON());
            const movieUsers = movieUsersData.map(movieUserData => new MovieUser(movieUserData.id, movieUserData.movie_id, movieUserData.user_id, movieUserData.mark));
            return movieUsers;
        } catch (error) {
            console.error("Error occurred while getting movieUsers by movie ID:", error);
            throw new Error("Failed to get movieUsers by movie ID");
        }
    }
}

export const movieUserRepositorySQL = new MovieUserRepositorySQL();
