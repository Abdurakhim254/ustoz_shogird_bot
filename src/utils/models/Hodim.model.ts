import mongoose from "mongoose";
import { APPLICATION } from "../../config";
import { IHodim } from "../types/hodim.model.type";

const HodimSchema = new mongoose.Schema<IHodim>(
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
    hudud: {
      type: String,
      required: true,
    },
    masul: {
      type: String,
      required: true,
    },
    murojaat_vaqti: {
      type: String,
      required: true,
    },
    ish_vaqti: {
      type: String,
      required: true,
    },
    maqsad: {
      type: String,
      required: true,
    },
    narx:{
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

export const Hodim = mongoose.model<IHodim>("hodim", HodimSchema);
