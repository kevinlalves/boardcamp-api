import Joi from 'joi';
import { dateFormat, onlyDigits } from '../utils/constants/regex.js';

export const listCostumersSchema = Joi.object({
  cpf: Joi.string().regex(onlyDigits).max(11),
  offset: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(1),
  order: Joi.string().valid('id', 'name', 'phone', 'cpf', 'birthday'),
  desc: Joi.boolean()
});

export const addCostumerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().regex(onlyDigits).min(10).max(11).required(),
  cpf: Joi.string().regex(onlyDigits).min(11).max(11).required(),
  birthday: Joi.date().required()
});

export const updateCostumerSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  name: Joi.string(),
  phone: Joi.string().regex(onlyDigits).min(10).max(11),
  cpf: Joi.string().regex(onlyDigits).min(11).max(11),
  birthday: Joi.string().regex(dateFormat).messages({
    'string.pattern.base': 'a data deve ser enviada no formato YYYY-MM-DD'
  })
});
