const taskModel = require("../models/task.model");
async function createTask(req, res) {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "title and description are required",
        });
    }

    const task = await taskModel.create({
        title,
        description,
    });

    return res.status(201).json({
        message: "Task created",
        task,
    });
}

async function getTasks(req, res) {
    const tasks = await taskModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
        tasks,
    });
}
async function updateTask(req, res) {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const update = {};
    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;
    if (status !== undefined) update.status = status;

    const task = await taskModel.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
    });

    if (!task) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    return res.status(200).json({
        message: "Task updated",
        task,
    });
}

async function deleteTask(req,res){
    const { id } = req.params;
    const task = await taskModel.findByIdAndDelete(id);
    
    res.status(200).json({
        message:"Task Delete Successfully.",
        task
    })
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};