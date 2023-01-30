const { Schema, model } = require("mongoose");

const subTopicSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
        link: {
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
