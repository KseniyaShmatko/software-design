import { Studio } from "../../models/Studio/Studio";
import { AddStudioDto, UpdateStudioDto } from "./StudioDto";
import { Repository } from "../IRepository";

export interface StudioRepository extends Repository<Studio, AddStudioDto> {
    getByName(name: string): Studio | null;
    update(dto: UpdateStudioDto): Studio;
}