import { Router } from "express";
import movieRouter from "./movieRouter";

const router = Router();

router.use('/movie', movieRouter);

export {router};
