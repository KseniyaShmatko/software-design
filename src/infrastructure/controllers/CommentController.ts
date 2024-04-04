import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError';
import { commentService } from '../../core/services/CommentServices/CommentServices';
import { CommentDto, AddCommentDto, UpdateCommentDto } from '../../core/repositories/CommentRepository/CommentDto';

class CommentController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const comments = await commentService.getAll();
            return res.json(comments);
        } catch (error) {
            console.error("Error occurred while getting all comments:", error);
            return next(ApiError.internal("Failed to get all comments"));
        }
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const comment = await commentService.getById(id);
            if (!comment) {
                return next(ApiError.badRequest("Comment not found"));
            }
            return res.json(comment);
        } catch (error) {
            console.error("Error occurred while getting comment by ID:", error);
            return next(ApiError.internal("Failed to get comment by ID"));
        }
    }

    async getOneByMovieId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const comment = await commentService.getByMovieId(id);
            if (!comment) {
                return next(ApiError.badRequest("Comment not found"));
            }
            return res.json(comment);
        } catch (error) {
            console.error("Error occurred while getting comment by movie_id:", error);
            return next(ApiError.internal("Failed to get comment by movie_id"));
        }
    }

    async getOneByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const comment = await commentService.getByUserId(id);
            if (!comment) {
                return next(ApiError.badRequest("Comment not found"));
            }
            return res.json(comment);
        } catch (error) {
            console.error("Error occurred while getting comment by user_id:", error);
            return next(ApiError.internal("Failed to get comment by user_id"));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { content, date, movie_id, user_id } = req.body;
            const dto = new CommentDto(content, date);
            const dtoAdd = new AddCommentDto(dto,  movie_id, user_id);
            const comment = await commentService.add(dtoAdd);
            return res.json(comment);
        } catch (error) {
            console.error("Error occurred while adding comment:", error);
            return next(ApiError.badRequest('Incorrect parameters'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const { content, date } = req.body;
            const dto = new CommentDto(content, date);
            const dtoUpdate = new UpdateCommentDto(dto);
            const updatedComment = await commentService.update(dtoUpdate, id);
            return res.json(updatedComment);
        } catch (error) {
            console.error("Error occurred while updating comment:", error);
            return next(ApiError.internal("Failed to update comment"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await commentService.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            console.error("Error occurred while deleting comment:", error);
            return next(ApiError.internal("Failed to delete comment"));
        }
    }
}

export default new CommentController();
