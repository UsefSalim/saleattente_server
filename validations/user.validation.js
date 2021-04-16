const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);

exports.patientValidation = (data) => {
  const schema = Joi.object({
    nom: Joi.string().required().min(4).max(48),
    prenom: Joi.string().required().min(4).max(48),
    cin: Joi.string().required().min(7).max(8),
    date_naissance: Joi.required(),
  });

  return schema.validate(data);
};
