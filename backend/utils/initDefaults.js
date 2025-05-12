const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Category = require('../models/Category');

const initDefaults = async () => {
  try {
    const admin = await User.findOne({ email: 'admin@test.com' });
    if (!admin) {
      const hashed = await bcrypt.hash('admin123', 10);
      await new User({ name: 'Admin', email: 'admin@test.com', password: hashed, role: 'admin', phone: '252612345678', address: 'Admin HQ' }).save();
      console.log('✅ Default admin created');
    }

    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.insertMany([
        { name: 'Cleaning', icon: 'cleaning_services' },
        { name: 'Plumbing', icon: 'plumbing' },
        { name: 'Electrical', icon: 'electrical_services' },
        { name: 'Carpentry', icon: 'carpenter' },
        { name: 'Painting', icon: 'format_paint' },
        { name: 'Gardening', icon: 'yard' }
      ]);
      console.log('✅ Default categories inserted');
    }
  } catch (err) {
    console.error('❌ Init error:', err);
  }
};

module.exports = initDefaults;
