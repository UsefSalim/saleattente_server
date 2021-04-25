/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

exports.roleAdmin = (_req, res, next) => {
  res.Role = 'Admin';
  next();
};
exports.roleUser = (_req, res, next) => {
  res.Role = 'User';
  next();
};
exports.auth = async (req, res, next) => {
  const token = req.cookies._token;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (!err && decodedToken.data.role === res.Role) {
        res.currentUser = await User.findOne({
          _id: decodedToken.data.id,
        }).select('-password');
        next();
      } else {
        res.clearCookie('_token').json(`private root need ${res.Role} login`);
      }
    });
  } else {
    return res.status(400).json(`private root need ${res.Role} login`);
  }
};

exports.verifIsAuthenticated = (req, res) => {
  const token = req.cookies._token;
  // console.log(token);
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
      if (err) {
        res.clearCookie('_token').json(`private root need login`);
      } else {
        res
          .status(200)
          .json({ role: decodedToken.data.role, isAuthenticated: true });
      }
    });
  } else {
    res.json({ role: '', isAuthenticated: false });
  }
};
