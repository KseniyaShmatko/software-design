import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { studioService } from '../../core/services/StudioServices/StudioServices';
import { StudioDto, AddStudioDto, UpdateStudioDto } from '../../core/repositories/StudioRepository/StudioDto';

class StudioController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const studios = await studioService.getAll();
            return res.json(studios);
        } catch (error) {
            console.error("Error occurred while getting all studios:", error);
            return next(ApiError.internal("Failed to get all studios"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const studio = await studioService.getById(id);
            if (!studio) {
                return next(ApiError.badRequest("Studio not found"));
            }
            return res.json(studio);
        } catch (error) {
            console.error("Error occurred while getting studio by ID:", error);
            return next(ApiError.internal("Failed to get studio by ID"));
        }
    }

    async getOneByName(req: Request, res: Response, next: NextFunction) {
        try {
            const studio = await studioService.getByName(req.params.name);
            if (!studio) {
                return next(ApiError.badRequest("Studio not found"));
            }
            return res.json(studio);
        } catch (error) {
            console.error("Error occurred while getting studio by name:", error);
            return next(ApiError.internal("Failed to get studio by name"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, founder, country, foundation, photo } = req.body;
            const dto = new StudioDto(name, founder, country, foundation, photo);
            const dtoAdd = new AddStudioDto(dto);
            const studio = await studioService.add(dtoAdd);
            return res.json(studio);
        } catch (error) {
            console.error("Error occurred while adding studio:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const { name, founder, country, foundation, photo } = req.body;
            const dto = new StudioDto(name, founder, country, foundation, photo);
            const dtoUpdate = new UpdateStudioDto(dto);
            const updatedStudio = await studioService.update(dtoUpdate, id);
            return res.json(updatedStudio);
        } catch (error) {
            console.error("Error occurred while updating studio:", error);
            return next(ApiError.internal("Failed to update studio"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await studioService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting studio:", error);
            return next(ApiError.internal("Failed to delete studio"));
        }
    }
}

export default new StudioController();
