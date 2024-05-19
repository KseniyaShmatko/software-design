import { Router } from "express";
import userController from "../controllers/UserController";
import { authHandling } from "../middleware/authMiddleware";
import { checkRoleHandling } from "../middleware/checkRoleMiddleware";

const router = Router();

router.post('/', userController.registration);
router.get('/', checkRoleHandling('ADMIN'), userController.getAll);
router.get('/id/:id', userController.getOneById);
router.get('/auth', authHandling, userController.check);
router.post('/login', userController.login);
router.put('/:id', userController.update);
router.delete('/:id', checkRoleHandling('ADMIN'), userController.delete);

export default router;