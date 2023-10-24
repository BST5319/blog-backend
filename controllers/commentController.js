require("dotenv").config();
const Posts = require("../model/Posts");

const handleNewComment = async (req, res) => {
    const { id, commentData, author, postId } = req.body;
    console.log(req.body);
    const postParsedIndex = parseInt(postId);
    try {
        const result = await Posts.findById({ _id: process.env.ALL_POSTS }).exec();
        result.posts[postParsedIndex].comments.push({
            "id": id,
            "data": commentData,
            "author": author
        });
        result.save();
        res.status(200).json({ "message": "ok" });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
};

const handleDelete = async (req, res) => {
    const { id, cid } = req.params;
    const commentId = parseInt(cid);
    try {
        const filter = {
            "_id": "652a92748cb7e28ac88e3380"
        };
        const pullQuery = {};
        pullQuery[`posts.${id}.comments`] = { id: commentId };

        const commentToDelete = {
            $pull: pullQuery
        };
        const result = await Posts.updateOne(filter, commentToDelete);
        console.log("try catch position 1");
        console.log(result);

        res.status(200).json({ "message": "ok" });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }

};

module.exports = { handleNewComment, handleDelete };;