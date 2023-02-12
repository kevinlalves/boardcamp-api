import { Router } from 'express';
import { closeRental, createRental, deleteRental, listRentals } from '../controllers/rentals.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import idOnlySchema from '../schemas/idOnly.requests.js';
import { createRentalSchema, listRentalsSchema } from '../schemas/rental.requests.js';

const router = Router('/rentals');

router.get('/', processRequestParams(listRentalsSchema), listRentals);
router.post('/', processRequestParams(createRentalSchema), createRental);
router.delete('/:id', processRequestParams(idOnlySchema), deleteRental);
router.post('/:id/return', processRequestParams(idOnlySchema), closeRental);


export { router as rentalsRouter };
