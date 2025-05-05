// TaskRoutes.js - Annotated for clarity and documentation
const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/TaskController");

const taskRouter = express.Router();

const { verifyToken } = require("../middleware/verifyToken");

// POST /api/tasks
taskRouter.post("/", verifyToken, createTask);

// GET /api/tasks
taskRouter.get("/", verifyToken, getAllTasks);

// GET /api/tasks/:id
taskRouter.get("/:id", verifyToken, getTaskById);

// PUT /api/tasks/:id
taskRouter.put("/:id", verifyToken, updateTask);

// DELETE /api/tasks/:id
taskRouter.delete("/:id", verifyToken, deleteTask);

module.exports = taskRouter;
