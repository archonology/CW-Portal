const { Schema, model } = require("mongoose");


// define topic schema
const topicSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
        },
        link: {
            type: String,
        },
        image: {
            type: String,
        },
    }
);

const Topic = model('Topic', topicSchema);

module.exports = Topic;
