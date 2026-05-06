// it is the authentication middleware for protecting routes in the backend, it check for a valid JWT token in the request header and attach the user data to the request object

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// middleware to protect routes and ensure only authenticationusers can access certain endpoints
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

module.exports = { protect };
