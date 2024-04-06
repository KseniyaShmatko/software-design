import { User } from "../../models/User/User";
import { AddUserDto, UpdateUserDto } from "./UserDto";
import { Repository } from "../IRepository";

export interface UserRepository extends Repository<User, AddUserDto> {
    getByLogin(login: string): Promise<User | null>;
    update(dto: UpdateUserDto, id: number): Promise<User>;
}