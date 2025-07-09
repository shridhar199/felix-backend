import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';

const userService = new TransactionService();

export class TransactionController {
  public async getTransation(req: Request, res: Response): Promise<void> {
    try {
      const result = await userService.getTransation();
      res.status(201).json(result);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      res.status(500).json({ error: 'User get failed' });
    }
  }
}