import { Router } from "express";
import commentController from "../controllers/CommentController";

const router = Router();

router.post('/', commentController.create);
router.get('/', commentController.getAll);
router.get('/:id', commentController.getOneById);
router.get('/movie/:id', commentController.getOneByMovieId);
router.get('/user/:id', commentController.getOneByUserId);
router.put('/:id', commentController.update);
router.delete('/:id', commentController.delete);

export default router;