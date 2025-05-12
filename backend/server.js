const mongoose = require('mongoose');
const app = require('./app');
const User = require('./models/User');
const Category = require('./models/Category');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/home_service_app';
const initDefaults = require('./utils/initDefaults');
await initDefaults();
const connectWithRetry = () => {
  console.log('Connecting to MongoDB...');

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
  })
    .then(() => {
      console.log('✅ MongoDB connected');
      initializeDefaults();
    })
    .catch(err => {
      console.error('❌ MongoDB connection error:', err);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

mongoose.connection.on('error', err => console.error('MongoDB error:', err));
mongoose.connection.on('disconnected', connectWithRetry);
connectWithRetry();

const initializeDefaults = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@test.com' });
    if (!adminExists) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await new User({
        name: 'Admin User',
        email: 'admin@test.com',
        password: hashedPassword,
        phone: '252612345678',
        address: 'Admin HQ',
        role: 'admin'
      }).save();
      console.log('✅ Default admin created');
    }

    const catCount = await Category.countDocuments();
    if (catCount === 0) {
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
    console.error('❌ Initialization failed:', err);
  }
};

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});