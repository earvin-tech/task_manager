const { Project } = require("../models/ProjectModel");

const createProject = async (request, response, next) => {
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
    } catch (err) {
        next(err);
    }
};

const getAllProjects = async (request, response, next) => {
    try {
        const projects = await Project.find();
        response.json(projects);
    } catch (err) {
        next(err);
    }
};

const getProjectById = async (request, response, next) => {
    try {
        const project = await Project.findById(request.params.id);

        if (!project) {
            return response.status(404).json({
                message: "Project not found"
            });
        }

        response.json(project);
    } catch (err) {
        next(err);
    }
};

const updateProject = async (request, response, next) => {
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

        response.json(updateProject);
    } catch (err) {
        next(err);
    }
};

const deleteProject = async (request, response, next) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(request.params.id);

        if (!deleteProject) {
            return response.status(404).json({
                message: "Project not found"
            });
        }

        response.json({
            message: "Project deleted"
        })
    } catch (err) {
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