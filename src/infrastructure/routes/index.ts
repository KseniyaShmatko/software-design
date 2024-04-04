import { Router } from "express";
import movieRouter from "./movieRouter";
import genreRouter from "./genreRouter";
import participantRouter from "./participantRouter";

const router = Router();

router.use('/movie', movieRouter);
router.use('/genre', genreRouter);
router.use('/participant', participantRouter);

export {router};
