"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ustoz = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../config");
const UstozSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
    },
    user_id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    texnologiya: {
        type: String,
        required: true,
    },
    aloqa: {
        type: String,
        required: true,
    },
    hudud: {
        type: String,
        required: true,
    },
    narx: {
        type: String,
        required: true,
    },
    murojaat_vaqti: {
        type: String,
        required: true,
    },
    maqsad: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
mongoose_1.default.connect(config_1.APPLICATION.url);
exports.Ustoz = mongoose_1.default.model("ustoz", UstozSchema);
