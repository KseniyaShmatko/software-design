import { Router } from "express";
import genreController from "../controllers/GenreController";

const router = Router();

router.post('/', genreController.create);
router.get('/', genreController.getAll);
router.get('/:id', genreController.getOneById);
router.get('/name/:name', genreController.getOneByName);
router.put('/:id', genreController.update);
router.delete('/:id', genreController.delete);

export default router;