const { Task } = require("../models/TaskModel");

const createTask = async (request, response, next) => {
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
    } catch (err) {
        next(err);
    }
};

const getAllTasks = async (request, response, next) => {
    try {
        const tasks = await Task.find();
        response.json(tasks);
    } catch (err) {
        next(err);
    }
};

const getTaskById = async (request, response, next) => {
    try {
        const task = await Task.findById(request.params.id);

        if (!task) {
            return response.status(404).json({
                message: "Task not found"
            });
        }
        response.json(task);
    } catch (err) {
        next(err);
    }
};

const updateTask = async (request, response, next) => {
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
    } catch (err) {
        next(err);
    }
};

const deleteTask = async (request, response, next) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(request.params.id);

        if (!deletedTask) {
            return response.status(404).json({ message: "Task not found" });
        }

        response.json({ message: "Task deleted" });
    } catch (err) {
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