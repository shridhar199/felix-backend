import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Keypair } from 'stellar-sdk';
import { keycloakConfig } from '../config/keycloak.config';
import { insertUserToDB } from '../dao/auth.dao';
import { CreateUserDTO } from '../types/interface.types';
import nodemailer from 'nodemailer';
export class AuthService {

  static async createUser(dto: CreateUserDTO) {
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

      const searchRes = await axios.get(
      `${keycloakConfig.keycloakUrl}/admin/realms/${keycloakConfig.realm}/users?username=${dto.email}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const userIdFromKeycloak = searchRes.data?.[0]?.id;
    if (!userIdFromKeycloak) throw new Error('User ID not found');
      const randomPassword = await AuthService.generateRandomPassword(15);
    // 🔐 Set password
    await axios.put(
      `${keycloakConfig.keycloakUrl}/admin/realms/${keycloakConfig.realm}/users/${userIdFromKeycloak}/reset-password`,
      {
        type: 'password',
        value: randomPassword,
        temporary: false,
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

    await AuthService.sendUserPasswordEmail(dto.email, randomPassword);

    return {
      userId,
      email: dto.email,
      stellarPublicKey: stellarPair.publicKey(),
      stellarSecretKey: stellarPair.secret(), 
    };
  }

  static async sendUserPasswordEmail(toEmail: string, password: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Or your SMTP host
    port: 587,
    secure: false,
    auth: {
      user: 'shridhar@cateina.com',       // e.g. your Gmail address
      pass: 'ifhn lvtr xgdb mhyp',   // app password or real password
    },
  });

  await transporter.sendMail({
    from: '"Felix Platform" <no-reply@felix.ai>',
    to: toEmail,
    subject: 'Your Account Password',
    html: `
      <p>Hello,</p>
      <p>Your account has been created successfully.</p>
      <p><b>Email:</b> ${toEmail}</p>
      <p><b>Password:</b> ${password}</p>
      <p>Please log in and change your password after first login.</p>
    `,
  });
}

 static async generateRandomPassword(maxLength: number) {

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const specialChars = '!@#$%^&*+=';
    const numbers = '0123456789';

    let password = '';

    // Generate at least 1 uppercase letter
    password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));

    // Generate at least 1 special character
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

    // Generate other characters to fill the password
    const remainingLength = maxLength - 2; // Minimum 8, Maximum 14
    // console.log("Remaining length:", remainingLength);
    const allChars = lowercaseChars + numbers + specialChars;
    for (let i = 0; i < remainingLength; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars.charAt(randomIndex);
    }

    // Shuffle the password characters
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}
}