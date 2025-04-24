import dotenv from "dotenv"

dotenv.config()

export const APPLICATION={
    token:process.env.BOT_TOKEN,
    url:process.env.APP_URL,
    admin_id:process.env.ADMIN_ID,
    channel:process.env.CHANNEL
}