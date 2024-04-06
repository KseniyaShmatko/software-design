import { Router } from "express";
import studioController from "../controllers/StudioController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleHandling('ADMIN'), studioController.create);
router.get('/', studioController.getAll);
router.get('/:id', studioController.getOneById);
router.get('/name/:name', studioController.getOneByName);
router.put('/:id', checkRoleHandling('ADMIN'), studioController.update);
router.delete('/:id', checkRoleHandling('ADMIN'), studioController.delete);

export default router;