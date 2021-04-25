const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const demande_consultationSchema = Schema({
  id_sale: {
    type: Schema.Types.ObjectId,
    ref: 'salle_attente',
    required: true,
  },
  id_patient: {
    type: Schema.Types.ObjectId,
    ref: 'patient',
    required: true,
  },
  id_medecin: {
    type: Schema.Types.ObjectId,
    ref: 'medecin',
    required: true,
  },
  id_specialite: {
    type: Schema.Types.ObjectId,
    ref: 'specialite',
    required: true,
  },
  numero_ordre: {
    type: Number,
    require: true,
    default: 1,
  },
  etat: {
    type: String,
    ennum: ['En attente', 'En cours', 'Examiné', 'Abondonné'],
    dafault: 'En attente',
  },
});

module.exports = model('demande_consultation', demande_consultationSchema);
