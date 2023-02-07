const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error ${error.message}`);
    }
};

module.exports = dbConnect;