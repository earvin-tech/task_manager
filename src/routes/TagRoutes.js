import verifyToken from "../middleware/verifyToken";

// TagRoutes.js - Annotated for clarity and documentation
const express = require("express");
const {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag
} = require("../controllers/TagController");

const tagRouter = express.Router();

// POST /api/tags
tagRouter.post("/", verifyToken, createTag);

// GET /api/tags
tagRouter.get("/", verifyToken, getAllTags);

// GET /api/tags/:id
tagRouter.get("/:id", verifyToken, getTagById);

// PUT /api/tags/:id
tagRouter.put("/:id", verifyToken, updateTag);

// DELETE /api/tags/:id
tagRouter.delete("/:id", verifyToken, deleteTag);

module.exports = tagRouter;
