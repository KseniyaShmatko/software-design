export class ParticipantDto {
    constructor(
        readonly name: string,
        readonly surname: string,
        readonly birth: Date,
        readonly death: Date | null,
        readonly photo: string,
    ) {}
}

export class AddParticipantDto extends ParticipantDto {
    constructor(participantDto: ParticipantDto) {
        super(participantDto.name, participantDto.surname, participantDto.birth, participantDto.death, participantDto.photo);
    }
}

export class UpdateParticipantDto extends ParticipantDto {
    constructor(participantDto: ParticipantDto) {
        super(participantDto.name, participantDto.surname, participantDto.birth, participantDto.death, participantDto.photo);
    }
}