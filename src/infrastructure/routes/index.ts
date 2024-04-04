import { Router } from "express";
import movieRouter from "./movieRouter";
import genreRouter from "./genreRouter";
import participantRouter from "./participantRouter";
import commentRouter from "./commentRouter";
import rewardRouter from "./rewardRouter";
import studioRouter from "./studioRouter";

const router = Router();

router.use('/movie', movieRouter);
router.use('/genre', genreRouter);
router.use('/participant', participantRouter);
router.use('/comment', commentRouter);
router.use('/reward', rewardRouter);
router.use('/studio', studioRouter);

export {router};
