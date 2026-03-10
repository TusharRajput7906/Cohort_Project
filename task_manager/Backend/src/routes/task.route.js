const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controllers/task.controller");

taskRouter.post("/", taskController.createTask);
taskRouter.get("/", taskController.getTasks);

taskRouter.put("/:id", taskController.updateTask);
taskRouter.delete("/:id", taskController.deleteTask);

module.exports = taskRouter;