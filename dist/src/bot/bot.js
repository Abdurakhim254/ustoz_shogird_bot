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
exports.bot = void 0;
const grammy_1 = require("grammy");
const config_1 = require("../config");
const helpers_1 = require("../helpers");
const keyboards_1 = require("../keyboards");
const scenes_1 = require("../scenes");
const messages_1 = require("../messages");
const token = config_1.APPLICATION.token;
exports.bot = new grammy_1.Bot(token);
const storage = new grammy_1.MemorySessionStorage();
exports.bot.use((0, grammy_1.session)({
    initial: () => ({ messageIds: [], __scenes: {} }), // important: include __scenes
    storage,
}));
exports.bot.use(scenes_1.scenes.manager());
exports.bot.use(scenes_1.scenes);
const userservice = new helpers_1.UserService();
exports.bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const id = ctx.from.id;
    ctx.session.messageIds = [];
    ctx.session.chatId = ctx.chat.id;
    const user = yield userservice.getuser(id);
    if (!user) {
        const message = yield ctx.reply(messages_1.MAIN_MESSAGES.AskContact, { reply_markup: keyboards_1.getcontact });
        ctx.session.messageIds.push(message.message_id);
    }
    else {
        const message = yield ctx.reply(messages_1.MAIN_MESSAGES.StartAdd, {
            reply_markup: keyboards_1.Addpost
        });
        ctx.session.messageIds.push(message.message_id);
    }
}));
exports.bot.on("message:contact", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userservice.getuser(ctx.from.id);
    if (!user) {
        yield userservice.createuser(ctx.from.id, ctx.message.contact.phone_number, ctx.message.contact.first_name, ctx.message.contact.username);
    }
    const message = yield ctx.reply(messages_1.MAIN_MESSAGES.SignUpsuccess, {
        reply_markup: keyboards_1.Addpost
    });
    ctx.session.messageIds.push(message.message_id);
}));
exports.bot.command("notify", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.scenes.enter("admin");
}));
exports.bot.callbackQuery("addPost", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield ctx.reply(messages_1.MAIN_MESSAGES.StartButtons, {
        reply_markup: keyboards_1.Jobkeyboard
    });
    ctx.session.messageIds.push(message.message_id);
}));
exports.bot.callbackQuery("sherik", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, helpers_1.messageDeleter)(ctx);
    yield ctx.scenes.enter("sherik");
}));
exports.bot.callbackQuery("ish", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, helpers_1.messageDeleter)(ctx);
    yield ctx.scenes.enter("Ish");
}));
exports.bot.callbackQuery("hodim", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, helpers_1.messageDeleter)(ctx);
    yield ctx.scenes.enter("hodim");
}));
exports.bot.callbackQuery("ustoz", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, helpers_1.messageDeleter)(ctx);
    yield ctx.scenes.enter("ustoz");
}));
exports.bot.callbackQuery("shogird", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, helpers_1.messageDeleter)(ctx);
    yield ctx.scenes.enter("shogird");
}));
