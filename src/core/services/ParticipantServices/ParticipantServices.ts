import { ParticipantRepository } from "../../repositories/ParticipantRepository/IParticipantRepository";
import { participantRepositorySQL } from "../../repositories/ParticipantRepository/ParticipantRepository";
import { AddParticipantDto, UpdateParticipantDto } from "../../repositories/ParticipantRepository/ParticipantDto";

class ParticipantService {
    constructor (readonly participantRepository: ParticipantRepository ) {}

    async getById(id: number) {
        try {
            return await this.participantRepository.getById(id);
        } catch (error) {
            console.error(`Error getting participant by id: ${error}`);
            return null;
        }
    }

    async getByNameSurname(name: string, surname: string) {
        try {
            return await this.participantRepository.getByNameSurname(name, surname);
        } catch (error) {
            console.error(`Error getting participant by name and surname: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.participantRepository.getAll();
        } catch (error) {
            console.error(`Error getting all participants: ${error}`);
            return null;
        }
    }

    async add(dto: AddParticipantDto) {
        try {
            return await this.participantRepository.add(dto);
        } catch (error) {
            console.error(`Error adding participant: ${error}`);
            return null;
        }
    }

    async update(dto: UpdateParticipantDto, id: number) {
        try {
            return await this.participantRepository.update(dto, id);
        } catch (error) {
            console.error(`Error updating participant: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.participantRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting participant: ${error}`);
            return null;
        }
    }
};

const participantService = new ParticipantService(participantRepositorySQL);
export { participantService, ParticipantService };