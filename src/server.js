const express = require('express');
const databaseConnect = require('./config/database');
const dotenv = require('dotenv');
const userRoutes = require("./routes/UserRoutes");
const projectRoutes = require("./routes/ProjectRoutes");
const taskRoutes = require("./routes/TaskRoutes");
const tagRoutes = require("./routes/TagRoutes");
const errorHandler = require("./middleware/errorHandler");

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); 
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
  });
  

dotenv.config();

const app = express();

databaseConnect();

app.use(express.json());



app.get("/", (request, response) => {
    response.send("Hello World!")
});

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/tags", tagRoutes);

// 404 handler for unknown routes
app.use((request, response, next) => {
    const error = new Error(`Not Found - ${request.originalUrl}`);
    response.status(404);
    next(error);
  });
  
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});