import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { participantRewardService } from '../../core/services/RelationServices/ParticipantRewardServices';
import { ParticipantRewardDto, AddParticipantRewardDto } from '../../core/repositories/RelationRepository/ParticipantRewardDto';

class ParticipantRewardController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const participantRewards = await participantRewardService.getAll();
            return res.json(participantRewards);
        } catch (error) {
            console.error("Error occurred while getting all participantRewards:", error);
            return next(ApiError.internal("Failed to get all participantRewards"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const participantReward = await participantRewardService.getById(id);
            if (!participantReward) {
                return next(ApiError.badRequest("ParticipantReward not found"));
            }
            return res.json(participantReward);
        } catch (error) {
            console.error("Error occurred while getting participantReward by ID:", error);
            return next(ApiError.internal("Failed to get participantReward by ID"));
        }
    }

    async getByParticipantId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const participantReward = await participantRewardService.getByParticipantId(id);
            if (!participantReward) {
                return next(ApiError.badRequest("ParticipantReward not found"));
            }
            return res.json(participantReward);
        } catch (error) {
            console.error("Error occurred while getting participantReward by participant_id:", error);
            return next(ApiError.internal("Failed to get participantReward by participant_id"));
        }
    }

    async getByRewardId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const participantReward = await participantRewardService.getByRewardId(id);
            if (!participantReward) {
                return next(ApiError.badRequest("ParticipantReward not found"));
            }
            return res.json(participantReward);
        } catch (error) {
            console.error("Error occurred while getting participantReward by reward_id:", error);
            return next(ApiError.internal("Failed to get participantReward by reward_id"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { participant_id, reward_id } = req.body;
            const dto = new ParticipantRewardDto(participant_id, reward_id);
            const dtoAdd = new AddParticipantRewardDto(dto);
            const participantReward = await participantRewardService.add(dtoAdd);
            return res.json(participantReward);
        } catch (error) {
            console.error("Error occurred while adding participantReward:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await participantRewardService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting participantReward:", error);
            return next(ApiError.internal("Failed to delete participantReward"));
        }
    }
}

export default new ParticipantRewardController();
