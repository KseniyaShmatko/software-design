import { Router } from "express";
import participantController from "../controllers/ParticipantController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleHandling('ADMIN'), participantController.create);
router.get('/', participantController.getAll);
router.get('/:id', participantController.getOneById);
router.get('/:name/:surname', participantController.getOneByNameSurname);
router.put('/:id', checkRoleHandling('ADMIN'), participantController.update);
router.delete('/:id', checkRoleHandling('ADMIN'), participantController.delete);

export default router;