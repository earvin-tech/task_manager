const express = require('express');
const databaseConnect = require('./config/database');
const dotenv = require('dotenv');
const userRoutes = require("./routes/UserRoutes");
const projectRoutes = require("./routes/ProjectRoutes");

dotenv.config();

const app = express();

databaseConnect();

app.use(express.json());



app.get("/", (request, response) => {
    response.send("Hello World!")
});

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});