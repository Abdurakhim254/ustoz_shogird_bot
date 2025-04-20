import dotenv from "dotenv"


dotenv.config()

export const APPLICATION={
    token:process.env.BOT_TOKEN,
    url:process.env.MONGO_URI,
    admin_id:process.env.ADMIN_ID,
    port:process.env.PORT
}