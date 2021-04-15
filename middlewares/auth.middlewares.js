const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

exports.roleAdmin = (req, res, next) => {
  res.Role = 'Admin';
  next();
};
exports.roleUser = (req, res, next) => {
  res.Role = 'User';
  next();
};
exports.auth = async (req, res, next) => {
  const token = req.cookies.UserToken || req.cookies.AdminToken;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (!err && decodedToken.data.role === res.Role) {
        res.currentUser = await User.findOne({
          _id: decodedToken.data.id,
        }).select('-password');
        next();
      } else {
        decodedToken.data.role === 'Admin'
          ? res
              .clearCookie('AdminToken')
              .json(`private root need ${res.Role} login`)
          : res
              .clearCookie('UserToken')
              .json(`private root need ${res.Role} login`);
      }
    });
  } else {
    return res.status(400).json(`private root need ${res.Role} login`);
  }
};

exports.verifIsAuthenticated = (req, res, next) => {
  const token = req.cookies.UserToken || req.cookies.AdminToken;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        decodedToken.data.role === 'Admin'
          ? res
              .clearCookie('AdminToken')
              .json(`private root need ${res.Role} login`)
          : res
              .clearCookie('UserToken')
              .json(`private root need ${res.Role} login`);
      } else {
        decodedToken.data.role === 'Admin'
          ? res.status(200).json({ role: 'Admin', isAuthenticated: true })
          : res.status(200).json({ role: 'Client', isAuthenticated: true });
      }
    });
  } else {
    res.json({ role: '', isAuthenticated: false });
  }
};
