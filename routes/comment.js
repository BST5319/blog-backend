const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/newComment", require("../middleware/verifyJWT"), commentController.handleNewComment)
    .delete("/delete/:id/:cid", require("../middleware/verifyJWT"), commentController.handleDelete);

module.exports = router;
