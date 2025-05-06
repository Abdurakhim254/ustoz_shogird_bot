"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatService = void 0;
const utils_1 = require("../../utils");
const universal_service_1 = require("./universal.service");
const universalService = new universal_service_1.UniversalService(utils_1.User);
let formatPost = "";
let contact;
class FormatService {
    createTemplate(ctx, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield universalService.getUser(+ctx.user_id);
            if (type == utils_1.AddType.ISH) {
                if (user === null || user === void 0 ? void 0 : user.username) {
                    contact = `@${user.username}`;
                }
                else {
                    contact = user === null || user === void 0 ? void 0 : user.phone_number;
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
            }
            else if (type == utils_1.AddType.SHERIK) {
                if (user === null || user === void 0 ? void 0 : user.username) {
                    contact = `@${user.username}`;
                }
                else {
                    contact = user === null || user === void 0 ? void 0 : user.phone_number;
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
            }
            else if (type == utils_1.AddType.USTOZ) {
                if (user === null || user === void 0 ? void 0 : user.username) {
                    contact = `@${user.username}`;
                }
                else {
                    contact = user === null || user === void 0 ? void 0 : user.phone_number;
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
            }
            else if (type == utils_1.AddType.HODIM) {
                if (user === null || user === void 0 ? void 0 : user.username) {
                    contact = `@${user.username}`;
                }
                else {
                    contact = user === null || user === void 0 ? void 0 : user.phone_number;
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
        });
    }
}
exports.FormatService = FormatService;
