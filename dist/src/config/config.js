"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPLICATION = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnvVar(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}
exports.APPLICATION = {
    token: getEnvVar("BOT_TOKEN"),
    url: getEnvVar("MONGO_URI"),
    admin_id: getEnvVar("ADMIN_ID"),
    port: getEnvVar("PORT"),
    channel: getEnvVar("CHANNEL_NAME")
};
