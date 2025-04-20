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
tagRouter.post("/", createTag);

// GET /api/tags
tagRouter.get("/", getAllTags);

// GET /api/tags/:id
tagRouter.get("/:id", getTagById);

// PUT /api/tags/:id
tagRouter.put("/:id", updateTag);

// DELETE /api/tags/:id
tagRouter.delete("/:id", deleteTag);

module.exports = tagRouter;
