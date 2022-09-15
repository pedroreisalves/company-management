import Joi from 'joi';

const priorities = ['HIGH', 'MEDIUM', 'LOW'];

export const projectCreateSchema = Joi.object().keys({
  title: Joi.string().min(5).required(),
  budget: Joi.number().min(1).required(),
  priority: Joi.string().valid(...priorities).required(),
  deadline: Joi.date().iso().required(),
  idManager: Joi.number().required(),
});

export const projectUpdateSchema = Joi.object().keys({
  title: Joi.string().min(5),
  budget: Joi.number().min(1),
  priority: Joi.string(),
  deadline: Joi.date().iso(),
  idManager: Joi.number(),
});
