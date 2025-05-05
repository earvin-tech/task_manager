// UserController.js - Annotated for clarity and documentation
const { User } = require("../models/UserModel");
const jwt = require("jsonwebtoken");

// Register a new user
const registerUser = async (req, res, next) => {
// Begin try block to handle potential runtime errors
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
// Send JSON response to the client
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
// Send JSON response to the client
            return res.status(409).json({ message: "Username or email already in use." });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

// Send JSON response to the client
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

// Login a user
const loginUser = async (req, res, next) => {
// Begin try block to handle potential runtime errors
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user || !user.comparePassword(password)) {
// Send JSON response to the client
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
// Catch block to forward or log errors
    } catch (err) {
// Pass error to centralized error handler
        next(err);
    }
};

module.exports = {
    registerUser,
    loginUser,
};
