const express = require('express');
const databaseConnect = require('./config/database');
const dotenv = require('dotenv')

const app = express();

dotenv.config();

databaseConnect();

app.use(express.json());

app.get("/", (request, response) => {
    response.send("Hello World!")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});