/// * -------------------------------------------------------------------------- specialite Controllers
// ------------- require mongoose ObjectId ----//
const ObjectID = require('mongoose').Types.ObjectId;

// -------------require models----------  //
const Specialite = require('../models/specialite.models');

// -------------require validations----------  //
const {
  specialiteValidations,
} = require('../validations/specialite.validations');

/* ! @Route  : GET => api/specialites
     Desc    : Get all specialites
     @Access : Pubic
*/
exports.getAll = async (req, res) => {
  try {
    const all = await Specialite.find();
    if (all) return res.status(200).json(all);
  } catch (err) {
    return res.status(400).json({ err });
  }
};
/* ! @Route  : POST => api/specialites/addspecialite
     Desc    : Create specialite
     @Access : Pubic
*/
exports.addspecialite = async (req, res) => {
  const { error } = specialiteValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    const specialiteExist = await Specialite.findOne({ name: req.body.name });
    if (specialiteExist)
      return res
        .status(400)
        .json(`la specialité ${specialiteExist.name} existe deja `);
    const newspecialite = new Specialite({ ...req.body });
    if (await newspecialite.save()) return res.status(201).json(newspecialite);
  } catch (err) {
    return res.status(400).json(err);
  }
};
/* ! @Route  : DELETE => api/specialites/:id
     Desc    : Delete specialite
     @Access : Pubic
*/
exports.deletspecialite = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .json({ message: `l'ID ${req.params.id} n'est pas reconnu` });
  try {
    if (await Specialite.remove({ _id: req.params.id }).exec())
      return res.status(200).json({
        message: `specialite avec l'id ${req.params.id} est supprimer avec succées`,
      });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
/* ! @Route  : UPDATE => api/specialite/:id
     Desc    : Update specialite
     @Access : Pubic
*/

exports.updatespecialite = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(404)
      .json({ message: `l'ID ${req.params.id} n'est pas reconnu` });
  const { error } = specialiteValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    Specialite.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true, useFindAndModify: true, upsert: true },
      (err, specialite) => {
        !err ? res.status(200).json(specialite) : res.status(400).json({ err });
      }
    );
  } catch (err) {
    return res.status(400).json({ err });
  }
};
