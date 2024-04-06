import { Router } from "express";
import commentController from "../controllers/CommentController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";
import { authHandling } from "../middleware/authMiddleware";

const router = Router();

router.post('/', authHandling, commentController.create);
router.get('/', commentController.getAll);
router.get('/:id', commentController.getOneById);
router.get('/movie/:id', commentController.getByMovieId);
router.get('/user/:id', commentController.getByUserId);
router.put('/:id', authHandling, commentController.update);
router.delete('/:id', authHandling, commentController.delete);

export default router;