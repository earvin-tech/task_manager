// ProjectController.js - Annotated for clarity and documentation
const { Project } = require("../models/ProjectModel");

const createProject = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const { title, description, dueDate, status } = request.body;

        const project = new Project({
            title,
            description,
            dueDate,
            status,
            owner: request.user?.id || null
        });

        await project.save();
        response.status(201).json(project);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

const getAllProjects = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const projects = await Project.find();
        response.json(projects);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

const getProjectById = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const project = await Project.findById(request.params.id);

        if (!project) {
            return response.status(404).json({
                message: "Project not found"
            });
        }

        response.json(project);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

const updateProject = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new:true, runValidators: true }
        );

        if (!updatedProject) {
            return response.status(404).json({
                message: "Project not found"
            });
        }

        response.json(updatedProject);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

const deleteProject = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const deletedProject = await Project.findByIdAndDelete(request.params.id);

        if (!deletedProject) {
            return response.status(404).json({
                message: "Project not found"
            });
        }

        response.json({
            message: "Project deleted"
        })
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
}