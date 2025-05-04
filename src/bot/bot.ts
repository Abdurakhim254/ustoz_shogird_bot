import { Bot, MemorySessionStorage, session } from "grammy";
import { APPLICATION } from "../config";
import { UniversalService, messageDeleter } from "../helpers";
import { Addpost, Jobkeyboard, getcontact } from "../keyboards";
import { BotContext, IUser, SessionData, User } from "../utils";
import { scenes } from "../scenes";
import { MAIN_MESSAGES } from "../messages";




const token = APPLICATION.token;
export const bot = new Bot<BotContext>(token);

const universalService=new UniversalService<IUser>(User)

const storage = new MemorySessionStorage<SessionData>();

bot.use(session({
    initial: () => ({ messageIds: [], __scenes: {}}), // important: include __scenes
    storage,
  }));

bot.use(scenes.manager());
bot.use(scenes)




bot.command("start", async (ctx) => {
  const id = (ctx as any).from.id;
  ctx.session.messageIds = [];
  (ctx as any).session.chatId=ctx.chat.id
  const user =await universalService.getUser(id)
  
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
  const user = await universalService.getUser((ctx as any).from.id);
  if (!user) {
    await universalService.create({
      user_id: ctx.from.id,
      phone_number: parseInt(ctx.message.contact.phone_number, 10),
      first_name: ctx.message.contact.first_name,
      username: ctx.message.from.username || "", 
    }as IUser)
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

