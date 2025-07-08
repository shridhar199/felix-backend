import dotenv from 'dotenv';
dotenv.config();

export const keycloakConfig = {
    keycloakUrl: process.env.KEYCLOAK_URL!,
    realm: process.env.KEYCLOAK_REALM!,
    clientId: process.env.KEYCLOAK_CLIENT_ID!,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!
};
