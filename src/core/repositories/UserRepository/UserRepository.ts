import { User } from "../../models/User/User";
import { AddUserDto, UpdateUserDto } from "./UserDto";
import { Repository } from "../Repository";

export interface UserRepository extends Repository<User, AddUserDto> {
    update(dto: UpdateUserDto): User;
    getByLogin(login: string): User | null;
}