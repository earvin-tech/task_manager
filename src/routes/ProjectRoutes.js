const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require("../controllers/ProjectController");

const projectRouter = express.Router();

// POST /api/projects
projectRouter.post("/", createProject);

// GET /api/projects
projectRouter.get("/", getAllProjects);

// GET /api/projects/:id
projectRouter.get("/:id", getProjectById);

// PUT /api/projects/:id
projectRouter.put("/:id", updateProject);

// DELETE /api/projects/:id
projectRouter.delete("/:id", deleteProject);

module.exports = projectRouter;
