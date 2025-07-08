import { Request, Response } from 'express';
import { createUserService } from '../services/auth.service';
import { CreateUserDTO } from '../types/interface.types';

export async function createUserController(req: Request, res: Response) {
  try {
    const body: CreateUserDTO = req.body;
    const result = await createUserService(body);
    res.status(201).json(result);
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {   
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'User creation failed' });
  }
}
