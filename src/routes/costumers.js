import { Router } from 'express';
import { addCostumer, listCostumers } from '../controllers/costumers.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import { addCostumerSchema, listCostumersSchema } from '../schemas/costumer.requests.js';

const router = new Router('/costumers');

router.get('/', processRequestParams(listCostumersSchema), listCostumers);
router.post('/', processRequestParams(addCostumerSchema), addCostumer);

export { router as costumersRouter };
