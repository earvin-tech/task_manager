const express = require('express');
const databaseConnect = require('./config/database');
const dotenv = require('dotenv');
const userRoutes = require("./routes/UserRoutes");

const app = express();

dotenv.config();

databaseConnect();

app.use(express.json());



app.get("/", (request, response) => {
    response.send("Hello World!")
});

app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});