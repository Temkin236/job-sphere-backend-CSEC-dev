import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    console.log('MONGO_URI in connectDB:', MONGO_URI); // Debug log

    if (!MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected'); // This should log if connected
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

export default connectDB;