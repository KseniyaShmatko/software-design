import { ParticipantRepository } from "../../repositories/ParticipantRepository/IParticipantRepository";
import { participantRepositorySQL } from "../../repositories/ParticipantRepository/ParticipantRepository";
import { AddParticipantDto, UpdateParticipantDto } from "../../repositories/ParticipantRepository/ParticipantDto";
import logger from '../../logger';

class ParticipantService {
    constructor (readonly participantRepository: ParticipantRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting participant by id: ${id}`, 'ParticipantService');
            return await this.participantRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting participant by id: ${error}`, 'ParticipantService');
            return null;
        }
    }

    async getByNameSurname(name: string, surname: string) {
        try {
            logger.info(`Getting participant by name and surname: ${name} ${surname}`, 'ParticipantService');
            return await this.participantRepository.getByNameSurname(name, surname);
        } catch (error) {
            logger.error(`Error getting participant by name and surname: ${error}`, 'ParticipantService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all participants`, 'ParticipantService');
            return await this.participantRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all participants: ${error}`, 'ParticipantService');
            return null;
        }
    }

    async add(dto: AddParticipantDto) {
        try {
            logger.info(`Adding participant`, 'ParticipantService');
            return await this.participantRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding participant: ${error}`, 'ParticipantService');
            return null;
        }
    }

    async update(dto: UpdateParticipantDto, id: number) {
        try {
            logger.info(`Updating participant: ${id}`, 'ParticipantService');
            return await this.participantRepository.update(dto, id);
        } catch (error) {
            logger.error(`Error updating participant: ${error}`, 'ParticipantService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting participant: ${id}`, 'ParticipantService');
            await this.participantRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting participant: ${error}`, 'ParticipantService');
            return null;
        }
    }
};

const participantService = new ParticipantService(participantRepositorySQL);
export { participantService, ParticipantService };