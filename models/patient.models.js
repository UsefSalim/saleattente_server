const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const patientSchema = Schema({
  nom: {
    type: String,
    required: true,
    min: 3,
    max: 48,
  },
  prenom: {
    type: String,
    required: true,
    min: 3,
    max: 48,
  },
  cin: {
    type: String,
    required: true,
    unique: true,
  },
  date_naissance: {
    type: String,
    required: true,
  },
});

module.exports = model('patient', patientSchema);
