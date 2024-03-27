export class StudioDto {
    constructor(
        readonly name: string,
        readonly founder: string,
        readonly country: string,
        readonly foundation: Date,
        readonly photo: string,
    ) {}
}

export class AddStudioDto extends StudioDto {
    constructor(studioDto: StudioDto) {
        super(studioDto.name, studioDto.founder, studioDto.country, studioDto.foundation, studioDto.photo);
    }
}

export class UpdateStudioDto extends StudioDto {
    constructor(studioDto: StudioDto) {
        super(studioDto.name, studioDto.founder, studioDto.country, studioDto.foundation, studioDto.photo);
    }
}