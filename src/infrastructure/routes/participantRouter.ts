import { Router } from "express";
import participantController from "../controllers/ParticipantController";

const router = Router();

router.post('/', participantController.create);
router.get('/', participantController.getAll);
router.get('/:id', participantController.getOneById);
router.get('/:name/:surname', participantController.getOneByNameSurname);
router.put('/:id', participantController.update);
router.delete('/:id', participantController.delete);

export default router;