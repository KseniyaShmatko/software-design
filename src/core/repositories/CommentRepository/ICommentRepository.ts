import { Comment } from "../../models/Comment/Comment";
import { AddCommentDto, UpdateCommentDto } from "./CommentDto";
import { Repository } from "../IRepository";

export interface CommentRepository extends Repository<Comment, AddCommentDto>{
    getByMovieId(id: number): Comment[];
    getByUserId(id: number): Comment[];
    update(dto: UpdateCommentDto): Comment;
}