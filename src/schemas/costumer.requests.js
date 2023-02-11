import Joi from 'joi';

export const listCostumersSchema = Joi.object({
  cpf: Joi.number().integer().min(0),
  offset: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0),
  order: Joi.string().valid('id', 'name', 'phone', 'cpf', 'birthday'),
  desc: Joi.boolean()
});

export const addCostumerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().integer().required(),
  cpf: Joi.number().integer().required(),
  birthday: Joi.date().required()
});
