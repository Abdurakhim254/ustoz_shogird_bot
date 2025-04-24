"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getcontact = void 0;
const grammy_1 = require("grammy");
exports.getcontact = new grammy_1.Keyboard()
    .requestContact("Share ✅")
    .resized()
    .oneTime();
