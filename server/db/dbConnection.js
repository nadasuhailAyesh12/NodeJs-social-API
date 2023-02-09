const mongoose = require("mongoose");
const { uri } = require("../config/enviroment/constants").database

const dbConnect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error ${error.message}`);
    }
};

module.exports = dbConnect;