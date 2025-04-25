import { Bot, MemorySessionStorage, session } from "grammy";
import { APPLICATION } from "../config";
import { UserService, messageDeleter } from "../helpers";
import { Addpost, Jobkeyboard, getcontact } from "../keyboards";
import { BotContext, SessionData } from "../utils";
import { scenes } from "../scenes";
import { MAIN_MESSAGES } from "../messages";




const token = APPLICATION.token;
export const bot = new Bot<BotContext>(token);

const storage = new MemorySessionStorage<SessionData>();

bot.use(session({
    initial: () => ({ messageIds: [], __scenes: {}}), // important: include __scenes
    storage,
  }));

bot.use(scenes.manager());
bot.use(scenes)


const userservice = new UserService();

bot.command("start", async (ctx) => {
  const id = (ctx as any).from.id;
  ctx.session.messageIds = [];
  (ctx as any).session.chatId=ctx.chat.id
  const user =await userservice.getuser(id);
  
  if (!user) {
   const message= await ctx.reply(MAIN_MESSAGES.AskContact, { reply_markup: getcontact });
   ctx.session.messageIds.push(message.message_id);
  }else{
     const message= await ctx.reply(MAIN_MESSAGES.StartAdd, {
          reply_markup: Addpost
        });
        ctx.session.messageIds.push(message.message_id);
    }
});


bot.on("message:contact", async (ctx) => {
    const user=await userservice.getuser((ctx as any).from.id)
    if(!user){
        await userservice.createuser(
            (ctx as any).from.id,
            (ctx as any).message.contact.phone_number,
            (ctx as any).message.contact.first_name,
            (ctx as any).message.contact.username
            );
        }
      const message=  await ctx.reply(MAIN_MESSAGES.SignUpsuccess, {
            reply_markup:Addpost  
        
        })
        ctx.session.messageIds.push(message.message_id)
});

bot.command("admin",async(ctx)=>{
  await ctx.scenes.enter("admin")
})


bot.callbackQuery("addPost",async (ctx)=>{
   const message= await ctx.reply(MAIN_MESSAGES.StartButtons,{
        reply_markup:Jobkeyboard
    })

    ctx.session.messageIds.push(message.message_id)
})

bot.callbackQuery("sherik", async (ctx) => {
    await messageDeleter(ctx);
  
    await ctx.scenes.enter("sherik");
  });
  
  bot.callbackQuery("ish", async (ctx) => {
    await messageDeleter(ctx);
  
    await ctx.scenes.enter("Ish");
  });
  
  bot.callbackQuery("hodim", async (ctx) => {
    await messageDeleter(ctx);
  
    await ctx.scenes.enter("hodim");
  });
  
  bot.callbackQuery("ustoz", async (ctx) => {
    await messageDeleter(ctx);
  
    await ctx.scenes.enter("ustoz");
  });
  
  bot.callbackQuery("shogird", async (ctx) => {
    await messageDeleter(ctx);
  
    await ctx.scenes.enter("shogird");
  });

