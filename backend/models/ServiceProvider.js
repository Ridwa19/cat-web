const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    businessName: { type: String, required: true },
    serviceCategories: [{ type: String }],
    description: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    isOnline: { type: Boolean, default: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }
    }
  });
  
  providerSchema.index({ location: '2dsphere' });
  
  module.exports = mongoose.model('ServiceProvider', providerSchema);