import { InlineKeyboard } from "grammy";
import { Document, Model } from "mongoose";
import { AddType } from "../utils";

export const Adminkeyboard = new InlineKeyboard().text(
  "Kelib tushgan e'lonlar 👀",
  "notify"
).text("Asosiy Menyuga qaytish ❌","back");






export const giveAddKeyboard = <T extends Document>(id: number, model: Model<T>) => {
  const modelname = model.modelName.toLowerCase();

  return new InlineKeyboard()
    .text("Tasdiqlash ✅", `tasdiq_${id}_${modelname}`)
    .text("Bekor qilish ❌", `bekor_${id}_${modelname}`)
    .row()
    .text("Asosiy Menyuga qaytish ❌", "back");
};



export const JobTypeKeyboards=new InlineKeyboard().text("Ish Joyi boyicha kelib tushgan e'lonlar","ish").text("Hodim boyicha kelib tushgan e'lonlar","hodim").text("Ustoz boyicha kelib tushgan e'lonlar","ustoz").row().text("Sherik boyicha kelib tushgan e'lonlar","sherik").text("Asosiy Menyuga qaytish ❌","back");