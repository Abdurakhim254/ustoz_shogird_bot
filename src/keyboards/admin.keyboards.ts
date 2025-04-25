import { InlineKeyboard } from "grammy";

export const Adminkeyboard = new InlineKeyboard().text(
  "Kelib tushgan e'lonlar 👀",
  "notify"
).text("Asosiy Menyuga qaytish ❌","back");




export const giveAddKeyboard = (id:number)=>{
    return new InlineKeyboard().text("Tasdiqlash ✅",`tasdiq_${id}`).text("Bekor qilish ❌",`bekor_${id}`).row().text("Asosiy Menyuga qaytish ❌","back");
};
