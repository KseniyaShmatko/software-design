import { UserRepository } from "../../repositories/UserRepository/IUserRepository";
import { AddUserDto, UpdateUserDto, UserDto } from "../../repositories/UserRepository/UserDto";
import { userRepositorySQL } from "../../repositories/UserRepository/UserRepository";
import logger from '../../logger';
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

class UserService {
    constructor (readonly userRepository: UserRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting user by id: ${id}`, 'UserService');
            return await this.userRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting user by id: ${error}`, 'UserService');
            return null;
        }
    }

    async getByLogin(login: string) {
        try {
            logger.info(`Getting user by login: ${login}`, 'UserService');
            return await this.userRepository.getByLogin(login);
        } catch (error) {
            logger.error(`Error getting user by login: ${error}`, 'UserService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all user`, 'UserService');
            return await this.userRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all users: ${error}`, 'UserService');
            return null;
        }
    }

    async registration(dto: AddUserDto) {
        try {
            const user = await this.userRepository.getByLogin(dto.login);
            if (user) {
                throw new Error('Such user already exists');
            }
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const userDto = new UserDto(dto.name, dto.surname);
            const hashedUser: AddUserDto = new AddUserDto(userDto, dto.registration, dto.login, hashedPassword, dto.role);
            const newUser = await this.userRepository.add(hashedUser);
            const token = this.generateJwt(newUser.id, newUser.login, newUser.role);
            logger.info(`Registration user`, 'UserService');
            return token;
        } catch (error) {
            logger.error(`Error registration user: ${error}`, 'UserService');
            return null;
        }
    }

    async login(login: string, password: string) {
        try {
            const user = await this.userRepository.getByLogin(login);
            if (!user) {
                throw new Error('No such user registered');
            }
            const compare = bcrypt.compareSync(password, user.password);
            if(!compare) {
                throw new Error('Invalid password');
            }
            const token = this.generateJwt(user.id, user.login, user.role);
            logger.info(`Login user: ${login}`, 'UserService');
            return token;
        } catch (error) {
            logger.error(`Error adding user: ${error}`, 'UserService');
            return null;
        }
    }

    async update(dto: UpdateUserDto, id: number) {
        try {
            logger.info(`Updating user: ${id}`, 'UserService');
            return await this.userRepository.update(dto, id);
        } catch (error) {
            logger.error(`Error updating user: ${error}`, 'UserService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting user: ${id}`, 'UserService');
            await this.userRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting user: ${error}`, 'UserService');
            return null;
        }
    }
    
    generateJwt(id: number, login: string, role: string) {
        return jwt.sign({id, login, role}, process.env.SECRET_KEY as string, {expiresIn: '24h'});
    }
};

const userService = new UserService(userRepositorySQL);
export { userService, UserService };