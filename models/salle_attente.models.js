const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const salle_attenteSchema = Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  total_patient: {
    type: Number,
    default: 0,
  },
  total_patient_abondonner: {
    type: Number,
    default: 0,
  },
});

module.exports = model('salle_attente', salle_attenteSchema);
