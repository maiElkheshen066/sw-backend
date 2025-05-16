const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  generateTokenAndSetCookie,
} = require("../utils/jwt.utils");



exports.createUser = async (userData, res) => {
  const { firstName,SecondName, email, password, passwordConfirm, role,gender,mobileNumber } = userData;
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
    gender,
    mobileNumber

  });
  await newUser.save(); // hashed password here then save to DB


  const accessToken = generateTokenAndSetCookie(res, newUser);

    // 6. Return user info
  return {
newUser,

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



