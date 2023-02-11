import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { costumersRouter } from './routes/costumers.js';
import { gamesRouter } from './routes/games.js';
dotenv.config({
  path: `envs/${process.env.NODE_ENV}.env`
});

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(json());
app.use(helmet());

app.use('/costumers', costumersRouter);
app.use('/games', gamesRouter);

app.listen(PORT, () => {
  console.log(chalk.green(`Server listening on port ${PORT}`));
});
