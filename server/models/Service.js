import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name']
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  durationMinutes: {
    type: Number,
    required: [true, 'Please add duration in minutes']
  },
  category: {
    type: String,
    default: 'General'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
