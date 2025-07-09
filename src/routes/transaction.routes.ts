import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';

const router = Router();
const transactionController = new TransactionController();


router.get('/getTransation',  transactionController.getTransation)

export default router;
