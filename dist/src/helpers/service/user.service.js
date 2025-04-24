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
exports.UserService = void 0;
const utils_1 = require("../../utils");
class UserService {
    getuser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield utils_1.User.findOne({ user_id: id });
            return user;
        });
    }
    createuser(user_id, phone_number, first_name, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield utils_1.User.create({ user_id, phone_number, first_name, username });
            return user;
        });
    }
}
exports.UserService = UserService;
