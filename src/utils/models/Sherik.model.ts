import mongoose from "mongoose";
import { APPLICATION } from "../../config";
import { ISherik } from "../types/sherik.model.type";

const SherikSchema = new mongoose.Schema<ISherik>(
  {
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
    narxi: {
      type: String,
      required: true,
    },
    kasbi: {
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
    },theme: {
        type: String,
        required: true,
      },
      tag:{
          type:String,
          required:true
      },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

mongoose.connect(APPLICATION.url);

export const Sherik = mongoose.model<ISherik>("sherik", SherikSchema);
