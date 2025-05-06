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
exports.Ustozscene = void 0;
const grammy_scenes_1 = require("grammy-scenes");
const utils_1 = require("../utils");
const messages_1 = require("../messages");
const config_1 = require("../config");
const keyboards_1 = require("../keyboards");
const helpers_1 = require("../helpers");
exports.Ustozscene = new grammy_scenes_1.Scene("ustoz");
const formatservice = new helpers_1.FormatService();
const universalService = new helpers_1.UniversalService(utils_1.Ustoz);
exports.Ustozscene.step((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.session.messageIds = [];
    ctx.session.chatId = (_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id;
    var message = yield ctx.reply(messages_1.UstozSceneMessages.ariza);
    ctx.session.messageIds.push(message.message_id);
    var message = yield ctx.reply(messages_1.UstozSceneMessages.name);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
}));
exports.Ustozscene.wait("get-age").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.session.messageIds.push((_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.message_id);
    ctx.session.name = ctx.message.text;
    const message = yield ctx.reply(messages_1.UstozSceneMessages.age);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
}));
exports.Ustozscene.wait("get-texnologiya").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.session.messageIds.push((_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.message_id);
    ctx.session.age = ctx.message.text;
    const message = yield ctx.reply(messages_1.UstozSceneMessages.texnologiya);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
}));
exports.Ustozscene.wait("get-aloqa").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.session.messageIds.push((_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.message_id);
    ctx.session.texnologiya = ctx.message.text;
    const message = yield ctx.reply(messages_1.UstozSceneMessages.aloqa);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
}));
exports.Ustozscene.wait("get-narx").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.session.messageIds.push((_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.message_id);
    if (utils_1.uzbPhoneRegex.test(ctx.message.text) && ctx.message.text) {
        ctx.session.aloqa = ctx.message.text;
        const message = yield ctx.reply(messages_1.UstozSceneMessages.narx);
        ctx.session.messageIds.push(message.message_id);
        ctx.scene.resume();
    }
    else {
        const message = yield ctx.reply(messages_1.UstozSceneMessages.aloqa);
        ctx.session.messageIds.push(message.message_id);
    }
}));
exports.Ustozscene.wait("get-hudud").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.session.messageIds.push((_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.message_id);
    ctx.session.narx = ctx.message.text;
    const message = yield ctx.reply(messages_1.UstozSceneMessages.hudud);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
}));
exports.Ustozscene.wait("get-murojaat").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.session.messageIds.push((_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.message_id);
    if (utils_1.viloyatlar.includes(ctx.message.text.toLowerCase())) {
        ctx.session.hudud = ctx.message.text;
        const message = yield ctx.reply(messages_1.UstozSceneMessages.murojaat_vaqti);
        ctx.session.messageIds.push(message.message_id);
        ctx.scene.resume();
    }
    else {
        const message = yield ctx.reply(messages_1.UstozSceneMessages.hudud);
        ctx.session.messageIds.push(message.message_id);
    }
}));
exports.Ustozscene.wait("get-maqsad").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.session.messageIds.push((_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.message_id);
    ctx.session.murojaat_vaqti = ctx.message.text;
    const message = yield ctx.reply(messages_1.UstozSceneMessages.maqsad);
    ctx.session.messageIds.push(message.message_id);
    ctx.scene.resume();
}));
exports.Ustozscene.wait("get-template").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    ctx.session.messageIds.push((_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.message_id);
    ctx.session.maqsad = ctx.message.text;
    ctx.session.tag = messages_1.UstozSceneMessages.tag;
    ctx.session.theme = messages_1.UstozSceneMessages.theme;
    ctx.session.user_id = ctx.from.id;
    const format = yield formatservice.createTemplate(ctx.session, utils_1.AddType.USTOZ);
    if (format) {
        yield ctx.reply(format, { reply_markup: keyboards_1.UniversalKeyboard });
    }
    ctx.scene.resume();
}));
exports.Ustozscene.wait("last-middleware").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const query = ctx.message.text.toLocaleLowerCase();
    yield (0, helpers_1.messageDeleter)(ctx);
    try {
        if (query === messages_1.SomeNeccessaryMessages.yes) {
            yield universalService.create(ctx.session);
            yield ctx.api.sendMessage(config_1.APPLICATION.admin_id, messages_1.SomeNeccessaryMessages.notification);
            yield ctx.reply(messages_1.SomeNeccessaryMessages.messageGood);
        }
        else if (query === messages_1.SomeNeccessaryMessages.no) {
            yield ctx.reply(messages_1.SomeNeccessaryMessages.messageBad);
        }
    }
    catch (error) {
        const err = error;
        if (err.error_code === 403) {
            yield ctx.reply(messages_1.ErrorMessages.error);
        }
        else {
            yield ctx.reply(messages_1.ErrorMessages.error);
        }
    }
    ctx.scene.exit();
}));
