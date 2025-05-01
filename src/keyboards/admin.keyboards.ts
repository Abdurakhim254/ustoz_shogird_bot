import { InlineKeyboard } from "grammy";

export const Adminkeyboard = new InlineKeyboard().text(
  "Kelib tushgan e'lonlar 👀",
  "notify"
).text("Asosiy Menyuga qaytish ❌","back");




export const giveAddKeyboard = (id:number,deleteid:number|undefined)=>{
    return new InlineKeyboard().text("Tasdiqlash ✅",`tasdiq_${id}_${deleteid}`).text("Bekor qilish ❌",`bekor_${id}_${deleteid}`).row().text("Asosiy Menyuga qaytish ❌","back");
};


export const JobTypeKeyboards=new InlineKeyboard().text("Ish Joyi boyicha kelib tushgan e'lonlar","ish").text("Hodim boyicha kelib tushgan e'lonlar","hodim").text("Ustoz boyicha kelib tushgan e'lonlar","ustoz").row().text("Sherik boyicha kelib tushgan e'lonlar","sherik").text("Asosiy Menyuga qaytish ❌","back");