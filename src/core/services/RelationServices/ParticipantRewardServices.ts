import { ParticipantRewardRepository } from "../../repositories/RelationRepository/IParticipantRewardRepository";
import { AddParticipantRewardDto } from "../../repositories/RelationRepository/ParticipantRewardDto";

export class ParticipantRewardService {
    constructor (readonly participantRewardRepository: ParticipantRewardRepository ) {}

    async getById(id: number) {
        try {
            return await this.participantRewardRepository.getById(id);
        } catch (error) {
            console.error(`Error getting participantReward by id: ${error}`);
            return null;
        }
    }

    async getByParticipantId(participant_id: number) {
        try {
            return await this.participantRewardRepository.getByParticipantId(participant_id);
        } catch (error) {
            console.error(`Error getting participantRewards by participant_id: ${error}`);
            return null;
        }
    }

    async getByRewardId(reward_id: number) {
        try {
            return await this.participantRewardRepository.getByRewardId(reward_id);
        } catch (error) {
            console.error(`Error getting participantRewards by reward_id: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.participantRewardRepository.getAll();
        } catch (error) {
            console.error(`Error getting all participantRewards: ${error}`);
            return null;
        }
    }

    async add(dto: AddParticipantRewardDto) {
        try {
            return await this.participantRewardRepository.add(dto);
        } catch (error) {
            console.error(`Error adding participantReward: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.participantRewardRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting participantReward: ${error}`);
            return null;
        }
    }
};