import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seedDefaultData } from './seeder.js';

dotenv.config();

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding.');
    await seedDefaultData();
    console.log('Seeding finished!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

runSeed();
