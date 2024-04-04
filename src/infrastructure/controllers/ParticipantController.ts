import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { participantService } from '../../core/services/ParticipantServices/ParticipantServices';
import { ParticipantDto, AddParticipantDto, UpdateParticipantDto } from '../../core/repositories/ParticipantRepository/ParticipantDto';

class ParticipantController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const participants = await participantService.getAll();
            return res.json(participants);
        } catch (error) {
            console.error("Error occurred while getting all participants:", error);
            return next(ApiError.internal("Failed to get all participants"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const participant = await participantService.getById(id);
            if (!participant) {
                return next(ApiError.badRequest("Participant not found"));
            }
            return res.json(participant);
        } catch (error) {
            console.error("Error occurred while getting participant by ID:", error);
            return next(ApiError.internal("Failed to get participant by ID"));
        }
    }

    async getOneByNameSurname(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, surname } = req.params;
            const participant = await participantService.getByNameSurname(name, surname);
            if (!participant) {
                return next(ApiError.badRequest("Participant not found"));
            }
            return res.json(participant);
        } catch (error) {
            console.error("Error occurred while getting participant by name and surname:", error);
            return next(ApiError.internal("Failed to get participant by name and surname"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, surname, birth, death, photo } = req.body;
            const dto = new ParticipantDto(name, surname, birth, death, photo);
            const dtoAdd = new AddParticipantDto(dto);
            const participant = await participantService.add(dtoAdd);
            return res.json(participant);
        } catch (error) {
            console.error("Error occurred while adding participant:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const { name, surname, birth, death, photo } = req.body;
            const dto = new ParticipantDto(name, surname, birth, death, photo);
            const dtoUpdate = new UpdateParticipantDto(dto);
            const updatedParticipant = await participantService.update(dtoUpdate, id);
            return res.json(updatedParticipant);
        } catch (error) {
            console.error("Error occurred while updating participant:", error);
            return next(ApiError.internal("Failed to update participant"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await participantService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting participant:", error);
            return next(ApiError.internal("Failed to delete participant"));
        }
    }
}

export default new ParticipantController();
