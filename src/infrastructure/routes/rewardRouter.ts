import { Router } from "express";
import rewardController from "../controllers/RewardController";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', checkRoleHandling('ADMIN'), rewardController.create);
router.get('/', rewardController.getAll);
router.get('/:id', rewardController.getOneById);
router.get('/name/:name', rewardController.getOneByName);
router.put('/:id', checkRoleHandling('ADMIN'), rewardController.update);
router.delete('/:id', checkRoleHandling('ADMIN'), rewardController.delete);

export default router;