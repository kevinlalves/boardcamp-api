import { Router } from 'express';
import { addCustomer, listCustomers, showCustomer, updateCustomer } from '../controllers/customers.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import { addCustomerSchema, listCustomersSchema, updateCustomerSchema } from '../schemas/customer.requests.js';
import idOnlySchema from '../schemas/idOnly.requests.js';

const router = new Router('/customers');

router.get('/', processRequestParams(listCustomersSchema), listCustomers);
router.get('/:id', processRequestParams(idOnlySchema), showCustomer);
router.post('/', processRequestParams(addCustomerSchema), addCustomer);
router.put('/:id', processRequestParams(updateCustomerSchema), updateCustomer);

export { router as customersRouter };
