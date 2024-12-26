import { bot } from "./src/bot/index.js";

(async () => {
  await bot.start();
  console.log("Bot is starting");
})();
