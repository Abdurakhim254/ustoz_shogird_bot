import dotenv from "dotenv";
dotenv.config();

interface APPLICATION {
  token: string;
  url: string;
  admin_id: string;
  port: string;
  channel: string;
  ttl: number;
}

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

function getEnvNumber(key: string): number {
  const value = getEnvVar(key);
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} is not a valid number`);
  }
  return parsed;
}

export const APPLICATION: APPLICATION = {
  token: getEnvVar("BOT_TOKEN"),
  url: getEnvVar("MONGO_URI"),
  admin_id: getEnvVar("ADMIN_ID"),
  port: getEnvVar("PORT"),
  channel: getEnvVar("ChANNEL_NAME"),
  ttl: getEnvNumber("SESSION_TTL"),
};
