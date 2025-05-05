import verifyToken from "../middleware/verifyToken";

// ProjectRoutes.js - Annotated for clarity and documentation
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
projectRouter.post("/", verifyToken, createProject);

// GET /api/projects
projectRouter.get("/", verifyToken, getAllProjects);

// GET /api/projects/:id
projectRouter.get("/:id", verifyToken, getProjectById);

// PUT /api/projects/:id
projectRouter.put("/:id", verifyToken, updateProject);

// DELETE /api/projects/:id
projectRouter.delete("/:id", verifyToken, deleteProject);

module.exports = projectRouter;
