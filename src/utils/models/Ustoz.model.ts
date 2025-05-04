import mongoose from "mongoose";
import { APPLICATION } from "../../config";
import { IUstoz } from "../types/ustoz.model.type";

const UstozSchema = new mongoose.Schema<IUstoz>(
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
    narxi: {
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
  },
  { timestamps: true }
);

mongoose.connect(APPLICATION.url);

export const Ustoz = mongoose.model<IUstoz>("ustoz", UstozSchema);
