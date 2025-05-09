// UserRoutes.js - Annotated for clarity and documentation
const express = require("express");
const { registerUser,loginUser } = require("../controllers/UserController");

const userRouter = express.Router(); 

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

module.exports = userRouter;
