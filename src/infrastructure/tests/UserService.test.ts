import { UserService } from "../../core/services/UserServices/UserServices";
import { UserRepository } from "../../core/repositories/UserRepository/IUserRepository";
import { AddUserDto, UpdateUserDto } from "../../core/repositories/UserRepository/UserDto";
import { User } from "../../core/models/User/User";

const mockUserRepository: jest.Mocked<UserRepository> = {
    getById: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    delete: jest.fn(),
    getByLogin: jest.fn(),
    update: jest.fn(),
};

const userService = new UserService(mockUserRepository);

describe('UserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Positive Tests', () => {
        it('should get user by id', async () => {
            const expectedUser: User = {
                id: 1,
                name: "John",
                surname: "Doe",
                registration: new Date(),
                login: "john_doe",
                password: "hashed_password",
                role: "user"
            };

            mockUserRepository.getById.mockReturnValueOnce(expectedUser);

            const result = await userService.getById(1);

            expect(result).toEqual(expectedUser);
            expect(mockUserRepository.getById).toHaveBeenCalledWith(1);
        });

        it('should get all users', async () => {
            const expectedUsers: User[] = [
                {
                    id: 1,
                    name: "John",
                    surname: "Doe",
                    registration: new Date(),
                    login: "john_doe",
                    password: "hashed_password",
                    role: "user"
                },
                {
                    id: 2,
                    name: "Jane",
                    surname: "Smith",
                    registration: new Date(),
                    login: "jane_smith",
                    password: "hashed_password",
                    role: "admin"
                }
            ];

            mockUserRepository.getAll.mockReturnValueOnce(expectedUsers);

            const result = await userService.getAll();

            expect(result).toEqual(expectedUsers);
            expect(mockUserRepository.getAll).toHaveBeenCalled();
        });

        it('should add a new user', async () => {
            const addUserDto: AddUserDto = {
                name: "John",
                surname: "Doe",
                registration: new Date(),
                login: "john_doe",
                password: "password",
                role: "user"
            };
            const addUser: User = {
                id: 1,
                name: "John",
                surname: "Doe",
                registration: new Date(),
                login: "john_doe",
                password: "password",
                role: "user"
            };

            mockUserRepository.getByLogin.mockReturnValueOnce(null);
            mockUserRepository.add.mockReturnValueOnce(addUser);

            const result = await userService.registration(addUserDto);

            expect(result).toEqual(result);
            expect(mockUserRepository.getByLogin).toHaveBeenCalledWith("john_doe");
            expect(mockUserRepository.add).toHaveBeenCalledWith(addUserDto);
        });

        it('should update a user', async () => {
            const updateUserDto: UpdateUserDto = {
                name: "Updated John",
                surname: "Updated Doe"
            };

            const updatedUser: User = {
                id: 1,
                name: "Updated John",
                surname: "Updated Doe",
                registration: new Date(),
                login: "john_doe",
                password: "hashed_password",
                role: "user"
            };

            mockUserRepository.update.mockReturnValueOnce(updatedUser);

            const result = await userService.update(updateUserDto);

            expect(result).toEqual(updatedUser);
            expect(mockUserRepository.update).toHaveBeenCalledWith(updateUserDto);
        });

        it('should delete a user', async () => {
            const userIdToDelete = 1;

            await userService.delete(userIdToDelete);

            expect(mockUserRepository.delete).toHaveBeenCalledWith(userIdToDelete);
        });

    });

    describe('Negative Tests', () => {
        let consoleErrorSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        });
    
        afterEach(() => {
            consoleErrorSpy.mockRestore();
        });
    
        it('should handle error when getting user by id', async () => {
            const errorMessage = 'Error getting user by id';
            mockUserRepository.getById.mockImplementation(() => {
                throw new Error(errorMessage);
            });

            const result = await userService.getById(1);

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(`Error getting user by id: Error: ${errorMessage}`);
        });

        it('should handle error when adding a user', async () => {
            const errorMessage = 'Error adding user';
            mockUserRepository.add.mockImplementation(() => {
                throw new Error(errorMessage);
            });

            const addUserDto: AddUserDto = {
                name: "John",
                surname: "Doe",
                registration: new Date(),
                login: "john_doe",
                password: "password",
                role: "user"
            };

            const result = await userService.registration(addUserDto);

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(`Error registration user: Error: ${errorMessage}`);
        });

        it('should handle error when adding a user with existing login', async () => {
            const addUserDto: AddUserDto = {
                name: "John",
                surname: "Doe",
                registration: new Date(),
                login: "john_doe",
                password: "password",
                role: "user"
            };

            const errorMessage = 'Such user already exists';
            mockUserRepository.getByLogin.mockReturnValueOnce({
                id: 1,
                name: "John",
                surname: "Doe",
                registration: new Date(),
                login: "john_doe",
                password: "hashed_password",
                role: "user"
            });

            const result = await userService.registration(addUserDto);

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(`Error registration user: Error: ${errorMessage}`);
        });

        it('should handle error when login user with invalid credentials', async () => {
            const login = 'john_doe';
            const password = 'invalid_password';
            const errorMessage = 'Invalid password';
            const userWithInvalidPassword: User = {
                id: 1,
                name: "John",
                surname: "Doe",
                registration: new Date(),
                login: "john_doe",
                password: "hashed_password", // Assuming password is hashed
                role: "user"
            };

            mockUserRepository.getByLogin.mockReturnValueOnce(userWithInvalidPassword);

            const result = await userService.login(login, password);

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(`Error adding user: Error: ${errorMessage}`);
        });

        it('should handle error when login user that does not exist', async () => {
            const login = 'non_existent_user';
            const password = 'password';
            const errorMessage = 'No such user registered';

            mockUserRepository.getByLogin.mockReturnValueOnce(null);

            const result = await userService.login(login, password);

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(`Error adding user: Error: ${errorMessage}`);
        });

        it('should handle error when updating a user', async () => {
            const errorMessage = 'Error updating user';
            mockUserRepository.update.mockImplementation(() => {
                throw new Error(errorMessage);
            });

            const updateUserDto: UpdateUserDto = {
                name: "Updated John",
                surname: "Updated Doe"
            };

            const result = await userService.update(updateUserDto);

            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(`Error updating user: Error: ${errorMessage}`);
        });

        it('should handle error when deleting a user', async () => {
            const errorMessage = 'Error deleting user';
            mockUserRepository.delete.mockImplementation(() => {
                throw new Error(errorMessage);
            });

            const userIdToDelete = 1;

            await userService.delete(userIdToDelete);

            expect(console.error).toHaveBeenCalledWith(`Error deleting user: Error: ${errorMessage}`);
        });

    });

});

