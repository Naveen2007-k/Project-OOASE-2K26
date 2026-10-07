import express from 'express';
import {
  createAppointment,
  getMyAppointments,
  getStaffAppointments,
  getAppointments,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';
import { protect, admin, staff } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createAppointment)
  .get(protect, admin, getAppointments);

router.route('/my-appointments').get(protect, getMyAppointments);
router.route('/staff').get(protect, staff, getStaffAppointments);
router.route('/:id/status').put(protect, staff, updateAppointmentStatus);

export default router;
