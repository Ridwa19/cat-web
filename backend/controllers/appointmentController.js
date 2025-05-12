const Appointment = require('../models/Appointment');
const Service = require('../models/Service');

exports.bookAppointment = async (req, res) => {
  try {
    const { serviceId, providerId, date, notes } = req.body;
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    const appointment = new Appointment({
      userId: req.user._id,
      serviceId,
      providerId,
      date: new Date(date),
      amount: service.price,
      notes
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Not found' });

    if (appointment.providerId.toString() !== req.user._id.toString() &&
        appointment.userId.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    appointment.status = status;
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Status update failed', error: error.message });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .populate('serviceId', 'name price')
      .populate('providerId', 'name');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error: error.message });
  }
};

exports.getProviderAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ providerId: req.user._id })
      .populate('serviceId', 'name price')
      .populate('userId', 'name phone');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error: error.message });
  }
};