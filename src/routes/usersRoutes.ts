import { Router} from 'express';
import { usersController } from '../controllers/usersController.js'; 
import { validateUserCreation, validateUserUpdate } from "../middleware/validationMiddleware.js";
import { authController } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router: Router = Router();

router.post('/login', authController.login);
router.delete('/logout', authController.logout);

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', validateUserCreation, usersController.createUser);
router.patch('/:id', authMiddleware, validateUserUpdate, usersController.updateUser);
router.delete('/:id', authMiddleware, usersController.deleteUser);

export default router;