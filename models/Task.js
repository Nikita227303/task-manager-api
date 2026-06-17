const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    completed:{
        type:Boolean,
        default:false,
    },
    description:{
        type:String,
        required:false,
        trim:true,
    },
    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Low",
    },
    dueDate:{
        type:Date,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{
    timestamps:true,
});
const task=mongoose.model("Task",taskSchema);
module.exports=task;