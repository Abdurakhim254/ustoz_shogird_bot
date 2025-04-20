import { bot } from "./src/bot/index.js";
import express from "express"
import { APPLICATION } from "./src/config/index.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(APPLICATION.port, () => {
  bot.start().then(() => console.log("Bot started")).catch((err) => console.log(err));
  console.log(`Server is running on port ${APPLICATION.port}`);
})

