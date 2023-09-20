const mongoose = require("mongoose")


async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Sessions");
        console.log("successfull connect DB");
    } catch (error) {
        console.log(" connect DB error");
    }

}

module.exports = connectDB;