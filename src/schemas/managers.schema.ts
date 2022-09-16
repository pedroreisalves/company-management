import Joi from "joi";

export const managerCreateSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
});

export const managerUpdateSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
});