import mongoose from "mongoose";
import { APPLICATION } from "../../config";


const postSchema = new mongoose.Schema(
  {
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
    kasb: {
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
    },status: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

 mongoose.connect(APPLICATION.url);

export const Posts = mongoose.model("posts", postSchema);