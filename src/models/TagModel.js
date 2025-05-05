// TagModel.js - Annotated for clarity and documentation
const { default: mongoose } = require("mongoose");

// Mongoose schema or model definition
const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        color: {
            type: String,
            default: "#cccccc", // soft grey if not specified
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

// Mongoose schema or model definition
const Tag = mongoose.model("Tag", tagSchema);

module.exports = { Tag };