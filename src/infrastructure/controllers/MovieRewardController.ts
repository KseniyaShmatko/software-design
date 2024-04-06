import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { movieRewardService } from '../../core/services/RelationServices/MovieRewardServices';
import { MovieRewardDto, AddMovieRewardDto } from '../../core/repositories/RelationRepository/MovieRewardDto';

class MovieRewardController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const movieRewards = await movieRewardService.getAll();
            return res.json(movieRewards);
        } catch (error) {
            console.error("Error occurred while getting all movieRewards:", error);
            return next(ApiError.internal("Failed to get all movieRewards"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieReward = await movieRewardService.getById(id);
            if (!movieReward) {
                return next(ApiError.badRequest("MovieReward not found"));
            }
            return res.json(movieReward);
        } catch (error) {
            console.error("Error occurred while getting movieReward by ID:", error);
            return next(ApiError.internal("Failed to get movieReward by ID"));
        }
    }

    async getByMovieId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieReward = await movieRewardService.getByMovieId(id);
            if (!movieReward) {
                return next(ApiError.badRequest("MovieReward not found"));
            }
            return res.json(movieReward);
        } catch (error) {
            console.error("Error occurred while getting movieReward by movie_id:", error);
            return next(ApiError.internal("Failed to get movieReward by movie_id"));
        }
    }

    async getByRewardId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const movieReward = await movieRewardService.getByRewardId(id);
            if (!movieReward) {
                return next(ApiError.badRequest("MovieReward not found"));
            }
            return res.json(movieReward);
        } catch (error) {
            console.error("Error occurred while getting movieReward by reward_id:", error);
            return next(ApiError.internal("Failed to get movieReward by reward_id"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { movie_id, reward_id } = req.body;
            const dto = new MovieRewardDto(movie_id, reward_id);
            const dtoAdd = new AddMovieRewardDto(dto);
            const movieReward = await movieRewardService.add(dtoAdd);
            return res.json(movieReward);
        } catch (error) {
            console.error("Error occurred while adding movieReward:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await movieRewardService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting movieReward:", error);
            return next(ApiError.internal("Failed to delete movieReward"));
        }
    }
}

export default new MovieRewardController();
