import { Router } from 'express';
import { addCostumer, listCostumers, showCostumer, updateCostumer } from '../controllers/costumers.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import { addCostumerSchema, listCostumersSchema, updateCostumerSchema } from '../schemas/costumer.requests.js';
import idOnlySchema from '../schemas/idOnly.requests.js';

const router = new Router('/costumers');

router.get('/', processRequestParams(listCostumersSchema), listCostumers);
router.get('/:id', processRequestParams(idOnlySchema), showCostumer);
router.post('/', processRequestParams(addCostumerSchema), addCostumer);
router.put('/:id', processRequestParams(updateCostumerSchema), updateCostumer);

export { router as costumersRouter };
