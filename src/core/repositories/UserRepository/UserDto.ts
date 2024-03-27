export class UserDto {
    constructor(
        readonly name: string,
        readonly surname: string,
    ) {}
}

export class AddUserDto extends UserDto {
    readonly registration: Date;
    readonly login: string;
    readonly password: string;
    readonly role: string;
    constructor(userDto: UserDto, registration: Date, login: string, password: string, role: string) {
        super(userDto.name, userDto.surname);
        this.login = login;
        this.password = password;
        this.role = role;
        this.registration = registration;
    }
}

export class UpdateUserDto extends UserDto {
    constructor(userDto: UserDto) {
        super(userDto.name, userDto.surname);
    }
}