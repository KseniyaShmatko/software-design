import { Router } from "express";
import rewardController from "../controllers/RewardController";

const router = Router();

router.post('/', rewardController.create);
router.get('/', rewardController.getAll);
router.get('/:id', rewardController.getOneById);
router.get('/name/:name', rewardController.getOneByName);
router.put('/:id', rewardController.update);
router.delete('/:id', rewardController.delete);

export default router;