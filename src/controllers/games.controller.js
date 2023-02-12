import chalk from 'chalk';
import db from '../database/database.connection.js';
import internalError from '../utils/functions/internalError.js';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import { standardBatch } from '../utils/constants/queries.js';
import { addQuery, listQuery } from '../queries/games.queries.js';

export const listGames = async (req, res) => {
  const { name = '', offset = 0, limit = standardBatch, order = 'id', desc = false } = req.Params;

  console.log(chalk.cyan('GET /games'));

  try {
    const { rows: games } = await db.query(listQuery({ order, desc }), [name + '%', offset, limit]);

    res.json(games);
  }
  catch (error) {
    internalError(error, res);
  }
};

export const addGame = async (req, res) => {
  const { name, image, stockTotal, pricePerDay } = req.Params;

  console.log(chalk.cyan('POST /games'));

  try {
    await db.query(addQuery(), [name, image, stockTotal, pricePerDay]);

    res.status(201).send();
  }
  catch (error) {
    if (error.code === valueAlreadyExistsError) {
      return res.status(409).send('já existe um jogo com o mesmo nome');
    }

    internalError(error, res);
  }
};
