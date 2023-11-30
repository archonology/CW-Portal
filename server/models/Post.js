const { Schema, model } = require("mongoose");


// define topic schema
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: false,
        }
    }
);

const Post = model('Post', postSchema);

module.exports = Post;
