// database.js - Annotated for clarity and documentation
const mongoose = require('mongoose');


const databaseConnect = async () => {
// Begin try block to handle potential runtime errors
    try {
// Connects to MongoDB using Mongoose
        await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Database connected`)
// Catch block to forward or log errors
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = databaseConnect;