const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    target: { type: String },
    targetId: String,
    message: String,
    status: { type: String, enum: ['open', 'resolved'], default: 'open' },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Issue', issueSchema);