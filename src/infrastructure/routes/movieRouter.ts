import { Router } from "express";
import movieController from "../controllers/MovieController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleHandling('ADMIN'), movieController.create);
router.get('/', movieController.getAll);
router.get('/:id', movieController.getOneById);
router.get('/name/:name', movieController.getOneByName);
router.put('/:id', checkRoleHandling('ADMIN'), movieController.update);
router.delete('/:id', checkRoleHandling('ADMIN'), movieController.delete);

export default router;