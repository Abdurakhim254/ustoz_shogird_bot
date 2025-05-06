"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../config");
const usersSchema = new mongoose_1.default.Schema({
    user_id: {
        type: Number,
        required: true,
    },
    phone_number: { type: Number, required: true, unique: true },
    first_name: { type: String, required: true },
    username: { type: String, required: false },
}, { timestamps: true });
mongoose_1.default.connect(config_1.APPLICATION.url);
exports.User = mongoose_1.default.model("user", usersSchema);
