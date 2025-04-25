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
const user_service_1 = require("./user.service");
const userservice = new user_service_1.UserService();
class FormatService {
    createTemplate(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userservice.getuser(ctx.user_id);
            let contact;
            if (user === null || user === void 0 ? void 0 : user.username) {
                contact = `@${user.username}`;
            }
            else {
                contact = user === null || user === void 0 ? void 0 : user.phone_number;
            }
            const formatPost = `   ${ctx.theme}
      
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
        });
    }
}
exports.FormatService = FormatService;
