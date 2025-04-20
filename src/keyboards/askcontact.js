import { Keyboard } from "grammy";


export const getcontact = new Keyboard()
    .requestContact("Share ✅", "share")
    .resized()
    .oneTime();