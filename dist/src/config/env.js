import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const getEnvVar = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
    if (!value) {
        throw new Error(`Environment variable ${key} is required but not set`);
    }
    return value;
};
const getEnvVarAsNumber = (key, defaultValue) => {
    const value = process.env[key];
    if (!value && defaultValue === undefined) {
        throw new Error(`Environment variable ${key} is required but not set`);
    }
    return value ? parseInt(value, 10) : defaultValue;
};
export const env = {
    NODE_ENV: getEnvVar('NODE_ENV'),
    PORT: getEnvVarAsNumber('PORT'),
    DATABASE_URL: getEnvVar('DATABASE_URL'),
    JWT_SECRET: getEnvVar('JWT_SECRET'),
    JWT_EXPIRES_IN: getEnvVar('JWT_EXPIRES_IN'),
    JWT_REFRESH_SECRET: getEnvVar('JWT_REFRESH_SECRET'),
    JWT_REFRESH_EXPIRES_IN: getEnvVar('JWT_REFRESH_EXPIRES_IN'),
    SMTP_HOST: getEnvVar('SMTP_HOST'),
    SMTP_PORT: getEnvVarAsNumber('SMTP_PORT'),
    SMTP_USER: getEnvVar('SMTP_USER'),
    SMTP_PASS: getEnvVar('SMTP_PASS'),
    SMTP_FROM: getEnvVar('SMTP_FROM'),
    FRONTEND_URL: getEnvVar('FRONTEND_URL'),
    INVITE_EXPIRY_HOURS: getEnvVarAsNumber('INVITE_EXPIRY_HOURS', 72),
};
export default env;
