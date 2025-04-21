import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const postSchema =new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  age:{
    type:Number,
    required:true
  },
  texnologiya:{
    type:String,
    required:true,
  },
  aloqa:{
    type:String,
    required:true,
  },
  hudud:{
    type:String,
    required:true
  },
  narx:{
    type:String,
    required:true
  },
  kasb:{
    type:String,
    required:true
  },
  murojaat_vaqti:{
    type:String,
    required:true
  },
  maqsad:{
    type:String,
    required:true
  }

});

await mongoose.connect(process.env.MONGO_URI);
export const Posts = mongoose.model("posts", postSchema);
