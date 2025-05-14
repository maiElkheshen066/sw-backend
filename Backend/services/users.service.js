const Users = require("../models/User");

exports.getUsers = async function () {
  return await Users.find();
};

exports.deleteUsers = async function () {
  return await Users.deleteMany({});
};

exports.updateUserByEmail = async function (email, userData) {
  return await Users.findOneAndUpdate({ email }, userData, { new: true });
};

exports.getUserByEmail = async (email) => {
  const user= await Users.findOne({ email });
  console.log("Fetched user:", user);
  return user;
};
