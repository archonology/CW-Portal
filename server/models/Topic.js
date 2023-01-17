const { Schema, model } = require("mongoose");


// define topic schema
const topicSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        url: {
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
        resources: [{
            type: Schema.Types.ObjectId,
            ref: 'Resource',
        },
        ],
        subtopics: [{
            type: Schema.Types.ObjectId,
            ref: 'Subtopic',
        },
        ],
    }
);

const Topic = model('Topic', topicSchema);

module.exports = Topic;
