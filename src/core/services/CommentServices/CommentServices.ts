import { CommentRepository } from "../../repositories/CommentRepository/CommentRepository";
import { AddCommentDto, UpdateCommentDto } from "../../repositories/CommentRepository/CommentDto";

export class CommentService {
    constructor (readonly commentRepository: CommentRepository ) {}

    async getById(id: number) {
        try {
            return await this.commentRepository.getById(id);
        } catch (error) {
            console.error(`Error getting comment by id: ${error}`);
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            return await this.commentRepository.getByMovieId(movie_id);
        } catch (error) {
            console.error(`Error getting comments by movie_id: ${error}`);
            return null;
        }
    }

    async getByUserId(user_id: number) {
        try {
            return await this.commentRepository.getByUserId(user_id);
        } catch (error) {
            console.error(`Error getting comments by user_id: ${error}`);
            return null;
        }
    }

    async getAll() {
        try {
            return await this.commentRepository.getAll();
        } catch (error) {
            console.error(`Error getting all comments: ${error}`);
            return null;
        }
    }

    async add(dto: AddCommentDto) {
        try {
            return await this.commentRepository.add(dto);
        } catch (error) {
            console.error(`Error adding comment: ${error}`);
            return null;
        }
    }

    async update(dto: UpdateCommentDto) {
        try {
            return await this.commentRepository.update(dto);
        } catch (error) {
            console.error(`Error updating comment: ${error}`);
            return null;
        }
    }

    async delete(id: number) {
        try {
            await this.commentRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting comment: ${error}`);
            return null;
        }
    }
};