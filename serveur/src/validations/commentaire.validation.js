import Joi from "joi";

export const schemaCreerCommentaire = Joi.object({
  content: Joi.string().trim().min(1).max(280).required()
}).required();
