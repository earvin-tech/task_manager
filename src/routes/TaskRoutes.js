const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/TaskController");

const taskRouter = express.Router();

// POST /api/tasks
taskRouter.post("/", createTask);

// GET /api/tasks
taskRouter.get("/", getAllTasks);

// GET /api/tasks/:id
taskRouter.get("/:id", getTaskById);

// PUT /api/tasks/:id
taskRouter.put("/:id", updateTask);

// DELETE /api/tasks/:id
taskRouter.delete("/:id", deleteTask);

module.exports = taskRouter;
