import { RewardRepository } from "../../repositories/RewardRepository/IRewardRepository";
import { AddRewardDto, UpdateRewardDto } from "../../repositories/RewardRepository/RewardDto";

export class RewardService {
    constructor (readonly rewardRepository: RewardRepository ) {}

    async getById(id: number) {
        try {
            return await this.rewardRepository.getById(id);
        } catch (error) {
            console.error(`Error getting reward by id: ${error}`);
            return null;
        }
    }

    async getByName(name: string) {
        try {
            return await this.rewardRepository.getByName(name);
        } catch (error) {
            console.error(`Error getting reward by name: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.rewardRepository.getAll();
        } catch (error) {
            console.error(`Error getting all rewards: ${error}`);
            return null;
        }
    }

    async add(dto: AddRewardDto) {
        try {
            return await this.rewardRepository.add(dto);
        } catch (error) {
            console.error(`Error adding reward: ${error}`);
            return null;
        }
    }

    async update(dto: UpdateRewardDto) {
        try {
            return await this.rewardRepository.update(dto);
        } catch (error) {
            console.error(`Error updating reward: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.rewardRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting reward: ${error}`);
            return null;
        }
    }
};