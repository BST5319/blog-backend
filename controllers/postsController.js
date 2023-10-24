require("dotenv").config();
const Posts = require("../model/Posts");
const getAllPosts = async (req, res) => {
    const post = await Posts.findById({ _id: process.env.ALL_POSTS });
    if (!post) return res.status(204).json({ "message": "No posts found" });
    res.json(post.posts);
};
const editPost = async (req, res) => {
    const id = req.params.id;
    const { title, body, datetime } = req.body;
    try {
        const post = await Posts.updateOne({ "posts.id": id }, { $set: { "posts.$.title": title, "posts.$.body": body, "posts.$.datetime": datetime } });
        if (!post) return res.status(409).json({ "message": "Post Not Found to Edit" });

        return res.status(200).json({ "message": "Updated Successfully" });
    }
    catch (err) {
        return res.status(500).json({ "message": "error occurred" });
    }
};
const handleNewPost = async (req, res) => {
    const { username, title, body, fileName, id, datetime } = req.body;
    const post = await Posts.findById({ _id: process.env.ALL_POSTS });
    try {
        post.posts.push({
            "id": id,
            "author": username,
            "image": fileName,
            "datetime": datetime,
            "title": title,
            "body": body,
            "comments": []
        });
        post.save();
        res.status(200).json({ "msg": "Post created successfully" });
    } catch (err) {
        res.status(500).json({ "msg": "Error Occurred while creating a Post" });
    }

};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const filter = {
            "_id": "652a92748cb7e28ac88e3380"
        };
        const pullQuery = {
            "posts": { id: id }
        };
        const postToDelete = {
            $pull: pullQuery
        };
        const result = await Posts.updateOne(filter, postToDelete);
        console.log(result);
        res.status(200).json({ "msg": "Post Deleted" });
    } catch (err) {
        res.status(500).json({ "msg": "Internal Server Error" });
    }
};
module.exports = { getAllPosts, editPost, handleNewPost, deletePost };