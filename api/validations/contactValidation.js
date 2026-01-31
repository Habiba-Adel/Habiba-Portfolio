const Joi = require("joi");

//even if there is no contact model we will still need to make the validation
const contactSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(1).required(),
});

module.exports = contactSchema;