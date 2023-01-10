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
  image: {
    type: String,
  },
  resources: [    {
    type: Schema.Types.ObjectId,
    ref: 'Resource',
  },
],
});

module.exports = topicSchema;
