import { StudioRepository } from "../../repositories/StudioRepository/IStudioRepository";
import { studioRepositorySQL } from "../../repositories/StudioRepository/StudioRepository";
import { AddStudioDto, UpdateStudioDto } from "../../repositories/StudioRepository/StudioDto";

class StudioService {
    constructor (readonly studioRepository: StudioRepository ) {}

    async getById(id: number) {
        try {
            return await this.studioRepository.getById(id);
        } catch (error) {
            console.error(`Error getting studio by id: ${error}`);
            return null;
        }
    }

    async getByName(name: string) {
        try {
            return await this.studioRepository.getByName(name);
        } catch (error) {
            console.error(`Error getting studio by name: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.studioRepository.getAll();
        } catch (error) {
            console.error(`Error getting all studios: ${error}`);
            return null;
        }
    }

    async add(dto: AddStudioDto) {
        try {
            return await this.studioRepository.add(dto);
        } catch (error) {
            console.error(`Error adding studio: ${error}`);
            return null;
        }
    }

    async update(dto: UpdateStudioDto, id: number) {
        try {
            return await this.studioRepository.update(dto, id);
        } catch (error) {
            console.error(`Error updating studio: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.studioRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting studio: ${error}`);
            return null;
        }
    }
};

const studioService = new StudioService(studioRepositorySQL);
export { studioService, StudioService };