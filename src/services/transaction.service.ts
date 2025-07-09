import { getTransation } from '../dao/transaction.dao';

export class TransactionService {
  public async getTransation() {
    try {
      const users = await getTransation();
      return users;
    } catch (error) {
      console.error('Error while fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }
}