import { RewardRepository } from "../../repositories/RewardRepository/IRewardRepository";
import { rewardRepositorySQL } from "../../repositories/RewardRepository/RewardRepository";
import { AddRewardDto, UpdateRewardDto } from "../../repositories/RewardRepository/RewardDto";
import logger from '../../logger';

class RewardService {
    constructor (readonly rewardRepository: RewardRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting reward by id: ${id}`, 'RewardService');
            return await this.rewardRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting reward by id: ${error}`, 'RewardService');
            return null;
        }
    }

    async getByName(name: string) {
        try {
            logger.info(`Getting reward by name: ${name}`, 'RewardService');
            return await this.rewardRepository.getByName(name);
        } catch (error) {
            logger.error(`Error getting reward by name: ${error}`, 'RewardService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all rewards`, 'RewardService');
            return await this.rewardRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all rewards: ${error}`, 'RewardService');
            return null;
        }
    }

    async add(dto: AddRewardDto) {
        try {
            logger.info(`Adding reward`, 'RewardService');
            return await this.rewardRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding reward: ${error}`, 'RewardService');
            return null;
        }
    }

    async update(dto: UpdateRewardDto, id: number) {
        try {
            logger.info(`Updating reward: ${id}`, 'RewardService');
            return await this.rewardRepository.update(dto, id);
        } catch (error) {
            logger.error(`Error updating reward: ${error}`, 'RewardService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting reward: ${id}`, 'RewardService');
            await this.rewardRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting reward: ${error}`, 'RewardService');
            return null;
        }
    }
};

const rewardService = new RewardService(rewardRepositorySQL);
export { rewardService, RewardService };