import Joi from "joi";

export const schemaModifierProfil = Joi.object({
  username: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(64)
}).min(1);