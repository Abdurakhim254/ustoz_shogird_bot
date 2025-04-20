import { bot } from "./src/bot/index.js";

( () => {
  console.log("Bot is starting");
  bot.start().then(() => console.log("Bot started")).catch((err) => console.log(err));
})();
