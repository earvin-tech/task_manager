const { Tag } = require("../models/TagModel");

// Create a new tag
const createTag = async (request, response, next) => {
    try {
        const { name } = request.body;

        const tag = new Tag({ name });
        await tag.save();

        response.status(201).json(tag);
    } catch (err) {
        next(err);
    }
};

// Get all tags
const getAllTags = async (request, response, next) => {
    try {
        const tags = await Tag.find();
        response.json(tags);
    } catch (err) {
        next(err);
    }
};

// Get one tag by ID
const getTagById = async (request, response, next) => {
    try {
        const tag = await Tag.findById(request.params.id);

        if (!tag) {
            return response.status(404).json({ message: "Tag not found" });
        }

        response.json(tag);
    } catch (err) {
        next(err);
    }
};

// Update a tag by ID
const updateTag = async (request, response, next) => {
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
    } catch (err) {
        next(err);
    }
};

// Delete a tag by ID
const deleteTag = async (request, response, next) => {
    try {
        const deletedTag = await Tag.findByIdAndDelete(request.params.id);

        if (!deletedTag) {
            return response.status(404).json({ message: "Tag not found" });
        }

        response.json({ message: "Tag deleted" });
    } catch (err) {
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
