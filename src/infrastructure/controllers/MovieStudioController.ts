import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { movieStudioService } from '../../core/services/RelationServices/MovieStudioServices';
import { MovieStudioDto, AddMovieStudioDto } from '../../core/repositories/RelationRepository/MovieStudioDto';

class MovieStudioController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const movieStudios = await movieStudioService.getAll();
            return res.json(movieStudios);
        } catch (error) {
            console.error("Error occurred while getting all movieStudios:", error);
            return next(ApiError.internal("Failed to get all movieStudios"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieStudio = await movieStudioService.getById(id);
            if (!movieStudio) {
                return next(ApiError.badRequest("MovieStudio not found"));
            }
            return res.json(movieStudio);
        } catch (error) {
            console.error("Error occurred while getting movieStudio by ID:", error);
            return next(ApiError.internal("Failed to get movieStudio by ID"));
        }
    }

    async getByMovieId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieStudio = await movieStudioService.getByMovieId(id);
            if (!movieStudio) {
                return next(ApiError.badRequest("MovieStudio not found"));
            }
            return res.json(movieStudio);
        } catch (error) {
            console.error("Error occurred while getting movieStudio by movie_id:", error);
            return next(ApiError.internal("Failed to get movieStudio by movie_id"));
        }
    }

    async getByStudioId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieStudio = await movieStudioService.getByStudioId(id);
            if (!movieStudio) {
                return next(ApiError.badRequest("MovieStudio not found"));
            }
            return res.json(movieStudio);
        } catch (error) {
            console.error("Error occurred while getting movieStudio by studio_id:", error);
            return next(ApiError.internal("Failed to get movieStudio by studio_id"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { movie_id, studio_id } = req.body;
            const dto = new MovieStudioDto(movie_id, studio_id);
            const dtoAdd = new AddMovieStudioDto(dto);
            const movieStudio = await movieStudioService.add(dtoAdd);
            return res.json(movieStudio);
        } catch (error) {
            console.error("Error occurred while adding movieStudio:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await movieStudioService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting movieStudio:", error);
            return next(ApiError.internal("Failed to delete movieStudio"));
        }
    }
}

export default new MovieStudioController();
