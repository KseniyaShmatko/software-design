import { MovieUserService } from "../../core/services/RelationServices/MovieUserServices";
import { MovieUserRepository } from "../../core/repositories/RelationRepository/IMovieUserRepository";
import { AddMovieUserDto, UpdateMovieUserDto } from "../../core/repositories/RelationRepository/MovieUserDto";
import { MovieUser } from "../../core/models/Relation/MovieUser";

const mockMovieUserRepository: jest.Mocked<MovieUserRepository> = {
    getById: jest.fn(),
    getByMovieId: jest.fn(),
    getByUserId: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const movieUserService = new MovieUserService(mockMovieUserRepository);

describe('MovieUserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get movieUser by id', async () => {
        const expectedMovieUser: MovieUser = {
            id: 1,
            movie_id: 1,
            user_id: 1,
            mark: true,
        };

        mockMovieUserRepository.getById.mockReturnValueOnce(expectedMovieUser);

        const result = await movieUserService.getById(1);

        expect(result).toEqual(expectedMovieUser);
        expect(mockMovieUserRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get movieUsers by movie id', async () => {
        const expectedMovieUsers: MovieUser[] = [
            {
                id: 1,
                movie_id: 1,
                user_id: 1,
                mark: true,
            },
            {
                id: 2,
                movie_id: 1,
                user_id: 2,
                mark: false,
            }
        ];

        mockMovieUserRepository.getByMovieId.mockReturnValueOnce(expectedMovieUsers);

        const result = await movieUserService.getByMovieId(1);

        expect(result).toEqual(expectedMovieUsers);
        expect(mockMovieUserRepository.getByMovieId).toHaveBeenCalledWith(1);
    });

    it('should get movieUsers by user id', async () => {
        const expectedMovieUsers: MovieUser[] = [
            {
                id: 1,
                movie_id: 1,
                user_id: 1,
                mark: true,
            },
            {
                id: 2,
                movie_id: 2,
                user_id: 1,
                mark: false,
            }
        ];

        mockMovieUserRepository.getByUserId.mockReturnValueOnce(expectedMovieUsers);

        const result = await movieUserService.getByUserId(1);

        expect(result).toEqual(expectedMovieUsers);
        expect(mockMovieUserRepository.getByUserId).toHaveBeenCalledWith(1);
    });

    it('should get all movieUsers', async () => {
        const expectedMovieUsers: MovieUser[] = [
            {
                id: 1,
                movie_id: 1,
                user_id: 1,
                mark: true,
            },
            {
                id: 2,
                movie_id: 2,
                user_id: 2,
                mark: false,
            }
        ];

        mockMovieUserRepository.getAll.mockReturnValueOnce(expectedMovieUsers);

        const result = await movieUserService.getAll();

        expect(result).toEqual(expectedMovieUsers);
        expect(mockMovieUserRepository.getAll).toHaveBeenCalled();
    });

    it('should add a new movieUser', async () => {
        const movieUserDto: AddMovieUserDto = {
            mark: true,
            movie_id: 1,
            user_id: 1,
        };

        const expectedMovieUser: MovieUser = {
            id: 1,
            ...movieUserDto,
        };

        mockMovieUserRepository.add.mockReturnValueOnce(expectedMovieUser);

        const result = await movieUserService.add(movieUserDto);

        expect(result).toEqual(expectedMovieUser);
        expect(mockMovieUserRepository.add).toHaveBeenCalledWith(movieUserDto);
    });

    it('should update an existing movieUser', async () => {
        const movieUserDto: UpdateMovieUserDto = {
            mark: true,
        };

        const expectedUpdatedMovieUser: MovieUser = {
            id: 1,
            movie_id: 1,
            user_id: 1,
            mark: true,
        };

        mockMovieUserRepository.update.mockReturnValueOnce(expectedUpdatedMovieUser);

        const result = await movieUserService.update(movieUserDto);

        expect(result).toEqual(expectedUpdatedMovieUser);
        expect(mockMovieUserRepository.update).toHaveBeenCalledWith(movieUserDto);
    });

    it('should delete a movieUser by id', async () => {
        mockMovieUserRepository.delete.mockReturnValueOnce(undefined);

        await movieUserService.delete(1);

        expect(mockMovieUserRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should get marks for a movie', async () => {
        const movieId = 1;
        const movieUsers: MovieUser[] = [
            {
                id: 1,
                movie_id: movieId,
                user_id: 1,
                mark: true,
            },
            {
                id: 2,
                movie_id: movieId,
                user_id: 2,
                mark: true,
            },
            {
                id: 3,
                movie_id: movieId,
                user_id: 3,
                mark: false,
            },
            {
                id: 4,
                movie_id: movieId,
                user_id: 4,
                mark: false,
            }
        ];

        const expectedMarks = 50;

        mockMovieUserRepository.getByMovieId.mockReturnValueOnce(movieUsers);

        const result = await movieUserService.getMarks(movieId);

        expect(result).toEqual(expectedMarks);
        expect(mockMovieUserRepository.getByMovieId).toHaveBeenCalledWith(movieId);
    });
});

describe('MovieUserService Negative Tests', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting movieUser by id', async () => {
        const errorMessage = 'Error getting movieUser by id';
        mockMovieUserRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieUserService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieUser by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting movieUsers by movie id', async () => {
        const errorMessage = 'Error getting movieUsers by movie id';
        mockMovieUserRepository.getByMovieId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieUserService.getByMovieId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieUsers by movie_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting movieUsers by user id', async () => {
        const errorMessage = 'Error getting movieUsers by user id';
        mockMovieUserRepository.getByUserId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieUserService.getByUserId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting movieUsers by user_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting all movieUsers', async () => {
        const errorMessage = 'Error getting all movieUsers';
        mockMovieUserRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieUserService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all movieUsers: Error: ${errorMessage}`);
    });

    it('should handle error when adding a new movieUser', async () => {
        const errorMessage = 'Error adding movieUser';
        mockMovieUserRepository.add.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieUserService.add({ mark: true, movie_id: 1, user_id: 1 });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error adding movieUser: Error: ${errorMessage}`);
    });

    it('should handle error when updating a movieUser', async () => {
        const errorMessage = 'Error updating movieUser';
        mockMovieUserRepository.update.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieUserService.update({ mark: true });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error updating movieUser: Error: ${errorMessage}`);
    });

    it('should handle error when deleting a movieUser by id', async () => {
        const errorMessage = 'Error deleting movieUser';
        mockMovieUserRepository.delete.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await movieUserService.delete(1);

        expect(console.error).toHaveBeenCalledWith(`Error deleting movieUser: Error: ${errorMessage}`);
    });
    
    it('should handle error when getting marks for a movie', async () => {
        const movieId = 1;
        const errorMessage = 'Error getting marks for a movie';
        mockMovieUserRepository.getByMovieId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await movieUserService.getMarks(movieId);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting marks movie: Error: ${errorMessage}`);
    });
});
