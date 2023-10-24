const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router.get("/", postsController.getAllPosts)
    .put("/edit/:id", require("../middleware/verifyJWT"), postsController.editPost)
    .post("/newPost", require("../middleware/verifyJWT"), postsController.handleNewPost)
    .delete("/delete/:id", require("../middleware/verifyJWT"), postsController.deletePost);

module.exports = router;