export class ParticipantRewardDto {
    constructor(
        readonly participant_id: number,
        readonly reward_id: number,
    ) {}
}

export class AddParticipantRewardDto extends ParticipantRewardDto {
    constructor(participantReward: ParticipantRewardDto) {
        super(participantReward.participant_id, participantReward.reward_id);
    }
}