import { Reward } from "../../models/Reward/Reward";
import { AddRewardDto, UpdateRewardDto } from "./RewardDto";
import { Repository } from "../IRepository";

export interface RewardRepository extends Repository<Reward, AddRewardDto> {
    getByName(name: string): Promise<Reward | null>;
    update(dto: UpdateRewardDto, id: number): Promise<Reward>;
}