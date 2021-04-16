/// * -------------------------------------------------------------------------- medecin Controllers
// ------------- require mongoose ObjectId ----//
const ObjectID = require('mongoose').Types.ObjectId;

// -------------require models----------  //
const Medecin = require('../models/medecin.models');

// -------------require validations----------  //
const { medecinValidations } = require('../validations/admin.validations');
const { getAll } = require('../utils/crud.utils');

/* ! @Route  : GET => api/medecins
     Desc    : Get all medecins
     @Access : Pubic
*/
exports.getAllmedecin = async (req, res) => {
  await getAll(res, Medecin);
};
/* ! @Route  : POST => api/medecins/addmedecin
     Desc    : Create medecin
     @Access : Pubic
*/
exports.addmedecin = async (req, res) => {
  const { error } = medecinValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    const medecinExistCin = await Medecin.findOne({ cin: req.body.cin });
    const medecinExistMatricule = await Medecin.findOne({
      matricule: req.body.matricule,
    });
    if (medecinExistCin || medecinExistMatricule)
      return res.status(400).json(`le medecin  existe deja `);
    const newmedecin = new Medecin({ ...req.body });
    if (await newmedecin.save()) return res.status(201).json(newmedecin);
  } catch (err) {
    return res.status(400).json(err);
  }
};
/* ! @Route  : DELETE => api/medecins/:id
     Desc    : Delete medecin
     @Access : Pubic
*/
exports.deletmedecin = async (req, res) => {
  await deleteOne(req, res, Medecin);
};
/* ! @Route  : UPDATE => api/medecin/:id
     Desc    : Update medecin
     @Access : Pubic
*/

exports.updatemedecin = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(404)
      .json({ message: `l'ID ${req.params.id} n'est pas reconnu` });
  const { error } = medecinValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    const medecinExistCin = await Medecin.findOne({ cin: req.body.cin });
    const medecinExistMatricule = await Medecin.findOne({
      matricule: req.body.matricule,
    });
    if (medecinExistCin || medecinExistMatricule)
      return res.status(400).json(`le medecin  existe deja `);
    Medecin.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true, useFindAndModify: true, upsert: true },
      (err, medecin) => {
        !err ? res.status(200).json(medecin) : res.status(400).json({ err });
      }
    );
  } catch (err) {
    return res.status(400).json({ err });
  }
};
