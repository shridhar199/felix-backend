import { Request, Response } from 'express';
import { UserService } from '../services/users.service';

const userService = new UserService();

export class UserController {
  public async getUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await userService.getUsers();
      res.status(201).json(result);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      res.status(500).json({ error: 'User get failed' });
    }
  }
}