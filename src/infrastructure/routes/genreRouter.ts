import { Router } from "express";
import genreController from "../controllers/GenreController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleHandling('ADMIN'), genreController.create);
router.get('/', genreController.getAll);
router.get('/:id', genreController.getOneById);
router.get('/name/:name', genreController.getOneByName);
router.put('/:id', checkRoleHandling('ADMIN'), genreController.update);
router.delete('/:id', checkRoleHandling('ADMIN'), genreController.delete);

export default router;