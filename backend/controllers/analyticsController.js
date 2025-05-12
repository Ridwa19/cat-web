const User = require('../models/User');
const Payment = require('../models/Payment');
const Appointment = require('../models/Appointment');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProviders = await User.countDocuments({ role: 'serviceProvider' });
    const totalBookings = await Appointment.countDocuments();
    const revenue = await Payment.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    res.json({
      totalUsers,
      totalProviders,
      totalBookings,
      totalRevenue: revenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Analytics error', error: error.message });
  }
};

exports.getServiceTrends = async (req, res) => {
  try {
    const stats = await Appointment.aggregate([
      {
        $group: {
          _id: '$serviceId',
          count: { $sum: 1 },
          total: { $sum: '$amount' }
        }
      },
      {
        $lookup: {
          from: 'services',
          localField: '_id',
          foreignField: '_id',
          as: 'service'
        }
      },
      { $unwind: '$service' },
      {
        $project: {
          serviceName: '$service.name',
          count: 1,
          total: 1
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Service analytics error', error: error.message });
  }
};
