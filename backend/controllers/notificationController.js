const Notification = require('../models/Notification');

exports.sendNotification = async (req, res) => {
  const { toUserId, message } = req.body;
  try {
    const notification = new Notification({ toUserId, message });
    await notification.save();
    res.json({ message: 'Notification sent', notification });
  } catch (error) {
    res.status(500).json({ message: 'Send failed', error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifs = await Notification.find({ toUserId: req.user._id }).sort({ createdAt: -1 });
    res.json(notifs);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error: error.message });
  }
};