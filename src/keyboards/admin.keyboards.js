import { InlineKeyboard } from "grammy";

export const Adminkeyboard = new InlineKeyboard().text(
  "Kelib tushgan e'lonlar 👀",
  "notify"
).text("Asosiy Menyuga qaytish","back");




export const getKeyboard = (id)=>{
    return new InlineKeyboard().text("Tasdiqlash ✅",`tasdiq_${id}`).text("Bekor qilish ❌",`bekor_${id}`)
};


export const backKeyboard=new InlineKeyboard().text("Asosiy Menyuga qaytish","back");