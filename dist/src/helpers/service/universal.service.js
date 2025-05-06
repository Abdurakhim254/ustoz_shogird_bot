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
exports.UniversalService = void 0;
const uuid_1 = require("uuid");
class UniversalService {
    constructor(Repository) {
        this.Repository = Repository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.find({ status: false }).sort({ timestamp: -1 });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.create(Object.assign({ id: (0, uuid_1.v4)() }, data));
        });
    }
    getByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.findOne({ id: id });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.deleteOne({ id: id });
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.updateOne({ id: id }, { $set: { status: true } });
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Repository.findOne({ user_id: id });
        });
    }
}
exports.UniversalService = UniversalService;
