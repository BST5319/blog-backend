const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleSignUp = async (req, res) => {

    const { username, email, mobileno, pwd: password } = req.body;

    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.status(409).json({ "message": "Duplicate Exists" });

    try {

        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username: username,
            password: hashedPwd,
            email: email,
            mobileNumber: mobileno
        });
        res.status(201).json({ "message": "New user created" });
    }
    catch (err) {
        res.status(500).json({ "Error": true, "message": err.message });
    }

};
module.exports = { handleSignUp };