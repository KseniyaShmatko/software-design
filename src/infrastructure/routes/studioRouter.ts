import { Router } from "express";
import studioController from "../controllers/StudioController";

const router = Router();

router.post('/', studioController.create);
router.get('/', studioController.getAll);
router.get('/:id', studioController.getOneById);
router.get('/name/:name', studioController.getOneByName);
router.put('/:id', studioController.update);
router.delete('/:id', studioController.delete);

export default router;