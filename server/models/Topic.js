const { Schema } = require("mongoose");
const resourceSchema = require("./Resource");

// define deck schema
const topicSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  resources: [resourceSchema],
});

module.exports = topicSchema;
