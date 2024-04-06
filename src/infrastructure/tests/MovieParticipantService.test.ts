import { MovieParticipantService } from "../../core/services/RelationServices/MovieParticipantServices";
import { MovieParticipantRepository } from "../../core/repositories/RelationRepository/IMovieParticipantRepository";
import { AddMovieParticipantDto, UpdateMovieParticipantDto } from "../../core/repositories/RelationRepository/MovieParticipantDto";
import { MovieParticipant } from "../../core/models/Relation/MovieParticipant";

const mockMovieParticipantRepository: jest.Mocked<MovieParticipantRepository> = {
    getById: jest.fn(),
    getByMovieId: jest.fn(),
    getByParticipantId: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const movieParticipantService = new MovieParticipantService(mockMovieParticipantRepository);

describe('MovieParticipantService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get movieParticipant by id', async () => {
        const expectedMovieParticipant: MovieParticipant = {
            id: 1,
            movie_id: 1,
            participant_id: 1,
            role: 'Actor',
        };

        mockMovieParticipantRepository.getById.mockReturnValueOnce(Promise.resolve(expectedMovieParticipant));

        const result = await movieParticipantService.getById(1);

        expect(result).toEqual(expectedMovieParticipant);
        expect(mockMovieParticipantRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get movieParticipants by movie id', async () => {
        const expectedMovieParticipants: MovieParticipant[] = [
            {
                id: 1,
                movie_id: 1,
                participant_id: 1,
                role: 'Actor',
            },
            {
                id: 2,
                movie_id: 1,
                participant_id: 2,
                role: 'Director',
            }
        ];

        mockMovieParticipantRepository.getByMovieId.mockReturnValueOnce(Promise.resolve(expectedMovieParticipants));

        const result = await movieParticipantService.getByMovieId(1);

        expect(result).toEqual(expectedMovieParticipants);
        expect(mockMovieParticipantRepository.getByMovieId).toHaveBeenCalledWith(1);
    });

    it('should get movieParticipants by participant id', async () => {
        const expectedMovieParticipants: MovieParticipant[] = [
            {
                id: 1,
                movie_id: 1,
                participant_id: 1,
                role: 'Actor',
            },
            {
                id: 2,
                movie_id: 2,
                participant_id: 1,
                role: 'Actress',
            }
        ];

        mockMovieParticipantRepository.getByParticipantId.mockReturnValueOnce(Promise.resolve(expectedMovieParticipants));

        const result = await movieParticipantService.getByParticipantId(1);

        expect(result).toEqual(expectedMovieParticipants);
        expect(mockMovieParticipantRepository.getByParticipantId).toHaveBeenCalledWith(1);
    });

    it('should get all movieParticipants', async () => {
        const expectedMovieParticipants: MovieParticipant[] = [
            {
                id: 1,
                movie_id: 1,
                participant_id: 1,
                role: 'Actor',
            },
            {
                id: 2,
                movie_id: 2,
                participant_id: 2,
                role: 'Director',
            }
        ];

        mockMovieParticipantRepository.getAll.mockReturnValueOnce(Promise.resolve(expectedMovieParticipants));

        const result = await movieParticipantService.getAll();

        expect(result).toEqual(expectedMovieParticipants);
        expect(mockMovieParticipantRepository.getAll).toHaveBeenCalled();
    });

    it('should add a new movieParticipant', async () => {
        const movieParticipantDto: AddMovieParticipantDto = {
            movie_id: 1,
            participant_id: 1,
            role: 'Actor',
        };

        const expectedMovieParticipant: MovieParticipant = {
            id: 1,
            movie_id: 1,
            participant_id: 1,
            role: movieParticipantDto.role,
        };

        mockMovieParticipantRepository.add.mockReturnValueOnce(Promise.resolve(expectedMovieParticipant));

        const result = await movieParticipantService.add({ ...movieParticipantDto, movie_id: 1, participant_id: 1 });

        expect(result).toEqual(expectedMovieParticipant);
        expect(mockMovieParticipantRepository.add).toHaveBeenCalledWith({ ...movieParticipantDto, movie_id: 1, participant_id: 1 });
    });

    it('should update an existing movieParticipant', async () => {
        const movieParticipantDto: UpdateMovieParticipantDto = {
            role: 'Actor',
        };

        const expectedMovieParticipant: MovieParticipant = {
            id: 1,
            movie_id: 1,
            participant_id: 1,
            role: movieParticipantDto.role,
        };

        mockMovieParticipantRepository.update.mockReturnValueOnce(Promise.resolve(expectedMovieParticipant));

        const result = await movieParticipantService.update(movieParticipantDto, expectedMovieParticipant.id);

        expect(result).toEqual(expectedMovieParticipant);
        expect(mockMovieParticipantRepository.update).toHaveBeenCalledWith(movieParticipantDto, expectedMovieParticipant.id);
    });

    it('should delete a movieParticipant by id', async () => {
        mockMovieParticipantRepository.delete.mockReturnValueOnce(undefined);

        await movieParticipantService.delete(1);

        expect(mockMovieParticipantRepository.delete).toHaveBeenCalledWith(1);
    });
});

describe('MovieParticipantService Negative Tests', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting movieParticipant by id', async () => {
        const errorMessage = 'Error getting movieParticipant by id';
        mockMovieParticipantRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieParticipantService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieParticipant by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting movieParticipants by movie id', async () => {
        const errorMessage = 'Error getting movieParticipants by movie id';
        mockMovieParticipantRepository.getByMovieId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieParticipantService.getByMovieId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieParticipants by movie_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting movieParticipants by participant id', async () => {
        const errorMessage = 'Error getting movieParticipants by participant id';
        mockMovieParticipantRepository.getByParticipantId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieParticipantService.getByParticipantId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieParticipants by participant_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting all movieParticipants', async () => {
        const errorMessage = 'Error getting all movieParticipants';
        mockMovieParticipantRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieParticipantService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all movieParticipants: Error: ${errorMessage}`);
    });

    it('should handle error when adding a new movieParticipant', async () => {
        const errorMessage = 'Error adding movieParticipant';
        mockMovieParticipantRepository.add.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieParticipantService.add({ role: 'Actor', movie_id: 1, participant_id: 1 });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error adding movieParticipant: Error: ${errorMessage}`);
    });

    it('should handle error when updating a movieParticipant', async () => {
        const errorMessage = 'Error updating movieParticipant';
        mockMovieParticipantRepository.update.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieParticipantService.update({ role: 'Actor' }, 1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error updating movieParticipant: Error: ${errorMessage}`);
    });

    it('should handle error when deleting a movieParticipant by id', async () => {
        const errorMessage = 'Error deleting movieParticipant';
        mockMovieParticipantRepository.delete.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await movieParticipantService.delete(1);

        expect(console.error).toHaveBeenCalledWith(`Error deleting movieParticipant: Error: ${errorMessage}`);
    });
});
