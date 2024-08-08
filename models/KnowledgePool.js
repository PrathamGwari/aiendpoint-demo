const mongoose = require('mongoose');

const KnowledgePoolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const KnowledgePool = mongoose.model('KnowledgePool', KnowledgePoolSchema);

module.exports = KnowledgePool;
