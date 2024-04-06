import { Router } from "express";
import participantRewardController from "../controllers/ParticipantRewardController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleHandling('ADMIN'), participantRewardController.create);
router.get('/', participantRewardController.getAll);
router.get('/:id', participantRewardController.getOneById);
router.get('/participant/:id', participantRewardController.getByParticipantId);
router.get('/reward/:id', participantRewardController.getByRewardId);
router.delete('/:id', checkRoleHandling('ADMIN'), participantRewardController.delete);

export default router;