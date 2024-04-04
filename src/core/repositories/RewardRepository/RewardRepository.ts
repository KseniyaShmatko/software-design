import { Reward } from "../../models/Reward/Reward";
import { AddRewardDto, UpdateRewardDto } from "./RewardDto";
import { RewardRepository } from "./IRewardRepository";
import { RewardDB } from "../../../infrastructure/db/entities/entities";
import { Sequelize } from 'sequelize';

class RewardRepositorySQL implements RewardRepository {
    async getById(id: number): Promise<Reward | null> {
        try {
            const rewardModel = await RewardDB.findByPk(id);
            if (rewardModel) {
                const rewardData = rewardModel.toJSON();
                return new Reward(rewardData.id, rewardData.name, rewardData.description, rewardData.photo);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting reward by ID:", error);
            throw new Error("Failed to get reward by ID");
        }
    }

    async getAll(): Promise<Reward[]> {
        try {
            const rewardsModels = await RewardDB.findAll();
            const rewardsData = rewardsModels.map(rewardModel => rewardModel.toJSON());
            const rewards = rewardsData.map(rewardData => new Reward(rewardData.id, rewardData.name, rewardData.description, rewardData.photo));
            return rewards;
        } catch (error) {
            console.error("Error occurred while getting all rewards:", error);
            throw new Error("Failed to get all rewards");
        }
    }

    async add(dto: AddRewardDto): Promise<Reward> {
        try {
            const { name, description, photo } = dto;
            const rewardModel = await RewardDB.create({ name, description, photo });
            const reward = rewardModel.toJSON();
            return new Reward(reward.id, reward.name, reward.description, reward.photo);
        } catch (error) {
            console.error("Error occurred while adding reward:", error);
            throw new Error("Failed to add reward");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await RewardDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting reward:", error);
            throw new Error("Failed to delete reward");
        }
    }

    async getByName(name: string): Promise<Reward | null> {
        try {
            const rewardModel = await RewardDB.findOne({
                where: Sequelize.literal(`LOWER(name) = LOWER('${name}')`)
            });
            if (rewardModel) {
                const reward = rewardModel.toJSON();
                return new Reward(reward.id, reward.name, reward.description, reward.photo);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting reward by name:", error);
            throw new Error("Failed to get reward by name");
        }
    }

    async update(dto: UpdateRewardDto, id: number): Promise<Reward> {
        try {
            const searchedReward = await RewardDB.findByPk(id);
            if (!searchedReward) {
                throw new Error("Reward not found");
            }
            await RewardDB.update(dto, { where: { id: id } });
            const updatedRewardModel = await RewardDB.findByPk(id);
            const updatedReward = updatedRewardModel?.toJSON();
            return new Reward(updatedReward.id, updatedReward.name, updatedReward.description, updatedReward.photo);
        } catch (error) {
            console.error("Error occurred while updating reward:", error);
            throw new Error("Failed to update reward");
        }
    }
}

export const rewardRepositorySQL = new RewardRepositorySQL();
