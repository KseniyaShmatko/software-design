import { MovieRewardService } from "../../core/services/RelationServices/MovieRewardServices";
import { MovieRewardRepository } from "../../core/repositories/RelationRepository/IMovieRewardRepository";
import { AddMovieRewardDto } from "../../core/repositories/RelationRepository/MovieRewardDto";
import { MovieReward } from "../../core/models/Relation/MovieReward";

const mockMovieRewardRepository: jest.Mocked<MovieRewardRepository> = {
    getById: jest.fn(),
    getByMovieId: jest.fn(),
    getByRewardId: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    delete: jest.fn(),
};

const movieRewardService = new MovieRewardService(mockMovieRewardRepository);

describe('MovieRewardService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get movieReward by id', async () => {
        const expectedMovieReward: MovieReward = {
            id: 1,
            movie_id: 1,
            reward_id: 1,
        };

        mockMovieRewardRepository.getById.mockReturnValueOnce(expectedMovieReward);

        const result = await movieRewardService.getById(1);

        expect(result).toEqual(expectedMovieReward);
        expect(mockMovieRewardRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get movieRewards by movie id', async () => {
        const expectedMovieRewards: MovieReward[] = [
            {
                id: 1,
                movie_id: 1,
                reward_id: 1,
            },
            {
                id: 2,
                movie_id: 1,
                reward_id: 2,
            }
        ];

        mockMovieRewardRepository.getByMovieId.mockReturnValueOnce(expectedMovieRewards);

        const result = await movieRewardService.getByMovieId(1);

        expect(result).toEqual(expectedMovieRewards);
        expect(mockMovieRewardRepository.getByMovieId).toHaveBeenCalledWith(1);
    });

    it('should get movieRewards by reward id', async () => {
        const expectedMovieRewards: MovieReward[] = [
            {
                id: 1,
                movie_id: 1,
                reward_id: 1,
            },
            {
                id: 2,
                movie_id: 2,
                reward_id: 1,
            }
        ];

        mockMovieRewardRepository.getByRewardId.mockReturnValueOnce(expectedMovieRewards);

        const result = await movieRewardService.getByRewardId(1);

        expect(result).toEqual(expectedMovieRewards);
        expect(mockMovieRewardRepository.getByRewardId).toHaveBeenCalledWith(1);
    });

    it('should get all movieRewards', async () => {
        const expectedMovieRewards: MovieReward[] = [
            {
                id: 1,
                movie_id: 1,
                reward_id: 1,
            },
            {
                id: 2,
                movie_id: 2,
                reward_id: 2,
            }
        ];

        mockMovieRewardRepository.getAll.mockReturnValueOnce(expectedMovieRewards);

        const result = await movieRewardService.getAll();

        expect(result).toEqual(expectedMovieRewards);
        expect(mockMovieRewardRepository.getAll).toHaveBeenCalled();
    });

    it('should add a new movieReward', async () => {
        const movieRewardDto: AddMovieRewardDto = {
            movie_id: 1,
            reward_id: 1,
        };

        const expectedMovieReward: MovieReward = {
            id: 1,
            ...movieRewardDto,
        };

        mockMovieRewardRepository.add.mockReturnValueOnce(expectedMovieReward);

        const result = await movieRewardService.add(movieRewardDto);

        expect(result).toEqual(expectedMovieReward);
        expect(mockMovieRewardRepository.add).toHaveBeenCalledWith(movieRewardDto);
    });

    it('should delete a movieReward by id', async () => {
        mockMovieRewardRepository.delete.mockReturnValueOnce(undefined);

        await movieRewardService.delete(1);

        expect(mockMovieRewardRepository.delete).toHaveBeenCalledWith(1);
    });
});

describe('MovieRewardService Negative Tests', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting movieReward by id', async () => {
        const errorMessage = 'Error getting movieReward by id';
        mockMovieRewardRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieRewardService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieReward by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting movieRewards by movie id', async () => {
        const errorMessage = 'Error getting movieRewards by movie id';
        mockMovieRewardRepository.getByMovieId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieRewardService.getByMovieId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieRewards by movie_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting movieRewards by reward id', async () => {
        const errorMessage = 'Error getting movieRewards by reward id';
        mockMovieRewardRepository.getByRewardId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieRewardService.getByRewardId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieRewards by reward_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting all movieRewards', async () => {
        const errorMessage = 'Error getting all movieRewards';
        mockMovieRewardRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieRewardService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all movieRewards: Error: ${errorMessage}`);
    });

    it('should handle error when adding a new movieReward', async () => {
        const errorMessage = 'Error adding movieReward';
        mockMovieRewardRepository.add.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieRewardService.add({ movie_id: 1, reward_id: 1 });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error adding movieReward: Error: ${errorMessage}`);
    });

    it('should handle error when deleting a movieReward by id', async () => {
        const errorMessage = 'Error deleting movieReward';
        mockMovieRewardRepository.delete.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await movieRewardService.delete(1);

        expect(console.error).toHaveBeenCalledWith(`Error deleting movieReward: Error: ${errorMessage}`);
    });
});
