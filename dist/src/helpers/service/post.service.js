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
exports.PostService = void 0;
const utils_1 = require("../../utils");
class PostService {
    createPost(props) {
        return __awaiter(this, void 0, void 0, function* () {
            yield utils_1.Posts.create({
                user_id: props.user_id,
                name: props.name,
                age: props.age,
                texnologiya: props.texnologiya,
                aloqa: props.aloqa,
                hudud: props.hudud,
                narx: props.narx,
                kasb: props.kasb,
                murojaat_vaqti: props.murojaat_vaqti,
                maqsad: props.maqsad,
                theme: props.theme,
                tag: props.tag,
            });
        });
    }
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield utils_1.Posts.find({ status: false });
            return posts;
        });
    }
}
exports.PostService = PostService;
