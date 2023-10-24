const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    posts: [
        {
            id: {
                default: 1,
                type: Number,
                required: true
            },
            author: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            datetime: {
                type: String,
            },
            body: {
                type: String,
                required: true
            },
            comments: [
                {
                    id: {
                        type: Number,
                        default: 1,
                        required: true
                    },
                    data: {
                        type: String,
                        required: true
                    },
                    author: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
});

module.exports = mongoose.model("posts", postsSchema);