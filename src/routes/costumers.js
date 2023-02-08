import { Router } from 'express';
import { indexCostumers } from '../controllers/costumers.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import { indexCostumersSchema } from '../schemas/costumer.requests.js';

const router = new Router('/costumers');

router.get('/', processRequestParams(indexCostumersSchema), indexCostumers);

export { router as costumersRouter };
