const express = require("express");
const router = express.Router();
const ImageController = require("../controllers/imageController");

router.post("/file", ImageController.handleUpload)
    .get("/:filename", ImageController.getImage)
    .post("/update/:filename", ImageController.updateImage);

module.exports = router;