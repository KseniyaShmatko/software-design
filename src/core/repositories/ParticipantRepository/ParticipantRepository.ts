import { Participant } from "../../models/Participant/Participant";
import { AddParticipantDto, UpdateParticipantDto } from "./ParticipantDto";
import { Repository } from "../Repository";

export interface ParticipantRepository extends Repository<Participant, AddParticipantDto> {
    getByNameSurname(name: string, surname: string): Participant | null;
    update(dto: UpdateParticipantDto): Participant;
}