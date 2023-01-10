const { Schema } = require("mongoose");

const resourceSchema = new Schema({
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
    image: {
        type: String,
    },
    link: {
        type: String,
        required: true,
    },
});

const Resource = model('Resource', resourceSchema);

module.exports = Resource;