import { Router } from "express";
import movieController from "../controllers/MovieController";

const router = Router();

router.post('/', movieController.create);
router.get('/', movieController.getAll);
router.get('/:id', movieController.getOneById);
router.get('/name/:name', movieController.getOneByName);
router.put('/:id', movieController.update);
router.delete('/:id', movieController.delete);

export default router;