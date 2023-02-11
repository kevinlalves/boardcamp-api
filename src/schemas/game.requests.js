import Joi from 'joi';

export const addGameSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri().required(),
  stockTotal: Joi.number().integer().min(1).required(),
  pricePerDay: Joi.number().integer().min(1).required()
});

export const listGamesSchema = Joi.object({
  name: Joi.string(),
  offset: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(1),
  order: Joi.string().valid('id', 'name', 'image', 'stockTotal', 'pricePerDay'),
  desc: Joi.bool()
});
