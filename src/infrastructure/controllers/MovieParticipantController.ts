import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { movieParticipantService } from '../../core/services/RelationServices/MovieParticipantServices';
import { MovieParticipantDto, AddMovieParticipantDto, UpdateMovieParticipantDto } from '../../core/repositories/RelationRepository/MovieParticipantDto';

class MovieParticipantController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const movieParticipants = await movieParticipantService.getAll();
            return res.json(movieParticipants);
        } catch (error) {
            console.error("Error occurred while getting all movieParticipants:", error);
            return next(ApiError.internal("Failed to get all movieParticipants"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieParticipant = await movieParticipantService.getById(id);
            if (!movieParticipant) {
                return next(ApiError.badRequest("MovieParticipant not found"));
            }
            return res.json(movieParticipant);
        } catch (error) {
            console.error("Error occurred while getting movieParticipant by ID:", error);
            return next(ApiError.internal("Failed to get movieParticipant by ID"));
        }
    }

    async getByMovieId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieParticipant = await movieParticipantService.getByMovieId(id);
            if (!movieParticipant) {
                return next(ApiError.badRequest("MovieParticipant not found"));
            }
            return res.json(movieParticipant);
        } catch (error) {
            console.error("Error occurred while getting movieParticipant by movie_id:", error);
            return next(ApiError.internal("Failed to get movieParticipant by movie_id"));
        }
    }

    async getByParticipantId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieParticipant = await movieParticipantService.getByParticipantId(id);
            if (!movieParticipant) {
                return next(ApiError.badRequest("MovieParticipant not found"));
            }
            return res.json(movieParticipant);
        } catch (error) {
            console.error("Error occurred while getting movieParticipant by participant_id:", error);
            return next(ApiError.internal("Failed to get movieParticipant by participant_id"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { movie_id, participant_id, role } = req.body;
            const dto = new MovieParticipantDto(role);
            const dtoAdd = new AddMovieParticipantDto(dto, movie_id, participant_id);
            const movieParticipant = await movieParticipantService.add(dtoAdd);
            return res.json(movieParticipant);
        } catch (error) {
            console.error("Error occurred while adding movieParticipant:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const { role } = req.body;
            const dto = new MovieParticipantDto(role);
            const dtoUpdate = new UpdateMovieParticipantDto(dto);
            const updatedMovieParticipant = await movieParticipantService.update(dtoUpdate, id);
            return res.json(updatedMovieParticipant);
        } catch (error) {
            console.error("Error occurred while updating movieParticipant:", error);
            return next(ApiError.internal("Failed to update movieParticipant"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await movieParticipantService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting movieParticipant:", error);
            return next(ApiError.internal("Failed to delete movieParticipant"));
        }
    }
}

export default new MovieParticipantController();
