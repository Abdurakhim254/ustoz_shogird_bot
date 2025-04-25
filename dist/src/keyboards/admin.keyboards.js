"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyboard = exports.Adminkeyboard = void 0;
const grammy_1 = require("grammy");
exports.Adminkeyboard = new grammy_1.InlineKeyboard().text("Kelib tushgan e'lonlar 👀", "notify").text("Asosiy Menyuga qaytish ❌", "back");
const getKeyboard = (id) => {
    return new grammy_1.InlineKeyboard().text("Tasdiqlash ✅", `tasdiq_${id}`).text("Bekor qilish ❌", `bekor_${id}`).row().text("Asosiy Menyuga qaytish ❌", "back");
};
exports.getKeyboard = getKeyboard;
