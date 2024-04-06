import { ParticipantReward } from "../../models/Relation/ParticipantReward";
import { AddParticipantRewardDto } from "./ParticipantRewardDto";
import { Repository } from "../IRepository";
export interface ParticipantRewardRepository extends Repository<ParticipantReward, AddParticipantRewardDto> {
    getByParticipantId(participant_id: number): Promise<ParticipantReward[]>;
    getByRewardId(reward_id: number): Promise<ParticipantReward[]>;
}