const { Schema } = require("mongoose");

// define deck schema
const subTopicSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
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

module.exports = subTopicSchema;
