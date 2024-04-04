import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { rewardService } from '../../core/services/RewardServices/RewardServices';
import { RewardDto, AddRewardDto, UpdateRewardDto } from '../../core/repositories/RewardRepository/RewardDto';

class RewardController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const rewards = await rewardService.getAll();
            return res.json(rewards);
        } catch (error) {
            console.error("Error occurred while getting all rewards:", error);
            return next(ApiError.internal("Failed to get all rewards"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const reward = await rewardService.getById(id);
            if (!reward) {
                return next(ApiError.badRequest("Reward not found"));
            }
            return res.json(reward);
        } catch (error) {
            console.error("Error occurred while getting reward by ID:", error);
            return next(ApiError.internal("Failed to get reward by ID"));
        }
    }

    async getOneByName(req: Request, res: Response, next: NextFunction) {
        try {
            const reward = await rewardService.getByName(req.params.name);
            if (!reward) {
                return next(ApiError.badRequest("Reward not found"));
            }
            return res.json(reward);
        } catch (error) {
            console.error("Error occurred while getting reward by name:", error);
            return next(ApiError.internal("Failed to get reward by name"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, photo } = req.body;
            const dto = new RewardDto(name, description, photo);
            const dtoAdd = new AddRewardDto(dto);
            const reward = await rewardService.add(dtoAdd);
            return res.json(reward);
        } catch (error) {
            console.error("Error occurred while adding reward:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const { name, description, photo } = req.body;
            const dto = new RewardDto(name, description, photo);
            const dtoUpdate = new UpdateRewardDto(dto);
            const updatedReward = await rewardService.update(dtoUpdate, id);
            return res.json(updatedReward);
        } catch (error) {
            console.error("Error occurred while updating reward:", error);
            return next(ApiError.internal("Failed to update reward"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await rewardService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting reward:", error);
            return next(ApiError.internal("Failed to delete reward"));
        }
    }
}

export default new RewardController();
