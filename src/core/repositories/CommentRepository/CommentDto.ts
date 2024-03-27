export class CommentDto {
    constructor(
        readonly content: string,
        readonly date: Date,
    ) {}
}

export class AddCommentDto extends CommentDto {
    readonly movie_id: number;
    readonly user_id: number;
    constructor(commentDto: CommentDto, movie_id: number, user_id: number,) {
        super(commentDto.content, commentDto.date);
        this.movie_id = movie_id;
        this.user_id = user_id;
    }
}

export class UpdateCommentDto extends CommentDto {
    constructor(commentDto: CommentDto) {
        super(commentDto.content, commentDto.date);
    }
}