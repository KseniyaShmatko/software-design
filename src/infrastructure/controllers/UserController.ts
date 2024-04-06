import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { userService } from '../../core/services/UserServices/UserServices';
import { UserDto, AddUserDto, UpdateUserDto } from '../../core/repositories/UserRepository/UserDto';

class UserController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll();
            return res.json(users);
        } catch (error) {
            console.error("Error occurred while getting all users:", error);
            return next(ApiError.internal("Failed to get all users"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const user = await userService.getById(id);
            if (!user) {
                return next(ApiError.badRequest("User not found"));
            }
            return res.json(user);
        } catch (error) {
            console.error("Error occurred while getting user by ID:", error);
            return next(ApiError.internal("Failed to get user by ID"));
        }
    }

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, surname, registration, login, password, role } = req.body;
            const dto = new UserDto(name, surname);
            const dtoAdd = new AddUserDto(dto, registration, login, password, role);
            const token = await userService.registration(dtoAdd);
            return res.json(token);
        } catch (error) {
            console.error("Error occurred while adding user:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { login, password } = req.body;
            const token = await userService.login(login, password);
            return res.json(token);
        } catch (error) {
            console.error("Error occurred while login user:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const { name, surname } = req.body;
            const dto = new UserDto(name, surname);
            const dtoUpdate = new UpdateUserDto(dto);
            const updatedUser = await userService.update(dtoUpdate, id);
            return res.json(updatedUser);
        } catch (error) {
            console.error("Error occurred while updating user:", error);
            return next(ApiError.internal("Failed to update user"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await userService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting user:", error);
            return next(ApiError.internal("Failed to delete user"));
        }
    }

    async check(req: Request, res: Response, next: NextFunction) {
        const { id, login, role } = req.user;
        const token = userService.generateJwt(id, login, role);
        return res.json(token);
    }
}

export default new UserController();
