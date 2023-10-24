require("dotenv").config();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    const cookies = req.cookies;

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ "message": "Error, username and password are required" });
    }
    // Find user in the database
    const foundUser = await User.findOne({ username: username }).exec();

    if (!foundUser) {
        return res.json({ "message": false });
    }
    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        // console.log("Match Error");
        return res.status(401).json({ "message": false, message });
    } else {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // Create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30min' }
        );
        const newRefreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        // Changed to let keyword
        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {
            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();

        res.cookie("jwt", newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000, });

        res.status(200).json({ "message": "ok", "accessToken": accessToken });
    }

};

module.exports = { handleLogin };