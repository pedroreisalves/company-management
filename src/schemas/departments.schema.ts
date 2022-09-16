import Joi from 'joi';

export const departmentCreateSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
});

export const departmentUpdateSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
});