const { Schema } = require("mongoose");

const userQuickLinkSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
        },
    }
);


module.exports = userQuickLinkSchema;