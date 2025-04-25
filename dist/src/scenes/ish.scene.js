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
exports.Ishscene = void 0;
const grammy_scenes_1 = require("grammy-scenes");
const utils_1 = require("../utils");
const messages_1 = require("../messages");
const helpers_1 = require("../helpers");
const keyboards_1 = require("../keyboards");
const config_1 = require("../config");
exports.Ishscene = new grammy_scenes_1.Scene("Ish");
const formatservice = new helpers_1.FormatService();
const postservice = new helpers_1.PostService();
exports.Ishscene.step((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply(messages_1.IShSceneMessages.ariza);
    yield ctx.reply(messages_1.IShSceneMessages.name);
    ctx.scene.resume();
}));
exports.Ishscene.wait("get-age").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.name = ctx.message.text;
    yield ctx.reply(messages_1.IShSceneMessages.age);
    ctx.scene.resume();
}));
exports.Ishscene.wait("get-texnologiya").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.age = ctx.message.text;
    yield ctx.reply(messages_1.IShSceneMessages.texnologiya);
    ctx.scene.resume();
}));
exports.Ishscene.wait("get-aloqa").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.texnologiya = ctx.message.text;
    yield ctx.reply(messages_1.IShSceneMessages.aloqa);
    ctx.scene.resume();
}));
exports.Ishscene.wait("get-narx").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (utils_1.uzbPhoneRegex.test(ctx.message.text) && ctx.message.text) {
        ctx.session.aloqa = ctx.message.text;
        yield ctx.reply(messages_1.IShSceneMessages.narx);
        ctx.scene.resume();
    }
    else {
        yield ctx.reply(messages_1.IShSceneMessages.aloqa);
    }
}));
exports.Ishscene.wait("get-hudud").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.narx = ctx.message.text;
    yield ctx.reply(messages_1.IShSceneMessages.hudud);
    ctx.scene.resume();
}));
exports.Ishscene.wait("get-kasb").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (utils_1.viloyatlar.includes(ctx.message.text.toLowerCase())) {
        ctx.session.hudud = ctx.message.text;
        yield ctx.reply(messages_1.IShSceneMessages.kasb);
        ctx.scene.resume();
    }
    else {
        yield ctx.reply(messages_1.IShSceneMessages.hudud);
    }
}));
exports.Ishscene.wait("get-murojaat").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.kasb = ctx.message.text;
    yield ctx.reply(messages_1.IShSceneMessages.murojaat_vaqti);
    ctx.scene.resume();
}));
exports.Ishscene.wait("get-maqsad").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.murojaat_vaqti = ctx.message.text;
    yield ctx.reply(messages_1.IShSceneMessages.maqsad);
    ctx.scene.resume();
}));
exports.Ishscene.wait("get-template").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.maqsad = ctx.message.text;
    ctx.session.tag = messages_1.IShSceneMessages.tag;
    ctx.session.theme = messages_1.IShSceneMessages.theme;
    ctx.session.user_id = ctx.message.from.id;
    const format = yield formatservice.createTemplate(ctx.session);
    yield ctx.reply(format, {
        reply_markup: keyboards_1.UniversalKeyboard
    });
    ctx.scene.resume();
}));
exports.Ishscene.wait("last-middleware").on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const query = ctx.message.text.toLocaleLowerCase();
    if (query == messages_1.SomeNeccessaryMessages.yes) {
        yield postservice.createPost(ctx.session);
        yield ctx.api.sendMessage(config_1.APPLICATION.admin_id, messages_1.SomeNeccessaryMessages.notification);
        yield ctx.reply(messages_1.SomeNeccessaryMessages.messageGood);
    }
    else if (query == messages_1.SomeNeccessaryMessages.no) {
        ctx.reply(messages_1.SomeNeccessaryMessages.messageBad);
    }
    ctx.scene.exit();
}));
