import { Router } from 'express';
import { createUserController } from '../controllers/auth.controller';

const router = Router();

router.post('/create', createUserController);

export default router;
