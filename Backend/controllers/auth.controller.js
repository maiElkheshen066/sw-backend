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

exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    status: 'success',
    message: 'User logged out successfully',
  });
};

exports.forgotPassword = async (req, res) => {
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset-password`;
      const user = await authService.forgotPassword(req.body.email,resetURL);
      // Response if user exists and reset email is sent
      res.status(200).json({
        success: true,
          status: 'success',
          message: 'Password reset link has been sent to your email',
          // data: { user },
      });
  } catch (err) {

      res.status(400).json({
        success: false,
          status: 'fail',
          message: err.message,
      });
  }
};

exports.resetPassword=async(req,res)=>{
    // req { req.body.token =>   }
    try{
      const { password, passwordConfirm } = req.body;
      const { token } = req.params;
      const user=await authService.resetPasswordService(token,password,passwordConfirm)
      res.status(200).json({
        success: true,
        status: 'success',
        message: 'Password reset successfully',
        data: { user },
      });
    }catch(err){
      res.status(400).json({
        success: false,
        status: 'fail',
        message: err.message,
      });
    }

}