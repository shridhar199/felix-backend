import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Keypair } from 'stellar-sdk';
import { keycloakConfig } from '../config/keycloak.config';
import { insertUserToDB } from '../dao/auth.dao';
import { CreateUserDTO } from '../types/interface.types';

export class AuthService {

  public async createUser(dto: CreateUserDTO) {
    const userId = uuidv4();

    const tokenRes = await axios.post(
      `${keycloakConfig.keycloakUrl}/realms/master/protocol/openid-connect/token`,
      new URLSearchParams({
        grant_type: 'password',
        client_id: 'admin-cli',
        username: 'admin',
        password: 'KcAdmin'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const token = tokenRes.data.access_token;

    await axios.post(
      `${keycloakConfig.keycloakUrl}/admin/realms/${keycloakConfig.realm}/users`,
      {
        username: dto.email,
        email: dto.email,
        enabled: true,
        attributes: {
          full_name: dto.fullName,
        },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const stellarPair = Keypair.random();

    await insertUserToDB({
      id: userId,
      email: dto.email,
      username: dto.username,
      created_by: dto.createdBy,
    });

    return {
      userId,
      email: dto.email,
      stellarPublicKey: stellarPair.publicKey(),
      stellarSecretKey: stellarPair.secret(), 
    };
  }
}
