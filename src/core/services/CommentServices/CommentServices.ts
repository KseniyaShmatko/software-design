import { CommentRepository } from "../../repositories/CommentRepository/ICommentRepository";
import { commentRepositorySQL } from "../../repositories/CommentRepository/CommentRepository";
import { AddCommentDto, UpdateCommentDto } from "../../repositories/CommentRepository/CommentDto";
import logger from '../../logger';

class CommentService {
    constructor (readonly commentRepository: CommentRepository ) {}

    async getById(id: number) {
        try {
            logger.info(`Getting comment by id: ${id}`, 'CommentService');
            return await this.commentRepository.getById(id);
        } catch (error) {
            logger.error(`Error getting comment by id: ${error}`, 'CommentService');
            return null;
        }
    }

    async getByMovieId(movie_id: number) {
        try {
            logger.info(`Getting comments by movie_id: ${movie_id}`, 'CommentService');
            return await this.commentRepository.getByMovieId(movie_id);
        } catch (error) {
            logger.error(`Error getting comments by movie_id: ${error}`, 'CommentService');
            return null;
        }
    }

    async getByUserId(user_id: number) {
        try {
            logger.info(`Getting comments by user_id: ${user_id}`, 'CommentService');
            return await this.commentRepository.getByUserId(user_id);
        } catch (error) {
            logger.error(`Error getting comments by user_id: ${error}`, 'CommentService');
            return null;
        }
    }

    async getAll() {
        try {
            logger.info(`Getting all comments`, 'CommentService');
            return await this.commentRepository.getAll();
        } catch (error) {
            logger.error(`Error getting all comments: ${error}`, 'CommentService');
            return null;
        }
    }

    async add(dto: AddCommentDto) {
        try {
            logger.info(`Adding comment`, 'CommentService');
            return await this.commentRepository.add(dto);
        } catch (error) {
            logger.error(`Error adding comment: ${error}`, 'CommentService');
            return null;
        }
    }

    async update(dto: UpdateCommentDto, id: number) {
        try {
            logger.info(`Updating comment: ${id}`, 'CommentService');
            return await this.commentRepository.update(dto, id);
        } catch (error) {
            logger.error(`Error updating comment: ${error}`, 'CommentService');
            return null;
        }
    }

    async delete(id: number) {
        try {
            logger.info(`Deleting comment: ${id}`, 'CommentService');
            await this.commentRepository.delete(id);
        } catch (error) {
            logger.error(`Error deleting comment: ${error}`, 'CommentService');
            return null;
        }
    }
};

const commentService = new CommentService(commentRepositorySQL);
export { commentService, CommentService };