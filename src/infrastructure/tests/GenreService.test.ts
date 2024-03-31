import { GenreService } from "../../core/services/GenreServices/GenreServices";
import { GenreRepository } from "../../core/repositories/GenreRepository/IGenreRepository";
import { AddGenreDto, UpdateGenreDto } from "../../core/repositories/GenreRepository/GenreDto";
import { Genre } from "../../core/models/Genre/Genre";

const mockGenreRepository: jest.Mocked<GenreRepository> = {
    getById: jest.fn(),
    getByName: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const genreService = new GenreService(mockGenreRepository);

describe('GenreService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get genre by id', async () => {
        const expectedGenre: Genre = {
            id: 1,
            name: 'Test Genre',
            description: 'Description',
        };

        mockGenreRepository.getById.mockReturnValueOnce(expectedGenre);

        const result = await genreService.getById(1);

        expect(result).toEqual(expectedGenre);
        expect(mockGenreRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get genre by name', async () => {
        const expectedGenre: Genre = {
            id: 1,
            name: 'Test Genre',
            description: 'Description',
        };

        mockGenreRepository.getByName.mockReturnValueOnce(expectedGenre);

        const result = await genreService.getByName('Test Genre');

        expect(result).toEqual(expectedGenre);
        expect(mockGenreRepository.getByName).toHaveBeenCalledWith('Test Genre');
    });

    it('should get all genres', async () => {
        const expectedGenres: Genre[] = [
            {
                id: 1,
                name: 'Test Genre 1',
                description: 'Description 1',
            },
            {
                id: 2,
                name: 'Test Genre 2',
                description: 'Description 2',
            },
        ];

        mockGenreRepository.getAll.mockReturnValueOnce(expectedGenres);

        const result = await genreService.getAll();

        expect(result).toEqual(expectedGenres);
        expect(mockGenreRepository.getAll).toHaveBeenCalled();
    });


    it('should add a new genre', async () => {
        const genreDto: AddGenreDto = {
            name: 'New Genre',
            description: 'Description',
        };

        const expectedGenre: Genre = {
            id: 1,
            ...genreDto,
        };

        mockGenreRepository.add.mockReturnValueOnce(expectedGenre);

        const result = await genreService.add(genreDto);

        expect(result).toEqual(expectedGenre);
        expect(mockGenreRepository.add).toHaveBeenCalledWith(genreDto);
    });

    it('should update an existing genre', async () => {
        const genreDto: UpdateGenreDto = {
            name: 'Updated Genre',
            description: 'Updated Description',
        };
    
        const expectedGenre: Genre = {
            id: 1,
            ...genreDto,
        };

        mockGenreRepository.update.mockReturnValueOnce(expectedGenre);
    
        const result = await genreService.update(genreDto);
    
        expect(result).toEqual(expectedGenre);
        expect(mockGenreRepository.update).toHaveBeenCalledWith(genreDto);
    });

    it('should delete a genre by id', async () => {
        mockGenreRepository.delete.mockReturnValueOnce(undefined);

        await genreService.delete(1);

        expect(mockGenreRepository.delete).toHaveBeenCalledWith(1);
    });
});

describe('GenreService Errors', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting genre by id', async () => {
        const errorMessage = 'Error getting genre by id';
        mockGenreRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await genreService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting genre by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting genre by name', async () => {
        const errorMessage = 'Error getting genre by name';
        mockGenreRepository.getByName.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await genreService.getByName('Test Genre');

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting genre by name: Error: ${errorMessage}`);
    });

    it('should handle error when getting all genres', async () => {
        const errorMessage = 'Error getting all genres';
        mockGenreRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await genreService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all genres: Error: ${errorMessage}`);
    });

});