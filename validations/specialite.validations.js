const Joi = require('joi');

exports.specialiteValidations = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(48),
  });

  return schema.validate(data);
};
