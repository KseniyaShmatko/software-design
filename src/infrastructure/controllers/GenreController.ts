import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { genreService } from '../../core/services/GenreServices/GenreServices';
import { GenreDto, AddGenreDto, UpdateGenreDto } from '../../core/repositories/GenreRepository/GenreDto';

class GenreController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const genres = await genreService.getAll();
            return res.json(genres);
        } catch (error) {
            console.error("Error occurred while getting all genres:", error);
            return next(ApiError.internal("Failed to get all genres"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const genre = await genreService.getById(id);
            if (!genre) {
                return next(ApiError.badRequest("Genre not found"));
            }
            return res.json(genre);
        } catch (error) {
            console.error("Error occurred while getting genre by ID:", error);
            return next(ApiError.internal("Failed to get genre by ID"));
        }
    }

    async getOneByName(req: Request, res: Response, next: NextFunction) {
        try {
            const genre = await genreService.getByName(req.params.name);
            if (!genre) {
                return next(ApiError.badRequest("Genre not found"));
            }
            return res.json(genre);
        } catch (error) {
            console.error("Error occurred while getting genre by name:", error);
            return next(ApiError.internal("Failed to get genre by name"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description } = req.body;
            const dto = new GenreDto(name, description);
            const dtoAdd = new AddGenreDto(dto);
            const genre = await genreService.add(dtoAdd);
            return res.json(genre);
        } catch (error) {
            console.error("Error occurred while adding genre:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const { name, description } = req.body;
            const dto = new GenreDto(name, description);
            const dtoUpdate = new UpdateGenreDto(dto);
            const updatedGenre = await genreService.update(dtoUpdate, id);
            return res.json(updatedGenre);
        } catch (error) {
            console.error("Error occurred while updating genre:", error);
            return next(ApiError.internal("Failed to update genre"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await genreService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting genre:", error);
            return next(ApiError.internal("Failed to delete genre"));
        }
    }
}

export default new GenreController();
