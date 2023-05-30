const { Schema, model } = require("mongoose");

const quickLinkSchema = new Schema(
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

const QuickLink = model('QuickLink', quickLinkSchema);

module.exports = QuickLink;
module.exports = quickLinkSchema;
