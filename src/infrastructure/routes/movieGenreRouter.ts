import { Router } from "express";
import movieGenreController from "../controllers/MovieGenreController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleHandling('ADMIN'), movieGenreController.create);
router.get('/', movieGenreController.getAll);
router.get('/:id', movieGenreController.getOneById);
router.get('/movie/:id', movieGenreController.getByMovieId);
router.get('/genre/:id', movieGenreController.getByGenreId);
router.delete('/:id', checkRoleHandling('ADMIN'), movieGenreController.delete);

export default router;