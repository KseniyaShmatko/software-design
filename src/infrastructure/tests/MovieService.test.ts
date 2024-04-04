import {MovieService} from "../../core/services/MovieServices/MovieServices";
import { MovieRepository, MovieCategories } from "../../core/repositories/MovieRepository/IMovieRepository";
import { AddMovieDto, UpdateMovieDto } from "../../core/repositories/MovieRepository/MovieDto";
import { Movie } from "../../core/models/Movie/Movie";

const mockMovieRepository: jest.Mocked<MovieRepository> = {
    getById: jest.fn(),
    getByName: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const movieService = new MovieService(mockMovieRepository);

describe('MovieService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get movie by id', async () => {
        const expectedMovie: Movie = {
            id: 1,
            name: 'Test Movie',
            description: 'Description',
            country: 'Country',
            release: new Date(),
            photo: 'photo.jpg',
            trailer: 'trailer.mp4',
        };

        mockMovieRepository.getById.mockReturnValueOnce(Promise.resolve(expectedMovie));

        const result = await movieService.getById(1);

        expect(result).toEqual(expectedMovie);
        expect(mockMovieRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get movie by name', async () => {
        const expectedMovie: Movie = {
            id: 1,
            name: 'Test Movie',
            description: 'Description',
            country: 'Country',
            release: new Date(),
            photo: 'photo.jpg',
            trailer: 'trailer.mp4',
        };

        mockMovieRepository.getByName.mockReturnValueOnce(Promise.resolve(expectedMovie));

        const result = await movieService.getByName('Test Movie');

        expect(result).toEqual(expectedMovie);
        expect(mockMovieRepository.getByName).toHaveBeenCalledWith('Test Movie');
    });

    it('should get all movies', async () => {
        const currentDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
        const expectedMovies: MovieCategories = {
            upcoming: [],
            lastMonth: [
                {
                    id: 1,
                    name: 'Test Movie 1',
                    description: 'Description 1',
                    country: 'Country 1',
                    release: currentDate,
                    photo: 'photo1.jpg',
                    trailer: 'trailer1.mp4',
                }
            ],
            lastYear: [
                {
                    id: 2,
                    name: 'Test Movie 2',
                    description: 'Description 2',
                    country: 'Country 2',
                    release: oneMonthAgo,
                    photo: 'photo2.jpg',
                    trailer: 'trailer2.mp4',
                },
            ],
            other: [],
        };
    
        mockMovieRepository.getAll.mockReturnValueOnce(Promise.resolve([
            {
                id: 1,
                name: 'Test Movie 1',
                description: 'Description 1',
                country: 'Country 1',
                release: currentDate,
                photo: 'photo1.jpg',
                trailer: 'trailer1.mp4',
            },
            {
                id: 2,
                name: 'Test Movie 2',
                description: 'Description 2',
                country: 'Country 2',
                release: oneMonthAgo,
                photo: 'photo2.jpg',
                trailer: 'trailer2.mp4',
            },
        ]));
    
        const result = await movieService.getAll();
    
        expect(result).toEqual(expectedMovies);
    
        expect(mockMovieRepository.getAll).toHaveBeenCalled();
    });
    

    it('should add a new movie', async () => {
        const movieDto: AddMovieDto = {
            name: 'New Movie',
            description: 'Description',
            country: 'Country',
            release: new Date(),
            photo: 'photo.jpg',
            trailer: 'trailer.mp4',
        };

        const expectedMovie: Movie = {
            id: 1,
            ...movieDto,
        };

        mockMovieRepository.add.mockReturnValueOnce(Promise.resolve(expectedMovie));

        const result = await movieService.add(movieDto);

        expect(result).toEqual(expectedMovie);
        expect(mockMovieRepository.add).toHaveBeenCalledWith(movieDto);
    });

    it('should update an existing movie', async () => {
        const movieDto: UpdateMovieDto = {
            name: 'Updated Movie',
            description: 'Updated Description',
            country: 'Updated Country',
            release: new Date(),
            photo: 'updated_photo.jpg',
            trailer: 'updated_trailer.mp4',
        };
    
        const expectedMovie: Movie = {
            id: 1,
            ...movieDto,
        };

        mockMovieRepository.update.mockReturnValueOnce(Promise.resolve(expectedMovie));
    
        const result = await movieService.update(movieDto, expectedMovie.id);
    
        expect(result).toEqual(expectedMovie);
        expect(mockMovieRepository.update).toHaveBeenCalledWith(movieDto, expectedMovie.id);
    });

    it('should delete a movie by id', async () => {
        mockMovieRepository.delete.mockReturnValueOnce(undefined);

        await movieService.delete(1);

        expect(mockMovieRepository.delete).toHaveBeenCalledWith(1);
    });
});

describe('MovieService Errors', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting movie by id', async () => {
        const errorMessage = 'Error getting movie by id';
        mockMovieRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movie by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting movie by name', async () => {
        const errorMessage = 'Error getting movie by name';
        mockMovieRepository.getByName.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieService.getByName('Test Movie');

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movie by name: Error: ${errorMessage}`);
    });

    it('should handle error when getting all movies', async () => {
        const errorMessage = 'Error getting all movies';
        mockMovieRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all movies: Error: ${errorMessage}`);
    });

    it('should handle error when adding a new movie', async () => {
        const errorMessage = 'Error adding movie';
        mockMovieRepository.add.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieService.add({ name: 'New Movie', description: 'Description', country: 'Country', release: new Date(), photo: 'photo.jpg', trailer: 'trailer.mp4' });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error adding movie: Error: ${errorMessage}`);
    });

    it('should handle error when updating an existing movie', async () => {
        const errorMessage = 'Error updating movie';
        mockMovieRepository.update.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieService.update({ name: 'Updated Movie', description: 'Updated Description', country: 'Updated Country', release: new Date(), photo: 'updated_photo.jpg', trailer: 'updated_trailer.mp4' }, 1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error updating movie: Error: ${errorMessage}`);
    });

    it('should handle error when deleting a movie by id', async () => {
        const errorMessage = 'Error deleting movie';
        mockMovieRepository.delete.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await movieService.delete(1);

        expect(console.error).toHaveBeenCalledWith(`Error deleting movie: Error: ${errorMessage}`);
    });
});
