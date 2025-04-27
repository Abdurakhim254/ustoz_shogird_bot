import { InlineKeyboard } from "grammy";

export const Adminkeyboard = new InlineKeyboard().text(
  "Kelib tushgan e'lonlar 👀",
  "notify"
).text("Asosiy Menyuga qaytish ❌","back");




export const giveAddKeyboard = (id:number,deleteid:number|undefined)=>{
    return new InlineKeyboard().text("Tasdiqlash ✅",`tasdiq_${id}_${deleteid}`).text("Bekor qilish ❌",`bekor_${id}_${deleteid}`).row().text("Asosiy Menyuga qaytish ❌","back");
};
