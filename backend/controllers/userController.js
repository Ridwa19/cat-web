const User = require('../models/User');

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, phone, address }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites', 'name email');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { favorites: req.params.providerId } });
    res.json({ message: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Add favorite failed', error: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $pull: { favorites: req.params.providerId } });
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Remove favorite failed', error: error.message });
  }
};