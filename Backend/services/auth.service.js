const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  generateTokenAndSetCookie,
} = require("../utils/jwt.utils");
const sendEmail = require("../utils/email.utils");



exports.createUser = async (userData, res) => {
  const { firstName,SecondName, email, password, passwordConfirm, role } = userData;
 // 1. Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");


  // 3. Create new user
  const newUser = new User({
    firstName,
    SecondName,
    email,
    password,
    passwordConfirm, // passwordConfirm is not stored in DB but is used for validation
    role,

  });
  await newUser.save(); // hashed password here then save to DB


  const accessToken = generateTokenAndSetCookie(res, newUser);

    // 6. Return user info
  return {
    id: newUser._id,
    firstName: newUser.firstName,
    SecondName:newUser.SecondName,
    email: newUser.email,
    role,

    accessToken,
  };
};

exports.loginUser = async (userData, res) => {
  const { email, password } = userData;

  if (!email || !password) {
    throw new Error("Please provide email and password 📝", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Email does not exist", 401);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error("Incorrect password", 401);

  const token = generateTokenAndSetCookie(res, user);

  return {
    // id: user._id,
    // name: user.username,
    // email: user.email,
    token,
    // role: user.role,
  };
};



exports.forgotPassword = async (email, resetURL) => {
  // get user from email
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("this email not exist");
  }
  // generate random reset token
  const resetToken = crypto.randomBytes(20).toString("hex");
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save hashed token in DB
  user.resetPasswordToken = hashedResetToken;
  user.resetPasswordExpiresAt = Date.now() + 3600000; // 1 hour

  await user.save({ validateBeforeSave: false });
  // send reset url email
  const resetLink = `${resetURL}/${resetToken}`;
  const message = `Forgot your password ? click here ${resetLink}`;
  await sendEmail({
    email: user.email,
    subject: "Your password reset token (valid for 1 hour)",
    message,
  });

  return user;
};

exports.resetPasswordService = async (token, password, passwordConfirm) => {
  // verify token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Token is invalid or has expired");
  }
  if(password!==passwordConfirm)
  {
        throw new Error("Passwords do not match");

  }
  // update password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();

  return user;
};
