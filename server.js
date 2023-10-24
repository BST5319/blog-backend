const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cookieParser = require("cookie-parser");
const uploadImage = require("./middleware/uploadImage");
const dbConnection = require("./config/dbConnection");
const PORT = process.env.PORT || 4000;

// Database Connection
dbConnection();

app.use(credentials);

// Enable Cross Origin Resource Sharing to be allowed 
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

//Used to allow json communication
app.use(express.json());

// Used to parse the cookies
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!!!");
});

app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/signup", require("./routes/signUp"));
app.use("/contact", require("./routes/contact"));
app.use("/file", require("./routes/upload"));
app.use("/refresh", require("./routes/refresh"));
app.use("/posts", require("./routes/post"));
app.use("/upload", uploadImage.single("file"), require("./routes/upload"));
app.use("/comment", require("./routes/comment"));
mongoose.connection.once("open", () => {
    console.log("Database Connected");
    app.listen(PORT, () => {
        console.log("Listening at http://localhost:4000");
    });
});