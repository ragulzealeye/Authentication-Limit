const User = require("../model/user.model")



async function registerUser(req, res) {
    var { username, password, email } = req.body;
    const newUser = await new User({
        username, password, email
    }).save();
    res.json({ newUser })
}



async function loginUser(req, res) {
    var { email, password } = req.body;

    console.log(req.ip, "...login...");
    const user = await User.findOne({ email, password });
    if (user) {
        req.session.email = user.email;
        if (user.activeSessions.length >= 2) {
            return res.json({ message: "device limit maximum exceed" })
        }
        const user2 = await User.findOneAndUpdate({ email, password }, { $push: { activeSessions: req.ip } });// req.session.id
        res.json({ user })
    } else {
        return res.json({ error: "no user found" })
    }


}

async function logoutUser(req, res) {
    const { email } = req.session;

    console.log(req.ip, "...logout...");
    const user = await User.findOne({ email });
    if (user) {
        await User.findOneAndUpdate({ email }, { $pull: { activeSessions: req.ip } });//req.session.id 
        req.session.destroy();
    }
    res.json({ user })
}

module.exports = { registerUser, loginUser, logoutUser }