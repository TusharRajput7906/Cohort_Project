const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"pending"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
});

const taskModel = mongoose.model("tasks",taskSchema);

module.exports = taskModel;