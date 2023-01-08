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
    imageURL: {
        type: String,
    },
    link: {
        type: String,
        required: true,
    }
});

module.exports = resourceSchema;