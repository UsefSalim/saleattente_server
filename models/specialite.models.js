const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const specialiteSchema = Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 48,
    unique: true,
  },
});

module.exports = model('specialite', specialiteSchema);
