import { Comment } from "../../models/Comment/Comment";
import { AddCommentDto, UpdateCommentDto } from "./CommentDto";
import { Repository } from "../IRepository";

export interface CommentRepository extends Repository<Comment, AddCommentDto>{
    getByMovieId(id: number): Promise<Comment[]>;
    getByUserId(id: number): Promise<Comment[]>;
    update(dto: UpdateCommentDto, id: number): Promise<Comment>;
}