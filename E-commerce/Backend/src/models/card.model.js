import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        req:"Product",
        required:true,
    },
    quantity:{
        type:Number,
        default:true
    }
},{
    timestamps:true
})

const cardModel = mongoose.model("Card",cardSchema);

export default cardModel;