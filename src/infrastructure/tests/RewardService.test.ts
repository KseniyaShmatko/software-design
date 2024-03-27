import { RewardService } from "../../core/services/RewardServices/RewardServices";
import { RewardRepository } from "../../core/repositories/RewardRepository/RewardRepository";
import { AddRewardDto, UpdateRewardDto } from "../../core/repositories/RewardRepository/RewardDto";
import { Reward } from "../../core/models/Reward/Reward";

const mockRewardRepository: jest.Mocked<RewardRepository> = {
    getById: jest.fn(),
    getByName: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const rewardService = new RewardService(mockRewardRepository);

describe('RewardService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get reward by id', async () => {
        const expectedReward: Reward = {
            id: 1,
            name: 'Test Reward',
            description: 'Description',
            photo: 'photo.jpg',
        };

        mockRewardRepository.getById.mockReturnValueOnce(expectedReward);

        const result = await rewardService.getById(1);

        expect(result).toEqual(expectedReward);
        expect(mockRewardRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get reward by name', async () => {
        const expectedReward: Reward = {
            id: 1,
            name: 'Test Reward',
            description: 'Description',
            photo: 'photo.jpg',
        };

        mockRewardRepository.getByName.mockReturnValueOnce(expectedReward);

        const result = await rewardService.getByName('Test Reward');

        expect(result).toEqual(expectedReward);
        expect(mockRewardRepository.getByName).toHaveBeenCalledWith('Test Reward');
    });

    it('should get all rewards', async () => {
        const expectedRewards: Reward[] = [
            {
                id: 1,
                name: 'Test Reward 1',
                description: 'Description 1',
                photo: 'photo1.jpg',
            },
            {
                id: 2,
                name: 'Test Reward 2',
                description: 'Description 2',
                photo: 'photo2.jpg',
            },
        ];

        mockRewardRepository.getAll.mockReturnValueOnce(expectedRewards);

        const result = await rewardService.getAll();

        expect(result).toEqual(expectedRewards);
        expect(mockRewardRepository.getAll).toHaveBeenCalled();
    });


    it('should add a new reward', async () => {
        const rewardDto: AddRewardDto = {
            name: 'New Reward',
            description: 'Description',
            photo: 'photo.jpg',
        };

        const expectedReward: Reward = {
            id: 1,
            ...rewardDto,
        };

        mockRewardRepository.add.mockReturnValueOnce(expectedReward);

        const result = await rewardService.add(rewardDto);

        expect(result).toEqual(expectedReward);
        expect(mockRewardRepository.add).toHaveBeenCalledWith(rewardDto);
    });

    it('should update an existing reward', async () => {
        const rewardDto: UpdateRewardDto = {
            name: 'Updated Reward',
            description: 'Updated Description',
            photo: 'updated_photo.jpg',
        };
    
        const expectedReward: Reward = {
            id: 1,
            ...rewardDto,
        };

        mockRewardRepository.update.mockReturnValueOnce(expectedReward);
    
        const result = await rewardService.update(rewardDto);
    
        expect(result).toEqual(expectedReward);
        expect(mockRewardRepository.update).toHaveBeenCalledWith(rewardDto);
    });

    it('should delete a reward by id', async () => {
        mockRewardRepository.delete.mockReturnValueOnce(undefined);

        await rewardService.delete(1);

        expect(mockRewardRepository.delete).toHaveBeenCalledWith(1);
    });
});

describe('RewardService Errors', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting reward by id', async () => {
        const errorMessage = 'Error getting reward by id';
        mockRewardRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await rewardService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting reward by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting reward by name', async () => {
        const errorMessage = 'Error getting reward by name';
        mockRewardRepository.getByName.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await rewardService.getByName('Test Reward');

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting reward by name: Error: ${errorMessage}`);
    });

    it('should handle error when getting all rewards', async () => {
        const errorMessage = 'Error getting all rewards';
        mockRewardRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await rewardService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all rewards: Error: ${errorMessage}`);
    });

    it('should handle error when adding a new reward', async () => {
        const errorMessage = 'Error adding reward';
        mockRewardRepository.add.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await rewardService.add({ name: 'New Reward', description: 'Description', photo: 'photo.jpg' });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error adding reward: Error: ${errorMessage}`);
    });

    it('should handle error when updating an existing reward', async () => {
        const errorMessage = 'Error updating reward';
        mockRewardRepository.update.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await rewardService.update({ name: 'Updated Reward', description: 'Updated Description', photo: 'updated_photo.jpg' });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error updating reward: Error: ${errorMessage}`);
    });

    it('should handle error when deleting a reward by id', async () => {
        const errorMessage = 'Error deleting reward';
        mockRewardRepository.delete.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await rewardService.delete(1);

        expect(console.error).toHaveBeenCalledWith(`Error deleting reward: Error: ${errorMessage}`);
    });
});
