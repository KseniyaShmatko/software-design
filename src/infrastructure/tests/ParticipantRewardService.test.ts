import { ParticipantRewardService } from "../../core/services/RelationServices/ParticipantRewardServices";
import { ParticipantRewardRepository } from "../../core/repositories/RelationRepository/IParticipantRewardRepository";
import { AddParticipantRewardDto } from "../../core/repositories/RelationRepository/ParticipantRewardDto";
import { ParticipantReward } from "../../core/models/Relation/ParticipantReward";

const mockParticipantRewardRepository: jest.Mocked<ParticipantRewardRepository> = {
    getById: jest.fn(),
    getByParticipantId: jest.fn(),
    getByRewardId: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    delete: jest.fn(),
};

const participantRewardService = new ParticipantRewardService(mockParticipantRewardRepository);

describe('ParticipantRewardService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get participantReward by id', async () => {
        const expectedParticipantReward: ParticipantReward = {
            id: 1,
            participant_id: 1,
            reward_id: 1,
        };

        mockParticipantRewardRepository.getById.mockReturnValueOnce(Promise.resolve(expectedParticipantReward));

        const result = await participantRewardService.getById(1);

        expect(result).toEqual(expectedParticipantReward);
        expect(mockParticipantRewardRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get participantRewards by participant id', async () => {
        const expectedParticipantRewards: ParticipantReward[] = [
            {
                id: 1,
                participant_id: 1,
                reward_id: 1,
            },
            {
                id: 2,
                participant_id: 1,
                reward_id: 2,
            }
        ];

        mockParticipantRewardRepository.getByParticipantId.mockReturnValueOnce(Promise.resolve(expectedParticipantRewards));

        const result = await participantRewardService.getByParticipantId(1);

        expect(result).toEqual(expectedParticipantRewards);
        expect(mockParticipantRewardRepository.getByParticipantId).toHaveBeenCalledWith(1);
    });

    it('should get participantRewards by reward id', async () => {
        const expectedParticipantRewards: ParticipantReward[] = [
            {
                id: 1,
                participant_id: 1,
                reward_id: 1,
            },
            {
                id: 2,
                participant_id: 2,
                reward_id: 1,
            }
        ];

        mockParticipantRewardRepository.getByRewardId.mockReturnValueOnce(Promise.resolve(expectedParticipantRewards));

        const result = await participantRewardService.getByRewardId(1);

        expect(result).toEqual(expectedParticipantRewards);
        expect(mockParticipantRewardRepository.getByRewardId).toHaveBeenCalledWith(1);
    });

    it('should get all participantRewards', async () => {
        const expectedParticipantRewards: ParticipantReward[] = [
            {
                id: 1,
                participant_id: 1,
                reward_id: 1,
            },
            {
                id: 2,
                participant_id: 2,
                reward_id: 2,
            }
        ];

        mockParticipantRewardRepository.getAll.mockReturnValueOnce(Promise.resolve(expectedParticipantRewards));

        const result = await participantRewardService.getAll();

        expect(result).toEqual(expectedParticipantRewards);
        expect(mockParticipantRewardRepository.getAll).toHaveBeenCalled();
    });

    it('should add a new participantReward', async () => {
        const participantRewardDto: AddParticipantRewardDto = {
            participant_id: 1,
            reward_id: 1,
        };

        const expectedParticipantReward: ParticipantReward = {
            id: 1,
            ...participantRewardDto,
        };

        mockParticipantRewardRepository.add.mockReturnValueOnce(Promise.resolve(expectedParticipantReward));

        const result = await participantRewardService.add(participantRewardDto);

        expect(result).toEqual(expectedParticipantReward);
        expect(mockParticipantRewardRepository.add).toHaveBeenCalledWith(participantRewardDto);
    });

    it('should delete a participantReward by id', async () => {
        mockParticipantRewardRepository.delete.mockReturnValueOnce(undefined);

        await participantRewardService.delete(1);

        expect(mockParticipantRewardRepository.delete).toHaveBeenCalledWith(1);
    });
});

describe('ParticipantRewardService Negative Tests', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting participantReward by id', async () => {
        const errorMessage = 'Error getting participantReward by id';
        mockParticipantRewardRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await participantRewardService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting participantReward by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting participantRewards by participant id', async () => {
        const errorMessage = 'Error getting participantRewards by participant id';
        mockParticipantRewardRepository.getByParticipantId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await participantRewardService.getByParticipantId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting participantRewards by participant_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting participantRewards by reward id', async () => {
        const errorMessage = 'Error getting participantRewards by reward id';
        mockParticipantRewardRepository.getByRewardId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await participantRewardService.getByRewardId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting participantRewards by reward_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting all participantRewards', async () => {
        const errorMessage = 'Error getting all participantRewards';
        mockParticipantRewardRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await participantRewardService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all participantRewards: Error: ${errorMessage}`);
    });

    it('should handle error when adding a new participantReward', async () => {
        const errorMessage = 'Error adding participantReward';
        mockParticipantRewardRepository.add.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await participantRewardService.add({ participant_id: 1, reward_id: 1 });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error adding participantReward: Error: ${errorMessage}`);
    });

    it('should handle error when deleting a participantReward by id', async () => {
        const errorMessage = 'Error deleting participantReward';
        mockParticipantRewardRepository.delete.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await participantRewardService.delete(1);

        expect(console.error).toHaveBeenCalledWith(`Error deleting participantReward: Error: ${errorMessage}`);
    });
});
