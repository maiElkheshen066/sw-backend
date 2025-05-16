const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const user = await authService.createUser(req.body, res);
    res.status(201).json({
      success: true,
      status: 'success',
      message: 'User registered successfully. Please check your email.',
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 'fail',
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body, res);
    res.status(200).json({
      success: true,
      status: 'success',
      message: 'User logged in successfully',
      data: { token },
    });
  } catch (err) {
        // console.error('Register Error:', err); // Log the error for debugging
    res.status(400).json({
      success: false,
      status: 'fail',
      message: err.message,
    });
  }
};
