const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Notification', notificationSchema);
  