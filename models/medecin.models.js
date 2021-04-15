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
    type: String,
    required: true,
    ennum: [
      "allergologie ou l'immunologie",
      'anesthésiologie',
      'andrologie',
      'cardiologie',
      'chirurgie',
      'dermatologie',
      'L’endocrinologie',
      'gastro-entérologie',
      'gériatrie',
      'gynécologie',
      "L'hématologie",
    ],
  },
  matricule: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = model('medecin', medecinSchema);
