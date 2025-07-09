import { Router } from 'express';
import { WalletsController } from '../controllers/wallets.controller';

const router = Router();
const walletsController = new WalletsController();


router.get('/getwallet',  walletsController.getWallet)



export default router;



