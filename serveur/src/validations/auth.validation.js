import Joi from "joi";

export const schemaInscription = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
  confirmationPassword: Joi.string().valid(Joi.ref("password")).required()
}).required();

export const schemaConnexion = Joi.object({
  identifiant: Joi.string().required(), // email ou username
  password: Joi.string().required()
}).required();
