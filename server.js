const express = require("express");
const session = require("express-session");
const app = express();
const Port = 3000;

app.use(session({
    secret: 'secret-key-ragul',
    resave: false,
    saveUninitialized: true,
}))
app.use(express.json())

const db = require("./config/config");
db();



app.use("/api/user", require("./route/user.route"))




app.listen(Port, function () {
    console.log(`server is running on port ${Port}`);
})