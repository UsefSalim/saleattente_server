const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.specialiteValidations = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(48),
  });

  return schema.validate(data);
};
exports.medecinValidations = (data) => {
  const schema = Joi.object({
    nom: Joi.string().required().min(3).max(48),
    prenom: Joi.string().required().min(3).max(48),
    cin: Joi.string().required().min(7).max(8),
    matricule: Joi.string().required().min(6).max(20),
    specialite: Joi.objectId().required(),
  });

  return schema.validate(data);
};
