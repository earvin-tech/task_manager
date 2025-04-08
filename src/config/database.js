const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const databaseConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log(`Database connected`)
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = databaseConnect;