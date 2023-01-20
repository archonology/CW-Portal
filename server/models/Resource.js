const { Schema, model } = require("mongoose");

const resourceSchema = new Schema(
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
            required: true,
        },
        doc: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'docModel'
        },
        docModel: {
            type: String,
            required: true,
            enum: ['Topic', 'Subtopic']
        }
    }
);

const Resource = model('Resource', resourceSchema);

module.exports = Resource;