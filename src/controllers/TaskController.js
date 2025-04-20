// TaskController.js - Annotated for clarity and documentation
const { Task } = require("../models/TaskModel");

const createTask = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const { title, description, dueDate, status, priority, project, tags } = request.body;

        const task = new Task({
            title,
            description,
            dueDate,
            status,
            priority,
            project,
            tags,
            owner: request.user?.id || null
        });

        await task.save();
        response.status(201).json(task);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

const getAllTasks = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const tasks = await Task.find();
        response.json(tasks);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

const getTaskById = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const task = await Task.findById(request.params.id);

        if (!task) {
            return response.status(404).json({
                message: "Task not found"
            });
        }
        response.json(task);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

const updateTask = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return response.status(404).json({
                message: "Task not found"
            });
        }

        response.json(updatedTask);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

const deleteTask = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const deletedTask = await Task.findByIdAndDelete(request.params.id);

        if (!deletedTask) {
            return response.status(404).json({ message: "Task not found" });
        }

        response.json({ message: "Task deleted" });
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};