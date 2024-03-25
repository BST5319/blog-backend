const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
    const origin = req.header.origin;
    console.log(origin);
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", true);
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x - client - key, x - client - token, x - client - secret, Authorization");
    }
    next();
};

module.exports = credentials;