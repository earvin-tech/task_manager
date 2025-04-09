const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema(
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
        dueDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["not-started", "in-progress", "completed", "on-hold"],
            default: "not-started",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };