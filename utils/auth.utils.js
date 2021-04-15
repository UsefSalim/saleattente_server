/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

exports.ifExist = async (req, Model) =>
  await Model.findOne({ email: req.body.email });

exports.createToken = (data) =>
  jwt.sign({ data }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
