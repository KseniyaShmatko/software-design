import { Participant } from "../../models/Participant/Participant";
import { ParticipantRepository } from "./IParticipantRepository";
import { AddParticipantDto, UpdateParticipantDto } from "./ParticipantDto";
import { ParticipantDB } from "../../../infrastructure/db/entities/entities";
import { Sequelize } from 'sequelize';

export class ParticipantRepositorySQL implements ParticipantRepository {
    async getById(id: number): Promise<Participant | null> {
        try {
            const participantModel = await ParticipantDB.findByPk(id);
            if (participantModel) {
                const participantData = participantModel.toJSON();
                return new Participant(participantData.id, participantData.name, participantData.surname, participantData.birth, participantData.death, participantData.photo);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting participant by ID:", error);
            throw new Error("Failed to get participant by ID");
        }
    }

    async getAll(): Promise<Participant[]> {
        try {
            const participantsModels = await ParticipantDB.findAll();
            const participantsData = participantsModels.map(participantModel => participantModel.toJSON());
            const participants = participantsData.map(participantData => new Participant(participantData.id, participantData.name, participantData.surname, participantData.birth, participantData.death, participantData.photo));
            return participants;
        } catch (error) {
            console.error("Error occurred while getting all participants:", error);
            throw new Error("Failed to get all participants");
        }
    }

    async add(dto: AddParticipantDto): Promise<Participant> {
        try {
            const { name, surname, birth, death, photo } = dto;
            const participantModel = await ParticipantDB.create({ name, surname, birth, death, photo });
            const participant = participantModel.toJSON();
            return new Participant(participant.id, participant.name, participant.surname, participant.birth, participant.death, participant.photo);
        } catch (error) {
            console.error("Error occurred while adding participant:", error);
            throw new Error("Failed to add participant");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await ParticipantDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting participant:", error);
            throw new Error("Failed to delete participant");
        }
    }

    async getByNameSurname(name: string, surname: string): Promise<Participant | null> {
        try {
            const participantModel = await ParticipantDB.findOne({
                where: Sequelize.literal(`LOWER(name) = LOWER('${name}') AND LOWER(surname) = LOWER('${surname}')`)
            });
            if (participantModel) {
                const participant = participantModel.toJSON();
                return new Participant(participant.id, participant.name, participant.surname, participant.birth, participant.death, participant.photo);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting participant by name and surname:", error);
            throw new Error("Failed to get participant by name and surname");
        }
    }

    async update(dto: UpdateParticipantDto, id: number): Promise<Participant> {
        try {
            const searchedParticipantModel = await ParticipantDB.findByPk(id);
            if (!searchedParticipantModel) {
                throw new Error("Participant not found");
            }
            await ParticipantDB.update(dto, { where: { id: id } });
            const updatedParticipantModel = await ParticipantDB.findByPk(id);
            const updatedParticipant = updatedParticipantModel?.toJSON();
            return new Participant(updatedParticipant.id, updatedParticipant.name, updatedParticipant.surname, updatedParticipant.birth, updatedParticipant.death, updatedParticipant.photo);
        } catch (error) {
            console.error("Error occurred while updating participant:", error);
            throw new Error("Failed to update participant");
        }
    }
}

export const participantRepositorySQL = new ParticipantRepositorySQL();
