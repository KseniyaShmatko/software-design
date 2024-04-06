import { MovieStudioService } from "../../core/services/RelationServices/MovieStudioServices";
import { MovieStudioRepository } from "../../core/repositories/RelationRepository/IMovieStudioRepository";
import { AddMovieStudioDto } from "../../core/repositories/RelationRepository/MovieStudioDto";
import { MovieStudio } from "../../core/models/Relation/MovieStudio";

const mockMovieStudioRepository: jest.Mocked<MovieStudioRepository> = {
    getById: jest.fn(),
    getByMovieId: jest.fn(),
    getByStudioId: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    delete: jest.fn(),
};

const movieStudioService = new MovieStudioService(mockMovieStudioRepository);

describe('MovieStudioService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get movieStudio by id', async () => {
        const expectedMovieStudio: MovieStudio = {
            id: 1,
            movie_id: 1,
            studio_id: 1,
        };

        mockMovieStudioRepository.getById.mockReturnValueOnce(Promise.resolve(expectedMovieStudio));

        const result = await movieStudioService.getById(1);

        expect(result).toEqual(expectedMovieStudio);
        expect(mockMovieStudioRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get movieStudios by movie id', async () => {
        const expectedMovieStudios: MovieStudio[] = [
            {
                id: 1,
                movie_id: 1,
                studio_id: 1,
            },
            {
                id: 2,
                movie_id: 1,
                studio_id: 2,
            }
        ];

        mockMovieStudioRepository.getByMovieId.mockReturnValueOnce(Promise.resolve(expectedMovieStudios));

        const result = await movieStudioService.getByMovieId(1);

        expect(result).toEqual(expectedMovieStudios);
        expect(mockMovieStudioRepository.getByMovieId).toHaveBeenCalledWith(1);
    });

    it('should get movieStudios by studio id', async () => {
        const expectedMovieStudios: MovieStudio[] = [
            {
                id: 1,
                movie_id: 1,
                studio_id: 1,
            },
            {
                id: 2,
                movie_id: 2,
                studio_id: 1,
            }
        ];

        mockMovieStudioRepository.getByStudioId.mockReturnValueOnce(Promise.resolve(expectedMovieStudios));

        const result = await movieStudioService.getByStudioId(1);

        expect(result).toEqual(expectedMovieStudios);
        expect(mockMovieStudioRepository.getByStudioId).toHaveBeenCalledWith(1);
    });

    it('should get all movieStudios', async () => {
        const expectedMovieStudios: MovieStudio[] = [
            {
                id: 1,
                movie_id: 1,
                studio_id: 1,
            },
            {
                id: 2,
                movie_id: 2,
                studio_id: 2,
            }
        ];

        mockMovieStudioRepository.getAll.mockReturnValueOnce(Promise.resolve(expectedMovieStudios));

        const result = await movieStudioService.getAll();

        expect(result).toEqual(expectedMovieStudios);
        expect(mockMovieStudioRepository.getAll).toHaveBeenCalled();
    });

    it('should add a new movieStudio', async () => {
        const movieStudioDto: AddMovieStudioDto = {
            movie_id: 1,
            studio_id: 1,
        };

        const expectedMovieStudio: MovieStudio = {
            id: 1,
            ...movieStudioDto,
        };

        mockMovieStudioRepository.add.mockReturnValueOnce(Promise.resolve(expectedMovieStudio));

        const result = await movieStudioService.add(movieStudioDto);

        expect(result).toEqual(expectedMovieStudio);
        expect(mockMovieStudioRepository.add).toHaveBeenCalledWith(movieStudioDto);
    });

    it('should delete a movieStudio by id', async () => {
        mockMovieStudioRepository.delete.mockReturnValueOnce(undefined);

        await movieStudioService.delete(1);

        expect(mockMovieStudioRepository.delete).toHaveBeenCalledWith(1);
    });
});

describe('MovieStudioService Negative Tests', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting movieStudio by id', async () => {
        const errorMessage = 'Error getting movieStudio by id';
        mockMovieStudioRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieStudioService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieStudio by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting movieStudios by movie id', async () => {
        const errorMessage = 'Error getting movieStudios by movie id';
        mockMovieStudioRepository.getByMovieId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieStudioService.getByMovieId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieStudios by movie_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting movieStudios by studio id', async () => {
        const errorMessage = 'Error getting movieStudios by studio id';
        mockMovieStudioRepository.getByStudioId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieStudioService.getByStudioId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieStudios by studio_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting all movieStudios', async () => {
        const errorMessage = 'Error getting all movieStudios';
        mockMovieStudioRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieStudioService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all movieStudios: Error: ${errorMessage}`);
    });

    it('should handle error when adding a new movieStudio', async () => {
        const errorMessage = 'Error adding movieStudio';
        mockMovieStudioRepository.add.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieStudioService.add({ movie_id: 1, studio_id: 1 });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error adding movieStudio: Error: ${errorMessage}`);
    });

    it('should handle error when deleting a movieStudio by id', async () => {
        const errorMessage = 'Error deleting movieStudio';
        mockMovieStudioRepository.delete.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await movieStudioService.delete(1);

        expect(console.error).toHaveBeenCalledWith(`Error deleting movieStudio: Error: ${errorMessage}`);
    });
});
