"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobTypeKeyboards = exports.giveAddKeyboard = exports.Adminkeyboard = void 0;
const grammy_1 = require("grammy");
exports.Adminkeyboard = new grammy_1.InlineKeyboard().text("Kelib tushgan e'lonlar 👀", "notify").text("Asosiy Menyuga qaytish ❌", "back");
const giveAddKeyboard = (id, model) => {
    const modelname = model.modelName.toLowerCase();
    return new grammy_1.InlineKeyboard()
        .text("Tasdiqlash ✅", `tasdiq_${id}_${modelname}`)
        .text("Bekor qilish ❌", `bekor_${id}_${modelname}`)
        .row()
        .text("Asosiy Menyuga qaytish ❌", "back");
};
exports.giveAddKeyboard = giveAddKeyboard;
exports.JobTypeKeyboards = new grammy_1.InlineKeyboard().text("Ish Joyi boyicha kelib tushgan e'lonlar", "ish").text("Hodim boyicha kelib tushgan e'lonlar", "hodim").text("Ustoz boyicha kelib tushgan e'lonlar", "ustoz").row().text("Sherik boyicha kelib tushgan e'lonlar", "sherik").text("Asosiy Menyuga qaytish ❌", "back");
