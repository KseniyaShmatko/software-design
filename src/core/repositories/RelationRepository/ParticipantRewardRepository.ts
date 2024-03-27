import { ParticipantReward } from "../../models/Relation/ParticipantReward";
import { AddParticipantRewardDto } from "./ParticipantRewardDto";
import { Repository } from "../Repository";
export interface ParticipantRewardRepository extends Repository<ParticipantReward, AddParticipantRewardDto> {
    getByParticipantId(participant_id: number): ParticipantReward[];
    getByRewardId(reward_id: number): ParticipantReward[];
}