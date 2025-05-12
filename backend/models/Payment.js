const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    phoneNumber: String,
    amount: Number,
    reference: String,
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Payment', paymentSchema);