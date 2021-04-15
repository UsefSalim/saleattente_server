const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = Schema({
  nom: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  prenom: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    ennum: ['User', 'Admin'],
    default: 'User',
  },
});

module.exports = model('user', userSchema);
