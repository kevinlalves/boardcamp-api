import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { customersRouter } from './routes/customers.js';
import { gamesRouter } from './routes/games.js';
import { rentalsRouter } from './routes/rentals.js';
dotenv.config();

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(json());
app.use(helmet());

app.use('/customers', customersRouter);
app.use('/games', gamesRouter);
app.use('/rentals', rentalsRouter);

await import('./database/migrate.js');

app.listen(PORT, () => {
  console.log(chalk.green(`Server listening on port ${PORT}`));
});
