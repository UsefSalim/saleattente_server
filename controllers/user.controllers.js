/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const Fawn = require('fawn');
const Patient = require('../models/patient.models');
const Medecin = require('../models/medecin.models');
const Specialite = require('../models/specialite.models');
const Consultation = require('../models/demande_consultation.models');
const { todaySale } = require('../utils/auth.utils');
const { patientValidation } = require('../validations/user.validation');

exports.getMedecinIdSpecialite = (req, res) => {
  try {
    const Medecins = Medecin.find({ specialite: req.body.id }).select('name');
    if (Medecin) return res.status(200).json(Medecins);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.profileUser = async (req, res) => {
  const user = res.currentUser;
  try {
    const saleDispo = await todaySale();
    if (saleDispo) {
      const id = saleDispo._id;
      const patient = await Consultation.find({ id_sale: id })
        .populate('id_patient')
        .select('id_patient -_id');
      const specialite = await Specialite.find();
      return res.status(200).json({ user, saleDispo, patient, specialite });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.createConsultation = async (req, res) => {
  const { id_patient, id_medecin, nom, prenom, cin, date_naissance } = req.body;
  let Order = 0;
  try {
    const activeSale = await todaySale();
    if (activeSale) {
      const { id_sale } = activeSale._id;
      const firstConsultation = await Consultation.findOne({
        id_sale,
        id_medecin,
      });
      if (cin) {
        const patientExist = Patient.findOne({ cin });
        if (patientExist)
          return res
            .status(400)
            .json(
              'patient existant veillez lui asigner une tiquet dirrectement'
            );
      }
      if (!id_patient) {
        const { error } = patientValidation({
          nom,
          prenom,
          cin,
          date_naissance,
        });
        if (error) return res.status(400).json(error.details[0].message);
        const newpatient = new Patient({
          nom,
          prenom,
          cin,
          date_naissance,
        });
        !firstConsultation
          ? (Order = 1)
          : (Order = firstConsultation.numero_ordre + 1);
        const newConsultation = new Consultation({
          id_sale,
          id_patient: newpatient._id,
          id_medecin,
          numero_order: Order,
        });
        const task = Fawn.Task();
        const createClientAndCreateDemande = await task
          .save('patient', newpatient)
          .save('demande_consultation', newConsultation)
          .update(
            'salle_attente',
            { _id: id_sale },
            { $set: { total_patient: activeSale.total_patient + 1 } }
          )
          .run({ useMongoose: true });
        if (createClientAndCreateDemande)
          return res.status(201).json('patient crée Consultation En attente');
      } else {
        !firstConsultation
          ? (Order = 1)
          : (Order = firstConsultation.numero_ordre + 1);
        // console.log(Order);
        const newConsultation = new Consultation({
          id_sale: activeSale._id,
          id_patient,
          id_medecin,
          numero_ordre: Order,
        });
        const savedConsultation = await newConsultation.save();
        if (savedConsultation)
          return res.status(200).json('Consultation en attente');
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
