const User = require('../models/User');

// @desc    Get logged-in user's profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update logged-in user's profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  const { firstName, secondName, email, role, gender, mobileNumber } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (firstName) user.firstName = firstName;
    if (secondName) user.SecondName = secondName;
    if (email) user.email = email;
    if (role) user.role = role;
    if (gender) user.gender = gender;
    if (mobileNumber) user.mobileNumber = mobileNumber;

    const updatedUser = await user.save();
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server Error  🚗' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
