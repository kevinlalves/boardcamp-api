import { Router } from 'express';
import { addGame, listGames } from '../controllers/games.controller.js';
import processRequestParams from '../middlewares/processRequestParams.js';
import { addGameSchema, listGamesSchema } from '../schemas/game.requests.js';

const router = Router('/games');

router.get('/', processRequestParams(listGamesSchema), listGames);
router.post('/', processRequestParams(addGameSchema), addGame);

export { router as gamesRouter };
