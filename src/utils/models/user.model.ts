import mongoose from "mongoose";
import { APPLICATION } from "../../config";

const usersSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    phone_number: { type: Number, required: true, unique: true },
    first_name: { type: String, required: true },
    username: { type: String, required: false },
  },
  { timestamps: true }
);
 mongoose.connect(APPLICATION.url);
export const User = mongoose.model("users", usersSchema);