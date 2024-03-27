export class RewardDto {
    constructor(
        readonly name: string,
        readonly description: string,
        readonly photo: string,
    ) {}
}

export class AddRewardDto extends RewardDto {
    constructor(rewardDto: RewardDto) {
        super(rewardDto.name, rewardDto.description, rewardDto.photo);
    }
}

export class UpdateRewardDto extends RewardDto {
    constructor(rewardDto: RewardDto) {
        super(rewardDto.name, rewardDto.description, rewardDto.photo);
    }
}