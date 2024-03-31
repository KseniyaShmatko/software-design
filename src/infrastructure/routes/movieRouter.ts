import { Router } from "express";
import movieController from "../controllers/MovieController";

const router = Router();

router.post('/', movieController.create);
router.get('/', movieController.getAll);
router.get('/:id', movieController.getOne);
router.put('/', movieController.update);
router.delete('/', movieController.delete);

export default router;