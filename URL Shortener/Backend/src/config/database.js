import mongoose from "mongoose";

export function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to database")
    })
    .catch((err)=>{
        console.error("Database connection failed:", err.message);
        process.exit(1);
    });
}