import { Keyboard } from "grammy";


export const getcontact = new Keyboard()
    .requestContact("Share ✅")
    .resized()
    .oneTime();