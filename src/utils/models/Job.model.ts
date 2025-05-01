import mongoose from "mongoose";
import { APPLICATION } from "../../config";

const Jobschema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
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
        type: String,
        required: true,
    },
    texnologiya:{
        type:String,
        required:true
    },
    aloqa:{
        type:String,
        required:true
    },
    hudud:{
        type:String,
        required:true
    },
    narxi:{
        type: String,
        required: true,
    },
    kasbi:{
        type: String,
        required: true,
    },
    murojaat_vaqti:{
        type: String,
        required: true,
    },
    maqsad:{
        type:String,
        required:true
    },
    status: {
        type: Boolean,
        default:false
    }
})

mongoose.connect(APPLICATION.url);

export const Job = mongoose.model(
    "job",
    Jobschema
)
