import { Comment } from "../../models/Comment/Comment";
import { AddCommentDto, UpdateCommentDto } from "./CommentDto";
import { CommentRepository } from "./ICommentRepository";
import { CommentDB } from "../../../infrastructure/db/entities/entities";

class CommentRepositorySQL implements CommentRepository {
    async getById(id: number): Promise<Comment | null> {
        try {
            const commentModel = await CommentDB.findByPk(id);
            if (commentModel) {
                const commentData = commentModel.toJSON();
                return new Comment(commentData.id, commentData.content, commentData.date, commentData.movie_id, commentData.user_id);
            }
            return null;
        } catch (error) {
            console.error("Error occurred while getting comment by ID:", error);
            throw new Error("Failed to get comment by ID");
        }
    }

    async getAll(): Promise<Comment[]> {
        try {
            const commentsModels = await CommentDB.findAll();
            const commentsData = commentsModels.map(commentModel => commentModel.toJSON());
            const comments = commentsData.map(commentData => new Comment(commentData.id, commentData.content, commentData.date, commentData.movie_id, commentData.user_id));
            return comments;
        } catch (error) {
            console.error("Error occurred while getting all comments:", error);
            throw new Error("Failed to get all comments");
        }
    }

    async add(dto: AddCommentDto): Promise<Comment> {
        try {
            const { content, date, movie_id, user_id } = dto;
            const commentModel = await CommentDB.create({ content, date, movie_id, user_id });
            const comment = commentModel.toJSON();
            return new Comment(comment.id, comment.content, comment.date, comment.movie_id, comment.user_id);
        } catch (error) {
            console.error("Error occurred while adding comment:", error);
            throw new Error("Failed to add comment");
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await CommentDB.destroy({ where: { id } });
        } catch (error) {
            console.error("Error occurred while deleting comment:", error);
            throw new Error("Failed to delete comment");
        }
    }

    async getByMovieId(id: number): Promise<Comment[]> {
        try {
            const commentsModels = await CommentDB.findAll({ where: { movie_id: id } });
            const commentsData = commentsModels.map(commentModel => commentModel.toJSON());
            const comments = commentsData.map(commentData => new Comment(commentData.id, commentData.content, commentData.date, commentData.movie_id, commentData.user_id));
            return comments;
        } catch (error) {
            console.error("Error occurred while getting comments by movie ID:", error);
            throw new Error("Failed to get comments by movie ID");
        }
    }

    async getByUserId(id: number): Promise<Comment[]> {
        try {
            const commentsModels = await CommentDB.findAll({ where: { user_id: id } });
            const commentsData = commentsModels.map(commentModel => commentModel.toJSON());
            const comments = commentsData.map(commentData => new Comment(commentData.id, commentData.content, commentData.date, commentData.movie_id, commentData.user_id));
            return comments;
        } catch (error) {
            console.error("Error occurred while getting comments by movie ID:", error);
            throw new Error("Failed to get comments by movie ID");
        }
    }

    async update(dto: UpdateCommentDto, id: number): Promise<Comment> {
        try {
            const searchedComment = await CommentDB.findByPk(id);
            if (!searchedComment) {
                throw new Error("Comment not found");
            }
            await CommentDB.update(dto, { where: { id: id } });
            const updatedCommentModel = await CommentDB.findByPk(id);
            const updatedComment = updatedCommentModel?.toJSON();
            return new Comment(updatedComment.id, updatedComment.content, updatedComment.date, updatedComment.movie_id, updatedComment.user_id);
        } catch (error) {
            console.error("Error occurred while updating comment:", error);
            throw new Error("Failed to update comment");
        }
    }
}

export const commentRepositorySQL = new CommentRepositorySQL();
