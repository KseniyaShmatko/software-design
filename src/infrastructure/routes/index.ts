import { Router } from "express";
import movieRouter from "./movieRouter";
import genreRouter from "./genreRouter";
import participantRouter from "./participantRouter";
import commentRouter from "./commentRouter";
import rewardRouter from "./rewardRouter";
import studioRouter from "./studioRouter";
import userRouter from "./userRouter";
import movieGenreRouter from "./movieGenreRouter";
import movieParticipantRouter from "./movieParticipantRouter";
import movieRewardRouter from "./movieRewardRouter";
import movieStudioRouter from "./movieStudioRouter";
import movieUserRouter from "./movieUserRouter";
import participantRewardRouter from "./participantRewardRouter";


const router = Router();

router.use('/movie', movieRouter);
router.use('/genre', genreRouter);
router.use('/participant', participantRouter);
router.use('/comment', commentRouter);
router.use('/reward', rewardRouter);
router.use('/studio', studioRouter);
router.use('/user', userRouter);
router.use('/moviegenre', movieGenreRouter);
router.use('/movieparticipant', movieParticipantRouter);
router.use('/moviereward', movieRewardRouter);
router.use('/moviestudio', movieStudioRouter);
router.use('/movieuser', movieUserRouter);
router.use('/participantreward', participantRewardRouter);

export { router };
