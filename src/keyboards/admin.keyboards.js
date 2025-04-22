import { InlineKeyboard } from "grammy";

export const Adminkeyboard = new InlineKeyboard().text(
  "Kelib tushgan e'lonlar 👀",
  "notify"
);




export const getKeyboard = (id)=>{
    return new InlineKeyboard().text("Tasdiqlash ✅",`tasdiq_${id}`).text("Bekor qilish ❌",`bekor_${id}`)
};