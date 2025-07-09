import { Request, Response } from 'express';
import { WalletsService } from '../services/wallets.service';

const walletsService = new WalletsService();

export class WalletsController {
  public getWallet = async (req: Request, res: Response): Promise<void> => {
    try {
        
      const result = await walletsService.getWallets();
      res.status(200).json(result);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      res.status(500).json({ error: 'User get failed' });
    }
  };
}
