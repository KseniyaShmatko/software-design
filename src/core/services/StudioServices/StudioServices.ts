import { StudioRepository } from "../../repositories/StudioRepository/IStudioRepository";
import { studioRepositorySQL } from "../../repositories/StudioRepository/StudioRepository";
import { AddStudioDto, UpdateStudioDto } from "../../repositories/StudioRepository/StudioDto";
import logger from '../../logger';

class StudioService {
    constructor (readonly studioRepository: StudioRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting studio by id: ${id}`, 'StudioService');
            return await this.studioRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting studio by id: ${error}`, 'StudioService');
            return null;
        }
    }

    async getByName(name: string) {
        try {
            logger.info(`Getting studio by name: ${name}`, 'StudioService');
            return await this.studioRepository.getByName(name);
        } catch (error) {
            logger.error(`Error getting studio by name: ${error}`, 'StudioService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all studios`, 'StudioService');
            return await this.studioRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all studios: ${error}`, 'StudioService');
            return null;
        }
    }

    async add(dto: AddStudioDto) {
        try {
            logger.info(`Adding studio`, 'StudioService');
            return await this.studioRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding studio: ${error}`, 'StudioService');
            return null;
        }
    }

    async update(dto: UpdateStudioDto, id: number) {
        try {
            logger.info(`Updating studio: ${id}`, 'StudioService');
            return await this.studioRepository.update(dto, id);
        } catch (error) {
            logger.error(`Error updating studio: ${error}`, 'StudioService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting studio: ${id}`, 'StudioService');
            await this.studioRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting studio: ${error}`, 'StudioService');
            return null;
        }
    }
};

const studioService = new StudioService(studioRepositorySQL);
export { studioService, StudioService };