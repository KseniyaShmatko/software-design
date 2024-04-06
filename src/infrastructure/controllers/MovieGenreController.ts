import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { movieGenreService } from '../../core/services/RelationServices/MovieGenreServices';
import { MovieGenreDto, AddMovieGenreDto } from '../../core/repositories/RelationRepository/MovieGenreDto';

class MovieGenreController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const movieGenres = await movieGenreService.getAll();
            return res.json(movieGenres);
        } catch (error) {
            console.error("Error occurred while getting all movieGenres:", error);
            return next(ApiError.internal("Failed to get all movieGenres"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieGenre = await movieGenreService.getById(id);
            if (!movieGenre) {
                return next(ApiError.badRequest("MovieGenre not found"));
            }
            return res.json(movieGenre);
        } catch (error) {
            console.error("Error occurred while getting movieGenre by ID:", error);
            return next(ApiError.internal("Failed to get movieGenre by ID"));
        }
    }

    async getByMovieId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieGenre = await movieGenreService.getByMovieId(id);
            if (!movieGenre) {
                return next(ApiError.badRequest("MovieGenre not found"));
            }
            return res.json(movieGenre);
        } catch (error) {
            console.error("Error occurred while getting movieGenre by movie_id:", error);
            return next(ApiError.internal("Failed to get movieGenre by movie_id"));
        }
    }

    async getByGenreId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieGenre = await movieGenreService.getByGenreId(id);
            if (!movieGenre) {
                return next(ApiError.badRequest("MovieGenre not found"));
            }
            return res.json(movieGenre);
        } catch (error) {
            console.error("Error occurred while getting movieGenre by genre_id:", error);
            return next(ApiError.internal("Failed to get movieGenre by genre_id"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { movie_id, genre_id } = req.body;
            const dto = new MovieGenreDto(movie_id, genre_id);
            const dtoAdd = new AddMovieGenreDto(dto);
            const movieGenre = await movieGenreService.add(dtoAdd);
            return res.json(movieGenre);
        } catch (error) {
            console.error("Error occurred while adding movieGenre:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await movieGenreService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting movieGenre:", error);
            return next(ApiError.internal("Failed to delete movieGenre"));
        }
    }
}

export default new MovieGenreController();
