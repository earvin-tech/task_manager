// ProjectModel.js - Annotated for clarity and documentation
const { default: mongoose } = require("mongoose");

// Mongoose schema or model definition
const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        dueDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["not-started", "in-progress", "completed", "on-hold"],
            default: "not-started",
        }
    },
    {
        timestamps: true,
    }
);

// Mongoose schema or model definition
const Project = mongoose.model("Project", projectSchema);

module.exports = { Project };