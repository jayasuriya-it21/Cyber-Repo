// backend/models/TopicSchema.js

const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  category: String,
  name: String,
  description: String,
  videoLink: String,
  referenceLink: String,
});

module.exports = mongoose.model('Topic', TopicSchema);
