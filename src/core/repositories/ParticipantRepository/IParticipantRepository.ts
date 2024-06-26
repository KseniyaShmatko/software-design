import { Participant } from "../../models/Participant/Participant";
import { AddParticipantDto, UpdateParticipantDto } from "./ParticipantDto";
import { Repository } from "../IRepository";

export interface ParticipantRepository extends Repository<Participant, AddParticipantDto> {
    getByNameSurname(name: string, surname: string): Promise<Participant | null>;
    update(dto: UpdateParticipantDto, id: number): Promise<Participant>;
}