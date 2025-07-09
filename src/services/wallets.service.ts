import { getWallets } from '../dao/wallets.dao'

export class WalletsService {
  public async getWallets() {
    try {
      const wallets = await getWallets();
      return wallets;
    } catch (error) {
      console.error('Error while fetching wallets:', error);
      throw new Error('Failed to fetch wallets');
    }
  }
}