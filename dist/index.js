"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bot_1 = require("./src/bot");
const config_1 = require("./src/config");
const app = (0, express_1.default)();
const port = config_1.APPLICATION.port;
app.listen(port, () => {
    console.log("Example app listening on port " + port + "!");
    bot_1.bot.start().then(() => console.log("bot started")).catch((err) => console.log(err));
});
