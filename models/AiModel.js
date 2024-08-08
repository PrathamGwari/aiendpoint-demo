// models/AiModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const aiModelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
});

const AiModel = mongoose.model('AiModel', aiModelSchema);

module.exports = AiModel;
