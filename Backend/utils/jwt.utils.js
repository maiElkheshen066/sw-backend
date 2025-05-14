const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.generateTokenAndSetCookie = (res, user) => {
  
  const token = jwt.sign(
    { id: user._id, role: user.role }, //payload
    process.env.JWT_SECRET,                               // secure
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'Strict', // CSRF attack prevention
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) throw new Error('Invalid token');
    return decoded;
  });
};
