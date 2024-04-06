import { ParticipantReward } from "../../models/Relation/ParticipantReward";
import { AddParticipantRewardDto } from "./ParticipantRewardDto";
import { ParticipantRewardRepository } from "./IParticipantRewardRepository";
import { ParticipantRewardDB } from "../../../infrastructure/db/entities/entities";

class ParticipantRewardRepositorySQL implements ParticipantRewardRepository {
    async getById(id: number): Promise<ParticipantReward | null> {
        try {
            const participantRewardModel = await ParticipantRewardDB.findByPk(id);
            if (participantRewardModel) {
                const participantRewardData = participantRewardModel.toJSON();
                return new ParticipantReward(participantRewardData.id, participantRewardData.participant_id, participantRewardData.reward_id);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting participantReward by ID:", error);
            throw new Error("Failed to get participantReward by ID");
        }
    }

    async getAll(): Promise<ParticipantReward[]> {
        try {
            const participantRewardsModels = await ParticipantRewardDB.findAll();
            const participantRewardsData = participantRewardsModels.map(participantRewardModel => participantRewardModel.toJSON());
            const participantRewards = participantRewardsData.map(participantRewardData => new ParticipantReward(participantRewardData.id, participantRewardData.participant_id, participantRewardData.reward_id));
            return participantRewards;
        } catch (error) {
            console.error("Error occurred while getting all participantRewards:", error);
            throw new Error("Failed to get all participantRewards");
        }
    }

    async add(dto: AddParticipantRewardDto): Promise<ParticipantReward> {
        try {
            const { participant_id, reward_id } = dto;
            const participantRewardModel = await ParticipantRewardDB.create({ participant_id, reward_id });
            const participantReward = participantRewardModel.toJSON();
            return new ParticipantReward(participantReward.id, participantReward.participant_id, participantReward.reward_id);
        } catch (error) {
            console.error("Error occurred while adding participantReward:", error);
            throw new Error("Failed to add participantReward");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await ParticipantRewardDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting participantReward:", error);
            throw new Error("Failed to delete participantReward");
        }
    }

    async getByParticipantId(id: number): Promise<ParticipantReward[]> {
        try {
            const participantRewardsModels = await ParticipantRewardDB.findAll({ where: { participant_id: id } });
            const participantRewardsData = participantRewardsModels.map(participantRewardModel => participantRewardModel.toJSON());
            const participantRewards = participantRewardsData.map(participantRewardData => new ParticipantReward(participantRewardData.id, participantRewardData.participant_id, participantRewardData.reward_id));
            return participantRewards;
        } catch (error) {
            console.error("Error occurred while getting participantRewards by participant ID:", error);
            throw new Error("Failed to get participantRewards by participant ID");
        }
    }

    async getByRewardId(id: number): Promise<ParticipantReward[]> {
        try {
            const participantRewardsModels = await ParticipantRewardDB.findAll({ where: { reward_id: id } });
            const participantRewardsData = participantRewardsModels.map(participantRewardModel => participantRewardModel.toJSON());
            const participantRewards = participantRewardsData.map(participantRewardData => new ParticipantReward(participantRewardData.id, participantRewardData.participant_id, participantRewardData.reward_id));
            return participantRewards;
        } catch (error) {
            console.error("Error occurred while getting participantRewards by participant ID:", error);
            throw new Error("Failed to get participantRewards by participant ID");
        }
    }
}

export const participantRewardRepositorySQL = new ParticipantRewardRepositorySQL();
