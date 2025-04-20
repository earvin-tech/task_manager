// TagController.js - Annotated for clarity and documentation
const { Tag } = require("../models/TagModel");

// Create a new tag
const createTag = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const { name } = request.body;

        const tag = new Tag({ name });
        await tag.save();

        response.status(201).json(tag);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

// Get all tags
const getAllTags = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const tags = await Tag.find();
        response.json(tags);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

// Get one tag by ID
const getTagById = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const tag = await Tag.findById(request.params.id);

        if (!tag) {
            return response.status(404).json({ message: "Tag not found" });
        }

        response.json(tag);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

// Update a tag by ID
const updateTag = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const updatedTag = await Tag.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true, runValidators: true }
        );

        if (!updatedTag) {
            return response.status(404).json({ message: "Tag not found" });
        }

        response.json(updatedTag);
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

// Delete a tag by ID
const deleteTag = async (request, response, next) => {
// Begin try block to handle potential runtime errors
    try {
        const deletedTag = await Tag.findByIdAndDelete(request.params.id);

        if (!deletedTag) {
            return response.status(404).json({ message: "Tag not found" });
        }

        response.json({ message: "Tag deleted" });
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

module.exports = {
    createTag,
    getAllTags,
    getTagById,
    updateTag,
    deleteTag,
};
