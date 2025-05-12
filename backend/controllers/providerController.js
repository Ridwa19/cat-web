const ServiceProvider = require('../models/ServiceProvider');

exports.toggleAvailability = async (req, res) => {
  try {
    const provider = await ServiceProvider.findOne({ userId: req.user._id });
    provider.isAvailable = req.body.isAvailable;
    await provider.save();
    res.json({ message: 'Availability updated', isAvailable: provider.isAvailable });
  } catch (error) {
    res.status(500).json({ message: 'Availability update failed', error: error.message });
  }
};

exports.toggleOnlineStatus = async (req, res) => {
  try {
    const provider = await ServiceProvider.findOne({ userId: req.user._id });
    provider.isOnline = req.body.isOnline;
    await provider.save();
    res.json({ message: 'Online status updated', isOnline: provider.isOnline });
  } catch (error) {
    res.status(500).json({ message: 'Online status failed', error: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const provider = await ServiceProvider.findOneAndUpdate(
      { userId: req.user._id },
      { location: { type: 'Point', coordinates: [lng, lat] } },
      { new: true }
    );
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: 'Location update failed', error: error.message });
  }
};

exports.getProviderLocation = async (req, res) => {
  try {
    const provider = await ServiceProvider.findOne({ userId: req.params.providerId });
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.json({ providerId: req.params.providerId, location: provider.location });
  } catch (error) {
    res.status(500).json({ message: 'Location fetch failed', error: error.message });
  }
};

exports.getNearbyProviders = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const providers = await ServiceProvider.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 5000
        }
      }
    });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Geolocation error', error: error.message });
  }
};

exports.getEarnings = async (req, res) => {
  const Appointment = require('../models/Appointment');
  try {
    const earnings = await Appointment.aggregate([
      { $match: { providerId: req.user._id, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);
    res.json({
      totalEarnings: earnings[0]?.total || 0,
      completedJobs: earnings[0]?.count || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Earnings error', error: error.message });
  }
};