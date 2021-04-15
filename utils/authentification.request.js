/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

exports.ifUserExist = async (req) =>
  await User.findOne({ email: req.body.email });

exports.createToken = (data) =>
  jwt.sign({ data }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
