import { Router } from "express";
import movieStudioController from "../controllers/MovieStudioController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleHandling('ADMIN'), movieStudioController.create);
router.get('/', movieStudioController.getAll);
router.get('/:id', movieStudioController.getOneById);
router.get('/movie/:id', movieStudioController.getByMovieId);
router.get('/studio/:id', movieStudioController.getByStudioId);
router.delete('/:id', checkRoleHandling('ADMIN'), movieStudioController.delete);

export default router;