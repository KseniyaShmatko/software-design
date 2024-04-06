import { Router } from "express";
import movieRewardController from "../controllers/MovieRewardController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleHandling('ADMIN'), movieRewardController.create);
router.get('/', movieRewardController.getAll);
router.get('/:id', movieRewardController.getOneById);
router.get('/movie/:id', movieRewardController.getByMovieId);
router.get('/reward/:id', movieRewardController.getByRewardId);
router.delete('/:id', checkRoleHandling('ADMIN'), movieRewardController.delete);

export default router;