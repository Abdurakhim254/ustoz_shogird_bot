import { InlineKeyboard } from "grammy";
import { Document, Model } from "mongoose";
import { AddType } from "../utils";

export const Adminkeyboard = new InlineKeyboard().text(
  "Kelib tushgan e'lonlar 👀",
  "notify"
).text("Asosiy Menyuga qaytish ❌","back");






export const giveAddKeyboard = <T extends Document>(id: number, model: Model<T>,type: AddType) => {
  let modelType="";

  console.log(model.modelName);
  
  if(model.modelName=="Job"){
    modelType="ish"
  }else if(model.modelName=="Hodim"){
    modelType="hodim"
  }else if(model.modelName=="Ustoz"){
    modelType="ustoz"
  }else if(model.modelName=="Sherik"){
    modelType="sherik"
  }

  return new InlineKeyboard()
    .text("Tasdiqlash ✅", `tasdiq_${id}_${modelType}_${type}`)
    .text("Bekor qilish ❌", `bekor_${id}_${modelType}_${type}`)
    .row()
    .text("Asosiy Menyuga qaytish ❌", "back");
};



export const JobTypeKeyboards=new InlineKeyboard().text("Ish Joyi boyicha kelib tushgan e'lonlar","ish").text("Hodim boyicha kelib tushgan e'lonlar","hodim").text("Ustoz boyicha kelib tushgan e'lonlar","ustoz").row().text("Sherik boyicha kelib tushgan e'lonlar","sherik").text("Asosiy Menyuga qaytish ❌","back");