import mongoose from "mongoose";

export async function connectToDb(){
   try{
     mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connect to db");
    })
   }catch(err){
    console.log("Failed to connect database:"+err.message);
   }
}