import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { movieUserService } from '../../core/services/RelationServices/MovieUserServices';
import { MovieUserDto, AddMovieUserDto, UpdateMovieUserDto } from '../../core/repositories/RelationRepository/MovieUserDto';

class MovieUserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const movieUsers = await movieUserService.getAll();
            return res.json(movieUsers);
        } catch (error) {
            console.error("Error occurred while getting all movieUsers:", error);
            return next(ApiError.internal("Failed to get all movieUsers"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieUser = await movieUserService.getById(id);
            if (!movieUser) {
                return next(ApiError.badRequest("MovieUser not found"));
            }
            return res.json(movieUser);
        } catch (error) {
            console.error("Error occurred while getting movieUser by ID:", error);
            return next(ApiError.internal("Failed to get movieUser by ID"));
        }
    }

    async getByMovieId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieUser = await movieUserService.getByMovieId(id);
            if (!movieUser) {
                return next(ApiError.badRequest("MovieUser not found"));
            }
            return res.json(movieUser);
        } catch (error) {
            console.error("Error occurred while getting movieUser by movie_id:", error);
            return next(ApiError.internal("Failed to get movieUser by movie_id"));
        }
    }

    async getByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieUser = await movieUserService.getByUserId(id);
            if (!movieUser) {
                return next(ApiError.badRequest("MovieUser not found"));
            }
            return res.json(movieUser);
        } catch (error) {
            console.error("Error occurred while getting movieUser by user_id:", error);
            return next(ApiError.internal("Failed to get movieUser by user_id"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { movie_id, user_id, mark } = req.body;
            const dto = new MovieUserDto(mark);
            const dtoAdd = new AddMovieUserDto(dto, movie_id, user_id);
            const movieUser = await movieUserService.add(dtoAdd);
            return res.json(movieUser);
        } catch (error) {
            console.error("Error occurred while adding movieUser:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const { mark } = req.body;
            const dto = new MovieUserDto(mark);
            const dtoUpdate = new UpdateMovieUserDto(dto);
            const updatedMovieUser = await movieUserService.update(dtoUpdate, id);
            return res.json(updatedMovieUser);
        } catch (error) {
            console.error("Error occurred while updating movieUser:", error);
            return next(ApiError.internal("Failed to update movieUser"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await movieUserService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting movieUser:", error);
            return next(ApiError.internal("Failed to delete movieUser"));
        }
    }
}

export default new MovieUserController();
