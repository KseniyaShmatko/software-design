import { Studio } from "../../models/Studio/Studio";
import { AddStudioDto, UpdateStudioDto } from "./StudioDto";
import { StudioRepository } from "./IStudioRepository";
import { StudioDB } from "../../../infrastructure/db/entities/entities";
import { Sequelize } from 'sequelize';

class StudioRepositorySQL implements StudioRepository {
    async getById(id: number): Promise<Studio | null> {
        try {
            const studioModel = await StudioDB.findByPk(id);
            if (studioModel) {
                const studioData = studioModel.toJSON();
                return new Studio(studioData.id, studioData.name, studioData.founder, studioData.country, studioData.foundation, studioData.photo);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting studio by ID:", error);
            throw new Error("Failed to get studio by ID");
        }
    }

    async getAll(): Promise<Studio[]> {
        try {
            const studiosModels = await StudioDB.findAll();
            const studiosData = studiosModels.map(studioModel => studioModel.toJSON());
            const studios = studiosData.map(studioData => new Studio(studioData.id, studioData.name, studioData.founder, studioData.country, studioData.foundation, studioData.photo));
            return studios;
        } catch (error) {
            console.error("Error occurred while getting all studios:", error);
            throw new Error("Failed to get all studios");
        }
    }

    async add(dto: AddStudioDto): Promise<Studio> {
        try {
            const { name, founder, country, foundation, photo } = dto;
            const studioModel = await StudioDB.create({ name, founder, country, foundation, photo });
            const studio = studioModel.toJSON();
            return new Studio(studio.id, studio.name, studio.founder, studio.country, studio.foundation, studio.photo);
        } catch (error) {
            console.error("Error occurred while adding studio:", error);
            throw new Error("Failed to add studio");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await StudioDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting studio:", error);
            throw new Error("Failed to delete studio");
        }
    }

    async getByName(name: string): Promise<Studio | null> {
        try {
            const studioModel = await StudioDB.findOne({
                where: Sequelize.literal(`LOWER(name) = LOWER('${name}')`)
            });
            if (studioModel) {
                const studio = studioModel.toJSON();
                return new Studio(studio.id, studio.name, studio.founder, studio.country, studio.foundation, studio.photo);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting studio by name:", error);
            throw new Error("Failed to get studio by name");
        }
    }

    async update(dto: UpdateStudioDto, id: number): Promise<Studio> {
        try {
            const searchedStudio = await StudioDB.findByPk(id);
            if (!searchedStudio) {
                throw new Error("Studio not found");
            }
            await StudioDB.update(dto, { where: { id: id } });
            const updatedStudioModel = await StudioDB.findByPk(id);
            const updatedStudio = updatedStudioModel?.toJSON();
            return new Studio(updatedStudio.id, updatedStudio.name, updatedStudio.founder, updatedStudio.country, updatedStudio.foundation, updatedStudio.photo);
        } catch (error) {
            console.error("Error occurred while updating studio:", error);
            throw new Error("Failed to update studio");
        }
    }
}

export const studioRepositorySQL = new StudioRepositorySQL();
