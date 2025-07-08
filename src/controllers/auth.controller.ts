import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from '../types/interface.types';

const authService = new AuthService();

export class AuthController {
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const body: CreateUserDTO = req.body;
      const result = await authService.createUser(body);
      res.status(201).json(result);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      res.status(500).json({ error: 'User creation failed' });
    }
  }
}
