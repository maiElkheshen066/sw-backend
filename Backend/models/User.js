const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
     SecondName: {
      type: String,
      required: [true, "second name is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: [true, "Please enter a unique email"],
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      // select: false, // Don't show password in response
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirmation is required"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
    profilePicture: {
      type: String,
      default: "https://res.cloudinary.com/dvghbsyda/image/upload/v1745606481/296fe121-5dfa-43f4-98b5-db50019738a7_cd8ks9.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined; // Don't store passwordConfirm in DB
  next();
});

// Create indexes for unique constraints
userSchema.index({ email: 1, username: 1 }, { 
  unique: true,
  background: true, // Build indexes in the background
});

module.exports = mongoose.model("User", userSchema);