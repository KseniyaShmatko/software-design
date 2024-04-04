import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { movieService } from '../../core/services/MovieServices/MovieServices';
import { MovieDto, AddMovieDto, UpdateMovieDto } from '../../core/repositories/MovieRepository/MovieDto';

class MovieController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const movies = await movieService.getAll();
            return res.json(movies);
        } catch (error) {
            console.error("Error occurred while getting all movies:", error);
            return next(ApiError.internal("Failed to get all movies"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movie = await movieService.getById(id);
            if (!movie) {
                return next(ApiError.badRequest("Movie not found"));
            }
            return res.json(movie);
        } catch (error) {
            console.error("Error occurred while getting movie by ID:", error);
            return next(ApiError.internal("Failed to get movie by ID"));
        }
    }

    async getOneByName(req: Request, res: Response, next: NextFunction) {
        try {
            const movie = await movieService.getByName(req.params.name);
            if (!movie) {
                return next(ApiError.badRequest("Movie not found"));
            }
            return res.json(movie);
        } catch (error) {
            console.error("Error occurred while getting movie by name:", error);
            return next(ApiError.internal("Failed to get movie by name"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, country, release, photo, trailer } = req.body;
            const dto = new MovieDto(name, description, country, release, photo, trailer);
            const dtoAdd = new AddMovieDto(dto);
            const movie = await movieService.add(dtoAdd);
            return res.json(movie);
        } catch (error) {
            console.error("Error occurred while adding movie:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const { name, description, country, release, photo, trailer } = req.body;
            const dto = new MovieDto(name, description, country, release, photo, trailer);
            const dtoUpdate = new UpdateMovieDto(dto);
            const updatedMovie = await movieService.update(dtoUpdate, id);
            return res.json(updatedMovie);
        } catch (error) {
            console.error("Error occurred while updating movie:", error);
            return next(ApiError.internal("Failed to update movie"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await movieService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting movie:", error);
            return next(ApiError.internal("Failed to delete movie"));
        }
    }
}

export default new MovieController();
