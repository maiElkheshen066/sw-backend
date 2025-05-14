const userServices = require("../services/users.service");

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getUsers();
    res.status(200).json({
      status: "success",
      message: "fetch all users",
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: err.message,
    });
  }
};
// delete all users
exports.deleteAllUsers = async (req, res) => {
  try {
    await userServices.deleteUsers();
    res.status(200).json({
      status: "success",
      message: "All users deleted",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getUsersByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userServices.getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      message: "User found",
      data: { user },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.updateUserByEmail = async (req, res) => {
  const { email } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await userServices.updateUserByEmail(email, userData);
    if (!updatedUser) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'User updated',
      data: { user: updatedUser }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};