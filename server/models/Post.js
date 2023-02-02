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
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    }
);

const Post = model('Post', postSchema);

module.exports = Post;
