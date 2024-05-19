import { ParticipantRewardRepository } from "../../repositories/RelationRepository/IParticipantRewardRepository";
import { participantRewardRepositorySQL } from "../../repositories/RelationRepository/ParticipantRewardRepository";
import { AddParticipantRewardDto } from "../../repositories/RelationRepository/ParticipantRewardDto";
import logger from "../../logger";

class ParticipantRewardService {
    constructor (readonly participantRewardRepository: ParticipantRewardRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting participantReward by id: ${id}`, 'ParticipantRewardService');
            return await this.participantRewardRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting participantReward by id: ${error}`, 'ParticipantRewardService');
            return null;
        }
    }

    async getByParticipantId(participant_id: number) {
        try {
            logger.info(`Getting participantRewards by participant_id: ${participant_id}`, 'ParticipantRewardService')
            return await this.participantRewardRepository.getByParticipantId(participant_id);
        } catch (error) {
            logger.error(`Error getting participantRewards by participant_id: ${error}`, 'ParticipantRewardService');
            return null;
        }
    }

    async getByRewardId(reward_id: number) {
        try {
            logger.info(`Getting participantRewards by reward_id: ${reward_id}`, 'ParticipantRewardService');
            return await this.participantRewardRepository.getByRewardId(reward_id);
        } catch (error) {
            logger.error(`Error getting participantRewards by reward_id: ${error}`, 'ParticipantRewardService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all participantRewards`, 'ParticipantRewardService');
            return await this.participantRewardRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all participantRewards: ${error}`, 'ParticipantRewardService');
            return null;
        }
    }

    async add(dto: AddParticipantRewardDto) {
        try {
            logger.info(`Adding participantReward`, 'ParticipantRewardService');
            return await this.participantRewardRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding participantReward: ${error}`, 'ParticipantRewardService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting participantReward with id: ${id}`, 'ParticipantRewardService');
            await this.participantRewardRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting participantReward: ${error}`, 'ParticipantRewardService');
            return null;
        }
    }
};

const participantRewardService = new ParticipantRewardService(participantRewardRepositorySQL);
export { participantRewardService, ParticipantRewardService };