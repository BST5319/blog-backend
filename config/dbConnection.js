require("dotenv").config();

const mongoose = require("mongoose");
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbConnection;