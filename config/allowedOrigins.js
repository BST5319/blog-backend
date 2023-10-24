require("dotenv").config();
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://127.0.0.1:3000",
    "http://localhost:3000"
];
module.exports = allowedOrigins;