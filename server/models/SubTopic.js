const { Schema, model } = require("mongoose");

// define deck schema
const subTopicSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
        },
        text: {
            type: String,
        },
        resources: [{
            type: Schema.Types.ObjectId,
            ref: 'Resource',
        },
        ],
    }
);

const Subtopic = model('Subtopic', subTopicSchema);

module.exports = Subtopic;
