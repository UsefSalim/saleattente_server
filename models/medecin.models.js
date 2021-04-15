const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const medecinSchema = Schema({
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
  specialite: {
    type: Schema.Types.ObjectId,
    ref: 'specialite',
    required: true,
  },
  matricule: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model('medecin', medecinSchema);
