import Joi from 'joi';

const idOnlySchema = Joi.object({
  id: Joi.number().integer().min(0).required()
});

export default idOnlySchema;
