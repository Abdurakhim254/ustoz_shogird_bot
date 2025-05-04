import { AddType, IUser, User } from "../../utils";
import { UniversalService } from "./universal.service";

const universalService = new UniversalService<IUser>(User);

let formatPost = "";
let contact: string | number | undefined;

export class FormatService {
  async createTemplate(ctx: any, type: AddType): Promise<string | undefined> {
    const user = await universalService.getUser(+ctx.user_id);
    if (type == AddType.ISH) {
      if (user?.username) {
        contact = `@${user.username}`;
      } else {
        contact = user?.phone_number;
      }
      formatPost = `   ${ctx.theme}
      
      👨‍💼 Xodim: ${ctx.name}
      🕑 Yosh: ${ctx.age}
      📚 Texnologiya: ${ctx.texnologiya} 
      🇺🇿 Telegram: ${contact}
      📞 Aloqa: ${ctx.aloqa}
      🌐 Hudud: ${ctx.hudud} 
      💰 Narxi: ${ctx.narx}
      👨🏻‍💻 Kasbi: ${ctx.kasb}
      🕰 Murojaat qilish vaqti: ${ctx.murojaat_vaqti} 
      🔎 Maqsad: ${ctx.maqsad}
      
      ${ctx.tag} #${ctx.hudud}`;
      return formatPost;
    } else if (type == AddType.SHERIK) {
      if (user?.username) {
        contact = `@${user.username}`;
      } else {
        contact = user?.phone_number;
      }
      formatPost = `   ${ctx.theme}
      
      🏅 Sherik: ${ctx.name}
      📚 Texnologiya: ${ctx.texnologiya} 
      🇺🇿 Telegram: ${contact}
      📞 Aloqa: ${ctx.aloqa}
      🌐 Hudud: ${ctx.hudud} 
      💰 Narxi: ${ctx.narx}
      🕰 Murojaat qilish vaqti: ${ctx.murojaat_vaqti} 
      🔎 Maqsad: ${ctx.maqsad}
      
      ${ctx.tag} #${ctx.hudud}`;
      return formatPost;
    } else if (type == AddType.USTOZ) {
      if (user?.username) {
        contact = `@${user.username}`;
      } else {
        contact = user?.phone_number;
      }
      formatPost = `   ${ctx.theme}
      
      🎓 Shogird: ${ctx.name}
      🕑 Yosh: ${ctx.age}
      📚 Texnologiya: ${ctx.texnologiya} 
      🇺🇿 Telegram: ${contact}
      📞 Aloqa: ${ctx.aloqa}
      🌐 Hudud: ${ctx.hudud} 
      💰 Narxi: ${ctx.narx}
      🕰 Murojaat qilish vaqti: ${ctx.murojaat_vaqti} 
      🔎 Maqsad: ${ctx.maqsad}
      
      ${ctx.tag} #${ctx.hudud}`;
      return formatPost;
    } else if (type == AddType.HODIM) {
      if (user?.username) {
        contact = `@${user.username}`;
      } else {
        contact = user?.phone_number;
      }
      formatPost = `   ${ctx.theme}

    🏢 Idora: ${ctx.idora}
    📚 Texnologiya: ${ctx.texnologiya} 
    🇺🇿 Telegram: ${contact}
    📞 Aloqa: ${ctx.aloqa}
    🌐 Hudud: ${ctx.hudud}
    ✍️ Mas'ul: ${ctx.masul} 
    💰 Narxi: ${ctx.narx}
    🕰 Murojaat qilish vaqti: ${ctx.murojaat_vaqti}
    🕰 Ish vaqti: ${ctx.ish_vaqti}
    💰 Maosh: ${ctx.narx} 
    ‼️ Qo'shimcha:${ctx.qoshimcha}
    ${ctx.tag} #${ctx.hudud}`;
      return formatPost;
    }
  }
}
