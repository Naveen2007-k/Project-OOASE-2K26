import Review from '../models/Review.js';
import Appointment from '../models/Appointment.js';

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private/Customer
export const createReview = async (req, res, next) => {
  try {
    const { appointmentId, rating, comment } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    if (appointment.customerId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to review this appointment');
    }

    // Check if already reviewed
    const alreadyReviewed = await Review.findOne({ appointmentId });
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You have already reviewed this appointment');
    }

    const review = new Review({
      appointmentId,
      customerId: req.user._id,
      beauticianId: appointment.beauticianId,
      rating: Number(rating),
      comment
    });

    await review.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get beautician reviews
// @route   GET /api/reviews/beautician/:id
// @access  Public
export const getBeauticianReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ beauticianId: req.params.id })
      .populate('customerId', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};
