import Joi from 'joi';
import { dateFormat } from '../utils/constants/regex.js';

export const listRentalsSchema = Joi.object({
  customerId: Joi.number().integer().min(1),
  gameId: Joi.number().integer().min(1),
  offset: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(1),
  order: Joi.string().valid(
    'id',
    'customerId',
    'gameId',
    'daysRented',
    'rentDate',
    'returnDate',
    'delayFee',
    'originalPrice'
  ),
  desc: Joi.bool(),
  status: Joi.string().valid('open', 'close'),
  startDate: Joi.string().regex(dateFormat)
});

export const createRentalSchema = Joi.object({
  customerId: Joi.number().integer().min(1).required(),
  gameId: Joi.number().integer().min(1).required(),
  daysRented: Joi.number().integer().min(1).required()
});
