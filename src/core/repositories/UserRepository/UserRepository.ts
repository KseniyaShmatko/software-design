import { User } from "../../models/User/User";
import { AddUserDto, UpdateUserDto } from "./UserDto";
import { UserRepository } from "./IUserRepository";
import { UserDB } from "../../../infrastructure/db/entities/entities";
import { Sequelize } from 'sequelize';

class UserRepositorySQL implements UserRepository {
    async getById(id: number): Promise<User | null> {
        try {
            const userModel = await UserDB.findByPk(id);
            if (userModel) {
                const userData = userModel.toJSON();
                return new User(userData.id, userData.name, userData.surname, userData.registration, userData.login, userData.password, userData.role);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting user by ID:", error);
            throw new Error("Failed to get user by ID");
        }
    }

    async getAll(): Promise<User[]> {
        try {
            const usersModels = await UserDB.findAll();
            const usersData = usersModels.map(userModel => userModel.toJSON());
            const users = usersData.map(userData => new User(userData.id, userData.name, userData.surname, userData.registration, userData.login, userData.password, userData.role));
            return users;
        } catch (error) {
            console.error("Error occurred while getting all users:", error);
            throw new Error("Failed to get all users");
        }
    }

    async add(dto: AddUserDto): Promise<User> {
        try {
            const { name, surname, registration, login, password, role } = dto;
            const userModel = await UserDB.create({ name, surname, registration, login, password, role });
            const user = userModel.toJSON();
            return new User(user.id, user.name, user.surname, user.registration, user.login, user.password, user.role);
        } catch (error) {
            console.error("Error occurred while adding user:", error);
            throw new Error("Failed to add user");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await UserDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting user:", error);
            throw new Error("Failed to delete user");
        }
    }

    async getByLogin(login: string): Promise<User | null> {
        try {
            const userModel = await UserDB.findOne({ where: { login } });
            if (userModel) {
                const user = userModel.toJSON();
                return new User(user.id, user.name, user.surname, user.registration, user.login, user.password, user.role);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting user by login:", error);
            throw new Error("Failed to get user by login");
        }
    }

    async update(dto: UpdateUserDto, id: number): Promise<User> {
        try {
            const searchedUser = await UserDB.findByPk(id);
            if (!searchedUser) {
                throw new Error("User not found");
            }
            await UserDB.update(dto, { where: { id: id } });
            const updatedUserModel = await UserDB.findByPk(id);
            const updatedUser = updatedUserModel?.toJSON();
            return new User(updatedUser.id, updatedUser.name, updatedUser.surname, updatedUser.registration, updatedUser.login, updatedUser.password, updatedUser.role);
        } catch (error) {
            console.error("Error occurred while updating user:", error);
            throw new Error("Failed to update user");
        }
    }
}

export const userRepositorySQL = new UserRepositorySQL();
