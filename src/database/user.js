import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const usersSchema =new  mongoose.Schema(
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

await mongoose.connect(process.env.MONGO_URI);
export const User = mongoose.model("ustoz", usersSchema);
