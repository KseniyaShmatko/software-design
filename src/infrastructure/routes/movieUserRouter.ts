import { Router } from "express";
import movieUserController from "../controllers/MovieUserController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";
import { authHandling } from "../middleware/authMiddleware";

const router = Router();

router.post('/', authHandling, movieUserController.create);
router.get('/', movieUserController.getAll);
router.get('/:id', movieUserController.getOneById);
router.get('/movie/:id', movieUserController.getByMovieId);
router.get('/user/:id', movieUserController.getByUserId);
router.put('/:id', authHandling, movieUserController.update);
router.delete('/:id', checkRoleHandling('ADMIN'), movieUserController.delete);
router.get('/marks/:id', movieUserController.getMarks);

export default router;