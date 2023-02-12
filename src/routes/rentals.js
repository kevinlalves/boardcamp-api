import { Router } from 'express';
import { createRental, listRentals } from '../controllers/rentals.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import { createRentalSchema, listRentalsSchema } from '../schemas/rental.requests.js';

const router = Router('/rentals');

router.get('/', processRequestParams(listRentalsSchema), listRentals);
router.post('/', processRequestParams(createRentalSchema), createRental);

export { router as rentalsRouter };
