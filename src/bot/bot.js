import { Bot, session, Keyboard } from "grammy";
import { User } from "../database/index.js";
import dotenv from "dotenv";
import { Jobkeyboard } from "../keyboards/job.keyboard.js";
import { conversations, createConversation } from "@grammyjs/conversations";

dotenv.config();
const token = process.env.BOT_TOKEN;
let check=false

export const bot = new Bot(token);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(createConversation(greeting));

bot.command("start", async (ctx) => {
  const message =
    "Assalom alaykum Ustoz shogird botidan foydanalinsh uchun ' Share ✅' knopkasini bosing";
  const button = new Keyboard()
    .requestContact("Share ✅", "share")
    .resized()
    .oneTime();
  const username = ctx.update.message.from.username;
  const result = await User.findOne({ username });
  if (!result) {
    await ctx.reply(message, { reply_markup: button });
    return;
  }
  await ctx.reply("Siz ro'yxatdan o'tgansiz ✅ Addpost buyrug'ini bosing");
});


bot.on("message:contact", async (ctx) => {
 
  try {
    const contact = ctx.message.contact;
    const user = ctx.update.message?.from;
    const result = await User.findOne({ username: user.username });
    if (!result) {
      await User.create({
        user_id: user.id,
        phone_number: contact.phone_number,
        first_name: user.first_name ||"undefined",
        username: user.username ||"undefined",
      });
    }

    const message =
      "Ro'yxatdan muvaffaqiyatli o'tdingiz ✅ Addpost buyrug'ini bosing";

    await ctx.reply(message);
  } catch (error) {
    await ctx.reply(error.message);
  }


});

bot.command("addpost", async (ctx) => {
  await ctx.reply("Quyidagi knopkalardan birini bosing ✅", {
    reply_markup: Jobkeyboard,
  });
});

async function greeting(conversation, ctx) {
    const array=["Ism,familyangizni kiriting ?",
    "📚 Texnologiya:\nTalab qilinadigan texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating. \n\nMasalan,Java, C++, C#",
    "📞 Aloqa: \nBog`lanish uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67",
    "👨🏻‍💻 Kasbi: \nIshlaysizmi yoki o`qiysizmi?\nMasalan, Talaba",
    "🌐 Hudud:\nQaysi hududdansiz?\nViloyat nomi, Toshkent shahar yoki Respublikani kiriting.",
    "💰 Narxi:\nTolov qilasizmi yoki Tekinmi?\nKerak bo`lsa,\nSummani kiriting?",
    "🕰 Murojaat qilish vaqti: \nQaysi vaqtda murojaat qilish mumkin?\nMasalan, 9:00 - 18:00",
    "🔎 Maqsad: \nMaqsadingizni qisqacha yozib bering."
  ]
  const object={}
  let count=0
  object.elonturi=ctx.message.text
    for (let arr of array) {
      await ctx.reply(arr)
      var {message}=await conversation.wait()
      if(count==0){
        object.ismi=message.text.split(" ")[0]
        object.familyasi=message.text.split(" ")[1]
      }else if (count==1){
        object.texnologiya=message.text
      }else if(count==3){
        object.aloqa=message.text
      }else if(count==4){
        object.hudud=message.text
      }else if(count==5){
        object.narxi=message.text
      }else if(count==6){
        object.kasbi=message.text
      }else if(count==7){
        object.murojaat_vaqti=message.text
      }

      count++
    }
    object.maqsad=message.text

    switch(ctx.message.text){
      case "Sherik kerak":
        object.tag="sherik"
        break
      case "Ish joyi kerak":
        object.tag="ish"
        break
      case "Hodim kerak":
        object.tag="hodim"
        break
      case "Ustoz kerak":
        object.tag="ustoz"
        break
      case "Shogird kerak":
        object.tag="shogird"
        break
    }
    const user=ctx.update.message?.from;
    const result=await User.findOne({user_id:user.id})
    
    const shablon=`${ctx.message.text}:\n\n
    🏅 E'lon turi    : ${object.elonturi}\n
    📚 Texnologiya : ${object.texnologiya}\n
    🇺🇿  Telegram   : @${result.username}\n
    📞  Aloqa        : ${object.aloqa}\n
    🌐 Hudud        : ${object.hudud}\n
    💰 Narxi         : ${object.narxi}\n
    👨🏻‍💻 Kasbi         : ${object.kasbi}\n
🕰 Murojaat qilish vaqti: ${object.murojaat_vaqti}\n
    🔎 Maqsad     : ${object.murojaat_vaqti}\n


    #${object.tag}

    `
    await ctx.reply(shablon)
  }

  
bot.hears("Sherik kerak", async (ctx) => {
  const message =
    "Sherik topish uchun ariza berish.\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.";
  await ctx.reply(message);
  await ctx.conversation.enter("greeting");
});

bot.hears("Ish joyi kerak", async (ctx) => {
  const message =
    "Ish joyi uchun topish uchun ariza berish.\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.";

  await ctx.reply(message);
  await ctx.conversation.enter("greeting");
});
bot.hears("Hodim kerak", async (ctx) => {
  const message =
    "Hodim topish uchun ariza berish.\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.";

  await ctx.reply(message);
  await ctx.conversation.enter("greeting");
});

bot.hears("Ustoz kerak", async (ctx) => {
  const message =
    "Ustoz topish uchun ariza berish.\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.";

  await ctx.reply(message);
  await ctx.conversation.enter("greeting");
});


bot.hears("Shogird kerak", async (ctx) => {
  const message =
    "Shogird topish uchun ariza berish.\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.";
  await ctx.reply(ctx.msg.text);
});
