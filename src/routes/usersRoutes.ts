import { Router} from 'express';
import { usersController } from '../controllers/usersController.js'; 
import { validateUserCreation, validateUserUpdate } from "../middleware/validationMiddleware.js";

const router: Router = Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', validateUserCreation, usersController.createUser);
router.patch('/:id', validateUserUpdate, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

export default router;