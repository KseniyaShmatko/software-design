import { Reward } from "../../models/Reward/Reward";
import { AddRewardDto, UpdateRewardDto } from "./RewardDto";
import { Repository } from "../Repository";

export interface RewardRepository extends Repository<Reward, AddRewardDto> {
    getByName(name: string): Reward | null;
    update(dto: UpdateRewardDto): Reward;
}