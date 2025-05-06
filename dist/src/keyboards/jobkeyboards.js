"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobkeyboard = void 0;
const grammy_1 = require("grammy");
exports.Jobkeyboard = new grammy_1.InlineKeyboard()
    .text("Sherik kerak 🙋", "sherik")
    .text("Ish joyi kerak 🏢", "ish")
    .text("Hodim kerak 🧑🏼‍💻", "hodim")
    .text("Ustoz kerak 👨‍🏫", "ustoz")
    .row();
