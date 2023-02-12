import { Router } from 'express';
import { createRental, listRentals } from '../controllers/rentals.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import { listGamesSchema } from '../schemas/game.requests.js';
import { createRentalSchema } from '../schemas/rental.requests.js';

const router = Router('/rentals');

router.get('/', processRequestParams(listGamesSchema), listRentals);
router.post('/', processRequestParams(createRentalSchema), createRental);

export { router as rentalsRouter };
