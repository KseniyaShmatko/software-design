import { CommentService } from "../../core/services/CommentServices/CommentServices";
import { CommentRepository } from "../../core/repositories/CommentRepository/ICommentRepository";
import { AddCommentDto, UpdateCommentDto } from "../../core/repositories/CommentRepository/CommentDto";
import { Comment } from "../../core/models/Comment/Comment";

const mockCommentRepository: jest.Mocked<CommentRepository> = {
    getById: jest.fn(),
    getByMovieId: jest.fn(),
    getByUserId: jest.fn(),
    getAll: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const commentService = new CommentService(mockCommentRepository);

describe('CommentService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get comment by id', async () => {
        const expectedComment: Comment = {
            id: 1,
            content: 'Test Comment',
            date: new Date(),
            movie_id: 1,
            user_id: 1,
        };

        mockCommentRepository.getById.mockReturnValueOnce(expectedComment);

        const result = await commentService.getById(1);

        expect(result).toEqual(expectedComment);
        expect(mockCommentRepository.getById).toHaveBeenCalledWith(1);
    });

    it('should get comments by movie id', async () => {
        const expectedComments: Comment[] = [
            {
                id: 1,
                content: 'Test Comment 1',
                date: new Date(),
                movie_id: 1,
                user_id: 1,
            },
            {
                id: 2,
                content: 'Test Comment 2',
                date: new Date(),
                movie_id: 1,
                user_id: 2,
            },
        ];

        mockCommentRepository.getByMovieId.mockReturnValueOnce(expectedComments);

        const result = await commentService.getByMovieId(1);

        expect(result).toEqual(expectedComments);
        expect(mockCommentRepository.getByMovieId).toHaveBeenCalledWith(1);
    });

    it('should get comments by user id', async () => {
        const expectedComments: Comment[] = [
            {
                id: 1,
                content: 'Test Comment 1',
                date: new Date(),
                movie_id: 1,
                user_id: 1,
            },
            {
                id: 2,
                content: 'Test Comment 2',
                date: new Date(),
                movie_id: 2,
                user_id: 1,
            },
        ];

        mockCommentRepository.getByUserId.mockReturnValueOnce(expectedComments);

        const result = await commentService.getByUserId(1);

        expect(result).toEqual(expectedComments);
        expect(mockCommentRepository.getByUserId).toHaveBeenCalledWith(1);
    });

    it('should get all comments', async () => {
        const expectedComments: Comment[] = [
            {
                id: 1,
                content: 'Test Comment 1',
                date: new Date(),
                movie_id: 1,
                user_id: 1,
            },
            {
                id: 2,
                content: 'Test Comment 2',
                date: new Date(),
                movie_id: 2,
                user_id: 2,
            },
        ];

        mockCommentRepository.getAll.mockReturnValueOnce(expectedComments);

        const result = await commentService.getAll();

        expect(result).toEqual(expectedComments);
        expect(mockCommentRepository.getAll).toHaveBeenCalled();
    });

    it('should add a new comment', async () => {
        const commentDto: AddCommentDto = {
            content: 'New Comment',
            date: new Date(),
            movie_id: 1,
            user_id: 1,
        };

        const expectedComment: Comment = {
            id: 1,
            ...commentDto,
            movie_id: 1,
            user_id: 1,
        };

        mockCommentRepository.add.mockReturnValueOnce(expectedComment);

        const result = await commentService.add(commentDto);

        expect(result).toEqual(expectedComment);
        expect(mockCommentRepository.add).toHaveBeenCalledWith(commentDto);
    });

    it('should update an existing comment', async () => {
        const commentDto: UpdateCommentDto = {
            content: 'Updated Comment',
            date: new Date(),
        };
    
        const expectedComment: Comment = {
            id: 1,
            ...commentDto,
            movie_id: 1,
            user_id: 1,
        };

        mockCommentRepository.update.mockReturnValueOnce(expectedComment);
    
        const result = await commentService.update(commentDto);
    
        expect(result).toEqual(expectedComment);
        expect(mockCommentRepository.update).toHaveBeenCalledWith(commentDto);
    });

    it('should delete a comment by id', async () => {
        mockCommentRepository.delete.mockReturnValueOnce(undefined);

        await commentService.delete(1);

        expect(mockCommentRepository.delete).toHaveBeenCalledWith(1);
    });
});

describe('CommentService Errors', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('should handle error when getting comment by id', async () => {
        const errorMessage = 'Error getting comment by id';
        mockCommentRepository.getById.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await commentService.getById(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting comment by id: Error: ${errorMessage}`);
    });

    it('should handle error when getting comments by movie id', async () => {
        const errorMessage = 'Error getting comments by movie id';
        mockCommentRepository.getByMovieId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await commentService.getByMovieId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting comments by movie_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting comments by user id', async () => {
        const errorMessage = 'Error getting comments by user id';
        mockCommentRepository.getByUserId.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await commentService.getByUserId(1);

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting comments by user_id: Error: ${errorMessage}`);
    });

    it('should handle error when getting all comments', async () => {
        const errorMessage = 'Error getting all comments';
        mockCommentRepository.getAll.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await commentService.getAll();

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error getting all comments: Error: ${errorMessage}`);
    });

    it('should handle error when adding a new comment', async () => {
        const errorMessage = 'Error adding comment';
        mockCommentRepository.add.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await commentService.add({ content: 'New Comment', date: new Date(), movie_id: 1, user_id: 1});

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error adding comment: Error: ${errorMessage}`);
    });

    it('should handle error when updating an existing comment', async () => {
        const errorMessage = 'Error updating comment';
        mockCommentRepository.update.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        const result = await commentService.update({ content: 'Updated Comment', date: new Date() });

        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith(`Error updating comment: Error: ${errorMessage}`);
    });

    it('should handle error when deleting a comment by id', async () => {
        const errorMessage = 'Error deleting comment';
        mockCommentRepository.delete.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await commentService.delete(1);

        expect(console.error).toHaveBeenCalledWith(`Error deleting comment: Error: ${errorMessage}`);
    });
});
