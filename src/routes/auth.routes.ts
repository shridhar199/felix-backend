import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();


router.post('/create', (req, res) => authController.createUser(req, res));

export default router;
