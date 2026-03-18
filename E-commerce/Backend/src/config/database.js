import mongoose from "mongoose";

export function connectToDb(){
    try{
        mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Connected to db");
        })
    }catch(err){
        console.log("Failed to connected db");
    }
}