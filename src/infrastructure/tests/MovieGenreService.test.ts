import { MovieGenreService } from "../../core/services/RelationServices/MovieGenreServices";
import { MovieGenreRepository } from "../../core/repositories/RelationRepository/IMovieGenreRepository";
import { AddMovieGenreDto } from "../../core/repositories/RelationRepository/MovieGenreDto";
import { MovieGenre } from "../../core/models/Relation/MovieGenre";

const mockMovieGenreRepository: jest.Mocked<MovieGenreRepository> = {
    getById: jest.fn(),
    getByMovieId: jest.fn(),
    getByGenreId: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    delete: jest.fn(),
};

const movieGenreService = new MovieGenreService(mockMovieGenreRepository);

describe('MovieGenreService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get movieGenre by id', async () => {
        const expectedMovieGenre: MovieGenre = {
            id: 1,
            movie_id: 1,
            genre_id: 1,
        };

        mockMovieGenreRepository.getById.mockReturnValueOnce(expectedMovieGenre);

        const result = await movieGenreService.getById(1);

        expect(result).toEqual(expectedMovieGenre);
        expect(mockMovieGenreRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get movieGenres by movie id', async () => {
        const expectedMovieGenres: MovieGenre[] = [
            {
                id: 1,
                movie_id: 1,
                genre_id: 1,
            },
            {
                id: 2,
                movie_id: 1,
                genre_id: 2,
            }
        ];

        mockMovieGenreRepository.getByMovieId.mockReturnValueOnce(expectedMovieGenres);

        const result = await movieGenreService.getByMovieId(1);

        expect(result).toEqual(expectedMovieGenres);
        expect(mockMovieGenreRepository.getByMovieId).toHaveBeenCalledWith(1);
    });

    it('should get movieGenres by genre id', async () => {
        const expectedMovieGenres: MovieGenre[] = [
            {
                id: 1,
                movie_id: 1,
                genre_id: 1,
            },
            {
                id: 2,
                movie_id: 2,
                genre_id: 1,
            }
        ];

        mockMovieGenreRepository.getByGenreId.mockReturnValueOnce(expectedMovieGenres);

        const result = await movieGenreService.getByGenreId(1);

        expect(result).toEqual(expectedMovieGenres);
        expect(mockMovieGenreRepository.getByGenreId).toHaveBeenCalledWith(1);
    });

    it('should get all movieGenres', async () => {
        const expectedMovieGenres: MovieGenre[] = [
            {
                id: 1,
                movie_id: 1,
                genre_id: 1,
            },
            {
                id: 2,
                movie_id: 2,
                genre_id: 2,
            }
        ];

        mockMovieGenreRepository.getAll.mockReturnValueOnce(expectedMovieGenres);

        const result = await movieGenreService.getAll();

        expect(result).toEqual(expectedMovieGenres);
        expect(mockMovieGenreRepository.getAll).toHaveBeenCalled();
    });

    it('should add a new movieGenre', async () => {
        const movieGenreDto: AddMovieGenreDto = {
            movie_id: 1,
            genre_id: 1,
        };

        const expectedMovieGenre: MovieGenre = {
            id: 1,
            ...movieGenreDto,
        };

        mockMovieGenreRepository.add.mockReturnValueOnce(expectedMovieGenre);

        const result = await movieGenreService.add(movieGenreDto);

        expect(result).toEqual(expectedMovieGenre);
        expect(mockMovieGenreRepository.add).toHaveBeenCalledWith(movieGenreDto);
    });

    it('should delete a movieGenre by id', async () => {
        mockMovieGenreRepository.delete.mockReturnValueOnce(undefined);

        await movieGenreService.delete(1);

        expect(mockMovieGenreRepository.delete).toHaveBeenCalledWith(1);
    });
});

describe('MovieGenreService Negative Tests', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting movieGenre by id', async () => {
        const errorMessage = 'Error getting movieGenre by id';
        mockMovieGenreRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieGenreService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieGenre by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting movieGenres by movie id', async () => {
        const errorMessage = 'Error getting movieGenres by movie id';
        mockMovieGenreRepository.getByMovieId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieGenreService.getByMovieId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieGenres by movie_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting movieGenres by genre id', async () => {
        const errorMessage = 'Error getting movieGenres by genre id';
        mockMovieGenreRepository.getByGenreId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieGenreService.getByGenreId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieGenres by genre_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting all movieGenres', async () => {
        const errorMessage = 'Error getting all movieGenres';
        mockMovieGenreRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieGenreService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all movieGenres: Error: ${errorMessage}`);
    });

    it('should handle error when adding a new movieGenre', async () => {
        const errorMessage = 'Error adding movieGenre';
        mockMovieGenreRepository.add.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieGenreService.add({ movie_id: 1, genre_id: 1 });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error adding movieGenre: Error: ${errorMessage}`);
    });

    it('should handle error when deleting a movieGenre by id', async () => {
        const errorMessage = 'Error deleting movieGenre';
        mockMovieGenreRepository.delete.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await movieGenreService.delete(1);

        expect(console.error).toHaveBeenCalledWith(`Error deleting movieGenre: Error: ${errorMessage}`);
    });
});
