const Task=require("../models/task");
const createTask=async(req,res)=>{
    try{
          console.log("BODY:", req.body); 
         const {title,description,dueDate,priority}=req.body;
         if(!title || !dueDate){
            return res.status(400).json({message:"Title and due date are required"});
         }
         const task=await Task.create({title,description,dueDate,priority,user:req.user.id});
         res.status(201).json(task);
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Server error"});
        }
        }
//gettask
const gettasks = async (req, res) => {
    try {

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

      
        const tasks = await Task.find({
            user: req.user.userId
        });

        return res.status(200).json(tasks);

    } catch (error) {
        console.log(" GET TASK ERROR:", error);
        return res.status(500).json({ message: error.message });
    }
};
const gettaskbyid = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({message:"Unauthorized"});
        }

        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
const updatetaskbyid = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if(task.user.toString() !== req.user.id){
            return res.status(403).json({message:"Unauthorized"});
        }
        const { title, description, priority, dueDate, completed } = req.body;
        const updatedTask=await Task.findByIdAndUpdate(
            req.params.id,
            {title,description,priority,dueDate,completed},
            {new:true,runValidators:true}
        )
        res.json(updatedTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
const deletetask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if(task.user.toString() !== req.user.id){
            return res.status(403).json({message:"Unauthorized"});
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
const gettaskStats=async(req,res)=>{
    try{
        const totalTasks=await Task.countDocuments({user:req.user.id});
        const completedTasks=await Task.countDocuments({user:req.user.id,completed:true});
        const pendingTask=await Task.countDocuments({user:req.user.id,completed:false});
        res.json({totalTasks,completedTasks,pendingTask});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = {
    gettasks,
    createTask,
    gettaskbyid,
    updatetaskbyid,
    deletetask,
    gettaskStats
};