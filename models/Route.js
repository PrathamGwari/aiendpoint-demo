const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
  endpoint: {
    type: String,
    required: true,
  },
  knowledgePoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KnowledgePool',
    required: true,
  },
  aiModels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AiModel',
    required: true,
  }]
});

module.exports = mongoose.model('Route', RouteSchema);
