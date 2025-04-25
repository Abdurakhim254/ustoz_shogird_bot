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
exports.Adminscene = void 0;
const grammy_scenes_1 = require("grammy-scenes");
const config_1 = require("../config");
const messages_1 = require("../messages");
const keyboards_1 = require("../keyboards");
const helpers_1 = require("../helpers");
exports.Adminscene = new grammy_scenes_1.Scene("admin");
const postservice = new helpers_1.PostService();
exports.Adminscene.step((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const id = ctx.from.id;
    if (id != config_1.APPLICATION.admin_id) {
        yield ctx.reply(messages_1.AdminSceneMessages.forbidden);
        return ctx.scene.exit();
    }
    yield ctx.reply(messages_1.AdminSceneMessages.Panel, {
        reply_markup: keyboards_1.Adminkeyboard
    });
    ctx.scene.resume();
}));
exports.Adminscene.wait("start").on("callback_query:data", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const query = ctx.callbackQuery.data.toLowerCase().trim();
    if (query == messages_1.SomeNeccessaryMessages.notify) {
        const posts = yield postservice.getPosts();
        if (!posts.length) {
            yield ctx.api.sendMessage(config_1.APPLICATION.admin_id, messages_1.AdminSceneMessages.noPosts);
            return ctx.scene.exit();
        }
        else {
            for (const post of posts) {
            }
        }
    }
    else if (query == messages_1.SomeNeccessaryMessages.back) {
        yield ctx.reply(messages_1.AdminSceneMessages.getMainMenu);
        return ctx.scene.exit();
    }
    ctx.scene.resume();
}));
