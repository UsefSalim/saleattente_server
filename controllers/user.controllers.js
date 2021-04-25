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
        .populate('id_medecin')
        .populate('id_specialite')
        .select('-id_sale -_id');
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
  let id_specialite;
  try {
    // find info medecin
    const currentMedecin = await Medecin.findOne({ _id: id_medecin });
    // recupere l'id specialite
    if (currentMedecin) id_specialite = currentMedecin.specialite;
    // sale du jour
    const activeSale = await todaySale();
    if (activeSale) {
      const id_sale = activeSale._id;
      // si il ya une consultation deja faitte au nom du medecin
      const firstConsultation = await Consultation.findOne({
        id_sale,
        id_medecin,
      });
      if (cin) {
        // si le patien est deja enregistrer dans la base de donné
        const patientExist = await Patient.findOne({ cin });
        if (patientExist)
          return res
            .status(400)
            .json(
              `patient existant Cin: ${cin} veillez lui asigner une tiquet dirrectement`
            );
      }
      if (!id_patient) {
        // validation de sinfo patient
        const { error } = patientValidation({
          nom,
          prenom,
          cin,
          date_naissance,
        });
        if (error) return res.status(400).json(error.details[0].message);
        // creation d'un nouveu patient
        const newpatient = new Patient({
          nom,
          prenom,
          cin,
          date_naissance,
        });
        // generation de numero d'ordre selon medecin
        !firstConsultation
          ? (Order = 1)
          : (Order = firstConsultation.numero_ordre + 1);
        // new consultation
        const newConsultation = new Consultation({
          id_sale,
          id_patient: newpatient._id,
          id_medecin,
          id_specialite,
          numero_order: Order,
        });
        // enregistrement du patient et de la consultation et update nombre de patient dans la sale
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
        // generation de numero d'ordre selon medecin
        !firstConsultation
          ? (Order = 1)
          : (Order = firstConsultation.numero_ordre + 1);
        // creation de consultation
        const newConsultation = new Consultation({
          id_sale: activeSale._id,
          id_patient,
          id_medecin,
          id_specialite,
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
