import mongoose from "mongoose";
import dotenv from "dotenv";
import { APPLICATION } from "../../config/index.js";

const usersSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    phone_number: { type: Number, required: true, unique: true },
    first_name: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

await mongoose.connect(APPLICATION.url);
export const User = mongoose.model("ustoz", usersSchema);
