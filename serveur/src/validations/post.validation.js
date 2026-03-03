import Joi from "joi";

export const schemaCreerPost = Joi.object({
  content: Joi.string().trim().min(1).max(280).required()
}).required();

export const schemaModifierPost = Joi.object({
  content: Joi.string().trim().min(1).max(280).required()
}).required();
