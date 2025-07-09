import { Router } from 'express';
import { UserController } from '../controllers/users.controller';

const router = Router();
const userController = new UserController();


router.get('/getUser',  userController.getUser)

export default router;
