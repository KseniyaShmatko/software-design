import { Router } from "express";
import movieParticipantController from "../controllers/MovieParticipantController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleHandling('ADMIN'), movieParticipantController.create);
router.get('/', movieParticipantController.getAll);
router.get('/:id', movieParticipantController.getOneById);
router.get('/movie/:id', movieParticipantController.getByMovieId);
router.get('/participant/:id', movieParticipantController.getByParticipantId);
router.put('/:id', checkRoleHandling('ADMIN'), movieParticipantController.update);
router.delete('/:id', checkRoleHandling('ADMIN'), movieParticipantController.delete);

export default router;