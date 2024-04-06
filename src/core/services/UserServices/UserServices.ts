import { UserRepository } from "../../repositories/UserRepository/IUserRepository";
import { AddUserDto, UpdateUserDto, UserDto } from "../../repositories/UserRepository/UserDto";
import { userRepositorySQL } from "../../repositories/UserRepository/UserRepository";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

class UserService {
    constructor (readonly userRepository: UserRepository ) {}

    async getById(id: number) {
        try {
            return await this.userRepository.getById(id);
        } catch (error) {
            console.error(`Error getting user by id: ${error}`);
            return null;
        }
    }

    async getByLogin(login: string) {
        try {
            return await this.userRepository.getByLogin(login);
        } catch (error) {
            console.error(`Error getting user by login: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.userRepository.getAll();
        } catch (error) {
            console.error(`Error getting all users: ${error}`);
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
            return token;
        } catch (error) {
            console.error(`Error registration user: ${error}`);
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
            return token;
        } catch (error) {
            console.error(`Error adding user: ${error}`);
            return null;
        }
    }

    async update(dto: UpdateUserDto, id: number) {
        try {
            return await this.userRepository.update(dto, id);
        } catch (error) {
            console.error(`Error updating user: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.userRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting user: ${error}`);
            return null;
        }
    }
    
    generateJwt(id: number, login: string, role: string) {
        return jwt.sign({id, login, role}, process.env.SECRET_KEY as string, {expiresIn: '24h'});
    }
};

const userService = new UserService(userRepositorySQL);
export { userService, UserService };