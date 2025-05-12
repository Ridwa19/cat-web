const Service = require('../models/Service');

exports.createService = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const service = new Service({ name, description, category, price, providerId: req.user._id });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Create failed', error: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate('providerId', 'name');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error: error.message });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const services = await Service.find({ category: req.params.category }).populate('providerId', 'name');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Fetch by category failed', error: error.message });
  }
};

exports.searchServices = async (req, res) => {
  const { q } = req.query;
  try {
    const services = await Service.find({ name: { $regex: q, $options: 'i' } });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
};

exports.approveService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Approve failed', error: error.message });
  }
};