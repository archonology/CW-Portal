const { Schema, model } = require("mongoose");


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
        doc: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'docModel'
        },
        docModel: {
            type: String,
            required: true,
            enum: 'Topic'
        }
    }
);

const Subtopic = model('Subtopic', subTopicSchema);

module.exports = Subtopic;

