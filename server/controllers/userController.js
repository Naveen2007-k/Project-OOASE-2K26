import User from '../models/User.js';

// @desc    Get all beauticians
// @route   GET /api/users/beauticians
// @access  Public
export const getBeauticians = async (req, res, next) => {
  try {
    const beauticians = await User.find({ role: 'beautician' }).select('-password');
    res.json(beauticians);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};
