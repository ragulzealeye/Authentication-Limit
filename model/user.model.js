const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    activeSessions: []

})

module.exports = mongoose.model("user", userSchema);