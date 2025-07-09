import { getUsers } from '../dao/users.dao';

export class UserService {
  public async getUsers() {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      console.error('Error while fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }
}