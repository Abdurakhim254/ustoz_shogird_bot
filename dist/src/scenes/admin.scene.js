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
const formatservice = new helpers_1.FormatService();
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
    if (query === messages_1.SomeNeccessaryMessages.notify) {
        yield ctx.reply(messages_1.AdminSceneMessages.addtypes, {
            reply_markup: keyboards_1.JobTypeKeyboards
        });
    }
    else if (query == messages_1.SomeNeccessaryMessages.back) {
        yield ctx.reply(messages_1.AdminSceneMessages.getMainMenu);
        return ctx.scene.exit();
    }
    ctx.scene.resume();
}));
exports.Adminscene.wait("get-add-by-type").on("callback_query:data", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const query = ctx.callbackQuery.data.toLowerCase().trim();
    if (query == messages_1.SomeNeccessaryMessages.back) {
        yield ctx.reply(messages_1.AdminSceneMessages.getMainMenu);
        return ctx.scene.exit();
    }
    const queryarr = [messages_1.ButtonMessages.ish, messages_1.ButtonMessages.hodim, messages_1.ButtonMessages.sherik, messages_1.ButtonMessages.ustoz];
    if (queryarr.includes(query)) {
        const universalService = (0, helpers_1.createUniversalService)(helpers_1.modelMap[query]);
        console.log(query);
        console.log(helpers_1.modelMap[query]);
        const posts = yield universalService.getAll();
        if (query == messages_1.ButtonMessages.ish) {
            if (!posts.length) {
                yield ctx.reply(messages_1.AdminSceneMessages.noPosts, {
                    reply_markup: keyboards_1.JobTypeKeyboards
                });
            }
            else {
                for (const post of posts) {
                    let format = yield formatservice.createTemplate(post, query.toUpperCase());
                    if (format) {
                        yield ctx.reply(format, {
                            reply_markup: (0, keyboards_1.giveAddKeyboard)(post.id, helpers_1.modelMap[query])
                        });
                    }
                }
            }
        }
        else if (query == messages_1.ButtonMessages.hodim) {
            if (!posts.length) {
                yield ctx.reply(messages_1.AdminSceneMessages.noPosts, {
                    reply_markup: keyboards_1.JobTypeKeyboards
                });
            }
            else {
                for (const post of posts) {
                    let format = yield formatservice.createTemplate(post, query.toUpperCase());
                    if (format) {
                        yield ctx.reply(format, {
                            reply_markup: (0, keyboards_1.giveAddKeyboard)(post.id, helpers_1.modelMap[query])
                        });
                    }
                }
            }
        }
        else if (query == messages_1.ButtonMessages.sherik) {
            if (!posts.length) {
                yield ctx.reply(messages_1.AdminSceneMessages.noPosts, {
                    reply_markup: keyboards_1.JobTypeKeyboards
                });
            }
            else {
                for (const post of posts) {
                    let format = yield formatservice.createTemplate(post, query.toUpperCase());
                    if (format) {
                        yield ctx.reply(format, {
                            reply_markup: (0, keyboards_1.giveAddKeyboard)(post.id, helpers_1.modelMap[query])
                        });
                    }
                }
            }
        }
        else {
            if (!posts.length) {
                yield ctx.reply(messages_1.AdminSceneMessages.noPosts, {
                    reply_markup: keyboards_1.JobTypeKeyboards
                });
            }
            else {
                for (const post of posts) {
                    let format = yield formatservice.createTemplate(post, query.toUpperCase());
                    if (format) {
                        yield ctx.reply(format, {
                            reply_markup: (0, keyboards_1.giveAddKeyboard)(post.id, helpers_1.modelMap[query])
                        });
                    }
                }
            }
        }
    }
    ctx.scene.resume();
}));
exports.Adminscene.wait("last-middleware").on("callback_query:data", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const [action, id, modelName, type] = ctx.callbackQuery.data.toLowerCase().trim().split("_");
    const model = helpers_1.modelMap[modelName];
    const universalService = (0, helpers_1.createUniversalService)(model);
    if (action === messages_1.SomeNeccessaryMessages.accept) {
        const post = yield universalService.getByid(id);
        yield universalService.update(id);
        const format = yield formatservice.createTemplate(post, type.toUpperCase());
        if (format) {
            yield ctx.api.sendMessage(config_1.APPLICATION.channel, format);
            yield ctx.api.sendMessage(config_1.APPLICATION.admin_id, messages_1.SomeNeccessaryMessages.good);
        }
    }
    else if (action === messages_1.SomeNeccessaryMessages.reject) {
        yield universalService.delete(id);
        yield ctx.reply(messages_1.SomeNeccessaryMessages.ignore);
    }
    else if (action === messages_1.SomeNeccessaryMessages.back) {
        yield ctx.reply(messages_1.AdminSceneMessages.getMainMenu);
        return ctx.scene.exit();
    }
    ctx.scene.resume();
}));
