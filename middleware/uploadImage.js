require("dotenv").config();
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

const storage = new GridFsStorage({
    url: process.env.DB_URI,
    options: { useNewUrlParser: true },
    file: (req, file) => {
        const match = ["image/jpg", "image/png", "image/jpeg", "image/webp"];
        const fileMetadata = JSON.parse(req.body.metadata);
        const fileInfo = {
            filename: `${Date.now()}-blog-${file.originalname}`,
            metadata: fileMetadata ? fileMetadata : "No metadata"
        };
        if (match.indexOf(file.memeType) === -1) {
            return fileInfo;
        }

        return fileInfo;
    }
});

module.exports = multer({ storage });