import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';
import User from '../models/User.js';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
export const createAppointment = async (req, res, next) => {
  try {
    const { serviceId, beauticianId, date, startTime, endTime } = req.body;

    // Basic validation
    if (!serviceId || !beauticianId || !date || !startTime || !endTime) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    // Get service to get price
    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }

    // Check if beautician exists
    const beautician = await User.findById(beauticianId);
    if (!beautician || beautician.role !== 'beautician') {
      res.status(404);
      throw new Error('Beautician not found');
    }

    // Check for conflicting appointments
    const conflictingAppt = await Appointment.findOne({
      beauticianId,
      date: new Date(date),
      startTime, // In a real app, this should check time overlap precisely
      status: { $in: ['Pending', 'Confirmed'] }
    });

    if (conflictingAppt) {
      res.status(400);
      throw new Error('Beautician is already booked for this time slot');
    }

    const appointment = new Appointment({
      customerId: req.user._id,
      beauticianId,
      serviceId,
      date,
      startTime,
      endTime,
      totalAmount: service.price
    });

    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
export const getMyAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ customerId: req.user._id })
      .populate('beauticianId', 'name')
      .populate('serviceId', 'name price');
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// @desc    Get appointments for beautician
// @route   GET /api/appointments/staff
// @access  Private/Staff
export const getStaffAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ beauticianId: req.user._id })
      .populate('customerId', 'name phone')
      .populate('serviceId', 'name price');
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({})
      .populate('customerId', 'name')
      .populate('beauticianId', 'name')
      .populate('serviceId', 'name');
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Staff/Admin)
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      // Ensure staff can only update their own appointments
      if (req.user.role === 'beautician' && appointment.beauticianId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this appointment');
      }

      appointment.status = status;
      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404);
      throw new Error('Appointment not found');
    }
  } catch (error) {
    next(error);
  }
};
