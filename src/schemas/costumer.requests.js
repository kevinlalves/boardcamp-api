import Joi from 'joi';

export const indexCostumersSchema = Joi.object({
  cpf: Joi.number().integer().min(0),
  offset: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0),
  order: Joi.string().valid('id', 'name', 'phone', 'cpf', 'birthday'),
  desc: Joi.boolean()
});
